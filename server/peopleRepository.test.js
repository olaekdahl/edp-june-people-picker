import { deletePerson, getAllPeople, getPerson } from "./peopleRepository"

test("will return all people", () => {
  // Arrange
  // Act
  const ppl = getAllPeople()
  // Assert
  expect(ppl).toBeTruthy();
  expect(ppl.length).toBeGreaterThan(0);
})

test("will return one person by ID", () => {
  // Arrange
  let id = 5;
  // Act
  let person = getPerson(id)
  // Assert
  expect(person).toBeTruthy()
  expect(person).toBeDefined()
  expect(person.id).toBe(5)
  expect(person.first).toBeTruthy()
})

test("can delete a person", () => {
  // Arrange
  const id = 10;
  // Act
  const personDeleted = deletePerson(id);
  // Assert
  // ensure person is toBeTruthy
  expect(personDeleted).toBeDefined()
  expect(personDeleted.id).toBe(id)
  expect(personDeleted.first).toBeTruthy()
  // try to get that same person and expect that they're gone
  const person = getPerson(id)
  expect(person).toBeUndefined();
})


// "if deletedPerson doesn't exist, __________"
// "if deletedPerson is secure, throw an exception"