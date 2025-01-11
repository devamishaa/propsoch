// import React, { useRef, useState } from "react";
// import styled from "@emotion/styled";
// import propertyImg from "../assets/property.jpeg";

// const Container = styled.div`
//   padding: 16px;
//   max-width: 800px;
//   margin: 0 auto;
//   background: #fff;
//   border-radius: 8px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// `;

// const Header = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 16px;
//   margin-bottom: 16px;
// `;

// const PropertyImage = styled.img`
//   width: 150px;
//   height: 150px;
//   object-fit: cover;
//   border-radius: 8px;
// `;

// const PropertyDetails = styled.div`
//   flex: 1;
// `;

// const PropertyName = styled.h1`
//   font-size: 1.5rem;
//   margin: 0;
//   color: #333;
// `;

// const PropertyLocation = styled.p`
//   margin: 8px 0;
//   font-size: 1rem;
//   color: #666;
// `;

// const Body = styled.div`
//   font-size: 1rem;
//   color: #444;
//   line-height: 1.6;
// `;

// const MapContainer = styled.div`
//   margin-top: 16px;
//   height: 300px;
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   overflow: hidden;
//   touch-action: none; /* Prevent default touch gestures */
// `;

// interface PropertyDetailProps {
//   property: {
//     id: string;
//     name: string;
//     location: string;
//     description: string;
//     image?: string;
//   };
// }

// const PropertyDetail: React.FC<PropertyDetailProps> = ({ property }) => {
//   const mapRef = useRef<HTMLDivElement>(null);
//   const [isTwoFingerGesture, setTwoFingerGesture] = useState(false);

//   const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
//     if (event.touches.length === 2) {
//       setTwoFingerGesture(true);
//     }
//   };

//   const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
//     if (isTwoFingerGesture) {
//       event.stopPropagation();
//     }
//   };

//   const handleTouchEnd = () => {
//     setTwoFingerGesture(false);
//   };

//   return (
//     <Container>
//       <Header>
//         <PropertyImage src={property.image || propertyImg} alt={property.name} />
//         <PropertyDetails>
//           <PropertyName>{property.name}</PropertyName>
//           <PropertyLocation>{property.location}</PropertyLocation>
//         </PropertyDetails>
//       </Header>
//       <Body>
//         <p>{property.description}</p>
//       </Body>
//       <MapContainer
//         ref={mapRef}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <iframe
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093735!2d144.96305791531642!3d-37.81362797975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777a83d8f0a1e8!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1615976579990!5m2!1sen!2sau"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           allowFullScreen
//           loading="lazy"
//           title="Google Map"
//         ></iframe>
//       </MapContainer>
//     </Container>
//   );
// };

// export default PropertyDetail;

import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "@emotion/styled";
import propertyImg from "../assets/property.jpeg";

const Container = styled.div`/* styles */`;
const Header = styled.div``;
const PropertyImage = styled.img`
            border-radius: 16px;
`;
const PropertyDetails = styled.div`/* styles */`;
const PropertyName = styled.h1`font-size:25px;font-weight:500`;
const PropertyLocation = styled.p`/* styles */`;
const Body = styled.div`/* styles */`;
const MapContainer = styled.div`/* styles */`;

interface PropertyDetailProps {
  id: string;
  name: string;
  location: string;
  description: string;
  image?: string;
}

const PropertyDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<PropertyDetailProps | null>(null);

  useEffect(() => {
    // Simulate fetching data (replace with actual API call)
    const fetchProperty = async () => {
      const mockData: PropertyDetailProps = {
        id: "1",
        name: "Beautiful Villa",
        location: "123 Ocean Drive, Miami",
        description: "A stunning villa with a breathtaking view of the ocean.",
        image: propertyImg,
      };
      setProperty(mockData); // Replace with API response
    };
    fetchProperty();
  }, [id]);

  if (!property) return <p>Loading...</p>;

//   const mapRef = useRef<HTMLDivElement>(null);

  const handleGesture = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.ctrlKey) {
      event.stopPropagation();
    }
  };

  return (
    <Container>
      <Header>
        <PropertyImage src={property.image || propertyImg} alt={property.name} />
        <PropertyDetails>
          <PropertyName>{property.name}</PropertyName>
          <PropertyLocation>{property.location}</PropertyLocation>
        </PropertyDetails>
      </Header>
      <Body>
        <p>{property.description}</p>
      </Body>
      {/* <MapContainer
        ref={mapRef}
        onWheel={handleGesture}
        style={{ touchAction: "pan-x pan-y" }}
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093735!2d144.96305791531642!3d-37.81362797975161!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5777a83d8f0a1e8!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1615976579990!5m2!1sen!2sau"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Google Map"
        ></iframe>
      </MapContainer> */}
    </Container>
  );
};

export default PropertyDetail;
