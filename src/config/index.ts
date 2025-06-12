import { env } from "./env";

export const config = {
  twilio: {
    accountSid: env.TWILIO_ACCOUNT_SID,
    authToken: env.TWILIO_AUTH_TOKEN,
    phoneNumber: env.TWILIO_PHONE_NUMBER,
    whatsappNumber: env.TWILIO_WHATSAPP_NUMBER,
  },
  mongodb: {
    uri: env.MONGODB_URI,
  },
};

export { env } from "./env";
