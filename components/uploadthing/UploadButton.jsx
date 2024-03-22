import { useState } from "react"
import { generateReactHelpers } from "@uploadthing/react"

const { uploadFiles } = generateReactHelpers()

const UploadButton = () => {
  const [file, setFile] = useState([])
  const [beginUpload, setBeginUpload] = useState(false)

  const changeHandler = e => {
    if (e.target.files) {
      const file = e.target.files[0]

      // Max 4MB
      if (file.size > 1024 * 3000) {
        return alert("Ukuran file terlalu besar")
      }

      setFile(file)
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()

    if (!file) return alert("File kosong")

    const formData = new FormData()
    formData.append("file", file)

    setBeginUpload(true)

    try {
      const uploadResponse = await uploadFiles("imageUploader", {
        files: [file],
      })

      console.log(uploadResponse) // Array

      const url = uploadResponse[0].url

      // upload ke database, si `url` nya...
    } catch (err) {
      alert("Gagal upload")
      console.log(err)
    }

    setBeginUpload(false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" multiple={false} accept="image/*" onChange={changeHandler} />
      <button>{beginUpload ? "Uploading..." : "Upload"}</button>
    </form>
  )
}

export default UploadButton
