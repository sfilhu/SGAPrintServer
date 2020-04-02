// Serial
const SerialPort = require('serialport')

const print = async (list) => {
    await SerialPort.list().then( async (ports) => {
        const port = await ports.filter(item => item.manufacturer != undefined)
        console.log(port)
        if(port.length != 0){
            const printSerialPort = require('./print-serialport');
            const { path, comName } = port[0];
            console.log(process.platform)
            const osPort = process.platform === 'darwin' ? comName : path
            await printSerialPort(list, osPort)
        } else {
            const printUSB = require('./print-usb');
            await printUSB(list);
            return true
        }
    })
};

module.exports = print;