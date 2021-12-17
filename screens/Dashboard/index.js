import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon, Card, Overlay } from "react-native-elements";
import { Button } from "react-native-elements/dist/buttons/Button";
import Loading from "../../component/Loading";

const fakeData = [
  {
    title: "Facebook",
    username: "maanaskatta6@gmail.com",
    password: "temp@123",
  },
  {
    title: "Amazon",
    username: "maanaskatta6@gmail.com",
    password: "temp@123",
  },
  {
    title: "Whatsapp",
    username: "maanaskatta6@gmail.com",
    password: "temp@123",
  },
];

const CredentialCard = ({ data, navigation, encryptionKey }) => {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
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
                key: encryptionKey,
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
              title="Delete"
              type="solid"
              buttonStyle={{ backgroundColor: "red", marginLeft: 10 }}
              titleStyle={{ color: "white" }}
            />
          </View>
        </View>
      </Overlay>
    </Card>
  );
};

export default function Dashboard({ navigation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogoutOverlayOpen, setIsLogoutOverlayOpen] = useState(false);

  const handleLogOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  const userData = {
    firstName: "Maanas Katta",
    phoneNumber: "5419304455",
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
      ) : (
        <ScrollView style={{ flex: 3, paddingTop: 10 }}>
          {fakeData.map((credential, index) => {
            return (
              <View key={index}>
                <CredentialCard
                  encryptionKey={
                    userData.firstName + " " + userData.phoneNumber
                  }
                  data={credential}
                  navigation={navigation}
                />
              </View>
            );
          })}
        </ScrollView>
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
      >
        <Icon
          onPress={() =>
            navigation.navigate("AddCredentials", {
              key: userData.firstName + " " + userData.phoneNumber,
            })
          }
          name="add"
          size={30}
          color="black"
        />
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
