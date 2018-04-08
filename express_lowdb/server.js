const express = require('express');
const app = express();
const cors = require('cors');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('kharisdb.json')
const kharisdb = low(adapter)
const bodyParser = require('body-parser')

app.use(cors());
app.use(bodyParser.json());
kharisdb.defaults({ data: [] }).write()

app.get('/',(req,res)=>{
    var y = kharisdb.get('data').value();
    res.send(y);
})

app.post('/', (req,res)=>{
    kharisdb.get('data').push({ nama:req.body.nama, usia:req.body.usia ,alamat:req.body.alamat}).write()
    console.log(req.body);
    res.send({
        type: 'POST BERHASIL',
        nama: req.body.nama,
        usia: req.body.usia,
        alamat: req.body.alamat,
    });
})

app.listen(3200, ()=>{
    console.log('Server @port Localhost:3200')
})

