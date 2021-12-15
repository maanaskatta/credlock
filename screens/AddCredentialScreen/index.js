import React, {useState} from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import * as Crypto from "crypto-js";


export default function AddCredentialScreen({navigation}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [title, setTitle] = useState(null);
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    return (
        <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: "flex-start", flex: 1 }}
    >
      <Icon
        onPress={() => navigation.navigate("Dashboard")}
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
            onChangeText={(value) => {
              setUsername(value);
              setIsSubmitted(false);
            }}
            inputStyle={{ color: "white" }}
            containerStyle={{ margin: 20, marginLeft: 0 }}
            errorMessage={
              isSubmitted && !username ? "Enter your account username/email!..." : ""
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
              <Icon
                type="font-awesome"
                name="arrow-right"
                color="black"
                style={{ marginLeft: 10 }}
              />
            }
            iconPosition="right"
            title="Submit"
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
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: StatusBar.currentHeight + 20,
    padding: 20,
  },
});