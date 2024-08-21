 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input" 
import { Textarea } from "../ui/textarea"
import FileUploader from "../ui/shared/FileUploader"
import { PostFormValidation } from "../../lib"
import { Models } from "appwrite"
import { useCreatePost, useUpdatePost } from "../../lib/react-query/queriesAndMutations"
import { useUserContext } from "../../context/AuthContext"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"


type PostFormProps ={
  post?: Models.Document
  action: "Create" | "Update";
}


const PostForm = ({post,action}:PostFormProps) => {

  const { mutateAsync:createPost,isPending:isCreatingPost}= useCreatePost();

  const { mutateAsync:updatePost,isPending:isEditingPost}= useUpdatePost();
  
  const {user}= useUserContext();
  const {toast}= useToast();
  const navigate= useNavigate()

  const form = useForm<z.infer<typeof PostFormValidation>>({
    resolver: zodResolver(PostFormValidation),
    defaultValues: {
      caption: post ? post?.caption :"",
      file:[],
      location: post ? post?.location : "",
      tags: post ? post?.tags.join(',') : "",
    },
  })
 
  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof PostFormValidation>) {

    if (post && action === "Update"){
      const updatedPost= await updatePost({
        ...values,
        postId:post.$id,
        image:post.image,
        imageId:post.imageId
      })

      if(!updatedPost){
        toast({title:"Please try again"})
      }
      return navigate(`/posts/${post.$id}`)
    }
  
    const newPost= await createPost(
      {
       ...values,
       userId:user.id
      }
    )

    if(!newPost){
      return toast({
        title: `${action} post failed: Please try again`,
      })
    }

    navigate("/");
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="caption"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Caption</FormLabel>
            <FormControl>
              <Textarea {...field} className=" h-36 bg-dark-3 rounded-xl border-none focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Add Photos</FormLabel>
            <FormControl>
              <FileUploader
                fieldChange= {field.onChange}
                mediaUrl={post?.imageUrl || ""}
             
              />
            </FormControl>
          
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Add Location</FormLabel>
            <FormControl>
              <Input {...field} className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="tags"
        render={({ field }) => (
          <FormItem>
            <FormLabel className=" text-white">Add Tags (separated by comma ",")</FormLabel>
            <FormControl>
              <Input 
              {...field}
              placeholder="Python, TypeScript, etc..."
              className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "/>
            </FormControl>
            
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
      <div className=" flex gap-3 justify-end items-center">

        <Button 
          type="button"
          className=" h-12 bg-dark-4 px-5 text-light-1 flex gap-2"
          >
          Cancel
        </Button>
        <Button 
        disabled={isEditingPost || isCreatingPost}
         type="submit"
         className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2 whitespace-nowrap"
         >
          {isCreatingPost || isEditingPost && "Loading..."}
          {action} Post
        </Button>
      </div>
    </form>

  </Form>
  )
}

export default PostForm