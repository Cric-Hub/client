import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import useFetch from "../../../hooks/useFetch";
import "./leaderboard.css";

const Leaderboard = () => {
  const [filter, setFilter] = useState("bowling");

  const { data: players, loading: playerLoading, error: playerError } = useFetch(
    "http://localhost:8000/api/players"
  );
  const [currentPage, setCurrentPage] = useState(1);
  const playersPerPage = 10;
  const navigate = useNavigate(); // Hook for navigation

  // Get sorted players based on the selected filter
  const getSortedPlayers = () => {
    if (filter === "bowling") {
      return [...players].sort((a, b) => a.bowlingRank - b.bowlingRank); 
    } else if (filter === "batting") {
      return [...players].sort((a, b) => a.battingRank - b.battingRank); 
    } else if (filter === "allRounder") {
      return [...players].sort((a, b) => a.allRounderRank - b.allRounderRank); 
    }
    return players;
  };

  // Get paginated players for the current page
  const paginatedPlayers = () => {
    const sortedPlayers = getSortedPlayers();
    const startIndex = (currentPage - 1) * playersPerPage;
    const endIndex = startIndex + playersPerPage;
    return sortedPlayers.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(getSortedPlayers().length / playersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePlayerClick = (playerId) => {
    navigate(`/player/${playerId}`); // Navigate to player stats page
  };

  return (
    <div>
      <div className="leaderboard-container">
        <h1>Player Leaderboard</h1>
        <div className="filter-buttons">
          <button
            className={filter === "bowling" ? "active" : ""}
            onClick={() => {
              setFilter("bowling");
              setCurrentPage(1);
            }}
          >
            Bowling
          </button>
          <button
            className={filter === "batting" ? "active" : ""}
            onClick={() => {
              setFilter("batting");
              setCurrentPage(1);
            }}
          >
            Batting
          </button>
          <button
            className={filter === "allRounder" ? "active" : ""}
            onClick={() => {
              setFilter("allRounder");
              setCurrentPage(1);
            }}
          >
            All-Rounder
          </button>
        </div>
        <ul className="player-list">
          {paginatedPlayers().map((player, index) => (
            <li key={player._id} className="player-item">
              {/* Ranking Number */}
              <span className="player-rank">
                {filter === "bowling"
                  ? player.bowlingRank
                  : filter === "batting"
                  ? player.battingRank
                  : player.allRounderRank}
              </span>

              {/* Player Image */}
              <img
                src={player.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
                alt={player.name}
                className="player-image"
              />

              {/* Player Name and Club */}
              <div className="player-club">
                <span
                  className="player-name"
                  onClick={() => handlePlayerClick(player._id)} // Make name clickable
                  style={{ cursor: "pointer", textDecoration: "underline" }}
                >
                  {player.name}
                </span>
                <span className="club-name">
                  {(player.club.name) || "Player not in Club"}
                </span>
              </div>

              {/* Player Stat */}
              {filter === "bowling" && (
                <span className="player-stat">{player.bowling.wickets} Wickets</span>
              )}
              {filter === "batting" && (
                <span className="player-stat">{player.batting.runs} Runs</span>
              )}
              {filter === "allRounder" && (
                <span className="player-stat">
                  Runs: {player.batting.runs}, Wickets: {player.bowling.wickets}, Catches:{" "}
                  {player.fielding.catches}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Leaderboard;