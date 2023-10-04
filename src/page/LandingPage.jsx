import {
  Box,
  PageLayout,
  Heading,
  Avatar,
  FormControl,
  TextInput,
  Text,
  Button,
  Link,
  ActionMenu,
  ActionList,
  Flash,
  Octicon,
} from "@primer/react";
import { XIcon } from "@primer/octicons-react";
import GithubGraphQL from "../assets/github-graphql.png";
import GithubPrimer from "../assets/github-primer.png";
import Monaco from "../assets/monaco-logo.png";
import ReactQuery from "../assets/react-query-logo.png";
import logo from "../assets/logo.png";

import { useState } from "react";
import { checkRepoData } from "../utils/requestHandler";
import validateGithubUrl from "../utils/validateGithubUrl";

const flashMessage = {
  notFound: "Github repository you are looking for is not found or may be private",
  invalid: "You have entered an invalid github repository link",
};

function SearchRepo({ param, setParam, setShowEditor, setFlashType, setLink }) {
  const [isSearchHappened, setIsSearchHappened] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");

    // make query parameters
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const githubUrl = fieldValues["github_link"];
    setLink(githubUrl);
    // validate github url
    if (!validateGithubUrl(githubUrl)) {
      setFlashType("invalid");
      return;
    }

    const searchQuery = githubUrl.split("/").slice(3);
    const [owner, name] = searchQuery;
    const queryVar = {
      owner,
      name,
      branch: "HEAD:",
    };

    // check for repo
    try {
      const response = await checkRepoData(queryVar);
      console.log("res : ", response);
      if (response.repository.object.entries && response.repository.object.entries.length > 0) {
        // set flags
        setParam(queryVar);
        setIsSearchHappened(true);
        setShowEditor(true);
      }
    } catch (error) {
      setFlashType("notFound");
    }
  }

  return (
    <Box width="100%" sx={{ p: 8, display: "flex", flexDirection: "column", alignItems: "center" }}>
      {isSearchHappened ? (
        <Box>
          <div>Searched, Loading...</div>
        </Box>
      ) : (
        <Box width="50%">
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormControl.Label sx={{ fontSize: "18px", fontFamily: "monospace" }}>
                Enter Github Repo Link
              </FormControl.Label>
              <TextInput
                monospace
                size="large"
                block
                aria-label="github link"
                name="github_link"
                placeholder="e.g. https://github.com/pradeeptosarkar/dotRead"
                autoComplete="github link"
                sx={{ margin: "10px 0", padding: "0" }}
              />
              <Box width="100%" sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <Button type="submit" variant="primary">
                  Submit
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      )}
    </Box>
  );
}

export default function LandingPage({ param, setParam, setShowEditor }) {
  const [flashType, setFlashType] = useState("");
  const [gitHubLink, setGithubLink] = useState("");
  return (
    <>
      <Box bg="canvas.default" width="100%" minHeight="100vh">
        <PageLayout width="100%">
          <PageLayout.Header>
            <Box sx={{ p: 3, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <Avatar src={logo} size={60} alt="logo of dotRead" />
                <Text sx={{ padding: "10px", fontWeight: "bold", fontSize: "25px" }}>dotRead</Text>
              </div>

              {/* <div>
              <Text as="p" sx={{fontWeight: 'bold', fontSize: "25px"}}>
                dotRead
              </Text>
              </div> */}

              <div>
                <Link target="_blank" href="https://github.com/pradeeptosarkar/dotRead">
                  <Avatar src="https://avatars.githubusercontent.com/github" size={30} alt="github link of repo" />
                </Link>
              </div>
            </Box>
          </PageLayout.Header>
          <PageLayout.Content>
            {Boolean(flashType) && (
              <Flash
                variant="warning"
                sx={{ marginBottom: "1.5rem", display: "flex", justifyContent: "space-between" }}
              >
                <Text as="p" sx={{ fontWeight: "bold", fontSize: "15px" }}>
                  {flashMessage[flashType]}
                </Text>
                {/* unstyle button */}
                <Button
                  sx={{
                    padding: "0",
                    height: "auto",
                    width: "auto",
                    border: "none",
                    backgroundColor: "unset",
                    "&:hover": { backgroundColor: "unset" },
                  }}
                  onClick={() => setFlashType("")}
                >
                  <Octicon icon={XIcon} size="18" />
                </Button>
              </Flash>
            )}

            <Box bg="canvas.default" width="100%">
              <Box
                direction="vertical"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Heading sx={{ fontSize: "18px", textAlign: "center", fontFamily: "monospace" }}>
                  Ever felt the need to explore multiple files from a GitHub repository?
                </Heading>

                <Heading sx={{ paddingTop: "40px", fontSize: "30px", textAlign: "center", fontFamily: "monospace" }}>
                  Explore GitHub repositories
                </Heading>

                <Heading sx={{ paddingTop: "25px", fontSize: "20px", textAlign: "center", fontFamily: "monospace" }}>
                  and inspect multiple files with the built-in code editor at once
                  <br />
                  without forking.!
                </Heading>
                <SearchRepo
                  param={param}
                  setParam={setParam}
                  setShowEditor={setShowEditor}
                  setFlashType={setFlashType}
                  setLink={setGithubLink}
                />
                {/* { <Button>Your Previous visited Repos</Button> } */}
                {
                  <ActionMenu>
                    <ActionMenu.Button>Your previous visited repos</ActionMenu.Button>

                    <ActionMenu.Overlay>
                      <ActionList>
                        <ActionList.Item onSelect={() => console.log("New file")}>New file</ActionList.Item>
                        <ActionList.Item onSelect={() => navigator.clipboard.writeText(gitHubLink)}>Copy link</ActionList.Item>
                        <ActionList.Item>Edit file</ActionList.Item>
                        <ActionList.Divider />
                        <ActionList.Item variant="danger">Delete file</ActionList.Item>
                      </ActionList>
                    </ActionMenu.Overlay>
                  </ActionMenu>
                }
              </Box>
            </Box>
          </PageLayout.Content>
          <PageLayout.Footer sx={{ paddingTop: "80px" }}>
            <Box
              width="100%"
              sx={{
                fontFamily: "monospace",
                fontSize: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link href="https://github.com/pradeeptosarkar" target="_blank">
                Designed & Built with 🤍 by Pradeepto Sarkar
              </Link>
            </Box>

            <Box
              width="100%"
              sx={{
                fontFamily: "monospace",
                paddingTop: "10px",
                fontSize: "15px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              using
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                "& > *": {
                  margin: "30px" /* Add margin between the Avatar components */,
                },
              }}
            >
              <Box
                width="10%"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <Link target="_blank" href="https://docs.github.com/en/graphql">
                  <Avatar square size="40" src={GithubGraphQL} />
                </Link>

                <Text as="p" sx={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
                  GitHub
                  <br />
                  GraphQL API
                </Text>
              </Box>
              <Box
                width="10%"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <Link target="_blank" href="https://primer.style/react/getting-started">
                  <Avatar square size="40" src={GithubPrimer} />
                </Link>

                <Text as="p" sx={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
                  GitHub
                  <br />
                  React Primer
                </Text>
              </Box>
              <Box
                width="10%"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <Link target="_blank" href="https://microsoft.github.io/monaco-editor/">
                  <Avatar square size="40" src={Monaco} />
                </Link>

                <Text as="p" sx={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
                  Blazor
                  <br />
                  Monaco Editor
                </Text>
              </Box>
              <Box
                width="10%"
                sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}
              >
                <Link target="_blank" href="https://tanstack.com/query/latest/docs/react/overview">
                  <Avatar square size="40" src={ReactQuery} />
                </Link>
                <Text as="p" sx={{ fontSize: "12px", fontWeight: "bold", textAlign: "center" }}>
                  React
                  <br />
                  Query
                </Text>
              </Box>
            </Box>
          </PageLayout.Footer>
        </PageLayout>
      </Box>
    </>
  );
}
