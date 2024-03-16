import jwt from "jsonwebtoken";

export const createActivationToken = (payload) => {
  return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "2d",
  });
};

export const verifyActivationToken = (payload) => {
  try {
    const decoded = jwt.verify(payload, process.env.ACTIVATION_TOKEN_SECRET);
    console.log("Decoded token:", decoded);
    return decoded;
  } catch (error) {
    console.error("Error verifying activation token:", error);
    throw new Error("Invalid activation token");
  }
};

export const createResetToken = (payload) => {
  return jwt.sign(payload, process.env.RESET_TOKEN_SECRET, {
    expiresIn: "6h",
  });
};
