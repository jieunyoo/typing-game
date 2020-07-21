import React, {useState, useEffect} from "react"
import useWordGame from "./useWordGame"

function App() {

	const [input, setValue] = useState(0);

    const {
        textBoxRef, 
        handleChange, 
        text, 
        isTimeRunning, 
        timeRemaining, 
        startGame, 
        wordCount
    } = useWordGame(input)
    

	const handleInputChange = (event) => {
		setValue(event.target.value);
	}

	const updateInput = (event) => {
		event.preventDefault();
		setValue(input);
		setValue("");
		console.log(input);
	}


	useEffect( () => {
		useWordGame(input)
	}, [input])

    return (
        <div>
			<div class="jumbotron jumbotron-fluid">
				<div class="container">
            			<h1> Typing Game</h1>
					<div class = "header">
						<h3> Press start to begin! </h3>

					<div class="button-section">
            			<button onClick={startGame} disabled={isTimeRunning}>
                			Start
            			</button>
					</div>
					</div>
	
				<input type="text" value = {input} onChange={handleInputChange} />
				<button onClick = {updateInput}> Edit </button>

				</div>
			</div>

				<div class = "game-details">
            		<h4>Time remaining: {timeRemaining}</h4>
            		<h4>Word count: {wordCount}</h4>
					<h4> WPM: {wordCount*6} </h4>
				</div>

			<div class="container">
				<textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
            />


			</div>
		</div>
    )
}

export default App

