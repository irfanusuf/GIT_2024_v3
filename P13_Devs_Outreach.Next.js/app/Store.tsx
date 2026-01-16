"use client"

import { axiosInstance } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { createContext, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

export const Context = createContext<any>(null)

const Store = ({ children }: { children: React.ReactNode }) => {

    const [store, setStore] = useState({
        loggedInUserId : "",
        user: {},
        userPosts: [],
        explorePosts: [],
        loading: false,
        userRefresh: 0,
        postsRefresh: 0
    })

    const router = useRouter()

    const loginApi = async (formData: {}) => {
        try {
            const response = await axiosInstance.post(`/user/login`, formData)   // API CALL
            if (response.data.success) {
                toast.success("login Succesfull")
                const username = response.data.payload

                setTimeout(() => {
                    router.push(`/user/profile/${username}`)
                }, 2000);

            }
        } catch (error) {
            console.log(error)
        }
    }

    const registerApi = async (formData: {}) => {
        try {
            const response = await axiosInstance.post(`/user/register`, formData)   // API CALL
            if (response.data.success) {
                toast.success("Register Succesfull")
                
                const username = response.data.payload

                setTimeout(() => {
                    router.push(`/user/profile/${username}`)
                }, 2000);

            }
        } catch (error) {
            console.log(error)
        }
    }

    const verifyUserApi = useCallback(
        async () => {
            try {

                const response = await axiosInstance.get(`/user/verifyUser`)   // API CALL
                if (response.status === 200) {

                    setStore((prev) => ({...prev , loggedInUserID : response.data.payload}))
                    return true
                }
                router.push("/user/login")
                return false

            } catch (error) {
                console.log(error)
                return false
            }
        }, [])

    const fetchUserDetails = useCallback(
        async (username: string) => {
            try {
                setStore(prev => ({ ...prev, loading: true }))

                const response = await axiosInstance.get(`/user/userdetails/${username}`)   // API CALL
                if (response.data.success) {
                    setStore(prev => ({ ...prev, user: response.data.payload, loading: false }))
                    return response.data.payload._id
                }

            } catch (error) {
                console.log(error)
            }
        }, [store.userRefresh])

    const fetchUserPosts = useCallback(async (userId: string) => {
        try {
            setStore(prev => ({ ...prev, loading: true }))


            const res = await axiosInstance.get(`/posts/user/${userId}`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, userPosts: res.data.payload, loading: false }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [store.postsRefresh])

    const fetchExplorePosts = useCallback(async () => {
        try {
            setStore(prev => ({ ...prev, loading: true }))

            const res = await axiosInstance.get(`/posts/explorePosts`)
            if (res.data.success) {
                setStore(prev => ({ ...prev, explorePosts: res.data.payload, loading: false }))
            }
        } catch (error) {
            console.log(error)
        }
    }, [store.postsRefresh])

    async function uploadPostAPI(formData: any) {

        try {
            setStore(prev => ({ ...prev, loading: true }))
            const res = await axiosInstance.post(`/post/create`, formData)
            if (res.data.success) {
                // toast.success("Post uploaded Succesfully!")
                return true
            }
            return false
        } catch (error : any) {

            if (error.response) {
                const codesARR = [400, 401, 403, 404, 500]

                if (codesARR.includes(error.status)) {
                    toast.error(error.response.data.message)
                } else {
                    toast.error("Something Went Wrong !")
                }
            } else {
                toast.error("Connection Refused !")
            }
            return false
        }
    }

    async function likeApi(postId: string) {
        try {
            const res = await axiosInstance.post(`/post/like/${postId}`)
            if (res.data.success) {
                setStore(prev => ({...prev , postsRefresh: store.postsRefresh + 1}))
                return true
            }
            else{
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function commentApi(text: string, postId: string) {
        if (!text.trim()) return
        try {

            const res = await axiosInstance.post(`/post/comment/${postId}`, { text })

            if (res.data.success) {
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function replyApi(replyText: string, postId: string, commentId: string) {
        if (!replyText.trim()) return
        try {

            const res = await axiosInstance.post(`/post/comment/${postId}/reply/${commentId}`, {
                text: replyText
            })

            if (res.data.success) {
                return true

            } else {
                return false
            }
        } catch (error) {
            console.log(error)
            return false
        }
    }

    async function shareApi() {
    }

    async function reportComment(commentId: string) {
        try {

            const res = await axiosInstance.post(`/post/comment/${commentId}/report`)

            if (res.data.success) {

            }
        } catch (error) {
            console.log(error)
        }
    }

    async function editComment(editText: string, commentId: string) {
        if (!editText.trim()) return
        try {

            const res = await axiosInstance.put(`/post/comment/${commentId}`, {
                text: editText
            })

            if (res.data.success) {
                // setRefresh(refresh => refresh + 1)
                // setEditingCommentId(null)
                // setEditText("")
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function deleteComment(commentId: string) {
        if (!window.confirm("Are you sure you want to delete this comment?")) return
        try {

            const res = await axiosInstance.delete(`/post/comment/${commentId}`)

            if (res.data.success) {
                // setRefresh(refresh => refresh + 1)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (

        <Context.Provider
            value={{
                ...store,
                loginApi,
                registerApi,
                verifyUserApi,
                fetchUserPosts,
                fetchExplorePosts,
                fetchUserDetails,
                uploadPostAPI,
                likeApi,
                commentApi,
                replyApi,
                shareApi,
                reportComment,
                editComment,
                deleteComment

            }}>
            {children}
        </Context.Provider>

    )
}

export default Store