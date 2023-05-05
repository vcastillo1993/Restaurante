import dotenv from "dotenv"

dotenv.config()

export const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/restaurante"

export const PORT = process.env.PORT || 3100

export const SECRET = process.env.SECRET

