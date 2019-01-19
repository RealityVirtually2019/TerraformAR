var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
      filename: 'build.js'
    },
    resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
    module: {
      rules: [
        // babel
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        },

        // css
        { 
          test: /\.css$/, 
          loader: "style-loader!css-loader" ,
          exclude: /node_modules/
        },

        // vue
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /(node_modules|bower_components)/,
      },
      
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: 'Terraform AR',
      template: './src/app.html'
    })
  ]
};