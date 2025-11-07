import { useEffect, useRef, useState } from "react";

export default function MapComponent({ 
  ngos = [], 
  showNgoMarkers = false,
  pendingRequests = [],
  acceptedRequests = [],
  showRequestMarkers = false,
  ngoLocation = null // NGO's own location to center map
}) {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const ngoMarkersRef = useRef([]);
  const pendingRequestMarkersRef = useRef([]);
  const acceptedRequestMarkersRef = useRef([]);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  
  // Fallback position (Mumbai)
  const fallbackPosition = { lat: 19.0728521, lng: 72.8973513 };

  useEffect(() => {
    // If ngoLocation is provided, use it; otherwise get user's location
    if (ngoLocation) {
      setUserLocation(ngoLocation);
      return;
    }

    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          setLocationError(error.message);
          setUserLocation(fallbackPosition);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      console.warn('Geolocation not supported by browser');
      setLocationError('Geolocation not supported');
      setUserLocation(fallbackPosition);
    }
  }, [ngoLocation]);

  useEffect(() => {
    // If no API key, don't try to load
    if (!apiKey) {
      console.warn('Google Maps API key not found');
      return;
    }

    // Wait for user location to be determined
    if (!userLocation) return;

    // Load Google Maps script dynamically
    const loadGoogleMapsScript = () => {
      // Check if script already loaded
      if (window.google && window.google.maps) {
        initMap();
        return;
      }

      // Check if script is already being loaded
      if (document.querySelector('script[src*="maps.googleapis.com"]')) {
        // Wait for it to load
        const checkGoogle = setInterval(() => {
          if (window.google && window.google.maps) {
            clearInterval(checkGoogle);
            initMap();
          }
        }, 100);
        return;
      }

      // Create and load the script
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        initMap();
      };
      script.onerror = () => {
        console.error('Failed to load Google Maps script');
      };
      document.head.appendChild(script);
    };

    const initMap = () => {
      if (!mapRef.current || !window.google) return;

      try {
        // Create the map centered on user's location
        googleMapRef.current = new window.google.maps.Map(mapRef.current, {
          center: userLocation,
          zoom: 14, // Closer zoom for user location
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          gestureHandling: 'greedy', // allows single-finger panning on mobile
          zoomControl: true,
          mapTypeControl: true,
          streetViewControl: true,
          fullscreenControl: true,
        });

        // Add a marker at user's location
        userMarkerRef.current = new window.google.maps.Marker({
          position: userLocation,
          map: googleMapRef.current,
          title: locationError ? 'Default Location (Mumbai)' : 'Your Location',
          animation: window.google.maps.Animation.DROP,
          icon: locationError ? undefined : {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4F46E5',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Add info window for user location
        const userInfoWindow = new window.google.maps.InfoWindow({
          content: locationError 
            ? `<div style="padding: 8px;"><strong>Default Location</strong><br/>Location access denied or unavailable</div>`
            : `<div style="padding: 8px;"><strong>You are here</strong><br/>Lat: ${userLocation.lat.toFixed(6)}, Lng: ${userLocation.lng.toFixed(6)}</div>`,
        });

        userMarkerRef.current.addListener('click', () => {
          userInfoWindow.open(googleMapRef.current, userMarkerRef.current);
        });

        // Add NGO markers if enabled
        if (showNgoMarkers && ngos.length > 0) {
          addNgoMarkers();
        }

        // Add request markers if enabled
        if (showRequestMarkers) {
          if (pendingRequests.length > 0) addPendingRequestMarkers();
          if (acceptedRequests.length > 0) addAcceptedRequestMarkers();
        }

      } catch (error) {
        console.error('Error initializing map:', error);
      }
    };

    const addNgoMarkers = () => {
      // Clear existing NGO markers
      ngoMarkersRef.current.forEach(marker => marker.setMap(null));
      ngoMarkersRef.current = [];

      ngos.forEach((ngo) => {
        const ngoLat = parseFloat(ngo.ngoLatitude);
        const ngoLng = parseFloat(ngo.ngoLongitude);

        if (isNaN(ngoLat) || isNaN(ngoLng)) {
          console.warn(`Invalid coordinates for NGO: ${ngo.ngoName}`);
          return;
        }

        const ngoPosition = { lat: ngoLat, lng: ngoLng };

        // Create custom NGO icon (red marker)
        const ngoMarker = new window.google.maps.Marker({
          position: ngoPosition,
          map: googleMapRef.current,
          title: ngo.ngoName,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#DC2626', // Red color for NGOs
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        // Calculate distance from user location (simple Haversine formula)
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          ngoLat,
          ngoLng
        );

        // Create info window for NGO
        const ngoInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1F2937;">
                ${ngo.ngoName}
              </h3>
              <div style="font-size: 14px; color: #4B5563; margin-bottom: 6px;">
                <strong>Contact:</strong> ${ngo.ngoContact}
              </div>
              ${ngo.ngoDescription ? `
                <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">
                  ${ngo.ngoDescription}
                </div>
              ` : ''}
              <div style="font-size: 13px; color: #059669; font-weight: 500;">
                📍 ${distance.toFixed(2)} km away
              </div>
              <div style="font-size: 11px; color: #9CA3AF; margin-top: 6px;">
                Lat: ${ngoLat.toFixed(6)}, Lng: ${ngoLng.toFixed(6)}
              </div>
            </div>
          `,
        });

        ngoMarker.addListener('click', () => {
          ngoInfoWindow.open(googleMapRef.current, ngoMarker);
        });

        ngoMarkersRef.current.push(ngoMarker);
      });

    };

    const addPendingRequestMarkers = () => {
      // Clear existing pending request markers
      pendingRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      pendingRequestMarkersRef.current = [];

      pendingRequests.forEach((request) => {
        const reqLat = parseFloat(request.latitude);
        const reqLng = parseFloat(request.longitude);

        if (isNaN(reqLat) || isNaN(reqLng)) {
          console.warn(`Invalid coordinates for request: ${request.type}`);
          return;
        }

        const requestPosition = { lat: reqLat, lng: reqLng };

        // Orange marker for pending requests
        const requestMarker = new window.google.maps.Marker({
          position: requestPosition,
          map: googleMapRef.current,
          title: `${request.type} - ${request.urgency} Urgency`,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#F59E0B', // Orange for pending
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          reqLat,
          reqLng
        );

        const urgencyColor = request.urgency === 'High' ? '#DC2626' : 
                            request.urgency === 'Medium' ? '#F59E0B' : '#10B981';

        const requestInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 280px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">
                  ${request.type}
                </h3>
                <span style="background: ${urgencyColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                  ${request.urgency}
                </span>
              </div>
              <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">
                ${request.description}
              </div>
              ${request.survivorName ? `
                <div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;">
                  <strong>Survivor:</strong> ${request.survivorName}
                </div>
              ` : ''}
              ${request.contactInfo || request.survivorPhone ? `
                <div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;">
                  <strong>Contact:</strong> ${request.contactInfo || request.survivorPhone}
                </div>
              ` : ''}
              ${request.address ? `
                <div style="font-size: 12px; color: #6B7280; margin-bottom: 6px;">
                  📍 ${request.address}
                </div>
              ` : ''}
              <div style="font-size: 13px; color: #F59E0B; font-weight: 500; margin-top: 6px;">
                🆘 Pending Help - ${distance.toFixed(2)} km away
              </div>
              <div style="font-size: 11px; color: #9CA3AF; margin-top: 4px;">
                Posted: ${new Date(request.createdAt).toLocaleDateString()}
              </div>
            </div>
          `,
        });

        requestMarker.addListener('click', () => {
          requestInfoWindow.open(googleMapRef.current, requestMarker);
        });

        pendingRequestMarkersRef.current.push(requestMarker);
      });

    };

    const addAcceptedRequestMarkers = () => {
      // Clear existing accepted request markers
      acceptedRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      acceptedRequestMarkersRef.current = [];

      acceptedRequests.forEach((request) => {
        const reqLat = parseFloat(request.latitude);
        const reqLng = parseFloat(request.longitude);

        if (isNaN(reqLat) || isNaN(reqLng)) {
          console.warn(`Invalid coordinates for request: ${request.type}`);
          return;
        }

        const requestPosition = { lat: reqLat, lng: reqLng };

        // Green marker for accepted requests
        const requestMarker = new window.google.maps.Marker({
          position: requestPosition,
          map: googleMapRef.current,
          title: `${request.type} - ${request.status}`,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#10B981', // Green for accepted
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          reqLat,
          reqLng
        );

        const urgencyColor = request.urgency === 'High' ? '#DC2626' : 
                            request.urgency === 'Medium' ? '#F59E0B' : '#10B981';

        const requestInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 280px;">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">
                  ${request.type}
                </h3>
                <span style="background: ${urgencyColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">
                  ${request.urgency}
                </span>
              </div>
              <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">
                ${request.description}
              </div>
              ${request.survivorName ? `
                <div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;">
                  <strong>Survivor:</strong> ${request.survivorName}
                </div>
              ` : ''}
              ${request.contactInfo || request.survivorPhone ? `
                <div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;">
                  <strong>Contact:</strong> ${request.contactInfo || request.survivorPhone}
                </div>
              ` : ''}
              ${request.address ? `
                <div style="font-size: 12px; color: #6B7280; margin-bottom: 6px;">
                  📍 ${request.address}
                </div>
              ` : ''}
              <div style="background: #10B981; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; margin-top: 6px; display: inline-block;">
                ✓ You're helping - ${request.status}
              </div>
              <div style="font-size: 13px; color: #059669; font-weight: 500; margin-top: 4px;">
                📍 ${distance.toFixed(2)} km away
              </div>
              ${request.responders && request.responders.length > 0 ? `
                <div style="font-size: 11px; color: #6B7280; margin-top: 4px;">
                  ${request.responders.length} responder(s) helping
                </div>
              ` : ''}
            </div>
          `,
        });

        requestMarker.addListener('click', () => {
          requestInfoWindow.open(googleMapRef.current, requestMarker);
        });

        acceptedRequestMarkersRef.current.push(requestMarker);
      });
    };

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      // Haversine formula to calculate distance between two points
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
      return distance;
    };

    loadGoogleMapsScript();

    // Cleanup
    return () => {
      if (googleMapRef.current) {
        googleMapRef.current = null;
      }
      if (userMarkerRef.current) {
        userMarkerRef.current = null;
      }
      ngoMarkersRef.current.forEach(marker => marker.setMap(null));
      ngoMarkersRef.current = [];
      pendingRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      pendingRequestMarkersRef.current = [];
      acceptedRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      acceptedRequestMarkersRef.current = [];
    };
  }, [apiKey, userLocation]);

  // Re-add NGO markers when ngos prop changes
  useEffect(() => {
    if (googleMapRef.current && showNgoMarkers && ngos.length > 0) {
      // Clear existing markers
      ngoMarkersRef.current.forEach(marker => marker.setMap(null));
      ngoMarkersRef.current = [];

      // Add new markers
      ngos.forEach((ngo) => {
        const ngoLat = parseFloat(ngo.ngoLatitude);
        const ngoLng = parseFloat(ngo.ngoLongitude);

        if (isNaN(ngoLat) || isNaN(ngoLng)) {
          console.warn(`Invalid coordinates for NGO: ${ngo.ngoName}`);
          return;
        }

        const ngoPosition = { lat: ngoLat, lng: ngoLng };

        const ngoMarker = new window.google.maps.Marker({
          position: ngoPosition,
          map: googleMapRef.current,
          title: ngo.ngoName,
          animation: window.google.maps.Animation.DROP,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 10,
            fillColor: '#DC2626',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          },
        });

        const distance = ((lat1, lon1, lat2, lon2) => {
          const R = 6371;
          const dLat = (lat2 - lat1) * Math.PI / 180;
          const dLon = (lon2 - lon1) * Math.PI / 180;
          const a = 
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
          const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
          return R * c;
        })(userLocation.lat, userLocation.lng, ngoLat, ngoLng);

        const ngoInfoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 12px; max-width: 250px;">
              <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: 600; color: #1F2937;">
                ${ngo.ngoName}
              </h3>
              <div style="font-size: 14px; color: #4B5563; margin-bottom: 6px;">
                <strong>Contact:</strong> ${ngo.ngoContact}
              </div>
              ${ngo.ngoDescription ? `
                <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">
                  ${ngo.ngoDescription}
                </div>
              ` : ''}
              <div style="font-size: 13px; color: #059669; font-weight: 500;">
                📍 ${distance.toFixed(2)} km away
              </div>
              <div style="font-size: 11px; color: #9CA3AF; margin-top: 6px;">
                Lat: ${ngoLat.toFixed(6)}, Lng: ${ngoLng.toFixed(6)}
              </div>
            </div>
          `,
        });

        ngoMarker.addListener('click', () => {
          ngoInfoWindow.open(googleMapRef.current, ngoMarker);
        });

        ngoMarkersRef.current.push(ngoMarker);
      });

    }
  }, [ngos, showNgoMarkers, userLocation]);

  // Re-add request markers when requests prop changes
  useEffect(() => {
    if (googleMapRef.current && showRequestMarkers && userLocation) {
      // Clear existing pending request markers
      pendingRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      pendingRequestMarkersRef.current = [];
      
      // Clear existing accepted request markers
      acceptedRequestMarkersRef.current.forEach(marker => marker.setMap(null));
      acceptedRequestMarkersRef.current = [];

      // Add pending requests
      if (pendingRequests.length > 0) {
        pendingRequests.forEach((request) => {
          const reqLat = parseFloat(request.latitude);
          const reqLng = parseFloat(request.longitude);

          if (isNaN(reqLat) || isNaN(reqLng)) return;

          const requestPosition = { lat: reqLat, lng: reqLng };
          const requestMarker = new window.google.maps.Marker({
            position: requestPosition,
            map: googleMapRef.current,
            title: `${request.type} - ${request.urgency} Urgency`,
            animation: window.google.maps.Animation.DROP,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#F59E0B',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          const distance = ((lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = 
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          })(userLocation.lat, userLocation.lng, reqLat, reqLng);

          const urgencyColor = request.urgency === 'High' ? '#DC2626' : 
                              request.urgency === 'Medium' ? '#F59E0B' : '#10B981';

          const requestInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 280px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">${request.type}</h3>
                  <span style="background: ${urgencyColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">${request.urgency}</span>
                </div>
                <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">${request.description}</div>
                ${request.survivorName ? `<div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;"><strong>Survivor:</strong> ${request.survivorName}</div>` : ''}
                ${request.contactInfo || request.survivorPhone ? `<div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;"><strong>Contact:</strong> ${request.contactInfo || request.survivorPhone}</div>` : ''}
                ${request.address ? `<div style="font-size: 12px; color: #6B7280; margin-bottom: 6px;">📍 ${request.address}</div>` : ''}
                <div style="font-size: 13px; color: #F59E0B; font-weight: 500; margin-top: 6px;">🆘 Pending Help - ${distance.toFixed(2)} km away</div>
              </div>
            `,
          });

          requestMarker.addListener('click', () => requestInfoWindow.open(googleMapRef.current, requestMarker));
          pendingRequestMarkersRef.current.push(requestMarker);
        });
      }

      // Add accepted requests
      if (acceptedRequests.length > 0) {
        acceptedRequests.forEach((request) => {
          const reqLat = parseFloat(request.latitude);
          const reqLng = parseFloat(request.longitude);

          if (isNaN(reqLat) || isNaN(reqLng)) return;

          const requestPosition = { lat: reqLat, lng: reqLng };
          const requestMarker = new window.google.maps.Marker({
            position: requestPosition,
            map: googleMapRef.current,
            title: `${request.type} - ${request.status}`,
            animation: window.google.maps.Animation.DROP,
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: '#10B981',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2,
            },
          });

          const distance = ((lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a = 
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
          })(userLocation.lat, userLocation.lng, reqLat, reqLng);

          const urgencyColor = request.urgency === 'High' ? '#DC2626' : 
                              request.urgency === 'Medium' ? '#F59E0B' : '#10B981';

          const requestInfoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 12px; max-width: 280px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
                  <h3 style="margin: 0; font-size: 16px; font-weight: 600; color: #1F2937;">${request.type}</h3>
                  <span style="background: ${urgencyColor}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 11px; font-weight: 600;">${request.urgency}</span>
                </div>
                <div style="font-size: 13px; color: #6B7280; margin-bottom: 6px;">${request.description}</div>
                ${request.survivorName ? `<div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;"><strong>Survivor:</strong> ${request.survivorName}</div>` : ''}
                ${request.contactInfo || request.survivorPhone ? `<div style="font-size: 13px; color: #4B5563; margin-bottom: 4px;"><strong>Contact:</strong> ${request.contactInfo || request.survivorPhone}</div>` : ''}
                ${request.address ? `<div style="font-size: 12px; color: #6B7280; margin-bottom: 6px;">📍 ${request.address}</div>` : ''}
                <div style="background: #10B981; color: white; padding: 4px 8px; border-radius: 6px; font-size: 12px; font-weight: 500; margin-top: 6px; display: inline-block;">✓ You're helping - ${request.status}</div>
                <div style="font-size: 13px; color: #059669; font-weight: 500; margin-top: 4px;">📍 ${distance.toFixed(2)} km away</div>
              </div>
            `,
          });

          requestMarker.addListener('click', () => requestInfoWindow.open(googleMapRef.current, requestMarker));
          acceptedRequestMarkersRef.current.push(requestMarker);
        });
      }
    }
  }, [pendingRequests, acceptedRequests, showRequestMarkers, userLocation]);

  if (!apiKey) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-gray-100 text-gray-700 rounded border border-gray-300">
        <div className="text-center p-6">
          <p className="font-semibold mb-2">Google Maps API Key Missing</p>
          <p className="text-sm">Add VITE_GOOGLE_MAPS_API_KEY to your .env file</p>
        </div>
      </div>
    );
  }

  if (!userLocation) {
    return (
      <div className="w-full h-96 flex items-center justify-center bg-blue-50 text-blue-700 rounded border border-blue-200">
        <div className="text-center p-6">
          <div className="animate-pulse mb-3">
            <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="font-semibold mb-1">Getting your location...</p>
          <p className="text-sm">Please allow location access when prompted</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {locationError && (
        <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-yellow-800 text-sm">
          <strong>Note:</strong> Using default location (Mumbai). {locationError}
        </div>
      )}
      <div 
        ref={mapRef} 
        className="w-full rounded border border-gray-300 shadow-lg" 
        style={{ height: '400px' }}
      />
    </div>
  );
}