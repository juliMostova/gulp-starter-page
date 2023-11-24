import gulp from 'gulp';
import fileinclude from 'gulp-file-include';
import gulpSaas from 'gulp-sass';
import globSaas from 'gulp-sass-glob';
import dartSaas from 'sass';
import liveReload from 'gulp-server-livereload';
import del from 'del';
import  fs from 'fs';
import sourceMaps from 'gulp-sourcemaps';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webpack from'webpack';
import webpackConfig from './../webpack.config.js';
import webpackStr from'webpack-stream';
import babel from'gulp-babel';
import imageMin from 'gulp-imagemin';
import changed from 'gulp-changed';
import pug from 'gulp-pug';




const sass = gulpSaas(dartSaas);



gulp.task('clear:dev',function(done){
if (fs.existsSync('./build/')){
  return del('./build/')
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


gulp.task('html:dev',function(){
    return gulp
    .src(['./src/html/**/*.html','!./src/html/blocks/*.html'])
    .pipe(changed('./build/'))
    .pipe(plumber(plumberNotify('HTML')))
    .pipe(fileinclude(includeSettings))
    .pipe(gulp.dest('./build/'));
});

gulp.task('pug:dev',function(){
return gulp.src('./src/pug/*.pug')
.pipe(plumber(plumberNotify('Pug')))
.pipe(pug({pretty:true}))
.pipe(gulp.dest('./build/'))
});

gulp.task('sass:dev',function(){
    return gulp.src('./src/scss/*.scss')
    .pipe(changed('./build/css/'))
    .pipe(plumber(plumberNotify('SCSS')))
    .pipe(sourceMaps.init())
    .pipe(globSaas())
     .pipe(sass())
     .pipe(sourceMaps.write())
     .pipe(gulp.dest('./build/css/'));
});

gulp.task('image:dev',function(){
    return gulp.src('./src/images/**/*')
    .pipe(changed('./build/img/'))
    // .pipe(imageMin({verbose: true}))
    .pipe(gulp.dest('./build/img/'));
});

gulp.task('fonts:dev',function(){
    return gulp.src('./src/fonts/**/*')
    .pipe(changed('./build/fonts/'))
  .pipe(gulp.dest('./build/fonts/'));
});

gulp.task('files:dev',function(){
    return gulp.src('./src/files/**/*')
    .pipe(changed('./build/files/'))
  .pipe(gulp.dest('./build/files/'));
});

gulp.task('server:dev',function(){

    return gulp.src('./build/')

    .pipe(liveReload({
        livereload:true,
        open:true
    }))

});

gulp.task('js:dev',function(){
    return gulp
  .src('./src/js/*.js')
  .pipe(changed('./build/js/'))
  .pipe(plumber(plumberNotify('JavaScript')))
  // .pipe(babel())
  .pipe(webpackStr(webpackConfig))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('watch:dev',function(){

    gulp.watch('./src/scss/**/*.scss',gulp.parallel('sass:dev'));
     gulp.watch('./src/**/*.html',gulp.parallel('html:dev'));
    // gulp.watch('./src/**/*.pug',gulp.parallel('pug:dev'));
    gulp.watch('./src/images/**/*',gulp.parallel('image:dev'));
    gulp.watch('./src/js/**/*.js',gulp.parallel('js:dev'));
    gulp.watch('./src/fonts/**/*',gulp.parallel('fonts:dev'));
    gulp.watch('./src/files/**/*',gulp.parallel('files:dev'));
});





