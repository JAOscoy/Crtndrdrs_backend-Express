// Create global offer for current production feasibility

const oferta = {
    estructura: ["uno", "dos"],
    tipo: ["tres", "cuatro"],
    calibreECT: ["37", "38", "39"],
    caraExterior: ["kraft", "blanco"],
    largo: [100, 200],
    ancho: [300, 400],
    alto: [500, 600],
    tipoUnion: ["CIP", "CIG"],
    status: ["vendido", "borrador"],
    estado: ["Pendiente", "Rechazada", "En proceso", "Finalizada"],
    solicitud: {
            tipo: ["solicitud", "pedido"]
        },
    role: ["ADMIN", "USER"]
    };

module.exports = oferta

