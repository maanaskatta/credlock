import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import * as Crypto from "crypto-js";
import insertData from "../../RouteControllers/insertData";
import updateData from "../../RouteControllers/updateData";

export default function AddCredentialScreen({ navigation, route }) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const [title, setTitle] = useState(
    route && route.params && route.params.data && route.params.data.title
      ? route.params.data.title
      : null
  );

  const [username, setUsername] = useState(
    route && route.params && route.params.data && route.params.data.username
      ? route.params.data.username
      : null
  );
  const [password, setPassword] = useState(
    route && route.params && route.params.data && route.params.data.password
      ? route.params.data.password
      : null
  );

  const encryptWithAES = (text) => {
    return Crypto.AES.encrypt(text, route.params.encryptionKey).toString();
  };

  const addCredential = async (data) => {
    let res = await insertData("addCredential", data);
    if (res) {
      setMutationInProgress(false);
      ToastAndroid.show(
        "Credential details added successfully...",
        ToastAndroid.SHORT
      );
      navigation.goBack();
      route.params.setIsChangeSeen(Math.random());
    } else {
      setMutationInProgress(false);
      ToastAndroid.show("Failed to add credentials!...", ToastAndroid.SHORT);
    }
  };

  const updateCredential = async (data) => {
    let res = await updateData("updateCredential", data);
    if (res) {
      setMutationInProgress(false);
      ToastAndroid.show(
        "Credential details updated successfully...",
        ToastAndroid.SHORT
      );
      navigation.goBack();
      route.params.setIsChangeSeen(Math.random());
    } else {
      setMutationInProgress(false);
      ToastAndroid.show("Failed to update credentials!...", ToastAndroid.SHORT);
    }
  };

  const handleSubmit = () => {
    let data = {
      title: encryptWithAES(title),
      username: encryptWithAES(username),
      password: encryptWithAES(password),
      userID: route.params.userID,
    };

    if (title && username && password) {
      setMutationInProgress(true);
      if (route && route.params && route.params.data) {
        let finalData = {
          ...data,
          CredID: route.params.data.CredID,
        };
        updateCredential(finalData);
      } else {
        addCredential(data);
      }
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "flex-start", flex: 1 }}
    >
      <Icon
        onPress={() => navigation.goBack()}
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
          Add new credential
        </Text>
        <View style={{ flex: 1 }}>
          <Input
            placeholder="Credential title..."
            leftIcon={{
              type: "font-awesome",
              name: "user",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            value={title}
            onChangeText={(value) => {
              setTitle(value);
              setIsSubmitted(false);
            }}
            inputStyle={{ color: "white" }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            errorMessage={
              isSubmitted && !title ? "Enter your credential title!..." : ""
            }
          />

          <Input
            placeholder="Username/email..."
            leftIcon={{
              type: "font-awesome",
              name: "envelope",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            value={username}
            onChangeText={(value) => {
              setUsername(value);
              setIsSubmitted(false);
            }}
            inputStyle={{ color: "white" }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            errorMessage={
              isSubmitted && !username
                ? "Enter your account username/email!..."
                : ""
            }
          />

          <Input
            placeholder="Password..."
            leftIcon={{
              type: "font-awesome",
              name: "lock",
              color: "#6CC417",
              style: { marginRight: 10 },
            }}
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              setIsSubmitted(false);
            }}
            inputStyle={{ color: "white" }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            errorMessage={
              isSubmitted && !password ? "Enter your account password!..." : ""
            }
          />
          <Button
            icon={
              mutationInProgress ? (
                <ActivityIndicator
                  size="large"
                  color="gray"
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
            title={mutationInProgress ? "Please wait" : "Submit"}
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
              handleSubmit();
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
