const { MongoClient } = require('mongodb')
const dbUrl = 'mongodb://localhost:27017'
const client = new MongoClient(dbUrl)
const dbName = 'users'

const path = require('node:path')
const fs = require('node:fs/promises')
const recipeRoot = path.resolve(__dirname, '../../fs')

const secrets = require('../secrets.json')

async function setup() {
  await client.connect()
  console.log('Connected to mongodb.')
}

async function cleanUp() {
  await client.close()
  console.log('Closed the connection to mongodb.')
}

async function doTask() {
  const db = client.db(dbName)
  const collection = db.collection('users')
  const result = await collection.drop()
  console.log(`${ result ? 'Successfully' : 'Unsuccessfully' } dropped the users table.`)

  await fs.rm(recipeRoot, { recursive: true, force: true })
  console.log(`Deleted existing recipe fs.`)
  await fs.mkdir(recipeRoot)
  console.log(`Created new recipe fs.`)
  await fs.symlink(path.normalize(secrets.symlinkUsers[0].symlinkSource), path.normalize(`${recipeRoot}/${secrets.symlinkUsers[0].username}`))
  console.log(`Created new recipe symlink for admin user.`)
  return
}

setup().then(doTask).then(cleanUp)
