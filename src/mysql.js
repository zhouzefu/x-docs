import mysql from 'mysql2/promise'
import config from './config.js'

let pool = null

const createPoolConfig = () => ({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

const createPool = () => mysql.createPool(createPoolConfig())

const getPool = () => pool || (pool = createPool())

const query = async (sql, params) => {
  const [rows] = await getPool().execute(sql, params)
  return rows
}

export {
  getPool,
  query
}
