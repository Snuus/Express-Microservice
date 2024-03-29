const express = require('express')
const bodyParser  = require('body-parser')
const axios = require('axios')
const{ randomBytes }  = require('crypto')
const cors = require('cors')
const app = express()
app.use(bodyParser.json())
app.use(cors())


const posts = {}


app.post('/posts/create', async (req, res) =>{


    try {
     
  
    const id = randomBytes(4).toString('hex')
    const { title }  = req.body

    posts[id] = { 
        id, title
    }
    
    await axios.post('http://events-clusterip-srv:4005/events', {
        type: 'PostCreated',
        data: {
            id, title
        }
    })

    res.status(201).send(posts[id])
} catch (error) {
    console.log(error.message);
  }
    

})

app.post('/events', (req,res) => {
    console.log('recieved Event', req.body.type)

    res.send({})
})



app.listen(4000, () => {
    console.log('v1')
    console.log('Listening on 4000')
})
