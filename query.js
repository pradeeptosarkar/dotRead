const repoTreeQuery = gql`
query RepoFiles($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    object(expression: "HEAD:") {
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

const variables = {
  owner: "Roshan-Horo",
  name: "ghw_comp_lib"
}

const oneLevelDown = gql`
query RepoFiles($owner: String!, $name: String!) {
  repository(owner: $owner, name: $name) {
    object(expression: "HEAD:") {
      # Top-level.
      ... on Tree {
        entries {
          name
          type
          object {
            ... on Blob {
              byteSize
              text
            }

            # One level down.
            ... on Tree {
              entries {
                name
                type
                object {
                  ... on Blob {
                    byteSize
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;