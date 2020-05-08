import os
import json
from enum import Enum
from typing import List
from pathlib import Path
from configparser import RawConfigParser
from flask import Flask, jsonify, request
from flask_cors import CORS


class StorageType(Enum):
    Local = 1
    S3 = 2


app = Flask(__name__)
CORS(app)

# TODO: pass as CLI args
MAIN_DIR = Path(
    "/Users/lachlankermode/code/fa/mtriage/media/demo_official/3/Youtube/derived"
)
STORAGE_TYPE = StorageType.Local


class LocalBatch:
    def __init__(self, query, path, etype):
        self.query = query
        self.path = Path(path)
        self.elements = [f for f in self.path.glob("**/*") if f.is_dir()]
        self.etype = etype
        self.index()

    def index(self):
        folder = Path(self.path)
        els = [x for x in folder.glob("**/*") if x.is_dir()]
        self.elements = els

    def serialize(self):
        return {
            "query": self.query,
            "elements": [str(x.name) for x in self.elements],
            "etype": self.etype,
        }

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


class Local:
    def get_batches(root: str) -> List[LocalBatch]:
        batches = []
        for _, dirs, _ in os.walk(root):
            for d in dirs:
                absp = Path(root) / d
                if (absp / ".mtbatch").is_file():
                    cfgParser = RawConfigParser()
                    cfgParser.read(absp / ".mtbatch")
                    etype = cfgParser.get("etype", "etype")
                    batches.append(LocalBatch(d, absp, etype))
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
    batches = {
        StorageType.Local: Local.get_batches(root),
        # StorageType.S3: S3.get_batches(root),
    }.get(storage_type, [])

    return {
        "batches": batches,
    }


@app.route("/elementmap")
def elementmap():
    return jsonify([x.serialize() for x in ELEMENT_MAP["batches"]])


@app.route("/batch")
def batch():
    arg_query = request.args.get('q')
    arg_element = request.args.get('el')

    matching = [b for b in ELEMENT_MAP["batches"] if b.query == arg_query]
    if len(matching) != 1:
        return jsonify({})

    batch = matching[0]

    if arg_element is not None:
        print('doing it')
        return jsonify(batch.get_element(arg_element))

    return jsonify(batch.all_elements())


if __name__ == "__main__":
    global ELEMENT_MAP
    ELEMENT_MAP = index(MAIN_DIR, STORAGE_TYPE)
    app.run()
