// src/components/JournalEntryList.js
import { Typography, Box } from "@mui/material";
import PropTypes from "prop-types";

const JournalEntryList = ({ entries, date }) => {
  const entry = entries.find(
    entry => entry.date === date.toISOString().slice(0, 10)
  );

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <Typography variant="h6">Previous Entries</Typography>
      {entry ? (
        <Typography variant="body1">{entry.content}</Typography>
      ) : (
        <Typography variant="body1">No entry for this date.</Typography>
      )}
    </Box>
  );
};

JournalEntryList.propTypes = {
  entries: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ).isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default JournalEntryList;
