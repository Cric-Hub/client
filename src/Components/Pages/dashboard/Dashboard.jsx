import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./dashboard.css";
import useFetch from "../../../hooks/useFetch";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../../config/API";

const Dashboard = () => {
  const { data: matches, loading: matchesLoading, error: matchesError } = useFetch(`${API_URL}/api/matches?limit=6`);
  const { data: news, loading: newsLoading, error: newsError } = useFetch(`${API_URL}/api/news`);
  const navigate = useNavigate(); // Hook for navigation

  // Sort news by publishedDate (newest first)
  const sortedNews = news ? [...news].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)) : [];

  // Navigate to full news page
  const handleNewsClick = (id) => {
    navigate(`/news/${id}`); 
  };

  return (
    <div className="dashboard">
      <div className="hero-section">
        <h1>Welcome to CricHub</h1>
        <p>Your Ultimate Cricket Management System</p>
        <Link to="/explore">
          <button className="explore-btn">Explore More</button>
        </Link>
      </div>

      <div className="match-section">
        <h2>Recent Matches</h2>
        {matchesLoading ? (
          <div className="loading-indicator">Loading...</div>
        ) : matchesError ? (
          <div className="error-indicator">Error loading data</div>
        ) : (
          <Swiper
            modules={[Navigation, Pagination]}
            loop={true}
            grabCursor={true}
            spaceBetween={30}
            pagination={{ clickable: true, dynamicBullets: true }}
            navigation
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
          >
            {matches?.map((match) => {
              const currentClub = match.currentInnings === "club1" ? match.club1 : match.club2;
              const opponentClub = match.currentInnings === "club1" ? match.club2 : match.club1;

              const currentClubName = (currentClub.club.name);
              const opponentClubName = (opponentClub.club.name);

              const currentClubFlag = (currentClub.club.image);
              const opponentClubFlag = (opponentClub.club.image);

              const target = currentClub.score + 1;

              return (
                <SwiperSlide key={match._id} className="match-card">
                  <div className="match-header">
                    <p>{match.status}</p>
                  </div>
                  <div className="match-body">
                    <div className="team">
                      <div className="team-info">
                        <img
                          src={currentClubFlag}
                          alt={`${currentClubName} flag`}
                          className="team-flag"
                        />
                        <p className="team-name">{currentClubName}</p>
                      </div>
                      <p className="team-stats">{`${currentClub.score}/${currentClub.wickets} (${currentClub.overs})`}</p>
                    </div>

                    <div className="team">
                      <div className="team-info">
                        <img
                          src={opponentClubFlag}
                          alt={`${opponentClubName} flag`}
                          className="team-flag"
                        />
                        <p>{opponentClubName}</p>
                      </div>
                      <p>
                        {match.currentInnings === "club1"
                          ? "Yet to bat"
                          : `${opponentClub.score}/${opponentClub.wickets}`}
                      </p>
                    </div>
                  </div>
                  <div className="match-footer">
                    <p>{`${(match.tossWinner)} chose to ${match.tossChoice.toLowerCase()}`}</p>
                    {match.currentInnings === "club2" && <p>{`Target: ${target}`}</p>}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <div className="news-section">
        <h2>Latest News</h2>
        {newsLoading ? (
          <div className="loading-indicator">Loading news...</div>
        ) : newsError ? (
          <div className="error-indicator">Error loading news: {newsError.message}</div>
        ) : (
          <div className="news-layout">
            {sortedNews.length > 0 && (
              <div className="latest-news">
                <div className="main-news">
                  <img src={sortedNews[0].image} alt={sortedNews[0].title} className="main-news-image" />
                  <h3 className="main-news-title" onClick={() => handleNewsClick(sortedNews[0]._id)}>
                    {sortedNews[0].title}
                  </h3>
                  <p className="main-news-description">{sortedNews[0].content.slice(0, 150)}...</p>
                </div>
                <div className="other-news">
                  {sortedNews.slice(1, 4).map((item) => ( // Show only 3 other news items
                    <div key={item._id} className="news-item" onClick={() => handleNewsClick(item._id)}>
                      {item.image && <img src={item.image} alt={item.title} className="news-item-image" />}
                      <h4 className="news-item-title">{item.title}</h4>
                      <p className="news-item-description">{item.content.slice(0, 100)}...</p>
                    </div>
                  ))}
                  <Link to="/news" className="see-more-button">
                    See More News
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;