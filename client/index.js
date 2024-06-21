
async function fetchPeople() {
  console.log("fetchPeople")
  const url = "https://randomuser.me/api?results=10";

  // Make an HTTP request to a server.
  // fetch returns a Promise which, when resolved, contains the stream
  // from the server. The stream body must be deserialized (ie. converted
  // from string data into a real object) using the ".json()"
  let people = await fetch(url)
    .then(res => res.json())
    .then(res => res.results)
    .catch(err => console.error(`Problem fetching: ${err}`));

  console.log(people)
  let html = people.map(person => `<div> ${person.name.first} ${person.name.last} </div>`).join("");
  let peopleListSection = document.querySelector("#people-list");
  peopleListSection.innerHTML = `<h1>All the cool people</h1> ${html}`;

  console.log("finished")
}

