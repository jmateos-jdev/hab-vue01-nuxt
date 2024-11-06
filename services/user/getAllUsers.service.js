export const getAllUsersService = async (token) => {
    const response = await fetch('http://apiohpanel.jdev.com.ar/users', {
        method: 'GET',
        headers: {
            'authorization': token
        }
    })
    return response.json();
}