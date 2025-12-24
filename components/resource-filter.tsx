'use client';

import { useState } from "react";
import { Resource } from "@/types/resource";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ResourceGrid from "./resource-grid";

interface ResourceFilterProps {
  resources: Resource[];
}

export default function ResourceFilter({ resources }: ResourceFilterProps) {
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter resources based on active tab
  const filteredResources = resources.filter((resource) => {
    if (activeTab === "all") return true;
    return resource.category === activeTab;
  });

  return (
    <>
      {/* Resource Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-12">
        <TabsList className="bg-zinc-800 border-zinc-700">
          <TabsTrigger 
            value="all" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            All
          </TabsTrigger>
          <TabsTrigger 
            value="compute" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Compute
          </TabsTrigger>
          <TabsTrigger 
            value="tool" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Tools
          </TabsTrigger>
          <TabsTrigger 
            value="skill" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Skills
          </TabsTrigger>
          <TabsTrigger 
            value="blueprint" 
            className="data-[state=active]:bg-zinc-700 data-[state=active]:text-white"
          >
            Blueprints
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Resource Grid */}
      <ResourceGrid resources={filteredResources} />
    </>
  );
}