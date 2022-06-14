require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const app = express();

const CreateRouter = require('./bin/CreateRouter');
const StackoverflowRouter = require('./api/StackoverflowRouter')
const FlightsRouter = require('./api/FlightsRouter')

app.listen(8088, () => {
    console.log(`Running at port 8088` )
})

app.use(cors())

// app.use('/', (req, res) => {
//     res.send({success: true, data: 'Connect!'})
// })
app.use('/api/--stackoverflow/',StackoverflowRouter(CreateRouter(express)))
app.use('/api/--flights/', FlightsRouter(CreateRouter(express)))

app.get('/', (req, res) => {
    res.send('Server Up!')
})