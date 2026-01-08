import { createClient } from 'redis'
import config from './config.js'

let client = null

const createClientConfig = () => ({
  socket: {
    host: config.redis.host,
    port: config.redis.port
  },
  password: config.redis.password
})

const setupClient = () => {
  client = createClient(createClientConfig())
  client.on('error', (err) => console.error('Redis Client Error', err))
}

const connectClient = async () => {
  if (!client) {
    setupClient()
    await client.connect()
  }
  return client
}

const getClient = async () => connectClient()

const get = async (key) => (await getClient()).get(key)

const set = async (key, value, options) => (await getClient()).set(key, value, options)

const del = async (key) => (await getClient()).del(key)

export {
  getClient,
  get,
  set,
  del
}
