const exec = require('child_process').exec
const os = require('os')
const yazl = require('yazl')

const defaultOptions = {
  initialFile: '',
  endPath: './',
  zipName: '',
  frontShell: '',
  behindShell: ''
}

export default class WebpackZipPlugin {
  constructor(options) {
    this.options = Object.assign(defaultOptions, options)
  }

  validate(options) {
    if(!options.initialFile || !options.zipName) {
      return false
    }
  }

  handleZip() {
    const zip = new yazl.ZipFile()
    console.log( `✈️  WebpackZipPlugin[${new Date()}]: ${this.options.initialFile}/*-->${this.options.endPath}/${this.options.zipName}` )
    this.options.frontShell && this.spreadStdoutAndStdErr(exec(`${this.options.frontShell}`, this.pipe))
    this.spreadStdoutAndStdErr(exec(`mkdir -p ${this.options.endPath} && zip -r ${this.options.endPath}/${this.options.zipName} ${this.options.initialFile}`, this.pipe))
    this.options.behindShell && this.spreadStdoutAndStdErr(exec(`${this.options.behindShell}`, this.pipe))
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
