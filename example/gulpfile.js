var gulp = require("gulp");
var spawn = require("child_process").spawn;
var node = null;
var runSequence = require("run-sequence");
require("./tasks/typescript");

gulp.task("default", ["typescript"]);

gulp.task("watch", function(){
	gulp.watch(["**/*.ts", "!node_modules"], ["typescript"]);
});

gulp.task('server', function() {
  if (node) node.kill()
  node = spawn('node', ['app.js'], {stdio: 'inherit'})
  node.on('close', function (code) {
    if (code === 8) {
      gulp.log('Error detected, waiting for changes...');
    }
  });
});

gulp.task('serve', function() {
  runSequence("typescript", "server");

  gulp.watch(['./**/*.ts'], function() {
    runSequence("typescript", "server");
  });
});