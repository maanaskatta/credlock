import React, {useState} from 'react';
import { View, Text, StyleSheet, StatusBar, ScrollView} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import * as Crypto from "crypto-js";
import axios from 'axios';


export default function AddCredentialScreen({navigation, route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [title, setTitle] = useState(route && route.params && route.params.data && route.params.data.title  ? route.params.data.title :  null);
    const [username, setUsername] = useState(route && route.params && route.params.data && route.params.data.username ? route.params.data.username :  null);
    const [password, setPassword] = useState(route && route.params && route.params.data && route.params.data.password ? route.params.data.password :  null);

    const encryptWithAES = (text) => {
        return Crypto.AES.encrypt(text, route.params.key).toString();
    }

    const addNewCredential =  () => {
        // let res = await axios.post("", {
            // title: encryptWithAES(title),
            // username: encryptWithAES(username),
            // password: encryptWithAES(password)
        // })

        console.log({
            title: encryptWithAES(title),
            username: encryptWithAES(username),
            password: encryptWithAES(password)
        });
    }

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
                        value={ title}
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
                        value={ username}
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
                        value={ password}
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
                addNewCredential();
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