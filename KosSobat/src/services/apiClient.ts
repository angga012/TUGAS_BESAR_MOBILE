/**
 * apiClient.ts
 * Modul HTTP Client terpusat menggunakan native fetch + Promise + async/await.
 * Menangani timeout, parsing JSON, dan standardisasi error handling.
 */

// Ganti URL ini dengan URL backend server Anda (misal: Express.js, Laravel, Firebase, atau Mock API)
export const API_BASE_URL = 'https://api.kossobat.id/v1';

export interface RequestOptions extends RequestInit {
  timeoutMs?: number;
}

export class ApiError extends Error {
  status: number;
  data: any;

  constructor(message: string, status: number = 500, data: any = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

/**
 * Helper async generic fetcher dengan timeout dan response handling
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { timeoutMs = 8000, headers, ...restOptions } = options;

  // Setup AbortController untuk timeout otomatis
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  const fullUrl = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`;

  try {
    const response = await fetch(fullUrl, {
      ...restOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });

    clearTimeout(timeoutId);

    // Jika response HTTP bukan 2xx (misal 400, 404, 500)
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = await response.text();
      }
      throw new ApiError(
        errorData?.message || `HTTP Error ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    // Parsing JSON hasil sukses
    const data: T = await response.json();
    return data;
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      throw new ApiError('Koneksi terputus: Permintaan server melebihi batas waktu (Timeout)', 408);
    }

    if (error instanceof ApiError) {
      throw error;
    }

    // Network offline atau DNS error
    throw new ApiError(
      error.message || 'Gagal terhubung ke server. Periksa koneksi internet Anda.',
      0,
      error
    );
  }
}

