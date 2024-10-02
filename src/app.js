import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"; // Import routes at the top

const app = express();

// CORS setup - ensure process.env.CORS_ORIGIN is set correctly
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// Limit incoming request payloads to 16kb
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the 'public' folder
app.use(express.static("public"));

// Parse cookies in incoming requests
app.use(cookieParser());

// Routes declaration
app.get('/',(req, res) => {
  res.send("Test route hit");
});
app.use("/api/v1/users", userRouter);

export { app };
