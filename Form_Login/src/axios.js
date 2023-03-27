import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api/student/get-st-da-by-search';

export const getStudents = async (params, token) => {
    // param co the de trong, neu can tim hoac loc sinh se truyen param
    const url = "api/student/get-st-da-by-search";
    return axios
        .get(BASE_URL, params, {
            headers: {
                Authorization: "Bearer " + token, //the token is a variable which holds the token
            },
        })
        .then((res) => res);
};
// Function to get all hotels
// export const getStudents = async () => {
//     const response = await axios.get(BASE_URL);
//     return response.data;
// }

// Function to add a new hotel
export const addStudent = async (Student) => {
    const response = await axios.post(BASE_URL, Student);
    return response.data;
}

// Function to update an existing Student
export const updateStudent = async (Id, Student) => {
    const response = await axios.put(`${BASE_URL}/${Id}`, Student);
    return response.data;
}

// Function to delete a Student
export const deleteStudent = async (Id) => {
    const response = await axios.delete(`${BASE_URL}/${Id}`);
    return response.data;
}

