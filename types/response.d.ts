export type HTTPResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};
