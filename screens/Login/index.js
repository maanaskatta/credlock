import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Card, Input, Button, Icon } from "react-native-elements";
import getData from "../../RouteControllers/getData";
import SelectDropdown from "react-native-select-dropdown";
import Loading from "../../component/Loading";

const SelectUser = ({ users, setSelectedUser }) => {
  return (
    <SelectDropdown
      data={users.map((el) => el.fullName)}
      onSelect={(selectedItem, index) => setSelectedUser(users[index])}
      buttonStyle={{
        backgroundColor: "black",
        borderWidth: 1,
        borderColor: "#6CC417",
        width: "100%",
        marginBottom: 10,
      }}
      buttonTextStyle={{ color: "#6CC417", fontWeight: "bold" }}
      buttonTextAfterSelection={(selectedItem, index) => selectedItem}
      defaultButtonText="Select a user"
      renderDropdownIcon={() => (
        <Icon name="chevron-down" type="font-awesome" color="#6CC417" />
      )}
      rowStyle={{ backgroundColor: "#6CC417", marginBottom: 4 }}
      rowTextStyle={{ color: "black", fontWeight: "bold" }}
    />
  );
};

export default function Login({ navigation }) {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    let res = await getData("findUser");
    if (res?.length > 0) {
      setUsers(res);
      setIsLoading(false);
    } else {
      alert("No users found!...");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchValidUser = () => {
    setMutationInProgress(true);
    if (selectedUser.password === password) {
      let key = selectedUser.fullName + selectedUser.phoneNumber;
      setMutationInProgress(false);
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "Dashboard",
            params: { encryptionKey: key, userID: selectedUser.userID },
          },
        ],
      });
    } else {
      setMutationInProgress(false);
      alert("Invalid phone number / password!...");
    }
  };

  const handleLogin = () => {
    setIsSubmitted(true);
    if (selectedUser && password) {
      fetchValidUser();
    } else {
      alert("User/Password cannot be empty!...");
    }
  };

  if (!isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text
            style={{
              color: "#6CC417",
              fontSize: 28,
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Credlock
          </Text>
        </View>
        <Card
          containerStyle={{
            width: "100%",
            backgroundColor: "black",
            borderColor: "black",
          }}
        >
          {users?.length > 0 ? (
            <SelectUser users={users} setSelectedUser={setSelectedUser} />
          ) : (
            <></>
          )}

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
            inputStyle={{
              fontWeight: "bold",
              letterSpacing: 2,
              fontSize: 18,
              color: "#6CC417",
            }}
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
  return <Loading />;
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
