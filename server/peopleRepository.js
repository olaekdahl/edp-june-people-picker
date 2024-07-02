import fs from 'fs';

const db = {}
db.people = JSON.parse(fs.readFileSync('../data/students.json'));

export const getAllPeople = () => db.people;
export const getPerson = (id) => db.people.find(p => p.id === id);

//TODO: Create the ability to delete a person by id.
export const deletePerson = (id) => {
  let personToDelete = getPerson(id)
  db.people = db.people.filter(p => p !== personToDelete)
  fs.writeFileSync('../data/students.json', JSON.stringify(db))
  return personToDelete
}
