# mtriage-viewer

#### note: pre-alpha development, not ready for use. Everything will break!

mtriage-viewer is a server collected with a web frontend to interactively
visualise [mtriage](https://github.com/forensic-architecture/mtriage) workflows
after they have been run.

## Run the server
```
cd server
poetry install
poetry shell
export FLASK_ENV=development
python app.py
```

Modify `ROOT` and `STORAGE_TYPE` variables inside app.py to point to another
storage location.

## Run the frontend
```
cd viewer
npm install
npm run dev
```
