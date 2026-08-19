import React, { useEffect, useMemo, useRef, useState } from 'react';
import { CircleMarker, MapContainer, TileLayer, useMap } from 'react-leaflet';

const DEFAULT_CENTER = [28.6139, 77.2090];

function SmoothCaptainMarker({ targetPosition }) {
  const [position, setPosition] = useState(targetPosition || DEFAULT_CENTER);
  const animationRef = useRef(null);

  useEffect(() => {
    if (!targetPosition) {
      return undefined;
    }

    const from = position;
    const to = targetPosition;
    const start = performance.now();
    const duration = 900;

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);

      const lat = from[0] + (to[0] - from[0]) * eased;
      const lng = from[1] + (to[1] - from[1]) * eased;

      setPosition([lat, lng]);

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition]);

  return (
    <CircleMarker
      center={position}
      radius={11}
      pathOptions={{ color: '#111827', fillColor: '#f97316', fillOpacity: 0.95, weight: 3 }}
    />
  );
}

function AutoFollow({ targetPosition }) {
  const map = useMap();

  useEffect(() => {
    if (!targetPosition) {
      return;
    }

    map.flyTo(targetPosition, Math.max(map.getZoom(), 15), {
      animate: true,
      duration: 1.2,
    });
  }, [map, targetPosition]);

  return null;
}

const LiveRideMap = ({ captainLocation }) => {
  const captainPosition = useMemo(() => {
    if (!captainLocation?.lat || !captainLocation?.lng) {
      return null;
    }

    return [captainLocation.lat, captainLocation.lng];
  }, [captainLocation]);

  return (
    <MapContainer
      center={captainPosition || DEFAULT_CENTER}
      zoom={13}
      className='w-full h-full'
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <AutoFollow targetPosition={captainPosition} />
      {captainPosition && <SmoothCaptainMarker targetPosition={captainPosition} />}
    </MapContainer>
  );
};

export default LiveRideMap;
