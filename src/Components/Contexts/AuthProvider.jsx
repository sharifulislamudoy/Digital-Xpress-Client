// src/providers/AuthProvider.jsx

import { createContext, useEffect, useState } from "react";
import {
    onAuthStateChanged,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    GithubAuthProvider,
} from "firebase/auth";
import axios from "axios";
import auth from "../FireBase-Credentials/Firebase__config__";

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Save user data to MongoDB
    const saveUserToDB = async (userInfo) => {
        try {
            await axios.post("http://localhost:3000/users", userInfo); // backend endpoint to save user
        } catch (error) {
            console.error("Error saving user:", error);
        }
    };

    const registerWithEmail = async (email, password, name, photoURL, phone) => {
        setLoading(true);
        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(res.user, {
                displayName: name,
                photoURL,
            });
            const newUser = {
                name,
                email,
                photoURL,
                phone,
            };
            await saveUserToDB(newUser);
            return res.user;
        } finally {
            setLoading(false);
        }
    };

    const loginWithEmail = async (email, password) => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            return res.user;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGoogle = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            await saveUserToDB({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phone: user.phoneNumber || "",
            });
            return user;
        } finally {
            setLoading(false);
        }
    };

    const loginWithGithub = async () => {
        setLoading(true);
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            // Save GitHub user to DB
            await saveUserToDB({
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                phone: user.phoneNumber || "",
            });

            return user;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => signOut(auth);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currUser => {
            setUser(currUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        registerWithEmail,
        loginWithEmail,
        loginWithGoogle,
        loginWithGithub,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
