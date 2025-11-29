//src/pages/admin/CategoriesPages.jsx
import React, { useState, useEffect } from "react";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../../services/categoryService";

import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaPlus, FaTimes } from "react-icons/fa";
import "./../../styles/CategoriesPage.css";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const token = localStorage.getItem("token");

  // Cargar categorías
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar las categorías", "error");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Crear o actualizar categoría
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await updateCategory(editingCategory.id, formData, token);
        Swal.fire("Actualizado", "Categoría actualizada correctamente", "success");
      } else {
        await createCategory(formData, token);
        Swal.fire("Creado", "Categoría creada correctamente", "success");
      }

      setFormData({ name: "", description: "" });
      setEditingCategory(null);
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      Swal.fire("Error", "No se pudo guardar la categoría", "error");
    }
  };

  // Editar categoría
  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, description: category.description });
    setShowModal(true);
  };

  // Eliminar categoría
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "¿Eliminar categoría?",
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
        await deleteCategory(id, token);
        Swal.fire("Eliminado", "Categoría eliminada correctamente", "success");
        fetchCategories();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar la categoría", "error");
      }
    }
  };

  // Filtrar categorías
  const filteredCategories = categories.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="categories-container">
      <h2 className="categories-title">Gestión de Categorías</h2>

      {/* Barra de búsqueda + botón crear */}
      <div className="search-create-container">
        <input
          type="text"
          placeholder="Buscar categoría..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="category-search-input"
        />
        <button
          className="btn-create"
          onClick={() => {
            setShowModal(true);
            setEditingCategory(null);
            setFormData({ name: "", description: "" });
          }}
        >
          <FaPlus /> Crear Categoría
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>{editingCategory ? "Editar Categoría" : "Crear Categoría"}</h3>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <FaTimes />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Nombre de la categoría"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <textarea
                name="description"
                placeholder="Descripción (opcional)"
                value={formData.description}
                onChange={handleChange}
              />
              <button type="submit">
                {editingCategory ? "Guardar cambios" : "Agregar categoría"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Tabla */}
      <div className="table-wrapper">
        <table className="category-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <tr key={category.id}>
                  <td>{category.id}</td>
                  <td>{category.name}</td>
                  <td>{category.description || "Sin descripción"}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleEdit(category)} className="btn-edit">
                      <FaEdit /> Editar
                    </button>
                    <button onClick={() => handleDelete(category.id)} className="btn-delete">
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="category-empty">
                  No se encontraron categorías
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;
