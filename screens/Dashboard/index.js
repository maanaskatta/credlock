import React from "react";
import { View, Text, StatusBar, StyleSheet, ScrollView } from "react-native";
import { Icon, FAB, Card } from "react-native-elements";

const fakeData = [
  {
  title: "Facebook",
  username: "maanaskatta6@gmail.com",
  password:"temp@123"
},
]

const CredentialCard = ({data}) => {
  return (
    <Card>
      <Card.Title>{data.title}</Card.Title>
      <View>
        <View>
          <Text>Username</Text>
          <Text>{data.username}</Text>
        </View>
        <View>
          <Text>Password</Text>
          <Text>{data.password}</Text>
        </View>
      </View>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={{ color: "#6CC417", fontSize: 20, fontWeight:"bold" }}>Dashboard</Text>
        <Icon
          name='logout'
          type='material'
          color='#6CC417' 
          size={26}
          
          onPress={() => console.log('hello')} />
      </View>

      <ScrollView>
        {
          fakeData.map((credential) => {
            return (
              <CredentialCard data={credential}/>
            );
          })
        }
      </ScrollView>

      <FAB title={() => <Icon name="add" color="black" size={26} type="material" />} placement="right" color="#6CC417" />
      
      

      

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
    flex: 1,
    flexDirection: "row",
    alignItems:"baseline",
    justifyContent:"space-between"
  }
});
