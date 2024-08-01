import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import { Colors } from '@/constants/Colors'
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser'
import { useOAuth } from '@clerk/clerk-expo'
import * as Linking from "expo-linking"

const Login = () => {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({ redirectUrl: Linking.createURL("/home", { scheme: "myapp" }) });

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {

      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View style={{ display: 'flex', alignItems: 'center' }} >
      <Image
        source={require('@/assets/images/login.jpg')}
        style={{ width: '100%', height: 350, marginTop: 30, borderWidth: 5, borderColor: Colors.BLACK, borderRadius: 20 }}
      />
      <View style={{ backgroundColor: Colors.PRIMARY, width: '100%', height: '100%', padding: 20, marginTop: -20, borderTopRightRadius: 30, borderTopLeftRadius: 30 }} >
        <Text style={{ fontSize: 35, fontWeight: 'bold', textAlign: 'center', color: Colors.WHITE }} >Personal Budget Plan</Text>
        <Text style={{ fontSize: 18, textAlign: 'center', color: Colors.WHITE, marginTop: 20 }} >Stay on track, Eveny by Event: Your Personal Budget Planner App</Text>
        <TouchableOpacity onPress={onPress} style={{ backgroundColor: Colors.WHITE, padding: 20, paddingHorizontal: 15, borderRadius: 99, marginTop: 30 }} >
          <Text style={{ textAlign: 'center', color: Colors.PRIMARY }} >Login/Signup</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 13, textAlign: 'center', color: Colors.WHITE, marginTop: 10 }} >* By login/signup you agree to our terms and conditions</Text>
      </View>
    </View>
  )
}

export default Login