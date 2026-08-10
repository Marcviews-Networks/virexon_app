// Global shared types for the frontend application

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
