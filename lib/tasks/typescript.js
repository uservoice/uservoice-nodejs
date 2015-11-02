var gulp = require("gulp");
var ts = require("gulp-typescript");
var dts = require("dts-bundle");
var merge = require("merge2");

var tsProject = ts.createProject("tsconfig.json")
gulp.task("typescript", ["build-typescript", "generate-declarations"]);

gulp.task("build-typescript", function(){
	var tsResult = tsProject.src()
		.pipe(ts(tsProject));
		
	return merge([tsResult.js.pipe(gulp.dest("./")), tsResult.dts.pipe(gulp.dest("./"))]);
});

gulp.task("generate-declarations", function() {
	dts.bundle({
		name: "uservoice",
		main: "./index.d.ts",
		baseDir: "./",
		out: "./declarations/uservoice.d.ts"
	});
});