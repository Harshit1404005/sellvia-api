import express from 'express'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
import healthRoutes from "./routes/health.routes.js";

app.use("/",healthRoutes);

export default app;