export interface Property {
  id: any;
  name: string;
  location: string;
  images: string[];
  rating: number;
  views: number;
  dateRange: string;
  isMostLiked: boolean;
  isWishlisted: boolean;
  coordinates?: {
    lat: number;
    lng: number;
  };
  details?: {
    sector: string;
    localArea: string;
    price: string;
    emiAvailable: boolean;
    fullAddress: string;
    mapLocation: {
      latitude: number;
      longitude: number;
    };
    nearbyBenefits: {
      [key: string]: number; // Dynamic key-value pairs for benefits like Hospitals, Schools, etc.
    };
    propertyAmenities: string[];
    propertyType: string;
  };
}
