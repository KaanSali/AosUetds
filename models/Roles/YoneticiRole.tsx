import { Model } from 'react-axiom';

export default class YoneticiRole extends Model {
	static defaultState() {
		return {
			SeferKaydiEkle: true,
			YolculuklaraErisebilme: true,
			AraclaraErisebilme: true,
			SuruculereErisebilme: true,
			CariBilgilereErisme: true,
			UETDSGirisiYapabilme: true,
			SirketDuzenleme: true,
			RoleName: "Yönetici"
		}
	}
}
