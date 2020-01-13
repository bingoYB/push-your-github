const path = require('path')

module.exports = function (env,args) {
  console.log(env)
  console.log(args)
  return {
    entry: {
      index: './src/main.js'
    },
    mode: 'production',
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: '[name].js'
    }
  }
}