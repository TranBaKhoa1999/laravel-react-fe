import Axios from 'axios'
const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
    withXSRFToken: true
})
axios.interceptors.request.use((config) => {
    // Lấy cookie bằng cách split để lấy giá trị `XSRF-TOKEN`
    const token = getCookie('XSRF-TOKEN');
    console.log(token);
    if (token) {
        config.headers['X-XSRF-TOKEN'] = token;
    }
    return config;
});

// Helper function để lấy cookie theo tên
function getCookie(name) {
    const cookie = document.cookie
        .split("; ")
        .find((item) => item.startsWith(`${name}=`));

    if (!cookie) {
        return null;
    }

    return decodeURIComponent(cookie.split("=")[1]);
}


export default axios