import React from 'react'
import {SafeAreaView, ScrollView, Image, View, Text, Button} from 'react-native';
import {createAppContainer,createDrawerNavigator, createStackNavigator , DrawerItems} from 'react-navigation';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import PersonelListScreen from '../screens/PersonelListScreen';
import VehicleListScreen from '../screens/VehicleListScreen';
import Logout from '../components/Logout';
import AddPersonelScreen from '../screens/AddPersonelScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import {Root} from "native-base";
import PersonelDetailsScreen from '../screens/PersonelDetails';

const CustomDrawer = (props) =>(
    <Root style={{ flex:1 }}>
    <SafeAreaView style={{ flex:1 }}>
        <View style = {styles.drawerProfile}>
            <Image source={require('../assets/images/ProfilFoto.jpg')} style={styles.drawerProfileImage}/>
            <Text style={styles.drawerProfileName}>Kaan Salıı</Text>
        </View>
        <View style={{flex:3}}>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
        </View>
    </SafeAreaView>
    </Root>
)

const DrawerNavigator = createDrawerNavigator(
    {
        Personels : PersonelListScreen, 
        Vehicles : VehicleListScreen,
        PersonelDetails : PersonelDetailsScreen,
        AddPersonel : AddPersonelScreen,
        Logout : Logout
    },
    {
        contentComponent :CustomDrawer,
        hideStatusBar: false,
        drawerBackgroundColor: 'rgba(255,255,255,.9)',
        overlayColor: '#bfbfbf',
        contentOptions: {
            activeTintColor: '#fff',
            activeBackgroundColor: '#bfbfbf',
        }
    },
    );


  export default createAppContainer(DrawerNavigator);

  const styles = {
      drawerProfile : {
          marginTop:20,
          flex:1,
          alignItems: 'center',
          justifyContent : 'center',
      },
      drawerProfileImage : {
          height : vh(15),
          width : vh(15),
          borderRadius: vh(7.5),
      },
      drawerProfileName : {
          marginTop: 8,
          fontSize : 20
      }
      
  }