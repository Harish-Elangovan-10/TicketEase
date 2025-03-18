import { startLoading, stopLoading } from "./pageLoading";
import { db } from "../firebase";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import type { MuseumTicket } from "./types";

export const handleBooking = (ticket: MuseumTicket) => {
    startLoading();
    try {
        localStorage.setItem('museumTicket', JSON.stringify(ticket));
        window.location.replace('/verify');
    } catch (error) {
        stopLoading();
        console.error("Failed to book ticket: ", error);
    }
};

export const handleSuccessfulBooking = async (uid: string) => {
    try {
        const savedTicket = localStorage.getItem('museumTicket');

        if (!savedTicket) {
            throw new Error('No ticket found in local storage. Booking failed.');
        }

        const bookedTicket: MuseumTicket = JSON.parse(savedTicket);
        localStorage.removeItem('museumTicket');

        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
            tickets: arrayUnion(bookedTicket),
        });

        console.log('Ticket successfully added to user profile:', bookedTicket);
    } catch (error) {
        console.error('Error handling successful booking:', error);
    }
};

export const deleteBookedTicket = async (uid: string, ticketToDelete: MuseumTicket) => {
    try {
        const userRef = doc(db, 'users', uid);

        await updateDoc(userRef, {
            tickets: arrayRemove(ticketToDelete),
        });

        console.log('Ticket successfully removed:', ticketToDelete);
    } catch (error) {
        console.error('Error deleting ticket:', error);
    }
};
