# 🗺️ NAVIGATION MAP - Sơ đồ kết nối các màn hình

## 📋 **DANH SÁCH CÁC MÀN HÌNH:**

```
✅ LoginScreen      - Đăng nhập
✅ SignUpScreen     - Đăng ký  
✅ TaskScreen       - Quản lý task
✅ HomeScreen       - Trang chủ
✅ ProfileScreen    - Thông tin cá nhân
✅ EditProfileScreen - Chỉnh sửa profile
✅ SettingsScreen   - Cài đặt
```

## 🔄 **SƠ ĐỒ NAVIGATION:**

```
📱 APP START
│
├─ 🔐 Chưa đăng nhập → LoginScreen
│   ├─ Login success → Tasks
│   └─ "Sign Up" → SignUpScreen
│       ├─ Register success → Tasks  
│       └─ "Sign In" → LoginScreen
│
└─ ✅ Đã đăng nhập → HomeScreen
    ├─ "Go to Profile" → ProfileScreen
    │   ├─ "Edit" → EditProfileScreen
    │   ├─ "Settings" → SettingsScreen
    │   └─ "🏠 Back to Home" → HomeScreen
    │
    └─ "Open Settings" → SettingsScreen
        ├─ "← Back" → (màn hình trước)
        └─ "🏠 Home" → HomeScreen
```

## 📍 **CHI TIẾT NAVIGATION:**

### 🏠 **HomeScreen** (Trang chủ):
```tsx
// Từ HomeScreen có thể đi đến:
navigation.navigate("Profile")   // → ProfileScreen
navigation.navigate("Settings")  // → SettingsScreen
```

### 👤 **ProfileScreen** (Thông tin cá nhân):
```tsx
// Từ ProfileScreen có thể đi đến:
navigation.navigate("EditProfile", {...})  // → EditProfileScreen
navigation.navigate("Settings")            // → SettingsScreen  
navigation.navigate("Home")               // → HomeScreen
```

### ⚙️ **SettingsScreen** (Cài đặt):
```tsx
// Từ SettingsScreen có thể đi đến:
navigation.goBack()           // → Màn hình trước đó
navigation.navigate("Home")   // → HomeScreen
```

### 🔐 **LoginScreen** (Đăng nhập):
```tsx
// Từ LoginScreen có thể đi đến:
navigation.navigate("Tasks")   // → TaskScreen (sau khi login)
navigation.navigate("SignUp")  // → SignUpScreen
```

### 📝 **SignUpScreen** (Đăng ký):
```tsx
// Từ SignUpScreen có thể đi đến:  
navigation.navigate("Tasks")  // → TaskScreen (sau khi đăng ký)
navigation.navigate("Login")  // → LoginScreen
```

## 🎯 **FLOW CHÍNH:**

```
1️⃣ START APP
   ↓
2️⃣ Check login status
   ├─ Chưa login → LoginScreen
   └─ Đã login → HomeScreen
   ↓
3️⃣ HomeScreen → Profile/Settings
   ↓
4️⃣ Navigate giữa các màn hình
   ↓
5️⃣ Back về Home hoặc màn hình trước
```

## 🔧 **CÁCH SỬ DỤNG NAVIGATION:**

### Đi đến màn hình khác:
```tsx
navigation.navigate("ScreenName")
```

### Quay về màn hình trước:
```tsx
navigation.goBack()
```

### Reset toàn bộ stack:
```tsx
navigation.reset({
  index: 0,
  routes: [{ name: "ScreenName" }]
})
```

## 📱 **TRẠNG THÁI APP:**

- **initialRouteName**: `Home` (nếu đã login) hoặc `Login` (nếu chưa login)
- **headerShown**: `false` (tất cả màn hình đều ẩn header mặc định)
- **navigation**: Sử dụng `@react-navigation/native-stack`