import { useEffect, useRef } from "react";
import axios from "axios";
import { Modal } from "bootstrap";
import { useDispatch } from "react-redux";
import { pushMessage } from "../redux/toastSlice";
import PropTypes from "prop-types";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function DelProductModal({ tempProduct, isOpen, setIsOpen, getProducts }) {
  const delProductModalRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    new Modal(delProductModalRef.current, { backdrop: false });
  }, []);

  useEffect(() => {
    if (isOpen) {
      const modalInstance = Modal.getInstance(delProductModalRef.current);
      modalInstance.show();
    }
  }, [isOpen]);

  const handleCloseDelProductModal = () => {
    const modalInstance = Modal.getInstance(delProductModalRef.current);
    modalInstance.hide();
    setIsOpen(false);
    document.activeElement.blur();
  };

  const deleteProduct = async () => {
    try {
      await axios.delete(`${BASE_URL}/v2/api/${API_PATH}/admin/product/${tempProduct.id}`);
      dispatch(pushMessage({ text: "刪除產品成功", status: "success" }));
    } catch (error) {
      dispatch(pushMessage({ text: "刪除產品失敗", status: "failed" }));
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await deleteProduct();
      getProducts();
      handleCloseDelProductModal();
    } catch (error) {
      dispatch(pushMessage({ text: "刪除產品失敗", status: "failed" }));
    }
  };

  return (
    <div
      ref={delProductModalRef}
      className="modal fade"
      id="delProductModal"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5">刪除產品</h1>
            <button
              onClick={handleCloseDelProductModal}
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            你是否要刪除
            <span className="text-danger fw-bold">{tempProduct.title}</span>
          </div>
          <div className="modal-footer">
            <button
              onClick={handleCloseDelProductModal}
              type="button"
              className="btn btn-secondary"
            >
              取消
            </button>
            <button onClick={handleDeleteProduct} type="button" className="btn btn-danger">
              刪除
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

DelProductModal.propTypes = {
  tempProduct: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  getProducts: PropTypes.func.isRequired,
};
export default DelProductModal;
