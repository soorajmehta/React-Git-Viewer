module.exports = {
    entry:[        
        './src/index.js'
    ],
    output:{
      path:__dirname,
      filename:'app/js/main.js'  
    },
    devServer: {        
        host:'localhost',
        port: 3030
    },
    module:{
        loaders:[
            {
                test:/\.jsx?$/,
                loader:'babel',
                exclude:/node_modules/
            }
        ]
    }
}