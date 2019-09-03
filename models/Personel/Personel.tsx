import BlankRole from '../Roles/BlankRole';
import IRole from '../Roles/IRole'
interface PersonalInfo {
	Ad: string,
	Soyad: string,
	Uyruk: string,
	KimlikNo: string,
	Cinsiyet: string,
	Telefon: string,
	Email: string,
	Sifre: string
}

interface PersonelWorkInfo {
	Aktiflik: boolean,
}

interface PersonelFotograflari {
	ProfilFoto: string,
	Ehliyet: string,
	SrcBelgesi: string,
	Psikoteknik: string,
	SabikaKaydi: string
}

export default class Personel {
	Id:any;
	Role = new BlankRole();
	PersonalInfo: PersonalInfo = {
		Ad: "",
		Soyad: "",
		Cinsiyet: "",
		Email: "",
		KimlikNo: "",
		Sifre: "",
		Telefon: "",
		Uyruk: ""
	};
	PersonelWorkInfo: PersonelWorkInfo = {
		Aktiflik: true
	};
	PersonelFotograflari: PersonelFotograflari = {
		Ehliyet: "",
		ProfilFoto: "",
		Psikoteknik: "",
		SabikaKaydi: "",
		SrcBelgesi: ""
	};
	KonustuguDiller: string[] = [];
};



