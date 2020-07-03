import axios from 'axios'

const API_PREFFIX = '/practical'

export const getRandomFactors = () => {
    return axios.get(`${API_PREFFIX}/multiplications/random`)
}

export const postResult = (resultAttempt) => {
    return axios.post(`${API_PREFFIX}/results`, resultAttempt)
}