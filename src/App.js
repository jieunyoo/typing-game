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
        setIsTimeRunning(true)
        setTimeRemaining(input)
        setText("")
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
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
            		<h1> Typing Game</h1>
						<div class = "header">
						<h3> Enter how many seconds you would like to type, and then press start to begin! </h3>
						<div class="button-section">
							<form> <label> Enter time </label>
							<input type = "text" value = {input} onChange = {handleInputChange} />
							</form>
            				<button onClick={startGame} disabled={isTimeRunning}> Start </button>
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
            />
		<div class = "game-details">
            <h1>Word count: {wordCount}</h1>
			<h1> Words per minute: { wordCountFactor*wordCount} </h1>
		</div>
        </div>
    )
}

export default App

