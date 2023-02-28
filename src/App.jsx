import './App.css';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import moment from 'moment/moment';
const initialPlayers = [
  'Naim',
  'Sakib-UL',
  'Elias',
  'Calvin',
  'Imran',
  'Mehrab',
  'Emon',
  'Shehab',
  'Billal',
  'Ashish',
  'Rakib',
  'Shofiqur',
  'Rokon',
  'Ashiq',
  'Foysal',
  'Sohel',
  'Eshan',
  'Hasan',
  'Sakib-Laravel',
  'Abid',
  'Shahed',
  'Shishir',
  'Emroz',
  'Tofayel',
  'Ahmed',
  'Rabiul',
];
export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState(false);
  const generateTeams = () => {
    const allPlayers = [...players];
    const shuffledPlayers = allPlayers.sort(() => 0.5 - Math.random());
    const mid = Math.ceil(shuffledPlayers.length / 2);
    const firstTeam = shuffledPlayers.slice(0, mid);
    const secondTeam = shuffledPlayers.slice(mid);
    setTeam1(firstTeam);
    setTeam2(secondTeam);
  };
  const removePlayer = (player) => {
    const newPlayers = players.filter((p) => p !== player);
    setPlayers(newPlayers);
  };
  const toggleDisplayPlayers = () => {
    setDisplayPlayers(!displayPlayers);
  };
  const showAllPlayersButtonText = displayPlayers
    ? 'Hide All Players'
    : 'Show All Players';

  return (
    <div className='App'>
      <h3>{`Gain Cricket Battle - ${moment().format('DD/MM/YYYY')}`}</h3>
      <button onClick={generateTeams}>Generate Teams</button>

<button onClick={toggleDisplayPlayers}>{showAllPlayersButtonText}</button>

      {displayPlayers && (
        <div className='player-list'>
          <h2>All Players</h2>
          <ul>
            {players.map((player, index) => (
              <li key={index}>
                {player}
                <button onClick={() => removePlayer(player)}>Remove</button>
              </li>
            ))}
          </ul>
          {players.length === 0 && (
            <p className='error'>
              No players available. Please refresh the page
            </p>
          )}
        </div>
      )}
      <div className='teams'>
        <ReactSortable
          list={team1}
          setList={setTeam1}
          group='teams'
          className='team'
        >
          <h3 className='team-name'>Team 1</h3>
          {team1.map((player) => (
            <div key={player}>{player}</div>
          ))}
        </ReactSortable>
        <ReactSortable
          list={team2}
          setList={setTeam2}
          group='teams'
          className='team'
        >
          <h3 className='team-name'>Team 2</h3>
          {team2.map((player) => (
            <div key={player}>{player}</div>
          ))}
        </ReactSortable>
      </div>

      <h4>Powered by Rafiqul</h4>
    </div>
  );
}
