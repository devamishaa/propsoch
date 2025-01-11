// TODO 

// - routing = done
// - property details
// - star rating = done
// - Slide pictures within the given box
// - On product detail, using 2 finger swipe, Google Map should be panable
import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { PropertyCard } from "./components/PropertyCard";
import { Property } from "./types/Property";
import { fetchProperties } from "./service/propertyService";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import PropertyDetail from "./components/PropertyDetail";
import Navbar from "./components/Navigation";
import Header from "./components/Header";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;


const CardDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  width: 100%;
  box-sizing: border-box;
  padding: 0rem 0.4rem 0rem 0.4rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0;

  &:after {
    content: "";
    width: 40px;
    height: 40px;
    border: 5px solid #ddd;
    border-top-color: #ff4444; /* Color of the loader */
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const MainComponent: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]); // Store wishlist items
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreProperties = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const response = await fetchProperties(page);
      setProperties((prev) => [...prev, ...response.properties]);
      setHasMore(response.hasMore);
      setPage(page + 1);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMoreProperties();
  }, []);

  const toggleWishlist = (id: string) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.includes(id)) {
        return prevWishlist.filter((item) => item !== id); // Remove from wishlist
      } else {
        return [...prevWishlist, id]; // Add to wishlist
      }
    });
  };

  
  return (
    <>
    <Container>
      <Header />
      <CardDisplay>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onWishlist={toggleWishlist}
          />
        ))}
        {loading && <Loader />}
        {!hasMore && <>No more properties to display</>}
      </CardDisplay>
      <Navbar />
    </Container>
      </>
  );
};

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<MainComponent />} />
          <Route path="property/:id" element={<PropertyDetail />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;

// Wishlist Page

const WishlistPage = () => {
  const [wishlistProperties, setWishlistProperties] = useState<Property[]>([]);

  // Fetch the wishlist properties on component mount
  useEffect(() => {
    // Simulate fetching wishlisted properties (you may want to fetch from an API or global state)
    const fetchWishlist = async () => {
      const allProperties = await fetchProperties(1); // Assuming you're fetching properties from the first page
      const wishlistedProperties = allProperties.properties.filter((property) => property.isWishlisted);
      setWishlistProperties(wishlistedProperties);
    };

    fetchWishlist();
  }, []);

  return (
    <div style={{padding:"1rem"}}>
      <h2>Wishlist</h2>
      <div>
        {wishlistProperties.length > 0 ? (
          wishlistProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onWishlist={() => {}}
            />
          ))
        ) : (
          <p>No properties in your wishlist.</p>
        )}
      </div>
    </div>
  );
};


