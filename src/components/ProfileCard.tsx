import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

type ProfileCardProps = {
  name: string;
  bio: string;
  avatarSource?: any;
};

export default function ProfileCard({
  name,
  bio,
  avatarSource,
}: ProfileCardProps) {
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View style={[styles.card, isDark ? styles.cardDark : styles.cardLight]}>
      <Image
        source={avatarSource || require("../../assets/icon.png")}
        style={styles.avatar}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text
          style={[styles.name, isDark ? styles.textDark : styles.textLight]}
        >
          {name}
        </Text>
        <Text
          style={[
            styles.bio,
            isDark ? styles.subTextDark : styles.subTextLight,
          ]}
        >
          {bio}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    padding: 16,
    gap: 16,
  },
  cardLight: {
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  cardDark: {
    backgroundColor: "#1f2937",
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
  },
  bio: {
    marginTop: 4,
    fontSize: 14,
  },
  textLight: {
    color: "#111827",
  },
  subTextLight: {
    color: "#374151",
  },
  textDark: {
    color: "#f9fafb",
  },
  subTextDark: {
    color: "#d1d5db",
  },
});
