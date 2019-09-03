import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import {Item,Picker,Icon,Label} from 'native-base';
import {SoforRole} from '../models/Roles/SoforRole';
import MultiSelect from 'react-native-multiple-select';

export default class UetdsPicker extends Component {
constructor(props){
    super(props);
    this.state = {
        selectedItems : [],
    }
}   
/* Kullanımı */                        
/*
<UetdsMultiPicker 
    placeholder={"Konuştuğu Diller"} 
    items={languages} 
    onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} 
    selectedItems={this.state.KonustuguDiller}/>
 */
/* onSelectedItemsChange = selectedItems => {
    this.setState({ selectedItems });
  } */

     render() {
        return (
            <View style={{ flex : 1,marginTop:20, marginLeft:16,marginRight:16}}>
                <MultiSelect
                    items={this.props.items}
                    uniqueKey="id"
                    ref={(component) => {this.multiSelect = component}} 
                    onSelectedItemsChange={this.props.onSelectedItemsChange}
                    selectedItems ={this.props.selectedItems}
                    selectText = {this.props.placeholder}
                    searchInputPlaceholderText = {this.props.placeholder}
                    onChangeInput = {(text) => console.log(text)}
                    submitButtonText = "Seç"
                    itemsSelectedText = "adet seçildi"
                    styleMainWrapper = {{backgroundColor : "#f1f1f1",borderRadius : 12}}
                    styleSelectorContainer = {{backgroundColor : "#f1f1f1",borderRadius : 12}}
                    styleItemsContainer = {{backgroundColor : "#f1f1f1",borderRadius : 12}}
                    styleListContainer = {{backgroundColor : "#f1f1f1",borderRadius : 12}}
                    styleDropdownMenu = {{backgroundColor : "#f1f1f1",borderRadius : 12}}
                    styleDropdownMenuSubsection = {{backgroundColor : "#f1f1f1",borderRadius : 12,flex : 1}}
                    styleTextDropdown ={{marginLeft : 15,fontSize :15}}/>
                    </View>
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

