import React from 'react';
// import { Card } from '@/components/ui/card';
import Image from 'next/image';

const StaticMap = ({
  latitude = 40.7128,
  longitude = -74.0060,
  zoom = 3,
  width = 800,
  height = 100,
  style = 'streets-v11'
}) => {
  // Construct the Mapbox Static Images API URL
  // Construct the Mapbox Static Images API URL
  const baseUrl = 'https://api.mapbox.com/styles/v1/mapbox';
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const mapUrl = `${baseUrl}/${style}/static/${longitude},${latitude},${zoom}/${width}x${height}?access_token=${mapboxToken}`;

  return (
      <div className="relative w-full">
        <Image
          src={mapUrl}
          alt={`Map centered on ${latitude},${longitude}`}
          width={width}
          height={height}
        />
      </div>
  );
};

export default StaticMap;
