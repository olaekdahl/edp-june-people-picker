import { useEffect, useState } from 'react'
import { Person } from './Person';
import './ListOfPeople.css';

export const ListOfPeople = () => {
  const [unpickedPeople, setUnpickedPeople] = useState([])
  const [pickedPeople, setPickedPeople] = useState([])
  const [deferredPeople, setDeferredPeople] = useState([])
  const [currentPerson, setCurrentPerson] = useState(undefined);

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="ListOfPeople">
      <button onClick={() => pickPerson()}>Pick the next person</button>
      <button onClick={() => deferPerson()}>Defer to the end</button>
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
      <h1>Deferred People</h1>
      <section>
        {deferredPeople.map(person => <Person person={person} key={person.id} />)}
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
    // choose which list to pull from
    const list = unpickedPeople.length === 0 ? deferredPeople : unpickedPeople;
    const pickedPerson = list[Math.floor(Math.random() * list.length)];
    if (currentPerson) setPickedPeople([...pickedPeople, currentPerson])
    setUnpickedPeople(unpickedPeople.filter((person) => person !== pickedPerson));
    setCurrentPerson(pickedPerson);
  }

  // defer people to another list if not present
  function deferPerson() {
    if (currentPerson) {
      setDeferredPeople([...deferredPeople, currentPerson]);
      setPickedPeople(pickedPeople.filter((person) => person !== currentPerson))
      pickPerson();
    }
  }

}