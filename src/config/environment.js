import 'dotenv/config'

export const env = {
  MONGODB_URL: process.env.MONGODB_URL,
  DATABASE_NAME: process.env.DATABASE_NAME,
  APP_PORT: process.env.APP_PORT,
  APP_HOST: process.env.APP_HOST,
  BUILD_MODE: process.env.BUILD_MODE
}