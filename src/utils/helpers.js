/**
 * @description formats the error response messages
 * @param { object } data
 * @returns { string } errorMessage
 */
export default (data) => {
  const errors = Object.values(data);
  const errorMessage = errors.reduce((error, arr) => {
    return `${error} ${arr[0]}`;
  }, '');
  return errorMessage;
};

export const states = {
  Abia: ['Umuahia', 'Aba'],
  Adamawa: ['Yola', 'Mubi', 'Jimeta', 'Numan'],
  AkwaIbom: ['Uyo', 'Ikot-Ekpene', 'Eket'],
  Anambra: ['Awka', 'Onitsha', 'Nnewi', 'Ekwulobia'],
  Bauchi: ['Bauchi'],
  Bayelsa: ['Yenagoa', 'Otuoke'],
  Benue: ['Makurdi', 'Otukpo', 'Gboko'],
  Borno: ['Maiduguri', 'Bama'],
  CrossRiver: ['Calabar', 'Ikom', 'Ogoja', 'Obudu'],
  Delta: ['Asaba', 'Warri', 'Ughelli', 'Sapele', 'Agbor'],
  Ebonyi: ['Abakaliki'],
  Edo: ['Benin City', 'Okada', 'Ekpoma'],
  Ekiti: ['Ado Ekiti'],
  Enugu: ['Enugu', 'Nsukka'],
  Gombe: ['Gombe'],
  Imo: ['Owerri', 'Orlu', 'Okigwe'],
  Jigawa: ['Dutse'],
  Kaduna: ['Kaduna', 'Funtua'],
  Kano: ['Kano', 'Minjibir'],
  Katsina: ['Katsina', 'Daura'],
  Kebbi: ['Birnin Kebbi', 'Jega'],
  Kogi: ['Lokoja', 'Okene'],
  Kwara: ['Ilorin'],
  Lagos: [
    'Ikeja',
    'Lekki',
    'Oshodi',
    'Ikoyi',
    'Lagos-Island',
    'Badagry',
    'Isolo',
    'Mushin',
    'Surulere',
    'Yaba'
  ],
  Nasarawa: ['Lafia'],
  Niger: ['Minna', 'Madalla', 'Baro'],
  Ogun: ['Abeokuta'],
  Ondo: ['Akure', 'Ijebu Ode'],
  Osun: ['Oshogbo'],
  Oyo: ['Ibadan', 'Oyo'],
  Plateau: ['Jos'],
  Rivers: ['Port Harcourt', ''],
  Sokoto: ['Sokoto'],
  Taraba: ['Jalingo', 'Zaki Biam'],
  Yobe: ['Damaturu', 'Potiskum'],
  Zamfara: ['Gusau'],
  FCT: ['Abuja'],
};
