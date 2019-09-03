import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'
import { Content, ActionSheet } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

var Buttons = ["Galeriden Seç", "Kamerayla Çek","İptal"];
var DESTRUCTIVE_INDEX =2;
var CANCEL_INDEX = 3;
export default class UetdsImage extends Component {
    constructor(props){
        super(props);
        var blankImage = require("../assets/images/blankImage.png");
        this.state = {
            Photo : blankImage
        }
    }

    ImageAction(button){ 
        switch (button){
            case 0:
                this.PickImage();
                break;
            case 1:
                this.CaptureImage();
                break;
        }
    }

    PickImage(){
        ImagePicker.launchImageLibraryAsync({
            aspect:[512,512],
            allowsEditing: true,
            quality :1,
            base64: true,
            mediaTypes : "Images"
          }).then(image => {
            this.props.base64(image.base64)
            this.setState({
                Photo : {uri : image.uri}
            })
            this.props.onChange();
        });
    }

    CaptureImage(){
        ImagePicker.launchCameraAsync({
            aspect:[512,512],
            allowsEditing: true,
            quality :1,
            base64: true,
            mediaTypes : "Images"
          }).then(image => {
            this.props.base64(image.base64)
            this.setState({
                Photo : {uri : image.uri}
            })
            this.props.onChange();

        });
    }

    render() {
        if(this.props.didImageLoaded === true){
            console.log("true")
            return (
                <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
                <Content>
                    <TouchableWithoutFeedback onPress={() => ActionSheet.show({
                        options : Buttons,
                        cancelButtonIndex : CANCEL_INDEX,
                        destructiveButtonIndex:  DESTRUCTIVE_INDEX,
                        title : "Görüntü Seçme Yöntemi"
                    },
                        buttonIndex => {
                            this.ImageAction(buttonIndex); 
                        })}> 
                        <Image source={this.state.Photo} style={styles.borderImg}/>
                    </TouchableWithoutFeedback>
                </Content>
                <Text style={{flex:1,fontSize:22}}> {this.props.label} </Text>
                </View>
            )
        }else{
            console.log("false")
            return (
                <View style={{justifyContent:"center",flex:1,alignItems:"center"}}>
                <Content>
                    <TouchableWithoutFeedback onPress={() => ActionSheet.show({
                        options : Buttons,
                        cancelButtonIndex : CANCEL_INDEX,
                        destructiveButtonIndex:  DESTRUCTIVE_INDEX,
                        title : "Görüntü Seçme Yöntemi"
                    },
                        buttonIndex => {
                            this.ImageAction(buttonIndex); 
                        })}> 
                        <Image source={{uri : this.props.imageSrc}} style={styles.borderImg}/>
                    </TouchableWithoutFeedback>
                </Content>
                <Text style={{flex:1,fontSize:22}}> {this.props.label} </Text>
                </View>
            )
        }
    }
    }

const styles = StyleSheet.create({
    borderImg : {
        flex:1,
        height:140,
        width:140,
        borderRadius: 12,
        borderWidth: 2,
        borderColor : 'lightgray'
    }
})
