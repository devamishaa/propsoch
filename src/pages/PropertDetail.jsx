/** @jsxImportSource @emotion/react */
import React from "react";
import { useParams } from "react-router-dom";
import { css } from "@emotion/react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import properties from "../utils/data";
import Chip from "@mui/material/Chip";
import { MdPlace } from "react-icons/md";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import { MdOutlinePlace } from "react-icons/md";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Custom marker icon for Leaflet maps
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const Detail = () => {
  const { id } = useParams();
  const property = properties.find((prop) => prop.id === parseInt(id));

  // If no property is found
  if (!property) {
    return (
      <>
        <Header />
        <div css={noPropertiesStyle}>
          <h2 style={{ fontSize: "25px" }}>Property Not Found</h2>
        </div>
        <Navbar />
      </>
    );
  }

  return (
    <>
      <Header />
      <div css={detailPageStyle}>
        {/* Property Image and Most Liked Chip */}
        <div css={propertyImageContainerStyle}>
          <img
            src={property.images[0]}
            alt="property"
            css={propertyImageStyle}
          />
          {property.isMostLiked && (
            <div css={chipContainerStyle}>
              <Chip
                label="Most Liked"
                style={{
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "0.7rem",
                }}
              />
            </div>
          )}
        </div>

        {/* Property Title, Location, and Price */}
        <div css={propertyInfoContainerStyle}>
          <div css={propertyTitlePriceStyle}>
            <h2 style={{ fontSize: "25px" }}>{property.name}</h2>
            <h3 style={{ fontSize: "25px" }}>{property?.details?.price}</h3>
          </div>
          <div css={propertyLocationStyle}>
            {(property?.details?.sector || property?.details?.localArea) && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <MdPlace
                  style={{ fontSize: "2rem", color: "#1F4C6B" }}
                />
                <span style={{ color: "#888888", lineHeight: "14px" }}>
                  {property?.details?.sector},{property?.details?.localArea}
                </span>
              </div>
            )}
            {property?.details?.emiAvailable && <span>EMI Available</span>}
          </div>
        </div>

        {/* Location Section with maps */}
        <div css={locationSectionStyle}>
          <h3>Location</h3>
          <div css={locationAddressStyle}>
            <div css={locationIconStyle}>
              <MdOutlinePlace />
            </div>
            <span>{property?.details?.fullAddress}</span>
          </div>
          {/* Map section */}
          <div css={mapContainerStyle}>
            <MapContainer
              center={[
                property?.details?.mapLocation?.latitude,
                property?.details?.mapLocation?.longitude,
              ]}
              zoom={15}
              style={{ height: "15rem", width: "100%", borderRadius: "1rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker
                position={[
                  property?.details?.mapLocation?.latitude,
                  property?.details?.mapLocation?.longitude,
                ]}
                icon={customIcon}
              >
                <Popup>{property.name}</Popup>
              </Marker>
            </MapContainer>
          </div>

          {/* Property Amenities section */}
        </div>
        <div>
          <div css={amenitiesContainerStyle}>
            {property?.details?.propertyAmenities.map((amenity, index) => (
              <Chip
                key={index}
                label={amenity}
                style={{
                  backgroundColor: "#f5f4f8",
                  margin: "5px",
                  fontSize: "0.9rem",
                  color: "#1f4c6b",
                }}
              />
            ))}
          </div>
        </div>
        <h3 style={{ color: "#252B5C", fontSize: "18px" }}>
          Property Amenities
        </h3>

        {/* Property Type section */}
        <div css={amenitiesSectionStyle}>
          {property?.details?.propertyType.map((amenity, index) => (
            <Chip
              key={index}
              label={amenity}
              style={{
                backgroundColor: "#234F68",
                margin: "5px",
                fontSize: "0.9rem",
                color: "#fff",
              }}
            />
          ))}
        </div>
      </div>
      <Navbar />
    </>
  );
};

export default Detail;

// Emotion styles
const detailPageStyle = css`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;
  font-family: Arial, sans-serif;
`;

const propertyImageContainerStyle = css`
  position: relative;
`;

const propertyImageStyle = css`
  width: 100%;
  min-height: 25rem;
  border-radius: 8px;
  object-fit: cover;
`;

const chipContainerStyle = css`
  position: absolute;
  top: 0.3rem;
  left: 0.3rem;
  z-index: 10;
`;

const propertyInfoContainerStyle = css`
  margin: 1rem 0;
`;

const propertyTitlePriceStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #252b5c;
`;

const propertyLocationStyle = css`
  padding-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f4c6b;
  font-size: 0.8rem;
`;

const amenitiesContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 1rem;
`;

const locationSectionStyle = css`
  margin: 1rem 0;
  color: #1f4c6b;
`;

const locationAddressStyle = css`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

const locationIconStyle = css`
  background-color: #fcd8bb;
  padding: 0.7rem;
  border-radius: 50%;
`;

const mapContainerStyle = css`
  margin: 1rem 0;
`;

const locationTagsStyle = css`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0.5rem;
  color: #1f4c6b;
`;

const amenitiesSectionStyle = css`
  margin: 1rem 0;
  color: #fff;
  width: auto;
  height: 29px;
  border-radius: 20px;
  gap: 10px;
  display: flex;
  align-items: center;
`;

const amenitiesStyle = css`
  display: flex;
  gap: 10px;
`;

const noPropertiesStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;
