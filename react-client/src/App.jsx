import { ListOfPeople } from './ListOfPeople'
import { Route, Routes, Link, Navigate } from 'react-router-dom';
import './App.css';
import { AboutUs, ContactUs } from './Other';

function App() {
  return (
    <>
      <header>
        <nav>
          <Link to="/people">people</Link>
          <Link to="/about-us">About us</Link>
          <Link to="/contact-us">contact us</Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/people" element={<ListOfPeople />} />
          <Route path="/" element={<Navigate to="/people" />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <footer>
        Copyright &copy; {(new Date()).getFullYear()} us.com. all rights reserved.
      </footer>
    </>
  )


}

export default App
