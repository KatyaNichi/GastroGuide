import { useNavigate } from 'react-router-dom';
import './Popup.css';

interface PopupProps {
  onClose: () => void;
  message: string;
  header: string;
}

const Popup: React.FC<PopupProps> = ({ onClose, message, header }) => {
  const navigate = useNavigate();
  const handleClose = () => {
    onClose();
    navigate('/');
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h3>{header}</h3>
        <p>{message}</p>
        <button onClick={handleClose} className='custom-button '>Close</button>
      </div>
    </div>
  );
};

export default Popup;
