import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useState } from 'react'
import { useParams, useRouter, usePathname } from 'next/navigation'

import {toast } from 'react-toastify';

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()
    const pathname = usePathname();


    // middleware == auth: require login
    // middleware == guest: require not login

    if(!middleware) {
        middleware = 'guest';
    }
    
    const [isLoading, setIsLoading] = useState(true);
    

    const fetchUser = () => axios.get('/api/user').then(response => response.data.data);
    // const fetchUser = async () => {
    //     try {
    //         const response = await axios.get('/api/user');
            
    //         // Sử dụng handleResponse để kiểm tra và xử lý phản hồi từ API
    //         handleResponse({
    //             response,
    //             onSuccess: (data) => {
    //                 // Nếu phản hồi thành công, trả về dữ liệu người dùng
    //                 return data.data;
    //             },
    //             onError: (errorData) => {
    //                 // Nếu có lỗi (như lỗi 401), trả về null hoặc xử lý khác
    //                 if (response.status === 401) {
    //                     console.log('Unauthorized access');
    //                     return null;  // Trả về null nếu không được ủy quyền
    //                 }
    //                 console.log('API error:', errorData);
    //                 return null;
    //             }
    //         });
    //     } catch (error) {
    //         // Xử lý lỗi mạng hoặc lỗi hệ thống khác
    //         console.log('Error fetching user:', error);
    //         return null;
    //     }
    // };

    const {data: user, error, mutate} = useSWR('/api/user', fetchUser, {
        revalidateIfStale: true,
        revalidateOnFocus: true,
        revalidateOnReconnect: true
    });

    // handle api response
    // example response:
    // {
    //     "status": 200,
    //     "status_code": "HTTP_OK",
    //     "message": "Thành Công",
    //     "data": {
    //         "user": {
    //             "name": "tran ba khoa",
    //         },
    //         "token": "51|WI2xioIdFX7ndlpLIRbc6XUoDXV1LrC1Ic1IN4M09191cb66"
    //     }
    // }

    const handleResponse = ({ response, onError, onSuccess }) => {
        if (response?.status == 200 && response?.data?.status == 200) {
            if (onSuccess) onSuccess(response.data);
        } else {
            if (onError) onError(response.data);
        }
    };

    const csrf = () => axios.get('/api/csrf-cookie')

    const register = async ({ setErrors, redirectPath='/', ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/register', props)
            .then(response => handleResponse({
                response,
                onSuccess: data => {
                    let userData = data.data.user;
                    toast.success('Hello, ' + userData.name);
                    mutate();
                    router.push(redirectPath); // Redirect after register
                },
                onError: error => {
                    toast.error(error.data);
                    setErrors('Register fail!');
                },
            }))
            .catch(error => {
                if (error.status !== 422) throw error
                setErrors(error.data)
            })
    }

    const login = async ({ setErrors, redirectPath = '/', ...props }) => {
        await csrf()
        setErrors([])
        axios
            .post('/api/login', props)
            .then(response => handleResponse({
                response,
                onSuccess: data => {
                    let userData = data.data.user;
                    toast.success('Hello, ' + userData.name);

                    mutate();
                    router.push(redirectPath); // Redirect after login
                },
                onError: error => {
                    toast.error(error.data);
                    setErrors('Login fail!');
                },
            }))
            .catch(error => {
                console.log(error);
                if (error.code !== 422) throw error

                setErrors(error.data.errors)
            })
    }

    // const forgotPassword = async ({ setErrors, setStatus, email }) => {
    //     await csrf()

    //     setErrors([])
    //     setStatus(null)

    //     axios
    //         .post('/forgot-password', { email })
    //         .then(response => setStatus(response.data.status))
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error

    //             setErrors(error.response.data.errors)
    //         })
    // }

    // const resetPassword = async ({ setErrors, setStatus, ...props }) => {
    //     await csrf()

    //     setErrors([])
    //     setStatus(null)

    //     axios
    //         .post('/reset-password', { token: params.token, ...props })
    //         .then(response =>
    //             router.push('/login?reset=' + btoa(response.data.status)),
    //         )
    //         .catch(error => {
    //             if (error.response.status !== 422) throw error

    //             setErrors(error.response.data.errors)
    //         })
    // }

    // const resendEmailVerification = ({ setStatus }) => {
    //     axios
    //         .post('/email/verification-notification')
    //         .then(response => setStatus(response.data.status))
    // }

    // const logout = async () => {
    //     if (!error) {
    //         console.log('clicked logout');
    //         await axios.post('/api/logout').then(() => mutate())
    //     }

    //     window.location.pathname = '/auth/login'
    // }

    // const logout = async () => {
    //     await axios.post('/api/logout');

    //     mutate(null);

    //     router.push('/auth/login');
    // }

    const logout = async () => {
        try {
            console.log('Clicked logout');
            
            // Gửi request logout
            await axios.post('/api/logout');
            
            // Reset user state bằng mutate
            await mutate(null); // Đặt lại `user` thành null hoặc undefined
            
            // Chuyển hướng đến trang login
            router.push('/auth/login');
        } catch (error) {
            console.error('Logout failed:', error); // Log lỗi nếu xảy ra vấn đề
        }
    };

    useEffect(() => {
        if (user !== undefined || !!error){ // if user data is loaded from api/user ( if not login, user is null - not undefined)
            setIsLoading(false);
        }

        if(isLoading) return; // if is loading data, then do nothing

        const loginPage = pathname.startsWith('/auth/login');
        const registerPage = pathname.startsWith('/auth/register');
        const adminPage = pathname.startsWith('/admin');
        const userPage = pathname.startsWith('/user');

        if(userPage || adminPage) {
           middleware = 'auth';
        }
        if (user && (loginPage || registerPage)) { // redirect to homepage if user try to access login or register page after logged in
            router.push('/');
        }

        if (middleware == 'auth') {
            if(!user) {
                return router.push('/auth/login');
            } 

            if(adminPage && !user.is_admin) {
                router.push('/');
            }
        }

    }, [user, error, pathname, isLoading, router]);

    // useEffect(() => {
    //     if (!isLoading && (!user || !user?.isAdmin)) {
    //         router.push('/'); // Quay về trang chủ nếu không phải admin
    //     }
    // }, [isLoading, user, router]);


    // useEffect(() => {
    //     if (middleware === 'guest' && redirectIfAuthenticated && user)
    //         router.push(redirectIfAuthenticated)

    //     if (middleware === 'auth' && !user?.email_verified_at)
    //         router.push('/verify-email')
        
    //     if (
    //         window.location.pathname === '/verify-email' &&
    //         user?.email_verified_at
    //     )
    //         router.push(redirectIfAuthenticated)
    //     if (middleware === 'auth' && error) logout()
    // }, [user, error])

    return {
        user,
        csrf,
        register,
        login,
        // forgotPassword,
        // resetPassword,
        // resendEmailVerification,
        logout,
        error,
        isLoading,
    }
}