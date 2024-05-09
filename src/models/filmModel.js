import joi from 'joi'
import { GET_DB } from '~/config/mongodb'
import { Constants } from '~/utils/constants'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const FILM_COLLECTION_NAME = 'films'
const FILM_COLLECTION_SCHEMA = joi.object({
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
  poster_url: joi.string().required().trim().strict(),
  trailer_url: joi.string().required().trim().strict(),
  average_rating: joi.number().required(),
  isCinema: joi.boolean().required(),
  length: joi.number().default(0),
  age_rating: joi.number().required(),
  video: joi.array().items(joi.object({
    video_url: joi.string().trim().strict(),
    //các thuộc tính ở dưới chỉ có khi là 1 series
    episodes: joi.number(),
    title: joi.string().trim().strict(),
    description: joi.string().trim().strict(),
    poster_url: joi.string().trim().strict(),
    runtime_minutes: joi.number()
  })).default([]),
  slug: joi.string().required().trim().strict(),
  _destroy: joi.boolean().default(false),
  createAt: joi.date().timestamp('javascript').default(Date.now),
  updateAt: joi.date().timestamp('javascript').default(Date.now)
})

const createFilm = async (data) => {
  try {
    return await GET_DB().collection(FILM_COLLECTION_NAME).insertOne(data)
  } catch (error) {
    throw new Error(error)
  }
}

export const filmModel = {
  FILM_COLLECTION_NAME,
  FILM_COLLECTION_SCHEMA,
  createFilm
}