import '../../styles/components/modal.css'
import {useState} from 'react'

//Modal = Modified alert
const Modal = ({ show, onClose, children }) => {
    if (!show) 
      return null;
  
    return (
      <div className="modal-overlay" onClick={onClose}>
         <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
          {children}
        </div> 
      </div>
    );
  };
  
  const PopupContainer = ({popContent,classStr,imgSrc}) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleShowModal = () => {
      setShowModal(true);
    };
  
    const handleCloseModal = () => {
      setShowModal(false);
    };

  const _src = imgSrc?imgSrc:'../../../assets/images/add_icon_dark.png' // Default icon (most used icon)
  const _className = classStr ? classStr : "tb--btn"// Default class (most used)
  return (
      <div>
        <div className={_className} onClick={handleShowModal} > 
          <img 
            src={_src}
            className="tb--btn-img"
            alt="Add member button"  />
        </div>
        <Modal
          show={showModal} 
          onClose={handleCloseModal} 
          children={popContent}
        />
      </div>
    );
  };
  
  export default PopupContainer;