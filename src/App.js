import { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Header = ({head}) => <h1>{head}</h1>

const StatisticLine = ({text, value}) => {
  return (
    <>
    <td>{text}</td>
    <td>{value}</td>
    </>
  )
}


const Statistics = ({click, allclick}) => {
  if (allclick.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      <table>
        <tbody>
          <tr><StatisticLine text="good" value={click.good}/></tr>
          <tr><StatisticLine text="neutral" value={click.neutral}/></tr>
          <tr><StatisticLine text="bad" value={click.bad}/></tr>
          <tr><StatisticLine text="all" value={click.good + click.neutral + click.bad}/></tr>
          <tr><StatisticLine text="average" value={allclick.reduce((a,b) => a + b, 0) / allclick.length}/></tr>
          <tr><StatisticLine text="positive" value={(100 * click.good) / (click.good + click.neutral + click.bad) + "%"}/></tr>
        </tbody>
      </table>
    </div>
  )
}

const Buttons = (props) => {
  return (
    <div>
      <Button handleClick={props.handlegood} text='good'/>
      <Button handleClick={props.handleneutral} text='neutral'/>
      <Button handleClick={props.handlebad} text='bad'/>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state

  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const [allClicks, setAll] = useState([])

  const handleGoodClick = () => {
    setClicks({ ...clicks, good: clicks.good + 1})
    setAll(allClicks.concat(1))
  }

  const handleNeutralClick = () => {
    setClicks({ ...clicks, neutral: clicks.neutral + 1})
    setAll(allClicks.concat(0))
  }

  const handleBadClick = () => {
    setClicks({ ...clicks, bad: clicks.bad + 1})
    setAll(allClicks.concat(-1))
  }

  return (
    <div>
      <Header head='give feedback'/>
      <Buttons handlegood={handleGoodClick} handleneutral={handleNeutralClick} handlebad={handleBadClick}/>
      <Header head='stats'/>
      <Statistics click={clicks} allclick={allClicks}/>
    </div>
  )
}

export default App