import { User } from "@/payload-types";
import { PayloadRequest } from "payload";

export const generateSetPasswordEmailHTML = (args?: { req?: PayloadRequest; token?: string; user?: User }) => {
  return `
  <h1>Welcome to Treasurenft!</h1>
  <p>This is Password reset page:</p>
  <a href="${process.env.NEXT_PUBLIC_SERVER_URL}/reset-password?token=${args?.token}">Set Your Password</a>
  `;
};

export const generateSetPasswordEmailSubject = () => {
  return "Set Your Password";
};
