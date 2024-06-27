import './Person.css';

export function Person(props) {
  const person = props.person;
  return (
    <section className="Person" data-id={person.id}>
      <div>
        <img src={person.imgUrl} alt="profile pic" />
        <p>{person.first} {person.last}</p>
      </div>
      <div>
        <p><span>email:</span>{person.email}</p>
        <p><span>age:</span>{person.age}</p>
      </div>
    </section>
  )
}
