import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, Alert } from "react-native";
import styles from "../../../assets/styles/login.styles";
import { Image } from "expo-image";
import COLORS from "../../../constants/colors";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { Link } from "expo-router";

import { useAuthStore } from "../../../store/authStore.js"

export default function Login() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { user, isLoading, login } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    const result = await login( email, password)
    if(!result.success) Alert.alert("Error", result.error)  
  };

  return (

    <KeyboardAvoidingView
        style={{flex: 1}}
        behavior ={Platform.OS === "ios" ? "padding" : "height"}
    >

    <View style={styles.container}>
      <View style={styles.topIllustration}>
        <Image
          source={require("../../../assets/login_asset.png")}
          style={styles.illustrationImage}
        />
      </View>
      <View style={styles.card}>
        <View style={styles.formContainer}>
          {/* EMAIL */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="mail-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* PASSWORD */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputContainer}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color={COLORS.primary}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color={COLORS.primary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
            {isLoading ? ( 
                <ActivityIndicator color="#fff" /> 
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text>Don't have an account?</Text>
                <Link href="/signup" asChild>
                <TouchableOpacity>
                  <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity> 
                </Link>
          </View>
        </View>
      </View>
    </View>
    </KeyboardAvoidingView>
  );
}
