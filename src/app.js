import Fastify from 'fastify'
import config from './config.js'
import * as mysql from './mysql.js'
import * as redis from './redis.js'
import * as route from './route.js'

const createFastifyInstance = () => Fastify({ logger: true })

const closeConnections = async () => {
  await mysql.getPool().end()
  await (await redis.getClient()).quit()
}

const setupCloseHook = (fastify) => fastify.addHook('onClose', closeConnections)

const registerRoutes = (fastify) => route.register(fastify)

const createApp = async () => {
  const fastify = createFastifyInstance()
  setupCloseHook(fastify)
  registerRoutes(fastify)
  return fastify
}

const handleServerError = (fastify, err) => {
  fastify.log.error(err)
  process.exit(1)
}

const startServer = async (fastify) => {
  try {
    await fastify.listen({ port: config.server.port, host: config.server.host })
  } catch (err) {
    handleServerError(fastify, err)
  }
}

const init = async () => startServer(await createApp())

export {
  createApp,
  init
}
