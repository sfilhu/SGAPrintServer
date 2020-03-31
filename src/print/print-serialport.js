const escpos      = require('escpos');
escpos.SerialPort = require('escpos-serialport');
const today = require('./format-date')
const axios =  require('axios')

// console.log(escpos.SerialPort)
const printSerialPort = async (list, osPort) => {
   
    const serialDeviceOnWindows = new escpos.SerialPort(osPort);
    const options = { encoding: "ISO 8859-1" }
    const printer = new escpos.Printer(serialDeviceOnWindows, options);

    serialDeviceOnWindows.open( async function () {
        await printer
            .size(2)
            .align('CT')
            .font('A')
            .text('SGA Bet')
            .text(today())
            .text('Recife - PE')
            .text(' ')
            .align('LT')
            .text(`Codigo.: ${'1234567'}`)
            .text(`Cliente: ${list.name}`)
            .text(`Agente.: ${'Banca Veja 3'}`)
            .text(`Fone...: ${'(81) 9999-999'}`)
            .text(`Tipo...: ${'Casadinha'}`)
            .text('-----------------------------')
            .tableCustom(list.data[0])
            .align('LT')
            .text(`Qtd Eventos.....: ${'2'}`)
            .text(`Multiplicador...: ${'16'}`)
            .text(`Valor Apostado..: R$ ${'3.00'}`)
            .text(`Retorno Possivel: R$ ${'100.00'}`)
            .text('-----------------------------')
            .text(' ')
            .align('CT')
            .text('PAGAMENTO DE PREMIOS EM 48H')
            .text('( Consulte regras )')
            .text(' ')
            .text('Acompanhe sua aposta pelo app BetEsportivo')
            .text('ou pelo site www.[host_name].com.br')
            .text(' ')
            .text('AS REGRAS ESTAO DISPONIVEIS NO SITE:')
            .text('www.[host_name].com.br')
            .qrimage('', function(){
                this.cut();
                this.close();
            });
    });

    await axios.delete(`http://localhost:3001/cupons/${list.id}`).then( () => {
        console.log(`list ${list.id} delete`)
    })

    // for( const item of list) {
        

    // }
}

module.exports = printSerialPort;