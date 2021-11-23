import axios from 'axios'

const axiosPost = async (url, body) => {
    try {
        return await axios.post(url, body);
    } catch (e) {
        throw(e)
        // throw new Error(e.toString());
    }
}

export default axiosPost;