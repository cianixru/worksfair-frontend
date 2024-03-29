import React from 'react';

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
  if (data) {
    const errors = Object.values(data);
    const errorMessage = errors.reduce((error, arr) => {
      return `${error} ${arr[0]}`;
    }, '');
    return errorMessage;
  }
  return 'An error has occured. Please contact the admin for help.'
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

/**
 * @description checks whether the app is running on mobile
 * 
 * @returns {boolean}
 */
export const isMobileDevice = () => {
  const testRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
  return  testRegex.test(navigator.userAgent);
}


/**
 * @description takes the webpage details array
 * and augments some content to it.
 * 
 * @param {array} webpageDetails
 * 
 * @returns {array}
 */
export const augmentDetails = (webpageDetails) => {
  const message = <span className="has-text-grey-light">Not available yet</span>;

  const requiredContents = ['vision', 'mission', 'value'];

  const detailsObject = {
    'vision': {
      id: 1,
      title: 'Our Vision',
      description: message,
    },
    'mission': {
      id: 2,
      title: 'Our Mission',
      description: message,
    },
    'value': {
      id: 3,
      title: 'Core Values',
      description: message,
    }
  };

  const details = [];
  const alreadyIn = [];

  if (!webpageDetails || webpageDetails.length < 3) {
    requiredContents.forEach(element => {
      webpageDetails.forEach(detailItem => {
        const title = detailItem.title.toLowerCase();
        if(title.includes(element)){
          details.push(detailItem);
          alreadyIn.push(element);
        }  
      });
    });
    requiredContents.forEach(element => {
      if (!alreadyIn.includes(element)){
        details.push(detailsObject[element]);
      }
    })
    return details;
  } else {
    return webpageDetails;
  }
}
