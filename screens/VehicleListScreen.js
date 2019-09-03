import React, { Component } from 'react'
import { Text, View,ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from '../components/Items';
import {vh} from 'react-native-expo-viewport-units';
import {Header,Left,Right,Body, Icon} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../constants/Styles'
import UetdsHeader from '../components/UetdsHeader';
export default class VehicleListScreen extends Component {
    static navigationOptions = {
        headerMode : 'none',
        drawerLabel : 'Araçlar'
    }
    render() {
        return (
            <View styles={styles.container}>
                <UetdsHeader title="Araçlar">
                <LinearGradient start={[0,0.5]} end={[1,0.5]} colors={['#020024','#090979','#49a9f8']} style={styles.addButton}>
                        <TouchableOpacity style={{height:60,width:60,alignItems:"center",justifyContent:"center"}}>
                            <Icon name = "add" style={{color:"white"}}/>
                        </TouchableOpacity>
                    </LinearGradient>
                </UetdsHeader>
                    <View style={{height:vh(100),backgroundColor:"#fff"}}>
                    <ScrollView style={{height:vh(100)}}>
                        <ListItem image={require('../assets/images/ProfilFoto.jpg')} username={"Kaan Salı"} userRole={"Yönetici"}/>
                        <ListItem image={require('../assets/images/ProfilFoto.jpg')} username={"Kaan Salı2"} userRole={"Yönetici"}/>
                    </ScrollView>
                </View>
                
            </View>
        )
    }
}