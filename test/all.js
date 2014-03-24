var nodeunit = require('nodeunit'),
    reporter = nodeunit.reporters['default'],
    exec = require('child_process').exec;

process.chdir(__dirname);
exec('find . -name "*test.js"', function(err, stdout, stderr) {
  var testFiles = stdout.trim().split('\n');
  reporter.run(testFiles);
});
