# mtriage-viewer

#### note: pre-alpha development, not ready for use.

mtriage-viewer is a locally-run server collected with a web frontend to 
interactively visualise [mtriage](https://github.com/forensic-architecture/mtriage)
workflows after they have been run.


Ensuring you have Docker installed, you can run mtriage-viewer with the
following command:
```
./mtriage-viewer -i /path/to/folder -v example
```

The folder that you pass should be a folder that contains mtriage workflows 
(and only mtriage workflows). It will probably be the `temp` folder in your
local copy of the mtriage repo.
