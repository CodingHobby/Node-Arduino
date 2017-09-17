let socket = io.connect('http://localhost:3000')

window.addEventListener('load', e => {
	document.getElementById('toggle-btn').addEventListener('click', e => {
		socket.emit('toggle')
	})

	document.getElementById('blink-btn').addEventListener('click', e => {
		socket.emit('blink', {
			interval: document.getElementById('interval').value
		})
	})

	document.getElementById('stop-blink').addEventListener('click', e => {
		socket.emit('stop-blink')
	})
})