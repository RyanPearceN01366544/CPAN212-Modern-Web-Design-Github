import express from "express";
import upload from "../middleware/multer.js"

const router = express.Router();

router.post("/single", upload.single("file"), (req, res) => {
  console.log("Uploaded File:", req.file);

  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  res.json({
    message: "Image uploaded successfully",
    filePath: `/uploads/${req.file.filename}`,
  });
});

router.post("/multiple", upload.array("files"), (req, res) => {
  console.log("-- Uploaded Files --"); // Little-Mini Console Header.
  console.log(req.files); // Print the files to console.

  if (!req.files) { // Do the files exist? If they don't then...
    return res.status(400).json({ error: "No file uploaded" }); // Send error to client.
  }

  let filePaths = []; // Make an array for the paths.
  for (let x_ = 0; x_ < req.files.length; x_ = x_ + 1) { // Add them one by one by using push.
    filePaths.push(`/uploads/${req.files[x_].filename}`);
  }

  res.json({ // Respond with JSON.
    message: "Image uploaded successfully",
    filePaths: filePaths,
  });
});

export default router;
