import { useState } from 'react'

const goodScore = 1
const badScore = -1

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
    )
}

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  if (props.goodVal === 0 && props.badVal === 0 && props.neutralVal === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={props.goodVal}/>
        <StatisticLine text='neutral' value={props.neutralVal}/>
        <StatisticLine text='bad' value={props.badVal}/>
        <StatisticLine text='total' value={props.totalVal}/>
        <StatisticLine text='average' value={props.avgVal}/>
        <StatisticLine text='positive %' value={props.posVal}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const increaseGood = () => {
    const newGoodValue = good+1
    setGood(newGoodValue)
    const newTotal = newGoodValue+neutral+bad
    setTotal(newTotal)
    const newAvg = ((newGoodValue * goodScore) + (bad * badScore)) / newTotal
    setAverage(newAvg)
    const positiveFeedback = (newGoodValue / newTotal) * 100
    setPositive(positiveFeedback)
  }

  const increaseNeutral = () => {
    const newNeutralValue = neutral+1
    setNeutral(newNeutralValue)
    const newTotal = good+newNeutralValue+bad
    setTotal(newTotal)
    const newAvg = ((good * goodScore) + (bad * badScore)) / newTotal
    setAverage(newAvg)
    const positiveFeedback = (good / newTotal) * 100
    setPositive(positiveFeedback)
  }

  const increaseBad = () => {
    const newBadValue = bad+1
    setBad(newBadValue)
    const newTotal = good+neutral+newBadValue
    setTotal(newTotal)
    const newAvg = ((good * goodScore) + (newBadValue * badScore)) / newTotal
    setAverage(newAvg)
    const positiveFeedback = (good / newTotal) * 100
    setPositive(positiveFeedback)
  }


  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text='good'/>
      <Button onClick={increaseNeutral} text='neutral'/>
      <Button onClick={increaseBad} text='bad'/>
      <h1>statistics</h1>
      <Statistics goodVal={good} badVal={bad} neutralVal={neutral} totalVal={total} avgVal={average} posVal={positive}/>
    </>
  )
}

export default App