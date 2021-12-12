import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Card, Input, Button, Icon } from "react-native-elements";

export default function Login() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "#6CC417",
          fontSize: 20,
          fontWeight: "bold",
          letterSpacing: 5,
        }}
      >
        CREDLOCK
      </Text>
      <Card
        containerStyle={{
          width: "100%",
          backgroundColor: "black",
          borderColor: "black",
        }}
      >
        <Input
          placeholder="Username"
          leftIcon={{
            type: "font-awesome",
            name: "user",
            size: 18,
            color: "#6CC417",
            marginRight: 5,
          }}
          label="Username"
          onChangeText={(value) => setUsername(value)}
          color="#6CC417"
        />
        <Input
          placeholder="Password"
          leftIcon={{
            type: "font-awesome",
            name: "lock",
            size: 18,
            color: "#6CC417",
            marginRight: 5,
          }}
          label="Password"
          onChangeText={(value) => setPassword(value)}
          color="#6CC417"
          secureTextEntry={true}
        />

        <Button
          icon={<Icon type="material" name="login" color="black" />}
          title="Login"
          buttonStyle={{ backgroundColor: "#6CC417" }}
          titleStyle={{ color: "black", marginLeft: 5 }}
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
          title={"Create account"}
          titleStyle={{ color: "#6CC417", fontSize: 14 }}
        />
      </View>
    </View>
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
  },
});
