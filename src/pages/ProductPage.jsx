import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import ProductModal from "../components/ProductModal";
import DelProductModal from "../components/DelProductModal";
import Toast from "../components/Toast";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: "",
  title: "",
  category: "",
  unit: "",
  origin_price: "",
  price: "",
  description: "",
  content: "",
  is_enabled: 0,
  imagesUrl: [""],
};


function ProductPage({ setIsAuth }){

    const [products, setProducts] = useState([]);

    const [tempProduct, setTempProduct] = useState(defaultModalState);

    const [modalMode, setModalMode] = useState("create");

    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);


    const getProducts = async (page = 1) => {
      try {
          const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/admin/products?page=${page}`);
          setProducts(res.data.products || []);  
          setPageInfo(res.data.pagination || { current_page: 1, total_pages: 1, has_pre: false, has_next: false });
      } catch (error) {
          alert("取得產品失敗");
      }
  };

      useEffect(() => {
        getProducts()
      }, [])
  

  const handleOpenDelProductModal = (product) => {
    setTempProduct(product);

    setIsDelProductModalOpen(true);
  };

    const handleOpenProductModal = (mode, product) => {
        setModalMode(mode);
        switch (mode) {
          case "create":
            setTempProduct(defaultModalState);
            break;
          case "edit":
            setTempProduct(product);
            break;
          default:
            break;
        }
        setIsProductModalOpen(true);
      };
  const [pageInfo, setPageInfo] = useState({})
  
  const handlePageChange = (page) => {
    getProducts(page)
  }

  const handleLogout = async () => {
    try {
       await axios.post(`${BASE_URL}/v2/logout`);
       setIsAuth(false);
    } catch (error) {
        alert("登出失敗");
    }
};


    return (
        <>

            <div className="container py-5">
            <div className="row mb-3">
              <div className="justify-content-end">
                <button onClick={handleLogout} type="button" className="btn btn-secondary">
                  登出
                </button>
              </div>
            </div>
        <div className="row">
            <div className="col">
            <div className="d-flex justify-content-between">
                <h2>產品列表</h2>
            <button onClick={() => handleOpenProductModal('create')} type="button" className="btn btn-primary">建立新的產品</button>
            </div>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">產品名稱</th>
                    <th scope="col">原價</th>
                    <th scope="col">售價</th>
                    <th scope="col">是否啟用</th>
                    <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? 
                    (<span className="text-success">啟用</span>) : <span>未啟用</span>}</td>
                    <td>
                    <div className="btn-group">
                        <button onClick={() => handleOpenProductModal('edit', product)} type="button" className="btn btn-outline-primary btn-sm">編輯</button>
                        <button onClick={() =>handleOpenDelProductModal(product)} type="button" className="btn btn-outline-danger btn-sm">刪除</button>
                    </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        </div>

        <Pagination pageInfo={pageInfo} handlePageChange={handlePageChange}></Pagination>
        </div>

        <ProductModal 
            tempProduct={tempProduct}
            getProducts={getProducts}
            modalMode={modalMode} 
            isOpen={isProductModalOpen} 
            setIsOpen={setIsProductModalOpen} 
        />

        <DelProductModal 
        tempProduct={tempProduct}
        getProducts={getProducts}
        isOpen={isDelProductModalOpen} 
        setIsOpen={setIsDelProductModalOpen} 
        />

        <Toast />
        </>
    )
    
}

export default ProductPage