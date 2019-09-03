import { Model } from 'react-axiom';

export default class BlankRole extends Model{
	static defaultState(){
		return {
			SeferKaydiEkle : false,
			YolculuklaraErisebilme : false,
			AraclaraErisebilme : false,
			SuruculereErisebilme : false,
			CariBilgilereErisme : false,
			UETDSGirisiYapabilme : false,
			SirketDuzenleme : false,
			RoleName : "Blank"
		}
	}
}