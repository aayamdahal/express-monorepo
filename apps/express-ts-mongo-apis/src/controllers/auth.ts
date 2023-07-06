import { getUserByEmail } from "db/users";
import express from "express";
import { Request, Response } from "express";
import { authentication } from "../helpers";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = (await getUserByEmail(email).select(
      "authentication.salt authentication.password"
    )) as any;

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const expectedHash = authentication(user?.authentication?.salt, password);
     
    
    } catch (error) {
    console.log(error);
  }
};
export const register = async () => {};
