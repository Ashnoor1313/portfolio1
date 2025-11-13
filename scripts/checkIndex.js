// scripts/checkIndex.js
const fs = require('fs')
const path = require('path')
const root = process.cwd()
const suspect = path.join(root, 'index.tsx')
if (fs.existsSync(suspect)) {
console.log('Found index.tsx at project root — this repo is JS-only, so delete or move it.')
console.log('Path:', suspect)
const content = fs.readFileSync(suspect, 'utf8')
console.log('--- first 200 chars of index.tsx ---')
console.log(content.slice(0, 200))
process.exit(0)
} else {
console.log('No index.tsx found at project root.')
process.exit(0)
}