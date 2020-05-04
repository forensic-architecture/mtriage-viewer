package main

import (
	"net/http"
	"path/filepath"
	"os"
	"encoding/json"
	"io/ioutil"
	"strings"
	"errors"
)

func dirExists(path string) (bool, error) {
	_, err := os.Stat(path)
	if err == nil { return true, nil }
	if os.IsNotExist(err) { return false, nil }
	return true, err
}

// taken from https://golangcode.com/check-if-a-file-exists/
func fileExists(filename string) bool {
    info, err := os.Stat(filename)
    if os.IsNotExist(err) {
        return false
    }
    return !info.IsDir()
}

func getFilesInDir(dir string, skips []string) []File {
	var files []File
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if info.IsDir() {
			return nil
		}
		for i := 0; i < len(skips); i++ {
			if info.Name() == skips[i] {
				return nil
			}
		}
		name := info.Name()
		ext := filepath.Ext(path)
		files = append(files, File{ Path: path, Name: name, Ext: ext })
		return nil
	})
	if err != nil {
		panic(err)
	}
	return files
}

func getChildDirs(path string) ([]Dir, error) {
	var dirs []Dir
	childDirs, err := ioutil.ReadDir(path)
	if err != nil {
		return dirs, err
	}
	for i := 0; i < len(childDirs); i++ {
		dir := childDirs[i]
		if !dir.IsDir() {
			continue
		}
		var str strings.Builder
		str.WriteString(path)
		str.WriteString("/")
		str.WriteString(dir.Name())
		dirs = append(dirs, Dir{ Name: dir.Name(), Path: str.String(), Kind: Unspecified })
	}
	return dirs, nil
}

func getChildDirsEtyped(path string) ([]Element, error) {
	var els []Element
	childDirs, err := ioutil.ReadDir(path)
	if err != nil {
		return els, err
	}
	for i := 0; i < len(childDirs); i++ {
		dir := childDirs[i]
		if !dir.IsDir() {
			continue
		}
		var str strings.Builder
		str.WriteString(path)
		str.WriteString("/")
		str.WriteString(dir.Name())
		elPath := str.String()
		// TODO: attempt other casts
		etypedEl :=  Element{
			Id: dir.Name(),
			Media: getMedia(elPath),
		}
		els = append(els, etypedEl)
	}
	return els, nil

}

// IO
func errorHandler(w http.ResponseWriter, r* http.Request, status int) {
	w.WriteHeader(status)
}

func writeToJsonFile(path string, jsonable interface{}) {
	file, err := json.MarshalIndent(jsonable, "", " ")
	if err != nil {
		panic(err)
	}
	err = ioutil.WriteFile(path, file, 0644)
	if err != nil {
		panic(err)
	}
}

func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}

func serveJson(file string, w http.ResponseWriter, r *http.Request) {
	enableCors(&w)
	http.ServeFile(w, r, file)
}

func serveJsonData(data interface{}, w http.ResponseWriter) {
	enableCors(&w)
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(data)
}

func loadTypedElement(path string) Element {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		panic(err)
	}
	element := Element{}
	err = json.Unmarshal([]byte(file), &element)
	if err != nil {
		panic(err)
	}
	return element
}

func getRequestValue(param string, r *http.Request) string {
	values, ok := r.URL.Query()[param]
	if !ok || len(values[0]) < 1 {
		return ""
	}
	return values[0]
}


func getQuery(r *http.Request, q string) (string, error) {
	content := r.URL.Query()[q]
	if len(content) <= 0 {
		return "", errors.New("Query does not exist")
	}
	query := content[0]
	return query, nil
}

func getPathToAnalysedElementMedia(dir EtypedDir, elId string, media string) string {
	var pathToElement strings.Builder

	idx := -1
	for i := 0; i < len(dir.Elements); i++ {
		if dir.Elements[i].Id == elId {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ""
	}

	pathToElement.WriteString(dir.Path)
	pathToElement.WriteString("/")
	pathToElement.WriteString(dir.Elements[idx].Id)
	pathToElement.WriteString("/")
	// NOTE: currently just serves the first media, should be indexed
	// pathToElement.WriteString(dir.Elements[idx].Media["all"][0])
	pathToElement.WriteString(media)
	return pathToElement.String()
}

func getPathToSelectedElementMedia(dir EtypedDir, elId string, media string) string {
	var pathToElement strings.Builder

	idx := -1
	for i := 0; i < len(dir.Elements); i++ {
		if dir.Elements[i].Id == elId {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ""
	}

	pathToElement.WriteString(dir.Path)
	pathToElement.WriteString("/")
	pathToElement.WriteString(dir.Elements[idx].Id)
	pathToElement.WriteString("/")
	// NOTE: currently just serves the first media, should be indexed
	// pathToElement.WriteString(dir.Elements[idx].Media["all"][0])
	pathToElement.WriteString(media)
	return pathToElement.String()
}
