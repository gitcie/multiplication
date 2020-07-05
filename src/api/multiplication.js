import axios from 'axios'

const API_PREFFIX = '/practical'

/**
* 获取乘法因子
*/
export const getRandomFactors = () => {
    return axios.get(`${API_PREFFIX}/multiplications/random`)
}

/**
* 提交乘法结果值
*/
export const postResult = (resultAttempt) => {
    return axios.post(`${API_PREFFIX}/results`, resultAttempt)
}

/**
* 获取用户最近尝试
*/
export const getUserRecentAttempts = (alias) => {
	return axios.get(`${API_PREFFIX}/results`, {
		params: {
			alias
		}
	})
}