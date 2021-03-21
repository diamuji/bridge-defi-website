import React from 'react';
import { Link, withRouter } from 'react-router-dom';


import Header from '../partials/Header';
import PageIllustration from '../partials/PageIllustration';

class SignUp extends React.Component{
  

  constructor(props) {
    super(props)
    this.state = { password: '', email: '', firstName: '', lastName: '' }
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
    this.handleLastNameChange = this.handleLastNameChange.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.signUpCustomer = this.signUpCustomer.bind(this)

  }


  handleFirstNameChange(e) {
    this.setState({firstName: e.target.value});
  }
  handleLastNameChange(e) {
    this.setState({lastName: e.target.value});
  }
  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }
  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }



   signUpCustomer(e) {
    e.preventDefault();

    return fetch('https://justgamification-api.herokuapp.com/customers', {


      method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        })
        })
        .then((response) => response.json())
        .then((json) => {
           this.props.history.push('/confirmation')
        })
        .catch((error) => {
          console.log('error')
          console.log(error);
        });
    }


  render() {
    

    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
  
        {/*  Site header */}
        <Header />
  
        {/*  Page content */}
        <main className="flex-grow">
  
          {/*  Page illustration */}
          <div className="relative max-w-6xl mx-auto h-0 pointer-events-none" aria-hidden="true">
            <PageIllustration />
          </div>
  
          <section className="relative">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              <div className="pt-32 pb-12 md:pt-40 md:pb-20">
  
                {/* Page header */}
                <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                  <h1 className="h1">Register Now</h1>
                </div>
  
                {/* Form */}
                <div className="max-w-sm mx-auto">
                  <form>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                        <input id="first-name" type="text" onChange={this.handleFirstNameChange}
                        className="form-input w-full text-gray-300" placeholder="First name" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                        <input id="last-name" type="text" onChange={this.handleLastNameChange}
                        className="form-input w-full text-gray-300" placeholder="Last name" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                        <input id="email" type="email" onChange={this.handleEmailChange}
                        className="form-input w-full text-gray-300" placeholder="you@name.com" required />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                      <div className="w-full px-3">
                        <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="password">Password <span className="text-red-600">*</span></label>
                        <input id="password" type="password" onChange={this.handlePasswordChange} 
                        className="form-input w-full text-gray-300" placeholder="Password (at least 10 characters)" required />
                      </div>
                    </div>
                    <div className="text-sm text-gray-500 text-center">
                      I agree to receive updates from Bridge DeFi, as stated in the <Link to="/bridgedefi-privacy.pdf" target="_blank"
                        className="underline text-gray-400 hover:text-gray-200 hover:no-underline transition duration-150 ease-in-out">Privacy Policy</Link>.
                                  </div>
                    <div className="flex flex-wrap -mx-3 mt-6">
                      <div className="w-full px-3">
                        <button onClick={this.signUpCustomer} className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Sign up</button>
                      </div>
                    </div>
                  </form>
                  <div className="text-gray-400 text-center mt-6">
                    Already registered to Bridge DeFi? <Link to="signin" className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out">Sign in</Link>
                  </div>
                </div>
  
              </div>
            </div>
          </section>
  
        </main>
  
      </div>
    );

  }

}

export default withRouter(SignUp)
