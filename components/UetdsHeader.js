import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Header, Left, Icon, Body, Right } from 'native-base';
import styles from '../constants/Styles';
import {vh} from 'react-native-expo-viewport-units';
import { withNavigation } from 'react-navigation';

class UetdsHeader extends Component {
    render() {
        return (
            <Header style={styles.header}>
                    <Left  style={{flex:1}}>
                        <Icon style={styles.icon} name="menu" onPress={()=>this.props.navigation.openDrawer()} />
                    </Left>
                    <Body style={{flex:1,justifyContent:"center",alignItems:"center",height:vh(10)}}>
                        <Text style={styles.headerText}>{this.props.title}</Text>
                    </Body>
                    <Right style={{flex:1}}>
                    {this.props.children}
                    </Right>
            </Header>
        )
    }
}
export default withNavigation(UetdsHeader);