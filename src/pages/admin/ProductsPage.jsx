// src/pages/admin/ProductsPage.jsx
import React, { useState, useEffect } from "react";
import { getProducts, createProduct, updateProduct, deleteProduct } from "../../services/productService";
import { getCategories } from "../../services/categoryService";
import "../../styles/ProductsPage.css";
import Swal from "sweetalert2";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    price: "",
    stock: "",
    description: "",
    image: null,
    categoryId: "",
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (err) {
      Swal.fire("Error", "No se pudieron cargar los productos", "error");
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      Swal.fire("Error", "No se pudieron cargar las categorías", "error");
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (confirm.isConfirmed) {
      try {
        await deleteProduct(id, token);
        await fetchProducts();
        Swal.fire("Eliminado", "Producto eliminado correctamente", "success");
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar el producto", "error");
      }
    }
  };

  const handleEdit = (product) => {
    setFormData({
      id: product.id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description || "",
      image: null,
      categoryId: product.categoryId || "",
    });
    setPreviewImage(
      product.image ? `http://localhost:4000/uploads/${product.image}` : null
    );
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files && files[0]) {
      setFormData({ ...formData, image: files[0] });
      setPreviewImage(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataToSend = new FormData();
      dataToSend.append("name", formData.name);
      dataToSend.append("price", formData.price);
      dataToSend.append("stock", formData.stock);
      dataToSend.append("description", formData.description);
      dataToSend.append("categoryId", formData.categoryId);
      if (formData.image) dataToSend.append("image", formData.image);

      if (formData.id) {
        await updateProduct(formData.id, dataToSend, token);
        Swal.fire("Actualizado", "Producto actualizado correctamente", "success");
      } else {
        await createProduct(dataToSend, token);
        Swal.fire("Creado", "Producto creado correctamente", "success");
      }

      setFormData({
        id: null,
        name: "",
        price: "",
        stock: "",
        description: "",
        image: null,
        categoryId: "",
      });
      setPreviewImage(null);
      setShowModal(false);
      fetchProducts();
    } catch (err) {
      Swal.fire("Error", "No se pudo guardar el producto", "error");
    }
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="products-page">
      <h2 className="page-title">Gestión de Productos</h2>

      <div className="top-bar">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setShowModal(true)}>Crear Producto</button>
      </div>


      <table className="products-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Descripción</th>
            <th>Categoría</th>
            <th>Imagen</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td className="description">{p.description}</td>
                <td>{p.category?.name || "Sin categoría"}</td>
                <td>
                  {p.image ? (
                    <img
                      src={`http://localhost:4000/uploads/${p.image}`}
                      alt={p.name}
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "6px",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    "Sin imagen"
                  )}
                </td>
                <td>
                  <button
                    className="edit-icon"
                    onClick={() => handleEdit(p)}
                    title="Editar"
                    style={{
                      backgroundColor: "#fdd835",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      marginRight: "5px",
                    }}
                  >
                    ✎
                  </button>
                  <button
                    className="delete-icon"
                    onClick={() => handleDelete(p.id)}
                    title="Eliminar"
                    style={{
                      backgroundColor: "#e53935",
                      border: "none",
                      padding: "6px 10px",
                      borderRadius: "4px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  >
                    🗑
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center", height: "150px" }}>
                No se encontraron productos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal para crear/editar producto */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-card">
            <h3>{formData.id ? "Editar Producto" : "Crear Producto"}</h3>
            <form onSubmit={handleSubmit} className="modal-form" encType="multipart/form-data">
              <input
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                name="price"
                type="number"
                placeholder="Precio"
                value={formData.price}
                onChange={handleChange}
                min="0"
                required
              />
              <input
                name="stock"
                type="number"
                placeholder="Stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                required
              />
              <textarea
                name="description"
                placeholder="Descripción"
                value={formData.description}
                onChange={handleChange}
              />
              <select
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Selecciona Categoría</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>

              <div className="image-uploader">
                {previewImage ? (
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <img
                      src={previewImage}
                      alt="preview"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => document.getElementById("imageInput").click()}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        cursor: "pointer",
                        color: "red",
                        fontWeight: "bold",
                        fontSize: "16px",
                      }}
                      onClick={() => {
                        setFormData({ ...formData, image: null });
                        setPreviewImage(null);
                      }}
                    >
                      ✕
                    </span>
                  </div>
                ) : (
                  <label style={{ cursor: "pointer" }}>
                    Agregar Imagen
                    <input
                      id="imageInput"
                      type="file"
                      name="image"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleChange}
                    />
                  </label>
                )}
              </div>

              <div className="modal-buttons">
                <button type="submit">{formData.id ? "Guardar Cambios" : "Crear Producto"}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
