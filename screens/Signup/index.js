import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ToastAndroid,
} from "react-native";
import { Icon } from "react-native-elements/dist/icons/Icon";
import { Input, Button } from "react-native-elements";
import insertData from "../../RouteControllers/insertData";

export default function Signup({ navigation }) {
  const [fullName, setFullName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const addNewUser = async (data) => {
    setMutationInProgress(true);
    let res = await insertData("addUser", data);
    if (res) {
      setMutationInProgress(false);
      ToastAndroid.show("User added successfully!...", ToastAndroid.SHORT);
      navigation.navigate("Login");
    } else {
      setMutationInProgress(false);
      ToastAndroid.show("Failed to add new user!...", ToastAndroid.SHORT);
    }
  };

  const handleSignup = () => {
    let data = {
      fullName,
      phoneNumber,
      password,
    };

    if (fullName && phoneNumber && password && confirmPassword) {
      if (password === confirmPassword) {
        addNewUser(data);
      }
    }
  };

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
        size={30}
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
              mutationInProgress ? (
                <Icon
                  type="font-awesome"
                  name="spinner"
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              ) : (
                <Icon
                  type="font-awesome"
                  name="arrow-right"
                  color="black"
                  style={{ marginLeft: 10 }}
                />
              )
            }
            iconPosition="right"
            disabled={mutationInProgress}
            title={mutationInProgress ? "Please wait" : "Signup"}
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
              handleSignup();
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
