module.exports = function(grunt) {
    var path = require('path');
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        devDir: 'static',
        cssDir: '<%= devDir %>/style/css',
        boverComponents: '<%= devDir %>/js/bower_components',
        scssDir: '<%= devDir %>/style/scss',
        jsDir: '<%= devDir %>/js',
        imgDir: '<%= devDir %>/images',
        compiledDir: 'static',
        compiledCssDir: '<%= compiledDir %>/style/css',
        compiledJsDir: '<%= compiledDir %>/js',
        compiledImgDir: '<%= compiledDir %>/img',
        closureLibraryPath: 'node_modules/google-closure-library',
        closureCompilerPath: 'node_modules/google-closure-compiler',
        projectRoot: path.dirname(path.resolve('package.json')),
        sass: {
            dev: {
                files: {
                    '<%= compiledCssDir %>/style.css': '<%= scssDir %>/app.scss',
                },
                options: {
                    compass: true,
                    style: 'expanded',
                    loadPath: '<%= scssDir %>/compass'
                }
            },
            build: {
                files: {
                    '<%= compiledCssDir %>/style.css': '<%= scssDir %>/app.scss',
                },
                options: {
                    compass: true,
                    style: 'compressed'
                }
            }
        },
        watch: {
            css: {
                files: [
                    '<%= scssDir %>/**/*.scss'
                ],
                tasks: ['sass:dev', 'notify:css']
            },
            js: {
                files: [
                    '<%= jsDir %>/**/*.js',
                    '<%= jsDir %>/**/**/*.js'
                ],
                tasks: ['concat', 'notify:jsconcat']
            }
        },
        notify: {
            css: {
                options: {
                    title: 'CSS complete',
                    message: 'Sass compile completed'
                }
            },
            jsconcat: {
                options: {
                    title: 'JS complete',
                    message: 'JS compile completed'
                }
            }
        },
        closureDepsWriter: {
            options: {
                closureLibraryPath: '<%= closureLibraryPath %>'
            },
            dev: {
                options: {
                    //root:['<%= jsDir %>/app'],
                    root_with_prefix: '"<%= jsDir %>/app ../../static/js/app"',
                },
                dest: '<%= jsDir %>/app/dependecies.js'
            }
        },
        closureBuilder: {
            options: {
                closureLibraryPath: '<%= closureLibraryPath %>',
                builder: '<%= closureLibraryPath %>/closure/bin/build/closurebuilder.py',
                compilerFile: '<%= closureCompilerPath %>/compiler.jar',
                compile: true,
                compilerOpts: {
                    'language_in': 'ECMASCRIPT5_STRICT',
                    'compilation_level': 'SIMPLE_OPTIMIZATIONS',
                    // 'dependency_mode': 'LOOSE',
                    'js': '<%= boverComponents %>/google-closure-library/closure/goog/deps.js',
                    // 'js':'<%= jsDir %>/app/dependecies.js',
                    // 'js':'<%= jsDir %>/app/**.js'
                }
            }
        }
    });
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-closure-compiler');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-closure-tools');
    grunt.registerTask('deps', ['closureDepsWriter:dev']);
    grunt.registerTask('build', [
        'sass:build',
        'closureBuilder:build'
    ]);
    // Default task(s).
    grunt.registerTask('styles', ['sass:dev']);
    grunt.registerTask('dev', ['styles', 'watch']);
};