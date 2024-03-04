import React from 'react';
import { Typography, Container, IconButton } from '@mui/material';
import { Search as SearchIcon, Mood as HappyFaceIcon, ErrorOutline as NotFoundIcon, Category as RelatedIcon } from '@mui/icons-material';

const Message = ({ searchTerm, isSelected, localSuggestions }) => {
  let message = "";
  let messageStyle = {};
  let icon = null;

  if (!searchTerm) {
    message = "Happy searching!";
    messageStyle = { fontSize: '4rem' };
    icon = <HappyFaceIcon fontSize="large" style={{ color: '#4CAF50' }} />;
  } else if (localSuggestions.length > 0) {
    message = "Related found!";
    icon = <RelatedIcon fontSize="large" style={{ color: '#FFC107' }} />;
  } else if (!localSuggestions || localSuggestions.length === 0) {
    message = "No matching results found.";
    messageStyle = { fontSize: '3rem' };
    icon = <NotFoundIcon fontSize="large" style={{ color: '#F44336' }} />;
  }

  return (
    <Container className="no-results-container">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {icon && (
          <IconButton disableRipple>
            {icon}
          </IconButton>
        )}
        <Typography variant="subtitle1" color="textSecondary" style={messageStyle}>
          {message}
        </Typography>
      </div>
    </Container>
  );
};

export default Message;
