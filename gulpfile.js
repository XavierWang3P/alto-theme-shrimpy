const {series, parallel, watch, src, dest} = require('gulp');
const pump = require('pump');
const path = require('path');
const order = require('ordered-read-streams');

// gulp plugins and utils
const livereload = require('gulp-livereload');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const beeper = require('beeper');
const zip = require('gulp-zip');

// postcss plugins
const easyimport = require('postcss-easy-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

// translations support
const { mergeLocales } = require('@tryghost/theme-translations/build');
const sharedThemeAssetsPath = path.dirname(require.resolve('@tryghost/shared-theme-assets/package.json'));

function serve(done) {
    livereload.listen();
    done();
}

function handleError(done) {
    return function (err) {
        if (err) {
            beeper();
        }
        return done(err);
    };
};

function hbs(done) {
    pump([
        src(['*.hbs', 'partials/**/*.hbs']),
        livereload()
    ], handleError(done));
}

function css(done) {
    pump([
        src('assets/css/screen.css', {sourcemaps: true}),
        postcss([
            easyimport,
            autoprefixer(),
            cssnano()
        ]),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function js(done) {
    pump([
        src('assets/js/main.js', {sourcemaps: true}),
        concat('main.min.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function postJs(done) {
    const sharedJsPath = `${sharedThemeAssetsPath}/assets/js/v1`;

    pump([
        order([
            src(`${sharedJsPath}/lib/vendor/photoswipe.min.js`),
            src(`${sharedJsPath}/lib/vendor/photoswipe-ui-default.min.js`),
            src(`${sharedJsPath}/lib/lightbox.js`),
            src(`${sharedJsPath}/lib/vendor/reframe.min.js`),
            src('assets/js/post.js')
        ], {sourcemaps: true}),
        concat('post.min.js'),
        uglify(),
        dest('assets/built/', {sourcemaps: '.'}),
        livereload()
    ], handleError(done));
}

function zipper(done) {
    const filename = require('./package.json').name + '.zip';

    pump([
        src([
            '**',
            '!node_modules', '!node_modules/**',
            '!dist', '!dist/**',
            '!pnpm-debug.log',
            '!pnpm-lock.yaml',
            '!pnpm-workspace.yaml',
            '!AGENTS.md',
            '!CLAUDE.md',
        ], {encoding: false}),
        zip(filename),
        dest('dist/')
    ], handleError(done));
}

function locales(done) {
    mergeLocales({
        local: './locales-local',
        output: './locales'
    })(done);
}

const localesWatcher = () => watch('./locales-local/**/*.json', locales);
const hbsWatcher = () => watch(['*.hbs', 'partials/**/*.hbs'], hbs);
const cssWatcher = () => watch('assets/css/**/*.css', css);
const jsWatcher = () => watch('assets/js/**/*.js', parallel(js, postJs));
const watcher = parallel(hbsWatcher, cssWatcher, jsWatcher, localesWatcher);
const build = series(css, parallel(js, postJs), locales);

exports.build = build;
exports.zip = series(build, zipper);
exports.default = series(build, serve, watcher);
