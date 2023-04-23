// src/components/JournalEntryForm.js
import { useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import PropTypes from "prop-types";

const JournalEntryForm = ({ date, onSubmit }) => {
  const [content, setContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(date, content);
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <TextField
          label="Journal Entry"
          value={content}
          onChange={e => setContent(e.target.value)}
          variant="outlined"
          multiline
          rows={4}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Save Entry
        </Button>
      </Box>
    </form>
  );
};

JournalEntryForm.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default JournalEntryForm;
