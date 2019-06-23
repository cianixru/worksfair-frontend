import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Footer from '../components/Footer/Footer';

class Terms extends Component {
  render() {
    return (
      <Fragment>
        <Helmet>
          <title>Terms of Service - Worksfair</title>
        </Helmet>
        <div
          className="hero is-small has-background-white margin-top-25"
        >
          <div className="hero-body ">
            <div className="container columns">
              <div className="column is-1"/>
              <div className="column is-10">
                <h1 className="is-size-3">Worksfair Terms of Service</h1>
                <div className="content">
                    <h2 className="is-size-4 margin-top-25">1. Terms</h2>
                    <p>By accessing this Website, accessible from https://worksfair.com - a service by Ideosynergy, you are agreeing to be bound by these Website Terms and Conditions of Use and agree that you are responsible for the agreement with any applicable local laws. If you disagree with any of these terms, you are prohibited from accessing this site. The materials contained in this Website are protected by copyright and trade mark law. These Terms of Service has been created with the help of the <a href="https://www.termsofservicegenerator.net">Terms of Service Generator</a> and the <a href="https://www.privacy-policy-template.com">Privacy Policy Template</a>.</p>

                    <h2 className="is-size-4 margin-top-25">2. Use License</h2>

                    <p>Permission is granted to temporarily download one copy of the materials on Ideosynergy's Website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>

                    <ul>
                        <li>modify or copy the materials;</li>
                        <li>use the materials for any commercial purpose or for any public display;</li>
                        <li>attempt to reverse engineer any software contained on Ideosynergy's Website;</li>
                        <li>remove any copyright or other proprietary notations from the materials; or</li>
                        <li>transferring the materials to another person or "mirror" the materials on any other server.</li>
                    </ul>

                    <p>This will let Ideosynergy to terminate upon violations of any of these restrictions. Upon termination, your viewing right will also be terminated and you should destroy any downloaded materials in your possession whether it is printed or electronic format.</p>

                    <h2 className="is-size-4 margin-top-25">3. Disclaimer</h2>

                    <p>All the materials on Ideosynergy’s Website are provided "as is". Ideosynergy makes no warranties, may it be expressed or implied, therefore negates all other warranties. Furthermore, Ideosynergy does not make any representations concerning the accuracy or reliability of the use of the materials on its Website or otherwise relating to such materials or any sites linked to this Website.</p>

                    <h2 className="is-size-4 margin-top-25">4. Limitations</h2>

                    <p>Ideosynergy or its suppliers will not be hold accountable for any damages that will arise with the use or inability to use the materials on Ideosynergy’s Website, even if Ideosynergy or an authorize representative of this Website has been notified, orally or written, of the possibility of such damage. Some jurisdiction does not allow limitations on implied warranties or limitations of liability for incidental damages, these limitations may not apply to you.</p>

                    <h2 className="is-size-4 margin-top-25">5. Revisions and Errata</h2>

                    <p>The materials appearing on Ideosynergy’s Website may include technical, typographical, or photographic errors. Ideosynergy will not promise that any of the materials in this Website are accurate, complete, or current. Ideosynergy may change the materials contained on its Website at any time without notice. Ideosynergy does not make any commitment to update the materials.</p>

                    <h2 className="is-size-4 margin-top-25">6. Links</h2>

                    <p>Ideosynergy has not reviewed all of the sites linked to its Website and is not responsible for the contents of any such linked site. The presence of any link does not imply endorsement by Ideosynergy of the site. The use of any linked website is at the user’s own risk.</p>

                    <h2 className="is-size-4 margin-top-25">7. Site Terms of Use Modifications</h2>

                    <p>Ideosynergy may revise these Terms of Use for its Website at any time without prior notice. By using this Website, you are agreeing to be bound by the current version of these Terms and Conditions of Use.</p>

                    <h2 className="is-size-4 margin-top-25">8. Your Privacy</h2>

                    <p>Please read <Link to="/privacy-policy">our Privacy Policy</Link>.</p>

                    <h2 className="is-size-4 margin-top-25">9. Governing Law</h2>

                    <p>Any claim related to Ideosynergy's Website shall be governed by the laws of Nigeria without regards to its conflict of law provisions.</p>
                </div>
              </div>
              <div className="column is-1 " />
            </div>
          </div>
        </div>
    <Footer />
    </Fragment>
    );
  }
}

export default Terms;
