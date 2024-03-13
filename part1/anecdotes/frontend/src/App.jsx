import { useState, useEffect } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
   
  const [selected, setSelected] = useState(0)
  const [mostPopular, setMostPopular] = useState(0);
  function findMostVotes() {
    let index = 0;
    for (let i = 0; i < points.length; i++) {
      if (points[i] > points[index]) {
        i = index;
      }
      i++;
    }
    return index;
  }

  useEffect(() => {
    if (points[selected] > points[mostPopular]) {
      setMostPopular(selected);
    }
  }, [points]);
  
  function vote() {
      setPoints(prevPoints => {
        const newPoints = [...prevPoints];
        newPoints[selected] += 1;
        return newPoints;
      });
  }
  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]}
        <p>has {points[selected]} votes</p>
      </div>
      <div>
        <button onClick={() => vote()}>Vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>Random Anecdote</button>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[mostPopular]}
      </div>
    </div>
  )
}

export default App