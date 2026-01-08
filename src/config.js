import 'dotenv/config'

const getEnv = (key, defaultValue) => process.env[key] || defaultValue

const getPort = (key, defaultValue) => parseInt(getEnv(key, defaultValue)) || defaultValue

const getServerConfig = () => ({
  port: getPort('port', 3000),
  host: getEnv('host', '0.0.0.0')
})

const getMysqlConfig = () => ({
  host: getEnv('mysql_host', 'localhost'),
  port: getPort('mysql_port', 3306),
  user: getEnv('mysql_user', 'root'),
  password: getEnv('mysql_password', ''),
  database: getEnv('mysql_database', 'x_docs')
})

const getRedisConfig = () => ({
  host: getEnv('redis_host', 'localhost'),
  port: getPort('redis_port', 6379),
  password: getEnv('redis_password', '')
})

export default {
  server: getServerConfig(),
  mysql: getMysqlConfig(),
  redis: getRedisConfig()
}
