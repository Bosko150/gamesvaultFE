/* eslint-disable react/prop-types */
import React from "react";
import "./Banner.scss";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const getRandomGame = (games) => {
  if (!games || games.length === 0) return null;

  const maxIndex = Math.min(4, games.length - 1);
  const randomIndex = Math.floor(Math.random() * (maxIndex + 1));
  return games[randomIndex];
};

const Banner = ({ games }) => {
  const defaultBackgroundImg = "url_to_default_image";

  const randomGame = getRandomGame(games);

  const backgroundImg = (randomGame && randomGame.backgroundImg) || defaultBackgroundImg;
  const title = (randomGame && randomGame.title) || "Titolo Predefinito";
  const discountedPrice = (randomGame && randomGame.discountedPrice) || "Prezzo Predefinito";
  const percentageDiscount = (randomGame && randomGame.percentageDiscount) || "Sconto Predefinito";
  const gameId = (randomGame && randomGame.id) || "Id Predefinito";

  return (
    <div className="banner-container">
      <Link className="banner-link" to={`/games/${gameId}`}>
        <div
          className="banner"
          style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Container className="banner-content">
            <h1>{title}</h1>
            <div className="banner-details">
              <span className="bannerpercentage">{percentageDiscount}</span>
              <h1>{discountedPrice}€</h1>
            </div>
          </Container>
        </div>
      </Link>
    </div>
  );
};

export default Banner;
