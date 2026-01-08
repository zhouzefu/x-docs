const welcomeHandler = async () => ({ message: 'Welcome to X-Docs API' })

const healthHandler = async () => ({ status: 'ok' })

const registerWelcomeRoute = (fastify) => fastify.get('/', welcomeHandler)

const registerHealthRoute = (fastify) => fastify.get('/health', healthHandler)

const register = (fastify) => {
  registerWelcomeRoute(fastify)
  registerHealthRoute(fastify)
}

export {
  register
}
