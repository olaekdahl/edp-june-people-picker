import { useState } from 'react'
import { ListOfPeople } from './ListOfPeople'


function App() {
  const [people, setPeople] = useState([])
  console.log(people)
  return (
    <>
      <header>
        <h1>All the cool people</h1>
      </header>
      <main>
        <button onClick={fetchPeople}>Get people</button>
        <ListOfPeople people={people} />
      </main>
      <footer>
        Copyright &copy; {(new Date()).getFullYear()} us.com. all rights reserved.
      </footer>
    </>
  )

  function fetchPeople() {
    const url = `/api/people`
    fetch(url)
      .then(res => res.json())
      .then(people => setPeople(people))
  }
}

export default App
