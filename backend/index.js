const express = require('express')

const { disconnect } = require('./database')
const videoRoute = require('./routes/video.route')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.use('/video', videoRoute)

const server = app.listen(PORT, ()=>{
	console.log('Server listening on port:', PORT)
})

const gracefulShutdown = signal => {
	process.on(signal, async () => {
		server.close()
		await disconnect()
		console.log('Server Closed:', signal)
		process.exit(0)
	})
}

["SIGTERM", "SIGINT"].forEach(signal=>gracefulShutdown(signal))