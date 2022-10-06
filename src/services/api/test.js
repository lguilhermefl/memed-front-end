import api from "./api";

export function create(test, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return api.post("/tests", test, config);
}
