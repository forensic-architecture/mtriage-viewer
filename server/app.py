import os
import re
import json
import boto3 # s3 client
from enum import Enum
from typing import List
from pathlib import Path
from abc import ABC, abstractmethod
from configparser import RawConfigParser
from flask import Flask, jsonify, request
from flask_cors import CORS


class StorageType(Enum):
    Local = 1
    S3 = 2


app = Flask(__name__)
CORS(app)

# TODO: pass as CLI args
# ROOT =  "/Users/lachlankermode/code/_fa/mtriage/media/demo_official/3/Youtube/derived"
# STORAGE_TYPE = StorageType.Local

ROOT = "lk-iceland-personal"
STORAGE_TYPE = StorageType.S3

def read_etype(local_fp: Path) -> str:
    cfgParser = RawConfigParser()
    cfgParser.read(local_fp)
    return cfgParser.get("etype", "etype")


class Batch(ABC):
    def __init__(self, query, etype):
        self.query = query
        self.etype = etype
        self.elements = self.index_elements()

    def serialize(self):
        return {
            "query": self.query,
            "elements": [str(Path(x).name) for x in self.elements],
            "etype": self.etype,
        }

    @abstractmethod
    def index_elements(self):
        pass


class LocalBatch(Batch):
    def __init__(self, query, etype, path):
        self.path = Path(path)
        super().__init__(query, etype)

    def index_elements(self):
        return [x for x in self.path.glob("**/*") if x.is_dir()]

    @staticmethod
    def unpack_element(pth: Path, suffixes: List[str] = ['.json']) -> dict:
        media = {}
        for f in [t for t in pth.iterdir() if t.suffix in suffixes]:
            with open(f) as fl:
                data = json.load(fl)
            media[f.name] = data

        return {
            "id": pth.name,
            "media": media,
        }

    def get_element(self, el_id: str):
        matching = [el for el in self.elements if el.name == el_id]
        if len(matching) != 1:
            return None
        return LocalBatch.unpack_element(matching[0])

    def all_elements(self):
        return [LocalBatch.unpack_element(el) for el in self.elements]


class S3Batch(Batch):
    def __init__(self, query, etype, root):
        # self.resource = boto3.resource('s3')
        self.client = boto3.client('s3')
        self.root = root
        super().__init__(query, etype)

    def index_elements(self):
        response = self.client.list_objects_v2(
            Bucket=self.root,
            Prefix =self.query,
            Delimiter='/')
        return [x.get('Prefix') for x in response.get('CommonPrefixes')]

    @staticmethod
    def unpack_element(root:str, pth: str, suffixes: List[str] = ['.json']) -> dict:
        media = {}
        # NOTE: preds.json hardcoded here
        # TODO: need to cache these requests so that they only need to be retrieved once
        content_object = boto3.resource('s3').Object(root, f"{pth}preds.json")
        file_content = content_object.get().get('Body').read().decode('utf-8')
        json_content = json.loads(file_content)
        media["preds.json"] = json_content

        return {
            "id": Path(pth).name,
            "media": media,
        }

    def get_element(self, el_id: str):
        matching = [el for el in self.elements if Path(el).name == el_id]
        if len(matching) != 1:
            return None
        return S3Batch.unpack_element(self.root, matching[0])

    def all_elements(self):
        return [S3Batch.unpack_element(self.root, el) for el in self.elements]


class Local:
    @staticmethod
    def get_batches(root: str) -> List[LocalBatch]:
        batches = []
        for _, dirs, _ in os.walk(root):
            for d in dirs:
                absp = Path(root) / d
                if (absp / ".mtbatch").is_file():
                    etype = read_etype(absp / ".mtbatch")
                    batches.append(LocalBatch(d, etype, absp))
        return batches


class S3:
    @staticmethod
    def get_batches(root: str) -> List[S3Batch]:
        s3 = boto3.client('s3')
        s3_resource = boto3.resource('s3')
        # paginator = s3.get_paginator('list_objects')
        # result = paginator.paginate(Bucket=root, Delimiter='/')
        # folders = [prefix.get('Prefix') for prefix in result.search('CommonPrefixes')]
        all_objects = s3.list_objects(Bucket=root)
        valid_folders = [x['Key'].replace('.mtbatch', '') for x in all_objects['Contents'] if re.match(r'.*\/\.mtbatch$', x['Key'])]

        # download .mtbatch files to get etype
        batches = []
        bucket = s3_resource.Bucket(root)
        mtbatches_dir = Path('mtbatches')
        mtbatches_dir.mkdir(parents=True, exist_ok=True)

        for fold in valid_folders:
            local_fp = mtbatches_dir/fold.replace('/', '_')
            bucket.download_file(f"{fold}.mtbatch", str(local_fp))
            etype = read_etype(local_fp)
            batches.append(S3Batch(fold, etype, root))

        return batches


def index(root: str, storage_type: StorageType):
    """
    Runs on server start, indexing the Storage.
    ELEMENT_MAP is kept in memory from there.
    Specific batches are worked out dynamically.

    Simplistically, this function identifies all element batches inside the
    storage, reads the presumed etype, and presents an overview of available
    batches.
    """
    get_batches = {
        StorageType.Local: Local.get_batches,
        StorageType.S3: S3.get_batches,
    }.get(storage_type, lambda _: [])

    return {
        "batches": get_batches(root),
    }


@app.route("/elementmap")
def elementmap():
    return jsonify([x.serialize() for x in ELEMENT_MAP["batches"]])


@app.route("/batch")
def batch():
    arg_query = request.args.get('q')
    arg_element = request.args.get('el')
    if not arg_query:
        return jsonify([])

    matching = [b for b in ELEMENT_MAP["batches"] if b.query.strip("/") == arg_query.strip("/")]

    if len(matching) != 1:
        return jsonify({})

    batch = matching[0]

    if arg_element is not None:
        return jsonify(batch.get_element(arg_element))

    return jsonify(batch.all_elements())


if __name__ == "__main__":
    global ELEMENT_MAP
    ELEMENT_MAP = index(ROOT, STORAGE_TYPE)
    app.run()