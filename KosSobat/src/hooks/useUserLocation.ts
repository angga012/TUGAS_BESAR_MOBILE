/**
 * useUserLocation.ts
 * Custom hook untuk mengelola state GPS real-time & geofence data
 */

import { useCallback, useEffect, useState } from 'react';
import { fetchCurrentLBS, LocationResult } from '../services/locationService';

export function useUserLocation() {
  const [locationData, setLocationData] = useState<LocationResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [permissionDenied, setPermissionDenied] = useState<boolean>(false);

  const refreshLocation = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setPermissionDenied(false);

    try {
      const result = await fetchCurrentLBS();
      setLocationData(result);
    } catch (err: any) {
      const msg = err?.message || 'Gagal mendeteksi lokasi GPS.';
      setErrorMessage(msg);
      if (msg.includes('Izin')) {
        setPermissionDenied(true);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshLocation();
  }, [refreshLocation]);

  return {
    locationData,
    isLoading,
    errorMessage,
    permissionDenied,
    refreshLocation,
  };
}

