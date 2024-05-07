import express from 'express'
import { filmRoutes } from '~/routes/v1/filmRoute.js'

const Router = express.Router()

Router.use('/film', filmRoutes)

export const API_V1 = Router