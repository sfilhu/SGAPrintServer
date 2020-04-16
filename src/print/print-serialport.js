const escpos      = require('escpos');
escpos.SerialPort = require('escpos-serialport');
const today = require('./format-date')
const axios =  require('axios')


const printSerialPort = async (list, osPort) => {
    
    const { data, usuario, aposta, observacao, url, lengthEvents, hash } = list;

    const serialDeviceOnWindows = new escpos.SerialPort(osPort);
    const options = { encoding: "ISO 8859-1" }
    const printer = new escpos.Printer(serialDeviceOnWindows, options);

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

    serialDeviceOnWindows.open( async function () {
        await printer
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
    });

    await axios.delete(`https://localhost:3001/cupons/${list.id}`).then( () => {
        console.log(`list ${list.id} delete`)
    });
}

module.exports = printSerialPort;