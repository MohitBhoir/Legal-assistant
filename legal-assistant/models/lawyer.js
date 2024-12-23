import mongoose, { Schema } from "mongoose";

const lawyerSchema = new Schema({
  index: Number,
  name : String,
  addresss : String,
  contact : String,
  email : String,
  practice_area : String
});

const Lawyer = mongoose.models.Lawyer || mongoose.model("Lawyer", lawyerSchema);

export default Lawyer;
