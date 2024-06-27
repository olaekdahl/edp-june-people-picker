import { Person } from './Person';
import './ListOfPeople.css';

export const ListOfPeople = ({ people }) => {
  return (
    <div className="ListOfPeople">
      <h1>List of people here</h1>
      <section>
        {people.map(person => <Person person={person} key={person.id} />)}
      </section>
    </div>
  );
}