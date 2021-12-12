import React, { useState } from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input, Button } from "react-native-elements";

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const signUp = () => {

  // }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "flex-start", flex: 1 }}
    >
      <Icon
        onPress={() => navigation.navigate("Login")}
        name="arrow-left"
        type="font-awesome"
        color="#6CC417"
      />
      <View
        style={{
          width: "100%",
          flex: 1,
        }}
      >
        <Text
          style={{
            color: "#6CC417",
            fontSize: 30,
            fontWeight: "bold",
            marginTop: 40,
          }}
        >
          Create Account
        </Text>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Full Name"
            leftIcon={{
              type: "font-awesome",
              name: "user",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            onChangeText={(value) => {
              setFullName(value);
              setIsSubmitted(false);
            }}
            inputStyle={{ color: "#6CC417" }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            errorMessage={
              isSubmitted && !fullName ? "Enter your full name!..." : ""
            }
          />
          <Input
            placeholder="Phone Number"
            leftIcon={{
              type: "font-awesome",
              name: "phone",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            keyboardType="number-pad"
            containerStyle={{ margin: 20, marginLeft: 0 }}
            inputStyle={{ color: "#6CC417" }}
            onChangeText={(value) => {
              setPhoneNumber(value);
              setIsSubmitted(false);
            }}
            errorMessage={
              isSubmitted && !phoneNumber ? "Enter your phone number!..." : ""
            }
          />
          <Input
            placeholder="Password"
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            inputStyle={{ color: "#6CC417" }}
            onChangeText={(value) => {
              setPassword(value);
              setIsSubmitted(false);
            }}
            errorMessage={
              isSubmitted && !password ? "Enter your password!..." : ""
            }
            secureTextEntry
          />

          <Input
            placeholder="Confirm Password"
            leftIcon={{
              type: "font-awesome",
              name: "user-secret",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            inputStyle={{ color: "#6CC417" }}
            onChangeText={(value) => {
              setConfirmPassword(value);
              setIsSubmitted(false);
            }}
            errorMessage={
              isSubmitted && !confirmPassword
                ? "Enter your password again!..."
                : confirmPassword !== password
                ? "Passwords do not match"
                : ""
            }
            secureTextEntry
          />

          <Button
            icon={
              <Icon
                type="font-awesome"
                name="arrow-right"
                color="black"
                style={{ marginLeft: 10 }}
              />
            }
            iconPosition="right"
            title="Signup"
            buttonStyle={{ backgroundColor: "#6CC417" }}
            titleStyle={{
              color: "black",
              marginLeft: 5,
              fontSize: 18,
              fontWeight: "bold",
            }}
            containerStyle={{
              bottom: 10,
              position: "absolute",
              width: "100%",
            }}
            onPress={() => {
              setIsSubmitted(true);
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: StatusBar.currentHeight + 20,
    padding: 20,
  },
});
