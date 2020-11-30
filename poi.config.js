module.exports = {
  entry: './renderer/index.js',
  output: {
    dir: './app/renderer',
    // target: 'electron-renderer',
    publicUrl: './',
    fileNames: {
      font: './fonts/[name].[hash:8].[ext]',
      image: './images/[name].[hash:8].[ext]'
    },
    html: {
      template: './renderer/template.html'
    }
  }
}
