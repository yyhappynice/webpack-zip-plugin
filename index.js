const exec = require('child_process').exec
const os = require('os')

const defaultOptions = {
  initialFile: '',
  endPath: '',
  zipName: '',
  publishShell: '',
}

export default class WebpackZipPlugin {
  constructor(options) {
    this.options = options || {}
  }

  validate(options) {
    if(!options.initialFile || !options.zipName) {
      return false
    }
  }

  handleZip() {
    console.log( `✈️  WebpackZipPlugin[${new Date()}]: ${this.options.initialFile}-->${this.options.endPath}/${this.options.zipName}` )
    if(this.options.endPath) {
      this.spreadStdoutAndStdErr(exec(`rm -rf ${this.options.endPath} && mkdir ${this.options.endPath}`, this.pipe))
    }
    this.spreadStdoutAndStdErr(exec(`zip -r -j ${this.options.endPath}/${this.options.zipName} ${this.options.initialFile}`, this.pipe))
  }

  pipe(error, stdout, stderr) {
    if (error) {
      throw error;
    }
  }

  spreadStdoutAndStdErr(stream) {
    stream.stdout.pipe(process.stdout)
    stream.stderr.pipe(process.stdout)
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation, callback) => {
    })
    compiler.plugin('emit', (compilation, callback) => {
      callback()
    })
    compiler.plugin('done', (compilation, callback) => {
      this.handleZip()
    })
  }
}
