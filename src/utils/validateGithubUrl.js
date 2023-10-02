export default function validateGithubUrl(url) {
  const regex = /https:\/\/github.com\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+/g
  return regex.test(url)
}
