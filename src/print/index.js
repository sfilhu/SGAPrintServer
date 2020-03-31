// Serial
const SerialPort = require('serialport')

const print = async (list) => {
    await SerialPort.list().then( async (ports) => {
        const port = await ports.filter(item => item.manufacturer != undefined)
        console.log(port)
        if(port.length != 0){
            const printSerialPort = require('./print-serialport');
            const { path, comName } = port[0];
            await printSerialPort(list, path, comName)
        } else {
            // const printUSB = require('./print-usb');
            // await printUSB(file);
            // return true
        }
    })
};

module.exports = print;