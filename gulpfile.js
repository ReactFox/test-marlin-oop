"use strict";

var gulp = require("gulp");
var server = require("browser-sync").create();


gulp.task("css", function () {
    return gulp.src("css/**/*.css")
        .pipe(server.stream())
});

gulp.task("server", function () {
    server.init({
        proxy: "test-marlin-oop",
        notify: false,
        open: true,
        cors: true,
        ui: false,
        tunnel: false,
        online: false
    });

    gulp.watch("source/sass/**/*.css", gulp.series("css"));
    gulp.watch("source/img/**/*.{jpg, png}", gulp.series("refresh"));
    gulp.watch("source/**/*.html", gulp.series("refresh"));
    gulp.watch("source/**/*.php", gulp.series("refresh"));
});

gulp.task("refresh", function (done) {
    server.reload();
    done();
});


gulp.task("build", gulp.series(
    "css",
));

gulp.task("start", gulp.series("build", "server"));
