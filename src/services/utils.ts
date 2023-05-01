import { PostgrestError } from "@supabase/supabase-js";
import { toast } from "react-toastify";

export const handleRequestError = (error: PostgrestError | any, messageShown: string | null) => {
  if(messageShown){
    toast.error(messageShown)
  }

  console.error('Error on request: ', error)
}