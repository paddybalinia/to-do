const gulp = require("gulp");
const imagemin = require("gulp-imagemin");
const cssmin = require("gulp-cssmin");
const rename = require("gulp-rename");
const scss = require("gulp-sass")(require("sass"));
const minify = require("gulp-minify");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const htmlmin = require("gulp-htmlmin"); // Nuevo módulo añadido

const paths = {
  styles_scss: {
    src: ["static/src/scss/**/*.scss", "!static/src/scss/vars.scss"],
    dest: "static/src/css",
  },
  styles_css: {
    src: "static/src/css/*.css",
    dest: "static/dist/css",
  },
  scripts: {
    src: "static/src/js/**/*.js",
    dest: "static/dist/js",
  },
  images: {
    src: "static/src/images/**/*",
    dest: "static/dist/images",
  },
  fonts: {
    src: "static/src/fonts/**/*",
    dest: "static/dist/fonts",
  },
  html: {
    src: "static/src/*.html", // Actualiza la ruta según tu estructura de archivos HTML
    dest: "static/dist",
  },
};

function compileSass() {
  return gulp
    .src(paths.styles_scss.src)
    .pipe(scss({ bundleExec: true }))
    .pipe(autoprefixer({ overrideBrowserslist: ["> .5%, last 2 versions"] }))
    .pipe(gulp.dest(paths.styles_scss.dest));
}

function minifyCSS() {
  return gulp
    .src(paths.styles_css.src)
    .pipe(cssmin())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest(paths.styles_css.dest));
}

function minifyScripts() {
  return gulp
    .src(paths.scripts.src)
    .pipe(minify())
    .pipe(gulp.dest(paths.scripts.dest));
}

function optimizeImages() {
  return gulp
    .src(paths.images.src)
    .pipe(imagemin([imagemin.mozjpeg({ quality: 100, progressive: true })]))
    .pipe(gulp.dest(paths.images.dest));
}

function optimizeFonts() {
  return gulp
    .src(paths.fonts.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.fonts.dest));
}

const jsFiles = [
  "static/src/js/partials/ContactForm.js",
  // "static/src/js/partials/Header.js",
  // "static/src/js/partials/ScrollIntoView.js",
  // "static/src/js/partials/ViewportObserver.js",
  // "static/src/js/partials/TextTyper.js",
];

function combineScripts() {
  return gulp
    .src([...jsFiles]) // Combina jsFiles y contactJsFiles
    .pipe(concat("Home.js"))
    .pipe(gulp.dest("static/src/js"));
}

function minifyHTML() {
  return gulp
    .src("static/src/*.html") // Actualiza la ruta según tu estructura de archivos HTML
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("static/dist/")); // Actualiza la carpeta de destino según tu preferencia
}
function watchFiles() {
  gulp.watch(paths.images.src, optimizeImages);
  gulp.watch(paths.styles_scss.src, compileSass);
  gulp.watch(paths.styles_css.src, minifyCSS);
  gulp.watch(jsFiles, combineScripts);
  gulp.watch(paths.scripts.src, minifyScripts);
  gulp.watch(paths.fonts.src, optimizeFonts);
  gulp.watch(paths.html.src, minifyHTML);
}

const buildTasks = gulp.parallel(
  compileSass,
  minifyCSS,
  minifyScripts,
  optimizeImages,
  combineScripts,
  optimizeFonts,
  minifyHTML
);

exports.build = buildTasks;
exports.watch = gulp.series(buildTasks, watchFiles);
exports.default = buildTasks;
