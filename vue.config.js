module.exports= {
    lintOnSave: false,
    devServer: {
      overlay: {
        warning: false,
        errors: false
      }
    },

    css: {
      loaderOptions: {
        stylus: {
          'resolve url': true,
          'import': [
            './src/theme'
          ]
        }
      }
    },

    pluginOptions: {
      'cube-ui': {
        postCompile: true,
        theme: true
      }
    }
}
