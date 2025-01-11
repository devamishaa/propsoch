// propertyService.ts

import { Property } from "../types/Property";

interface PropertyResponse {
    properties: Property[];
    hasMore: boolean;
  }
  
  const mockProperties: Property[] = [
    {
      id: "p1",
      name: "Sushant Lok 2, Gurgaon",
      location: "Apr 5-10",
      images: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        "https://plus.unsplash.com/premium_photo-1687862745573-1e8dff585c66?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      rating: 4.1,
      views: 41172,
      dateRange: "Apr 5-10",
      isMostLiked: true,
      isWishlisted: false,
      coordinates: {
        lat: 28.4595,
        lng: 77.0266
      }
    },
    {
      id: "p2",
      name: "Rainbow Heights, HSR",
      location: "Mar 5-14",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      rating: 3.0,
      views: 84012,
      dateRange: "Mar 5-14",
      isMostLiked: true,
      isWishlisted: false,
      coordinates: {
        lat: 12.9116,
        lng: 77.6474
      }
    },
    {
      id: "p3",
      name: "Walden, Colorado, US",
      location: "Mar 3-8",
      images: [
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
        "https://images.unsplash.com/photo-1602941525436-839a5be074ff?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1679939153963-ff44f5deeba2?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      rating: 2.8,
      views: 12048,
      dateRange: "Mar 3-8",
      isMostLiked: true,
      isWishlisted: false,
      coordinates: {
        lat: 40.7318,
        lng: -106.2847
      }
    },
    {
      id: "p4",
      name: "Sushant Lok 2, Gurgaon",
      location: "Apr 5-10",
      images: [
        "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
        "https://plus.unsplash.com/premium_photo-1683888725049-0e7337583bbf?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      ],
      rating: 4.1,
      views: 41172,
      dateRange: "Apr 5-10",
      isMostLiked: true,
      isWishlisted: false,
      coordinates: {
        lat: 28.4595,
        lng: 77.0266
      }
    }
  ];
  
  // Helper function to generate more mock properties
  const generateMoreProperties = (page: number): Property[] => {
    return mockProperties.map(property => ({
      ...property,
      id: `${property.id}-${page}`,
      name: `${property.name} (Set ${page})`,
      views: Math.floor(property.views * (0.8 + Math.random() * 0.4)),
      rating: Number((property.rating * (1.9 + Math.random() * 0.2)).toFixed(1)),
      isWishlisted: Math.random() > 0.8
    }));
  };
  
  // Simulated API call with delay
  export const fetchProperties = async (page: number): Promise<PropertyResponse> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simulate API pagination
    const propertiesPerPage = 4;
    const maxPages = 5;
    
    if (page > maxPages) {
      return {
        properties: [],
        hasMore: false
      };
    }
    
    const properties = generateMoreProperties(page);
    
    return {
      properties,
      hasMore: page < maxPages
    };
  };
  
  // Optional: Add filter and search functionality
  export interface PropertyFilters {
    minPrice?: number;
    maxPrice?: number;
    minRating?: number;
    location?: string;
    dateRange?: {
      start: Date;
      end: Date;
    };
  }
  
  export const searchProperties = async (
    query: string,
    filters?: PropertyFilters,
    page: number = 1
  ): Promise<PropertyResponse> => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    let filteredProperties = generateMoreProperties(page);
    
    // Apply search query
    if (query) {
      filteredProperties = filteredProperties.filter(property =>
        property.name.toLowerCase().includes(query.toLowerCase()) ||
        property.location.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply filters
    if (filters) {
      if (filters.minRating) {
        filteredProperties = filteredProperties.filter(
          property => property.rating >= filters.minRating!
        );
      }
      
      if (filters.location) {
        filteredProperties = filteredProperties.filter(property =>
          property.location.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
    }
    
    return {
      properties: filteredProperties,
      hasMore: page < 5 && filteredProperties.length > 0
    };
  };