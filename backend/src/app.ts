import "dotenv/config"
import 'reflect-metadata';
import express from "express"
import helmet from "helmet";
import rateLimit from "express-rate-limit"
import slowDown from "express-slow-down";
import cors from "cors";
import { SwaggerUiOptions, serve, setup } from 'swagger-ui-express';
import * as swaggerDocument from "./swagger.json";
import { AccountRouter } from "./routes/accounts";
import { TransactionRouter } from "./routes/transactions";

const PORT = process.env.PORT ?? 3002;
export const app = express();

//security
app.use(helmet());
app.disable('x-powered-by');

const corsOption = {
    credentials: true,
    optionsSuccessStatus: 200,
    methods: "POST",
    origin: ['http://localhost:3000','http://localhost:3001','http://localhost:3003']
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

/**
 * @description
 * This function returns an object with the
 * options to render the Swagger Spec.
 * @returns SwaggerUiOptions
 */
const swaggerOptions = (): SwaggerUiOptions => {
    return {
        explorer: false,
        swaggerOptions: {
            validatorUrl: "https://validator.swagger.io/validator"
        }
    };
};

app.use("/api-docs/public/", serve, setup(swaggerDocument, swaggerOptions()));

//routes
app.use(AccountRouter);
app.use(TransactionRouter);

//initialize
console.clear();
app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
})
