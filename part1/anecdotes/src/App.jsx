import { useState } from 'react'

const Anecdote = ({ title, anecdote }) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{anecdote}</div>
    </>
  )
}

const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint8Array(anecdotes.length))

  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
  const selectNewAnecdote = () => {
    let newSelected;
    do {
      newSelected = getRandomInt(0, anecdotes.length - 1)
    } while (newSelected == selected)
    setSelected(newSelected)
  }
  const vote = () => {
    const newPoints = [...points]
    newPoints[selected]++;
    setPoints(newPoints)
  }

  const anecdoteWithMostVotes = anecdotes[points.indexOf(Math.max(...points))]

  return (
    <div>
      <Anecdote title="Anecdote of the day" anecdote={anecdotes[selected]} />
      <div>
        has {points[selected]} votes
      </div>
      <div>
        <Button text="vote" onClick={vote} />
        <Button text="next anecdote" onClick={selectNewAnecdote} />
      </div>
      <Anecdote title="Anecdote with most votes" anecdote={anecdoteWithMostVotes} />
    </div>
  )
}

export default App