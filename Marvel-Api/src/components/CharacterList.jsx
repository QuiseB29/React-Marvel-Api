// src/components/CharactersList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterDetail from './CharacterDetail';

const PUBLIC_KEY = '718084b21b4d56ebf0be898c2c56501d';
const HASH = '7e7ab7b63daceb7aa0849955e8b01421';

const CharactersList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCharacterId, setSelectedCharacterId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCharacters = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters`, {
          params: {
            ts: 1,
            apikey: PUBLIC_KEY,
            hash: HASH,
            nameStartsWith: searchQuery,
            limit: 20,
          },
        });
        setCharacters(response.data.data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the characters", error);
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <h1>Marvel Characters</h1>
      <input
        type="text"
        placeholder="Search characters"
        value={searchQuery}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', fontSize: '16px', width: '100%' }}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {characters.map((character) => (
            <div key={character.id} style={{ margin: '10px', textAlign: 'center' }}>
              <img
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
                alt={character.name}
                style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                onClick={() => setSelectedCharacterId(character.id)}
              />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
      )}
      {selectedCharacterId && (
        <CharacterDetail
          characterId={selectedCharacterId}
          closeDetail={() => setSelectedCharacterId(null)}
        />
      )}
    </div>
  );
};

export default CharactersList;
