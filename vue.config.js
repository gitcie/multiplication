let path = require('path');

module.exports =  {
    chainWebpack: config => {
        config.resolve.alias
                .set('@', path.resolve(__dirname, 'src'))
                .set('#', path.resolve(__dirname, 'src/api'))
                .set('@c', path.resolve(__dirname, 'src/components'))
                .set('@p', path.resolve(__dirname, 'src/pages'))
    },

    devServer: {
        port: 8082,
        proxy: {
            '/practical': {
                target: process.env.VUE_APP_BASE_URL
            }
        }
    }
}