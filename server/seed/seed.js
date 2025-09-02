// src/seed/seed.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

import Campaign from "../models/Campaign.js";
import Donor from "../models/Donor.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
  console.error("MONGO_URI missing in .env");
  process.exit(1);
}

async function run() {
  await mongoose.connect(MONGO_URI);
  console.log("✅ Connected for seeding");

  // Bersihkan koleksi (hindari di production)
  await Promise.all([
    Campaign.deleteMany({}),
    Donor.deleteMany({}),
    Transaction.deleteMany({}),
    User.deleteMany({})
  ]);

  // ====== Pre-generate ObjectIds untuk menjaga referensi dari legacyId ======
  const id = () => new mongoose.Types.ObjectId();

  // Map legacy IDs (dari SQL) -> ObjectId baru
  const campaignIdMap = new Map([
    [1, id()], [2, id()], [3, id()], [4, id()], [5, id()], [6, id()]
  ]);
  const userIdMap = new Map([
    [1, id()], [2, id()], [3, id()], [4, id()], [5, id()]
  ]);

  // ====== Campaigns (mapping dari tabel campaigns) ======
  const campaigns = [
    {
      _id: campaignIdMap.get(1),
      title: "Bantu Korban Banjir Jakarta",
      shortDescription: "Penggalangan dana untuk membantu korban banjir di Jakarta dengan menyediakan makanan, pakaian, dan tempat tinggal sementara.",
      description:
        "Banjir besar melanda beberapa wilayah Jakarta pada awal April 2025, ... Program pemulihan psikologis untuk anak-anak",
      targetAmount: 50000000,
      amountRaised: 15000000,
      deadline: new Date("2025-05-30"),
      image: "banjir.jpg",
      createdAt: new Date("2025-04-20T10:00:00"),
      category: "sosial"
    },
    {
      _id: campaignIdMap.get(2),
      title: "Pembangunan Sekolah di Pedesaan",
      shortDescription: "Membangun sekolah dasar di daerah terpencil untuk memberikan akses pendidikan yang layak bagi anak-anak.",
      description:
        "Proyek ini bertujuan membangun sekolah dasar ... melayani 120 anak dari 3 dusun terdekat.",
      targetAmount: 75000000,
      amountRaised: 500000,
      deadline: new Date("2025-06-15"),
      image: "sekolah.jpg",
      createdAt: new Date("2025-04-18T14:30:00"),
      category: "pendidikan"
    },
    {
      _id: campaignIdMap.get(3),
      title: "Bantuan Medis untuk Lansia",
      shortDescription: "Menyediakan layanan kesehatan gratis dan obat-obatan untuk lansia yang tidak mampu.",
      description:
        "Program ini menyediakan layanan kesehatan komprehensif ... membantu 500 lansia selama 6 bulan.",
      targetAmount: 30000000,
      amountRaised: 500000,
      deadline: new Date("2025-05-20"),
      image: "lansia.jpg",
      createdAt: new Date("2025-04-15T09:15:00"),
      category: "sosial"
    },
    {
      _id: campaignIdMap.get(4),
      title: "Penghijauan Kota",
      shortDescription: "Program penanaman 1000 pohon di area perkotaan untuk mengurangi polusi udara.",
      description:
        "Inisiatif penghijauan ini akan dilakukan di 5 titik ... melibatkan 200 relawan.",
      targetAmount: 25000000,
      amountRaised: 500000,
      deadline: new Date("2025-07-10"),
      image: "penghijauan.jpg",
      createdAt: new Date("2025-04-10T11:45:00"),
      category: "lingkungan"
    },
    {
      _id: campaignIdMap.get(5),
      title: "Bantuan Hewan Terlantar",
      shortDescription: "Menyelamatkan dan merawat hewan-hewan terlantar di jalanan.",
      description:
        "Program ini fokus pada rescue, sterilisasi, vaksinasi, perawatan, dan adopsi.",
      targetAmount: 15000000,
      amountRaised: 500000,
      deadline: new Date("2025-05-05"),
      image: "hewan.jpg",
      createdAt: new Date("2025-04-05T16:20:00"),
      category: null
    },
    {
      _id: campaignIdMap.get(6),
      title: "Donasi Kucing",
      shortDescription: "Donasi untuk kucing jalanan",
      description:
        "Program khusus untuk kucing jalanan: sterilisasi, vaksinasi, pengobatan, feeding point, foster care.",
      targetAmount: 1000000,
      amountRaised: 500000,
      deadline: new Date("2025-10-10"),
      image: "1745508790_d6ce12d789e8e80cda4a.jpg",
      createdAt: new Date("2025-04-24T00:00:00"),
      category: "sosial"
    }
  ];

  // ====== Users (hash password) ======
  const hash = async (plain) => bcrypt.hash(plain, 10);
  const users = [
    {
      _id: userIdMap.get(1),
      name: "admin",
      email: "admin@gmail.com",
      passwordHash: await hash("admin123"),
      role: "admin",
      avatar: "user.jpg"
    },
    {
      _id: userIdMap.get(2),
      name: "Arifin",
      email: "arifin@gmail.com",
      passwordHash: await hash("arifin123"),
      role: "user",
      avatar: "1748770615_696196adf0caad4af5fb.jpg"
    },
    {
      _id: userIdMap.get(3),
      name: "Jane Smith",
      email: "jane@example.com",
      passwordHash: await hash("jane123"),
      role: "user",
      avatar: "user.jpg"
    },
    {
      _id: userIdMap.get(4),
      name: "Michael Johnson",
      email: "michael@example.com",
      passwordHash: await hash("michael123"),
      role: "user",
      avatar: "user.jpg"
    },
    {
      _id: userIdMap.get(5),
      name: "Sarah Williams wkwk",
      email: "sarah@example.com",
      passwordHash: await hash("sarah123"),
      role: "user",
      avatar: "user.jpg"
    }
  ];

  // ====== Donors (skip record yang campaignId = 0 / kosong) ======
  const mapStatus = (s) =>
    s === "Sukses" ? "SUCCESS" : s === "Gagal" ? "FAILED" : "PENDING";

  const donorsRaw = [
    // { legacyId: 1, orderId: "DONASI-68479b560a067", campaignLegacyId: 0, name: "", email: "", message: null, amount: 1000, status: "Menunggu", createdAt: "2025-06-10 09:41:26" }, // INVALID
    { legacyId: 2, orderId: "DONASI-684a316708df7", campaignLegacyId: 2, name: "Ilham", email: "ilham@example.com", message: "test", amount: 100000, status: "Menunggu", createdAt: "2025-06-12 08:46:15" },
    { legacyId: 3, orderId: "DONASI-684a3acfdeca9", campaignLegacyId: 2, name: "p", email: "p@gmail.com", message: "p", amount: 10000000, status: "Menunggu", createdAt: "2025-06-12 09:26:24" },
    { legacyId: 4, orderId: "DONASI-6853b68f48a26", campaignLegacyId: 2, name: "Aripin", email: "maripin@gmail.com", message: "semoga membantu", amount: 10000000, status: "Menunggu", createdAt: "2025-06-19 14:04:47" },
    { legacyId: 5, orderId: "DONASI-6853b929d5e6c", campaignLegacyId: 2, name: "a", email: "arifin@gmail.com", message: "s", amount: 100000000, status: "Menunggu", createdAt: "2025-06-19 14:15:53" }
  ];

  const donors = donorsRaw
    .filter(d => d.campaignLegacyId && campaignIdMap.get(d.campaignLegacyId))
    .map(d => ({
      orderId: d.orderId,
      campaignId: campaignIdMap.get(d.campaignLegacyId),
      name: d.name || "",
      email: d.email || "",
      message: d.message || "",
      amount: d.amount,
      status: mapStatus(d.status),
      createdAt: new Date(d.createdAt)
    }));

  // ====== Transactions (mapping user & campaign) ======
  const txRaw = [
    { legacyId: 1, campaignLegacyId: 1, userLegacyId: 2, amount: 500000, message: "Semoga bermanfaat untuk korban banjir", createdAt: "2025-04-21 01:30:00" },
    { legacyId: 2, campaignLegacyId: 1, userLegacyId: 3, amount: 750000, message: "Semoga cepat pulih ya", createdAt: "2025-04-21 03:15:00" },
    { legacyId: 3, campaignLegacyId: 2, userLegacyId: 4, amount: 1000000, message: "Pendidikan adalah hak semua anak", createdAt: "2025-04-19 07:00:00" },
    { legacyId: 4, campaignLegacyId: 3, userLegacyId: 5, amount: 300000, message: "Semoga lansia bisa lebih sehat", createdAt: "2025-04-16 04:20:00" },
    { legacyId: 5, campaignLegacyId: 5, userLegacyId: 2, amount: 250000, message: "Sayangi hewan-hewan terlantar", createdAt: "2025-04-06 02:45:00" },
    { legacyId: 6, campaignLegacyId: 2, userLegacyId: 2, amount: 1000000, message: "semoga membantu", createdAt: null },
    { legacyId: 7, campaignLegacyId: 2, userLegacyId: 2, amount: 1000000, message: "Semoga membantu!", createdAt: "2025-06-04 00:41:33" },
    { legacyId: 8, campaignLegacyId: 2, userLegacyId: 2, amount: 10000000, message: "Semangat!", createdAt: "2025-06-06 17:18:22" },
    { legacyId: 9, campaignLegacyId: 1, userLegacyId: 2, amount: 10000000, message: "sem", createdAt: "2025-06-08 08:58:32" }
  ];

  const transactions = txRaw.map(t => ({
    campaign: campaignIdMap.get(t.campaignLegacyId),
    user: userIdMap.get(t.userLegacyId),
    amount: t.amount,
    message: t.message || "",
    createdAt: t.createdAt ? new Date(t.createdAt) : new Date()
  }));

  // ====== Insert ke DB ======
  await Campaign.insertMany(campaigns);
  await User.insertMany(users);
  await Donor.insertMany(donors);
  await Transaction.insertMany(transactions);

  console.log("🌱 Seed done!");
  await mongoose.disconnect();
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
