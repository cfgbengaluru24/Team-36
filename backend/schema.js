import { Decimal128 } from 'mongodb';
import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define Patient schema
const personalDataSchema = new Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  locality: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  parentName: { type: String, required: false },
  attendingDoc: { type: Number, required: true },
});

const medicalHistorySchema = new Schema({
  knownAllergies: { type: [String], required: false },
  medications: { type: [String], required: false },
  pastTreatments: { type: [String], required: false },
});

const dentalDataSchema = new Schema({
  plaqueIndex: { type: Number, required: true },
  gingivalIndex: { type: Number, required: true },
  caries: { type: String, required: true },
  missingTeeth: { type: String, required: true },
  gumCondition: { type: String, required: false },
});

const anemiaDataSchema = new Schema({
  rbcCount:{type : Decimal128, required : true},
  hemogolbin:{type : Number, required : true},
  ironLevel:{type : Number, required : true},
  ferritinLeevl:{type : Number, required : true}
});

const patientSchema = new Schema({
  personalData: personalDataSchema,
  medicalHistory: medicalHistorySchema,
  dentalData: dentalDataSchema,
  anemiaData: anemiaDataSchema,
  docsComments: { type: String, required: false },
  followupVisit: { type: Number, required: true },
  pictures: { type: [String], required: true }
});

const Patient = mongoose.model('Patient', patientSchema);

// Define Doctor schema
const doctorSchema = new Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  locality: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  specialization: { type: String, required: true },
  yearsOfExperience: { type: Number, required: true },
  clinicAddress: { type: String, required: false },
  patients: [{ type: Schema.Types.ObjectId, ref: 'Patient' }],  // Array of Patient references
});

const Doctor = mongoose.model('Doctor', doctorSchema);

// Define Coordinator schema
const coordinatorSchema = new Schema({
  fullname: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  locality: { type: String, required: true },
  phoneNumber: { type: String, required: true }
});

const Coordinator = mongoose.model('Coordinator', coordinatorSchema);

export { Patient, Doctor, Coordinator };