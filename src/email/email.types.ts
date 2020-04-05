export interface TransportService {
  sendCode: (email: string, code: string) => Promise<void>;
}
