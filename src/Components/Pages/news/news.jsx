import React, { useState } from "react";
import useFetch from "../../../hooks/useFetch";
import "./news.css";

const News = () => {
  const { data, loading, error } = useFetch("http://localhost:8000/api/news");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  if (loading) {
    return <div className="news-loading">Loading news...</div>;
  }

  if (error) {
    return <div className="news-error">Error loading news: {error.message}</div>;
  }

  if (!data || data.length === 0) {
    return <div className="news-empty">No news available at the moment.</div>;
  }

  // Sort news by publishedDate (newest first)
  const sortedNews = [...data].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  // Pagination Logic
  const totalPages = Math.ceil(sortedNews.length / itemsPerPage);
  const currentNews = sortedNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div className="news-container">
      <h1 className="news-header">Latest News</h1>
      <div className="news-grid">
        {currentNews.map((item) => (
          <div key={item._id} className="news-card">
            {item.image && (
              <img src={item.image} alt={item.title} className="news-image" />
            )}
            <div className="news-content">
              <h2 className="news-title">{item.title}</h2>
              <p className="news-meta">
                By {item.author} | {new Date(item.publishedDate).toLocaleDateString()}
              </p>
              <p className="news-description">{item.content.slice(0, 150)}...</p>
              {item.tags.length > 0 && (
                <div className="news-tags">
                  {item.tags.map((tag, index) => (
                    <span key={index} className="news-tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
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

export default News;
