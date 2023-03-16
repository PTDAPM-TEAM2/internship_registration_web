import axios from 'axios';

const BASE_URL = 'https://640062db29deaba5cb362b79.mockapi.io/account';

// const instance = axios.create({
//     BASE_URL,
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// Function to get all hotels
export const getStudents = async () => {
    const response = await axios.get(BASE_URL);
    return response.data;
}

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

