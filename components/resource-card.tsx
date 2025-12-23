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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";
import { 
  Resource, 
  ComputeResource, 
  SkillResource, 
  BlueprintResource,
  ToolResource
} from "@/types/resource";
import { generateEnvFormat, generateRooCode } from "@/lib/config-generators";

interface ResourceCardProps {
  resource: Resource;
}

// Type Guards
const isComputeResource = (resource: Resource): resource is ComputeResource => {
  return resource.category === "compute";
};

const isSkillResource = (resource: Resource): resource is SkillResource => {
  return resource.category === "skill";
};

const isBlueprintResource = (resource: Resource): resource is BlueprintResource => {
  return resource.category === "blueprint";
};

const isToolResource = (resource: Resource): resource is ToolResource => {
  return resource.category === "tool";
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${type} copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy ${type}`);
      console.error("Failed to copy:", error);
    }
  };

  const handleCopyEnv = () => {
    if (isComputeResource(resource)) {
      handleCopy(generateEnvFormat(resource), ".env config");
    }
  };

  const handleCopyRooCode = () => {
    if (isComputeResource(resource)) {
      handleCopy(generateRooCode(resource), "Roo Code config");
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  // Render card footer based on resource category
  const renderCardFooter = () => {
    if (isComputeResource(resource)) {
      return (
        <CardFooter>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full bg-zinc-700 hover:bg-zinc-600">
                Connect ▾
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-zinc-800 border-zinc-700 text-white">
              <DropdownMenuLabel>Connect as</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-zinc-700" />
              <DropdownMenuItem 
                className="hover:bg-zinc-700 cursor-pointer" 
                onClick={handleCopyEnv}
              >
                Copy .env
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-zinc-700 cursor-pointer" 
                onClick={handleOpenDialog}
              >
                Connect to Cursor
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-zinc-700 cursor-pointer" 
                onClick={handleCopyRooCode}
              >
                Copy for Roo Code
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      );
    }

    if (isSkillResource(resource)) {
      // Extract first 100 characters for preview
      const previewContent = resource.content.slice(0, 100) + (resource.content.length > 100 ? "..." : "");
      return (
        <CardFooter className="flex flex-col items-start w-full">
          <div className="w-full mb-4">
            <div className="text-sm text-zinc-400 mb-1">Content Preview</div>
            <div className="bg-zinc-800 p-2 rounded-md text-xs font-mono overflow-auto max-h-24">
              {previewContent}
            </div>
          </div>
          <Button 
            className="w-full bg-zinc-700 hover:bg-zinc-600" 
            onClick={() => handleCopy(resource.content, "Skill Content")}
          >
            Copy Full Content
          </Button>
        </CardFooter>
      );
    }

    if (isBlueprintResource(resource)) {
      return (
        <CardFooter>
          <div className="w-full">
            <div className="text-sm text-zinc-400 mb-2">Install Command</div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-zinc-800 p-2 rounded-md text-xs font-mono overflow-auto">
                {resource.install_cmd}
              </div>
              <Button 
                className="bg-zinc-700 hover:bg-zinc-600 text-sm whitespace-nowrap" 
                onClick={() => handleCopy(resource.install_cmd, "Install Command")}
              >
                Copy
              </Button>
            </div>
          </div>
        </CardFooter>
      );
    }

    // For Tool resources
    return (
      <CardFooter>
        <Button 
          className="w-full bg-zinc-700 hover:bg-zinc-600" 
          onClick={() => window.open(resource.url, "_blank", "noopener noreferrer")}
        >
          Visit Website
        </Button>
      </CardFooter>
    );
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
            <span className="text-sm text-zinc-400">Category:</span>
            <span className="text-sm font-medium capitalize">{resource.category}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-zinc-400">Status:</span>
            <span className={`text-sm font-medium capitalize ${resource.status === 'active' ? 'text-green-400' : resource.status === 'beta' ? 'text-yellow-400' : 'text-red-400'}`}>
              {resource.status}
            </span>
          </div>
          
          {/* Additional fields based on category */}
          {isComputeResource(resource) && (
            <div className="mt-4">
              <div className="text-sm text-zinc-400 mb-1">Model:</div>
              <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                {resource.config.model}
              </div>
            </div>
          )}
          
          {isToolResource(resource) && (
            <div className="mt-4">
              <div className="text-sm text-zinc-400 mb-1">Tool Type:</div>
              <div className="bg-zinc-800 p-2 rounded-md text-sm">
                {resource.toolType}
              </div>
            </div>
          )}
          
          {isSkillResource(resource) && (
            <div className="mt-4">
              <div className="text-sm text-zinc-400 mb-1">Skill Type:</div>
              <div className="bg-zinc-800 p-2 rounded-md text-sm">
                {resource.skillType}
              </div>
            </div>
          )}
          
          {isBlueprintResource(resource) && (
            <div className="mt-4">
              <div className="text-sm text-zinc-400 mb-1">Tech Stack:</div>
              <div className="flex flex-wrap gap-2">
                {resource.tech_stack.map((tech, index) => (
                  <span key={index} className="bg-zinc-800 px-2 py-1 rounded-md text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      
      {/* Dynamic Footer based on resource category */}
      {renderCardFooter()}

      {/* Cursor Connection Dialog for Compute Resources */}
      {isComputeResource(resource) && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Cursor Connection Setup</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              {/* Model Name */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-zinc-400 mb-1">Model Name</div>
                  <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                    {resource.config.model}
                  </div>
                </div>
                <Button 
                  className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                  onClick={() => handleCopy(resource.config.model, "Model Name")}
                >
                  Copy
                </Button>
              </div>

              {/* Base URL */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-zinc-400 mb-1">Base URL</div>
                  <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                    {resource.config.baseUrl}
                  </div>
                </div>
                <Button 
                  className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                  onClick={() => handleCopy(resource.config.baseUrl, "Base URL")}
                >
                  Copy
                </Button>
              </div>

              {/* API Key */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm text-zinc-400 mb-1">API Key</div>
                  <div className="bg-zinc-800 p-2 rounded-md text-sm font-mono">
                    {resource.config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : resource.config.apiKey}
                  </div>
                </div>
                <Button 
                  className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-sm" 
                  onClick={() => handleCopy(resource.config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : resource.config.apiKey, "API Key")}
                >
                  Copy
                </Button>
              </div>

              {/* Guide */}
              <div className="mt-6 text-xs text-zinc-400 italic">
                Go to Cursor Settings (⌘+,) -&gt; Models -&gt; Add Model to paste these values.
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
}