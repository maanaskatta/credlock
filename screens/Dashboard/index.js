import React from "react";
import { View, Text, StatusBar, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Icon, FAB, Card } from "react-native-elements";

const fakeData = [
  {
  title: "Facebook",
  username: "maanaskatta6@gmail.com",
  password:"temp@123"
},{
  title: "Amazon",
  username: "maanaskatta6@gmail.com",
  password:"temp@123"
},{
  title: "Whatsapp",
  username: "maanaskatta6@gmail.com",
  password:"temp@123"
},
]

const CredentialCard = ({data}) => {
  return (
    <Card containerStyle={{backgroundColor:"black", borderColor:"#6CC417"}}> 
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
    </Card>
  );
}

export default function Dashboard({ navigation }) {
  
  const handleLogOut = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={{ color: "#6CC417", fontSize: 20, fontWeight:"bold" }}>Dashboard</Text>
        <Icon
          name='logout'
          type='material'
          color='#6CC417' 
          size={26}
          
          onPress={() => handleLogOut()} />
      </View>

      <ScrollView style={{flex: 3, paddingTop: 10}}> 
        {
          fakeData.map((credential, index) => {
            return (
              <CredentialCard key={index} data={credential}/>
            );
          })
        }
      </ScrollView>
      
       <TouchableOpacity
        style={{
          borderWidth: 1,
          alignItems: 'center',
          justifyContent: 'center',
          width: 60,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 60,
          backgroundColor: '#6CC417',
          borderRadius: 100,
        }}
      >
        <Icon onPress={() =>  navigation.navigate("AddCredentials")} name='add' size={30} color='black' />
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

  headerStyle : {
    flexDirection: "row",
    alignItems:"baseline",
    justifyContent: "space-between",
  },

  credentialTitle: { color: "#6CC417", fontSize: 20, fontWeight: "bold" },
  
  credentialLabel: {
    color: "gray",
    fontWeight:"bold"
  },

  credentialValue: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 5,
    fontSize: 14
  },

  credentialContainer: {
    flexDirection: "row",
    marginBottom: 5
  }
});
