import React, {useState, useEffect, useRef} from "react"
import {Table} from 'react-bootstrap';

function App() {
    
	const [input,setValue] = useState([]);
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(input)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
	const [typingLevel, setTypingLevel] = useState("")

    const textBoxRef = useRef(null)

	const handleInputChange = (event) => {
		setValue(event.target.value);
		//console.log(event.target.value);
	}

    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }

	function typingSkill(typingSpeed) {
		if (typingSpeed > 0 && typingSpeed <= 36) {
			setTypingLevel('Needs improvement')
		}
		else if (typingSpeed > 36 && typingSpeed <= 45) {
			setTypingLevel('average')
		}
		else if (typingSpeed > 45 && typingSpeed <= 60) {
			setTypingLevel('good')
		}
		else if (typingSpeed > 60 && typingSpeed < 10000) {
			setTypingLevel('excellent!')
		}
	}
    
    function startGame() {
        if (setIsTimeRunning(false)) {setText("")};
		if (wordCount !== 0) {setWordCount(0)};
		setIsTimeRunning(true)
        setTimeRemaining(input)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }

    function endGame() {
        setIsTimeRunning(false)
		setTimeRemaining(0)
		setWordCount(calculateWordCount(text))
		typingSkill(typingSpeed)
    }

	function clearGame() {
		setValue(0)
        setIsTimeRunning(false)
		setTimeRemaining(0)
        setWordCount(0)
		setText('');
	}


    useEffect(() => {
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0) {
            endGame()
        }
    }, [timeRemaining, isTimeRunning,input])
    
	let wordCountFactor = 0;
	if (input == 0) { wordCountFactor = 0 } else { wordCountFactor = 60/input};
	let typingSpeed = wordCountFactor*wordCount;

    return (
        <div>
			<div class="jumbotron jumbotron-fluid bg-dark text-white">
				<div class="container">
            		<h1> Typing Speed Test</h1>
						<div class = "header">
						<h3> Enter a time (in seconds) for how long you would like to type, and then press start to begin! </h3>

							<form id="myInput"> <label> Enter time in seconds</label>
							<input type = "number" min="0" oninput="this.value = Math.abs(this.value)" placeholder="0" value = {input} onChange = {handleInputChange} />
							</form>

							<div class="button-section">
            					<button class="button start-button" onClick={startGame} disabled={isTimeRunning}> Start </button>
            					<button class="button quit-button" onClick={endGame} > Quit </button>
            					<button class="button clear-button" onClick={clearGame}> Clear </button>
							</div>
						</div>
				</div>
			</div>

            <h1>Time remaining: {timeRemaining}</h1>
            <textarea
                ref={textBoxRef}
                onChange={handleChange}
                value={text}
                disabled={!isTimeRunning}
				placeholder="begin typing here"
            />
		<div class = "game-details">
            <h1>Word count: {wordCount}</h1>
			<h1> Words per minute: { wordCountFactor*wordCount} </h1>

		</div>

		<div class="jumbotron jumbotron-fluid bg-dark text-white">
			<div class="container">
           		<h1> Your Results</h1>
					<div class = "header">
						<h3>Your score level: {typingLevel}</h3>
					</div>
			</div>
				<div class="container">
				<Table Responsive bgColor="white">
    				<thead>
      				<tr>
        			<th> Level</th>
        			<th>Words Per Minute</th>
      				</tr>
    				</thead>

    				<tbody>
      				<tr>
        				<td>Excellent</td>
        				<td> 61+</td>
      				</tr>
      				<tr>
        				<td>Good</td>
        				<td>46-60</td>
      				</tr>
      				<tr>
        				<td>Fair</td>
        				<td>37-45</td>
      				</tr>
      				<tr>
        				<td>Needs Improvement</td>
        				<td>0-36</td>
      				</tr>
    				</tbody>
  			</Table>
		</div>
	</div>

 	</div>
    )
}

export default App
