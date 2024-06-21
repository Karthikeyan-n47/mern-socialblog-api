const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const categoryRouter = require("./routes/categories");
const cookieParser = require("cookie-parser");
const AppError = require("./utils/AppError");
const globalErrorHandler = require("./controllers/errorController");
const commentRouter = require("./routes/comments");
const PORT = process.env.PORT_NUMBER || 8800;
// const multer = require("multer");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Database connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// function setCorsHeaders(req, res, next) {
//   res.setHeader(
//     "Access-Control-Allow-Origin",
//     "https://mern-socialblog.vercel.app"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// }

app.use(
  cors({
    origin: [
      "https://mern-socialblog.vercel.app",
      "https://mern-socialblog-git-main-karthiks-projects-1beb4d05.vercel.app/",
      "https://mern-socialblog-karthiks-projects-1beb4d05.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    optionSuccessStatus: 200,
  })
);
// app.use(setCorsHeaders);
// app.use(function (req, res, next) {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://mern-socialblog.vercel.app"
//   );
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/category", categoryRouter);
app.use("/api/comments", commentRouter);

app.use("*", (req, res, next) => {
  next(
    new AppError(
      `Could not find the url: ${req.originalUrl} on this server!`,
      404
    )
  );
});

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running successfully!");
});
