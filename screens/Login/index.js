import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card, Input, Button, Icon } from "react-native-elements";
import getData from "../../RouteControllers/getData";
import Logo from "../../assets/CredLockLogo.png";

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const fetchValidUser = async () => {
    setMutationInProgress(true);
    let res = await getData("findUser");
    if (
      res &&
      res.find(
        (el) => el.phoneNumber === phoneNumber && el.password === password
      )
    ) {
      let user = res.find(
        (el) => el.phoneNumber === phoneNumber && el.password === password
      );
      let key = user.fullName + user.phoneNumber;
      console.log("Key", key);
      setMutationInProgress(false);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Dashboard",
            params: { encryptionKey: key, userID: user.userID },
          },
        ],
      });
    } else {
      setMutationInProgress(false);
      ToastAndroid.show(
        "Invalid phone number / password!...",
        ToastAndroid.SHORT
      );
    }
  };

  const handleLogin = () => {
    setIsSubmitted(true);
    if (phoneNumber && password) {
      fetchValidUser();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <Text
        style={{
          color: "#6CC417",
          fontSize: 20,
          fontWeight: "bold",
          letterSpacing: 5,
        }}
      >
        CREDLOCK
      </Text> */}
      <View>
        <Image
          source={Logo}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </View>
      <Card
        containerStyle={{
          width: "100%",
          backgroundColor: "black",
          borderColor: "black",
        }}
      >
        <Input
          placeholder="Phone Number"
          leftIcon={{
            type: "font-awesome",
            name: "phone",
            size: 20,
            color: "#6CC417",
            marginRight: 8,
          }}
          value={phoneNumber}
          keyboardType="number-pad"
          label="Phone Number"
          onChangeText={(value) => {
            setPhoneNumber(value);
            setIsSubmitted(false);
          }}
          color="#6CC417"
          errorMessage={
            isSubmitted && !phoneNumber ? "Enter your phone number!..." : ""
          }
          inputStyle={{ fontWeight: "bold", letterSpacing: 2, fontSize: 18 }}
          placeholderTextColor="#6CC417"
        />
        <Input
          placeholder="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            size: 20,
            color: "#6CC417",
            marginRight: 8,
          }}
          value={password}
          label="Password"
          onChangeText={(value) => {
            setPassword(value);
            setIsSubmitted(false);
          }}
          color="#6CC417"
          secureTextEntry={true}
          errorMessage={
            isSubmitted && !password ? "Enter your password!..." : ""
          }
          inputStyle={{ fontWeight: "bold", letterSpacing: 2, fontSize: 18 }}
          placeholderTextColor="#6CC417"
        />

        <Button
          icon={
            mutationInProgress ? (
              <ActivityIndicator size="large" color="gray" />
            ) : (
              <Icon type="material" name="login" color="black" />
            )
          }
          title={mutationInProgress ? "Please wait..." : "Login"}
          buttonStyle={{ backgroundColor: "#6CC417" }}
          disabled={mutationInProgress}
          titleStyle={{
            color: "black",
            marginLeft: 5,
            fontWeight: "bold",
            fontSize: 18,
          }}
          onPress={() => {
            handleLogin();
          }}
        />
      </Card>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text style={styles.signupText}>Don't have an account?</Text>
        <Button
          type="clear"
          onPress={() => navigation.navigate("Signup")}
          title={"Create account"}
          titleStyle={{ color: "#6CC417", fontSize: 16 }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },

  loginContainer: {
    backgroundColor: "whitesmoke",
  },

  signupText: {
    color: "whitesmoke",
    fontSize: 16,
  },
});
