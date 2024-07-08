// src/App.js
import React from 'react';
import CharactersList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetail';


const App = () => {
  return (
    <div className="App">
      <CharactersList />
      <CharacterDetail />
    </div>
  );
};

export default App;
