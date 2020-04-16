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
}