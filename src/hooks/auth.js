import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

export const useAuth = ({ middleware, redirectIfAuthenticated } = {}) => {
    const router = useRouter()
    const params = useParams()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response.status !== 409) throw error
                // router.push('/verify-email')
            }),
    )

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

    const register = async ({ setErrors, setStatus, redirectPath='/', ...props }) => {
        await csrf()

        setErrors([])

        axios
            .post('/api/register', props)
            .then(response => handleResponse({
                response,
                onSuccess: data => {
                    setStatus('Register success!');
                    mutate();
                    router.push(redirectPath); // Redirect after register
                },
                onError: error => {
                    console.log(error);
                    setErrors('Register fail!');
                },
            }))
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const login = async ({ setErrors, setStatus, redirectPath = '/', ...props }) => {
        await csrf()
        setErrors([])
        setStatus(null)
        axios
            .post('/api/login', props)
            .then(response => handleResponse({
                response,
                onSuccess: data => {
                    setStatus('Login thành công!');
                    mutate();
                    router.push(redirectPath); // Redirect after login
                },
                onError: error => {
                    console.log(error);
                    setErrors('Login fail!');
                },
            }))
            .catch(error => {
                console.log(error);
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const forgotPassword = async ({ setErrors, setStatus, email }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resetPassword = async ({ setErrors, setStatus, ...props }) => {
        await csrf()

        setErrors([])
        setStatus(null)

        axios
            .post('/reset-password', { token: params.token, ...props })
            .then(response =>
                router.push('/login?reset=' + btoa(response.data.status)),
            )
            .catch(error => {
                if (error.response.status !== 422) throw error

                setErrors(error.response.data.errors)
            })
    }

    const resendEmailVerification = ({ setStatus }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status))
    }

    const logout = async () => {
        if (!error) {
            await axios.post('/api/logout').then(() => mutate())
        }

        window.location.pathname = '/user/login'
    }

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
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}