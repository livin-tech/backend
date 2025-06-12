import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  MONGODB_URI: str(),
  TWILIO_ACCOUNT_SID: str(),
  TWILIO_AUTH_TOKEN: str(),
  TWILIO_PHONE_NUMBER: str(),
  TWILIO_WHATSAPP_NUMBER: str(),
});
