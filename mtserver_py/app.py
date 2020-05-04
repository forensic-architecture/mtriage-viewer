import os
from enum import Enum
from typing import List
from pathlib import Path
from flask import Flask, jsonify
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
    def __init__(self, query, path):
        self.query = query
        self.path = path
        self.index()

    def index(self):
        folder = Path(self.path)
        els = [x for x in folder.glob("**/*") if x.is_dir()]
        self.elements = els

    def serialize(self):
        return {"query": self.query, "elements": [str(x.name) for x in self.elements]}


class Local:
    def get_batches(root: str) -> List[LocalBatch]:
        batches = []
        for _, dirs, _ in os.walk(root):
            for d in dirs:
                absp = Path(root) / d
                if (absp / ".mtbatch").is_file():
                    batches.append(LocalBatch(d, absp))
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
    return "Batch route"


if __name__ == "__main__":
    global ELEMENT_MAP
    ELEMENT_MAP = index(MAIN_DIR, STORAGE_TYPE)
    app.run()
