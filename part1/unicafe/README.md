# Part 1 Exercise - unicafe

App.js 文件内容：

```js
import { useState } from 'react'

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({ text, count, text2 }) => (
  <tr>
    <td>{text}</td>
    <td>{count}&nbsp;{text2}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = () => good + neutral + bad
  const average = () => (good - bad) / all()
  const positive = () => good / all() * 100

  if (all() === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine text='good' count={good}/>
          <StatisticLine text='neutral' count={neutral}/>
          <StatisticLine text='bad' count={bad}/>
          <StatisticLine text='all' count={all()}/>
          <StatisticLine text='average' count={average()}/>
          <StatisticLine text='positive' count={positive()} text2='%'/>
        </tbody>
      </table>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood = () => setGood(good + 1)
  const increaseNeutral = () => setNeutral(neutral + 1)
  const increaseBad = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={increaseGood} text='good'/>
      <Button handleClick={increaseNeutral} text='neutral'/>
      <Button handleClick={increaseBad} text='bad'/>
      
      <h2>statistics</h2>

      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
```
