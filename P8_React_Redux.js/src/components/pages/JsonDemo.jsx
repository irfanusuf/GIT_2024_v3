


import React from 'react'
import { useFetchPostsQuery } from '../../Redux/api/JsonplaceholderApi'
import { Link } from 'react-router-dom'

const JsonDemo = () => {

        const {error , isLoading , data}  = useFetchPostsQuery()    // api call 






  return (
    <div>
        
        
         <h1> JsonDemo   </h1>


         <h2>  {error && error.message}   </h2>

         <h2>   {isLoading ? "Loading Dataa ...." : "Loading Succesfull!"} </h2>


         <div>
                {
                    data && data.map((post)=>
                    
                    <div key={post.id} className='p-9 m-5' style={{border : "1px solid black"}}>



                            <h1> userId : {post.userId} </h1>
                            <h1 className='text-2xl font-bold'> {post.title} </h1>
                            <p className=' text-red-500'>  {post.body} </p>


                            <Link to= {`/post/${post.id}`}>  ReadMore  </Link>


                    </div>)
                }

         </div>

    
    </div>
  )
}

export default JsonDemo