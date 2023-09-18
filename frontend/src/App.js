import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, CircularProgress } from '@mui/material';
import './App.css';

function App() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from your Node.js server or API
    axios.get('/api/v1/films')
      .then((response) => {
        setFilms(response.data.films);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error(error);
        setLoading(false); // Set loading to false in case of an error
      });
  }, []);

  return (
    <div className="App">
      <Container maxWidth="md">
        <Typography variant="h4" component="h1" gutterBottom>
          Star Wars Films
        </Typography>
        <TableContainer component={Paper}>
          {loading ? (
            // Display a loader while fetching data
            <CircularProgress />
          ) : (
            // Display film data when loading is false
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Director</TableCell>
                  <TableCell>Release Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {films.map((film, index) => (
                  <TableRow key={index}>
                    <TableCell>{film.title}</TableCell>
                    <TableCell>{film.director}</TableCell>
                    <TableCell>{film.release_date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </div>
  );
}

export default App;
