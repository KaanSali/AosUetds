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

const VehicleProperties = [{
    id: "Buzdolabi",
    name: "Buzdolabı"
}, {
    id: "TV",
    name: "TV"
}, {
    id: "Masa",
    name: "Masa"
}, {
    id: "Klima",
    name: "Klima"
}, {
    id: "CocukKoltugu",
    name: "Çocuk Koltuğu"
}, {
    id: "DVD",
    name: "DVD"
}, {
    id: "Mikrofon",
    name: "Mikrofon"
}
]
class VehicleDetailsScreen extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        headerMode : 'none'
    } 
    didFocusSub = this.props.navigation.addListener(
        'willFocus',
        async payload =>{
            let response = await this.getVehicleDetails(this);
            try{
                var myJson = JSON.parse(response);
                let PropsArray=[];
                Object.keys(myJson.AracOzellikleri).forEach((element) =>{
                    if(myJson.AracOzellikleri[element] === true){
                        PropsArray.push(element);
                    }
                })
                console.log(PropsArray)
                this.setState({
                    Plaka:myJson.AracInfo.Plaka,
                    Turu:myJson.AracInfo.Turu,
                    Marka:myJson.AracInfo.Marka,
                    Model:myJson.AracInfo.Model,
                    Yakit: myJson.AracInfo.Yakit,
                    KoltukSayisi : myJson.AracInfo.Uyruk,
                    Yili : myJson.AracInfo.Yili.toString(),
                    Aktiflik : myJson.AracWorkInfo.Aktiflik,
                    On : myJson.AracFotograflari.On,
                    Arka : myJson.AracFotograflari.Arka,
                    Sag : myJson.AracFotograflari.Sag,
                    Sol : myJson.AracFotograflari.Sol,
                    IcMekan : myJson.AracFotograflari.IcMekan,
                    SigortaPolice : myJson.AracFotograflari.SigortaPolice,
                    Ruhsat : myJson.AracFotograflari.Ruhsat,
                    AracOzellikleri : PropsArray,
                    didImagesLoaded : false
                })
                this.render()
            }catch(error){console.log(error)}
            
        }
    )
    constructor(props){ 
        super(props);
        this.state ={}
    }
    getVehicleDetails = async function(screen){
        return new Promise(async function(resolve,reject){
        const {navigation} = screen.props;
        try{
            fetch(`http://31.169.71.253:8665/api/Arac/GetArac?plakano=${navigation.getParam("Plaka")}` ,{
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
    onFuelChange(value) {
        this.setState({ Yakit: value })
    }
    onTypeChange(value) {
        this.setState({ Turu: value })
    }
    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={styles.container} behavior="height" enabled>
                    <UetdsHeader title="Araç Kaydı" />
                    <View style={{ height: vh(86), backgroundColor: "#fff" }}>
                        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                            <Form style={{ flex: 1 }}>
                                <UetdsImage label={"Önden Görünüş"} onChange={() => this.setState({didImagesLoaded:true})} imageSrc={`http://31.169.71.253:8665/${this.state.On}`} didImageLoaded={this.state.didImagesLoaded} base64={(b64) => this.setState({ On: b64 })} />
                                <UetdsInput placeholder={"Plakası"} onChangeText={(text) => this.setState({ Plaka: text })} value={this.state.Plaka}/>
                                <UetdsInput placeholder={"Markası"} onChangeText={(text) => this.setState({ Marka: text })}  value={this.state.Marka}/>
                                <UetdsInput placeholder={"Model"} onChangeText={(text) => this.setState({ Model: text })}  value={this.state.Model}/>
                                <UetdsInput placeholder={"Araç Yılı"} onChangeText={(text) => this.setState({ Yili: text })}  value={this.state.Yili}/>
                                <UetdsPicker placeholder={"Yakıtı"} onValueChange={this.onFuelChange.bind(this)} value={this.state.Yakit}>
                                    <Picker.Item label="Benzin" value="Benzin" />
                                    <Picker.Item label="Dizel" value="Dizel" />
                                    <Picker.Item label="Hybrid" value="Hybrid" />
                                    <Picker.Item label="Elektrikli" value="Elektrikli" />
                                </UetdsPicker>
                                <UetdsPicker placeholder={"Araç Türü"} onValueChange={this.onFuelChange.bind(this)} value={this.state.Turu}>
                                    <Picker.Item label="VIP" value="VIP" />
                                    <Picker.Item label="MINI" value="MINI" />
                                    <Picker.Item label="MIDI" value="MIDI" />
                                    <Picker.Item label="BUS" value="BUS" />
                                </UetdsPicker>
                                <UetdsMultiPicker placeholder={"Araç Özellikleri"} items={VehicleProperties} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} selectedItems={this.state.AracOzellikleri} />
                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="İç Mekan" base64={(b64) => this.setState({ IcMekan: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.IcMekan}`}/>
                                        <UetdsImage label="Arka" base64={(b64) => this.setState({ Arka: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.Arka}`}/>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="Sağ" base64={(b64) => this.setState({ Sag: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.Sag}`}/>
                                        <UetdsImage label="Sol" base64={(b64) => this.setState({ Sol: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.Sol}`}/>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="Sigorta Poliçe" base64={(b64) => this.setState({ SigortaPolice: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.SigortaPolice}`}/>
                                        <UetdsImage label="Ruhsat" base64={(b64) => this.setState({ Ruhsat: b64 })} onChange={() => this.setState({didImagesLoaded:true})} didImageLoaded={this.state.didImagesLoaded} imageSrc={`http://31.169.71.253:8665/${this.state.Ruhsat}`}/>
                                    </View>
                                </View>
                            </Form>
                            <TouchableOpacity style={{ height: 50, width: vw(50), marginBottom: 30, alignSelf: "center", flex: 1 }} /* onPress={() => this.saveVehicle()} */ >
                                <LinearGradient start={[0, 0.5]} end={[1, 0.5]} colors={['#020024', '#090979', '#49a9f8']} style={{ height: 50, width: vw(50), borderRadius: 0, backgroundColor: "rgb(2,0,36)", justifyContent: "center", alignItems: "center" }} >
                                    <Text style={{ fontSize: 20, fontWeight: "bold", color: "#fff" }}>Kaydet</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </Container>
        )
    }

    onSelectedItemsChange = selectedItems => {
        this.setState({ AracOzellikleri: selectedItems });
    }
    async saveVehicle() {
        try {
            if(this.state.On  == "" || this.state.Arka  == "" ||this.state.Sag  == "" || this.state.Sol  == "" || this.state.IcMekan  == "" || this.state.SigortaPolice  == "" || this.state.Ruhsat == "" )
            {
                alert("Lütfen tüm resim alanlarını doldurunuz.")
                return;
            }
            let PropsArray = VehicleProperties.map((item) => item.id);
            let PropsObject = {};
            PropsArray.forEach(element => {
                PropsObject[element] = false
            });
            this.state.AracOzellikleri.forEach(element => {
                PropsObject[element] = true
            });
            let data = {
                AracInfo: {
                    Plaka: this.state.Plaka,
                    Turu: this.state.Turu,
                    Marka: this.state.Marka,
                    Model: this.state.Model,
                    Yakit: this.state.Yakit,
                    KoltukSayisi: this.state.KoltukSayisi,
                    Yili: this.state.Yili,
                },
                AracWorkInfo: {
                    Aktiflik: true,
                },
                AracFotograflari: {
                    On: this.state.On,
                    Arka: this.state.Arka,
                    Sag: this.state.Sag,
                    Sol: this.state.Sol,
                    IcMekan: this.state.IcMekan,
                    SigortaPolice: this.state.SigortaPolice,
                    Ruhsat: this.state.Ruhsat,
                },
                AracOzellikleri: this.state.AracOzellikleri,
            }            
            let response = await fetch('http://31.169.71.253:8665/api/Arac/updatearac', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            alert(JSON.stringify(response))
        } catch (error) {
            console.log(JSON.stringify(error));
        }
    }
}
export default withNavigationFocus(VehicleDetailsScreen);