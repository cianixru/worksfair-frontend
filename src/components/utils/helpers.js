import React from 'react';
import axios from 'axios';

const {
  REACT_APP_CLOUDINARY_API_KEY,
  REACT_APP_CLOUDINARY_PRESET_NAME,
  REACT_APP_CLOUDINARY_UPLOAD_URL,
} = process.env;

/**
 * @description convert a sentence to sentence case
 *
 * @param { string } sentence
 * @returns {string }
 */
export const toSentenceCase = sentence => sentence
    && `${sentence[0].toUpperCase()}${sentence.substr(1)}`;

/**
 * @description Handles the image upload to cloudinary
 *
 * @param { object } image
 */
export const CloudinaryImageUploader = async (image) => {
  // our formdata
  const formData = new FormData();
  formData.append('file', image);
  formData.append(
    'api_key',
    REACT_APP_CLOUDINARY_API_KEY
  );
  formData.append(
    'upload_preset',
    REACT_APP_CLOUDINARY_PRESET_NAME
  );
  formData.append('timestamp', (Date.now()));

  delete axios.defaults.headers.common.Authorization;

  return axios({
    method: 'post',
    url: REACT_APP_CLOUDINARY_UPLOAD_URL,
    data: formData,
    config: { headers: { 'Content-Type': 'multipart/form-data' } }
  });
};

export const offerings = [
  {
    title: 'kamsi',
    description: 'passion, software, engineering, technology, worksfair',
    image: 'https://res.cloudinary.com/worksfair/image/upload/v1557767623/dev/Andela-VI_gfqg0d.jpg',
    price: 'FREE',
    created_at: '2019-05-15T17:37:06.479115Z',
    updated_at: '2019-05-15T17:37:06.479140Z'
  },
  {
    title: 'Sissy',
    description: 'passion, software, engineering, technology, worksfair',
    image: 'https://res.cloudinary.com/worksfair/image/upload/v1557767623/dev/Andela-VI_gfqg0d.jpg',
    price: '',
    created_at: '2019-05-15T17:35:00.329484Z',
    updated_at: '2019-05-15T17:35:00.329604Z'
  },
  {
    title: 'Atty',
    description: 'worksfair will pay for you',
    image: 'https://res.cloudinary.com/worksfair/image/upload/v1557767623/dev/Andela-VI_gfqg0d.jpg',
    price: 'FREE',
    created_at: '2019-05-15T17:29:04.245897Z',
    updated_at: '2019-05-15T17:40:32.493396Z'
  },
  {
    title: 'Cheesy',
    description: null,
    image: 'https://res.cloudinary.com/worksfair/image/upload/v1557767623/dev/Andela-VI_gfqg0d.jpg',
    price: '',
    created_at: '2019-05-15T05:49:37.499647Z',
    updated_at: '2019-05-15T05:49:37.499668Z'
  }
];

export const addNaira = (price) => {
  const cost = parseInt(price, 10) === 0
    ? <p className="is-size-6">Contact us for Price</p>
    : (<p className="price">&#8358; {price}</p>);
  return cost;
};
