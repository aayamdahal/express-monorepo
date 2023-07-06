import { createUser, getUserByEmail } from "db/users";
import express from "express";
import { Request, Response } from "express";
import { authentication, random } from "../helpers";

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

    if (user.authentication.password !== expectedHash) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const salt = random();

    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );

    await user.save();
    res.cookie("auth-cookie", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
    });

    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log(error);
  }
};
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const salt = random();

    const newUser = await createUser({
      email,
      authentication: {
        password: authentication(salt, password),
        salt,
      },
    });

    res.status(200).json({ message: "Registration successful" });
    
  } catch (error) {
    console.log(error);
    throw error;
  }
};
