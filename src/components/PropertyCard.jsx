/** PropertyCard.js */
import React, { useState } from "react";
import Slider from "react-slick";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Chip from "@mui/material/Chip";
import FavoriteIcon from "@mui/icons-material/Favorite";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import styled from '@emotion/styled';

// Styled Components
const PropertyCardContainer = styled.div`
  background-color: white;
  overflow: hidden;
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const CarouselImage = styled.img`
  width: 100%;
  height: 15rem;
  border-radius: 1.2rem;
  object-fit: cover;
`;

const PropertyCardChipContainer = styled.div`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 10;
`;

const WishlistIconContainer = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 0.7rem;
  z-index: 10;
  cursor: pointer;
`;

const PropertyCardInfo = styled.div`
  padding: 0.1rem 0.4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  color: ${props => props.color}; /* Dynamic color based on rating */
`;

const PropertyCardDetails = styled.div`
  padding: 0.3rem 0.4rem;
`;

const Location = styled(Link)`
  font-size: 0.8rem;
  font-weight: bold;
  color: #4b4b4b;
  text-decoration: none;
`;

const DateRange = styled.div`
  font-size: 0.6rem;
  color: #999999;
  margin-top: 8px;
`;

const DotContainer = styled.div`
  position: absolute;
  bottom: -10px;
  display: flex;
  justify-content: center;
`;

const DotList = styled.ul`
  display: flex;
  gap: 1px;
  padding: 0;
  width: 50%;
`;

const Dot = styled.div`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: lightGray;
`;

const PropertyCard = ({ propertyData }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Toogle the Wishlist icon
  const handleWishlistToggle = () => {
    setIsInWishlist(!isInWishlist);
  };

  // Function to get colors based on the ratings
  const getRatingColor = (rating) => {
    if (rating < 2) return "red";
    if (rating >= 2 && rating <= 4) return "#FFA500";
    return "green";
  };

  // Function to format views(Add commas [,] properly)
  const formatViews = (views) =>
    views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <DotContainer>
        <DotList>
          {dots}
        </DotList>
      </DotContainer>
    ),
    customPaging: (i) => (
      <Dot></Dot>
    ),
    dotsClass: "slick-dots custom-dots",
  };

  return (
    <PropertyCardContainer>
      {/* Carousel Section */}
      <CarouselContainer>
        <Slider {...carouselSettings}>
          {propertyData.images.map((image, index) => (
            <Link to={`/detail/${propertyData.id}`} key={index}>
              <CarouselImage
                src={image}
                alt={`property-img-${index}`}
              />
            </Link>
          ))}
        </Slider>

        {/* Most Liked Chip */}
        {propertyData.isMostLiked && (
          <PropertyCardChipContainer>
            <Chip
              label="Most Liked"
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "0.7rem",
              }}
            />
          </PropertyCardChipContainer>
        )}

        <WishlistIconContainer onClick={handleWishlistToggle}>
          <FavoriteIcon style={{ color: isInWishlist ? "red" : "gray" }} />
        </WishlistIconContainer>
      </CarouselContainer>

      {/* Property Viewed and Ratings section*/}
      <PropertyCardInfo>
        <span style={{ color: "gray", display: "flex", alignItems: "center" }}>
          <RemoveRedEyeIcon style={{ fontSize: "16px", marginRight: "4px" }} />
          {formatViews(propertyData.views)}
        </span>
        <RatingContainer color={getRatingColor(propertyData.rating)}>
          <StarRoundedIcon style={{ fontSize: "16px" }} />
          <span>{propertyData.rating}</span>
        </RatingContainer>
      </PropertyCardInfo>

      <PropertyCardDetails>
        <Location to={`/detail/${propertyData.id}`} className="location">
          {propertyData.name}, {propertyData.location}
        </Location>
        <DateRange>{propertyData.dateRange}</DateRange>
      </PropertyCardDetails>
    </PropertyCardContainer>
  );
};

export default PropertyCard;
