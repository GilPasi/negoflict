import React from 'react';
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
      const model = document.querySelector('.hen-fff')
      if (model) {
        model.show()
        this.setState({ showDialog: false }) // Reset the flag
      }
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <dialog className='hen-fff'>
          <h1>Oops, something went wrong.</h1>
          <p>We're sorry, but there was an error processing your request. Please try again. If the problem persists, please contact our support team.</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
          <button onClick={()=> window.location.href ='/login'}>Back to login page</button>
        </dialog>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
