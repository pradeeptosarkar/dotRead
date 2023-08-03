import React, { useState } from "react";
import Split from "react-split";
import "./SplitContainer.css";

// Import Components
import Files from "./Files";
import MultiModelEditor from "../editor/MultiModelEditor.jsx";

const SplitContainer = ({ param, isSidebarCollapsed }) => {
  // storing editor active file ( the code file where use see in the editor)
  const [activeFile, setActiveFile] = useState("");
  // storing all the files that are opened in editor ( each file tabs in the editor)
  const [files, setFiles] = useState({});

  const splitSizes = isSidebarCollapsed ? [0,100] : [15,85]

  function deleteFileFromFiles(filename) {
    setFiles((current) => {
      delete current[filename];
      return current;
    });
  }

  return (
    <>
      <Split
        className="container"
        sizes={splitSizes}
        minSize={0}
        expandToMin={false}
        gutterSize={5}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
      >
        <div className="files">
          {
            <Files
              param={param}
              setFiles={setFiles}
              setActiveFile={setActiveFile}
            />
          }
        </div>
        <div className="editor">
          {
            <MultiModelEditor
              files={files}
              activeFileName={activeFile}
              setActiveFile={setActiveFile}
              deleteFileFromFiles={deleteFileFromFiles}
            />
          }
        </div>
      </Split>
    </>
  );
};

export default SplitContainer;
