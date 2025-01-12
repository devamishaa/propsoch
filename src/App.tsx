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
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import PropertyDetail from "./components/PropertyDetail";
import Navbar from "./components/Navigation";
import Header from "./components/Header";
import { useInView } from "react-intersection-observer";

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
  gap: 5px;
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
  const [, setWishlist] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const loadMoreProperties = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const response = await fetchProperties(page);

    setProperties((prev) => [...prev, ...response.properties]);
    setPage((prev) => prev + 1);
    setHasMore(response.hasMore);
    setLoading(false);
  };

  useEffect(() => {
    if (inView && !loading && hasMore) {
      loadMoreProperties();
    }
  }, [inView]);

  const toggleWishlist = (id: string) => {
    setWishlist((prevWishlist: any) => {
      if (prevWishlist.includes(id)) {
        return prevWishlist.filter((item: any) => item !== id);
      } else {
        return [...prevWishlist, id];
      }
    });
  };

  // if (windowWidth > 768) {
  //   return (
  //     <div className="error">
  //       <h1>Switch to Tab or Mobile View</h1>
  //     </div>
  //   );
  // }

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
          <div ref={ref}>
            {loading ? (
              <Loader />
            ) : properties.length > 0 ? (
              ""
            ) : (
              "No more properties available"
            )}
          </div>
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
          <Route path="*" element={<Navigate to="/" />} />
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
    const fetchWishlist = async () => {
      const allProperties = await fetchProperties(1);
      const wishlistedProperties = allProperties.properties.filter(
        (property) => property.isWishlisted
      );
      setWishlistProperties(wishlistedProperties);
    };

    fetchWishlist();
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Wishlist</h2>
      <div>
        {wishlistProperties.length > 0 ? (
          wishlistProperties.map((property) => (
            <PropertyCard
            key={`${property.id}-${Math.random()}`}
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
