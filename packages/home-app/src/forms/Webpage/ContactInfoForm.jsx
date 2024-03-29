/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import PropTypes from 'prop-types';

import WebpageText from '../../atoms/WebpageText';
import { states } from '../../utils/helpers';

class ContactInfoForm extends Component {
  state = {
    towns: (this.props.webpage && states[this.props.webpage.state]) || '',
    currentTown: (this.props.webpage && this.props.webpage.city) || '',
    currentState: (this.props.webpage && this.props.webpage.state) || '',
  }

  /**
   * @description this handles the selection of state, sets the towns
   * sets the state with the right values
   *
   * @param { object } event - DOM event
  */
  handleStateSelection = (event) => {
    event.preventDefault();
    const { value } = event.target;
    this.setState({
      towns: states[value],
      currentState: value,
    });
  }

  /**
   * @description this handles the selection of state, sets the towns
   * sets the state with the right values
   *
   * @param { object } event - DOM event
  */
 handleTownSelection = (event) => {
   event.preventDefault();
   const { value } = event.target;
   this.setState({
     currentTown: value,
   });
 }

 render() {
   const {
     onSubmit,
     validate,
     validationErrors,
     handleErrorReset,
     webpage
   } = this.props;
   const { towns, currentState, currentTown } = this.state;

   return (
     <Form
       onSubmit={onSubmit}
       validate={validate}
       initialValues={webpage}
       // eslint-disable-next-line react/jsx-no-bind
       render={({
         handleSubmit,
         pristine,
         invalid,
         values,
         submitSucceeded,
         submitting,
       }) => {
         return (
           <form onSubmit={handleSubmit}>
             <div className="field-body">
               <div className="field">
                 <h5>State</h5>
                 <div className="control">
                   <div className="select is-fullwidth">
                     <Field
                       name="state"
                     >
                       {({ input }) => {
                         values.state = currentState;
                         return (
                           <select
                             {...input}
                             value={currentState}
                             onChange={this.handleStateSelection}
                             data-testid="business-state"
                           >
                             <option>Select State</option>
                             {
                               Object.keys(states).map(elem => (
                                 <option
                                   value={elem}
                                   key={elem}>{elem}</option>
                               ))
                             }
                           </select>);
                       }}
                     </Field>
                   </div>
                 </div>
               </div>

               <div className="field">
                 <h5>Town</h5>
                 <div className="control">
                   <div className="select is-fullwidth">
                     <Field
                       name="city">
                       {({ input }) => {
                         values.city = currentTown;
                         return (
                           <select
                             {...input}
                             value={currentTown}
                             onChange={this.handleTownSelection}
                             data-testid="business-town"
                           >
                             <option>Select Town</option>
                             {
                               towns && towns.map(town => (
                                 <option value={town} key={town}>{town}</option>
                               ))
                             }
                           </select>
                         );
                       }}
                     </Field>
                   </div>
                 </div>
               </div>
             </div>

             <div className="field">
               <h5>Address</h5>
               <div className="control">
                 <WebpageText
                   className="input is-medium"
                   name="address"
                   validate={validate}
                   placeholder="Eg. No 12 ABC street, Zik Estate"
                   dataTestId="business-address"
                   required
                   validationErrors={validationErrors}
                   handleErrorReset={handleErrorReset}
                 />
               </div>
             </div>

             <div className="field-body">
               <div className="field">
                 <h5>Business Phone number</h5>
                 <div className="control">
                   <WebpageText
                     className="input is-medium"
                     name="phone"
                     validate={validate}
                     dataTestId="business-phone"
                     validationErrors={validationErrors}
                     handleErrorReset={handleErrorReset}
                     placeholder="08123456789"
                   />
                 </div>
               </div>

               <div className="field">
                 <h5>Business Email</h5>
                 <div className="control">
                   <WebpageText
                     className="input is-medium"
                     name="email"
                     validate={validate}
                     dataTestId="business-email"
                     validationErrors={validationErrors}
                     handleErrorReset={handleErrorReset}
                     placeholder="abc@anywebsite.com"
                   />
                 </div>
               </div>

               <div className="field">
                 <h5>Business Website
                   <span className="has-text-grey-light">
                    (if available)
                   </span>
                 </h5>
                 <div className="control">
                   <WebpageText
                     className="input is-medium"
                     name="website"
                     validate={validate}
                     dataTestId="business-website"
                     validationErrors={validationErrors}
                     handleErrorReset={handleErrorReset}
                     placeholder="https://www.yourwebsite.com"
                   />
                 </div>
               </div>
             </div>

             <div className="control">
               <button
                 type="submit"
                 disabled={pristine || invalid || submitSucceeded || submitting}
                 className="button is-link is-medium is-rounded"
                 data-testid="update-contact"
               >
                  Save & Continue
               </button>
             </div>
           </form>
         );
       }}
     />
   );
 }
}

ContactInfoForm.propTypes = {
  onSubmit: PropTypes.func,
  validate: PropTypes.func,
  validationErrors: PropTypes.object,
  webpage: PropTypes.object,
  handleErrorReset: PropTypes.func,
};

export default ContactInfoForm;
