import blue1 from './blue-abstract.jpg';
import blue2 from './blue-coffe-cup.jpg';
import blue3 from './blue-textured-background.jpeg';
import blue4 from './blue-pattern.jpg';
import blue5 from './sky-blue.jpg';

import gray1 from './gray-marble-abstract.jpg';
import gray2 from './gray-marble.jpg';
import gray3 from './gray-relief.jpg';
import gray4 from './gray-texture-background.jpg';
import gray5 from './gray-wood.jpg';
import gray6 from './grey_stones.jpg';

import green1 from './green-cave.jpg';
import green2 from './green-texture.jpg';
import green3 from './light-green-texture-background.jpg';
import green4 from './pastel-color-texture-background.jpg';

import orange1 from './orange.jpg';
import orange2 from './orange-2.jpg';

import red1 from './red-marble.jpg';
import red2 from './red-wood-texture-wallpaper.jpg';
import red3 from './red-wood-texture.jpg';
import red4 from './red.jpg';

import yellow1 from './bright-yellow-background-6.jpg';
import yellow2 from './yellow-background-4.png';
import yellow3 from './yellow-background-hd.jpg';
import yellow4 from './yellow-balls.jpeg';
import yellow6 from './yellow-Maple-Leaves-Background.jpg';

import { colourConstants } from '../../utils/constants';

const backgroundImageColours = {
  blue: [
    blue1,
    blue2,
    blue3,
    blue4,
    blue5
  ],
  default: [
    gray1,
    gray2,
    gray3,
    gray4,
    gray5,
    gray6,
  ],
  green: [
    green1,
    green2,
    green3,
    green4,
  ],
  orange: [
    orange1,
    orange2,
    yellow1,
    yellow2,
    yellow3,
    yellow4,
    yellow6,
  ],
  red: [
    red1,
    red2,
    red3,
    red4,
    yellow6,
  ],
};

/**
 * @description This takes a colour variable and returns an image
 *
 * @param { string } colour
 *
 * @returns { string } image
 */
const getBackgroundImage = (colour) => {
  const {
    blue, red, orange, green, black
  } = colourConstants;
  const backgrounds = {
    [green]: backgroundImageColours.green,
    [blue]: backgroundImageColours.blue,
    [orange]: backgroundImageColours.orange,
    [red]: backgroundImageColours.red,
    [black]: backgroundImageColours.default,
  };
  const backgroundImageArray = colour ? backgrounds[colour]
    : backgroundImageColours.default;
  const index = Math.floor(Math.random() * backgroundImageArray.length);
  const selectedImage = backgroundImageArray[index];
  return selectedImage;
};

export default getBackgroundImage;
