import { writable } from "svelte/store";
import { signOut } from "./auth";
import { startLoading, stopLoading } from "./pageLoading";
import type { MuseumTicket } from "./types";

export const handleSignUp = (redirect: string) => {
    sessionStorage.setItem('redirectAfterSignup', redirect);
    try {
        startLoading();
        window.location.href = "/signup";
    } catch (error) {
        stopLoading();
        console.error("Failed to Sign Up: ", error);
    }
};

export const handleSignIn = (redirect: string) => {
    sessionStorage.setItem('redirectAfterSignin', redirect);
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

export const handleAboutUs = () => {
    try {
        startLoading();
        window.location.href = "/about";
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to About Us: ", error);
    }
};

export const handleMuseumView = (id: string) => {
    try {
        startLoading();
        window.location.href = `/museumView/${id}`;
    } catch (error) {
        stopLoading();
        console.error("Failed to navaigate to selected Museum page: ",  error);
    }
};

export const handleBookNow = (id: string) => {
    try {
        startLoading();
        window.location.href = `/booknow/${id}`;
    } catch (error) {
        stopLoading();
        console.error("Failed to navaigate to Booking page: ",  error);
    }
};

export const handleDashboard = () => {
    try {
        startLoading();
        window.location.href = "/dashboard";
    } catch (error) {
        stopLoading();
        console.error("Failed to navigate to Dashboard: ", error);
    }
};

export const showTicket = writable(false);

export const toggleTicket = (ticket: MuseumTicket) => {
    localStorage.setItem('viewTicket', JSON.stringify(ticket));
    showTicket.set(true);
};

export const closeTicket = () => {
    localStorage.removeItem('viewTicket');
    showTicket.set(false);
};