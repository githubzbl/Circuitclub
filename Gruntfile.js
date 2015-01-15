
module.exports = function(grunt) { 
   
    grunt.initConfig({
        watch :{
          jade: {
            files: ['views/**'],
            options: {
              livereload: 12345
            }
          },
          js: {
            files: ['public/js/**', 'models/**/*.js', 'schemas/**/*.js'],
            // tasks: ['jshint'],
            options: {
              livereload: 12345
            }
          },
          css: {
            files: ['public/css/**'],
            options: {
              livereload: 12345
            }
          }
        },

        nodemon: {
          dev: {
            script: './bin/www',
            options: {
              file: 'app.js',
              args: [],
              ignoredFiles: ['README.md', 'node_modules/**', '.DS_Store'],
              watchedExtensions: ['js'],
              watchedFolders: ['./'],
              debug: true,
              delayTime: 1,
              env: {
                PORT: 3000
              },
              cwd: __dirname
            }
          }
        },

        concurrent: {
          // tasks: ['nodemon', 'watch', 'less', 'uglify', 'jshint'],
          tasks: ['nodemon', 'watch'],
          options: {
            logConcurrentOutput: true
          }
        }
    });


  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-nodemon')
  grunt.loadNpmTasks('grunt-concurrent')
  // grunt.loadNpmTasks('grunt-mocha-test')
  // grunt.loadNpmTasks('grunt-contrib-less')
  // grunt.loadNpmTasks('grunt-contrib-uglify')
  // grunt.loadNpmTasks('grunt-contrib-jshint')

  grunt.option('force', true)

  grunt.registerTask('default', ['concurrent'])

  // grunt.registerTask('test', ['mochaTest'])
};






