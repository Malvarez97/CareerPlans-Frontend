import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

export default class SubjectService {
    constructor() {

    }

}

export async function getSubjects() {
    try {
        const response = await axios({
            url: `${baseUrl}/subjects`,
            method: 'GET'
        })
        return response
    } catch (e) {
        console.log(e)
    }

}



export async function postSubject(data, id) {
    try {
        const response = axios.put(`http://localhost:4000/api/plan/add-subject/${id}`, data)
        //http://localhost:4000/api/plan/add-subject/61f5ed09f80f14b0f5ec5f76
        return response
    } catch (e) {
        console.log(e)
    }

}

