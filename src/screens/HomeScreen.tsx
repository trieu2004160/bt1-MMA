import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ThemeContext } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/RootNavigator";
import { LinearGradient } from "expo-linear-gradient";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      {/* Decorative circles */}
      <View
        style={[styles.circle, styles.circle1, isDark && styles.circleDark]}
      />
      <View
        style={[styles.circle, styles.circle2, isDark && styles.circleDark]}
      />

      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        {/* Icon/Avatar */}
        <View
          style={[styles.iconContainer, isDark && styles.iconContainerDark]}
        >
          <Text style={styles.icon}>👤</Text>
        </View>

        {/* Welcome Text */}
        <Text
          style={[styles.title, isDark ? styles.textDark : styles.textLight]}
        >
          Welcome Back!
        </Text>
        <Text
          style={[
            styles.subtitle,
            isDark ? styles.subTextDark : styles.subTextLight,
          ]}
        >
          Manage your profile and preferences
        </Text>

        {/* Cards/Buttons */}
        <View style={styles.cardsContainer}>
          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Profile")}
          >
            <LinearGradient
              colors={["#3b82f6", "#2563eb"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>👤</Text>
              </View>
              <Text style={styles.cardTitle}>My Profile</Text>
              <Text style={styles.cardDescription}>
                View and edit your personal information
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.card}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Settings")}
          >
            <LinearGradient
              colors={["#8b5cf6", "#7c3aed"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.cardGradient}
            >
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>⚙️</Text>
              </View>
              <Text style={styles.cardTitle}>Settings</Text>
              <Text style={styles.cardDescription}>
                Customize your app experience
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  containerLight: {
    backgroundColor: "#f8fafc",
  },
  containerDark: {
    backgroundColor: "#0f172a",
  },
  circle: {
    position: "absolute",
    borderRadius: 999,
    backgroundColor: "#3b82f620",
  },
  circle1: {
    width: 300,
    height: 300,
    top: -100,
    right: -100,
  },
  circle2: {
    width: 200,
    height: 200,
    bottom: -50,
    left: -50,
  },
  circleDark: {
    backgroundColor: "#1e40af20",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    zIndex: 1,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#dbeafe",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    shadowColor: "#3b82f6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  iconContainerDark: {
    backgroundColor: "#1e3a8a",
  },
  icon: {
    fontSize: 48,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
    textAlign: "center",
  },
  textLight: { color: "#0f172a" },
  subTextLight: { color: "#64748b" },
  textDark: { color: "#f1f5f9" },
  subTextDark: { color: "#cbd5e1" },
  cardsContainer: {
    width: "100%",
    gap: 16,
    marginBottom: 32,
  },
  card: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  cardGradient: {
    padding: 24,
    minHeight: 140,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  cardIconText: {
    fontSize: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.85)",
    lineHeight: 20,
  },
  quickActions: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
    justifyContent: "space-between",
  },
  quickBtn: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  quickBtnDark: {
    backgroundColor: "#1e293b",
  },
  quickBtnIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  quickBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#475569",
  },
  quickBtnTextDark: {
    color: "#cbd5e1",
  },
});
