var Mocha = require('mocha'),
  exec = require('child_process').exec;

process.chdir(__dirname);
exec('find . -name "*test.js"', function(err, stdout, stderr) {
  var mocha = new Mocha().reporter('spec');
  stdout.trim().split('\n').forEach(function(file) {
    mocha.addFile(file);
  });
  mocha.run();
});
