import { toast } from "react-toastify";

function Alert({ value }) {
  const Notify = () => {
    navigator.clipboard.writeText(value);
    toast.success("🤙 Copied!", {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  return (
    <div className="alert alert-secondary mb-3" role="alert">
      <div className="d-flex justify-content-between">
        <div>
          <span className="d-inline-block text-truncate widthTruncate">
            {value}
          </span>
        </div>
        <div className="iconPointer">
          <button
            type="button"
            className="btn btn-outline-dark btn-sm"
            onClick={Notify}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
