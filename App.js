const { writeFileSync, readFileSync, existsSync, lstatSync } = require('fs')
const { execSync } = require('child_process')
const { resolve, join } = require('path')
module.exports = path => {
  if (!(path && typeof path === 'string' && path.length > 0 && existsSync(path) && lstatSync(path).isDirectory())) throw new Error('Please enter a valid path')
  const pathh = resolve(path)
  const pkgpath = join(pathh, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgpath))
  pkg.scripts.test = 'standard && node test.js | tap-spec'

  writeFileSync(join(pathh, 'test.js'), "const tap = require('tap') \nconst pcj = require('./App')")
  writeFileSync(join(pathh, 'package.json'), JSON.stringify(pkg, null, 2))
  return execSync('npm i standard tap tap-spec --save-dev', {
    cwd: pathh
  }).toString()
}
