import  {useCallback, useEffect, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'

interface Props{
    fieldChange: (Files : File[])=>void;
    mediaUrl: string;
}
const EditProfileFileUploader = ({fieldChange,mediaUrl}:Props) => {

    const [files, setFiles] = useState<File[]>([]);
    const [fileUrl,setFileUrl]= useState(mediaUrl);

    
    useEffect(() => {
      if (mediaUrl) {
          setFileUrl(mediaUrl);
      }
  }, [mediaUrl]);
  
    const onDrop = useCallback((acceptedFiles:FileWithPath[] )=>{
        setFiles(acceptedFiles)
        fieldChange(acceptedFiles);
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
        
    },[files])
    const {getRootProps, getInputProps} = useDropzone({
        onDrop,
    accept:{
        "image/*":[".png",".jpg",".gif",".svg"]
    }})
  return (
    <div {...getRootProps()}
         className='cursor-pointer' >
      <input {...getInputProps()}  className=' cursor-pointer'/>
      
       
       
      <div className=" flex gap-3 items-center">
          <img 
              src={fileUrl} 
              alt="profile"
              width={100}
              height={100}
              className=' rounded-full'
          />
          <p className=" text-[#0095F6] font-semibold text-[18px]">Change profile photo</p>
        </div>
      
              
      
        
      
    </div>
  )
}

export default EditProfileFileUploader