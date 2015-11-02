var gulp = require("gulp");
require("./tasks/typescript");

gulp.task("default", ["typescript"]);

gulp.task("watch", function(){
	gulp.watch(["**/*.ts", "!node_modules", "!**/*.d.ts"], ["typescript"]);
});