import { useState } from 'react'

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  else {
    const all = good + neutral + bad
    const average = (good + (bad * -1)) / (good + neutral + bad)
    const positive = (good / (good + neutral + bad)) * 100
    const positiveString = `${positive} %`

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <StatisticsLine text="good" value={good} />
          <StatisticsLine text="neutral" value={neutral} />
          <StatisticsLine text="bad" value={bad} />
          <StatisticsLine text="all" value={all} />
          <StatisticsLine text="average" value={average} />
          <StatisticsLine text="positive" value={positiveString} />
        </table>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const incrementGood = () => {
    setGood(good + 1)
  }
  const incrementNeutral = () => {
    setNeutral(neutral + 1)
  }
  const incrementBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <Button onClick={incrementGood} text="good" />
        <Button onClick={incrementNeutral} text="neutral" />
        <Button onClick={incrementBad} text="bad" />
      </div>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App