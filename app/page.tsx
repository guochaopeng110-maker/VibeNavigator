import { Resource } from "@/types/resource";
import ResourceFilter from "@/components/resource-filter";

// Read JSON data
import resourcesData from "@/data/resources.json";

export default function Home() {
  // Add type assertion to convert JSON data to Resource type
  const allResources: Resource[] = resourcesData as Resource[];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-4">Vibe Navigator</h1>
        <p className="text-zinc-400 mb-8">Discover and manage AI resources</p>
        
        {/* Resource Filter with Tabs (Client Component) */}
        <ResourceFilter resources={allResources} />
      </main>
    </div>
  );
}