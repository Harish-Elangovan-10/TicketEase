import toast from "svelte-french-toast";
import { db } from "../firebase";
import { collection, setDoc, doc, getDoc, deleteDoc } from "firebase/firestore"; 

export const sendOTP = async (email: string, name: string) => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    await setDoc(doc(db, "otps", email), {
        otp,
        createdAt: Date.now(),
    }, { merge: true });

    const response = await fetch("/api/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, name }),
    });

    const result = await response.json();

    if (result.success) {
        toast.success('OTP sent successfully!', {
            duration: 5000,
            style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        });
    } else {
        toast.error('Failed to send OTP', {
            duration: 5000,
            style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        });
    }
};


export const verifyOTP = async (email: string, otp: string) => {
    const otpRef = doc(db, "otps", email);
    const otpSnap = await getDoc(otpRef);

    if (!otpSnap.exists()) {
        toast.error('Invalid or expired OTP', {
            duration: 5000,
            style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        });
        throw new Error('Invalid or expired OTP');
    }

    const { otp: storedOTP, createdAt } = otpSnap.data();
    const expiryTime = 5 * 60 * 1000;

    if (Date.now() - createdAt > expiryTime) {
        await deleteDoc(otpRef);
        toast.error('OTP has expired', {
            duration: 5000,
            style: 'border-radius: 10px; background: #222; color: #fff; padding-left: 15px; border: 2px solid #333; margin-top: 20px;',
        });
        throw new Error("OTP has expired");
    }

    if (storedOTP === otp) {
        await deleteDoc(otpRef);
        return { success: true, message: "OTP verified successfully" };
    }

    throw new Error("Invalid OTP");
};