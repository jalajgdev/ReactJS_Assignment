import React from "react";
import { List, ListItem, ListItemText, Avatar, Typography, Paper, Divider } from "@mui/material";
import { useSelector, useDispatch } from "react-redux"; 
import { setSearchTerm } from "../redux/slices/NewsSlice"; 

const NewsList = ({ newsList }) => {
  const dispatch = useDispatch();
  const { currentPage } = useSelector(state => state.news); 
  const pageSize = 15;

  const handleKeywordClick = (sectionName) => {
    const newUrl = `?sectionName=${encodeURIComponent(sectionName)}&currentPage=${currentPage}&pageSize=${pageSize}`;
    window.history.pushState({}, '', newUrl);
    dispatch(setSearchTerm(sectionName));
  };

  const handleHeadingClick = (webUrl) => {
    window.open(webUrl, "_blank");
  };

  return (
    <List>
      {newsList.map((news, index) => (
        <Paper key={news.id} elevation={3} style={{ margin: "10px", padding: "15px" }}>
          <ListItem
            component="div"
            aria-label={news.fields.headline}
          >
            <Avatar
              alt={news.fields.headline}
              src={news.fields.thumbnail || "default-thumbnail-url"}
              style={{ marginRight: "15px", cursor: "pointer" }} 
              onClick={() => handleHeadingClick(news.webUrl)}
            />
            <ListItemText 
              primary={
                <Typography sx={{ color: "black", cursor: "pointer" }} component="span" variant="body1" onClick={() => handleHeadingClick(news.webUrl)}>
                  {news.fields.headline}
                </Typography>
              }
              secondary={
                <Typography
                  component="span"
                  variant="body2"
                  sx={{ cursor: "pointer", marginLeft: 1, color: "green", display:"flex"}}
                  onClick={() => handleKeywordClick(news.sectionName)}
                >
                  #{news.sectionName}
                </Typography>
              }
            />
          </ListItem>
          {index !== newsList.length - 1 && <Divider />} 
        </Paper>
      ))}
    </List>
  );
};

export default NewsList;
