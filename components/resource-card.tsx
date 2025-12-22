'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Resource } from "@/types/resource";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const handleCopyConfig = () => {
    const configString = JSON.stringify(resource.config, null, 2);
    navigator.clipboard.writeText(configString);
    alert("Config copied to clipboard!");
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <CardTitle className="text-xl font-bold">{resource.name}</CardTitle>
        <CardDescription className="text-zinc-400">{resource.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Provider:</span>
            <span className="text-sm font-medium">{resource.provider}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Type:</span>
            <span className="text-sm font-medium capitalize">{resource.type}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Status:</span>
            <span className={`text-sm font-medium capitalize ${resource.status === 'active' ? 'text-green-400' : resource.status === 'beta' ? 'text-yellow-400' : 'text-red-400'}`}>
              {resource.status}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Config:</h4>
            <div className="bg-zinc-800 p-3 rounded-md text-xs font-mono overflow-x-auto">
              <pre>{JSON.stringify(resource.config, null, 2)}</pre>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleCopyConfig} className="w-full bg-zinc-700 hover:bg-zinc-600">
          Copy Config
        </Button>
      </CardFooter>
    </Card>
  );
}