import { signOut } from "./auth";
import { startLoading, stopLoading } from "./pageLoading";
import { goto } from "$app/navigation";

export const handleSignUp = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/signup`);
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to Sign Up: ", error);
    }
};

export const handleSignIn = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/login`);
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to Sign In: ", error);
    }
};

export const handleSignOut = async () => {
    try {
        startLoading();
        await signOut();
        setTimeout(() => {
            goto(`/`);
        }, 1500);
    } catch (error) {
        console.error("Failed to Sign Out: ", error);
    }
};

export const handleHome = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/`);
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to Home: ", error);
    }
};

export const handleMuseums = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/museums`);
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to Museums: ", error);
    }
};

export const handleAboutUs = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/about`);
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to About Us: ", error);
    }
};