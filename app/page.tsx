import ResourceGrid from "@/components/resource-grid";
import { Resource } from "@/types/resource";

// Read JSON data
import apisData from "@/data/apis.json";

export default function Home() {
  // Add type assertion to convert JSON data to Resource type
  const resources: Resource[] = apisData as Resource[];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-8">Vibe Navigator</h1>
        <p className="text-zinc-400 mb-12">Discover and manage AI resources</p>
        <ResourceGrid resources={resources} />
      </main>
    </div>
  );
}