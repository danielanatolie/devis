import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ProgressBar, ButtonToolbar, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <h>Overall Code Rating</h>
      <ProgressBar now={60} />
      <br></br>
      <ButtonToolbar>
        <Button variant="primary">Analyze Complexity</Button>
      </ButtonToolbar>
      <br></br>
      <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <td>3</td>
          <td colSpan="2">Larry the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </Table>
    </div>
    
  );
}

export default App;
