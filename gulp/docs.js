import gulp from 'gulp';
//HTML
import fileinclude from 'gulp-file-include';
import htmlclean from 'htmlclean';
import webphtml from 'gulp-webp-html';

//SCSS
import gulpSaas from 'gulp-sass';
import globSaas from 'gulp-sass-glob';
import dartSaas from 'sass';
import autoprefixer from 'gulp-autoprefixer';
import csso from 'gulp-csso';
import webpCss from "gulp-webpcss";

import liveReload from 'gulp-server-livereload';
import del from 'del';
import  fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
import mediaQueries from 'gulp-group-css-media-queries';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from'webpack';
import webpackConfig from '../webpack.config.js';
import webpackStr from'webpack-stream';
import babel from'gulp-babel';
import changed from 'gulp-changed';

//image
import webp from 'gulp-webp';
import imageMin from 'gulp-imagemin';

//pug
import pug from 'gulp-pug';



const sass = gulpSaas(dartSaas);



gulp.task('clear:docs',function(done){
if (fs.existsSync('./docs/')){
  return del('./docs/')
}
   done();
});



const includeSettings ={
        prefix:'@@',
        basepath:'@file'  
}
const plumberNotify = (title)=> {
    
       return {
         errorHandler:notify.onError({
            title:title,
            message:'Error: <%= error.message %>',
            sound:false
        }),
    };
}


gulp.task('html:docs',function(){
    return gulp
    .src(['./src/html/**/*.html','!./src/html/blocks/*.html'])
    .pipe(changed('./docs/',{hasChanged:changed.compareContents}))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileinclude(includeSettings))
    .pipe(webphtml())
    // .pipe(htmlclean())
    .pipe(gulp.dest('./docs/'));
});

gulp.task('pug:docs',function(){
  return gulp.src('./src/pug/*.pug')
  .pipe(plumber(plumberNotify('Pug')))
  .pipe(pug({pretty:true}))
  .pipe(gulp.dest('./docs/'))
  });

gulp.task('sass:docs',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(changed('./docs/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    //.pipe(sourceMaps.init())
    .pipe(autoprefixer())
    .pipe(globSaas())
    .pipe(webpCss())
    .pipe(mediaQueries())
     .pipe(sass())
     .pipe(csso())
    
    //.pipe(sourceMaps.write())
     .pipe(gulp.dest('./docs/css/'));
});

gulp.task('image:docs',function(){
    return gulp.src('./src/images/**/*')
    .pipe(changed('./docs/img/'))
    .pipe(webp())
    .pipe(gulp.dest('./docs/img/'))
    .pipe(gulp.src('./src/images/**/*'))
    .pipe(changed('./docs/img/'))
    .pipe(imageMin({verbose: true}))
    .pipe(gulp.dest('./docs/img/'));
});

gulp.task('fonts:docs',function(){
    return gulp.src('./src/fonts/**/*')
    .pipe(changed('./docs/fonts/'))
  .pipe(gulp.dest('./docs/fonts/'));
});

gulp.task('files:docs',function(){
    return gulp.src('./src/files/**/*')
    .pipe(changed('./docs/files/'))
  .pipe(gulp.dest('./docs/files/'));
});

gulp.task('server:docs',function(){

    return gulp.src('./docs/')

    .pipe(liveReload({
        livereload:true,
        open:true
    }))

});

gulp.task('js:docs',function(){
    return gulp
  .src('./src/js/*.js')
  .pipe(changed('./docs/js/'))
  .pipe(plumber(plumberNotify('JavaScript')))
  .pipe(babel())
  .pipe(webpackStr(webpackConfig))
  .pipe(gulp.dest('./docs/js'));
});






