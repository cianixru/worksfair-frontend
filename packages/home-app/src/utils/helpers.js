import dotenv from 'dotenv';
import slugify from 'slugify';

import { colourConstants } from './constants';

dotenv.config();

const {
  black, blue, green, red, orange,
} = colourConstants;

/**
 * @description formats the error response messages
 * @param { object } data
 * @returns { string } errorMessage
 */
export default (data) => {
  if (data) {
    const errors = Object.values(data);
    const errorMessage = errors.reduce((error, arr) => {
      return `${error} ${arr[0]}`;
    }, '');
    return errorMessage;
  }
  return 'An error has occured. Please contact the admin for help.';
};

export const states = {
  Abia: ['Umuahia', 'Aba', 'Abiriba', 'Ohafia', 'Arochukwu'],
  Adamawa: ['Yola', 'Mubi', 'Jimeta', 'Numan'],
  AkwaIbom: ['Uyo', 'Ikot-Ekpene', 'Eket'],
  Anambra: [
    'Awka',
    'Onitsha',
    'Nnewi',
    'Ihiala',
    'Ekwulobia',
    'Ogbunike',
    'Agulu',
    'Abagana',
    'Nkwelle',
    'Abatete',
    'Aguleri',
    'Ogidi',
    'Nkpor',
    'Obosi',
    'Oba',
    'Umuoji',
    'Nnobi',
    'Awka-Etiti',
    'Oraukwu',
    'Alor',
  ],
  Bauchi: ['Bauchi'],
  Bayelsa: ['Yenagoa', 'Otuoke'],
  Benue: ['Makurdi', 'Otukpo', 'Gboko'],
  Borno: ['Maiduguri', 'Bama'],
  CrossRiver: ['Calabar', 'Ikom', 'Ogoja', 'Obudu'],
  Delta: [
    'Asaba',
    'Warri',
    'Ughelli',
    'Sapele',
    'Agbor',
    'Kwale',
  ],
  Ebonyi: ['Abakaliki'],
  Edo: ['Benin City', 'Okada', 'Ekpoma'],
  Ekiti: ['Ado Ekiti'],
  Enugu: [
    'Enugu',
    'Nsukka',
    'Oji River',
    'Achi',
    'Udi',
    'Awgu',
    'Ngwo',
    'Enugu East',
    'Enugu South'
  ],
  Gombe: ['Gombe'],
  Imo: ['Owerri', 'Orlu', 'Okigwe', 'Oguta', 'Umuagwo'],
  Jigawa: ['Dutse'],
  Kaduna: ['Kaduna', 'Funtua'],
  Kano: ['Kano', 'Minjibir', 'Karaye'],
  Katsina: ['Katsina', 'Daura'],
  Kebbi: ['Birnin Kebbi', 'Jega'],
  Kogi: ['Lokoja', 'Okene'],
  Kwara: ['Ilorin', 'Offa', 'Jebba'],
  Lagos: [
    'Apapa',
    'Agege',
    'Badagry',
    'Ebute-Meta',
    'Ejigbo',
    'Epe',
    'Festac Town',
    'Kosofe',
    'Ikotun',
    'Ifako',
    'Ikeja',
    'Ikorodu',
    'Ikoyi',
    'Isolo',
    'Lekki',
    'Lagos-Island',
    'Mushin',
    'Ojo',
    'Oshodi',
    'Surulere',
    'Yaba'
  ],
  Nasarawa: ['Lafia'],
  Niger: ['Minna', 'Madalla', 'Baro'],
  Ogun: [
    'Abeokuta',
    'Sango Ota',
    'Ijebu Ode',
    'Sagamu',
    'Mowe',
    'Ofada',
    'Ibese',
    'Ayetoro',
  ],
  Ondo: [
    'Akure',
    'Okitipupa',
    'Ondo',
    'Ore',
  ],
  Osun: [
    'Oshogbo',
    'Iwo',
    'Ede',
    'Ejigbo',
    'Ilesa',
  ],
  Oyo: [
    'Ibadan',
    'Oyo',
    'Ogbomosho',
  ],
  Plateau: ['Jos'],
  Rivers: [
    'Port Harcourt',
    'Onne',
    'Elele',
    'Ahoada',
    'Bonny',
    'Opobo',
    'Okrika',
    'Rumuokoro',
  ],
  Sokoto: ['Sokoto'],
  Taraba: ['Jalingo', 'Zaki Biam'],
  Yobe: ['Damaturu', 'Potiskum'],
  Zamfara: ['Gusau'],
  FCT: [
    'Abuja',
    'Abaji',
    'Kubwa',
    'Gwagwalada',
    'Kuje',
    'Kwali',
    'Bwari',
    'Zuba',
    'Madalla',
  ],
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

/**
 * @description take a colour variable name and returns the shades
 *
 * @param { string } colourName
 *
 * @returns { Array } an array of the colour shades
 */
export const colourShadesOf = (colourName) => {
  const colourShades = {
    'is-primary': [
      '#e5fffb',
      '#80ffec',
      '#00d1b2',
      '#1affdd',
      '#00e6c3',
    ],
    'is-info': [
      '#e7f4fd',
      '#89caf6',
      '#59b5f2',
      '#2aa0ef',
      '#1087d5',
    ],
    'is-warning': [
      '#fffae5',
      '#fff0b3',
      '#ffe580',
      '#ffd11a',
      '#e6b700',
    ],
    'is-danger': [
      '#ffe5eb',
      '#ffb3c2',
      '#ff8099',
      '#ff0537',
      '#e6002e',
    ],
    'is-dark': [
      '#eee',
      '#d9d9d9',
      '#bfbfbf',
      '#7a7a7a',
      '#595959',
    ],
  };
  const value = colourName ? colourShades[colourName] : colourShades['is-dark'];
  return value;
};

export const makeWebsiteLink = (title) => {
  if (title) {
    const slug = slugify(title, {
      replacement: '-',
      lower: true,
    });
    return `${slug}.worksfair.com`;
  }
};
