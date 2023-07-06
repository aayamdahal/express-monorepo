import express from "express";

import { getAllUsers, deleteUsers, updateUsers } from "../controllers/users";

export default (router: express.Router): void => {
  router.get("/users", getAllUsers);
  router.delete("/users/:id", deleteUsers);
  router.put("/users/:id", updateUsers);
};
