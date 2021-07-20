import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.common['Content-Type'] = "application/x-www-form-urlencoded;charset=UTF-8";