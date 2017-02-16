const fs = require('fs')
const path = require('path')
const Components = require('../../components.json')
const themes = [
  'theme-ai'
]
const basepath = path.resolve(__dirname, '../../packages/')

function fileExists (filePath) {
  try {
    return fs.statSync(filePath).isFile()
  } catch (err) {
    return false
  }
}

themes.forEach((theme) => {
  var indexContent = '@import "./base.css";\n'
  Object.keys(Components).forEach(function (key) {
    const fileName = key + '.css'
    indexContent += `@import "./${fileName}";\n`
    const filePath = path.resolve(basepath, theme, 'src', fileName)
    if (!fileExists(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8')
      console.log(theme, ' create new: ', fileName)
    }
  })
  fs.writeFileSync(path.resolve(basepath, theme, 'src', 'index.css'), indexContent)
})
