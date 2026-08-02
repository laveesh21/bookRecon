import {create} from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const SERVER_URL = import.meta.url.SERVER_URL || "http://localhost:5000";
const SERVER_URL = process.env.SERVER_URL || "https://bookrecon.onrender.com";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,


    register: async (username, email, password) => { 
        
        set({ isLoading: true });

        try{
            const response = await fetch(`${SERVER_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Registration failed");
            }

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });

        } catch(error){
            set({ isLoading: false });
            return { success: false, error: error.message };
        }

    },

    login: async (email, password) => {

        set({ isLoading: true });

        try{
            const response = await fetch(`${SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });

            const data = await response.json()
            if(!response.ok){
                throw new Error(data.message || "Login failed");
            }

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token);

            set({ token: data.token, user: data.user, isLoading: false });

            {return { success: true, error: error.message };}

        }catch(error){
            set({ isLoading: false });
            return { success: false, error: error.message };
        }
    }, 
    
    checkAuth: async () => {
        set({ isLoading: true });

        try{
            // const user = await AsyncStorage.getItem("user");
            // const token = await AsyncStorage.getItem("token");
            
            // if(user && token){
                //     set({ user: JSON.parse(user), token, isLoading: false });
                // }else{
                    //     set({ user: null, token: null, isLoading: false });
                    // }
                    
            const user =        {"id":  "6a6de364845e050ff36d724c", "email": "knox1@gmail.com", "username": "knox1", "profileImage": "https://api.dicebear.com/10.x/lorelei/svg?seed=knox1"}
            
                const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2YTZkZTM2NDg0NWUwNTBmZjM2ZDcyNGMiLCJpYXQiOjE3ODU1ODY1MzMsImV4cCI6MTc4NTU5MDEzM30.mnQuJP_6OsDhg-iRIgldwMong-x6Qa2ErA-oLyHilSQ";
            
            if(user && token){
                set({ user, token, isLoading: false });
            }else{
                set({ user: null, token: null, isLoading: false });
            }

        }catch(error){
            set({ isLoading: false });
            console.error("Error checking auth:", error);
        }
    },

    logout: async () => {
        set({ isLoading: true });

        try{
            // await AsyncStorage.removeItem("user");
            // await AsyncStorage.removeItem("token");

            set({ user: null, token: null, isLoading: false });

        }catch(error){
            set({ isLoading: false });
            console.error("Error logging out:", error);
        }
    }   

}))   