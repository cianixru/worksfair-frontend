import { colourConstants } from './constants';

const {
  black, blue, green, red, orange,
} = colourConstants;

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
  Kwara: ['Ilorin', 'Offa', 'Jebba'],
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
  Oyo: ['Ibadan', 'Oyo', 'Iwo'],
  Plateau: ['Jos'],
  Rivers: ['Port Harcourt', 'Onne'],
  Sokoto: ['Sokoto'],
  Taraba: ['Jalingo', 'Zaki Biam'],
  Yobe: ['Damaturu', 'Potiskum'],
  Zamfara: ['Gusau'],
  FCT: ['Abuja'],
};
/**
 * @description takes the colour variable stored and formats it for background
 *
 * @param { string}  colour
 *
 * @returns { string } output
 */
export const backgroundColourHelper = (colour) => {
  const colours = {
    [green]: 'has-background-primary',
    [blue]: 'has-background-info',
    [orange]: 'has-background-warning',
    [red]: 'has-background-danger',
    [black]: 'has-background-dark',
  };
  const output = colour ? colours[colour] : 'has-background-link';
  return output;
};

/**
 * @description takes the colour variable stored and formats it for texts
 *
 * @param { string}  colour
 *
 * @returns { string } output
 */
export const textColourHelper = (colour) => {
  const colours = {
    [green]: 'has-text-primary',
    [blue]: 'has-text-info',
    [orange]: 'has-text-warning',
    [red]: 'has-text-danger',
    [black]: 'has-text-dark',
  };
  const output = colour ? colours[colour] : 'has-text-grey';
  return output;
};

/**
 * @description evaluates the date for next update
 *
 * @param { string } lastUpdate
 *
 * @returns { string } date string
 */
export const getDateForNextUpdate = (lastUpdate) => {
  const dateArray = lastUpdate.split('-');
  const newMonth = parseInt(dateArray[1], 10) + 3;
  dateArray[1] = newMonth;

  return new Date(dateArray.join('-')).toDateString();
};
