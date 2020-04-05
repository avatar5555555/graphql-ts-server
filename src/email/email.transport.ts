import { SES, config as AWSConfig } from "aws-sdk";
import { SendEmailRequest } from "aws-sdk/clients/ses";

import { appConfig } from "../app-config";

import { TransportService } from "./email.types";
import { getHtml, getText } from "./get-texts";

AWSConfig.update({ region: "us-east-1" });

const subject = "Test project verification code";

const getSenderParams = (
  recipient: string,
  code: string,
): SendEmailRequest => ({
  Source: appConfig.senderEmail,
  Destination: {
    ToAddresses: [recipient],
  },
  Message: {
    Subject: {
      Data: subject,
      Charset: appConfig.charset,
    },
    Body: {
      Text: {
        Data: getText(code),
        Charset: appConfig.charset,
      },
      Html: {
        Data: getHtml(code),
        Charset: appConfig.charset,
      },
    },
  },
});

export class EmailTransport implements TransportService {
  private sender: SES;
  constructor() {
    this.sender = new SES();
  }

  sendCode = async (email: string, code: string): Promise<void> => {
    const params = getSenderParams(email, code);

    await this.sender.sendEmail(params).promise();
  };
}
