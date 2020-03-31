const escpos  = require('escpos');
escpos.USB    = require('escpos-usb');
const device  = new escpos.USB()
const options = { encoding: "GB18030" /* default */ }
const printer = new escpos.Printer(device, options);


const today = require('./format-date')

const printUSB = (file) => {
    device.open( function(erro) {
        if(!erro) {
            printer
            .size(2)
            .align('CT')
            .font('A')
            .text('SGA Bet')
            .text(today())
            .text('Recife - PE')
            .text(' ')
            .align('LT')
            .text(`Codigo.: ${'1234567'}`)
            .text(`Cliente: ${'Jonas'}`)
            .text(`Agente.: ${'Banca Veja 3'}`)
            .text(`Fone...: ${'(81) 9999-999'}`)
            .text(`Tipo...: ${'Casadinha'}`)
            .text('-----------------------------')
            .tableCustom(file)
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
        } else {
            console.log(erro)
        }
    })
}

module.exports = printUSB;