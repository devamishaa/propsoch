export interface Property {
    id: string;
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
  }