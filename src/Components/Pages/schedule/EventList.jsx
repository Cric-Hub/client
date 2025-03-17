import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventList.css';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false); // For loading

  const fetchEvents = async () => {
    const calendarId = 'nilushkapoornima@gmail.com';
    const apiKey = 'AIzaSyDtxXWJTcweO4rvwZZxhM6B4B_1NKjb-I0';

    // Get yesterday's date in ISO format
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const timeMin = yesterday.toISOString();

    setLoading(true); // Start loading

    try {
      const response = await axios.get(
        `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`,
        {
          params: {
            key: apiKey,
            timeMin: timeMin,
            singleEvents: true,
            orderBy: 'startTime',
          },
        }
      );

      // Extract events
      const eventList = response.data.items.map((event) => ({
        id: event.id,
        name: event.summary || 'Unnamed Event',
        date: event.start.date || event.start.dateTime,
      }));

      setEvents(eventList);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="event-list-container">
      <h2>Upcoming Events</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="scrollable-list">
          <ul>
            {events.map((event) => (
              <li key={event.id}>
                <strong>{event.name}</strong>
                <span>{new Date(event.date).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EventList;