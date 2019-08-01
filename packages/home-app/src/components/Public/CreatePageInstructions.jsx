import React from 'react';

import basicInfoSvg from '../../assets/undraw_business_shop_qw5t.svg';
import contactInfoSvg from '../../assets/undraw_address_udes.svg';
import imageGallerySvg from '../../assets/undraw_photo_sharing_1_85vy.svg';
import servicesSvg from '../../assets/undraw_clean_up_ucm0.svg';
import CompletedSvg from '../../assets/undraw_done_a34v.svg';

const CreateWebpageInstructions = () => {
  return(
    <div className="container">
      <div className="has-text-centered padding-15">
        <h1 className="subtitle is-size-2 has-text-grey">
          How to Add Your Business to Worksfair
        </h1>
        <h5 className="subtitle is-size-5 has-text-grey">
          You will get a free website for your business upon completing the process
        </h5>
      </div>
      <div className="columns margin-top-25">
        <div className="column margin-right-20">
          <div className="image-container">
            <figure className="image is-5by4">
              <img src={basicInfoSvg} alt="add basic business info" />
            </figure>
          </div>
          <div className="columns margin-top-25 is-mobile">
            <div className="column is-2 numbering">1</div>
            <div className="column instruction"><p>Provide </p>your basic business Info</div>
          </div>
        </div>
        <div className="column margin-right-20">
          <div className="image-container">
            <figure className="image is-5by4">
              <img src={contactInfoSvg} alt="add contact info" />
            </figure>
          </div>
          <div className="columns margin-top-25 is-mobile">
            <div className="column is-2 numbering">2</div>
            <div className="column instruction"><p>Provide </p>your business contact info</div>
          </div>
        </div>
        <div className="column">
          <div className="image-container">
            <figure className="image is-5by4">
              <img src={imageGallerySvg} alt="add gallery" />
            </figure>
          </div>
          <div className="columns margin-top-25 is-mobile">
            <div className="column is-2 numbering">3</div>
            <div className="column instruction"><p>Provide the</p>best pictures of your works</div>
          </div>
        </div>
      </div>
      <div className="columns padding-top-25">
        <div className="column is-1" />
        <div className="column">
          <div className="image-container">
            <figure className="image is-5by4">
              <img src={servicesSvg} alt="add products/services" />
            </figure>
          </div>
          <div className="columns margin-top-25 is-mobile">
            <div className="column is-2 numbering">4</div>
            <div className="column instruction"><p>Provide </p>details of your <strong>works</strong> with pics</div>
          </div>
        </div>
        <div className="column is-1" />
        <div className="column">
          <div className="image-container">
            <figure className="image is-5by4">
              <img src={CompletedSvg} alt="completed" />
            </figure>
          </div>
          <div className="columns margin-top-25 is-mobile">
            <div className="column is-2 numbering">5</div>
            <div className="column instruction">
              <p>Preview your webpage</p>
              <p>Update the rest of the contents. </p>Then copy and share the link with customers.
            </div>
          </div>
        </div>
        <div className="column is-1" />
      </div>
    </div>
  );
};

export default CreateWebpageInstructions;
