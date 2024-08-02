import { Stack } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import { ClerkProvider, ClerkLoaded, SignedIn, SignedOut } from "@clerk/clerk-expo"
import { Login } from '@/components'
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useFonts } from "expo-font";
import { ContextProvider } from "@/context/useStateContext";
import { Colors } from "@/constants/Colors";

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;


export default function RootLayout() {

  useFonts({
    'outfit': require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-medium': require('../assets/fonts/Outfit-Medium.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
  })


  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>

        <ContextProvider>
          <SignedIn>
            <GestureHandlerRootView style={{ flex: 1 }} >
              <SafeAreaProvider style={{ backgroundColor: Colors.PRIMARY }} >
                <Stack screenOptions={{ headerShown: false }} >
                  <Stack.Screen name="(tabs)" />
                  <Stack.Screen name="add-category" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Add New Category' }} />
                  <Stack.Screen name="add-category-item" options={{ presentation: 'modal', headerShown: true, headerTitle: 'Add Category Item' }} />
                </Stack>
              </SafeAreaProvider>
            </GestureHandlerRootView>
          </SignedIn>

          <SignedOut>
            <Login />
          </SignedOut>
        </ContextProvider>

      </ClerkLoaded>
    </ClerkProvider>
  );
}
