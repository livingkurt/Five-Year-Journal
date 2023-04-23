// src/App.js
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import DateNavigation from "./components/DateNaviation";
import JournalEntryForm from "./components/JournalEntryForm";
import JournalEntryList from "./components/JournalEntryList";

const App = () => {
  const [date, setDate] = useState(new Date());
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await axios.get("/api/entries");
        setEntries(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchEntries();
  }, []);

  const handleSubmitEntry = async (date, content) => {
    const formattedDate = date.toISOString().slice(0, 10);
    const existingEntry = entries.find(entry => entry.date === formattedDate);

    if (existingEntry) {
      // Update existing entry
      await axios.put(`/api/entries/${existingEntry._id}`, {
        content,
      });
    } else {
      // Create new entry
      const newEntry = { date: formattedDate, content };
      await axios.post("/api/entries", newEntry);
    }

    // Refresh the entries list
    const response = await axios.get("/api/entries");
    setEntries(response.data);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom align="center">
        My 5-Year Journal
      </Typography>
      <DateNavigation date={date} setDate={setDate} />
      <JournalEntryForm date={date} onSubmit={handleSubmitEntry} />
      <JournalEntryList entries={entries} date={date} />
    </Container>
  );
};

export default App;
