import "dotenv/config"
import 'reflect-metadata';
import express from "express"
import helmet from "helmet";
import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down";
import cors from "cors";
import { AccountRouter } from "./routes/accounts";
import { TransactionRouter } from "./routes/transactions";

const PORT = process.env.PORT ?? 3001;
export const app = express();

//security
app.use(helmet());
app.disable('x-powered-by');

const corsOption = {
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "GET,POST",
    origin: ['http://localhost:3001', 'http://localhost:80']
}
app.use(cors(corsOption));

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})
app.use(limiter)

const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 10, // Allow only one request to go at full-speed.
    delayMs: (hits) => hits * 100 // Add 100 ms of delay to every request after the 11th one.
});
app.use(speedLimiter);

//bodyparser
app.use(express.json());

//routes
app.use(AccountRouter);
app.use(TransactionRouter);

//initialize
console.clear();
app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
})
