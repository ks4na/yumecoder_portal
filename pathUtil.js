const url = require('url')

function ensureSlash(inputPath, needsSlash) {
  const hasSlash = inputPath.endsWith('/')
  if (hasSlash && !needsSlash) {
    return inputPath.substr(0, inputPath.length - 1)
  } else if (!hasSlash && needsSlash) {
    return `${inputPath}/`
  } else {
    return inputPath
  }
}

const getPublicUrl = appPackageJson => require(appPackageJson).config.publicPath

function getServedPath(appPackageJson) {
  const publicUrl = getPublicUrl(appPackageJson)
  const servedUrl = publicUrl ? url.parse(publicUrl).pathname : '/'
  return ensureSlash(servedUrl, true)
}
module.exports = { getServedPath, ensureSlash }
