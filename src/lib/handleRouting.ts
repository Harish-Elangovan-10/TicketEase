import { signOut } from "./auth";
import { startLoading, stopLoading } from "./pageLoading";

export const handleSignUp = () => {
    try {
        startLoading();
        window.location.href = "/signup";
    } catch (error) {
        stopLoading();
        console.error("Failed to Sign Up: ", error);
    }
};

export const handleSignIn = () => {
    try {
        startLoading();
        window.location.href = "/login";
    } catch (error) {
        stopLoading();
        console.error("Failed to Sign In: ", error);
    }
};

export const handleSignOut = async () => {
    try {
        startLoading();
        await signOut();
        window.location.href = "/";
    } catch (error) {
        console.error("Failed to Sign Out: ", error);
    }
};

export const handleHome = () => {
    try {
        startLoading();
        window.location.href = "/";
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to Home: ", error);
    }
};

export const handleMuseums = () => {
    try {
        startLoading();
        window.location.href = "/museums";
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to Museums: ", error);
    }
};