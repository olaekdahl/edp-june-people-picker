import { useEffect, useState } from 'react'
import { Person } from './Person';
import './ListOfPeople.css';

export const ListOfPeople = () => {
  const [unpickedPeople, setUnpickedPeople] = useState([])
  const [pickedPeople, setPickedPeople] = useState([])
  const [currentPerson, setCurrentPerson] = useState(undefined);
  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="ListOfPeople">
      <button onClick={() => pickPerson()}>Pick the next person</button>
      <h1>Current person</h1>
      {currentPerson &&
        <Person person={currentPerson} />}
      <h1>Unpicked People</h1>
      <section>
        {unpickedPeople.map(person => <Person person={person} key={person.id} />)}
      </section>
      <h1>Picked People</h1>
      <section>
        {pickedPeople.map(person => <Person person={person} key={person.id} />)}
      </section>
    </div>
  );

  function fetchPeople() {
    const url = `/api/people`
    fetch(url)
      .then(res => res.json())
      .then(ppl => setUnpickedPeople(ppl))
  }

  function pickPerson() {
    const pickedPerson = unpickedPeople[Math.floor(Math.random() * unpickedPeople.length)]
    setPickedPeople([...pickedPeople, pickedPerson]);
    setUnpickedPeople(unpickedPeople.filter(p => p !== pickedPerson));
    setCurrentPerson(pickedPerson);
  }

}