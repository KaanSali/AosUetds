import { Model } from 'react-axiom';

export default class SoforRole extends Model {
	static defaultState(){
		return{
			SeferKaydiEkle : true,
			YolculuklaraErisebilme : false,
			AraclaraErisebilme : false,
			SuruculereErisebilme : false,
			CariBilgilereErisme : false,
			UETDSGirisiYapabilme : false,
			SirketDuzenleme : false,
			RoleName : "Şoför"
		};
	}
}
