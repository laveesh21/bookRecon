import {SplashScreen, Stack, useSegments, useRouter } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../components/SafeScreen";
import { useAuthStore } from "../store/authStore";
import { useEffect } from "react";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const router = useRouter();

  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();

  const [fontLoaded] = useFonts({
    "JetBrainsMono-Medium": require("../../assets/font/JetBrainsMono-Medium.ttf"),
  });


  useEffect(() => {
    if (!fontLoaded) return;
  
    const hideSplash = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync();
    };
  
    hideSplash();
  }, [fontLoaded]);

  useEffect(() => {
    checkAuth();
  }, [])

  useEffect(() => {
    const inAuthScreen = segments[0] === "(auth)"
    const isSignedIn = user && token;

    if (!isSignedIn && !inAuthScreen) router.replace("/(auth)")
    if (isSignedIn && inAuthScreen) router.replace("/(tabs)")
  }, [])

  return (
    <SafeAreaProvider>
      <SafeScreen>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
        </Stack>
      </SafeScreen>
    </SafeAreaProvider>
  );
}
