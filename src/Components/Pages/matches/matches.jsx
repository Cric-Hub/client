import React from "react";
import useFetch from "../../../hooks/useFetch";
import "./matches.css";
import API_URL from "../../../config/API";

const Matches = () => {
  const { data: matches, loading, error } = useFetch(`${API_URL}/api/matches`);

  return (
    <div className="matches-container">
      <h2>Matches</h2>
      {loading ? (
        <div className="loading-indicator">Loading...</div>
      ) : error ? (
        <div className="error-indicator">Error loading data</div>
      ) : (
        <div className="matches-list">
          {matches?.map((match) => {
            const currentClub = match.currentInnings === "club1" ? match.club1 : match.club2;
            const opponentClub = match.currentInnings === "club1" ? match.club2 : match.club1;

            const target = currentClub.score + 1;

            return (
              <div key={match._id} className="match-card">
                <div className="match-header">
                  <p>{match.status}</p>
                </div>
                <div className="match-body">
                  <div className="team">
                    <div className="team-info">
                      <img
                        src={currentClub.club.image}
                        alt={`${currentClub.club.name} flag`}                        className="team-flag"
                      />
                      <p className="team-name">{currentClub.club.name}</p>
                    </div>
                    <p className="team-stats">{`${currentClub.score}/${currentClub.wickets} (${currentClub.overs})`}</p>
                  </div>

                  <div className="team">
                    <div className="team-info">
                      <img
                        src={opponentClub.club.image}
                        alt={`${opponentClub.club.name} flag`}
                        className="team-flag"
                      />
                      <p>{opponentClub.club.name}</p>
                    </div>
                    <p>{match.currentInnings === "club1" ? "Yet to bat" : `${opponentClub.score}/${opponentClub.wickets}`}</p>
                  </div>
                </div>
                <div className="match-footer">
                  <p>{`${match.tossWinner.name} chose to ${match.tossChoice.toLowerCase()}`}</p>
                  {match.currentInnings === "club2" && (
                    <p>{`Target: ${target}`}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Matches;