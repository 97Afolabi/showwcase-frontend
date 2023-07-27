export const BASE_API_ROUTE = process.env.NEXT_PUBLIC_BASE_API_ROUTE;

export const ApiRoutes = {
  login: BASE_API_ROUTE + "/auth/login",
  register: BASE_API_ROUTE + "/auth/register",
  saveHistory: BASE_API_ROUTE + "/education",
  getAllHistory: BASE_API_ROUTE + "/education",
  getOneHistory: BASE_API_ROUTE + "/education/",
  updateHistory: BASE_API_ROUTE + "/education/",
  deleteHistory: BASE_API_ROUTE + "/education/",
};
