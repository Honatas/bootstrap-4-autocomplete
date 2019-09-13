const { src, dest, series } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const typescript = require('gulp-typescript');
const uglify = require('gulp-uglify');

const target = 'dist';

var tsProject = typescript.createProject('tsconfig.json');

function clean() {
    return del([target]);
}

function compile() {
    const compiled = tsProject.src().pipe(tsProject());
    compiled.dts.pipe(dest(target));
    return compiled.js.pipe(dest(target));
}

function min() {
    return src(target + '/bootstrap-4-autocomplete.js')
        .pipe(uglify())
        .pipe(rename('bootstrap-4-autocomplete.min.js'))
        .pipe(dest(target));
}

const build = series(
    clean,
    compile,
    min
);

exports.default = build;
