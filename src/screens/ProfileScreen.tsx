import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import ProfileCard from "../components/ProfileCard";
import { ThemeContext } from "../context/ThemeContext";

type Props = NativeStackScreenProps<RootStackParamList, "Profile">;

export default function ProfileScreen({ navigation }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");

  const handleEdit = () => {
    navigation.navigate("EditProfile", {
      name,
      bio,
      onSave: (nextName: string, nextBio: string) => {
        setName(nextName);
        setBio(nextBio);
      },
    });
  };

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      <ProfileCard name={name} bio={bio} />

      <TouchableOpacity style={styles.button} onPress={handleEdit}>
        <Text style={styles.buttonText}>Edit</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.settingsButton]}
        onPress={() => navigation.navigate("Settings")}
      >
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.homeButton]}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>🏠 Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    gap: 16,
  },
  containerLight: { backgroundColor: "#f9fafb" },
  containerDark: { backgroundColor: "#0b1220" },
  button: {
    backgroundColor: "#10b981",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  settingsButton: {
    backgroundColor: "#6366f1",
    marginTop: 8,
  },
  homeButton: {
    backgroundColor: "#f59e0b",
    marginTop: 8,
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
});
