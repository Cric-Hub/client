import React, { useEffect, useState } from "react";
import "./playerStats.css"; 
import { useLocation } from "react-router-dom";
import axios from "axios";
import API_URL from "../../../config/API";

const PlayerStats = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPlayer = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/players/${id}`);
        setPlayer(res.data); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data");
        setLoading(false);
      }
    };
    fetchPlayer();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading player details.</p>;
  if (!player) return <p>No player data found.</p>; // Add this check




  return (
    <div className="player-stats-container">
      {/* Player Header */}
      <div className="player-header">
        <h1>{player.name}</h1>
        <img
          src={player.img || "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"}
          alt={player.name}
          className="player-image"
        />
        <p>{player.role}</p>
      </div>

      {/* Player Details */}
      <div className="player-details">
        <div className="detail-section">
          <h2>Personal Information</h2>
          <p><strong>Date of Birth:</strong> {new Date(player.dob).toLocaleDateString()}</p>
          <p><strong>Batting Style:</strong> {player.battingStyle}</p>
          <p><strong>Bowling Style:</strong> {player.bowlingStyle}</p>
        </div>

        {/* Rankings */}
        <div className="rankings">
          <h2>Rankings</h2>
          <div className="ranking-cards">
            <div className="ranking-card">
              <h3>Batting</h3>
              <p>#{player.battingRank}</p>
            </div>
            <div className="ranking-card">
              <h3>Bowling</h3>
              <p>#{player.bowlingRank}</p>
            </div>
            <div className="ranking-card">
              <h3>All-Rounder</h3>
              <p>#{player.allRounderRank}</p>
            </div>
          </div>
        </div>
        <div className="stats-container">
      {/* Batting Section */}
      <div className="stat-card">
        <h3 className="stat-title">BATTING</h3>
        <div className="stat-details">
          <div className="stat-row">
            <span className="stat-label">MATCHES</span>
            <span className="stat-value">{player.batting.matches}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">INNINGS</span>
            <span className="stat-value">{player.batting.innings}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">NOT OUT</span>
            <span className="stat-value">{player.batting.notOuts}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">TOTAL RUNS</span>
            <span className="stat-value">{player.batting.runs}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">HIGHEST SCORE</span>
            <span className="stat-value">{player.batting.highestScore}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">BATTING AVG</span>
            <span className="stat-value">{player.batting.average}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">BALL FACED</span>
            <span className="stat-value">{player.batting.ballsFaced}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">STRIKE RATE</span>
            <span className="stat-value">{player.batting.strikeRate}</span>
          </div>
        </div>
      </div>

      {/* Bowling Section */}
      <div className="stat-card">
        <h3 className="stat-title">BOWLING</h3>
        <div className="stat-details">
          <div className="stat-row">
            <span className="stat-label">MATCHES</span>
            <span className="stat-value">{player.bowling.matches}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">INNINGS</span>
            <span className="stat-value">{player.bowling.innings}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">BALLS BOWLED</span>
            <span className="stat-value">{player.bowling.ballsBowled}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">RUNS CONCEDED</span>
            <span className="stat-value">{player.bowling.runsConceded}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">TOTAL WICKETS</span>
            <span className="stat-value">{player.bowling.wickets}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">ECONOMY</span>
            <span className="stat-value">{player.bowling.economy}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">BOWLING AVG</span>
            <span className="stat-value">{player.bowling.average}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">STRIKE RATE</span>
            <span className="stat-value">{player.bowling.strikeRate}</span>
          </div>
        </div>
      </div>

      {/* Fielding Section */}
      <div className="stat-card">
        <h3 className="stat-title">FIELDING</h3>
        <div className="stat-details">
          <div className="stat-row">
            <span className="stat-label">CATCHES TAKEN</span>
            <span className="stat-value">{player.fielding.catches}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">STUMPINGS</span>
            <span className="stat-value">{player.fielding.stumpings}</span>
          </div>
          <div className="stat-row">
            <span className="stat-label">RUN OUTS</span>
            <span className="stat-value">{player.fielding.runOuts}</span>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};

export default PlayerStats;