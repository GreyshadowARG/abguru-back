import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import nodemailer from "nodemailer";
import express from "express";

const app = express();

// email config
const trasnporter = nodemailer.createTransport({
  host: "mail.aybgurusrewards.com",
  port: 465,
  secure: true,
  auth: {
    user: "recoverpassword@aybgurusrewards.com",
    pass: "RecoverPass123",
  },
});

export const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });

  const foundUser = await User.findOne({ email: email }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);

    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: foundUser.id,
          roles: roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "600s" }
    );
    const refreshToken = jwt.sign(
      { id: foundUser.id },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    // Saving refreshToken with current user
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

export const forgotPassword = async (req, res) => {
  const { id, token } = req.params;

  try {
    const validuser = await User.findOne({ _id: id, token });

    const verifyToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (validuser && verifyToken._id) {
      res.status(201).json({ status: 201, validuser });
    } else {
      res.status(401).json({ status: 401, message: "user not exist" });
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};

export const sendPasswordLink = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(401);
  }

  try {
    const userfind = await User.findOne({ email: email });
    if (userfind === null) {
      
      res.status(450);
    } else {
      const token = jwt.sign(
        { _id: userfind._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "120s",
        }
      );
      const setUserToken = await User.findByIdAndUpdate(
        { _id: userfind._id },
        { refreshToken: token },
        { new: true }
      );

      if (setUserToken) {
        const mailText = 
        `
        Haz click en el siguiente enlace para generar una nueva contraseña
        Este link tiene validez por 2 minutos http://abrururewards.netlify.app/forgotPassword/${userfind.id}/${token}
        `
        const mailOptions = {
          from: "recoverpassword@aybgurusrewards.com",
          to: email,
          subject: "Reseteo de contraseña A&B Guru Rewards",
          text: mailText,
        };
        trasnporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("error", error);
            res
              .status(401)
              .json({ status: 401, message: "el email no fue enviado" });
          } else {
            res
              .status(201)
              .json({ status: 201, message: "Email enviado correctamente." });
          }
        });
      }
    }
  } catch (error) {
    res
      .status(401)
      .json({
        status: 401,
        message: "el email no se encuentra en la base de datos",
      });
  }
};

export const changePassword = async (req, res) => {
  const { id, token } = req.params;

  const { password } = req.body;

  try {
    const validuser = await User.findOne({ _id: id, token });

    if (validuser) {
      const newPassword = await bcrypt.hash(password, 10);

      const setNewUserPass = await User.findByIdAndUpdate(
        { _id: id },
        { password: newPassword }
      );

      setNewUserPass.save();
      res.status(201).json({ status: 201, setNewUserPass });
    } else {
      res.status(401).send("usuario NO valido");

      console.log("no se cambio la contraseña");
    }
  } catch (error) {
    res.status(401).json({ status: 401, error });
  }
};
