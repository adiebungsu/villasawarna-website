const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.43.151:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

app.use(bodyParser.json());

// Konfigurasi email transporter dengan SMTP hosting
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false // Hanya gunakan ini di development
  }
});

// Fungsi untuk menyimpan data ke file JSON
async function savePartnershipData(data) {
  const filePath = path.join(__dirname, 'data', 'partnerships.json');
  try {
    // Buat direktori jika belum ada
    await fs.mkdir(path.join(__dirname, 'data'), { recursive: true });
    
    // Baca data yang ada
    let existingData = [];
    try {
      const fileContent = await fs.readFile(filePath, 'utf8');
      existingData = JSON.parse(fileContent);
    } catch (error) {
      // File belum ada atau kosong
    }

    // Tambah data baru
    const newData = {
      id: Date.now().toString(),
      ...data,
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    existingData.push(newData);

    // Simpan kembali ke file
    await fs.writeFile(filePath, JSON.stringify(existingData, null, 2));
    return newData;
  } catch (error) {
    console.error('Error saving partnership data:', error);
    throw error;
  }
}

// Endpoint untuk mendaftar partnership
app.post('/api/partnership/register', async (req, res) => {
  try {
    const { name, email, phone, propertyType, propertyLocation, propertyDetails } = req.body;
    
    // Validasi input
    if (!name || !email || !phone || !propertyType || !propertyLocation) {
      return res.status(400).json({ 
        message: 'Semua field wajib diisi kecuali pesan tambahan' 
      });
    }

    // Validasi format email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: 'Format email tidak valid'
      });
    }

    // Validasi format nomor telepon
    const phoneRegex = /^[0-9+\-\s()]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({
        message: 'Format nomor telepon tidak valid'
      });
    }

    // Simpan data
    const savedData = await savePartnershipData({
      name,
      email,
      phone,
      propertyType,
      propertyLocation,
      propertyDetails
    });

    // Kirim email notifikasi ke admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
        subject: 'Pendaftaran Partnership Baru',
        html: `
          <h2>Pendaftaran Partnership Baru</h2>
          <p><strong>Nama:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Telepon:</strong> ${phone}</p>
          <p><strong>Tipe Properti:</strong> ${propertyType}</p>
          <p><strong>Lokasi:</strong> ${propertyLocation}</p>
          <p><strong>Detail Tambahan:</strong> ${propertyDetails || '-'}</p>
        `
      });
    }

    res.status(200).json({ 
      message: 'Pendaftaran berhasil dikirim. Tim kami akan segera menghubungi Anda.',
      data: savedData
    });
  } catch (error) {
    console.error('Error processing partnership registration:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat memproses pendaftaran. Silakan coba lagi nanti.' 
    });
  }
});

// Endpoint untuk mendapatkan semua pendaftaran (admin only)
app.get('/api/partnership/registrations', async (req, res) => {
  try {
    const filePath = path.join(__dirname, 'data', 'partnerships.json');
    const fileContent = await fs.readFile(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching partnership registrations:', error);
    res.status(500).json({ 
      message: 'Terjadi kesalahan saat mengambil data pendaftaran.' 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Partnership server running on port ${port}`);
});