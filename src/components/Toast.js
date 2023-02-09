import propTypes from "prop-types";

const Toast = ({ toasts, deleteToast }) => {
  //알림 배열
  return (
    <div className="alertAll">
      {toasts.map(toast => {
        return (
          <div 
            key={toast.id}
            onClick={() => {deleteToast(toast.id)}}
            className={`alert ${toast.type || 'success'}`}
          >
            {toast.text}
          </div>
        );
      })}
    </div>
  );
}

Toast.propTypes = {
  //여러개의 알림창을 받아옴 [{text:text},{text:text}]
  toasts: propTypes.arrayOf(propTypes.shape({
    text: propTypes.string,
    type: propTypes.string
  })).isRequired,
  deleteToast: propTypes.func.isRequired
}

Toast.defaultProps = {
  toasts: []
  //아무것도 없을 때 빈 배열이 기본 값
}

export default Toast;