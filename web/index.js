const express = require('express'),
	app = express(),
	port = process.env.PORT || 3000,
	path = require('path'),
	socket = require('socket.io'),
	five = require('johnny-five'),
	board = new five.Board()

let led
let ledState
let interval = 0
let blink

app.use(express.static(path.join(__dirname, 'public/')))
app.use(express.static(path.join(__dirname, 'node_modules')))
let server = app.listen(port, () => console.log(`App running on http://127.0.0.1:${port}`))

var io = socket(server)


board.on('ready', function() {
	led = new five.Led(13)

	function toggleLed() {
		ledState = !ledState
		if(ledState) led.on()
		else led.off()
	}

	io.on('connection', socket => {
		console.log('New connection')

		socket.on('toggle', () => {
			clearInterval(blink)
			toggleLed()
		})

		socket.on('blink', data => {
			clearInterval(blink)
			blink = setInterval(toggleLed, data.interval * 1000)
		})

		socket.on('stop-blink', () => {
			clearInterval(blink)
		})
	})
})