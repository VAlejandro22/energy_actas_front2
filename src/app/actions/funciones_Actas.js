'use server';
const url = "http://back_actas:8000";
import axios from 'axios';

// Función para obtener todas las actas
export async function getActas() {
    try {
        const response = await axios.get(`${url}/actas/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching actas:", error);
        return null;
    }
}

// Función para obtener una acta por ID
export async function getActaById(id) {
    try {
        const response = await axios.get(`${url}/acta/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching acta ${id}:`, error);
        return null;
    }
}

// Función para crear una nueva acta
export async function createActa(acta) {
    try {
        const response = await axios.post(`${url}/actas/`, acta, {
            headers: {
                'Content-Type': 'application/json', // Asegúrate de enviar el JSON
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error creating acta:", error);
        return null;
    }
}


// Función para actualizar una acta existente
export async function updateActa(id, acta) {
    try {
        const response = await axios.put(`${url}/actas/${id}`, acta);
        return response.data;
    } catch (error) {
        console.error(`Error updating acta ${id}:`, error);
        return null;
    }
}

// Función para eliminar una acta
export async function deleteActa(id) {
    try {
        const response = await axios.delete(`${url}/actas/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting acta ${id}:`, error);
        return null;
    }
}

// Función para obtener todos los equipos
export async function getEquipos() {
    try {
        const response = await axios.get(`${url}/equipos/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching equipos:", error);
        return null;
    }
}

// Función para obtener un equipo por ID
export async function getEquipoById(id) {
    try {
        const response = await axios.get(`${url}/equipos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching equipo ${id}:`, error);
        return null;
    }
}

// Función para crear un nuevo equipo
export async function createEquipo(equipo) {
    try {
        const response = await axios.post(`${url}/equipos/`, equipo);
        return response.data;
    } catch (error) {
        console.error("Error creating equipo:", error);
        return null;
    }
}

// Función para actualizar un equipo existente
export async function updateEquipo(id, equipo) {
    try {
        const response = await axios.put(`${url}/equipos/${id}`, equipo);
        return response.data;
    } catch (error) {
        console.error(`Error updating equipo ${id}:`, error);
        return null;
    }
}

// Función para eliminar un equipo
export async function deleteEquipo(id) {
    try {
        const response = await axios.delete(`${url}/equipos/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting equipo ${id}:`, error);
        return null;
    }
}

// Función para obtener todos los empleados
export async function getEmpleados() {
    try {
        const response = await axios.get(`${url}/empleados/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching empleados:", error);
        return null;
    }
}

// Función para obtener un empleado por cédula
export async function getEmpleadoByCedula(cedula) {
    try {
        const response = await axios.get(`${url}/empleados/${cedula}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching empleado ${cedula}:`, error);
        return null;
    }
}
