const { src, dest, watch, parallel, series } = require("gulp"),
	sass = require('gulp-sass'),
	cleanCSS = require('gulp-clean-css'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer'),
	sync = require("browser-sync").create();


const paths = {
	styles: {
		bootstrap: './public/scss/**/*.scss',
		dest: './public/build/css'
	},
	fonts: {
		bootstrapIcon: './node_modules/bootstrap-icons/font/bootstrap-icons.css',
		dest: './public/build/fonts'
	},
	fontsIcons: {
		bootstrapIconFonts: './node_modules/bootstrap-icons/font/fonts/*.*',
		dest: './public/build/fonts/fonts'
	},
	js: {
		script: './public/js/**/*.js',
		dest: './public/build/js'
	}
}	

function styles(callback) {
    src([
		paths.styles.bootstrap
	])
    	.pipe(sourcemaps.init())
    	.pipe(sass().on('error', sass.logError))
    	.pipe(postcss([autoprefixer({
	      overrideBrowserslist: [
	        'Chrome >= 35',
	        'Firefox >= 38',
	        'Edge >= 12',
	        'Explorer >= 10',
	        'iOS >= 8',
	        'Safari >= 8',
	        'Android 2.3',
	        'Android >= 4',
	        'Opera >= 12']
	    })]))
    	.pipe(cleanCSS())
    	.pipe(sourcemaps.write())
        .pipe(dest(paths.styles.dest))
        .pipe(sync.stream());
    callback();
};

function fonts(callback) {
    src([
		paths.fonts.bootstrapIcon
	])
		.pipe(dest(paths.fonts.dest))
		.pipe(sync.stream());
	callback();
};

function fontsIcons(callback) {
    src([
		paths.fontsIcons.bootstrapIconFonts
	])
		.pipe(dest(paths.fontsIcons.dest))
		.pipe(sync.stream());
	callback();
};

function js(callback) {
    src([
		paths.js.script
	])
		.pipe(dest(paths.js.dest))
    	.pipe(sync.stream());
    callback();
};

function watchFiles(callback) {
    watch('./public/scss/**/*.scss', styles);
    watch('./public/js/**/*.js', js);
};


exports.default = series(styles, js, fonts, fontsIcons, watchFiles);