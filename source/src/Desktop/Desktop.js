import React from 'react'

export default function Desktop() {
	return (
		<div className='container main-container'>
			<div className='input-container'>
				<input type="text"></input>
				<button onClick={addText} className='gradient-button'>Send</button>
			</div>
			<div className='messages-container'>
				
			</div>
		</div>
	)
}

function addText() {
	let input = document.querySelector('input')
	let messages = document.querySelector('.messages-container')

	let div = document.createElement('div')
	div.className = "slide-text"
	div.innerHTML = input.value
	messages.append(div)
	input.value = null

	document.querySelector('.main-container').classList.add('text-add')
	setTimeout( function() {
		document.querySelector('.main-container').classList.remove('text-add')
	}, 4000)
}