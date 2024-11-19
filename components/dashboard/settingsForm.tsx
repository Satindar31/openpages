// "use client";

// import { Key, useState } from "react";
// import { DomainInfoCard, SlugInfoCard } from "./settingsHoverCards";
// import { useOrganization } from "@clerk/nextjs";
// import { toast } from "sonner";
// import { Button } from "@/components/ui/button";

// export default function SettingsForm() {
//   const { organization } = useOrganization();

//   const [blogName, setBlogName] = useState(organization?.name ?? "");
//   const [slug, setSlug] = useState(organization?.slug ?? "");
//   const [description, setDescription] = useState("");
//   const [customDomain, setCustomDomain] = useState("");
//   const [customDomainUpdated, setCustomDomainUpdated] = useState(false);
//   const [isPublished, setIsPublished] = useState(false);

//   const [res, setRes] = useState<Response | null>(null);
//   const [domainVerified, setDomainVerified] = useState<boolean | null>(null);

//   // Handle form submission
//   const handleSave = (e: React.FormEvent) => {
//     e.preventDefault();
//     const id = toast.loading("Saving settings...");

//     if (customDomainUpdated) {
//       fetch("/api/publication/update", {
//         method: "PUT",
//         body: JSON.stringify({
//           name: blogName,
//           slug: slug,
//           description: description,
//           isPublished: isPublished,
//           customDomain: customDomain,
//         }),
//       })
//         .then((res) => {
//           setRes(res);
//           if (res.ok) {
//             toast.dismiss(id);
//             res.json().then(data => {
//               if (data.verified == false) {
//                 setDomainVerified(false);
//                 return toast.error(
//                   "The domains DNS is not correct. Make sure to add the correct DNS records to your domain"
//                 );
//               }
//             })
//             toast.success("Settings saved successfully!");
//             setCustomDomainUpdated(false);
//           } else {
//             toast.dismiss(id);
//             console.error(res);
//             if (res.status === 409) {
//               return toast.error(
//                 "The domains DNS is not correct. Make sure to add the correct DNS records to your domain."
//               );
//             }
//             toast.error("Error saving settings. Error code: " + res.status, {
//               action: (
//                 <Button className="h-fit" onClick={handleSave}>
//                   Retry
//                 </Button>
//               ),
//             });
//           }
//         })
//         .catch((err) => {
//           toast.dismiss(id);
//           console.error(err);
//           toast.error("Error saving settings. Error code: " + err.code, {
//             action: (
//               <Button className="h-fit" onClick={handleSave}>
//                 Retry
//               </Button>
//             ),
//           });
//         });
//     }

//     fetch("/api/publication/update", {
//       method: "PUT",
//       body: JSON.stringify({
//         name: blogName,
//         slug: slug,
//         description: description,
//         isPublished: isPublished,
//       }),
//     });
//   };

//   return (
//     <div className="w-full h-full mx-auto p-8 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-semibold text-gray-800 mb-6">
//         Blog Settings
//       </h2>

//       <form onSubmit={handleSave} className="space-y-6">
//         {/* Blog Name */}
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="blogName"
//           >
//             Blog Publication Name
//           </label>
//           <input
//             type="text"
//             id="blogName"
//             value={blogName}
//             onChange={(e) => setBlogName(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="e.g., My Awesome Blog"
//           />
//         </div>

//         {/* Slug */}
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="slug"
//           >
//             Blog Slug
//           </label>
//           <SlugInfoCard slug={organization?.slug ?? ""} />
//           <input
//             type="text"
//             id="slug"
//             value={slug}
//             onChange={(e) => setSlug(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="e.g., my-awesome-blog"
//           />
//         </div>

//         {/* Description */}
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="description"
//           >
//             Blog Description
//           </label>
//           <textarea
//             disabled
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="Coming soon!"
//           ></textarea>
//         </div>

//         {/* Custom Domain */}
//         <div>
//           <label
//             className="block text-gray-700 font-medium mb-2"
//             htmlFor="customDomain"
//           >
//             Custom Domain
//           </label>
//           <DomainInfoCard domain="" />
//           <input
//             type="text"
//             id="customDomain"
//             value={customDomain}
//             onChange={(e) => {
//               setCustomDomain(e.target.value);
//               setCustomDomainUpdated(true);
//             }}
//             className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//             placeholder="e.g., www.myblog.com"
//           />
//           {/* {domainVerified === false && (
//             <>
//               {res && res.json().then((data) => (
//                 <>{data.verified == false ? (
//                   data.verification.map((steps: any, key: Key | null | undefined) => (
//                     <div key={key} className="mt-2">
//                       {JSON.stringify(steps)}
//                     </div>
//                   ))
//                 ) : <></>}</>
//               ))}
//             </>
//           )} */}
//         </div>

//         {/* Publish Toggle */}
//         <div className="flex items-center">
//           <input
//             type="checkbox"
//             id="isPublished"
//             checked={isPublished}
//             onChange={(e) => setIsPublished(e.target.checked)}
//             className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-300 border-gray-300 rounded"
//           />
//           <label
//             htmlFor="isPublished"
//             className="ml-2 text-gray-700 font-medium"
//           >
//             Publish Blog
//           </label>
//         </div>

//         {/* Save Button */}
//         <div>
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
//           >
//             Save Settings
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
