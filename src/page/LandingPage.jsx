import {
  Box,
  PageLayout,
  Header,
  Heading,
  Avatar,
  FormControl,
  TextInput,
  Text,
  Button,
  IconButton,
  Link,
  ActionMenu,
  ActionList,

} from "@primer/react";
import GithubGraphQL from '../assets/github-graphql.png';
import GithubPrimer from '../assets/github-primer.png';
import Monaco from '../assets/monaco-logo.png';
import ReactQuery from '../assets/react-query-logo.png';
import {MarkGithubIcon} from '@primer/octicons-react'


import { useEffect, useState } from "react";
import { fetchRepoData, checkRepoData } from "../utils/requestHandler";

function SearchRepo({ param, setParam, setShowEditor }) {
  const [isSearchHappened, setIsSearchHappened] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("submit");

    // make query parameters
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    const searchQuery = fieldValues["github_link"];
    const owner = searchQuery.split("/")[3];
    const name = searchQuery.split("/")[4];
    const queryVar = {
      owner,
      name,
      branch: "HEAD:",
    };

    // check for repo
    const response = await checkRepoData(queryVar);
    console.log("res : ", response);
    if (
      response.repository.object.entries &&
      response.repository.object.entries.length > 0
    ) {
      // set flags
      setParam(queryVar);
      setIsSearchHappened(true);
      setShowEditor(true);
    }
  }

  return (
    <Box width="100%" sx={{p: 8, display: "flex", flexDirection: 'column', alignItems: 'center'}}>
      {isSearchHappened ? (
        <Box>
          <div>Searched, Loading...</div>
        </Box>
      ) : (
        <Box width="50%">
        <form onSubmit={handleSubmit}>
          <FormControl>
            <FormControl.Label sx={{fontSize: "18px", fontFamily: "monospace"}}>Enter Github Repo Link</FormControl.Label>
            <TextInput
              monospace
              size="large"
              block
              aria-label="github link"
              name="github_link"
              placeholder="e.g. https://github.com/pradeeptosarkar/dotRead"
              autoComplete="github link"
              sx={{margin: "10px 0", padding: "0"}}
            />
            <Box width="100%" sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
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
  return (
    <>
      <Box bg="canvas.default" width="100%" minHeight="100vh">
        <PageLayout width="100%">
          <PageLayout.Header>
            <Box sx={{p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
              <div>
              <Text as="p" sx={{fontWeight: 'bold', fontSize: "25px"}}>
                dotRead
              </Text>
              </div>
              <div>
                <Link target="_blank" href="https://github.com/pradeeptosarkar/dotRead">
                 <Avatar
                  src="https://avatars.githubusercontent.com/github"
                  size={30}
                  alt="github link of repo"
                />
                </Link>
              </div>
            </Box>
          </PageLayout.Header>
          <PageLayout.Content>
            <Box bg="canvas.default" width="100%" >
              <Box
                direction="vertical"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Heading sx={{fontSize: "18px", textAlign: 'center', fontFamily:'monospace'}}>
                  Ever felt the need to explore multiple files from a GitHub repository?
                </Heading>

                <Heading sx={{paddingTop: "40px", fontSize: "30px", textAlign: 'center', fontFamily:'monospace'}}>
                  Explore GitHub repositories
                  
                </Heading>

                <Heading sx={{paddingTop: "25px", fontSize: "20px", textAlign: 'center', fontFamily:'monospace'}}>
                   and inspect multiple files with the built-in code editor at once 
                   <br />
                   without forking.!
                </Heading>
                <SearchRepo
                  param={param}
                  setParam={setParam}
                  setShowEditor={setShowEditor}
                />
                {/* { <Button>Your Previous visited Repos</Button> } */}
                { <ActionMenu>
                  <ActionMenu.Button>Your previous visited repos</ActionMenu.Button>

                  <ActionMenu.Overlay>
                    <ActionList>
                      <ActionList.Item onSelect={event => console.log('New file')}>New file</ActionList.Item>
                      <ActionList.Item>Copy link</ActionList.Item>
                      <ActionList.Item>Edit file</ActionList.Item>
                      <ActionList.Divider />
                      <ActionList.Item variant="danger">Delete file</ActionList.Item>
                    </ActionList>
                  </ActionMenu.Overlay>
                </ActionMenu> }
              </Box>
            </Box>
          </PageLayout.Content>
          <PageLayout.Footer sx={{paddingTop: "80px"}}>
            <Box width="100%" sx={{fontFamily: "monospace", fontSize: "20px",display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            
            <Link 
            href="https://github.com/pradeeptosarkar" target="_blank">
              Designed & Built with 🤍 by Pradeepto Sarkar
            </Link>
            
            </Box>
            <Box width="100%" sx={{fontFamily: "monospace", paddingTop: "10px", fontSize: "15px",display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>using</Box>
            <Box

              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                "& > *": {
                  margin: "30px", /* Add margin between the Avatar components */
                },
              }}
            >
              <Box width="10%" sx={{display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <Avatar square size="40" src={GithubGraphQL} />
               <Text as="p" sx={{fontSize: "12px",fontWeight: 'bold', textAlign: 'center'}}>
                  GitHub 
                  <br />
                  GraphQL API
                </Text>
              </Box>
              <Box width="10%" sx={{display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <Avatar square size="40" src={GithubPrimer} />
               <Text as="p" sx={{fontSize: "12px",fontWeight: 'bold', textAlign: 'center'}}>
                  GitHub
                  <br />
                  React Primer
                </Text>
              </Box>
              <Box width="10%" sx={{display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <Avatar square size="40" src={Monaco} />
               <Text as="p" sx={{fontSize: "12px",fontWeight: 'bold', textAlign: 'center'}}>
                  Blazor
                  <br />
                  Monaco Editor
                </Text>
              </Box>
              <Box width="10%" sx={{display: "flex",flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
               <Avatar square size="40" src={ReactQuery} />
               <Text as="p" sx={{fontSize: "12px",fontWeight: 'bold', textAlign: 'center'}}>
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
