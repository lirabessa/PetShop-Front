import { StatusBar } from 'expo-status-bar';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class App extends Component{

  render(){
    return (
      <View style={{flex:1 , flexDirection: "row"}}>
        <View style= {{width: 50, backgroundColor: "pink"}}></View>
      </View>
    )
  }
}

export default App

