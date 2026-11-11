/**
 * useKostDashboard.ts
 * Custom Hook React untuk memisahkan logika asynchronous data fetching dari komponen UI.
 * Mengelola state: data, loading, refreshing, dan error dengan penanganan async/await & try-catch.
 */

import { useCallback, useEffect, useState } from 'react';
import { getDashboardData } from '../services/kostService';
import { DashboardData } from '../types/api';

export function useKostDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fungsi asynchronous untuk mengambil data dari REST API / Service
   */
  const loadData = useCallback(async (isRefreshAction = false) => {
    if (isRefreshAction) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      // Pemanggilan async/await
      const dashboardData = await getDashboardData(isRefreshAction ? 600 : 900);
      setData(dashboardData);
    } catch (err: any) {
      setError(err?.message || 'Gagal memuat data dari server');
    } finally {
      // Lifecycle cleanup state agar UI tidak freeze
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Hook useEffect untuk inisialisasi awal saat komponen di-mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handler untuk pull-to-refresh
  const onRefresh = useCallback(() => {
    loadData(true);
  }, [loadData]);

  return {
    data,
    isLoading,
    isRefreshing,
    error,
    refetch: () => loadData(false),
    onRefresh,
  };
}

