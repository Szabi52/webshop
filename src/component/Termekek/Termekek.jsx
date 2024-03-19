import React, { useState, useEffect } from 'react';
import ViragokService from '../../services/ViragokService';
import { Card, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Termekek.css';
import SearchComponent from '../Search/searchComponent';


export default function Termekek() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    frissit();
  }, []);

  function frissit() {
    ViragokService.getAll()
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }

  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
  };

  const filteredData = data.filter(item =>
    item.latinnev.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.magyarnev.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="product-list">
      <h1>Termékeink</h1>
      <div className='keresdiv'>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <Row xs={1} md={2} lg={4} className='sor'>
        {filteredData.map((termekek) => (
          <Col key={termekek.id} className="product-col sor">
            <Card className="product-card">
              <Card.Img variant="top" src={`http://localhost:8080/kepek/${termekek.kep}`} alt={termekek.latinnev} />
              <Card.Body >
                <Card.Title>{termekek.latinnev}</Card.Title>
                <hr/>
                <Card.Text>{termekek.magyarnev}</Card.Text>
                <Card.Text>{termekek.ar} Ft</Card.Text>
                <button className='buttoncserepbe'>Cserépbe</button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </section>
  );
}
