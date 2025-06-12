import type { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { TwilioService } from "../services/twilio.service";

export class MessageController {
  private twilioService: TwilioService;

  constructor() {
    this.twilioService = new TwilioService();
  }

  sendSMS = async (req: Request, res: Response) => {
    try {
      const { to, message } = req.body;

      const result = await this.twilioService.sendSMS(to, message);

      res.status(StatusCodes.OK).json({
        success: true,
        messageId: result.sid,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message,
      });
    }
  };

  sendWhatsApp = async (req: Request, res: Response) => {
    try {
      const { to, message } = req.body;

      const result = await this.twilioService.sendWhatsApp(to, message);

      res.status(StatusCodes.OK).json({
        success: true,
        messageId: result.sid,
      });
    } catch (error: any) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message,
      });
    }
  };
}
