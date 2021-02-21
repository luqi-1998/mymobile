// 项目根目录中创建了`vue.config.js`
// 导包
const autoprefixer = require('autoprefixer')
// 导包
const pxtorem = require('postcss-pxtorem')

const path = require('path')

// 暴露出去
module.exports = {
  // css属性如何处理
  publicPath: './',
  css: {
    // 处理的选项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer(),
          // 使用 pxtorem库进行转换
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.join(__dirname, './src/style/base.less')]
    }
  },
  devServer: {
    proxy: {
      '/url': {
        target: process.env.VUE_APP_URL,
        pathRewrite: {
          // pathRewrite表示路径重写，key表示一个正则，value表示别名
          '^/url': '' // 即用 '/api'表示'http://localhost:3000/api'
        }
      }
    }
  }
}
