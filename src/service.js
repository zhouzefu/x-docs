import * as mysql from './mysql.js'
import * as redis from './redis.js'

const getCacheKey = (id) => `user:${id}`

const getCachedUser = async (id) => {
  const user = await redis.get(getCacheKey(id))
  return user ? JSON.parse(user) : null
}

const getUserFromDb = async (id) => {
  const rows = await mysql.query('SELECT * FROM users WHERE id = ?', [id])
  return rows.length > 0 ? rows[0] : null
}

const cacheUser = async (id, user) => {
  await redis.set(getCacheKey(id), JSON.stringify(user), { EX: 3600 })
}

const getUserById = async (id) => {
  const cachedUser = await getCachedUser(id)
  if (cachedUser) return cachedUser

  const dbUser = await getUserFromDb(id)
  if (dbUser) await cacheUser(id, dbUser)

  return dbUser
}

const insertUser = async (userData) => {
  return await mysql.query(
    'INSERT INTO users (name, email) VALUES (?, ?)',
    [userData.name, userData.email]
  )
}

const createUser = async (userData) => (await insertUser(userData)).insertId

export {
  getUserById,
  createUser
}
