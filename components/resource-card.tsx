'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { Resource } from "@/types/resource";
import { generateEnvFormat, generateCursorRules, generateRooCode } from "@/lib/config-generators";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${type} config copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy ${type} config`);
      console.error("Failed to copy:", error);
    }
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-full bg-zinc-700 hover:bg-zinc-600">
              Copy Config ▾
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
            <DropdownMenuLabel>Copy as</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-zinc-700" />
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={() => handleCopy(generateEnvFormat(resource), ".env")}
            >
              Copy .env
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={() => handleCopy(generateCursorRules(resource), "Cursor")}
            >
              Copy for Cursor
            </DropdownMenuItem>
            <DropdownMenuItem 
              className="hover:bg-zinc-700 cursor-pointer" 
              onClick={() => handleCopy(generateRooCode(resource), "Roo Code")}
            >
              Copy for Roo Code
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardFooter>
    </Card>
  );
}