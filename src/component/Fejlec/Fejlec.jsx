import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Fejlec.css';

export default function Fejlec() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Navbar expand="lg" className={`bg-body-tertiary ${menuOpen ? 'open' : ''}`}>
      <Container>
        <Navbar.Brand href="/" ><h1 className='fejlech1'>Kis-Zuzmó BÓT</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleMenu} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/termekek">Termékeink</Nav.Link>
            <Nav.Link href="/rolunk">Rólunk</Nav.Link>
            <Nav.Link href="/elereseink">Eléréseink</Nav.Link>
            <Nav.Link href="/reszleteskereso">Részletes kereső</Nav.Link>
            <Nav.Link href="/kosar"><img src="http://localhost:8080/kepek/kosar.png" alt="kosar" className='kosaricon'/></Nav.Link>
            <Nav.Link href="/bejelentkezes">Bejelentkezés</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}