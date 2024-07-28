import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; // Import the cors package
import { Patient, Doctor, Coordinator } from './schema.js'; // Import all models from a single schema file
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
const port = 3001;

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Adjust according to your frontend URL
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization, X-File-Data' // Allow your custom header here
}));


app.use(bodyParser.json({ limit: '50mb' })); // Increase the payload limit to handle large base64 encoded images

const uri = process.env.REACT_APP_MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// POST route to add a patient
app.post('/api/addPatient', async (req, res) => {
  const data = req.body;
  console.log(data);

  try {
    const newPatient = new Patient(data);
    const savedPatient = await newPatient.save();
    res.status(200).json({ message: 'Data inserted successfully', patient: savedPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error inserting data', error: err });
  }
});

// GET route to retrieve patient details by ID
app.get('/api/getPatient/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patient data', error: err });
  }
});

// GET route to retrieve all patients' names, locations, and MongoDB IDs
app.get('/api/getAllPatients', async (req, res) => {
  try {
    const patients = await Patient.find({}, 'personalData.fullname personalData.locality _id');
    res.status(200).json(patients);
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving patients data', error: err });
  }
});

// POST route to login Doctor (simplified)
app.post('/api/loginDoctor', async (req, res) => {
  const { email, password } = req.body;

  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor || !(await bcrypt.compare(password, doctor.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// POST route to login Coordinator (simplified)
app.post('/api/loginCoordinator', async (req, res) => {
  const { email, password } = req.body;

  try {
    const coordinator = await Coordinator.findOne({ email });
    if (!coordinator || !(await bcrypt.compare(password, coordinator.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    res.status(200).json({ message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Error logging in', error: err });
  }
});

// POST route to add an image to the pictures field of a patient
app.post('/api/addPatientImage/:id', async (req, res) => {
  const { id } = req.params;
  const { image } = req.body; // image should be a base64 encoded string

  try {
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Add the image to the pictures array
    patient.pictures.push(image);
    const updatedPatient = await patient.save();

    res.status(200).json({ message: 'Image added successfully', patient: updatedPatient });
  } catch (err) {
    res.status(500).json({ message: 'Error adding image', error: err });
  }
});

app.post('/upload-images', async (req, res) => {
  const { id, images } = req.body;

  if (!id || !images || !Array.isArray(images)) {
    return res.status(400).json({ error: 'ID and images array are required' });
  }

  try {
    // Find the patient by ID
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    // Append new images to existing ones
    patient.pictures = [...patient.pictures, ...images];

    // Update only the pictures field if no other fields are provided
    const updateData = { pictures: patient.pictures };
    
    // Update the patient document
    await Patient.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({ message: 'Images uploaded and stored successfully' });
  } catch (error) {
    console.error('Error saving images:', error);
    res.status(500).json({ error: 'An error occurred while saving images' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
