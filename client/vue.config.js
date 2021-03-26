module.exports = {
    devServer:{
        proxy:{
            '/' :{
                target: 'http://localhotst:8080',
                changeOrigin: true,
            }
        }
    },
    outputDir : '../server/public'
}