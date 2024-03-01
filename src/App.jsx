// Inside App.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  setSearchTerm,
  setSuggestions,
  setNewsList,
  setCurrentPage,
  setTotalResults, // Add this line to import setTotalResults
} from "./redux/slices/NewsSlice.jsx";
import { baseUrl } from "./constants/baseUrl.js";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";
import SearchIcon from "@mui/icons-material/Search";

const App = () => {
  const pageSize = 15;
  const dispatch = useDispatch();
  const { searchTerm, newsList, currentPage, totalResults } = useSelector(
    (state) => state.news
  );
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState();

  const fetchSuggestions = async () => {
    try {
      if (!searchTerm) return setLocalSuggestions([]);

      const apiUrl = `${baseUrl}tags?q=${searchTerm}&api-key=test`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLocalSuggestions(data.response?.results || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!searchTerm) return dispatch(setNewsList([]));

        const apiUrl = `${baseUrl}search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline,keyword&page=${currentPage}&page-size=${pageSize}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        dispatch(setNewsList(data.response?.results || []));
        dispatch(setTotalResults(data.response?.total || 0)); // Update totalResults
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (searchTerm) fetchData();
  }, [searchTerm, currentPage, dispatch]);

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSuggestions([]));
  };

  const handleSuggestionClick = (clickedSuggestion) => {
    dispatch(setSuggestions([]));
    dispatch(setSearchTerm(clickedSuggestion.webTitle));
    dispatch(setCurrentPage(1));
    setLocalSuggestions([]);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleKeywordClick = (keyword) => {
    dispatch(setSearchTerm(keyword));
    dispatch(setSuggestions([]));
    dispatch(setCurrentPage(1));
    setLocalSuggestions([]);
  };

  const handleInputChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
    setIsSelected(false);
  };

  return (
    <Container className="search-container">
      <Typography variant="h4" gutterBottom>
        News Search
      </Typography>
      <div>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleInputChange}
          sx={{ width: "100%", marginBottom: 2 }}
        />
        <Button className="" style={{ margin: "-45px" }} onClick={handleSearch}>
          <SearchIcon style={{ padding: "44px 18px 13px 1px" }} />
        </Button>
      </div>

      {localSuggestions.length > 0 && !isSelected && (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginTop: 2,
            maxWidth: 300,
            borderRadius: 3,
            boxShadow: "0 0 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="subtitle1">Suggestions</Typography>
          <List>
            {localSuggestions.map((suggestion) => (
              <ListItem
                key={suggestion.id}
                onClick={() => {
                  setIsSelected(true);
                  handleSuggestionClick(suggestion);
                }}
                sx={{
                  cursor: "pointer",
                  "&:hover": { backgroundColor: "#f5f5f5" },
                }}
              >
                <Avatar
                  alt={suggestion.webTitle}
                  src={suggestion.iconUrl || "default-avatar-url"}
                />
                <ListItemText
                  style={{ paddingLeft: "12px" }}
                  primary={suggestion.webTitle}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
      {isSelected && searchTerm.length > 0 ? (
        <>
          <NewsList
            newsList={newsList}
            handleKeywordClick={handleKeywordClick}
          />
          {newsList.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalResults / pageSize)} // Update this line
              onPageChange={handlePageChange}
            />
          )}
        </>
      ) : (
        <Typography variant="body2">
          {searchTerm ? "No matching results found." : ""}
        </Typography>
      )}
    </Container>
  );
};

export default App;
