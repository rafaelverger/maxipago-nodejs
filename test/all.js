var fs = require('fs'),
    nodeunit = require('nodeunit'),
    reporter = nodeunit.reporters['default'],
    testFiles = fs.readdirSync(__dirname).filter(function(file) {
      return /.+-test\.js/.test(file);
    });

process.chdir(__dirname);
reporter.run(testFiles);
