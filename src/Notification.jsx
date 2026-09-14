import { FaCheck } from "react-icons/fa";

const Notification = ({ message }) => {
  return (
    <div className="copy-notification">
      <div className="notification-icon">
        <FaCheck />
      </div>

      <span>{message}</span>
    </div>
  );
};

export default Notification;