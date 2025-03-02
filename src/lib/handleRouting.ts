import { signOut } from "./auth";
import { startLoading, stopLoading } from "./pageLoading";
import { goto } from "$app/navigation";

export const handleSignUp = () => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/signup`);
            stopLoading();
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
            stopLoading();
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
            stopLoading();
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
            stopLoading();
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
            stopLoading();
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
            stopLoading();
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to About Us: ", error);
    }
};

export const handleMuseumView = (id: string) => {
    try {
        startLoading();
        setTimeout(() => {
            goto(`/museumView/${id}`);
            stopLoading();
        }, 1500);
    } catch (error) {
        stopLoading();
        console.error("Failed to navaigate to selected Museum page: ",  error);
    }
};