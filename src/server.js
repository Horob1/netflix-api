/* eslint-disable no-console */
import express from 'express'
import 'dotenv/config'
import exitHook from 'async-exit-hook'
import { CONNEXT_DB, GET_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  app.use(errorHandlingMiddleware)

  app.get('/', (req, res) => {
    console.log(GET_DB())
    res.end('<h1>Hello World!</h1><hr>')
  })

  app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`I am running at http://${ env.APP_HOST }:${ env.APP_PORT }/`)
  })

  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try {
    await CONNEXT_DB()
    START_SERVER()
  } catch (err) {
    console.error(err)
    process.exit(0)
  }
})()

// CONNEXT_DB
//   .then(() => console.log('Connected to database'))
//   .then(() => START_SERVER())
//   .catch((error) => {
//     console.error(error)
//     process.exit(0)
//   })