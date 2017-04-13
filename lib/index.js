'use strict';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

// const spawn = require('child_process').spawn
var exec = require('child_process').exec;
var os = require('os');

var WebpackZipPlugin = function () {
  function WebpackZipPlugin(options) {
    classCallCheck(this, WebpackZipPlugin);

    this.options = options || {};
  }

  createClass(WebpackZipPlugin, [{
    key: 'validate',
    value: function validate(options) {
      if (!options.initialFile || !options.zipName) {
        return false;
      }
    }
  }, {
    key: 'handleZip',
    value: function handleZip() {
      console.log('\u2708\uFE0F  WebpackZipPlugin[' + new Date() + ']: ' + this.options.initialFile + '-->' + this.options.endPath + '/' + this.options.zipName);
      if (this.options.endPath) {
        this.spreadStdoutAndStdErr(exec('rm -rf ' + this.options.endPath + ' && mkdir ' + this.options.endPath, this.pipe));
      }
      this.spreadStdoutAndStdErr(exec('zip -r -j ' + this.options.endPath + '/' + this.options.zipName + ' ' + this.options.initialFile, this.pipe));
    }
  }, {
    key: 'pipe',
    value: function pipe(error, stdout, stderr) {
      if (error) {
        throw error;
      }
    }
  }, {
    key: 'spreadStdoutAndStdErr',
    value: function spreadStdoutAndStdErr(stream) {
      stream.stdout.pipe(process.stdout);
      stream.stderr.pipe(process.stdout);
    }
  }, {
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('compilation', function (compilation, callback) {
        // console.warn(`✈️  WebpackZipPlugin [${new Date()}]: Verbose is being deprecated, please remove.`);
      });
      compiler.plugin('emit', function (compilation, callback) {
        callback();
      });
      compiler.plugin('done', function (compilation, callback) {
        _this.handleZip();
      });
    }
  }]);
  return WebpackZipPlugin;
}();

module.exports = WebpackZipPlugin;
