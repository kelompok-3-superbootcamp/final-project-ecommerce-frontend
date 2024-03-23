import { useRouter } from "next/router"
import Form from "../form"


const Edit = ()=>{
  const router = useRouter()
  return(
    <>
      <Form status={'edit'} id={router.query.id}/>
    </>
  )
}

export default Edit