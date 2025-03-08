import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import "./newsItemPage.css"; 
import API_URL from "../../../config/API";

const NewsItemPage = () => {
  const { id } = useParams(); // Get the news ID from the URL
  const { data: news, loading, error } = useFetch(`${API_URL}/api/news/${id}`);

  if (loading) {
    return <div className="loading-indicator">Loading news...</div>;
  }

  if (error) {
    return <div className="error-indicator">Error loading news: {error.message}</div>;
  }

  if (!news) {
    return <div className="news-empty">No news found.</div>;
  }

  return (
    <div className="news-item-page">
      <h1 className="news-title">{news.title}</h1>
      <div className="news-meta">
        <span className="news-author">By {news.author}</span>
        <span className="news-date">
          {new Date(news.publishedDate).toLocaleDateString()}
        </span>
      </div>
      {news.image && (
        <img src={news.image} alt={news.title} className="news-image" />
      )}
      <p className="news-content">{news.content}</p>
    </div>
  );
};

export default NewsItemPage;