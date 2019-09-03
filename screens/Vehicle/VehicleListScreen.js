import React, { Component } from 'react'
import { Text, View,ScrollView, TouchableOpacity } from 'react-native'
import { ListItem } from '../../components/Items';
import {vh} from 'react-native-expo-viewport-units';
import {Header,Left,Right,Body, Icon} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../../constants/Styles'
import UetdsHeader from '../../components/UetdsHeader';
export default class VehicleListScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            list : []
        }
    }
    static navigationOptions = {
        headerMode : 'none',
        drawerLabel : 'Araçlar'
    };    
    getAracList = new Promise(async function(resolve,reject){
        try{
            fetch('http://31.169.71.253:8665/api/Arac/GetAracList',{
                method : 'GET',
                headers:{
                    Accept: 'application/json',
                    'Content-Type' : 'application/json'
                },
            }).then(function(response){
                return response.json();
            }).then(function(myJson){
                resolve(JSON.stringify(myJson))
            })
        }catch(error){
            reject(JSON.stringify(error));
        }}
    )
    async componentDidMount(){
        this.getAracList.then((perList)=>{
            perList = JSON.parse(perList);
            let items = perList.map((item) =>
                <ListItem key={item.AracInfo.Plaka} onPress={()=> this.props.navigation.navigate("VehicleDetails",{Plaka: item.AracInfo.Plaka})}  image={{uri : "http://31.169.71.253:8665/"+item.AracFotograflari.On}} title={item.AracInfo.Plaka} subtitle={`${item.AracInfo.Marka} ${item.AracInfo.Model}`}/>
            )
            this.setState({list:items}) 
        }).catch((error) =>{
            console.log(error)
        })}

    render() {
        return (
            <View styles={styles.container}>
                <UetdsHeader title="Araçlar">                    
                    <LinearGradient start={[0,0.5]} end={[1,0.5]} colors={['#020024','#090979','#49a9f8']} style={styles.addButton} >
                        <TouchableOpacity style={{height:60,width:60,alignItems:"center",justifyContent:"center"}} onPress={() => this.props.navigation.navigate("AddVehicle")}>
                            <Icon name = "add" style={{color:"white"}}/>
                        </TouchableOpacity>
                    </LinearGradient>
                </UetdsHeader>
                    <View style={{height:vh(100),backgroundColor:"#fff"}}>
                    <ScrollView style={{height:vh(100)}}>
                        {this.state.list}
                    </ScrollView>
                </View>
            </View>
        ) 
    }
}