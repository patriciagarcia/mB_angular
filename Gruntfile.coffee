module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      coffee:
        files: 'app/coffee/*.coffee'
        tasks: ['coffee:compile']
      sass:
        files: 'app/css/scss/*.scss'
        tasks: ['sass']

    coffee:
      compile:
        expand: true
        flatten: true
        cwd: 'app/coffee'
        src: ['*.coffee']
        dest: 'app/js'
        ext: '.js'

    sass:
      dist:
        files:
          'app/css/app.css': 'app/css/scss/app.scss'

  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-sass')

  grunt.registerTask('default', ['watch:coffee'])
