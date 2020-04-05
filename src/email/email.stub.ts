import { getText } from "./get-texts";
import { TransportService } from "./email.types";

export class EmailStub implements TransportService {
  private sender = console;

  sendCode = async (email: string, code: string): Promise<void> => {
    const text = getText(code);

    this.sender.log(`${email}: ${text}`);
  };
}
