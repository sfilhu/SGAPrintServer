'use strict';
const routes  = require('express').Router();
const uniqid  = require('uniqid');
const print   = require('./print');
const formatDate = require('./print/format-date.js');

// 
//  GET
// 
routes.get('/cupons', async (req, res) => {
    return res.json({})
}); 

// 
//  POST
// 
routes.post('/cupons', async (req, res) => {
    const { ligasEventos, aposta, usuario, observacao, url, hash } = req.body;
    
    const data = await ligasEventos.map( item => [
        { text: `\n[ ${item.nome_liga} ]`.substring(0, 42), align:"LEFT", width: 1},
        { text: `\n${item.times}`, align:"LEFT", width: 0.99 },
        { text: `\n${formatDate(item.data_evento)} / ${item.multiplicador_odd}`, align:"LEFT", width: 0.99 },
        { text: `\n-----------------------------`, align:"LEFT", width: 0.99 }
    ])

    let newligasEventos = [];

    for( let i = 0; i < data.length; i++) {
        newligasEventos = newligasEventos.concat(data[i])
    }
    const cupom = await { 
        id : uniqid(), 
        data: newligasEventos, 
        aposta,
        usuario,
        observacao,
        url,
        hash,
        lengthEvents: ligasEventos.length,
        createAt: Date()
    }
    
    print(cupom);
    // listCupons.push(cupom);

    return res.json(req.body)
});


// 
//  DELETE
// 
routes.delete('/cupons/:id', async (req, res) => {
    const { id } = req.params;
    const newStorage = [].filter( item => item.id != id)
    return res.json({ 'cupons': newStorage })
})

module.exports = routes;