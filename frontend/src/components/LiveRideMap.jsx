import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';

const DEFAULT_CENTER = [28.6139, 77.2090]; // Connaught Place / Delhi coordinates default

// Helper to create an expressive modern DOM/SVG Icon with shadows & indicators
function createCustomIcon({ type = 'car', label = '', pulse = false, heading = 0 }) {
  let iconHtml = '';

  if (type === 'user') {
    iconHtml = `
      <div class="relative flex flex-col items-center group cursor-pointer select-none">
        ${label ? `<div class="bg-black text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap mb-1 tracking-tight">${label}</div>` : ''}
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-emerald-500 border-[3px] border-white shadow-xl flex items-center justify-center text-white ${pulse ? 'user-pulse-marker' : ''}">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 w-2.5 h-2.5 bg-emerald-600 rotate-45 border-r border-b border-white"></div>
        </div>
      </div>
    `;
  } else if (type === 'destination') {
    iconHtml = `
      <div class="relative flex flex-col items-center group cursor-pointer select-none">
        ${label ? `<div class="bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-white/20 whitespace-nowrap mb-1 tracking-tight">${label}</div>` : ''}
        <div class="relative flex items-center justify-center">
          <div class="w-10 h-10 rounded-full bg-red-500 border-[3px] border-white shadow-xl flex items-center justify-center text-white ${pulse ? 'dest-pulse-marker' : ''}">
            <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
          </div>
          <div class="absolute -bottom-1 w-2.5 h-2.5 bg-red-600 rotate-45 border-r border-b border-white"></div>
        </div>
      </div>
    `;
  } else {
    // Vehicles: car, bike, auto
    let svgIcon = '';
    let badgeText = 'Captain';

    if (type === 'bike') {
      badgeText = 'Moto';
      svgIcon = `
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M5 20.5A3.5 3.5 0 0 1 1.5 17 3.5 3.5 0 0 1 5 13.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m14 0a3.5 3.5 0 0 1-3.5-3.5 3.5 3.5 0 0 1 3.5-3.5 3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5M19 12h-1.78l-2.4-4.8A2 2 0 0 0 13.03 6H9v2h4.03l1.5 3H7.82A4.996 4.996 0 0 0 3 15.18V17h2.09A4.99 4.99 0 0 0 10 18.91V17h4v1.91A4.99 4.99 0 0 0 18.91 17H21v-1.82A4.996 4.996 0 0 0 19 12z"/>
        </svg>
      `;
    } else if (type === 'auto') {
      badgeText = 'UberAuto';
      svgIcon = `
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17zM7.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm9 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
        </svg>
      `;
    } else {
      // Default: Car / UberGo
      badgeText = 'UberGo';
      svgIcon = `
        <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z"/>
        </svg>
      `;
    }

    iconHtml = `
      <div class="relative flex flex-col items-center group cursor-pointer select-none">
        <div class="bg-black text-amber-400 text-[10px] font-black uppercase px-2 py-0.5 rounded-full shadow-lg border border-amber-400/30 whitespace-nowrap mb-1 tracking-wider flex items-center gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          <span>${label || badgeText}</span>
        </div>
        <div class="relative flex items-center justify-center">
          <div class="w-11 h-11 rounded-2xl bg-zinc-900 border-[2.5px] border-white shadow-2xl flex items-center justify-center text-amber-400 ${pulse ? 'vehicle-pulse-marker' : ''}">
            <div style="transform: rotate(${heading}deg); transition: transform 0.4s ease;">
              ${svgIcon}
            </div>
          </div>
          <div class="absolute -bottom-1 w-2.5 h-2.5 bg-zinc-900 rotate-45 border-r border-b border-white"></div>
        </div>
      </div>
    `;
  }

  return L.divIcon({
    html: iconHtml,
    className: 'custom-map-icon',
    iconSize: [44, 60],
    iconAnchor: [22, 54],
    popupAnchor: [0, -50],
  });
}

// Smooth animated marker position interpolator
function SmoothMarker({ targetPosition, icon }) {
  const [currentPosition, setCurrentPosition] = useState(targetPosition || DEFAULT_CENTER);
  const animationRef = useRef(null);
  const prevPositionRef = useRef(targetPosition || DEFAULT_CENTER);

  useEffect(() => {
    if (!targetPosition) return undefined;

    const from = prevPositionRef.current;
    const to = targetPosition;

    // Skip animation if unchanged
    if (from[0] === to[0] && from[1] === to[1]) {
      return undefined;
    }

    const start = performance.now();
    const duration = 850; // Smooth 850ms interpolation

    const animate = (now) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic

      const lat = from[0] + (to[0] - from[0]) * eased;
      const lng = from[1] + (to[1] - from[1]) * eased;

      setCurrentPosition([lat, lng]);

      if (t < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        prevPositionRef.current = to;
      }
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetPosition]);

  return <Marker position={currentPosition} icon={icon} />;
}

// Camera auto-fitter & smoother
function MapAutoBounds({ captainPos, userPos, destPos, routeCoords }) {
  const map = useMap();
  const hasFittedRef = useRef(false);

  useEffect(() => {
    const points = [];
    if (captainPos) points.push(captainPos);
    if (userPos) points.push(userPos);
    if (destPos) points.push(destPos);
    if (routeCoords && routeCoords.length > 0) {
      // Sample route coordinates to keep bounds calculation quick
      points.push(routeCoords[0]);
      points.push(routeCoords[Math.floor(routeCoords.length / 2)]);
      points.push(routeCoords[routeCoords.length - 1]);
    }

    if (points.length >= 2) {
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, {
        padding: [60, 60],
        maxZoom: 16,
        animate: true,
        duration: 1.2,
      });
      hasFittedRef.current = true;
    } else if (points.length === 1 && !hasFittedRef.current) {
      map.flyTo(points[0], 15, {
        animate: true,
        duration: 1.2,
      });
      hasFittedRef.current = true;
    }
  }, [map, captainPos, userPos, destPos, routeCoords]);

  return null;
}

const LiveRideMap = ({
  captainLocation = null,
  userLocation = null,
  destinationLocation = null,
  vehicleType = 'car',
  userLabel = 'You (Pickup)',
  captainLabel = '',
  destLabel = 'Destination',
  showRoute = true,
}) => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [routeStats, setRouteStats] = useState(null);

  const captainPos = useMemo(() => {
    if (!captainLocation?.lat || !captainLocation?.lng) return null;
    return [Number(captainLocation.lat), Number(captainLocation.lng)];
  }, [captainLocation]);

  const userPos = useMemo(() => {
    if (!userLocation?.lat || !userLocation?.lng) return null;
    return [Number(userLocation.lat), Number(userLocation.lng)];
  }, [userLocation]);

  const destPos = useMemo(() => {
    if (!destinationLocation?.lat || !destinationLocation?.lng) return null;
    return [Number(destinationLocation.lat), Number(destinationLocation.lng)];
  }, [destinationLocation]);

  // Fetch actual driving street route via OpenRouteService / OSRM API
  useEffect(() => {
    if (!showRoute) {
      setRouteCoordinates([]);
      return;
    }

    // Determine the start & end of the live driving path:
    // If captain and user both exist, route from captain to user (or destination)
    // If only user & destination exist, route from user to destination
    let startPoint = null;
    let endPoint = null;

    if (captainPos && userPos) {
      startPoint = captainPos;
      endPoint = destPos || userPos;
    } else if (userPos && destPos) {
      startPoint = userPos;
      endPoint = destPos;
    } else if (captainPos && destPos) {
      startPoint = captainPos;
      endPoint = destPos;
    }

    if (!startPoint || !endPoint) {
      setRouteCoordinates([]);
      return;
    }

    let isCancelled = false;

    async function fetchDrivingRoute() {
      try {
        // Use free public OSRM / OpenStreetMap routing API for actual road geometry
        const url = `https://router.project-osrm.org/route/v1/driving/${startPoint[1]},${startPoint[0]};${endPoint[1]},${endPoint[0]}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();

        if (isCancelled) return;

        if (data && data.routes && data.routes.length > 0) {
          const route = data.routes[0];
          // GeoJSON gives [lng, lat], Leaflet expects [lat, lng]
          const latLngs = route.geometry.coordinates.map((coord) => [coord[1], coord[0]]);
          setRouteCoordinates(latLngs);
          setRouteStats({
            distanceKm: (route.distance / 1000).toFixed(1),
            durationMin: Math.ceil(route.duration / 60),
          });
        } else {
          // Fallback smooth curved line if routing API is down
          setRouteCoordinates([startPoint, endPoint]);
        }
      } catch (err) {
        console.warn('Real road route fetch error, falling back:', err);
        if (!isCancelled) {
          setRouteCoordinates([startPoint, endPoint]);
        }
      }
    }

    fetchDrivingRoute();

    return () => {
      isCancelled = true;
    };
  }, [captainPos, userPos, destPos, showRoute]);

  // Compute heading/bearing between captain and user for realistic icon orientation
  const captainHeading = useMemo(() => {
    if (!captainPos || !userPos) return 0;
    const lat1 = (captainPos[0] * Math.PI) / 180;
    const lat2 = (userPos[0] * Math.PI) / 180;
    const dLon = ((userPos[1] - captainPos[1]) * Math.PI) / 180;
    const y = Math.sin(dLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);
    const brng = (Math.atan2(y, x) * 180) / Math.PI;
    return (brng + 360) % 360;
  }, [captainPos, userPos]);

  // Custom icons
  const userIcon = useMemo(
    () => createCustomIcon({ type: 'user', label: userLabel, pulse: true }),
    [userLabel]
  );

  const captainIcon = useMemo(
    () =>
      createCustomIcon({
        type: vehicleType || 'car',
        label: captainLabel,
        pulse: true,
        heading: captainHeading,
      }),
    [vehicleType, captainLabel, captainHeading]
  );

  const destIcon = useMemo(
    () => createCustomIcon({ type: 'destination', label: destLabel, pulse: false }),
    [destLabel]
  );

  const mapCenter = captainPos || userPos || destPos || DEFAULT_CENTER;

  return (
    <div className='relative w-full h-full'>
      <MapContainer
        center={mapCenter}
        zoom={14}
        className='w-full h-full'
        scrollWheelZoom={true}
        zoomControl={false}
      >
        {/* Standard OpenStreetMap Tiles (No API key required) */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />

        {/* Real road path between captain, user, and destination */}
        {routeCoordinates.length > 0 && (
          <>
            {/* Outer soft glow / casing */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#10b981',
                weight: 8,
                opacity: 0.35,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
            {/* Inner vibrant road line */}
            <Polyline
              positions={routeCoordinates}
              pathOptions={{
                color: '#059669',
                weight: 4.5,
                opacity: 0.95,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </>
        )}

        {/* User / Pickup Marker */}
        {userPos && <SmoothMarker targetPosition={userPos} icon={userIcon} />}

        {/* Captain / Driver Vehicle Marker */}
        {captainPos && <SmoothMarker targetPosition={captainPos} icon={captainIcon} />}

        {/* Destination Marker */}
        {destPos && <SmoothMarker targetPosition={destPos} icon={destIcon} />}

        {/* Auto Camera Follow & Viewport Fitting */}
        <MapAutoBounds
          captainPos={captainPos}
          userPos={userPos}
          destPos={destPos}
          routeCoords={routeCoordinates}
        />
      </MapContainer>

      {/* Floating Route Info Pill (if route exists) */}
      {routeStats && (
        <div className='absolute top-20 left-4 z-10 pointer-events-auto bg-black/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full shadow-xl border border-white/10 flex items-center gap-2 text-xs font-semibold'>
          <span className='w-2 h-2 rounded-full bg-emerald-400 animate-pulse'></span>
          <span>{routeStats.distanceKm} km</span>
          <span className='text-zinc-400'>•</span>
          <span>~{routeStats.durationMin} mins away</span>
        </div>
      )}
    </div>
  );
};

export default LiveRideMap;
