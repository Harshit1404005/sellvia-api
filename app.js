import express from 'express'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
import healthRoutes from "./routes/health.routes.js";
import otpRoutes from "./routes/otp.routes.js";
import userRoutes from "./routes/users.routes.js";
import productRoutes from "./routes/products.routes.js";

app.use("/", healthRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err.stack);
    res.status(500).json({
        error: 'Internal Server Error',
        message: err.message
    });
});

export default app;