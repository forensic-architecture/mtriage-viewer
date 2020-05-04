package main

type File struct {
	Path string
	Name string
	Ext string
}

type ElementDirKind int
const (
	Unspecified ElementDirKind = 0
	Selected	ElementDirKind = 1
	Analysed	ElementDirKind = 2
)

type Dir struct {
	Path string
	Name string
	Kind ElementDirKind
}

type Element struct {
	Id string
	Media map[string][]string
}

type EtypedDir struct {
	Etype string
	Storagetype StorageType
	Path string
	Component string
	Elements []Element
}

type ElementMap struct {
	Selected []EtypedDir
	Analysed []EtypedDir
}

type StorageType string
const(
	// Storage is a folder that exists locally, on the filesystem where this server is running.
	Local StorageType	= "local"
	// Storage is an S3 bucket.
	S3					= "s3"
)


