var gulp = require("gulp");
var ts = require("gulp-typescript");
var stripLine  = require('gulp-strip-line');
var merge = require("merge2");

var tsProject = ts.createProject("tsconfig.json")

gulp.task("typescript", function(){
	var tsResult = tsProject.src()
		.pipe(ts(tsProject));
		
	return merge([
		tsResult.js
			.pipe(stripLine("/// <reference path="))
			.pipe(gulp.dest("dist")),
		tsResult.dts
			.pipe(stripLine("/// <reference path="))
			.pipe(gulp.dest("dist"))
	]);
});

gulp.task("watch", function(){
	gulp.watch("./src/**/*.ts", ["typescript"]);
});