import api from "./api";
import createConfig from "../../utils/createConfig";

export function create(test) {
  const config = createConfig();
  return api.post("/tests", test, config);
}

export function list() {
  const config = createConfig();
  return api.get("/tests", config);
}

export function getById(testId) {
  const config = createConfig();
  return api.get(`/tests/${testId}`, config);
}

export function remove(testId) {
  const config = createConfig();
  return api.delete(`/tests/${testId}`, config);
}

export function update(testId, test) {
  const config = createConfig();
  return api.put(`/tests/${testId}`, test, config);
}
