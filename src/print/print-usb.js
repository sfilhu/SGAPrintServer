const escpos  = require('escpos');
escpos.USB    = require('escpos-usb');
const device  = new escpos.USB()

if(device) {
    console.log(1)
} else {
    console.log(2)
}


const options = { encoding: "GB18030" /* default */ }
const printer = new escpos.Printer(device, options);

console.log(escpos)

const today = require('./format-date')

const printUSB = (list) => {
    const { data, usuario, aposta, observacao, url, lengthEvents, hash } = list;
    console.log(data.length)
    function removerAcentos( newStringComAcento ) {
        var string = newStringComAcento;
          var mapaAcentosHex 	= {
            a : /[\xE0-\xE6]/g,
            A : /[\xC0-\xC6]/g,
            e : /[\xE8-\xEB]/g,
            E : /[\xC8-\xCB]/g,
            i : /[\xEC-\xEF]/g,
            I : /[\xCC-\xCF]/g,
            o : /[\xF2-\xF6]/g,
            O : /[\xD2-\xD6]/g,
            u : /[\xF9-\xFC]/g,
            U : /[\xD9-\xDC]/g,
            c : /\xE7/g,
            C : /\xC7/g,
            n : /\xF1/g,
            N : /\xD1/g,
          };
      
          for ( var letra in mapaAcentosHex ) {
              var expressaoRegular = mapaAcentosHex[letra];
              string = string.replace( expressaoRegular, letra );
          }
      
          return string;
      }


    device.open( function(erro) {
        if(!erro) {
            printer
            .size(2)
            .align('LT')
            .font('A')
            .text(`${removerAcentos(usuario.nome_banca)}`)
            .text(today())
            .text(`${removerAcentos(usuario.nome_cidade)}`)
            .align('LT')
            .text(`Codigo.: ${aposta.id}`)
            .text(`Cliente: ${removerAcentos(aposta.apostador)}`)
            .text(`Agente.: ${removerAcentos(usuario.nome_usuario)}`)
            .text(`Fone...: ${usuario.telefone}`)
            .text(`Cel....: ${usuario.celular}`)
            .text(`Tipo...: ${ data.length == 1 ? 'Simples' : 'Casadinha' } ${ aposta.impresso == 1 ? ' - 2º via' : '' } ${ aposta.origem == 7 ? ' - Validacao' : '' }` )
            .text('-----------------------------')
            .tableCustom(data)
            .align('LT')
            .text(`Qtd Eventos.....: ${lengthEvents}`)
            .text(`Multiplicador...: ${aposta.multiplicador}`)
            .text(`Valor Apostado..: R$ ${aposta.valor}`)
            .text(`Retorno Possivel: R$ ${aposta.valor_premio}`)
            .text('-----------------------------')
            .text(' ')
            .align('LT')
            .text(removerAcentos(observacao).replace(/(\r\n|\n|\r)/gm, "").split('<br />'))
            .text(' ')
            .text('AS REGRAS ESTAO DISPONIVEIS NO SITE:')
            .text(url)
            .text(' ')
            .text(' ')
            .text(hash)
            .text(' ')
            .text(' ')
            .align('CT')
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