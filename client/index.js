let peopleListSection = document.querySelector("#people-list");

async function fetchPeople() {
  const url = "/api/people";

  // Make an HTTP request to a server.
  // fetch returns a Promise which, when resolved, contains the stream
  // from the server. The stream body must be deserialized (ie. converted
  // from string data into a real object) using the ".json()"
  let people = await fetch(url)
    .then(res => res.json())
    //.then(res => res.results)
    .catch(err => console.error(`Problem fetching: ${err}`));

  console.log(people)
  let html = people.map(person => makePersonHtml(person)).join("");
  peopleListSection.innerHTML = html;

  console.log("finished")
}

function makePersonHtml(person) {
  const html = `
  <section class="personCard" data-id="${person.id}">
    <div>
      <img src="${person.imgUrl}" alt="profile pic" />
      <p>${person.first} ${person.last}</p>
    </div>
    <div>
      <p><span>email:</span>${person.email}</p>
      <p><span>age:</span>${person.age}</p>
    </div>
  </section>
  `
  return html;
}
