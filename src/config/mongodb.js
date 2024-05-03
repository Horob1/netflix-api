import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'
let netflixInstance = null
const mongoClientInstance = new MongoClient(env.MONGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

export const CONNEXT_DB = async () => {
  await mongoClientInstance.connect()
  netflixInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
  if (!netflixInstance) throw new Error('Must connect to netflix instance first')
  return netflixInstance
}

export const CLOSE_DB = async () => {
  await mongoClientInstance.close()
}