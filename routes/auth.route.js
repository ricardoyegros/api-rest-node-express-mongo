import express from "express";
import { body } from "express-validator";
import { login } from "../controllers/auth.controller.js";
import { register } from "../controllers/auth.controller.js";
import {validationMiddleware} from "../middlewares/validation.middleware.js"
const router = express.Router();
router.post(
  "/login",
  [
    body("email", "Formato de email no valido")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "El password debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 }),
  ],
  validationMiddleware,
  login
);
router.post(
  "/register",
  [
    body("email", "Formato de email no valido")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "El password debe tener al menos 6 caracteres")
      .trim()
      .isLength({ min: 6 }),
    body("password", "Formato de contraseña incorrecta").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No coinciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationMiddleware,
  register
);

export default router;
