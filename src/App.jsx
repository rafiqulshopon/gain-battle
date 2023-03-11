import './App.css';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import moment from 'moment/moment';
const initialPlayers = [
  { id: 1, name: 'Rafiqul', weight: 2 },
  { id: 2, name: 'Sajidur', weight: 1 },
  { id: 3, name: 'Akash', weight: 3 },
  { id: 4, name: 'Naim', weight: 3 },
  { id: 5, name: 'Nazmul', weight: 2 },
  { id: 6, name: 'Sakib-UL', weight: 4 },
  { id: 7, name: 'Elias', weight: 2 },
  { id: 8, name: 'Calvin', weight: 3 },
  { id: 9, name: 'Imran', weight: 2 },
  { id: 10, name: 'Mehrab', weight: 3 },
  { id: 11, name: 'Emon', weight: 1 },
  { id: 12, name: 'Shehab', weight: 4 },
  { id: 13, name: 'Billal', weight: 1 },
  { id: 14, name: 'Ashish', weight: 2 },
  { id: 15, name: 'Rakib', weight: 1 },
  { id: 16, name: 'Shofiqur', weight: 3 },
  { id: 17, name: 'Rokon', weight: 2 },
  { id: 18, name: 'Ashiq', weight: 4 },
  { id: 19, name: 'Foysal', weight: 2 },
  { id: 20, name: 'Sohel', weight: 3 },
  { id: 21, name: 'Eshan', weight: 1 },
  { id: 22, name: 'Hasan', weight: 2 },
  { id: 23, name: 'Sakib-Laravel', weight: 4 },
  { id: 24, name: 'Abid', weight: 3 },
  { id: 25, name: 'Shahed', weight: 2 },
  { id: 26, name: 'Shishir', weight: 1 },
  { id: 27, name: 'Emroz', weight: 3 },
  { id: 28, name: 'Tofayel', weight: 4 },
  { id: 29, name: 'Ahmed', weight: 2 },
  { id: 30, name: 'Rabiul', weight: 1 },
];

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerWeight, setNewPlayerWeight] = useState('');
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState(false);

  // const generateTeams = () => {
  //   const allPlayers = [...initialPlayers];
  //   const shuffledPlayers = allPlayers.sort(() => 0.5 - Math.random());
  //   const mid = Math.ceil(shuffledPlayers.length / 2);
  //   const firstTeam = shuffledPlayers.slice(0, mid);
  //   const secondTeam = shuffledPlayers.slice(mid);
  //   setTeam1(firstTeam);
  //   setTeam2(secondTeam);
  // };

  const generateTeams = () => {
    const allPlayers = [...initialPlayers];
    const shuffledPlayers = allPlayers.sort(() => 0.5 - Math.random());

    // Divide players into two teams based on weight
    const firstTeam = [];
    const secondTeam = [];
    let totalWeight1 = 0;
    let totalWeight2 = 0;

    shuffledPlayers.forEach((player) => {
      if (totalWeight1 <= totalWeight2) {
        firstTeam.push(player);
        totalWeight1 += player.weight;
      } else {
        secondTeam.push(player);
        totalWeight2 += player.weight;
      }
    });

    // If the difference in total weight between the teams is greater than 1,
    // swap a player between the teams to try and balance the weights
    const weightDiff = Math.abs(totalWeight1 - totalWeight2);
    if (weightDiff > 1) {
      let playerSwapped = false;
      let team1Index = 0;
      let team2Index = 0;

      while (!playerSwapped) {
        // Check if swapping a player will bring the teams closer in weight
        const player1 = firstTeam[team1Index];
        const player2 = secondTeam[team2Index];

        if (
          Math.abs(
            totalWeight1 -
              player1.weight +
              player2.weight -
              (totalWeight2 - player2.weight + player1.weight)
          ) <= weightDiff
        ) {
          // Swap the players and update the total weights
          firstTeam[team1Index] = player2;
          secondTeam[team2Index] = player1;
          totalWeight1 = totalWeight1 - player1.weight + player2.weight;
          totalWeight2 = totalWeight2 - player2.weight + player1.weight;
          playerSwapped = true;
        }

        // Increment the indexes to try the next players
        if (team1Index < firstTeam.length - 1) {
          team1Index++;
        } else if (team2Index < secondTeam.length - 1) {
          team1Index = 0;
          team2Index++;
        } else {
          // If we've tried all possible player swaps and none brought the teams closer in weight,
          // break out of the loop and accept the imbalance in weights
          playerSwapped = true;
        }
      }
    }

    setTeam1(firstTeam);
    setTeam2(secondTeam);
  };

  const removePlayer = (playerId) => {
    const newPlayers = players.filter((player) => player.id !== playerId);
    setPlayers(newPlayers);
  };

  const toggleDisplayPlayers = () => {
    setDisplayPlayers(!displayPlayers);
  };

  const showAllPlayersButtonText = displayPlayers
    ? 'Hide All Players'
    : 'Show All Players';

  const handleAddPlayer = () => {
    if (newPlayerName && newPlayerWeight) {
      const newPlayer = {
        id: players.length + 1,
        name: newPlayerName,
        weight: newPlayerWeight,
      };
      setPlayers([newPlayer, ...players]);
      setNewPlayerName('');
      setNewPlayerWeight('');
    }
  };

  const totalWeight1 = team1.reduce((acc, player) => {
    return acc + player.weight;
  }, 0);

  const totalWeight2 = team2.reduce((acc, player) => {
    return acc + player.weight;
  }, 0);

  console.log(totalWeight1, totalWeight2);

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
          <div>
            <input
              type='text'
              value={newPlayerName}
              onChange={(e) => setNewPlayerName(e.target.value)}
              placeholder='Enter player name'
            />
            <input
              type='text'
              value={newPlayerWeight}
              onChange={(e) => setNewPlayerWeight(e.target.value)}
              placeholder='Enter player weight'
            />
            <button className='add-player-btn' onClick={handleAddPlayer}>
              Add Player
            </button>
          </div>
          <ul>
            {players
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((player) => (
                <li key={player.id}>
                  {player.name}
                  <button
                    className='button'
                    onClick={() => removePlayer(player.id)}
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
              <div className='player' key={player}>
                {player.name}
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
              <div className='player' key={player}>
                {player.name}
              </div>
            ))}
          </ReactSortable>
        </div>
      </div>
    </div>
  );
}
