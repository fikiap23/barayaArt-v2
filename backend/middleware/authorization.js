import express from "express";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  // Cek apakah request memiliki token JWT
  const token = req.headers["Authorization"].split(" ")[1];
  if (!token) {
    // Jika tidak ada token, tolak permintaan
    return res.status(401).send({ message: "Unauthorized" });
  }

  // Cek apakah token valid
  try {
    // Jika token valid, lanjutkan permintaan
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Jika token tidak valid, tolak permintaan
    return res.status(401).send({ message: "Unauthorized" });
  }
};

export default verifyToken;
