import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import { Formik } from "formik";
import * as Yup from "yup";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Login">;

// Validation schema
const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  agreedToTerms: Yup.boolean().oneOf(
    [true],
    "You must agree to the terms and conditions"
  ),
});

export default function SignUpScreen() {
  const navigation = useNavigation<NavProp>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreedToTerms: boolean;
  }) => {
    try {
      await AsyncStorage.setItem(
        "session",
        JSON.stringify({
          isLoggedIn: true,
          email: values.email,
          name: values.name,
        })
      );
      navigation.navigate("Tasks");
    } catch (error) {
      console.error("Sign up error:", error);
      Alert.alert("Error", "Failed to create account. Please try again.");
    }
  };

  const handleSignIn = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.wrapper}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Create Account</Text>
          <Text style={styles.headerSubtitle}>
            Join us today and get started
          </Text>
        </View>

        {/* Sign Up Form */}
        <View style={styles.formContainer}>
          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              agreedToTerms: false,
            }}
            validationSchema={signUpSchema}
            onSubmit={handleSignUp}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldValue,
            }) => (
              <View style={styles.formCard}>
                {/* Name Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Full Name</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.name && touched.name && styles.inputError,
                    ]}
                  >
                    <Text style={styles.inputIcon}>👤</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your full name"
                      placeholderTextColor="#A0AEC0"
                      value={values.name}
                      onChangeText={handleChange("name")}
                      onBlur={handleBlur("name")}
                      autoCapitalize="words"
                    />
                  </View>
                  {errors.name && touched.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                {/* Email Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Email</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.email && touched.email && styles.inputError,
                    ]}
                  >
                    <Text style={styles.inputIcon}>📧</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your email"
                      placeholderTextColor="#A0AEC0"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                  </View>
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.password && touched.password && styles.inputError,
                    ]}
                  >
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Create a password"
                      placeholderTextColor="#A0AEC0"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      secureTextEntry={!showPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <Text style={styles.eyeIcon}>
                        {showPassword ? "🙈" : "👁️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Confirm Password Input */}
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Confirm Password</Text>
                  <View
                    style={[
                      styles.inputContainer,
                      errors.confirmPassword &&
                        touched.confirmPassword &&
                        styles.inputError,
                    ]}
                  >
                    <Text style={styles.inputIcon}>🔒</Text>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Confirm your password"
                      placeholderTextColor="#A0AEC0"
                      value={values.confirmPassword}
                      onChangeText={handleChange("confirmPassword")}
                      onBlur={handleBlur("confirmPassword")}
                      secureTextEntry={!showConfirmPassword}
                      autoCapitalize="none"
                    />
                    <TouchableOpacity
                      onPress={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      <Text style={styles.eyeIcon}>
                        {showConfirmPassword ? "🙈" : "👁️"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <Text style={styles.errorText}>
                      {errors.confirmPassword}
                    </Text>
                  )}
                </View>

                {/* Terms Agreement */}
                <View style={styles.termsContainer}>
                  <TouchableOpacity
                    style={styles.termsRow}
                    onPress={() =>
                      setFieldValue("agreedToTerms", !values.agreedToTerms)
                    }
                  >
                    <View
                      style={[
                        styles.checkbox,
                        values.agreedToTerms && styles.checkboxChecked,
                      ]}
                    >
                      {values.agreedToTerms && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </View>
                    <Text style={styles.termsText}>
                      I agree to the{" "}
                      <Text style={styles.linkText}>Terms of Service</Text> and{" "}
                      <Text style={styles.linkText}>Privacy Policy</Text>
                    </Text>
                  </TouchableOpacity>
                  {errors.agreedToTerms && touched.agreedToTerms && (
                    <Text style={styles.errorText}>{errors.agreedToTerms}</Text>
                  )}
                </View>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={[
                    styles.signUpButton,
                    !values.agreedToTerms && styles.signUpButtonDisabled,
                  ]}
                  onPress={() => handleSubmit()}
                  disabled={!values.agreedToTerms}
                >
                  <Text style={styles.signUpButtonText}>Create Account</Text>
                </TouchableOpacity>
              </View>
            )}
          </Formik>

          {/* Login Option */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F7FA",
  },
  contentContainer: {
    paddingBottom: 32,
  },
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: "#3B7FBF",
    paddingTop: 64,
    paddingBottom: 48,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    marginTop: 8,
    fontSize: 16,
  },
  formContainer: {
    paddingHorizontal: 24,
    marginTop: 32,
  },
  formCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    color: "#1A2B3C",
    fontWeight: "500",
    marginBottom: 8,
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E6ED",
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  inputIcon: {
    fontSize: 18,
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 12,
    color: "#1A2B3C",
    fontSize: 16,
  },
  eyeIcon: {
    fontSize: 18,
    padding: 4,
  },
  termsContainer: {
    marginBottom: 24,
  },
  termsRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#E0E6ED",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#3B7FBF",
    borderColor: "#3B7FBF",
  },
  checkmark: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  termsText: {
    color: "#1A2B3C",
    marginLeft: 8,
    fontSize: 14,
    flex: 1,
    lineHeight: 20,
  },
  linkText: {
    color: "#3B7FBF",
    fontWeight: "500",
  },
  signUpButton: {
    backgroundColor: "#3B7FBF",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  signUpButtonDisabled: {
    backgroundColor: "#A0AEC0",
  },
  signUpButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 32,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    color: "#5A6B7C",
    fontSize: 14,
  },
  loginLink: {
    color: "#3B7FBF",
    fontWeight: "bold",
    fontSize: 14,
  },
  inputError: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});
