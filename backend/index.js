require('dotenv').config()
const expree = require('express')

const PORT = process.env.PORT || 5000

const app = expree()
app.use(expree.json())

app.get('/', (req, res) => {
	res.json({
		message: "Hello World"
	})
})

app.listen(PORT, ()=>console.log('Listening on port:', PORT))