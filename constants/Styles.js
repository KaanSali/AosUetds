import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {vh,vw ,vmax ,vmin} from 'react-native-expo-viewport-units';

export default StyleSheet.create({
        container:{
            flex:1,
            backgroundColor : "#fff",
            height : vh(100),
            paddingBottom: 30
        },
        header:{
            justifyContent:"center",
            backgroundColor:"#fff",
            alignItems:"center",
            height:vh(10)
        },
        headerText:{
            fontSize:vw(5),
            flex:1,
            paddingTop:vh(2.5)
        },
        headerBody:{
            flex:1,
            justifyContent:"center",
            alignItems:"center",
            height:vh(10)
        },
        addButton:{
            height: 60,
            width : 60,
            borderRadius : 30,
            backgroundColor : "rgb(2,0,36)",
            justifyContent: "center",
            alignItems:"center"
        },
        icon:{marginLeft : 10,
            height:vh(10),
            width:vw(10),
            fontSize:35,
            paddingTop:vh(2.5)
        },
        imageModal : {
            height: 200,
            bottom : 0,
            flex:1
        },
        
    })
