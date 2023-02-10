//basic info
export const port = process.env.PORT
export const url = process.env.ROOT_URL
//methods
export const getUsers = `api/users`;
export const deleteUser = (id) => `api/users/${id}`;
export const editUser = (id) => `api/users/${id}`;
export const addUser = `api/users`;
