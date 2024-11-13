"use client";

import { useState } from "react";
import { DomainInfoCard, SlugInfoCard } from "./settingsHoverCards";
import { useOrganization } from "@clerk/nextjs";

export default function SettingsForm({ orgId }: { orgId: string }) {
  const { organization } = useOrganization();

  const [blogName, setBlogName] = useState(organization?.name ?? "");
  const [slug, setSlug] = useState(organization?.slug ?? "");
  const [description, setDescription] = useState("");
  const [customDomain, setCustomDomain] = useState("");
  const [isPublished, setIsPublished] = useState(false);

  // Handle form submission
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Submit logic goes here
    alert("Settings saved successfully!");
  };

  return (
    <div className="w-full h-full mx-auto p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Blog Settings
      </h2>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Blog Name */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="blogName"
          >
            Blog Publication Name
          </label>
          <input
            type="text"
            id="blogName"
            value={blogName}
            onChange={(e) => setBlogName(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="e.g., My Awesome Blog"
          />
        </div>

        {/* Slug */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="slug"
          >
            Blog Slug
          </label>
          <SlugInfoCard slug={organization?.slug ?? ""} />
          <input
            type="text"
            id="slug"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="e.g., my-awesome-blog"
          />
        </div>

        {/* Description */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="description"
          >
            Blog Description
          </label>
          <textarea
            disabled
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Coming soon!"
          ></textarea>
        </div>

        {/* Custom Domain */}
        <div>
          <label
            className="block text-gray-700 font-medium mb-2"
            htmlFor="customDomain"
          >
            Custom Domain
          </label>
          <DomainInfoCard domain="" />
          <input
            type="text"
            id="customDomain"
            value={customDomain}
            onChange={(e) => setCustomDomain(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            placeholder="e.g., www.myblog.com"
          />
        </div>

        {/* Publish Toggle */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="isPublished"
            checked={isPublished}
            onChange={(e) => setIsPublished(e.target.checked)}
            className="h-5 w-5 text-blue-600 focus:ring focus:ring-blue-300 border-gray-300 rounded"
          />
          <label
            htmlFor="isPublished"
            className="ml-2 text-gray-700 font-medium"
          >
            Publish Blog
          </label>
        </div>

        {/* Save Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
