import * as express from "express";
import * as cors from 'cors';
import { AppDataSource } from "./data-source";
import UserRoute from "./routes/UserRoute";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", UserRoute);

    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
