import React from 'react';
import '../../styles/components/errorBoundery.css'
import Button from './Button';
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      errorInfo: null,
      showDialog: false 
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
      showDialog: true
    });
  }

  componentDidUpdate() {
    if (this.state.showDialog) {
      const model = document.querySelector('.error-dialog')
      if (model) {
        model.showModal()
        this.setState({ showDialog: false }) // Reset the flag
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <dialog className='error-dialog'>
          <h1 className='error-header-text'>Oops, something went wrong.</h1>
          <p>We're sorry, but there was an error processing your request. Please try again. If the problem persists, please contact our support team.</p>
          <Button  size={'x-small'} fontSize={'large'} text='Try Again' onClick={() => window.location.reload()}/>
          <Button margin={'0'} size={'x-small'} fontSize={'large'} text='Back to login page' onClick={()=> window.location.href ='login'} />
        </dialog>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
