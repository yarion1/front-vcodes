export const TOKEN_KEY = '&app-token';
export const ID_USUARIO = '&id-usuario'

export const login = token =>{
    localStorage.setItem(TOKEN_KEY,token)
};
export const logout = ()=>{
    localStorage.clear()
};
export const setIdUsuario = id =>localStorage.setItem(ID_USUARIO,id);
export const getIdUsuario = () =>localStorage.setItem(ID_USUARIO);

export const getToken = () => localStorage.getItem(TOKEN_KEY)