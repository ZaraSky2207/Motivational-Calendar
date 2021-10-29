// imports
const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')

const seed = require('./seed')
const { db } = require('./db')
const { Motivation, User } = require('./models/index')
const bodyParser = require('body-parser')
const path = require ('path')
const morgan = require('morgan')
const parseJson = require('parse-json')

app.use(express.static(path.join(__dirname, '..', 'public')))

app.use(cors())

// use seed to populate database
seed()

// Use js libraries for server
app.use(express.json({
    type: ['application/json', 'text/plain']
}))
app.use(morgan('dev'))

/** Route for returning one random motivation */
app.get('/getMotivation', async (req,res) => {
    let pk = Math.floor(Math.random() * 33) + 1
    let motivation = await Motivation.findByPk(pk)
    res.json(motivation)
})

/** Route for return motivation by passed pk param */
app.get('/getMotivation/:id', async (req,res) => {
    let pk = req.params.id
    let motivation = await Motivation.findByPk(pk)
    return res.json(motivation)
})

/** Route for returning all motivations */
app.get('/allMotivations', async (req,res) => {
    let allMotivations = await Motivation.findAll()
    res.json(allMotivations)
})

/** Route for returning one user from passed pk param */
app.get('/user/:id', async (req,res) => {
    let pk = req.params.id
    let user = await User.findByPk(pk)
    return res.json(user)
})

/** Route to return all users in the database */
app.get('/allUsers', async (req,res) => {
    let users = await User.findAll()
    return res.json(users)
})

//Route to assign a user to a quote //
app.put('/motivation/:id', async(req, res) => {

    let quoteId = req.body.id
    // let userId = req.body.UserId

    console.log(quoteId)

    let motivation = await Motivation.findByPk(quoteId)

    
    console.log('Here is your motivation:', motivation)

    //let captureduserId = req.body.() &&& then pass it into the UserId below
    await Motivation.update({ UserId: 1 }, 
        {where:{ id:  quoteId}})
    
    return res.json(motivation)

})

//Route to create add a quote to the db
app.post('/motivation/add', async(req, res) => {
       
       const newQuote = req.body
       
       console.log(newQuote)
        

        Motivation.create({ quote: newQuote.quote, author: newQuote.author })
        
       return res.send(newQuote)  
  
})


app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
    const login = await User.findOne({where: {username: username, password: password}})

    console.log(login)

    if(login === null) {
        res.status(404)
        return res.send()
    } else {
        console.log(`${req.body.name} logged in!`)
        res.status(200)
        return res.send()
    }
})

//set up app to listen on set port
app.listen( PORT, () => {
    console.log(`Your server is now listening to port ${PORT}`)
})