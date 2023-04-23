// src/components/DateNavigation.js
import { IconButton, Typography } from "@mui/material";
import { NavigateBefore, NavigateNext } from "@mui/icons-material";
import PropTypes from "prop-types";

const DateNavigation = ({ date, setDate }) => {
  const handlePreviousDate = () => {
    const prevDate = new Date(date);
    prevDate.setDate(prevDate.getDate() - 1);
    setDate(prevDate);
  };

  const handleNextDate = () => {
    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);
    setDate(nextDate);
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <IconButton onClick={handlePreviousDate}>
        <NavigateBefore />
      </IconButton>
      <Typography variant="h6">{date.toDateString()}</Typography>
      <IconButton onClick={handleNextDate}>
        <NavigateNext />
      </IconButton>
    </div>
  );
};
DateNavigation.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
};

export default DateNavigation;
