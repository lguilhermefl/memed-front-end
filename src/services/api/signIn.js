import api from "./api";

export function signIn(user) {
  return api.post("/", user);
}
