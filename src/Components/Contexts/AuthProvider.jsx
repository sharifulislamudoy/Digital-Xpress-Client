import React, { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    FacebookAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import auth from "../FireBase-Credentials/Firebase__config__";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // ======== EMAIL/PASSWORD AUTH ========
    const signUpWithEmail = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const loginWithEmail = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // ======== SOCIAL AUTH ========
    const loginWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const loginWithFacebook = () => {
        setLoading(true);
        return signInWithPopup(auth, facebookProvider);
    };

    // ======== LOGOUT ========
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // ======== SAVE USER BACKEND ========
    const saveUserToBackend = async (user) => {
        const token = await user.getIdToken();
        const userData = {
            name: user.displayName || "Anonymous",
            email: user.email || null,
            uid: user.uid,
            photoURL: user.photoURL || null,
            phoneNumber: user.phoneNumber || null,
            role: "user",
        };

        try {
            await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
            });
        } catch (error) {
            console.error("User save error:", error);
        }
    };

    // ======== AUTH STATE LISTENER ========
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);

            if (currentUser) {
                saveUserToBackend(currentUser);
            }
        });

        return () => unsubscribe();
    }, []);

    // ======== CONTEXT VALUE ========
    const authInfo = {
        user,
        loading,
        signUpWithEmail,
        loginWithEmail,
        loginWithGoogle,
        loginWithFacebook,
        logOut,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;