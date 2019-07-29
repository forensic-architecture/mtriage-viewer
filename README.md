# mtriage-server

#### note: pre-alpha development, not ready for use.

mtriage-server is a locally-run server and web frontend to interactively
visualise [mtriage](https://github.com/forensic-architecture/mtriage)
workflows after they have been run.


Ensuring you have Docker installed, you can run mtriage-server with the
following command:
```
./mtriage-server -i /path/to/folder
```

The folder that you pass should be a folder that contains mtriage workflows 
(and only mtriage workflows). It will probably be the `temp` folder in your
local copy of the mtriage repo.
