import  {useCallback, useState} from 'react'
import {FileWithPath, useDropzone} from 'react-dropzone'
import { Button } from '../button';


interface Props{
    fieldChange: (Files : File[])=>void;
    mediaUrl: string;
}
const FileUploader = ({fieldChange,mediaUrl}:Props) => {

    const [files, setFiles] = useState<File[]>([]);
    const [fileUrl,setFileUrl]= useState('');
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
         className=' flex flex-col flex-center bg-dark-3 rounded-xl cursor-pointer' >
      <input {...getInputProps()}  className=' cursor-pointer'/>
      {
        fileUrl ? <div>
            test 1
        </div>
             : 
        <div className=' flex-col flex-center h-80 p-7 lg:h-[621px]'>
         <img 
            src="/assets/icons/file-upload.svg" 
            alt="upload" 
         />
         <h3 className=' base-medium text-light-2 mb-2 mt-6'>Drag photo here</h3>
         <p className=' text-light-4 small-regular mb-6 '>SVG,PNG,JPG</p>
         <Button className=' h-12 bg-dark-4 px-5 text-light-1 flex gap-2'>
            Upload from computer
         </Button>
        </div>
        
      }
    </div>
  )
}

export default FileUploader