import dotenv from "dotenv";
import { app } from "./expresso";

dotenv.config();
const port: number = Number(process.env.PORT) || 3000;

app.listen(port, () => console.log(`Server is listening on port ${port}`));
