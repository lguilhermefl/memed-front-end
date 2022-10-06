import api from "./api";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export function create(appointment) {
  return api.post("/appointments", appointment, config);
}

export function list() {
  return api.get("/appointments", config);
}

export function remove(appointmentId) {
  return api.delete(`/appointments/${appointmentId}`, config);
}

export function update(appointmentId, appointment) {
  return api.put(`/appointments/${appointmentId}`, appointment, config);
}
