import { v2 as cloudinary } from "cloudinary"

export async function POST(req: Request) {
    const {file}: {file: string} = await req.json()

    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_API_KEY,
        api_secret: process.env.CLOUD_API_SECRET, // Click 'View API Keys' above to copy your API secret
      });

    try {
        const upload = await cloudinary.uploader.upload(file)

        return new Response(JSON.stringify(upload), {
            status: 201
        })
    }
    catch (error: any) {
        return new Response(error, {
            status: 500
        })
    }


}