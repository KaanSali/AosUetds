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
import {withNavigationFocus} from 'react-navigation'

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

class PersonelDetailsScreen extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        headerMode : 'none'
    } 
    didFocusSub = this.props.navigation.addListener(
        'willFocus',
        async payload =>{
            let response = await this.getPersonelDetails(this);
            try{
                var myJson = JSON.parse(response);
                this.setState({
                    Id:myJson.Id,
                    Role:myJson.Role,
                    Ad:myJson.PersonalInfo.Ad,
                    Soyad:myJson.PersonalInfo.Soyad,
                    KimlikNo:myJson.PersonalInfo.KimlikNo,
                    Email:myJson.PersonalInfo.Email,
                    Telefon: myJson.PersonalInfo.Telefon,
                    Uyruk : myJson.PersonalInfo.Uyruk,
                    Sifre : myJson.PersonalInfo.Sifre,
                    Cinsiyet: myJson.PersonalInfo.Cinsiyet,
                    Aktiflik : myJson.PersonelWorkInfo.Aktiflik,
                    ProfilFoto : myJson.PersonelFotograflari.ProfilFoto,
                    Ehliyet : myJson.PersonelFotograflari.Ehliyet,
                    SabikaKaydi : myJson.PersonelFotograflari.SabikaKaydi,
                    SrcBelgesi : myJson.PersonelFotograflari.SrcBelgesi,
                    Psikoteknik : myJson.PersonelFotograflari.Psikoteknik,
                    KonustuguDiller : myJson.KonustuguDiller,
                    didEhliyetLoaded : false,
                    didProfilFotoLoaded : false,
                    didSabikaKaydiLoaded : false,
                    didSrcBelgesiLoaded : false,
                    didPsikoteknikLoaded : false
                })
                this.render()
            }catch(error){console.log(error)}
            
        }
    )
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
                didImagesLoaded:false
            /* } */

        }
    }
    getPersonelDetails = async function(screen){
        return new Promise(async function(resolve,reject){
        const {navigation} = screen.props;
        try{
            fetch(`http://31.169.71.253:8665/api/Personel/GetPersonel?tc=${navigation.getParam("KimlikNo")}` ,{
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
    )}

    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <UetdsHeader title="Personel Bilgileri"/>
                <View style={{height:vh(86),backgroundColor:"#fff"}}>
                    <ScrollView style={{flex:1,flexDirection:"column"}}>
                        <UetdsImage label="Profil Fotoğrafı" onChange={() => this.setState({didProfilFotoLoaded:true})} imageSrc={`http://31.169.71.253:8665/${this.state.ProfilFoto}`} base64={(b64) => this.setState({ProfilFoto:b64})} didImageLoaded={this.state.didProfilFotoLoaded}/>
                    <Form style={{flex:1}}>
                        <UetdsInput placeholder={"Adı"} onChangeText={(text) => this.setState({Ad:text})} value={this.state.Ad}/>
                        <UetdsInput placeholder={"Soyadı"} onChangeText={(text) => this.setState({Soyad:text})} value={this.state.Soyad}/>
                        <UetdsInput placeholder={"Uyruğu"} onChangeText={(text) => this.setState({Uyruk:text})} value={this.state.Uyruk}/>
                        <UetdsInput placeholder={"Kimlik Numarası"} onChangeText={(text) => this.setState({KimlikNo:text})} value={this.state.KimlikNo}/>
                        <UetdsInput placeholder={"Şifre"} onChangeText={(text) => this.setState({Sifre:text})} value={this.state.Sifre}/>
                        <UetdsPicker placeholder={"Cinsiyet"} onValueChange={this.onGenderChange.bind(this)} value={this.state.Cinsiyet}>
                            <Picker.Item label="Erkek" value="Erkek" />
                            <Picker.Item label="Kadın" value="Kadın"/>   
                        </UetdsPicker>
                        <UetdsPicker placeholder={"Personel Türü"} onValueChange={this.onChangeRole.bind(this)} value={this.state.Role}>
                            <Picker.Item label="Şoför" value="Şoför"/>   
                            <Picker.Item label="Yönetici" value="Yönetici"/>
                        </UetdsPicker>
                        <UetdsInput placeholder={"Telefon Numarası"} onChangeText={(text) => this.setState({Telefon:text})} value={this.state.Telefon}/>
                        <UetdsInput placeholder={"Email Adresi"} onChangeText={(text) => this.setState({Email:text})} value={this.state.Email}/>
                        <UetdsMultiPicker placeholder={"Konuştuğu Diller"} items={languages} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} selectedItems={this.state.KonustuguDiller}/>
                        <View style={{marginTop:15,marginBottom:15}}>
                            <View style={{flex:1,flexDirection:"row"}}>
                                <UetdsImage label="Ehliyet" imageSrc={`http://31.169.71.253:8665/${this.state.Ehliyet}`} onChange={() => this.setState({didEhliyetLoaded:true})} base64={(b64) => this.setState({Ehliyet:b64})} didImageLoaded={this.state.didEhliyetLoaded}/>
                                <UetdsImage label="Src Belgesi" imageSrc={`http://31.169.71.253:8665/${this.state.SrcBelgesi}`} onChange={() => this.setState({didSrcBelgesiLoaded:true})} base64={(b64) => this.setState({SrcBelgesi:b64})} didImageLoaded={this.state.didSrcBelgesiLoaded}/>
                            </View>
                            <View style={{flex:1,flexDirection : "row"}}>
                                <UetdsImage label="Sabıka Kaydı" imageSrc={`http://31.169.71.253:8665/${this.state.SabikaKaydi}`} onChange={() => this.setState({didSabikaKaydiLoaded:true})} base64={(b64) => this.setState({SabikaKaydi:b64})} didImageLoaded={this.state.didSabikaKaydiLoaded}/>
                                <UetdsImage label="Psikoteknik" imageSrc={`http://31.169.71.253:8665/${this.state.Psikoteknik}`} onChange={() => this.setState({didPsikoteknikLoaded:true})} base64={(b64) => this.setState({Psikoteknik:b64})} didImageLoaded={this.state.didPsikoteknikLoaded}/>
                            </View>
                        </View>
                    </Form>
                        <TouchableOpacity style={{height:50,width:vw(50),marginBottom:30,alignSelf:"center",flex:1}}  onPress={() => this.savePersonel()}>
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
        fetch('http://31.169.71.253:8665/api/Personel/UpdatePersonel',{
            method : 'POST',
            headers:{
                Accept: 'application/json',
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(data)
        }).then(function(response){
            return response.json();
        }).then(function(myJson){
            alert(JSON.stringify(myJson))
        })
        
    }catch(error){
        console.error(JSON.stringify(error));
    }}
}
export default withNavigationFocus(PersonelDetailsScreen);