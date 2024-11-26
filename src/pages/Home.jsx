import { useState } from "react";
import HotelForm from "../components/HotelForm";
import AssignRoomModal from "../components/AssignRoomModal";
import './Home.css'

const Home = () => {
  const [hoteles, setHoteles] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const handleAddHotel = (nuevoHotel) => {
    // Verificar si el nombre del hotel ya existe
    const hotelExists = hoteles.some((h) => h.nombre.toLowerCase() === nuevoHotel.nombre.toLowerCase());
  
    if (hotelExists) {
      alert("El nombre del hotel ya existe. Por favor, ingresa otro nombre.");
      return;
    }
  
    // Si el nombre no existe, agregar el hotel
    setHoteles([...hoteles, { ...nuevoHotel, assignments: [] }]);
  };
  

  const handleOpenModal = (hotel) => setSelectedHotel(hotel);
  const handleCloseModal = () => setSelectedHotel(null);

  const handleSaveAssignments = (newAssignments) => {
    const updatedHotels = hoteles.map((h) => {
      if (h.nombre === selectedHotel.nombre) {
        // Aquí se reemplazan las asignaciones del hotel con las nuevas asignaciones del modal
        return { ...h, assignments: newAssignments };
      }
      return h;
    });
  
    setHoteles(updatedHotels);
    handleCloseModal(); // Cerrar el modal
  };
  
  
  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ textAlign: "center", color: "#007BFF" }}>Gestión de Hoteles</h1>

      <div className="content-container">
        <HotelForm onSubmit={handleAddHotel} />

        <div className="hotel-list">
          {hoteles.length === 0 ? (
            <p>No hay hoteles creados aún.</p>
          ) : (
            hoteles.map((hotel, index) => (
              <div key={index} className="hotel-card">
                <div className="hotel-info">
                  <h3>{hotel.nombre}</h3>
                  <p>
                    <strong>Dirección:</strong> {hotel.direccion}
                  </p>
                  <p>
                    <strong>Ciudad:</strong> {hotel.ciudad}
                  </p>
                  <p>
                    <strong>NIT:</strong> {hotel.nit}
                  </p>
                  <p>
                    <strong>Número de Habitaciones:</strong>{" "}
                    {hotel.maxHabitaciones}
                  </p>

                </div>
                <div className="hotel-assignments">
                  <h4>Tipo de habitaciones</h4>
                  {hotel.assignments.length === 0 ? (
                    <p>No hay habitaciones asignadas.</p>
                  ) : (
                    <ul>
                      {hotel.assignments.map((a, idx) => (
                        <li key={idx}>
                          {a.quantity} Habitaciones - {a.type} ({a.accommodation})
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <button onClick={() => handleOpenModal(hotel)}>
                    Asignar Habitaciones
                  </button>
              </div>
            ))
          )}
        </div>

        {selectedHotel && (
          <AssignRoomModal
            hotel={selectedHotel}
            onClose={handleCloseModal}
            onSave={handleSaveAssignments}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
