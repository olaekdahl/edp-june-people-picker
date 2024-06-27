import { useEffect, useState } from 'react'
import { ListOfPeople } from './ListOfPeople'
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { AboutUs, ContactUs } from './Other';

function App() {
  const [people, setPeople] = useState([])
  useEffect(() => {
    fetchPeople();
  }, []);
  return (
    <>
      <header>
        <nav>
          <a href="/people">people</a>
          <Link to="/about-us">About us</Link>
          <a href="/contact-us">contact us</a>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<ListOfPeople people={people} />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
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
      .then(ppl => setPeople(ppl))
  }
}

export default App
