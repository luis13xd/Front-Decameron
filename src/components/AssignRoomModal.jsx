import { useState } from "react";
import PropTypes from "prop-types";
import './AssignRoomModal.css';  // Asegúrate de que tienes este archivo CSS

const AssignRoomsModal = ({ hotel, onClose, onSave }) => {
  const [assignments, setAssignments] = useState([...hotel.assignments]); // Inicializar con las asignaciones existentes
  const [type, setType] = useState("");
  const [accommodation, setAccommodation] = useState("");
  const [quantity, setQuantity] = useState("");

  // Calcular la cantidad total de habitaciones asignadas
  const getTotalAssignedRooms = () => {
    return assignments.reduce((total, assignment) => total + assignment.quantity, 0);
  };

  // Agregar una asignación
  const handleAddAssignment = () => {
    if (!type || !accommodation || !quantity) {
      alert("Por favor, complete todos los campos antes de agregar.");
      return;
    }

    const newAssignment = {
      type,
      accommodation,
      quantity: parseInt(quantity),
    };

    // Validar duplicados
    const exists = assignments.some(
      (a) => a.type === newAssignment.type && a.accommodation === newAssignment.accommodation
    );

    if (exists) {
      alert("Ya existe este tipo de habitación con la misma acomodación.");
      return;
    }

    // Verificar si la suma de habitaciones asignadas no supera el máximo
    const totalAssigned = getTotalAssignedRooms() + newAssignment.quantity;

    if (totalAssigned > hotel.maxHabitaciones) {
      alert("La cantidad total de habitaciones asignadas no puede superar el número máximo de habitaciones del hotel.");
      return;
    }

    setAssignments([...assignments, newAssignment]);
    setType("");
    setAccommodation("");
    setQuantity("");
  };

  // Eliminar una asignación
  const handleDeleteAssignment = (index) => {
    const updatedAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(updatedAssignments); // Eliminar asignación del modal
  };

  // Guardar cambios
  const handleSave = () => {
    onSave(assignments); // Pasar las asignaciones modificadas al componente principal
    onClose(); // Cerrar el modal
  };

  return (
    <div className="assign-room-modal-overlay" onClick={onClose}>
      <div className="assign-room-modal-container" onClick={(e) => e.stopPropagation()}>
        <h2 className="assign-room-modal-title">Hotel  {hotel.nombre}</h2>
        <div className="assign-room-modal-form">
          <div className="form-group">
            <label className="assign-room-label">Tipo de Habitación:</label>
            <select value={type} onChange={(e) => setType(e.target.value)} className="assign-room-select">
              <option value="">Seleccione</option>
              <option value="Estándar">Estándar</option>
              <option value="Junior">Junior</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          <div className="form-group">
            <label className="assign-room-label">Acomodación:</label>
            <select value={accommodation} onChange={(e) => setAccommodation(e.target.value)} disabled={!type} className="assign-room-select">
              <option value="">Seleccione</option>
              {type === "Estándar" && (
                <>
                  <option value="Sencilla">Sencilla</option>
                  <option value="Doble">Doble</option>
                </>
              )}
              {type === "Junior" && (
                <>
                  <option value="Triple">Triple</option>
                  <option value="Cuádruple">Cuádruple</option>
                </>
              )}
              {type === "Suite" && (
                <>
                  <option value="Sencilla">Sencilla</option>
                  <option value="Doble">Doble</option>
                  <option value="Triple">Triple</option>
                </>
              )}
            </select>
          </div>

          <div className="form-group">
            <label className="assign-room-label">Cantidad:</label>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" className="assign-room-input" />
          </div>

          <button className="assign-room-add-btn" onClick={handleAddAssignment}>Agregar</button>

          <ul className="assign-room-list">
            {assignments.map((a, index) => (
              <li key={index} className="assign-room-item">
                {a.quantity} Habitaciones - {a.type} ({a.accommodation})
                <button className="assign-room-delete-btn" onClick={() => handleDeleteAssignment(index)}>Borrar</button>
              </li>
            ))}
          </ul>

          <div className="assign-room-modal-actions">
            <button className="assign-room-save-btn" onClick={handleSave}>Guardar</button>
            <button className="assign-room-cancel-btn" onClick={onClose}>Cancelar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

AssignRoomsModal.propTypes = {
  hotel: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default AssignRoomsModal;
