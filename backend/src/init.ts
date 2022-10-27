import * as express from "express";
import * as cors from "cors";

const app = express();

// Middleware
app.use(express.json());
const corsOptions = {
	origin: ["http://localhost:8080", "http://127.0.0.1:8080"],
};
app.use(cors(corsOptions));
const port = process.env.PORT || 3000
export { app };
