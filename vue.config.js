module.exports = {
  chainWebpack: config => {
    config.externals({
      ...config.get('externals'),
      "serialport": "require('serialport')",
      "escpos": "require('escpos')",
      "usb": "require('usb')",
      "printer": "require('printer')",
      "escpos.USB": "require('escpos-usb')",
    })
  },
  pluginOptions: {
    electronBuilder: {
      // List native deps here if they don't work
      externals: ['serialport', 'escpos'],
      // If you are using Yarn Workspaces, you may have multiple node_modules folders
      // List them all here so that VCP Electron Builder can find them
      nodeModulesPath: ['../../node_modules', './node_modules'],
     
      extraResources: [
        {
          "from": "./extraResources",
          "to": "extraResources",
          "filter": ["**/*"]
        },
      ],
      
      builderOptions: {
        appId: 'sgaprinterserver.com',
        files: ['ssl/*'],
        mac: {
          icon: 'public/logo-512x512.png',
          target: ["default"]
        },
        win: {
          icon: 'public/logo-256x256.png'
        }
      }
    }
  }
}


// "build": {
//   "extraResources": [
//     {
//       "from": "./cert.pem",
//       "to": "cert.pem",
//       "filter": [
//         "**/*"
//       ]
//     }
//   ]
// },