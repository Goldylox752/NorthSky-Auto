import { supabase } from "./supabase";

export async function uploadVehicleImage(file) {
  if (!file) {
    throw new Error("No file provided");
  }

  // Optional: basic image check
  if (!file.type.startsWith("image/")) {
    throw new Error("File must be an image");
  }

  // Optional size limit (e.g. 5 MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    throw new Error("Image must be smaller than 5 MB");
  }

  const fileExt = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const fileName = `${crypto.randomUUID()}.${fileExt}`;

  const { data, error } = await supabase.storage
    .from("vehicle-images")
    .upload(fileName, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage
    .from("vehicle-images")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}