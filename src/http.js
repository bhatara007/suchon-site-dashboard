import axios from 'axios'

export default axios.create({
    baseURL: "https://suchonsite-server.herokuapp.com/people/"
})