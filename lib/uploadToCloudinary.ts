import { v2 as cloudinary } from "cloudinary";

export default async function uploadToCloudinary(
  file: File,
  type: "image" | "video" | "auto"
) {
  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  }
  try {
    const base64File = await fileToBase64(file);
    console.log(process.env.NEXT_PUBLIC_BASE_URL)
    const res = await fetch("/api/cloudinary/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file: base64File }),
    });
    const upload = await res.json();

    return upload;
  } catch (error: any) {
    throw new Error(error);
  }
}
