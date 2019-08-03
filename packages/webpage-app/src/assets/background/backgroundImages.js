import { colourConstants } from '../../utils/constants';const blue1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835307/dev/background/mlgwrjfxbgg4uehq7bou.jpg';

const blue2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835297/dev/background/cish5yrrwdryh3fgrsri.jpg';
const blue3 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835307/dev/background/mlgwrjfxbgg4uehq7bou.jpg';
const blue4 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835299/dev/background/b5ji5nzqmrnwiumrsjks.jpg';
const blue5 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835315/dev/background/e5huxmustl2kjfx7h73h.jpg';

const gray1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835309/dev/background/qid1kz0jg1dttipyvsub.jpg';
const gray2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835302/dev/background/c0ws7mpdu5f8ai1ymvko.jpg';
const gray3 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835302/dev/background/pqxsdxc9ay81k7au0gfc.jpg';
const gray4 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835300/dev/background/mzt4sedxcc6044prz32o.jpg';
const gray5 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835300/dev/background/btj4znnxfbg1byatemdh.jpg';
const gray6 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835298/dev/background/vv8ammpt8wmmg0ccftas.jpg';

const green1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835305/dev/background/ixihzjzib7ofs7a5isdx.jpg';
const green2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835303/dev/background/qwmtxf9udwzlidmsni3r.jpg';
const green3 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835301/dev/background/ig8mdqtmaxyjtzathxnj.jpg';
const green4 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835301/dev/background/zeuq7rnidx2tusc5q90h.jpg';

const orange1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835302/dev/background/fnbufovighjofeffm7ro.jpg';
const orange2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835302/dev/background/tuntgphiio4ssgxomn1n.jpg';

const red1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835305/dev/background/xecberz5l4ooqhyjfpmb.jpg';
const red2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835304/dev/background/xltmhdms3rilmaf2dik3.jpg';
const red3 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835304/dev/background/ehkmrkcii6ggqpnccrca.jpg';
const red4 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835303/dev/background/em3d9563pvpjew1pnbpk.jpg';

const yellow1 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835307/dev/background/te9racz9csn97rbhq5xy.png';
const yellow2 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835307/dev/background/j397viqy4gjn414azwlh.jpg';
const yellow3 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835306/dev/background/vjamfianamksi9f2oed1.jpg';
const yellow4 = 'https://res.cloudinary.com/worksfair/image/upload/f_auto/v1564835306/dev/background/tyj1jsnqk8davsbarxtf.jpg';


const backgroundImageColours = {
  blue: [
    blue1,
    blue2,
    blue3,
    blue4,
    blue5,
    green1,
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
  ],
  red: [
    yellow2,
    red1,
    red2,
    red3,
    red4,
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
