import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const g = () => setGood(good + 1)
  const n = () => setNeutral(neutral + 1)
  const b = () => setBad(bad + 1)

  return (
    <div>
      <Button mika={g} text="good"></Button>
      <Button mika={n} text="neutral"></Button>
      <Button mika={b} text="bad"></Button>
      <br></br>
      <Tilastot good={good} neutral={neutral} bad={bad}></Tilastot>
    </div>
  )
}

const Button = (props) => {

  return (
    <button onClick={props.mika}>
      {props.text}
    </button>
  )
}

const Tilastot = (props) => {
  if(props.good == 0 && props.neutral == 0 && props.bad == 0){
    return(
    <>
      <p>No fedbuk</p>
    </>
    )
  }
  return (
    <>
      <TilastoRivi text="good: " value={props.good}></TilastoRivi>
      <TilastoRivi text="neutral: " value={props.neutral}></TilastoRivi>
      <TilastoRivi text="bad: " value={props.bad}></TilastoRivi>
      <TilastoRivi text="all: " value={props.good+props.bad+props.neutral}></TilastoRivi>
      <TilastoRivi text="avg: " value={(props.good+(props.bad*-1))/(props.good+props.bad+props.neutral)}></TilastoRivi>
      <TilastoRivi text="pos%: " value={props.good/(props.good+props.bad+props.neutral)*100}></TilastoRivi>
    </>
  )
}

const TilastoRivi = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

export default App