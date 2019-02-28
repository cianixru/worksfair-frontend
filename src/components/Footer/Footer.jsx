import React, { Component } from 'react';
import styled from 'styled-components';

class Footer extends Component {
  render() {
    return (
      <StyledFooter className="footer ">
        <div className="content has-text-centered">
          Copyright {new Date().getFullYear()} Worksfair. All Rights Reserved.
        </div>
		  </StyledFooter>
    );
  }
}

const StyledFooter = styled.footer`
  position: relative;
  bottom: 0em;
  left: 0em;  
  padding-bottom: 3em;
`
export default Footer;
