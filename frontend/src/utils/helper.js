import { TOKEN_NAME } from "./constants";
export const tokenHelper = {
  set(token) {
    localStorage.setItem(TOKEN_NAME, token);
  },
  get() {
    return localStorage.getItem(TOKEN_NAME);
  },
  remove() {
    localStorage.removeItem(TOKEN_NAME);
  },
};

export const isLoggedIn = () => {
  return tokenHelper.get() !== null;
};
