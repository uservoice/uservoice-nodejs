var gulp = require("gulp");
var spawn = require("child_process").spawn;
var node = null;
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
})

gulp.task('serve', function() {
  gulp.run('server')

  gulp.watch(['./**/*.ts'], function() {
    gulp.run(["typescript", 'server']);
  })
  
  // Need to watch for sass changes too? Just add another watch call!
  // no more messing around with grunt-concurrent or the like. Gulp is
  // async by default.
})