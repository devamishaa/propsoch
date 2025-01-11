import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "@emotion/styled";
import { Property } from "../types/Property";
import propertyImg from "../assets/property.jpeg";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Card = styled(motion.div)`
  border-radius: 16px;
  overflow: hidden;
  background: white;
  color: #000;
  margin-bottom: 16px;
  position: relative;
  width: 176px;
  height: 326px;
  font-size: 0.5rem;
`;

const ImageContainer = styled.div`
  position: relative;
  aspect-ratio: 16/23;
  overflow: hidden;
`;

const ImageSlider = styled.div`
  display: flex;
  transition: transform 0.3s ease;
`;

const PropertyImage = styled.img`
  width: 176px;
  height: 246px;
  object-fit: cover;
  border-radius: 16px;
`;

const Badge = styled.div`
  position: absolute;
  top: 12px;
  left: 12px;
  background: rgba(255, 255, 255, 0.9);
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  color: #444444;
`;

const HeartButton = styled(motion.button)`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Details = styled.div`
  padding: 6px;
`;

const Stats = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  color: #666;
  font-size: 12px;
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  bottom:30%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
`;

const Dot = styled.div<{ active: boolean }>`
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: ${(props) => (props.active ? "#fff" : "#ccc")};
  border: 2px solid #b3b3b3;
  cursor: pointer;
`;

interface PropertyCardProps {
  property: Property;
  onWishlist: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, onWishlist }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const navigate = useNavigate();

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touchEnd = e.touches[0].clientX;
    const diff = touchStart - touchEnd;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentImageIndex < property.images.length - 1) {
        setCurrentImageIndex(currentImageIndex + 1);
      } else if (diff < 0 && currentImageIndex > 0) {
        setCurrentImageIndex(currentImageIndex - 1);
      }
      setTouchStart(touchEnd);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating < 2.5) return "#ff4444"; // Red
    if (rating <= 3.5) return "#ff7f00"; // Orange
    if (rating <= 4) return "#ffd700"; // Yellow
    return "#28a745"; // Green
  };

  const handleCardClick = () => {
    navigate(`/property/${property.id}`); // Redirect to the property details page
  };

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <Card
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileTap={{ scale: 0.98 }}
     
    >
      <ImageContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <ImageSlider
          style={{
            transform: `translateX(-${currentImageIndex * 100}%)`,
          }}
        >
          {property.images.map((image, index) => (
            <PropertyImage key={index} src={image} alt={property.name}  onClick={handleCardClick}/>
          ))}
        </ImageSlider>
        {property.isMostLiked && <Badge>Most Liked</Badge>}
        <HeartButton
          onClick={(e: any) => {
            e.stopPropagation();
            onWishlist(property.id);
          }}
          whileTap={{ scale: 0.8 }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={property.isWishlisted ? "#ff4444" : "#A9A9A9  "}
            stroke={property.isWishlisted ? "#ff4444" : "#fff"}
            strokeWidth="2"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </HeartButton>
      </ImageContainer>
      <DotsContainer>
        {property.images.map((_, index) => (
          <Dot
            key={index}
            active={index === currentImageIndex}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsContainer>
      <Details>
        <Stats>
          <span>👁 {property.views}</span>
          <span
            style={{
              color: getRatingColor(property.rating),
              fontWeight: "bold",
            }}
          >
            <FaStar /> {property.rating}
          </span>
        </Stats>
        <p style={{ fontWeight: "600" }}>{property.name}</p>
        <p style={{ color: "#888888" }}>{property.location}</p>
        {/* <span style={{ color: "#888888" }}>{property.dateRange}</span> */}
      </Details>
    </Card>
  );
};
