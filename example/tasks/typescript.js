var gulp = require("gulp");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("tsconfig.json")
gulp.task("typescript", function() {
	var tsResult = tsProject.src()
		.pipe(ts(tsProject));
		
		return tsResult.js.pipe(gulp.dest("./"))
});