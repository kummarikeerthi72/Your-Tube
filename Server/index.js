import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Routes
import authRoutes from "./Routes/auth.js";
import userRoutes from "./Routes/User.js";
import commentRoutes from "./Routes/comment.js";
import videoRoutes from "./Routes/video.js";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize App
const app = express();
dotenv.config();

// Middleware
app.use(cors({
  origin: "https://neon-lily-e0ec63.netlify.app",
  credentials: true
}));

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(bodyParser.json());

// ✅ Serve video files from "uploads" folder
app.get('/uploads/:filename', (req, res) => {
  const filePath = path.resolve(__dirname, 'uploads', req.params.filename);
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = (end - start) + 1;
    const file = fs.createReadStream(filePath, { start, end });

    const head = {
      'Content-Range': `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': fileSize,
      'Content-Type': 'video/mp4',
    };

    res.writeHead(200, head);
    fs.createReadStream(filePath).pipe(res);
  }
});

// Route Middleware
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/comment", commentRoutes);
app.use("/video", videoRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("✅ Server is working!");
});

// MongoDB + Server Start
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.DB_URL)

.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
})
.catch(err => {
  console.error("❌ MongoDB connection failed:", err.message);
});
