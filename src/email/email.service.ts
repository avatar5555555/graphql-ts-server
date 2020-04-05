import { TransportService } from "./email.types";

export class EmailService {
  constructor(private transport: TransportService) {}

  sendCode = (email: string, code: string): Promise<void> => {
    return this.transport.sendCode(email, code);
  };
}
