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

NOTE: Must use Node v16. You're likely on a newer version, but will need to downgrade in order to view. We recommend using [node version manager](https://github.com/nvm-sh/nvm) in the (likely) case you have multiple versions of node on your computer. Once installed just run `nvm install 16` and `nvm use 16` and you should be set. 


```
cd viewer
npm install
npm run dev
```
