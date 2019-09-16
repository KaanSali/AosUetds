import React from 'react';
import { Text, Image, StyleSheet, View ,TouchableOpacity} from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

export class ListItem extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <TouchableOpacity style={this.styles.shadow} underlayColor="white" onPress={this.props.onPress}>
        <View style={[this.styles.itemContainer , this.styles.flex_row, this.styles.shadow]}>
          <View style={this.styles.imageContainer}>
            <Image source={{uri : this.props.image + `?${new Date()}`}} style={this.styles.image}/>
          </View>
          <View style={this.styles.textContainer}>
            <Text style={this.styles.usernameText}>{this.props.title}</Text>
            <Text style={this.styles.userRoleText}>{this.props.subtitle}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  styles = StyleSheet.create({
    flex_row : {
      flex:1,
      flexDirection:'row'
    },
    shadow:{
      backgroundColor: '#ffffff',
      shadowColor: "#bfbfbf",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      borderColor:'#ffffff',
      elevation: 4
    },
    itemContainer:{
      width: vw(90),
      height: vh(15),
      alignSelf: 'center',
      marginBottom: 5
    },
    textContainer:{
      flex:1,
      alignSelf:'center'
    },
    imageContainer:{
    },
    image:{ 
      height: 80,
      width: 80,
      borderRadius: 80,
      margin:20
    },
    usernameText: {
      textAlign : 'center',
      fontSize: 23,
      fontFamily : 'Roboto'
    },
    userRoleText : {
      marginBottom:0,
      fontFamily : 'Roboto',
      fontSize : 18,
      textAlign : 'center'
    }
  })
} 
7 