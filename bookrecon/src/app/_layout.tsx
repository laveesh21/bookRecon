import { Stack, useSegments, useRouter} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SafeScreen from "../../components/SafeScreen";
import { useAuthStore } from "../../store/authStore";
import { useEffect } from "react";

export default function RootLayout() {
  const router = useRouter();
  const segments = useSegments();
  const { checkAuth, user, token } = useAuthStore();


  useEffect(() => {
    checkAuth();
  },[])

  useEffect(()=>{
    // const inAuthScreen = segments[0] === "(auth)"
    // const isSignedIn = user && token;

    // if(!isSignedIn && !inAuthScreen) router.replace("/(auth)")
    // if(isSignedIn && inAuthScreen) router.replace("/(tabs)")
  },[])

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
