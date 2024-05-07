import { StatusCodes } from 'http-status-codes'
import { filmService } from '~/services/filmService'

const createFilm = async (req, res, next) => {
  try {
    const createdFilm= await filmService.createFilm(req.body)
    res.status(StatusCodes.CREATED).json(createdFilm)
  } catch (error) {
    next(error)
  }
}

export const filmController = {
  createFilm
}