module.exports = (grunt) ->

  grunt.initConfig
    coffee:
      glob_to_multiple:
        expand: true
        flatten: true
        cwd: 'app/coffee'
        src: ['*.coffee']
        dest: 'app/js'
        ext: '.js'

  grunt.loadNpmTasks('grunt-contrib-coffee')

  grunt.registerTask('default', ['coffee'])
