 
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

import { EditUserFormValidation } from "../../lib"
import { Models } from "appwrite"
import { useUpdateUser } from "../../lib/react-query/queriesAndMutations"
import { useToast } from "../ui/use-toast"
import { useNavigate } from "react-router-dom"
import EditProfileFileUploader from "../ui/shared/EditProfileFileUploader"
import Loader from "../ui/shared/Loader"


interface EditProfileFormProps{
    user?: Models.Document,
}
const EditProfileForm = ({ user }: EditProfileFormProps) => {

  const { mutateAsync: updateUser, isPending: isEditingUser } = useUpdateUser();
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof EditUserFormValidation>>({
    resolver: zodResolver(EditUserFormValidation),
    defaultValues: {
      file: [],
      name: user?.name ?? "", 
      username: user?.username ?? "", 
      email: user?.email ?? "", 
      bio: user?.bio ?? "", 
    },
  });

  async function onSubmit(values: z.infer<typeof EditUserFormValidation>) {
    console.log(values);
    
    if (user) {
      const updatedUser = await updateUser({
        ...values,
        userId: user.$id,
        imageUrl: user.imageUrl,
        imageId: user.imageId,
        bio: user.bio,
        name: values.name,
      });

      if (!updatedUser) {
        toast({ title: "Please try again" });
      }
      return navigate(`/profile/${user.$id}`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">
      <FormField
        control={form.control}
        name="file"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <EditProfileFileUploader
                fieldChange= {field.onChange}
                mediaUrl={user?.imageUrl || ""}
             
              />
            </FormControl>
          
            <FormMessage className=" text-red" />
          </FormItem>
        )}
      />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
                />
              </FormControl>
              <FormMessage className=" text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
                />
              </FormControl>
              <FormMessage className=" text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Email</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="email"
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
                />
              </FormControl>
              <FormMessage className=" text-red" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel className=" text-white">Bio</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="h-12 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
                />
              </FormControl>
              <FormMessage className=" text-red" />
            </FormItem>
          )}
        />
        <div className=" flex gap-3 justify-end items-center">
          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-500 text-light-1 flex gap-2 whitespace-nowrap"
          >
            {isEditingUser ? 
            (<Loader/>): (<p> Update Profile</p>)}
         
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditProfileForm;
