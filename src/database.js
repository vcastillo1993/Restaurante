import mongoose from "mongoose";
import { MONGODB_URI } from "./config";

mongoose.set('strictQuery', false)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  /* useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true */
})
  .then(db => console.log('DB is connected'))
  .catch(error => console.log(error))