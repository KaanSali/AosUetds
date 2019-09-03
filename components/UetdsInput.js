
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { Input,Item,Label } from 'native-base'

export default class UetdsInput extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <Item floatingLabel style={styles.inputs}>
                <Label style={styles.inputLabel}>{this.props.placeholder}</Label> 
                <Input style={styles.inputText} onChangeText={this.props.onChangeText} value={this.props.value} /> 
            </Item>
        )
    }

}

const styles = StyleSheet.create({
    inputs:{
        borderRadius : 12,
        borderWidth : 2,
        marginLeft : 16,
        marginRight : 16,
        minHeight :45,
        alignItems : "center",
        backgroundColor : "#f1f1f1"
    },
    inputLabel : {
        fontSize : 12.5,
        fontWeight : "bold",
        position : "relative",
        backgroundColor : "rgba(0,0,0,0)",
        borderRadius : 12,
        alignSelf : "center"
    },
    inputText : {
        alignItems : "center",
        fontWeight : "bold",
        fontSize : 15,
        marginLeft : 20,
        marginRight : 20
    }
})
