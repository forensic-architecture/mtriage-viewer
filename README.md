# mtriage-viewer

#### note: pre-alpha development, not ready for use. Everything will break!

mtriage-viewer is a locally-run server collected with a web frontend to 
interactively visualise [mtriage](https://github.com/forensic-architecture/mtriage)
workflows after they have been run.


Ensuring you have Docker installed, you can run mtriage-viewer with the
following command:
```
./mtriage-viewer -i /path/to/folder
```

The folder that you pass should be a folder that contains mtriage workflows 
(and only mtriage workflows). It will probably be the `temp` folder in your
local copy of the mtriage repo.

If you want to use a custom viewer, you can pass it with `-v`:
```
./mtriage-viewer -i path/to/folder -v framemap
```

### Developing Viewers
To run only the server so that you can develop a viewer in a development server
wtih live reloads, run:
```
./mtriage-viewer -i path/to/folder --serveronly
```
