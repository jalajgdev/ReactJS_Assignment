import React from 'react';
import { Typography, Container, IconButton } from '@mui/material';
import { Search as SearchIcon, Mood as HappyFaceIcon, ErrorOutline as NotFoundIcon, Category as RelatedIcon } from '@mui/icons-material';

const Message = ({ searchTerm, isSelected, localSuggestions }) => {
  let message = "";
  let icon = null;
  let iconColor = '';

  if (!searchTerm) {
    message = "Happy searching!";
    icon = <HappyFaceIcon />;
    iconColor = '#4CAF50';
  } else if (localSuggestions.length > 0) {
    message = "Related found!";
    icon = <RelatedIcon />;
    iconColor = '#FFC107';
  } else if (!localSuggestions || localSuggestions.length === 0) {
    message = "No matching results found.";
    icon = <NotFoundIcon />;
    iconColor = '#F44336';
  }

  return (
    <Container className="no-results-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <IconButton disableRipple style={{ marginRight: '10px' }}>
        {React.cloneElement(icon, { style: { color: iconColor, fontSize: '2rem' } })}
      </IconButton>
      <Typography variant="subtitle1" color="textSecondary" style={{ fontSize: '1.5rem' }}>
        {message}
      </Typography>
    </Container>
  );
};

export default Message;
