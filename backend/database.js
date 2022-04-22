const Pool = require('pg').Pool
const pool = new Pool()

const connect = () => pool.connect()
const disconnect = () => pool.end()

module.exports = { connect, disconnect }