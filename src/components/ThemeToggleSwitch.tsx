import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { ThemeContext } from "../context/ThemeContext";

export default function ThemeToggleSwitch() {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <View style={styles.row}>
      <Text style={[styles.label, isDark ? styles.textDark : styles.textLight]}>
        {isDark ? "Dark Mode" : "Light Mode"}
      </Text>
      <Switch value={isDark} onValueChange={toggleTheme} />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
  },
  label: {
    fontSize: 16,
  },
  textLight: {
    color: "#111827",
  },
  textDark: {
    color: "#f9fafb",
  },
});
