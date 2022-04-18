const express = require('express')

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())

app.get('/', (req, res)=>{
	res.json({
		message: "Hello World!"
	})
})

const server = app.listen(PORT, ()=>{
	console.log('Server listening on port:', PORT)
})