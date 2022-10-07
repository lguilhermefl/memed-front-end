import api from "./api";

const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

export function create(test) {
  return api.post("/tests", test, config);
}

export function list() {
  return api.get("/tests", config);
}

export function getById(testId) {
  return api.get(`/tests/${testId}`, config);
}

export function remove(testId) {
  return api.delete(`/tests/${testId}`, config);
}

export function update(testId, test) {
  return api.put(`/tests/${testId}`, test, config);
}
