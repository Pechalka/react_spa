var path = require('path');
var webpack = require('webpack');
var BowerWebpackPlugin = require('bower-webpack-plugin');
var gulp = require('gulp');
var connect = require('gulp-connect');
var watch = require('gulp-watch')

var config = {
    context: path.join(__dirname, 'app'), // исходная директория
    entry: './main', // файл для сборки, если несколько - указываем hash (entry name => filename)
    output: {
        path: path.join(__dirname, 'build') // выходная директория
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {test: /\.jsx$/, loader: 'jsx-loader?harmony'}
        ]
    },
    plugins: [
        new BowerWebpackPlugin({
            modulesDirectories: ['bower_components'],
            manifestFiles: ['bower.json', '.bower.json'],
            includes: /.*/,
            excludes: /.*\.less$/
        })
    ]
};

gulp.task('build', function(){
	var compiler = webpack(config);
	compiler.run(function (err, stats) {
		if (err){
			console.log('build fail:');
			console.log(err)
		} else {
			console.log('build completed');			
		}
	});
})

gulp.task('watch', function(){
	gulp.watch(['app/**'], ['build'])
})


gulp.task('server', function(){
	connect.server({
        //https://github.com/AveVlad/gulp-connect/issues/27 
        //TODO: use plugin for proxy
		middleware: function(connect, o) {
	        return [ (function() {
	            var url = require('url');
	            var proxy = require('proxy-middleware');
	            var options = url.parse('http://localhost:9999/api');
	            options.route = '/api';
	            return proxy(options);
	        })() ];
    	}
	});
})

gulp.task('default', ['server', 'watch', 'build']);

