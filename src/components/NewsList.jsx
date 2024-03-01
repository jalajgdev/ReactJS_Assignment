import React from "react";
import { List, ListItem, ListItemText, Avatar, Typography, Paper } from "@mui/material";

const NewsList = ({ newsList, handleKeywordClick }) => {

  return (
    <List>
    
      {newsList.map((news) => (
        <Paper key={news.id} elevation={3} style={{ margin: "10px", padding: "15px" }}>
          <ListItem component="a" href={news.webUrl} target="_blank" rel="noopener noreferrer">
            <Avatar
              alt={news.fields.headline}
              src={news.fields.thumbnail || "default-thumbnail-url"}
            />
            <ListItemText 
              primary={
                <Typography style={{ paddingLeft: "12px" , color: "black"}} component="span" variant="body1">
                  {news.fields.headline}
                </Typography>
              }
              secondary={
                news.tags &&
                news.tags
                  .filter((tag) => tag.type === "keyword")
                  .map((keyword) => (
                    <Typography
                      key={keyword.id}
                      component="span"
                      variant="body2"
                      sx={{ cursor: "pointer", marginLeft: 1, color: "blue" }}
                      onClick={() => handleKeywordClick(keyword.webTitle)}
                    >
                      #{keyword.webTitle}
                    </Typography>
                  ))
              }
            />
          </ListItem>
        </Paper>
      ))}
    </List>
  );
};

export default NewsList;
