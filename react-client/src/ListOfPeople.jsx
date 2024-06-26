import { Person } from './Person';

export const ListOfPeople = ({ people }) => {
  return (
    <>
      <h1>List of people here</h1>
      {people.map(person => <Person person={person} key={person.id} />)}
    </>
  );
}