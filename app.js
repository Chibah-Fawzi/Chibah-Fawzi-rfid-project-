const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser')
const cors = require('cors')


app.use(bodyParser.json())
app.use(cors())

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://fawzi:rfid@cluster0.dt27d.mongodb.net/test')
    .then(() => console.log('DB CONNECTED'))
    .catch(error => console.log(error))

const Schema = mongoose.Schema

var moutonSchema = new Schema({
    "poids": [{
        poid: Number,
        _id : false
    }],
    tid: Number,
    epc: Number,
    createdAt: {
        type: Date,
        default: Date.now()
    },
})

var moutonModel = mongoose.model('mouton', moutonSchema)




app.get('/', (req, res) => {

    moutonModel.find().then(response => {
        res.json(response)
    })
})

app.post('/', (req, res) => {

    const poid = new moutonModel({
        poids: {
            poid: req.body.poid
        },
        tid:req.body.tid
        
    })
    poid.save(((err, result) => {
        if (err) throw err
        res.json(result)
    }))
})
app.put('/:id', (req, res) => {
console.log(req.params.id)
    moutonModel.findOneAndUpdate({
        tid: req.params.id
    }, {
        "$push":{poids: [{
            poid: JSON.stringify(req.body.poid)
        }]
    },
    }, (err,result)=>{
        if(err) throw err
        res.json(result)
    })
})


// app.get('/:id', (req, res) => {
//     moutonModel.findOne({ tid: req.params.id }).then(response => res.json({ response }))
// })



app.listen(port, () => console.log(`Example app listening on port ${port}!`))