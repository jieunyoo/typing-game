import React, {useState, useEffect, useRef} from "react"

function App() {
    
	const [input,setValue] = useState([]);
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(input)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)

	const handleInputChange = (event) => {
		setValue(event.target.value);
		console.log(event.target.value);
	}

    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
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
    }

	function clearGame() {
		setValue(0)
        setIsTimeRunning(false)
		setTimeRemaining(0)
        setWordCount(0)
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

    return (
        <div>
			<div class="jumbotron jumbotron-fluid">
				<div class="container">
            		<h1> Typing Speed Test</h1>
						<div class = "header">
						<h3> Enter a time (in seconds) for how long you would like to type, and then press start to begin! </h3>

							<form id="myInput"> <label> Enter time in seconds</label>
							<input type = "text" placeholder="0" id='myInput' value = {input} onChange = {handleInputChange} />
							</form>

							<div class="button-section">
            					<button onClick={startGame} disabled={isTimeRunning}> Start </button>
            					<button class="button quit-button" onClick={endGame} > Quit </button>
            					<button class="button quit-button" onClick={clearGame}> Clear </button>
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

		<div class="jumbotron jumbotron-fluid">
			<div class="container">
           		<h1> Your Results</h1>
					<div class = "header">
						Your typing level is: 
					</div>
			</div>
	
			<div class="container">
  				<table class="table table-bordered">
    				<thead>
      				<tr>
        			<th> Level</th>
        			<th>Words Per Minute</th>
      				</tr>
    				</thead>

    				<tbody>
      				<tr>
        			<td>Excellent</td>
        			<td> 60+</td>
      				</tr>
      				<tr>
        			<td>Good</td>
        			<td>41-60</td>
      				</tr>
      				<tr>
        			<td>Fair</td>
        			<td>36-40</td>
      				</tr>
      				<tr>
        			<td>needs Improvement</td>
        			<td>0-39</td>
      				</tr>
    				</tbody>
  			</table>
		</div>
	</div>

 	</div>
    )
}

export default App
