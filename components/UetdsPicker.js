    /* Kullanımı */
    /*                  
    <UetdsPicker placeholder={"Cinsiyet"}>
        <Picker.Item label="Erkek" value="Erkek" />
        <Picker.Item label="Kadın" value="Kadın"/>   
    </UetdsPicker> 
    */
import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Item,Picker,Icon,Label} from 'native-base';
import {SoforRole} from '../models/Roles/SoforRole';
import MultiSelect from 'react-native-multiple-select';

export default class UetdsPicker extends Component {
constructor(props){
    super(props);
    this.state = {
        selected : undefined
    }
}   
onValueChange2(value) {
    this.setState({
      selected: value
    });
    if(this.props.onValueChange){
        this.props.onValueChange(value)
    }
  }
     render() {
        return (
            <Item picker style={styles.inputs}>
                <Label style={{marginLeft : 15,flex:0.5}}>{this.props.placeholder}</Label>
                <Picker style={styles.inputText} prompt="Seçiniz" mode = "dialog" iosIcon={<Icon name="arrow-down"/>} placeholder = {this.props.placeholder} selectedValue={this.state.selected} onValueChange={this.onValueChange2.bind(this)}>
                    {this.props.children}
                </Picker>
             </Item>
        )
    }


}

const styles = StyleSheet.create({
    inputs:{
    flex:1,
    borderRadius : 12,
    borderWidth : 2,
    marginLeft : 16,
    marginRight : 16,
    minHeight :45,
    marginTop :15,
    alignItems : "center",
    backgroundColor : "#f1f1f1"
},
inputLabel : {
    fontSize : 12.5,
    fontWeight : "bold",
    position : "relative",
    backgroundColor : "rgba(0,0,0,0)",
    borderRadius : 12,
    alignSelf : "center",
},inputText : {
    flex:2,
    alignItems : "center",
    fontWeight : "bold",
    fontSize : 15,
    marginLeft : 20,
    marginRight : 20
}})

