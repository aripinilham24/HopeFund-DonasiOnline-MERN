import express from "express";
import router from "./routes/campaignRoutes";

const app = express();
app.use(express.json());

app.use("/campaigns", router);

app.listen(5000, () => console.log("server running on port 5000"));
