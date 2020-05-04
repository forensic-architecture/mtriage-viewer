// Copyright Forensic Architecture
// All rights reserved.

// This server makes a folder produced by mtriage, a `Storage`, accessible via a basic HTTP server.
// On server startup, it indexes the Storage and makes a lightweight representation of it available
// at '/elementmap'.
// Batches of elements (i.e., passes produced by an mtriage analyser or selector) are at '/batch'.
// Individual elements within batches are then query-able at '/batch/{ element_id }'.
package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"flag"
)

// global element map. This variable is populated when the server starts by
// indexing the working directory's filesystem, and keeps all global state for
// mserver. Could think about better persistent storage in the future.
var ELEMENT_MAP ElementMap

// ENTRYPOINT
func main() {
	if len(os.Args) != 2 {
		log.Println("You need to pass the working directory context as the first argument to mserver")
		os.Exit(1)
	}
	workingDir := os.Args[1]
	exists, err := dirExists(workingDir)
	if !exists || err != nil {
		log.Println("You need to pass a working directory that exists.")
		os.Exit(1)
	}

	var port string
	var storage string
	flag.StringVar(&port, "port", ":8080", "The port where the server should run.")
	flag.StringVar(&storage, "storage", "local", "The type of storage.")

	flag.Parse()

	port = ":8080"
	// NOTE: populates ELEMENT_MAP synchronously
	elmap, err := getElementMap(workingDir, StorageType(storage))

	if err != nil {
		panic("Could not index for some reason: TODO:")
		os.Exit(1)
	}

	http.HandleFunc("/elementmap", handleElementMap)
	http.HandleFunc("/element", handleElement)

	log.Println("Listening on port 8080...")
	http.ListenAndServe(port, nil)
}

func handleElementMap(w http.ResponseWriter, r *http.Request) {
	serveJsonData(ELEMENT_MAP, w)
}

func handleElement(w http.ResponseWriter, r *http.Request) {
	q, q_err := getQuery(r, "q")
	id, id_err := getQuery(r, "id")
	media, media_err := getQuery(r, "media")

	if q_err != nil {
		errorHandler(w, r, http.StatusBadRequest)
		return
	}

	terms := strings.Split(q, "/")
	if len(terms) > 2 {
		errorHandler(w, r, http.StatusBadRequest)
		return
	}

	enableCors(&w)
	w.Header().Set("Cache-Control", "no-cache")
	var selector string = terms[0]
	var hasAnalyser bool = len(terms) > 1
	var hasElement bool = id_err == nil
	var hasMedia bool = media_err == nil

	if hasAnalyser {
		analyser := terms[1]
		var output EtypedDir
		for i := 0; i < len(ELEMENT_MAP.Analysed); i++ {
			output = ELEMENT_MAP.Analysed[i]
			if output.Component == analyser {
				if hasElement && hasMedia {
					elPath := getPathToAnalysedElementMedia(output, id, media)
					http.ServeFile(w, r, elPath)
				} else {
					serveJsonData(output, w)
				}
				return
			}
		}
	} else {
		var output EtypedDir
		for i := 0; i < len(ELEMENT_MAP.Selected); i++ {
			output = ELEMENT_MAP.Selected[i]
			if output.Component == selector {
				if hasElement && hasMedia {
					elPath := getPathToSelectedElementMedia(output, id, media)
					http.ServeFile(w, r, elPath)
				} else {
					serveJsonData(output, w)
				}
				return
			}
		}
		// for i := 0; i < len(ELEMENT_MAP.Selected); i++ {
		// 	output := ELEMENT_MAP.Selected[i]
		// 	if output.Component == selector {
		// 		break
		// 	}
		// }
		// if counter == len(ELEMENT_MAP.Selected) {
		// 	errorHandler(w, r, http.StatusNotFound)
		// 	return
		// }
		// if id != -1 {
		// 	serveJsonData(output.Elements[id], w)
		// } else {
		// 	serveJsonData(output, w)
		// }
	}
}
