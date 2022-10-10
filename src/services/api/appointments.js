import api from "./api";
import createConfig from "../../utils/createConfig";

export function create(appointment) {
  const config = createConfig();
  return api.post("/appointments", appointment, config);
}

export function list() {
  const config = createConfig();
  return api.get("/appointments", config);
}

export function getById(appointmentId) {
  const config = createConfig();
  return api.get(`/appointments/${appointmentId}`, config);
}

export function remove(appointmentId) {
  const config = createConfig();
  return api.delete(`/appointments/${appointmentId}`, config);
}

export function update(appointmentId, appointment) {
  const config = createConfig();
  return api.put(`/appointments/${appointmentId}`, appointment, config);
}
