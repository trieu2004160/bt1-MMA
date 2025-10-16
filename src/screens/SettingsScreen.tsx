import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import ThemeToggleSwitch from "../components/ThemeToggleSwitch";
import { ThemeContext } from "../context/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Settings">;

export default function SettingsScreen({ navigation }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* Header with Navigation Buttons */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text
            style={[
              styles.backButtonText,
              isDark ? styles.textDark : styles.textLight,
            ]}
          >
            ← Back
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.title, isDark ? styles.textDark : styles.textLight]}
        >
          Settings
        </Text>
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate("Home")}
        >
          <Text
            style={[
              styles.homeButtonText,
              isDark ? styles.textDark : styles.textLight,
            ]}
          >
            🏠 Home
          </Text>
        </TouchableOpacity>
      </View>

      {/* Settings Content */}
      <View style={styles.content}>
        <ThemeToggleSwitch />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  containerLight: { backgroundColor: "#ffffff" },
  containerDark: { backgroundColor: "#0b1220" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    flex: 1,
    textAlign: "center",
  },
  homeButton: {
    marginLeft: 16,
    padding: 8,
  },
  homeButtonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
  },
  textLight: { color: "#111827" },
  textDark: { color: "#f9fafb" },
});
