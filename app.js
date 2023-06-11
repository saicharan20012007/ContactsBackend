const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set CORS headers
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(cors({ origin: '*' })); // Set origin to allow access from all IP addresses


// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://root:VItnk66kqJ8wgVGE@cluster0.cddsedx.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((err) => {
  console.error('Failed to connect to MongoDB Atlas:', err);
});

// Define Contact schema
const contactSchema = new mongoose.Schema({
  name: String,
  designation: String,
  status: String,
  work: String,
  company: String,
  industry: String,
  requirements: String,
  responsibilities: String,
  reference: String,
  remarks: String,
  nextsteps: String,
  date: Date,
  location: String,
  email: String,
  phone: String,
  website: String,
  revenue: String,
});

const Contact = mongoose.model('Contact', contactSchema);

// Fetch all contacts
app.get('/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Insert a new contact
app.post('/contacts', async (req, res) => {
  try {
    const newContact = req.body;
    const contact = await Contact.create(newContact);
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to insert contact' });
  }
});

// Edit a contact
app.put('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const updatedContact = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, updatedContact, { new: true });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// Delete a contact
app.delete('/delcontacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    await Contact.findByIdAndDelete(contactId);
    res.status(200).json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// Update a contact
app.patch('/contacts/:id', async (req, res) => {
  try {
    const contactId = req.params.id;
    const updates = req.body;
    const contact = await Contact.findByIdAndUpdate(contactId, { $set: updates }, { new: true });
    res.status(200).json(contact);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
  });
  
  // Start the server
  const port = 3000;
  app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  });