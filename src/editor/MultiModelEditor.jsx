import React, { useState, useEffect, useRef, useContext } from "react";
// import files from "./codeFiles.js";
import { fileLanguage } from "../utils/fileNameHelper.js";
import Editor from "@monaco-editor/react";
import "./MultiModelEditor.css";
import {XIcon} from '@primer/octicons-react'
import {Button} from '@primer/react'
import {getTheFileNameFromPath} from '../utils/fileNameHelper.js'

const MultiModelEditor = ({files, activeFileName, setActiveFile, deleteFileFromFiles}) => {
  const editorRef = useRef(null);
  let activeFile = files[activeFileName];
  console.log('activeFile : ', activeFile)

  useEffect(() => {
    editorRef.current?.focus();
  }, [activeFile, activeFileName]);

  function handleEditorChange(value, event) {
    // let fileObj = Object.assign({}, allFiles[activeFile.name])
    // fileObj["value"] = value;
    // io.emit('file_change', fileObj)
  }

  function handleActiveFileClick(fileName) {
    setActiveFile(fileName)
  }

  function handleRemoveFile(filename){
    deleteFileFromFiles(filename)
    const newActiveFileArr = Object.keys(files)
    if(newActiveFileArr.length > 0){
      activeFile = files[newActiveFileArr[0]]
    }
    
  }

  return (
    <>
      <div className="filesOpened">
        {Object.keys(files)?.map((file) => (
          <div
            className={activeFile?.name === file ? "activeFile" : ""}
            key={file}
            onClick={() => handleActiveFileClick(file)}
          >
            {getTheFileNameFromPath(file)}
            <Button size="small" onClick={() => handleRemoveFile(file)}>
              <XIcon />
            </Button>
          </div>
        ))}
      </div>

      <Editor
        height="93%"
        theme="vs-light"
        path={activeFile?.name}
        defaultLanguage={activeFile?.language}
        defaultValue={activeFile?.value}
        onMount={(editor) => (editorRef.current = editor)}
      />
    </>
  );
};

export default MultiModelEditor;
