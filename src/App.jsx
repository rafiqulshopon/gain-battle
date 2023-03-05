import './App.css';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import moment from 'moment/moment';
const initialPlayers = [
  { id: 1, name: 'Naim', type: 'batsmen' },
  { id: 2, name: 'Nazmul', type: 'all-rounder' },
  { id: 3, name: 'Sakib-UL', type: 'all-rounder' },
  { id: 4, name: 'Elias', type: 'batsmen' },
  { id: 5, name: 'Calvin', type: 'all-rounder' },
  { id: 6, name: 'Imran', type: 'all-rounder' },
  { id: 7, name: 'Mehrab', type: 'batsmen' },
  { id: 8, name: 'Emon', type: 'all-rounder' },
  { id: 9, name: 'Shehab', type: 'batsmen' },
  { id: 10, name: 'Billal', type: 'bowler' },
  { id: 11, name: 'Ashish', type: 'all-rounder' },
  { id: 12, name: 'Rakib', type: 'bowler' },
  { id: 13, name: 'Shofiqur', type: 'batsmen' },
  { id: 14, name: 'Rokon', type: 'all-rounder' },
  { id: 15, name: 'Ashiq', type: 'batsmen' },
  { id: 16, name: 'Foysal', type: 'bowler' },
  { id: 17, name: 'Sohel', type: 'all-rounder' },
  { id: 18, name: 'Eshan', type: 'batsmen' },
  { id: 19, name: 'Hasan', type: 'bowler' },
  { id: 20, name: 'Sakib-Laravel', type: 'all-rounder' },
  { id: 21, name: 'Abid', type: 'batsmen' },
  { id: 22, name: 'Shahed', type: 'bowler' },
  { id: 23, name: 'Shishir', type: 'all-rounder' },
  { id: 24, name: 'Emroz', type: 'batsmen' },
  { id: 25, name: 'Tofayel', type: 'bowler' },
  { id: 26, name: 'Ahmed', type: 'all-rounder' },
  { id: 27, name: 'Rabiul', type: 'batsmen' },
  { id: 28, name: 'Akash', type: 'batsmen' },
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [playerType, setPlayerType] = useState('batsmen');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState(false);

  const isValidTextInput = (value) => {
    if (value && value.trim() !== '') {
      return true;
    }
    return false;
  };

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

  const handleAddPlayer = () => {
    if (newPlayerName) {
      setPlayers([
        { id: players.length + 1, name: newPlayerName, type: playerType },
        ...players,
      ]);
      setNewPlayerName('');
      setPlayerType('batsmen');
    }
  };

  const handlePlayerTypeChange = (event) => {
    const selectedPlayerType = event.target.value;
    setPlayerType(selectedPlayerType);
  };

  return (
    <div className='App'>
      <h3>{`Gain Cricket Battle - ${moment().format('DD/MM/YYYY')}`}</h3>
      <div className='button-container'>
        <button className='button' onClick={generateTeams}>
          Generate Teams
        </button>

        <button className='button' onClick={toggleDisplayPlayers}>
          {showAllPlayersButtonText}
        </button>
      </div>

      {displayPlayers && (
        <div className='player-list'>
          <h2>{`All Players - ${players.length} `}</h2>
          <div className='add-player-container'>
            <input
              type='text'
              value={newPlayerName}
              onChange={(e) =>
                isValidTextInput(e.target.value) &&
                setNewPlayerName(e.target.value)
              }
              placeholder='Enter player name'
            />
            <div>
              <label htmlFor='player-type'>Player Type:</label>
              <select
                id='player-type'
                value={playerType}
                onChange={handlePlayerTypeChange}
              >
                <option value='batsmen'>Batsman</option>
                <option value='bowler'>Bowler</option>
                <option value='all-rounder'>All-rounder</option>
              </select>
            </div>
            <button className='add-player-btn' onClick={handleAddPlayer}>
              Add Player
            </button>
          </div>
          <ul>
            {players
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player, index) => (
                <li key={index}>
                  {player.name}
                  {player.type === 'batsmen' && (
                    <span className='player-type player-type-batsman'>
                      Batsman
                    </span>
                  )}
                  {player.type === 'bowler' && (
                    <span className='player-type player-type-bowler'>
                      Bowler
                    </span>
                  )}
                  {player.type === 'all-rounder' && (
                    <span className='player-type player-type-all-rounder'>
                      All Rounder
                    </span>
                  )}
                  <button
                    className='button'
                    onClick={() => removePlayer(player)}
                  >
                    Remove
                  </button>
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
        <div className='team-wrapper'>
          <h3 className='team-name'>Team 1</h3>
          <ReactSortable
            list={team1}
            setList={setTeam1}
            group='teams'
            className='team'
          >
            {team1.map((player) => (
              <div className='player' key={player.id}>
                {player.name}
                {player.type === 'batsmen' && (
                  <span className='player-type player-type-batsman'>
                    Batsman
                  </span>
                )}
                {player.type === 'bowler' && (
                  <span className='player-type player-type-bowler'>Bowler</span>
                )}
                {player.type === 'all-rounder' && (
                  <span className='player-type player-type-all-rounder'>
                    All Rounder
                  </span>
                )}
              </div>
            ))}
          </ReactSortable>
        </div>

        <div className='team-wrapper'>
          <h3 className='team-name'>Team 2</h3>
          <ReactSortable
            list={team2}
            setList={setTeam2}
            group='teams'
            className='team'
          >
            {team2.map((player) => (
              <div className='player' key={player.id}>
                {player.name}
                {player.type === 'batsmen' && (
                  <span className='player-type player-type-batsman'>
                    Batsman
                  </span>
                )}
                {player.type === 'bowler' && (
                  <span className='player-type player-type-bowler'>Bowler</span>
                )}
                {player.type === 'all-rounder' && (
                  <span className='player-type player-type-all-rounder'>
                    All Rounder
                  </span>
                )}
                {player.type === 'wicket-keeper' && (
                  <span className='player-type player-type-wicket-keeper'>
                    Wicket Keeper
                  </span>
                )}
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>

      <h4>Powered by Rafiqul</h4>
    </div>
  );
}
