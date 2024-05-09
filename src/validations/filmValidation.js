import joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { Constants } from '~/utils/constants'
import ApiError from '~/utils/ApiError'

const createFilm = async (req, res, next) => {
  const correctCoditions = joi.object({
    title: joi.string().required().trim().strict(),
    description: joi.string().required().min(5).max(256).trim().strict(),
    release_year: joi.number().required(),
    genres: joi.array().items(joi.string().required().trim().strict().valid(...Constants.genres)),
    tag: joi.array().items(joi.string().required().trim().strict()),
    cast: joi.object({
      actor: joi.array().items(joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
      director: joi.array().items(joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([])
    }),
    runtime_minutes: joi.string().required().trim().strict(),
    average_rating: joi.number().required(),
    isCinema: joi.boolean().required(),
    length: joi.number().default(0),
    age_rating: joi.number().required(),
    video: joi.array().items(joi.object({
      //các thuộc tính ở dưới chỉ có khi là 1 series
      episodes: joi.number(),
      title: joi.string().trim().strict(),
      description: joi.string().trim().strict(),
      poster_url: joi.string().trim().strict(),
      runtime_minutes: joi.number()
    })).default([])
  })
  try {
    await correctCoditions.validateAsync(req.body)
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const newError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(newError)
  }


}

export const filmValidation = {
  createFilm
}
