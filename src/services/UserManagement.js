export const getUserInDB = async (_user) => {

    const GET_USER_ENDPOINT = "http://localhost:8000/api/v1/users";

    const response = await fetch(GET_USER_ENDPOINT);

    const users = await response.json();

    console.log(`data = ${users}`);

    const arrayFiltered = users.filter(user => user.email === _user);
    return arrayFiltered[0]
};