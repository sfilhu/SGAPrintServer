'use strict';
const routes  = require('express').Router();
const storage = require('electron-json-storage');
const uniqid  = require('uniqid');
const print   = require('./print');

// 
//  GET
// 
routes.get('/cupons', async (req, res) => {
    storage.get('cupons', function(error, data) {
        if (error) throw error;
        return res.json({ 'cupons': data })
    });
});


// 
//  POST
// 
routes.post('/cupons', async (req, res) => {
    const { data, name } = req.body



    storage.get('cupons', function(error, listCupons) {
        if (error) throw error;
        const cupom = { 
            id : uniqid(), 
            data:  data.map( item => {
                return [
                  { text: `\n[ ${item.match.name_tournament} ]`, align:"LEFT", width: 0.99},
                  { text: `\n${item.match.competidor1} x ${item.match.competidor2}`, align:"LEFT", width: 0.99 },
                  { text: `\n${item.match.date} ${item.match.hour} / [ ${item.odd.oddPrice} ]`, align:"LEFT", width: 0.99 },
                  { text: `\n-----------------------------`, align:"LEFT", width: 0.99 },
                ]
            }), 
            name,
            createAt: Date()
        }
        
        print(cupom);
        listCupons.push(cupom);

        storage.set('cupons', listCupons, function(error) {
            if (error) throw error;

            return res.json({ 'cupons': listCupons })
        });
    });
});


// 
//  DELETE
// 
routes.delete('/cupons/:id', async (req, res) => {
    storage.get('cupons', function(error, listCupons) {
        if (error) throw error;
        const { id } = req.params;
        const newStorage = listCupons.filter( item => item.id != id)
        storage.set('cupons', newStorage, function(error) {
            if (error) throw error;
            return res.json({ 'cupons': newStorage })
        }); 
    });
})

module.exports = routes;