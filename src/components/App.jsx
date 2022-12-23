import React, { useState } from 'react';
import { Container, ImageGallery, Searchbar } from './';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [query, setQuery] = useState('');

  const setImageQuery = query => {
    setQuery(query);
  };

  return (
    <Container>
      <Searchbar setImageQuery={setImageQuery} />
      <ImageGallery query={query} />
      <ToastContainer />
    </Container>
  );
};

export default App;
