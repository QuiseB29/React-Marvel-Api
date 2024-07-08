// src/components/CharacterDetail.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PUBLIC_KEY = '718084b21b4d56ebf0be898c2c56501d';
const HASH = '7e7ab7b63daceb7aa0849955e8b01421';

const CharacterDetail = ({ characterId, closeDetail }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacterDetail = async () => {
      try {
        const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=1&apikey=${PUBLIC_KEY}&hash=${HASH}`);
        setCharacter(response.data.data.results[0]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the character details", error);
      }
    };

    fetchCharacterDetail();
  }, [characterId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <button onClick={closeDetail}>Close</button>
      <h1>{character.name}</h1>
      <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
      <p>{character.description}</p>
    </div>
  );
};

export default CharacterDetail;
