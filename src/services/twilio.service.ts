import twilio from "twilio";
import { config } from "../config";

export class TwilioService {
  private client: twilio.Twilio;
  private fromNumber: string;
  private whatsappNumber: string;

  constructor() {
    // Validate required configuration
    if (!config.twilio.accountSid) throw new Error("TWILIO_ACCOUNT_SID is required");
    if (!config.twilio.authToken) throw new Error("TWILIO_AUTH_TOKEN is required");
    if (!config.twilio.phoneNumber) throw new Error("TWILIO_PHONE_NUMBER is required");
    if (!config.twilio.whatsappNumber) throw new Error("TWILIO_WHATSAPP_NUMBER is required");

    // Initialize Twilio client
    this.client = twilio(config.twilio.accountSid, config.twilio.authToken);
    this.fromNumber = config.twilio.phoneNumber;
    this.whatsappNumber = config.twilio.whatsappNumber;

    // // Log configuration (remove in production)
    // console.log('Twilio configured with:', {
    //   accountSid: config.twilio.accountSid,
    //   phoneNumber: this.fromNumber,
    //   whatsappNumber: this.whatsappNumber
    // });
  }

  async sendSMS(to: string, message: string) {
    try {
      console.log("Attempting to send SMS with config:", {
        to,
        from: this.fromNumber,
        accountSid: config.twilio.accountSid ? "Set" : "Not set",
        authToken: config.twilio.authToken ? "Set" : "Not set",
      });

      if (!this.fromNumber) {
        throw new Error("Twilio phone number not configured");
      }

      const response = await this.client.messages.create({
        body: message,
        to: to,
        from: this.fromNumber,
      });
      return response;
    } catch (error: any) {
      console.error("SMS sending error:", error);
      throw new Error(`Failed to send SMS: ${error.message}`);
    }
  }

  async sendWhatsApp(to: string, message: string) {
    try {
      // For WhatsApp, we need to use the sandbox number during testing
      // The format should be: whatsapp:+14155238886 (Twilio's sandbox number)
      // For production, use your actual WhatsApp Business number

      const response = await this.client.messages.create({
        body: message,
        to: `whatsapp:${to}`,
        from: `whatsapp:${this.whatsappNumber}`,
      });
      return response;
    } catch (error: any) {
      console.error("WhatsApp sending error:", error);
      throw new Error(`Failed to send WhatsApp message: ${error.message}`);
    }
  }
}
