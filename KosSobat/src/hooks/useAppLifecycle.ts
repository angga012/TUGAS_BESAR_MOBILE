/**
 * useAppLifecycle.ts
 * Custom hook untuk mengelola siklus hidup aplikasi (App State) dan komponen:
 * - Mendeteksi transisi status Foreground, Background, dan Inactive
 * - Menyediakan ref isMounted untuk mencegah memory leak state update setelah unmount
 * - Callback otomatis saat aplikasi kembali aktif (resume) atau diminimalkan
 */

import { useEffect, useRef, useState } from 'react';
import { AppState, AppStateStatus } from 'react-native';

interface UseAppLifecycleOptions {
  onForeground?: () => void;
  onBackground?: () => void;
}

export function useAppLifecycle(options: UseAppLifecycleOptions = {}) {
  const { onForeground, onBackground } = options;

  const [appState, setAppState] = useState<AppStateStatus>(AppState.currentState);
  const isMountedRef = useRef<boolean>(true);

  useEffect(() => {
    isMountedRef.current = true;

    // 1. Berlangganan perubahan status aplikasi (Foreground <-> Background)
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      // Jika bertransisi dari background/inactive ke active (Foreground)
      if (
        appState.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (onForeground) onForeground();
      }

      // Jika bertransisi ke background
      if (nextAppState.match(/inactive|background/)) {
        if (onBackground) onBackground();
      }

      if (isMountedRef.current) {
        setAppState(nextAppState);
      }
    });

    // 2. LIFECYCLE CLEANUP: Wajib menghapus event listener saat komponen unmount
    return () => {
      isMountedRef.current = false;
      subscription.remove();
    };
  }, [appState, onForeground, onBackground]);

  return {
    appState,
    isForeground: appState === 'active',
    isMountedRef,
  };
}

