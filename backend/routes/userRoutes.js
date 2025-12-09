import express from "express";
import { getAllUsers, loginUser, registerUser, registerUserDirect, verifyOtp, resendOtp, getProfile, updateProfile, changePassword, sendUpgradeOtp, verifyUpgradeOtp, forgotPassword, resetPassword, toggleBlockUser, exportUsersPDF, exportUsersCSV, exportOwnersPDF, exportOwnersCSV } from "../controllers/userController.js";
import multer from "multer";
import { addProperty, getOwnersWithProjects } from "../controllers/propertyController.js";
import { authMiddleware } from "../middleware/authUser.js";
import { upload } from "../middleware/upload.js";
import {protectAdmin} from "../middleware/authAdmin.js"
const router = express.Router();

// 🖼️ Multer config for local storage (legacy)
const localStorage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const localUpload = multer({ storage: localStorage });

// ✅ Auth Routes
router.post("/register", registerUser);           // Owner registration (with OTP)
router.post("/register-direct", registerUserDirect); // Buyer registration (no OTP)
router.post("/verify-otp", verifyOtp);
router.post("/resend-otp", resendOtp);
router.post("/login", loginUser);

// ✅ Password Reset Routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

// ✅ Upgrade Routes (Buyer to Owner)
router.post("/send-upgrade-otp", authMiddleware, sendUpgradeOtp);
router.post("/verify-upgrade-otp", authMiddleware, verifyUpgradeOtp);

// ✅ Profile Routes (Protected)
router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, upload.single("profileImage"), updateProfile);
router.put("/change-password", authMiddleware, changePassword);

// ✅ Property Route
router.post("/add-property", authMiddleware, localUpload.array("images", 10), addProperty);

// ✅ Admin Routes
router.get("/list", protectAdmin, getAllUsers);
router.put("/block/:id", protectAdmin, toggleBlockUser);
router.get("/owners-projects", protectAdmin, getOwnersWithProjects);
router.get("/export-csv", protectAdmin, exportUsersCSV);
router.get("/export-pdf", protectAdmin, exportUsersPDF);
// ✅ NEW: Owner Export Routes
router.get("/export-owners-csv", protectAdmin, exportOwnersCSV);
router.get("/export-owners-pdf", protectAdmin, exportOwnersPDF);
export default router;
