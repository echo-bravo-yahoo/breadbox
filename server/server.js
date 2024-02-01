const express = require('express')

const prod = process.env.NODE_ENV === 'production'

const app = express()
const fs = require('node:fs/promises')
const path = require('node:path')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);

const passport = require('passport')
const LocalStrategy = require('passport-local')
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn
const ensureLoggedIn = ensureLogIn(`/signin`)

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

// const recipeRoot = '/home/swift/notes/personal/recipes'
const recipeRoot = path.resolve(__dirname, '../fs')
const { errorHandler } = require('./utilities.js')

const { MongoClient } = require('mongodb')
const client = new MongoClient('mongodb://breadbox-db:27017')
const dbName = 'users'
let db

const store = new MongoDBStore({
  uri: 'mongodb://breadbox-db:27017',
  collection: 'sessions'
})

store.on('error', console.error)

/**********************************************************
 * Middleware                                             *
 *********************************************************/
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname, '../app/dist')))
if (prod) {
  app.use(cors({ origin: `http://localhost:${hostPort}`, credentials: true }))
} else {
  app.use(cors({ origin: "http://localhost:5173", credentials: true }))
}
// TODO: replace secret
app.use(session({
  secret: 'lol',
  resave: false,
  saveUnitialized: false,
  store
}))

app.use(passport.authenticate('session'))

/**********************************************************
 * Auth                                                   *
 *********************************************************/
passport.use('local', new LocalStrategy(async function verifyUser(username, password, cb) {
  const users = db.collection('users')
  const existingUser = await users.findOne({ username })
  if (existingUser !== null) {
    const hashed = await hasher({ password, salt: existingUser.passwordSalt })
    if (hashed.hash === existingUser.passwordHash) {
      console.log(`Successfully validated password for user ${username}.`)
      cb(null, existingUser)
    } else {
      console.log(`Failed to validate password for user ${username}.`)
      cb(null, false, { message: 'Incorrect username or password' })
    }
  } else {
    console.log(`User with username ${username} does not exist.`)
    cb(null, false, { message: 'Incorrect username or password' })
  }
}))

passport.serializeUser(function(user, cb) {
  console.log(`Serializing request for user ${user.username}.`)
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username })
  })
})

passport.deserializeUser(function(user, cb) {
  console.log(`Deserializing request for user ${user.username}.`)
  process.nextTick(function() {
    cb(null, user)
  })
})

/**********************************************************
 * API                                                    *
 *********************************************************/
app.get('/api/recipes', ensureLoggedIn, async function (req, res) {
  const directory = path.normalize(`${recipeRoot}/${req.user.username}`)
  const recipes = (await fs.readdir(directory))
    .map((fileName) => path.basename(fileName, '.md'))
  res.send(JSON.stringify(recipes))
})

app.get('/api/recipes/:id', ensureLoggedIn, async function(req, res) {
  const directory = path.normalize(`${recipeRoot}/${req.user.username}`)
  const recipe = await fs.readFile(`${directory}/${req.params.id}.md`)
  res.send({ markdown: recipe.toString() })
})

app.post('/api/recipes/:id', ensureLoggedIn, async function(req, res) {
  const directory = path.normalize(`${recipeRoot}/${req.user.username}`)
  await fs.writeFile(`${directory}/${req.params.id}.md`, req.body.markdown)
  res.send(`Successfully updated recipe ${req.params.id}.`)
})

app.post('/api/signin', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/signin'
}))

app.post('/api/signout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err) }
    res.redirect(301, '/signin')
  })
})

app.post('/api/users', async function(req, res, next) {
  const users = db.collection('users')
  const existingUser = await users.findOne({ username: req.body.username })

  if (existingUser === null) {
    const hashed = await hasher({ password: req.body.password })
    users.insertOne({
      username: req.body.username,
      passwordHash: hashed.hash,
      passwordSalt: hashed.salt
    })

    const directory = path.normalize(`${recipeRoot}/${req.body.username}`)
    try {
      await fs.mkdir(directory)
    } catch (e) {
      // admin / symlink users may already have a directory
    }

    req.login({ id: this.lastID, username: req.body.username } , function(err) {
      if (err) { return next(err) }
      res.redirect(301, '/')
    })
  } else {
    res.status(400).send(`User with username ${req.body.username} already exists.`)
  }
})

/**********************************************************
 * Web application (production build only served in prod) *
 *********************************************************/
if (prod) {
  app.get(/^\/(?!api).*$/, function(req, res) {
    res.sendFile('app/dist/index.html', { root: path.resolve(__dirname + '/..') })
  })
}

/**********************************************************
 * Error handling                                         *
 *********************************************************/
app.use(errorHandler)

async function setupServer() {
  console.log('Connecting to mongodb...')
  await client.connect()
  console.log('Successfully connected to mongodb.')
  console.log(`Set up with a recipe root of ${recipeRoot}.`)
  db = client.db(dbName)
}

process.on('SIGTERM', () => {
  console.log('Closed Express server')
  server.close(() => {
    db.close()
    console.log('Closed mongodb connection')
  })
})

setupServer().then(() => app.listen(3000))
