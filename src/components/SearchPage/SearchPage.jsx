import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilteredGamesAction } from "../../redux/actions";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import GameCard from "../GameCard/GameCard";
import "./SearchPage.scss";
import { useLocation } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";
import MyFooter from "../MyFooter/MyFooter";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchPage = () => {
  const dispatch = useDispatch();
  const query = useQuery();
  const searchQuery = query.get("query") || "";
  const games = useSelector((state) => state.games.games);
  const filteredGames = useSelector((state) => state.games.filteredGames);
  const noResults = useSelector((state) => state.games.noResults);

  const [genre, setGenre] = useState("");
  const [orderBy, setOrderBy] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  useEffect(() => {
    dispatch(
      fetchFilteredGamesAction({
        title: searchQuery,
        genre,
        orderBy,
        minPrice,
        maxPrice,
      })
    );
  }, [dispatch, searchQuery, genre, orderBy, minPrice, maxPrice]);

  const handleGenreChange = (e) => setGenre(e.target.value);
  const handleOrderByChange = (e) => setOrderBy(e.target.value);
  const handleMinPriceChange = (e) => setMinPrice(Math.max(0, Math.min(e.target.value, 200)));
  const handleMaxPriceChange = (e) => setMaxPrice(Math.max(0, Math.min(e.target.value, 200)));

  const handleResetFilters = () => {
    setGenre("");
    setOrderBy("");
    setMinPrice("");
    setMaxPrice("");
    dispatch(
      fetchFilteredGamesAction({
        title: searchQuery,
        genre: "",
        orderBy: "",
        minPrice: "",
        maxPrice: "",
      })
    );
  };

  const gamesToDisplay = filteredGames.length > 0 ? filteredGames : games;

  return (
    <>
      <Container className="homepage-container">
        <Row className="searchpage-dropdowns justify-content-center">
          <Col className="px-4" xs={12} md={6} lg={2}>
            <Form.Group controlId="genreSelect">
              <Form.Label>Genre</Form.Label>
              <Form.Control as="select" value={genre} onChange={handleGenreChange} className="short-form-control">
                <option value="">All</option>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Crime">Crime</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Horror">Horror</option>
                <option value="Mystery">Mystery</option>
                <option value="Singleplayer">Single-player</option>
                <option value="Multiplayer">Multiplayer</option>
                <option value="FPS">FPS</option>
                <option value="Sports">Sports</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="px-4" xs={12} md={6} lg={2}>
            <Form.Group controlId="orderBySelect">
              <Form.Label>Order By</Form.Label>
              <Form.Control as="select" value={orderBy} onChange={handleOrderByChange} className="short-form-control">
                <option value="">None</option>
                <option value="Price Ascending">Price Ascending</option>
                <option value="Price Descending">Price Descending</option>
                <option value="Title">Title</option>
                <option value="Release date">Release Date</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col className="p-0" xs={12} md={6} lg={1}>
            <Form.Group controlId="minPrice">
              <Form.Label>Min Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={handleMinPriceChange}
                className="short-form-control-2"
                min="0"
                max="200"
              />
            </Form.Group>
          </Col>

          <Col className="p-0" xs={12} md={6} lg={1}>
            <Form.Group controlId="maxPrice">
              <Form.Label>Max Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="200"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                className="short-form-control-2"
                min="0"
                max="200"
              />
            </Form.Group>
          </Col>
          <Col xs={12} className="text-center mt-5">
            <Button className="reset-button" onClick={handleResetFilters}>
              Reset Filters
            </Button>
          </Col>
        </Row>
        <Row className="justify-content-center">
          {searchQuery && noResults ? (
            <Col xs={12} className="text-center">
              <FaMagnifyingGlass className="search-icon" />
              <h2 className="no-results">Sorry, no result found for &quot;{searchQuery}&quot; :(</h2>
            </Col>
          ) : (
            gamesToDisplay.map((game) => (
              <Col key={game.id} xs={12} sm={6} md={4} lg={4} className="mb-4">
                <GameCard game={game} />
              </Col>
            ))
          )}
        </Row>
      </Container>
      <MyFooter />
    </>
  );
};

export default SearchPage;
