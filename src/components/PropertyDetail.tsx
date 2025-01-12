import React, { FC } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import mockProperties from "../service/propertyService";
import propertyImg from "../assets/property.jpeg";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { IoLocation } from "react-icons/io5";
import Navbar from "./Navigation";
import Header from "./Header";

// Styled components
const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;
  padding: 1rem;
  font-family: Arial, sans-serif;
`;

const PropertyImageContainer = styled.div`
  position: relative;
`;

const PropertyImage = styled.img`
  width: 100%;
  min-height: 25rem;
  border-radius: 8px;
  object-fit: cover;
`;

const PropertyInfoContainer = styled.div`
  margin: 1rem 0;
`;

const PropertyTitlePrice = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f4c6b;

  h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  h3 {
    font-size: 1.2rem;
    margin: 0;
  }
`;

const PropertyLocation = styled.div`
  padding-top: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #1f4c6b;
  font-size: 0.8rem;
`;

const LocationSection = styled.div`
  margin: 1rem 0;
  color: #1f4c6b;

  .location-icon {
    background-color: #fcd8bb;
    display: flex;
    align-items: center;
    padding: 0.4rem;
    border-radius: 50%;
    margin-bottom: 0.4rem;
  }

  .location-address {
    display: flex;
    gap: 0.5rem;
    justify-content: start;
    align-items: center;
  }

  div span {
    font-size: 0.8rem;
    font-weight: 600;
    color: #1f4c6b;
  }
`;

const MapContainerStyled = styled.div`
  margin: 1rem 0;
`;

const LocationTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 0.5rem;
  color: #1f4c6b;

  span {
    background-color: #f5f4f8;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }
`;

const AmenitiesSection = styled.div`
  margin: 1rem 0;
  color: #1f4c6b;

  .amenities {
    display: flex;
    gap: 10px;
  }

  .amenities span {
    background-color: #234f68;
    color: white;
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 0.8rem;
  }
`;

const NoProperties = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 4rem;
`;

interface PropertyDetailProps {
  id: number;
  name: string;
  location: string;
  images: string[];
  details?: {
    fullAddress: string;
    mapLocation?: {
      latitude: any;
      longitude: any;
    };
    propertyType: string;
    nearbyBenefits: Record<string, number>;
  };
  isMostLiked: boolean;
}

// Custom marker icon for Leaflet maps
const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [0, -41],
});

const PropertyDetail: FC = () => {
  const { id } = useParams<{ id: string }>();
  const property: PropertyDetailProps | undefined = mockProperties.find(
    (prop) => prop.id === parseInt(id as string, 10)
  );

  // If no property is found
  if (!property) {
    return (
      <>
        <NoProperties>
          <h2>Property Not Found</h2>
        </NoProperties>
        <Navbar />
      </>
    );
  }

  return (
    <Container>
      <Header />
      <PropertyImageContainer>
        <PropertyImage
          src={property.images[0] || propertyImg}
          alt={property.name}
        />
        {property.isMostLiked && (
          <div className="property-card-chip-container">
            <div
              style={{
                backgroundColor: "white",
                color: "black",
                fontSize: "0.7rem",
              }}
            />
          </div>
        )}
        <PropertyInfoContainer>
          <PropertyTitlePrice>
            <h2>{property.name}</h2>
            <h3>{property.details?.propertyType}</h3>
          </PropertyTitlePrice>
          <PropertyLocation>
            <span>{property.location}</span>
          </PropertyLocation>
        </PropertyInfoContainer>
      </PropertyImageContainer>
      <LocationSection>
        <h3>Location</h3>
        <div className="location-address">
          <div className="location-icon">
            <IoLocation />
          </div>
          <span>{property.details?.fullAddress}</span>
        </div>
        <div className="map-container">
          <div className="map-container">
            <MapContainer
              center={[
                property?.details?.mapLocation?.latitude || 0,
                property?.details?.mapLocation?.longitude || 0,
              ]}
              zoom={15}
              style={{ height: "15rem", width: "100%", borderRadius: "1rem" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {property?.details?.mapLocation && (
                <Marker
                  position={[
                    property.details.mapLocation.latitude,
                    property.details.mapLocation.longitude,
                  ]}
                  icon={customIcon}
                >
                  <Popup>{property.name}</Popup>
                </Marker>
              )}
            </MapContainer>
          </div>
        </div>
        <h3>Property Amenities</h3>
      </LocationSection>
      <AmenitiesSection>
        <div className="amenities">
          <span>{property.details?.propertyType}</span>
        </div>
      </AmenitiesSection>
      <Navbar />
    </Container>
  );
};

export default PropertyDetail;
