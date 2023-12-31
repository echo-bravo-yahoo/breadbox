const { MongoClient } = require('mongodb')
const dbUrl = 'mongodb://localhost:27017'
const client = new MongoClient(dbUrl)
const dbName = 'users'

async function setup() {
  await client.connect()
  console.log('Successfully connected to mongodb.')
}

async function cleanUp() {
  await client.close()
}

async function doTask() {
  const db = client.db(dbName)
  const collection = db.collection('users')
  const insertResult = await collection.insertOne({ username: 'testington' })
  console.log(insertResult)
}

setup().then(doTask).then(cleanUp)
