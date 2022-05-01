require('dotenv').config()
const express = require('express')
const path = require('path')
const fileupload = require('express-fileupload')

const pool = require('./database')
const videoRoute = require('./routes/video.route')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(fileupload({ createParentPath: true }))

app.use('/', express.static(path.join(__dirname, 'client', 'build')))

app.use('/api/video', videoRoute)

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
})

const server = app.listen(PORT, ()=>{
	console.log('Server listening on port:', PORT)
})

const gracefulShutdown = signal => {
	process.on(signal, async () => {
		server.close()
		await pool.end()
		console.log('Server Closed:', signal)
		process.exit(0)
	})
}

["SIGTERM", "SIGINT"].forEach(signal=>gracefulShutdown(signal))