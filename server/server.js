const express = require('express')
const app = express()
const fs = require('node:fs/promises')
const path = require('node:path')
const bodyParser = require('body-parser')
const cors = require('cors')
//const secrets = require('secrets.json')
const callbackHasher = require('pbkdf2-password')()
const hasher = (options) => {
  return new Promise((resolve, reject) => {
    callbackHasher(options, (err, pass, salt, hash) => {
      if (err) reject(err)
      resolve({ salt, hash })
    })
  })
}
//const session = require('express-session')

const recipeRoot = '/home/swift/notes/personal/recipes'
const { errorHandler } = require('./utilities.js')

const { MongoClient } = require('mongodb')
const dbUrl = 'mongodb://localhost:27017'
const client = new MongoClient(dbUrl)
const dbName = 'users'
let db

/**********************************************************
 * Middleware                                             *
 *********************************************************/
app.use(bodyParser.json())
app.use(express.static('app/dist'))
app.use(errorHandler)
app.use(cors({ origin: true }))

/**********************************************************
 * Web application (production build)                     *
 *********************************************************/
app.get('/', function(req, res) {
  res.sendFile('app/dist/index.html', { root: __dirname })
})

/**********************************************************
 * API                                                    *
 *********************************************************/
app.get('/recipes', async function (req, res) {
  const recipes = (await fs.readdir(path.normalize(recipeRoot)))
    .map((fileName) => path.basename(fileName, '.md'))
  res.send(JSON.stringify(recipes))
})

app.get('/recipes/:id', async function(req, res) {
  const recipe = await fs.readFile(`${recipeRoot}/${req.params.id}.md`)
  res.send({ markdown: recipe.toString() })
})

app.post('/recipes/:id', async function(req, res) {
  await fs.writeFile(`${recipeRoot}/${req.params.id}.md`, req.body.markdown)
  res.send(`Successfully updated recipe ${req.params.id}.`)
})

app.post('/signin', async function(req, res) {
  const users = db.collection('users')
  const existingUser = await users.findOne({ username: req.body.username })

  if (existingUser !== null) {
    const hashed = await hasher({ password: req.body.password, salt: existingUser.passwordSalt })
      if (hashed.hash === existingUser.passwordHash) {
    res.send(`Successfully validated password for user ${req.body.username}.`)
      } else {
    res.status(403).send(`Failed to validate password for user ${req.body.username}.`)
      }
  } else {
    res.status(400).send(`User with username ${req.body.username} does not exist.`)
  }
})

app.post('/users/:id', async function(req, res) {
  const users = db.collection('users')
  const existingUser = await users.findOne({ username: req.params.id })

  if (existingUser === null) {
    const hashed = await hasher({ password: req.body.password })
    users.insertOne({
      username: req.params.id,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt
    })
    res.send(`Successfully created user ${req.params.id}.`)
  } else {
    res.status(400).send(`User with username ${req.params.id} already exists.`)
  }
})

async function setupServer() {
  await client.connect()
  console.log('Successfully connected to mongodb.')
  db = client.db(dbName)
  const users = db.collection('users')
}

setupServer().then(() => app.listen(3000))
