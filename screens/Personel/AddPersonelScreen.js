import React, { Component } from 'react'
import { Text, View, Image , ScrollView, KeyboardAvoidingView, TouchableOpacity, Button } from 'react-native'
import styles from '../../constants/Styles'
import UetdsHeader from '../../components/UetdsHeader';
import { Form, Container, Picker } from 'native-base';
import {vh, vw} from 'react-native-expo-viewport-units'
import { withNavigation } from 'react-navigation';
import UetdsPicker from '../../components/UetdsPicker';
import UetdsInput from '../../components/UetdsInput';
import UetdsImage from '../../components/UetdsImage';
import UetdsMultiPicker from '../../components/UetdsMultiPicker';
import {LinearGradient} from 'expo-linear-gradient';
import BlankRole from '../../models/Roles/BlankRole';
import YoneticiRole from '../../models/Roles/YoneticiRole';
import SoforRole from '../../models/Roles/SoforRole';

const languages = [{
    id : "Türkçe",
    name: "Türkçe"
},{
    id : "İngilizce",
    name: "İngilizce"
},{
    id : "Almanca",
    name: "Almanca"
},{
    id : "Arapça",
    name: "Arapça"
},
]
class AddPersonelScreen extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        headerMode : 'none'
    } 
    constructor(props){ 
        super(props);
        this.state = {
            /* personel:{ */
                Id: undefined,
                Role : new SoforRole().state,
                /* PersonalInfo : { */
                    Ad:"",
                    Soyad:"",
                    Cinsiyet : "Erkek",
                    Email: "",
                    KimlikNo:"",
                    Telefon:"",
                    Uyruk:"",
                    Sifre:"",
                /* }, */
                /* PersonelWorkInfo:{ */
                    Aktiflik : true,
                /* }, */
                /* PersonelFotograflari:{ */
                    Ehliyet : "",
                    ProfilFoto : "",
                    Psikoteknik : "",
                    SabikaKaydi : "",
                    SrcBelgesi : "",
                /* }, */
                KonustuguDiller:[],
            /* } */

        }
    }
 
    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                <UetdsHeader title="Personel Kaydı"/>
                <View style={{height:vh(86),backgroundColor:"#fff"}}>
                    <ScrollView style={{flex:1,flexDirection:"column"}}>
                        <UetdsImage label="Profil Fotoğrafı" base64={(b64) => this.setState({ProfilFoto:b64})} />
                    <Form style={{flex:1}}>
                        <UetdsInput placeholder={"Adı"} onChangeText={(text) => this.setState({Ad:text})}/>
                        <UetdsInput placeholder={"Soyadı"} onChangeText={(text) => this.setState({Soyad:text})}/>
                        <UetdsInput placeholder={"Uyruğu"} onChangeText={(text) => this.setState({Uyruk:text})}/>
                        <UetdsInput placeholder={"Kimlik Numarası"} onChangeText={(text) => this.setState({KimlikNo:text})}/>
                        <UetdsInput placeholder={"Şifre"} onChangeText={(text) => this.setState({Sifre:text})}/>
                        <UetdsPicker placeholder={"Cinsiyet"} onValueChange={this.onGenderChange.bind(this)}>
                            <Picker.Item label="Erkek" value="Erkek" />
                            <Picker.Item label="Kadın" value="Kadın"/>   
                        </UetdsPicker>
                        <UetdsPicker placeholder={"Personel Türü"} onValueChange={this.onChangeRole.bind(this)}>
                            <Picker.Item label="Şoför" value="Şoför"/>   
                            <Picker.Item label="Yönetici" value="Yönetici"/>
                        </UetdsPicker>
                        <UetdsInput placeholder={"Telefon Numarası"} onChangeText={(text) => this.setState({Telefon:text})}/>
                        <UetdsInput placeholder={"Email Adresi"} onChangeText={(text) => this.setState({Email:text})}/>
                        <UetdsMultiPicker placeholder={"Konuştuğu Diller"} items={languages} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} selectedItems={this.state.KonustuguDiller}/>
                        <View style={{marginTop:15,marginBottom:15}}>
                            <View style={{flex:1,flexDirection:"row"}}>
                                <UetdsImage label="Ehliyet" base64={(b64) => this.setState({Ehliyet:b64})}/>
                                <UetdsImage label="Src Belgesi" base64={(b64) => this.setState({SrcBelgesi:b64})}/>
                            </View>
                            <View style={{flex:1,flexDirection : "row"}}>
                                <UetdsImage label="Sabıka Kaydı" base64={(b64) => this.setState({SabikaKaydi:b64})}/>
                                <UetdsImage label="Psikoteknik" base64={(b64) => this.setState({Psikoteknik:b64})}/>
                            </View>
                        </View>
                    </Form>
                        <TouchableOpacity style={{height:50,width:vw(50),marginBottom:30,alignSelf:"center",flex:1}} onPress={() => this.savePersonel()}>
                            <LinearGradient start={[0,0.5]} end={[1,0.5]} colors={['#020024','#090979','#49a9f8']} style={{height:50,width:vw(50),borderRadius : 0,backgroundColor : "rgb(2,0,36)",justifyContent: "center",alignItems:"center"}} >
                                <Text style={{fontSize:20,fontWeight:"bold",color:"#fff"}}>Kaydet</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
            </Container>

        )
    }

    showData(){
        console.log(JSON.stringify(this.state))
    }
    
    onChangeRole(roleString){
        alert(roleString);
        switch (roleString){
            case "Yönetici":
                const role = new YoneticiRole().state;
                this.setState({Role:role});
                break;
            case "Şoför":
                const role2 = new SoforRole().state;
                this.setState({Role:role2});
                break;
        }
    }
    onSelectedItemsChange = selectedItems => {
        this.setState({ KonustuguDiller: selectedItems });
      }
    onGenderChange(value){
        this.setState({Cinsiyet: value})
    }
    async savePersonel(){
        try{
        let data = {
            Role: this.state.Role,
            PersonalInfo:{
                Ad: this.state.Ad,
                Soyad : this.state.Soyad,
                Cinsiyet : this.state.Cinsiyet,
                Email: this.state.Email,
                KimlikNo:this.state.KimlikNo,
                Telefon:this.state.Telefon,
                Uyruk:this.state.Uyruk,
                Sifre:this.state.Sifre,
             }, 
             PersonelWorkInfo:{ 
                Aktiflik : true,
             },
             PersonelFotograflari:{ 
                Ehliyet : this.state.Ehliyet,
                ProfilFoto : this.state.ProfilFoto,
                Psikoteknik : this.state.Psikoteknik,
                SabikaKaydi : this.state.SabikaKaydi,
                SrcBelgesi : this.state.SrcBelgesi,
            }, 
            KonustuguDiller:this.state.KonustuguDiller,
        } 
        let response = await fetch('http://31.169.71.253:8665/api/Personel/AddPersonel',{
            method : 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        alert(JSON.stringify(response))
    }catch(error){
        console.error(JSON.stringify(error));
    }}
}
export default withNavigation(AddPersonelScreen);