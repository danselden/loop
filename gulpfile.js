var gulp = require("gulp");

// Templates
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');

//Common
var del = require("del");
var rename = require("gulp-rename");
var sourcemaps = require("gulp-sourcemaps");

// JS
var concat = require('gulp-concat');
var uglify = require('gulp-uglify-es').default;

// Styles
var sass = require("gulp-sass");
var postcss = require('gulp-postcss');
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");
var browserSync = require('browser-sync').create();




// Path Variables
gulp.paths = {
	src: "./src/",
	dist: "./dist/",
	vendor: "./node_modules/"
};
var paths = gulp.paths;

// Clean assets
function clean() {
	return del(paths.dist);
}

// Scripts
function scripts(){
	return gulp
		.src([
			paths.vendor + '/jquery/dist/jquery.js',
			paths.src + "assets/js/**/*.js"
		])
		.pipe(sourcemaps.init())
		.pipe(concat('app.js'))
		.pipe(rename({suffix: ".min"}))
		.pipe(uglify())
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.dist + 'assets/js/'));
}

// Sass Compiling
function css(){
	return gulp
			.src(paths.src + "assets/scss/app.scss")
			.pipe(sourcemaps.init())
			.pipe(sass({outputStyle: "expanded"}))
			.on("error", sass.logError)
			.pipe(postcss([autoprefixer(), cssnano()]))
			.pipe(rename({suffix: ".min"}))
			.pipe(sourcemaps.write())
			.pipe(gulp.dest(paths.dist + "assets/css/"))
			.pipe(browserSync.stream());
}

// Nunjucks Rendering
function templates() {
	return gulp
		.src(paths.src + 'pages/**/*.njk')
		// Adding data to Nunjucks
		.pipe(data(function() {
			return require(paths.src + 'data/app.json');
		}))
		// Renders template with nunjucks
		.pipe(nunjucksRender({
				path: ['src/templates/']
			}))
		// output files in app folder
		.pipe(gulp.dest('dist'));
}

function reload(done) {
	browserSync.reload();
	done();
}

function serve(){
	browserSync.init({
		server: {
			baseDir: paths.dist
		}
	});
	gulp.watch(paths.src + "assets/scss/**/*.scss", css);
	gulp.watch(paths.src + "assets/js/**/*.js", scripts);
	gulp.watch(paths.src + "pages/**/*.njk", templates);
	gulp.watch(paths.src + "templates/**/*.njk", templates);
	gulp.watch(paths.dist, reload);
}

function images(){
	return gulp
		.src(paths.src + 'assets/img/**/*')
		.pipe(gulp.dest(paths.dist + '/assets/img/'));
}

function fonts(){
	return gulp
		.src(paths.src + 'assets/fonts/**/*')
		.pipe(gulp.dest(paths.dist + '/assets/fonts/'));
}


exports.serve = serve;
exports.images = images;
exports.css = css;
exports.templates = templates;

var serve = gulp.series(clean, scripts, images, fonts, templates, css, serve);
var build = gulp.series(clean, scripts, images, fonts, templates, css);

gulp.task('default', serve);
gulp.task('build', build);

// Copy over images and js
// gulp.task("copy:img", function() {
//   return gulp.src(paths.src + "assets/img/**/*").pipe(gulp.dest(paths.dist + "img"));
// });
//
// gulp.task("copy:js", function() {
//   // return gulp.src("node_modules/bootstrap/dist/js/**/*.js").pipe(gulp.dest(paths.dist + "js"));
// });





// gulp.task("build", function() {
//   // runSequence("clean:dist", "copy:img", "copy:js", "nunjucks", "sass");
//
// });

// gulp.task("default", gulp.series('serve'), function() {
//   gulp.watch(paths.dist + "**/*.*", gulp.series('bs-reload'));
//   gulp.watch(paths.src + "assets/scss/**/*.scss", gulp.series('sass'));
//   gulp.watch(paths.src + "assets/js/**/*.js", gulp.series('copy:js'));
//   gulp.watch(paths.src + "templates/**/*.njk", gulp.series('nunjucks'));
// });
