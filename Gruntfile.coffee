module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'

    watch:
      coffee:
        files: 'app/coffee/*.coffee'
        tasks: ['coffee:compile']

    coffee:
      compile:
        expand: true
        flatten: true
        cwd: 'app/coffee'
        src: ['*.coffee']
        dest: 'app/js'
        ext: '.js'

  grunt.loadNpmTasks('grunt-contrib-coffee')
  grunt.loadNpmTasks('grunt-contrib-watch')

  grunt.registerTask('default', ['watch:coffee'])
