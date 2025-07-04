// Server/scripts/registerUploads.js
import mongoose from "mongoose";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import Videofile from "../Models/videofile.js"; // path to your videofile.js

dotenv.config();

mongoose.connect(process.env.DB_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    registerVideos();
  })
  .catch(err => console.log("❌ MongoDB Error:", err));

const uploadsDir = path.resolve("uploads");

async function registerVideos() {
  const files = fs.readdirSync(uploadsDir);

  for (let file of files) {
    const exists = await Videofile.findOne({ filename: file });
    if (exists) {
      console.log(`⏩ Already exists: ${file}`);
      continue;
    }

    const stats = fs.statSync(path.join(uploadsDir, file));
    const sizeMB = (stats.size / (1024 * 1024)).toFixed(2) + "MB";

    const newVideo = new Videofile({
      videotitle: file.split(".")[0],
      filename: file,
      filetype: "video/mp4",
      filepath: `http://localhost:5000/uploads/${file}`,
      filesize: sizeMB,
      videochanel: "Default Channel",
      uploader: "Keerthi"
    });

    await newVideo.save();
    console.log(`✅ Registered: ${file}`);
  }

  mongoose.disconnect();
  console.log("🎉 Finished registering all videos.");
}
