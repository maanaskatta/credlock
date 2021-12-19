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
} from "react-native";
import { Icon, Card, Overlay } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import * as Crypto from "crypto-js";
import Loading from "../../component/Loading";
import deleteData from "../../RouteControllers/deleteData";

const CredentialCard = ({ data, navigation, encryptionKey, userID }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const [mutationInProgress, setMutationInProgress] = useState(false);

  const deleteCredential = async (data) => {
    setMutationInProgress(true);
    let res = await deleteData("deleteCredential", data);
    if (res) {
      ToastAndroid.show(
        "Credential deleted successfully...",
        ToastAndroid.SHORT
      );
      // setGates(gates.filter((item) => item.gateID !== gate.gateID));
      setMutationInProgress(false);
      setIsOverlayVisible(false);
    } else {
      ToastAndroid.show("Failed to delete credential!...", ToastAndroid.SHORT);
      setMutationInProgress(false);
      setIsOverlayVisible(false);
    }
  };

  return (
    <Card
      containerStyle={{
        backgroundColor: "black",
        borderColor: "#6CC417",
        width: "100%",
        marginLeft: -0,
      }}
    >
      <Card.Title style={styles.credentialTitle}>{data.title}</Card.Title>
      <View>
        <View style={styles.credentialContainer}>
          <Text style={styles.credentialLabel}>Username :</Text>
          <Text style={styles.credentialValue}>{data.username}</Text>
        </View>
        <View style={styles.credentialContainer}>
          <Text style={styles.credentialLabel}>Password :</Text>
          <Text style={styles.credentialValue}>{data.password}</Text>
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
  console.log("Encryption Key", route.params.encryptionKey);

  const decryptWithAES = (text) => {
    return Crypto.AES.decrypt(text, route.params.encryptionKey).toString(
      Crypto.enc.Utf8
    );
  };

  const getUserCredentialsData = async () => {
    console.log(route.params.userID);
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
      console.log("Creds", res.data);

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
  }, []);

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
        <ScrollView style={{ flex: 3, paddingTop: 10 }}>
          {credentials.map((credential, index) => {
            return (
              <View key={index}>
                <CredentialCard
                  encryptionKey={route.params.encryptionKey}
                  data={credential}
                  navigation={navigation}
                  userID={route.params.userID}
                />
              </View>
            );
          })}
        </ScrollView>
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
  },

  credentialTitle: { color: "#6CC417", fontSize: 16, fontWeight: "bold" },

  credentialLabel: {
    color: "gray",
    fontWeight: "bold",
  },

  credentialValue: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14,
  },

  credentialContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
});
