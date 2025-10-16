import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ThemeContext } from "../context/ThemeContext";
import { RootStackParamList } from "../navigation/RootNavigator";

type Props = NativeStackScreenProps<RootStackParamList, "EditProfile">;

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too short")
    .max(50, "Too long")
    .required("Required"),
  bio: Yup.string()
    .min(4, "Too short")
    .max(160, "Too long")
    .required("Required"),
});

export default function EditProfileScreen({ route, navigation }: Props) {
  const { theme } = React.useContext(ThemeContext);
  const isDark = theme === "dark";

  const {
    name: initialName = "",
    bio: initialBio = "",
    onSave,
  } = route.params || ({} as any);

  const formik = useFormik({
    initialValues: { name: initialName, bio: initialBio },
    validationSchema: schema,
    onSubmit: (values) => {
      if (onSave) onSave(values.name, values.bio);
      navigation.goBack();
    },
    enableReinitialize: true,
  });

  return (
    <View
      style={[
        styles.container,
        isDark ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View style={styles.field}>
        <Text
          style={[styles.label, isDark ? styles.textDark : styles.textLight]}
        >
          Name
        </Text>
        <TextInput
          value={formik.values.name}
          onChangeText={formik.handleChange("name")}
          onBlur={formik.handleBlur("name")}
          placeholder="Your name"
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          style={[styles.input, isDark ? styles.inputDark : styles.inputLight]}
        />
        {formik.touched.name && formik.errors.name ? (
          <Text style={styles.error}>{String(formik.errors.name)}</Text>
        ) : null}
      </View>

      <View style={styles.field}>
        <Text
          style={[styles.label, isDark ? styles.textDark : styles.textLight]}
        >
          Bio
        </Text>
        <TextInput
          value={formik.values.bio}
          onChangeText={formik.handleChange("bio")}
          onBlur={formik.handleBlur("bio")}
          placeholder="Short bio"
          placeholderTextColor={isDark ? "#6b7280" : "#9ca3af"}
          style={[
            styles.input,
            styles.inputMultiline,
            isDark ? styles.inputDark : styles.inputLight,
          ]}
          multiline
          numberOfLines={4}
        />
        {formik.touched.bio && formik.errors.bio ? (
          <Text style={styles.error}>{String(formik.errors.bio)}</Text>
        ) : null}
      </View>

      <TouchableOpacity style={styles.button} onPress={formik.submitForm}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 16 },
  containerLight: { backgroundColor: "#ffffff" },
  containerDark: { backgroundColor: "#0b1220" },
  field: { gap: 8 },
  label: { fontSize: 14, fontWeight: "500" },
  textLight: { color: "#111827" },
  textDark: { color: "#f9fafb" },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputLight: {
    borderColor: "#e5e7eb",
    color: "#111827",
    backgroundColor: "#f9fafb",
  },
  inputDark: {
    borderColor: "#374151",
    color: "#f9fafb",
    backgroundColor: "#111827",
  },
  inputMultiline: { textAlignVertical: "top", minHeight: 100 },
  button: {
    marginTop: 8,
    backgroundColor: "#2563eb",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#ffffff", fontWeight: "600" },
  error: { color: "#ef4444", fontSize: 12 },
});
