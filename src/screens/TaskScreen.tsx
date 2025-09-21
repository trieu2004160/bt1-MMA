import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addTask, toggleTask, removeTask } from "../store/tasksSlice";
import { ThemeContext } from "../context/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/RootNavigator";
import type { RootState } from "../store";

type NavProp = NativeStackNavigationProp<RootStackParamList, "Tasks">;

export default function TaskScreen() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const navigation = useNavigation<NavProp>();

  const onAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    dispatch(addTask(trimmed));
    setTitle("");
  };

  const logout = async () => {
    await AsyncStorage.removeItem("session");
    navigation.reset({ index: 0, routes: [{ name: "Login" }] });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: isDark ? "#111" : "#fff" }]}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: isDark ? "#fff" : "#000" }]}>
          Tasks
        </Text>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <TouchableOpacity onPress={toggleTheme} style={styles.smallBtn}>
            <Text style={styles.smallBtnText}>{isDark ? "Light" : "Dark"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={logout}
            style={[styles.smallBtn, { backgroundColor: "#ff3b30" }]}
          >
            <Text style={styles.smallBtnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addRow}>
        <TextInput
          placeholder="New task"
          placeholderTextColor={isDark ? "#888" : "#999"}
          style={[
            styles.input,
            {
              color: isDark ? "#fff" : "#000",
              borderColor: isDark ? "#333" : "#ccc",
            },
          ]}
          value={title}
          onChangeText={setTitle}
          onSubmitEditing={onAdd}
        />
        <TouchableOpacity onPress={onAdd} style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.item,
              { backgroundColor: isDark ? "#1b1b1b" : "#f5f5f5" },
            ]}
          >
            <TouchableOpacity
              onPress={() => dispatch(toggleTask(item.id))}
              style={{ flex: 1 }}
            >
              <Text
                style={{
                  color: isDark ? "#fff" : "#000",
                  textDecorationLine: item.completed ? "line-through" : "none",
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => dispatch(removeTask(item.id))}
              style={styles.deleteBtn}
            >
              <Text style={styles.deleteBtnText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text
            style={{
              color: isDark ? "#aaa" : "#666",
              textAlign: "center",
              marginTop: 24,
            }}
          >
            No tasks yet
          </Text>
        }
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  title: { fontSize: 24, fontWeight: "700" },
  addRow: { flexDirection: "row", gap: 8, marginBottom: 8 },
  input: { flex: 1, borderWidth: 1, borderRadius: 8, padding: 12 },
  addBtn: {
    backgroundColor: "#007AFF",
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: "center",
  },
  addBtnText: { color: "white", fontWeight: "600" },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 12,
    marginHorizontal: 4,
    marginVertical: 6,
    borderRadius: 10,
  },
  deleteBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#ff3b30",
    borderRadius: 8,
  },
  deleteBtnText: { color: "white" },
  smallBtn: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#444",
    borderRadius: 8,
  },
  smallBtnText: { color: "white", fontWeight: "600" },
});


