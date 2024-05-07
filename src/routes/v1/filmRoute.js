import express from 'express'
import { filmController } from '~/controllers/filmController'
import { filmValidation } from '~/validations/filmValidation'

const Router = express.Router()

Router.route('/').post(filmValidation.createFilm, filmController.createFilm)

export const filmRoutes = Router