import Alert from 'react-bootstrap/Alert'
import './index.css'

interface AlertProps {
  alertText: string | null
  setAlertText: (arg: string | null) => void
}

const AlertComponent: React.FC<AlertProps> = ({ alertText, setAlertText }) => {
  if (alertText) {
    return (
      <Alert variant="success" onClose={() => setAlertText(null)} dismissible id='alert-box'>
        <p>
          {alertText}
        </p>
      </Alert>
    );
  }
  return <></>;
}

export default AlertComponent;