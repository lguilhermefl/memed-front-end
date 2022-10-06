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
