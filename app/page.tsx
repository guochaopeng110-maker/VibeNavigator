'use client';

import { useState } from "react";
import ResourceGrid from "@/components/resource-grid";
import { Resource } from "@/types/resource";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Read JSON data
import resourcesData from "@/data/resources.json";

export default function Home() {
  // Add type assertion to convert JSON data to Resource type
  const allResources: Resource[] = resourcesData as Resource[];
  const [activeTab, setActiveTab] = useState<string>("all");

  // Filter resources based on active tab
  const filteredResources = allResources.filter((resource) => {
    if (activeTab === "all") return true;
    return resource.category === activeTab;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Vibe Navigator</h1>
        <p className="text-zinc-400 mb-8">Discover and manage AI resources</p>
        
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
      </main>
    </div>
  );
}