import { supabase } from "./supabase";

export async function uploadVehicleImage(file) {

  const fileName = `${Date.now()}-${file.name}`;

  const { data, error } = await supabase.storage
    .from("vehicle-images")
    .upload(fileName, file);


  if (error) {
    throw error;
  }


  const { data: urlData } = supabase.storage
    .from("vehicle-images")
    .getPublicUrl(data.path);


  return urlData.publicUrl;

}