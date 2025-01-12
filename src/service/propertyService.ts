// propertyService.ts

import { Property } from "../types/Property";

interface PropertyResponse {
    properties: Property[];
    hasMore: boolean;
  }

  const mockProperties: Property[] = [
    {
      id: 12,
      name: "Palm Heights",
      location: "Whitefield, Bangalore",
      dateRange: "Mar 15-April 20",
      views: 35689,
      rating: 4.75,
      isMostLiked: true,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
  
      ],
      details: {
        sector: "Whitefield",
        localArea: "Bangalore",
        price: "2.25 Cr",
        emiAvailable: true,
        fullAddress:
          "Whitefield Main Road, Bengaluru, Karnataka 560066",
        mapLocation: {
          longitude: 77.749947,
          latitude: 12.971599,
        },
        nearbyBenefits: {
          Hospitals: 4,
          "Gas Stations": 5,
          Schools: 3,
          "Railway Station": 2,
          Mall: 2,
          Restaurants: 8,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Clubhouse",
          "CCTV",
          "Rainwater Harvesting",
          "Basketball Court",
          "Tennis Court",
          "Jogging Track",
        ],
        propertyType: "Apartment",
      },
    },
    {
      id: 13,
      name: "Skyline Villas",
      location: "Indiranagar, Bangalore",
      dateRange: "Apr 1-5",
      views: 48210,
      rating: 4.9,
      isMostLiked: true,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
  
       ],
      details: {
        sector: "Indiranagar",
        localArea: "Bangalore",
        price: "3.5 Cr",
        emiAvailable: true,
        fullAddress:
          "Indiranagar, HAL 2nd Stage, Bengaluru, Karnataka 560038",
        mapLocation: {
          longitude: 77.640013,
          latitude: 12.971891,
        },
        nearbyBenefits: {
          Hospitals: 5,
          "Gas Stations": 4,
          Schools: 2,
          "Railway Station": 1,
          Mall: 3,
          Restaurants: 10,
        },
        propertyAmenities: [
          "Private Garden",
          "Swimming Pool",
          "Security",
          "Home Theater",
          "Rainwater Harvesting",
          "Tennis Court",
          "Amphitheater",
          "Yoga Deck",
        ],
        propertyType: "Villa",
      },
    },
    {
      id: 14,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Apartment",
      },
    },
    {
      id: 15,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Home",
      },
    },
    {
      id: 16,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Home",
      },
    },
    {
      id: 17,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Apartment",
      },
    },
    {
      id: 18,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Home",
      },
    },
    {
      id: 19,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Villa",
      },
    },
    {
      id: 20,
      name: "Emerald Lakeview",
      location: "Sarjapur Road, Bangalore",
      dateRange: "Apr 10-15",
      views: 29840,
      rating: 4.6,
      isMostLiked: false,
      isWishlisted: false,
      images: [
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_gtOOzrBk1u1735217425802_86312_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_ggCYWCG17J1735217424542_20455_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_project_image_TMy3v1yCfj1735217424178_89805_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_6CXIrstbhN1735217424718_94832_iris_original.jpg",
        "https://assets.nobroker.in/media/building/8a9fa5839402d3c7019402e916cd063e/images/8a9fa5839402d3c7019402e916cd063e_interior_image_OY9b3G0R161735217425414_74195_original.jpg",
  
      ],
      details: {
        sector: "Sarjapur",
        localArea: "Bangalore",
        price: "1.8 Cr",
        emiAvailable: true,
        fullAddress:
          "Sarjapur Main Road, Bengaluru, Karnataka 562125",
        mapLocation: {
          longitude: 77.711323,
          latitude: 12.911235,
        },
        nearbyBenefits: {
          Hospitals: 3,
          "Gas Stations": 5,
          Schools: 4,
          "Railway Station": 1,
          Mall: 1,
          Restaurants: 6,
        },
        propertyAmenities: [
          "Gym",
          "Swimming Pool",
          "Parking",
          "Security",
          "Park",
          "CCTV",
          "Children's Play Area",
          "Jogging Track",
          "Amphitheater",
          "Clubhouse",
        ],
        propertyType: "Apartment",
      },
    },
  ];
  
  export default mockProperties;
  
  // Helper function to generate more mock properties
  const generateMoreProperties = (page: number): Property[] => {
    return mockProperties.map(property => ({
      ...property,
      id: `${property.id}`,
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
  
  
  
    