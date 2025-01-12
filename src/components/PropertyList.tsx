import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';
import { Property } from '../types/Property';
import { PropertyCard } from './PropertyCard';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 16px;

  @media (min-width: 768px) {
    max-width: 800px;
  }

  @media (min-width: 1024px) {
    max-width: 1200px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const LoadingIndicator = styled.div`
  text-align: center;
  padding: 20px;
`;

export const PropertyList: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  const loadMoreProperties = async () => {
    setLoading(true);
    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const newProperties: Property[] = [
      {
        id: Date.now().toString(),
        name: 'Sushant Lok 2, Gurgaon',
        location: 'Gurgaon, India',
        rating: 4.8,
        views: 6172,
        dateRange: 'Apr 5 - 10',
        isMostLiked:true,
        images: [
          'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
        ],
        isWishlisted: false,
        coordinates: { lat: 28.4595, lng: 77.0266 },
      },
      // Add more properties here
    ];

    setProperties((prev) => [...prev, ...newProperties]);
    setLoading(false);
  };

  useEffect(() => {
    if (inView && !loading) {
      loadMoreProperties();
    }
  }, [inView]);

  const handleWishlist = (id: string) => {
    setProperties((prev) =>
      prev.map((prop) =>
        prop.id === id
          ? { ...prop, isWishlisted: !prop.isWishlisted }
          : prop
      )
    );
  };

  const handlePropertyClick = (id: string) => {
    // Navigate to property detail
    console.log('Navigate to property:', id);
  };

  return (
    <Container>
      <Grid>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onWishlist={handleWishlist}
            onClick={handlePropertyClick}
          />
        ))}
      </Grid>
      <LoadingIndicator ref={ref}>
        {loading ? 'Loading more properties...' : ''}
      </LoadingIndicator>
    </Container>
  );
};