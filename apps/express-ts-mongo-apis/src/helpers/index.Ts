import crypto from "crypto";

const secret = process.env.SECRET_KEY || "SECRET";

export const authentication = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};

export const random = () => {
  return crypto.randomBytes(16).toString("base64");
};
