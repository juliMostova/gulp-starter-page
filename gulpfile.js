import gulp from "gulp";

import "./gulp/dev.js";
import './gulp/docs.js';



//'pug:dev'
gulp.task(
  'default',
 gulp.series(
  'clear:dev',
  gulp.parallel('html:dev','sass:dev','js:dev','image:dev','fonts:dev','files:dev'),
  gulp.parallel('server:dev','watch:dev')
  
  ));


  //'pug:docs'
  gulp.task(
    'docs',
   gulp.series(
    'clear:docs',
    gulp.parallel('html:docs','sass:docs','js:docs','image:docs','fonts:docs','files:docs'),
    gulp.parallel('server:docs')
    
    ));