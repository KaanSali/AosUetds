import AracOzellikleri from "../Vehicle/VehicleOptions"
class AracInfo{
	Plaka:string ="";
	Turu:string="";
	Marka:string="";
	Model:string="";
	Yakit:string="";
	KoltukSayisi:number = 5;
	Yili:number= 2010;
}

class AracWorkInfo{
	Aktiflik:boolean = true;
}

class AracFotograflari{
	On:string = "";
	Arka:string = "";
	Sag:string = "";
	Sol:string = "";
	IcMekan:string = "";
	SigortaPolice:string = "";
	Ruhsat:string = "";
}

export class Arac{
	Id:any;
	AracInfo:AracInfo = new AracInfo();
	AracOzellikleri: AracOzellikleri = new AracOzellikleri();
	AracFotograflari:AracFotograflari = new AracFotograflari();
	AracWorkInfo:AracWorkInfo = new AracWorkInfo();
}