import { Box, Spinner, TreeView } from "@primer/react";
import { useQuery } from "@tanstack/react-query";
import { fetchRepoData } from "../utils/requestHandler";
import { FileIcon } from "@primer/octicons-react";
import { getFileLanguage, getTheFileNameFromPath } from "../utils/fileNameHelper";

function Entry({ path, file, param, handleSetFiles }) {
  // Entry is for subfolder which is recursively getting it's subfolder and file
  // create new path(branch) for the getting it's data
  const newBranchName =
    path === "HEAD:" ? `${path}${file.name}` : `${path}/${file.name}`;
  const updatedParam = {
    ...param,
    branch: newBranchName,
  };
  const { isLoading, data, error, refetch } = useQuery({
    queryKey: ["repoData", newBranchName],
    queryFn: () => fetchRepoData(updatedParam),
    select: (data) => {
      let dirArray = [];
      let filesArray = [];
      data.repository.object.entries.map((file) => {
        if (file.type === "tree") {
          dirArray.push(file);
        } else {
          // doing this because, if we set same filename on files state, program 
          // will not running as aspected e.g: In monorepe, if we open package.json 
          // and then open package.json of any package, it didn't open that file 
          const newFile = {
            ...file,
            name : `${newBranchName}/${file.name}`
          } 
          filesArray.push(newFile);
        }
      });

      return [...dirArray, ...filesArray];
    },
    enabled: false,
  });

  function handleFolderClick(file) {
    // fetch when user click the folder
    refetch();
  }

  return (
    <TreeView.Item
      id={file.name}
      key={file.name}
      onSelect={() => handleFolderClick(file)}
    >
      <TreeView.LeadingVisual>
        <TreeView.DirectoryIcon />
      </TreeView.LeadingVisual>
      {file.name}
      {/* For rendring nested forlder and files using recursion */}
      {data && data.length > 0 ? (
        <TreeView.SubTree>
          {data?.map((newFile) => {
            return newFile.type === "tree" ? (
              <Entry
                param={param}
                key={newFile.name}
                path={newBranchName}
                file={newFile}
                handleSetFiles={handleSetFiles}
              />
            ) : (
              <TreeView.Item
                id={newFile.name}
                key={newFile.name}
                onSelect={() => handleSetFiles(newFile)}
              >
                <TreeView.LeadingVisual>
                  <FileIcon />
                </TreeView.LeadingVisual>
                {getTheFileNameFromPath(newFile.name)}
              </TreeView.Item>
            );
          })}
        </TreeView.SubTree>
      ) : null}
    </TreeView.Item>
  );
}

export default function Files({ param, setFiles, setActiveFile }) {
  // get the data of the root of the repo
  const { isLoading, data, error } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => fetchRepoData(param),
    select: (data) => {
      // transform data into dir first then comes all files
      let dirArray = [];
      let filesArray = [];
      data.repository.object.entries.map((file) => {
        if (file.type === "tree") {
          dirArray.push(file);
        } else {
          filesArray.push(file);
        }
      });

      return [...dirArray, ...filesArray];
    },
  });

  function handleSetFiles(file) {
    // modify data so that editor can take it
    setFiles((currentState) => {
      currentState[file.name] = {
        name: file.name,
        value: file.object.text,
        language: getFileLanguage(file.name),
      };

      return currentState;
    });
    setActiveFile(file.name);
  }

  if (isLoading)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItem: "center",
        }}
      >
        <Spinner />
      </Box>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <Box>
      <nav aria-label="Files">
        <TreeView aria-label="Files">
          {data.map((file) => {
            return file.type === "tree" ? (
              <Entry
                param={param}
                key={file.name}
                path={`HEAD:`}
                file={file}
                handleSetFiles={handleSetFiles}
              />
            ) : (
              <TreeView.Item
                id={file.name}
                key={file.name}
                onSelect={() => handleSetFiles(file)}
              >
                <TreeView.LeadingVisual>
                  <FileIcon />
                </TreeView.LeadingVisual>
                {file.name}
              </TreeView.Item>
            );
          })}
        </TreeView>
      </nav>
    </Box>
  );
}
