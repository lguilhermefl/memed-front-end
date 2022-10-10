import api from "./api";

export function signUp(user) {
  return api.post("/sign-up", user);
}
