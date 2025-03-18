import { writable } from "svelte/store";
import { auth, db } from "../firebase";
import { 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    updateProfile,
    setPersistence,
    browserLocalPersistence,
    browserSessionPersistence,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import type { UserProfile } from "./types";

export const user = writable<UserProfile | null>(null);
const googleProvider = new GoogleAuthProvider();

auth.onAuthStateChanged(async (firebaseUser) => {
    if(firebaseUser) {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userDoc = await getDoc(userRef);

        let userData: UserProfile;
        if(userDoc.exists()) {
            userData = userDoc.data() as UserProfile;
        } else {
            userData = {
                uid: firebaseUser.uid,
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                firstName: firebaseUser.displayName?.split(" ")[0] || "",
                lastName: firebaseUser.displayName?.split(" ").slice(1).join(" ") || "",
                mobile: "",
                address: { line1: "", line2: "", city: "", state: "", pincode: "" },
                tickets: [],
            };
            await setDoc(userRef, userData);
        }

        user.set(userData);
    } else {
        user.set(null);
    }
});

export const signUp = async (email: string, password: string, firstname: string, lastname: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        await updateProfile(newUser, {
            displayName: `${firstname} ${lastname}`
        });

        const userRef = doc(db, "users", newUser.uid);
        const userProfile: UserProfile = {
            uid: newUser.uid,
            email: newUser.email,
            displayName: newUser.displayName,
            firstName: firstname,
            lastName: lastname,
            mobile: "",
            address: { line1: "", line2: "", city: "", state: "", pincode: "" },
            tickets: [],
        };
        await setDoc(userRef, userProfile);
        user.set(userProfile);

        return { success: true, user: newUser };
    } catch (error: any) {
        console.error("Error during sign-up:", error.message);
        return { success: false, message: error.message };
    }
};

export const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const loggedInUser = userCredential.user;

        const userRef = doc(db, "users", loggedInUser.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            user.set(userDoc.data() as UserProfile);
        } else {
            const newUserProfile: UserProfile = {
                uid: loggedInUser.uid,
                email: loggedInUser.email,
                displayName: loggedInUser.displayName,
                firstName: loggedInUser.displayName?.split(" ")[0] || "",
                lastName: loggedInUser.displayName?.split(" ").slice(1).join(" ") || "",
                mobile: "",
                address: { line1: "", line2: "", city: "", state: "", pincode: "" },
                tickets: [],
            };

            await setDoc(userRef, newUserProfile);
            user.set(newUserProfile);
        }

        return { success: true, user: loggedInUser };
    } catch (error: any) {
        console.error("Login failed:", error.message);
        return { success: false, message: error.message };
    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const googleUser = result.user;

        const userRef = doc(db, "users", googleUser.uid);
        let userData: UserProfile;

        const userDoc = await getDoc(userRef);
        if (!userDoc.exists()) {
            userData = {
                uid: googleUser.uid,
                email: googleUser.email,
                displayName: googleUser.displayName,
                firstName: googleUser.displayName?.split(" ")[0] || "",
                lastName: googleUser.displayName?.split(" ").slice(1).join(" ") || "",
                mobile: "",
                address: { line1: "", line2: "", city: "", state: "", pincode: "" },
                tickets: [],
            };

            await setDoc(userRef, userData);
        } else {
            userData = userDoc.data() as UserProfile;
        }

        user.set(userData);

        return { success: true, user: googleUser };
    } catch (error: any) {
        console.error("Google sign-in failed:", error.message);
        return { success: false, message: error.message };
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { success: true, message: "Password reset email sent" };
    } catch (error: any) {
        console.error("Error sending password reset email:", error.message);
        return { success: false, message: error.message };
    }
};

export const changePassword = async (currentPass: string, newPass: string) => {
    const user = auth.currentUser;
    if(!user || !user.email) {
        return { success: false, message: "No user is currently signed in" }
    }

    try {
        const credential = EmailAuthProvider.credential(user.email, currentPass);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPass);
        return { success:true, message: "Password updated successfully" }
    } catch (error: any) {
        console.error("Check your current password:", error.message);
        return { success: false, message: "Check your current password" };
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
        user.set(null);
        return { success: true };
    } catch (error: any) {
        console.error("Sign-out failed:", error.message);
        return { success: false, message: error.message };
    }
};

export const updateUserProfile = async (userProfile: UserProfile) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
        return { success: false, message: "No user is currently signed in." };
    }

    try {
        await updateProfile(currentUser, {
            displayName: `${userProfile.firstName} ${userProfile.lastName}`,
        });

        const userRef = doc(db, "users", currentUser.uid);
        const updatedUserProfile: UserProfile = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: `${userProfile.firstName} ${userProfile.lastName}`,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            mobile: userProfile.mobile,
            address: { ...userProfile.address },
            tickets: userProfile.tickets,
        };

        await setDoc(userRef, updatedUserProfile, { merge: true });
        user.set(updatedUserProfile);

        return { success: true };
    } catch (error: any) {
        console.error("Error updating profile: ", error.message);
        return { success: false, message: error.message };
    }
};