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
  setTotalResults,
} from "./redux/slices/NewsSlice.jsx";
import { baseUrl } from "./constants/baseUrl.js";
import NewsList from "./components/NewsList";
import Pagination from "./components/Pagination";
import SearchIcon from "@mui/icons-material/Search";
import Message from "./components/Message.jsx";
import Loader from "./components/Loader.jsx";

const App = () => {
  const pageSize = 15;
  const dispatch = useDispatch();
  const { searchTerm, newsList, currentPage, totalResults } = useSelector(
    (state) => state.news
  );
  const [localSuggestions, setLocalSuggestions] = useState([]);
  const [isSelected, setIsSelected] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const fetchSuggestions = async () => {
    try {
      if (!searchTerm) return setLocalSuggestions([]);
      setIsLoading(true);
      const apiUrl = `${baseUrl}search?${searchTerm}api-key=test&show-fields=thumbnail,headline&page=${currentPage}&page-size=${pageSize}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setLocalSuggestions(data.response?.results || []);
    } catch (error) {
      console.error("Error in fetching suggestions: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        if (!searchTerm) return;

        const tagsUrl = `${baseUrl}tags?q=${searchTerm}&api-key=test&show-fields=thumbnail,headline&page=${currentPage}&page-size=${pageSize}`;

        const tagsResponse = await fetch(tagsUrl);
        const tagsData = await tagsResponse.json();
        setLocalSuggestions(tagsData.response?.results || []);

        let keywordStr = "";
        tagsData.response?.results.forEach((tag) => {
          keywordStr += tag.webTitle + " ";
        });

        const searchUrl = `${baseUrl}search?api-key=test&q=${searchTerm}&show-fields=thumbnail,headline,keyword=${keywordStr.trim()}&page=${currentPage}&page-size=${pageSize}`;
        const searchResponse = await fetch(searchUrl);
        const searchData = await searchResponse.json();
        dispatch(setNewsList(searchData.response?.results || []));
        dispatch(setTotalResults(searchData.response?.total || 0));
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, currentPage, dispatch]);

  const handleSearch = () => {
    dispatch(setCurrentPage(1));
    dispatch(setSuggestions([]));
    setLocalSuggestions([]);
    setIsSelected(true);
    updateURL(searchTerm, 1, pageSize);
  };

  const handleSuggestionClick = (clickedSuggestion) => {
    dispatch(setSuggestions([]));
    dispatch(setSearchTerm(clickedSuggestion.webTitle));
    dispatch(setCurrentPage(1));
    setLocalSuggestions([]);
    updateURL(clickedSuggestion.webTitle, currentPage, pageSize);
  };

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
    updateURL(searchTerm, page, pageSize);
  };

  const handleKeywordClick = (keyword) => {
    dispatch(setSearchTerm(keyword));
    dispatch(setSuggestions([]));
    dispatch(setCurrentPage(1));
    setLocalSuggestions([]);
    dispatch(setSearchTerm(sectionName));
    updateURL(keyword, 1, pageSize);
  };

  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    dispatch(setSearchTerm(newSearchTerm));
    setIsSelected(false);
    updateURL(newSearchTerm, currentPage, pageSize);
  };

  useEffect(() => {
    window.history.replaceState({}, "", "/");
  }, []);
  const updateURL = (searchTerm, currentPage, pageSize) => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) {
        params.set("searchText", encodeURIComponent(searchTerm));
      } else {
        params.delete("searchText");
      }
      if (currentPage !== undefined) {
        params.set("currentPage", currentPage);
      }
      if (pageSize !== undefined) {
        params.set("pageSize", pageSize);
      }
      const queryString = params.toString();
      const newUrl = `/?${queryString}`;
      window.history.pushState({}, "", newUrl);
    } catch (error) {
      console.error("An error occurred while updating the URL: ", error);
    }
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

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {!!localSuggestions.length && !isSelected && (
            <Paper
              elevation={3}
              sx={{
                padding: 2,
                marginTop: 2,
                maxWidth: 300,
                maxHeight: 300,
                overflowY: "scroll",
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
                searchTerm={searchTerm}
                currentPage={currentPage}
                pageSize={pageSize}
              />
              {newsList.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(totalResults / pageSize)}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <Message
              searchTerm={searchTerm}
              isSelected={isSelected}
              localSuggestions={localSuggestions}
            />
          )}
        </>
      )}
    </Container>
  );
};

export default App;
