const formatResponse = (data, code = 200, message = 'success') => ({ code, message, data })

const formatError = (message, code = 500) => ({ code, message, data: null })

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2)

export {
  formatResponse,
  formatError,
  sleep,
  generateId
}
