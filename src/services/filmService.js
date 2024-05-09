import { filmModel } from '~/models/filmModel'
import slugify from '~/utils/slugify'

const createFilm = async (data) => {
  try {
    const newData = {
      ...data,
      slug: slugify(data?.title)
    }

    return filmModel.createFilm(newData)
  } catch (error) {
    throw new Error(error)
  }
}

export const filmService = {
  createFilm
}