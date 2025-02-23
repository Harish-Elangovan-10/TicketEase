import { writable } from "svelte/store";
import { auth } from "../firebase";
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
    type User,
} from "firebase/auth";

export const user = writable<User | null>(null);
const googleProvider = new GoogleAuthProvider();

auth.onAuthStateChanged((firebaseUser) => {
    user.set(firebaseUser);
});

export const signUp = async (email: string, password: string, firstname: string, lastname: string) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, {
            displayName: `${firstname} ${lastname}`
        });
        
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signIn = async (email: string, password: string, rememberMe: boolean) => {
    try {
        await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        return userCredential.user;
    } catch (error) {
        throw error;
    }
};

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        
        return result.user;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

export const signOut = async () => {
    try {
        await firebaseSignOut(auth);
    } catch (error) {
        throw error;
    }
};