import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, ScrollView, Picker } from 'react-native'
import UetdsImage from '../../components/UetdsImage';
import UetdsInput from '../../components/UetdsInput';
import { Container, Form, Item } from 'native-base';
import UetdsHeader from '../../components/UetdsHeader';
import UetdsPicker from '../../components/UetdsPicker';
import UetdsMultiPicker from '../../components/UetdsMultiPicker';
import styles from '../../constants/Styles'
import {vh, vw} from 'react-native-expo-viewport-units'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {LinearGradient} from 'expo-linear-gradient';
import { withNavigation } from 'react-navigation';

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
export default class AddVehicleScreen extends Component {
    static navigationOptions = {
        drawerLabel: () => null,
        headerMode: 'none'
    }
    constructor(props) {
        super(props);
        this.state = {
            Plaka: "",
            Turu: "",
            Marka: "",
            Model: "",
            Yakit: "",
            KoltukSayisi: "",
            Yili: "",
            Aktiflik: true,
            On: "",
            Arka: "",
            Sag: "",
            Sol: "",
            IcMekan: "",
            SigortaPolice: "",
            Ruhsat: "",
            AracOzellikleri: [],
        }
    }
    onFuelChange(value) {
        this.setState({ Yakit: value })
    }
    onTypeChange(value) {
        this.setState({ Turu: value })
    }
    render() {
        return (
            <Container>
                <KeyboardAvoidingView style={styles.container} behavior="position" enabled>
                    <UetdsHeader title="Araç Kaydı" />
                    <View style={{ height: vh(86), backgroundColor: "#fff" }}>
                        <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                            <Form style={{ flex: 1 }}>
                                <UetdsImage label={"Önden Görünüş"} base64={(b64) => this.setState({ On: b64 })} />
                                <UetdsInput placeholder={"Plakası"} onChangeText={(text) => this.setState({ Plaka: text })} />
                                <UetdsInput placeholder={"Markası"} onChangeText={(text) => this.setState({ Marka: text })} />
                                <UetdsInput placeholder={"Model"} onChangeText={(text) => this.setState({ Model: text })} />
                                <UetdsInput placeholder={"Araç Yılı"} onChangeText={(text) => this.setState({ Yili: text })} />
                                <UetdsPicker placeholder={"Yakıtı"} onValueChange={this.onFuelChange.bind(this)}>
                                    <Picker.Item label="Benzin" value="Benzin" />
                                    <Picker.Item label="Dizel" value="Dizel" />
                                    <Picker.Item label="Hybrid" value="Hybrid" />
                                    <Picker.Item label="Elektrikli" value="Elektrikli" />
                                </UetdsPicker>
                                <UetdsPicker placeholder={"Araç Türü"} onValueChange={this.onFuelChange.bind(this)}>
                                    <Picker.Item label="VIP" value="VIP" />
                                    <Picker.Item label="MINI" value="MINI" />
                                    <Picker.Item label="MIDI" value="MIDI" />
                                    <Picker.Item label="BUS" value="BUS" />
                                </UetdsPicker>
                                <UetdsMultiPicker placeholder={"Araç Özellikleri"} items={VehicleProperties} onSelectedItemsChange={this.onSelectedItemsChange.bind(this)} selectedItems={this.state.AracOzellikleri} />
                                <View style={{ marginTop: 15, marginBottom: 15 }}>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="İç Mekan" base64={(b64) => this.setState({ IcMekan: b64 })} />
                                        <UetdsImage label="Arka" base64={(b64) => this.setState({ Arka: b64 })} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="Sağ" base64={(b64) => this.setState({ Sag: b64 })} />
                                        <UetdsImage label="Sol" base64={(b64) => this.setState({ Sol: b64 })} />
                                    </View>
                                    <View style={{ flex: 1, flexDirection: "row" }}>
                                        <UetdsImage label="Sigorta Poliçe" base64={(b64) => this.setState({ SigortaPolice: b64 })} />
                                        <UetdsImage label="Ruhsat" base64={(b64) => this.setState({ Ruhsat: b64 })} />
                                    </View>
                                </View>
                            </Form>
                            <TouchableOpacity style={{ height: 50, width: vw(50), marginBottom: 30, alignSelf: "center", flex: 1 }} onPress={() => this.saveVehicle()}>
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
            return;
            let response = await fetch('http://31.169.71.253:8665/api/Personel/AddPersonel', {
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

