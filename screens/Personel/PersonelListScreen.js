import React, { Component } from 'react'
import { Text, View,ScrollView,TouchableOpacity } from 'react-native'
import { ListItem } from '../../components/Items';
import {vh} from 'react-native-expo-viewport-units';
import {Header,Left,Right,Body, Icon, Button} from 'native-base';
import {LinearGradient} from 'expo-linear-gradient';
import styles from '../../constants/Styles'
import UetdsHeader from '../../components/UetdsHeader';
import { withNavigation } from 'react-navigation';
class PersonelListScreen extends Component {
    constructor(props){
        super(props)
        this.state={
            list : []
        }
    }
    static navigationOptions = {
        headerMode : 'none',
        drawerLabel : 'Personeller'
    };    
    getPersonelList = new Promise(async function(resolve,reject){
        try{
            fetch('http://31.169.71.253:8665/api/Personel/GetPersonelList',{
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
        this.getPersonelList.then((perList)=>{
            perList = JSON.parse(perList);
            let items = perList.map((item) =>
                <ListItem key={item.PersonalInfo.KimlikNo} onPress={()=> this.props.navigation.navigate("PersonelDetails",{KimlikNo: item.PersonalInfo.KimlikNo})}  image={{uri : "http://31.169.71.253:8665/"+item.PersonelFotograflari.ProfilFoto}} username={item.PersonalInfo.Ad + " " + item.PersonalInfo.Soyad} userRole={item.Role.RoleName}/>
            )
            this.setState({list:items}) 
        }).catch((error) =>{
            console.log(error)
        })}

    render() {
        return (
            <View styles={styles.container}>
                <UetdsHeader title="Personeller">                    
                    <LinearGradient start={[0,0.5]} end={[1,0.5]} colors={['#020024','#090979','#49a9f8']} style={styles.addButton} >
                        <TouchableOpacity style={{height:60,width:60,alignItems:"center",justifyContent:"center"}} onPress={() => this.props.navigation.navigate("AddPersonel")}>
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

export default withNavigation(PersonelListScreen);