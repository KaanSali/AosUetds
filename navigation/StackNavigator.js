import React from 'react'
import {SafeAreaView, ScrollView, Image, View, Text, Button} from 'react-native';
import {createAppContainer,createDrawerNavigator, createStackNavigator , DrawerItems} from 'react-navigation';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import PersonelListScreen from '../screens/PersonelListScreen';
import VehicleListScreen from '../screens/VehicleListScreen';
import Logout from '../components/Logout';
import AddPersonelScreen from '../screens/AddPersonelScreen';
import AddVehicleScreen from '../screens/AddVehicleScreen';
import DrawerNavigator from './DrawerNavigator';


    const StackNavigator = createStackNavigator({
        Drawer : {screen : DrawerNavigator,navigationOptions:{header:null}},
        AddPersonel : {screen : AddPersonelScreen,navigationOptions:{header:null}},
        AddVehicle : {screen : AddVehicleScreen,navigationOptions:{header:null}}
    })

  export default createAppContainer(StackNavigator);
