import { useState } from "react";
import PropTypes from "prop-types";
import "../pages/Home.css"; // Mantén los estilos específicos para el formulario

const HotelForm = ({ onSubmit }) => {
  const [hotel, setHotel] = useState({
    nombre: "",
    direccion: "",
    ciudad: "",
    nit: "",
    maxHabitaciones: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotel({ ...hotel, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(hotel);
    setHotel({
      nombre: "",
      direccion: "",
      ciudad: "",
      nit: "",
      maxHabitaciones: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="hotel-form">
      <h2 className="title">Crear Hotel</h2>
      <input
        type="text"
        name="nombre"
        placeholder="Nombre del Hotel"
        value={hotel.nombre}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="direccion"
        placeholder="Dirección"
        value={hotel.direccion}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="ciudad"
        placeholder="Ciudad"
        value={hotel.ciudad}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="text"
        name="nit"
        placeholder="NIT"
        value={hotel.nit}
        onChange={handleChange}
        required
        className="input-field"
      />
      <input
        type="number"
        name="maxHabitaciones"
        placeholder="Número de Habitaciones"
        value={hotel.maxHabitaciones}
        onChange={handleChange}
        required
        className="input-field"
      />
      <button type="submit" className="submit-button">Crear</button>
    </form>
  );
};

HotelForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default HotelForm;
