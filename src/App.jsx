import './App.css';
import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import moment from 'moment/moment';
import { initialPlayers } from './helpers/players';

export default function App() {
  const [players, setPlayers] = useState(initialPlayers);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [newPlayerWeight, setNewPlayerWeight] = useState();
  const [team1, setTeam1] = useState([]);
  const [team2, setTeam2] = useState([]);
  const [displayPlayers, setDisplayPlayers] = useState(false);

  console.log(players);

  const generateTeams = () => {
    setDisplayPlayers(false);
    const allPlayers = [...players];
    const shuffledPlayers = allPlayers.sort(() => 0.5 - Math.random());

    // Divide players into two teams based on weight
    const firstTeam = [];
    const secondTeam = [];

    let totalWeight = 0;
    for (let i = 0; i < shuffledPlayers.length; i++) {
      const player = shuffledPlayers[i];
      if (i % 2 === 0) {
        firstTeam.push(player);
        totalWeight += player.weight;
      } else {
        secondTeam.push(player);
        totalWeight -= player.weight;
      }
    }

    // Check if the total weight of the teams is not equal, and swap a player
    // between the teams to try and balance the weights
    let weightDiff = Math.abs(totalWeight);
    if (weightDiff > 1) {
      let playerSwapped = false;
      let team1Index = 0;
      let team2Index = 0;

      while (!playerSwapped) {
        // Check if swapping a player will bring the teams closer in weight
        const player1 = firstTeam[team1Index];
        const player2 = secondTeam[team2Index];

        if (
          Math.abs(totalWeight - 2 * player1.weight) <= weightDiff ||
          Math.abs(totalWeight + 2 * player2.weight) <= weightDiff
        ) {
          // Swap the players and update the total weights
          firstTeam[team1Index] = player2;
          secondTeam[team2Index] = player1;
          totalWeight = totalWeight - 2 * player1.weight + 2 * player2.weight;
          weightDiff = Math.abs(totalWeight);
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

    // If the teams have different numbers of players, move one player from the larger team to the smaller team
    const playerDiff = firstTeam.length - secondTeam.length;
    if (playerDiff !== 0) {
      const largerTeam = playerDiff > 0 ? firstTeam : secondTeam;
      const smallerTeam = playerDiff > 0 ? secondTeam : firstTeam;
      const playerToMove = largerTeam.pop();
      smallerTeam.push(playerToMove);
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
      setNewPlayerWeight();
    }
  };

  const totalWeight1 = team1.reduce((acc, player) => {
    return acc + player.weight;
  }, 0);

  const totalWeight2 = team2.reduce((acc, player) => {
    return acc + player.weight;
  }, 0);

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
              type='number'
              value={newPlayerWeight}
              onChange={(e) => setNewPlayerWeight(parseInt(e.target.value))}
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
          <h3 className='team-name'>Team 1 - Weight {totalWeight1 || 0}</h3>
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
          <h3 className='team-name'>Team 2 - Weight {totalWeight2 || 0}</h3>
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
