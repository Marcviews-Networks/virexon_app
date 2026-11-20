import { Cashfree } from "cashfree-pg";
import { CFEnvironment } from "cashfree-pg/dist/configuration.js";

const clientId = process.env.CASHFREE_CLIENT_ID;
const clientSecret = process.env.CASHFREE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
  throw new Error("Cashfree credentials are missing from backend .env");
}

const environment: CFEnvironment =
  process.env.CASHFREE_ENV === "PRODUCTION"
    ? CFEnvironment.PRODUCTION
    : CFEnvironment.SANDBOX;

export const cashfree = new Cashfree(
  environment,
  clientId,
  clientSecret
);