export interface UserProfile {
    uid: string;
    email: string | null;
    displayName: string | null;
    firstName: string;
    lastName: string;
    mobile: string;
    address: {
        line1: string;
        line2: string;
        city: string;
        state: string;
        pincode: string;
    },
};