import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Clipboard,
  TextInput,
} from "react-native";
import { Icon, Card, Overlay } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import * as Crypto from "crypto-js";
import Loading from "../../component/Loading";
import deleteData from "../../RouteControllers/deleteData";

const CredentialCard = ({
  data,
  navigation,
  encryptionKey,
  userID,
  setIsChangeSeen,
}) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);
  const [isUsernameCopied, setIsUsernameCopied] = useState(false);
  const [isPasswordCopied, setIsPasswordCopied] = useState(false);

  const deleteCredential = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteCredential", data);
    if (res) {
      ToastAndroid.show(
        "Credential deleted successfully...",
        ToastAndroid.SHORT
      );
      setIsChangeSeen(Math.random());
      setMutationInProgress(false);
      setIsOverlayVisible(false);
    } else {
      ToastAndroid.show("Failed to delete credential!...", ToastAndroid.SHORT);
      setMutationInProgress(false);
      setIsOverlayVisible(false);
    }
  };

  const copyUsernameToClipboard = (value) => {
    setIsUsernameCopied(true);
    Clipboard.setString(value);
    setInterval(() => {
      setIsUsernameCopied(false);
    }, 1000);
  };

  const copyPasswordToClipboard = (value) => {
    setIsPasswordCopied(true);
    Clipboard.setString(value);
    setInterval(() => {
      setIsPasswordCopied(false);
    }, 1000);
  };

  return (
    <Card
      containerStyle={{
        backgroundColor: "black",
        borderColor: "#6CC417",
        width: "100%",
        marginLeft: -0,
        borderRadius: 10,
      }}
    >
      <Card.Title style={styles.credentialTitle}>{data.title}</Card.Title>
      <View>
        <View style={styles.credentialContainer}>
          <Text style={styles.credentialLabel}>Username :</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.credentialValue}>{data.username}</Text>
            {!isUsernameCopied ? (
              <Icon
                name="clone"
                type="font-awesome"
                color="aqua"
                size={20}
                onPress={() => copyUsernameToClipboard(data.username)}
              />
            ) : (
              <Icon name="check" type="material" color="lime" size={20} />
            )}
          </View>
        </View>
        <View style={styles.credentialContainer}>
          <Text style={styles.credentialLabel}>Password :</Text>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={styles.credentialValue}>{data.password}</Text>
            {!isPasswordCopied ? (
              <Icon
                name="clone"
                type="font-awesome"
                color="aqua"
                size={20}
                onPress={() => copyPasswordToClipboard(data.password)}
              />
            ) : (
              <Icon name="check" type="material" color="lime" size={20} />
            )}
          </View>
        </View>
      </View>
      <View
        style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end" }}
      >
        <TouchableOpacity>
          <Icon
            name="pencil"
            type="font-awesome"
            color="yellow"
            size={22}
            onPress={() =>
              navigation.navigate("AddCredentials", {
                data: data,
                encryptionKey: encryptionKey,
                userID: userID,
                setIsChangeSeen: setIsChangeSeen,
              })
            }
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon
            name="trash"
            type="font-awesome"
            color="red"
            size={22}
            containerStyle={{ marginLeft: 15 }}
            onPress={() => setIsOverlayVisible(true)}
          />
        </TouchableOpacity>
      </View>

      <Overlay
        isVisible={isOverlayVisible}
        onBackdropPress={() => setIsOverlayVisible(false)}
      >
        <View>
          <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
            Are you sure to delete the credential?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Button
              title="Cancel"
              type="clear"
              titleStyle={{ color: "steelblue" }}
              onPress={() => setIsOverlayVisible(false)}
            />
            <Button
              title={mutationInProgress ? "Please wait..." : "Delete"}
              type="solid"
              onPress={() =>
                deleteCredential({
                  CredID: data.CredID,
                })
              }
              disabled={mutationInProgress}
              buttonStyle={{ backgroundColor: "red", marginLeft: 10 }}
              titleStyle={{ color: "white" }}
            />
          </View>
        </View>
      </Overlay>
    </Card>
  );
};

export default function Dashboard({ navigation, route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutOverlayOpen, setIsLogoutOverlayOpen] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [isChangeSeen, setIsChangeSeen] = useState(null);
  const [searchedCredential, setSearchedCredential] = useState(null);

  const decryptWithAES = (text) => {
    return Crypto.AES.decrypt(text, route.params.encryptionKey).toString(
      Crypto.enc.Utf8
    );
  };

  const getUserCredentialsData = async () => {
    let res = await axios
      .get("https://credlock.herokuapp.com/getUserCredentials", {
        params: {
          userID: route.params.userID,
        },
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);

        ToastAndroid.show("Failed to load data...", ToastAndroid.SHORT);
      });

    if (res && res.data) {
      setIsLoading(false);

      let finalData = res.data.map((cred) => {
        return {
          title: decryptWithAES(cred.title),
          username: decryptWithAES(cred.username),
          password: decryptWithAES(cred.password),
          CredID: cred.CredID,
          userID: cred.userID,
        };
      });

      setCredentials(finalData);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getUserCredentialsData();
  }, [isChangeSeen]);

  const handleLogOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={{ color: "#6CC417", fontSize: 24, fontWeight: "bold" }}>
          Dashboard
        </Text>
        <Icon
          name="logout"
          type="material"
          color="#6CC417"
          size={26}
          onPress={() => setIsLogoutOverlayOpen(true)}
        />
      </View>

      <TextInput
        value={searchedCredential}
        onChangeText={(e) => setSearchedCredential(e)}
        placeholder="Search..."
        placeholderTextColor="#6CC417"
        style={{
          backgroundColor: "black",

          paddingLeft: 15,
          marginTop: 10,
          borderColor: "#6CC417",
          borderWidth: 2,
          color: "#6CC417",
          paddingTop: 8,
          paddingBottom: 8,
          borderRadius: 10,
          fontSize: 18,
        }}
      />

      <Overlay
        isVisible={isLogoutOverlayOpen}
        onBackdropPress={() => setIsLogoutOverlayOpen(false)}
      >
        <View>
          <Text style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
            Are you sure to logout?
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginTop: 10,
            }}
          >
            <Button
              title="Cancel"
              type="clear"
              titleStyle={{ color: "steelblue" }}
              onPress={() => setIsLogoutOverlayOpen(false)}
            />
            <Button
              title="Logout"
              type="solid"
              buttonStyle={{ backgroundColor: "red", marginLeft: 10 }}
              titleStyle={{ color: "white" }}
              onPress={() => handleLogOut()}
            />
          </View>
        </View>
      </Overlay>

      {isLoading ? (
        <Loading />
      ) : credentials && credentials.length > 0 ? (
        !searchedCredential ||
        credentials.filter((el) =>
          searchedCredential
            ? el.title.toLowerCase().includes(searchedCredential.toLowerCase())
            : false
        ).length > 0 ? (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}
            style={{ flex: 3, paddingTop: 10 }}
          >
            {credentials
              .filter((el) =>
                searchedCredential
                  ? el.title
                      .toLowerCase()
                      .includes(searchedCredential.toLowerCase())
                  : true
              )
              .map((credential, index) => {
                return (
                  <View key={index}>
                    <CredentialCard
                      encryptionKey={route.params.encryptionKey}
                      data={credential}
                      navigation={navigation}
                      userID={route.params.userID}
                      setIsChangeSeen={setIsChangeSeen}
                    />
                  </View>
                );
              })}
          </ScrollView>
        ) : (
          <View
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70%",
            }}
          >
            <Text style={{ color: "#6CC417", fontSize: 20 }}>
              No results found!...
            </Text>
          </View>
        )
      ) : (
        <View
          style={{
            flex: 3,
            paddingTop: 10,

            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#6CC417",
              fontSize: 22,
              fontWeight: "bold",
              textShadowColor: "lime",
              textShadowRadius: 5,
            }}
          >
            No credentials found!...
          </Text>
        </View>
      )}

      <TouchableOpacity
        style={{
          borderWidth: 1,
          alignItems: "center",
          justifyContent: "center",
          width: 60,
          position: "absolute",
          bottom: 20,
          right: 20,
          height: 60,
          backgroundColor: "#6CC417",
          borderRadius: 100,
        }}
        onPress={() =>
          navigation.navigate("AddCredentials", {
            encryptionKey: route.params.encryptionKey,
            userID: route.params.userID,
            setIsChangeSeen: setIsChangeSeen,
          })
        }
      >
        <Icon name="add" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    paddingTop: StatusBar.currentHeight + 13,
    padding: 20,
  },

  headerStyle: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    paddingBottom: 5,
  },

  credentialTitle: { color: "#6CC417", fontSize: 18, fontWeight: "bold" },

  credentialLabel: {
    color: "#949996",
    fontWeight: "bold",
    fontSize: 14,
  },

  credentialValue: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 16,
    marginRight: 10,
  },

  credentialContainer: {
    flexDirection: "column",
    marginBottom: 10,
  },
});
