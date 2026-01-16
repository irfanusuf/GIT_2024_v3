import React from 'react'
import { useFetchPostByIdQuery } from '../../Redux/api/JsonplaceholderApi'
import { useParams } from 'react-router-dom'

const SinglePost = () => {




    const {postId} = useParams()



     const {error , data , isLoading} = useFetchPostByIdQuery(postId)


  return (
    <div>SinglePost</div>
  )
}

export default SinglePost