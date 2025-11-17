import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// ========================
// REGISTER (LOCAL)
// ========================
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validasi sederhana
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Semua field wajib diisi." });
    }

    // Cek email sudah ada atau belum
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email sudah terdaftar." });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Simpan user
    const user = await User.create({
      name,
      email,
      passwordHash,
      provider: "local"
    });

    const token = generateToken(user);

    res.status(201).json({
      message: "Registrasi berhasil.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


// ========================
// LOGIN (LOCAL)
// ========================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Cek input
    if (!email || !password) {
      return res.status(400).json({ message: "Email dan password wajib diisi." });
    }

    const user = await User.findOne({ email });

    // Tidak ditemukan
    if (!user) {
      return res.status(404).json({ message: "Email tidak ditemukan." });
    }

    // Cek provider
    if (user.provider === "google") {
      return res.status(400).json({
        message: "Akun ini menggunakan Google Sign-In. Gunakan login Google."
      });
    }

    // Cek password
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah." });
    }

    const token = generateToken(user);

    res.json({
      message: "Login berhasil.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


// ========================
// GOOGLE LOGIN
// ========================
export const googleAuth = async (req, res) => {
  try {
    const { googleId, name, email, avatar } = req.body;

    if (!googleId || !email) {
      return res.status(400).json({ message: "Google ID dan email diperlukan." });
    }

    // Apakah user sudah pernah login Google?
    let user = await User.findOne({ email });

    if (!user) {
      // Daftarkan user baru melalui Google
      user = await User.create({
        name,
        email,
        googleId,
        avatar,
        provider: "google",
        passwordHash: "google-oauth-no-password"
      });
    }

    const token = generateToken(user);

    res.json({
      message: "Login Google berhasil.",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar
      }
    });

  } catch (error) {
    console.error("GOOGLE AUTH ERROR:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};


// ========================
// GET USER PROFILE (PROTECTED)
// ========================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");

    res.json({ user });
  } catch (error) {
    console.error("PROFILE ERROR:", error);
    res.status(500).json({ message: "Terjadi kesalahan server." });
  }
};
