import { request, gql } from 'graphql-request'

const graphql_endpoint = 'https://api.github.com/graphql'

const requestHeaders = {
  authorization: `bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
}

const getRepoRootData = gql`
query RepoFiles($owner: String!, $name: String!, $branch: String!) {
  repository(owner: $owner, name: $name) {
    object(expression: $branch) {
      ... on Tree {
        entries {
          name
          type
          mode
          
          object {
            ... on Blob {
              byteSize
              text
              isBinary
            }
          }
        }
      }
    }
  }
}
`;

const checkRepoRootData = gql`
query RepoFiles($owner: String!, $name: String!, $branch: String!) {
  repository(owner: $owner, name: $name) {
    object(expression: $branch) {
      ... on Tree {
        entries {
          name
        }
      }
    }
  }
}
`;

function fetchRepoData(param){

  return request(
    graphql_endpoint,
    getRepoRootData,
    param,
    requestHeaders
  )
}

function checkRepoData(param){

  return request(
    graphql_endpoint,
    checkRepoRootData,
    param,
    requestHeaders
  )
}

export {
  fetchRepoData,
  checkRepoData
}