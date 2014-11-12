module.exports = function(grunt){
    // load plugins
    [
        'grunt-cafe-mocha',
        'grunt-contrib-jshint',
        'grunt-exec',
    ].forEach(function(task){
        grunt.loadNpmTasks(task);
    });
    // configure plugins
    grunt.initConfig({
        cafemocha: {
            all: { src: 'qa/tests-*.js', options: { ui: 'tdd' }, }
        },
        jshint: {
            app: ['rtchokeserver.js', 'public/js/**/*.js',
                'lib/**/*.js'],
                qa: ['Gruntfile.js', 'public/qa/**/*.js', 'qa/**/*.js'],
        },
        exec: {
            linkchecker:
                3. See the grunt.option documentation to get started.
                { cmd: 'linkchecker http://localhost:3000' }
        },
    });
    // register tasks
    grunt.registerTask('default', ['cafemocha','jshint','exec']);
};


