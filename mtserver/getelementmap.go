package main

import (
	"os"
	"strings"
	"path/filepath"
	"bufio"
)

// Runs on server start, indexing the Storage.
//
// Simplistically, this function identifies all element batches inside the storage, reads the
// presumed etype, and presents an overview of available batches.
func getElementMap(dir string, storage StorageType) (ElementMap, error) {
	switch storage {
	case Local:
		return getLocalEM(dir)
	default:
		panic("No implementation for Storage of type " + string(storage))
	}
}


const DATA_DIR = "data"
const DERIVED_DIR = "derived"

// NOTE: a valid EtypedDir is any that contains an .etype file at its root.
func getLocalEM(dir string) (ElementMap, error) {
	ELEMENT_MAP = ElementMap{ Selected: []EtypedDir{}, Analysed: []EtypedDir{} }
	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		// skip files
		if !info.IsDir() {
			return nil
		}
		name := info.Name()
		// append all selector elements
		if name == DATA_DIR {
			elements, err := getChildDirsEtyped(path)
			if err != nil {
				panic("somthing")
			}
			allBits := strings.Split(path, "/")
			compName := allBits[len(allBits)-2]

			dir := EtypedDir{
				Path: path,
				Component: compName,
				Elements: elements,
			}
			ELEMENT_MAP.Selected = append(ELEMENT_MAP.Selected, dir)
		}
		// append all derived folders
		if name == DERIVED_DIR {
			childDirs, err := getChildDirs(path)
			if err != nil {
				panic("somthng")
			}
			for i := 0; i < len(childDirs); i++ {
				dir := childDirs[i]
				// get etype from first line of .mtbatch
				var dirEtype string
				mtbatch := dir.Path + "/.mtbatch"
				if fileExists(mtbatch) {
					file, err := os.Open(mtbatch)
					if err != nil {
						panic(err)
					}
					defer file.Close()

					scanner := bufio.NewScanner(file)
					for scanner.Scan() {
						dirEtype = scanner.Text()
						break
					}
				}

				elements, err := getLocalElements(dir.Path, dirEtype)

				if err != nil {
					panic("TODO:")
				}
				allBits := strings.Split(dir.Path, "/")
				selector := allBits[len(allBits)-3]

				edir := EtypedDir{
					Path: dir.Path,
					Component: dir.Name,
					Elements: elements,
				}
				ELEMENT_MAP.Analysed = append(ELEMENT_MAP.Analysed, edir)
			}
		}
		return nil
	})
	if err != nil {
		panic(err)
	}
	return nil
}

func getLocalElements(path string, etype string) ([]Element, error) {
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
