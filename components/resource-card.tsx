'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useState } from "react";
import { toast } from "sonner";
import ReactMarkdown from "react-markdown";
import { 
  Resource, 
  ComputeResource, 
  SkillResource, 
  BlueprintResource,
  ToolResource
} from "@/types/resource";

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

// Generate config for different tools
const generateConfig = (resource: ComputeResource, tool: string): string => {
  const models = resource.models.map(model => model.name).join(', ');
  
  switch (tool) {
    case "cursor":
      return `# Cursor Configuration
BASE_URL=${resource.endpoint}
API_KEY=<YOUR_API_KEY>
MODEL=${resource.models[0].id}`;
    
    case "roo-code":
      return `{
  "name": "${resource.name}",
  "type": "openai",
  "baseUrl": "${resource.endpoint}",
  "apiKey": "<YOUR_API_KEY>",
  "models": [
    ${resource.models.map(model => `"${model.id}"`).join(', ')}
  ]
}`;
    
    case "aider":
      return `# Aider Configuration
OPENAI_BASE_URL=${resource.endpoint}
OPENAI_API_KEY=<YOUR_API_KEY>
DEFAULT_MODEL=${resource.models[0].id}`;
    
    case "open-webui":
      return `{
  "name": "${resource.name}",
  "api_base_url": "${resource.endpoint}",
  "api_key": "<YOUR_API_KEY>",
  "models": [
    ${resource.models.map(model => `"${model.id}"`).join(', ')}
  ]
}`;
    
    default:
      return `# ${resource.name} Configuration
BASE_URL=${resource.endpoint}
API_KEY=<YOUR_API_KEY>`;
  }
};

// Get subcategory label
const getSubCategoryLabel = (subCategory: string): string => {
  switch (subCategory) {
    case "mcp-server":
      return "MCP";
    case "claude-skill":
      return "Workflow";
    case "open-spec":
      return "OpenSpec";
    default:
      return subCategory;
  }
};

export default function ResourceCard({ resource }: ResourceCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);

  const handleCopy = async (content: string, type: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success(`${type} copied to clipboard!`);
    } catch (error) {
      toast.error(`Failed to copy ${type}`);
      console.error("Failed to copy:", error);
    }
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleOpenGuide = () => {
    setIsGuideOpen(true);
  };

  const handleCloseGuide = () => {
    setIsGuideOpen(false);
  };

  // Render card header based on resource type
  const renderCardHeader = () => {
    return (
      <CardHeader className="relative">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{resource.name}</CardTitle>
            {isToolResource(resource) && resource.platforms.length > 0 && (
              <div className="flex gap-2 mt-1">
                {resource.platforms.map((platform, index) => (
                  <Badge key={index} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                    {platform}
                  </Badge>
                ))}
              </div>
            )}
            <CardDescription className="text-zinc-400 mt-2">{resource.description}</CardDescription>
          </div>
          {isSkillResource(resource) && (
            <Badge variant="outline" className="absolute top-0 right-0">
              {getSubCategoryLabel(resource.sub_category)}
            </Badge>
          )}
        </div>
      </CardHeader>
    );
  };

  // Render card content based on resource type
  const renderCardContent = () => {
    return (
      <CardContent>
        <div className="space-y-4">
          {/* Common fields */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-zinc-400">Provider:</span>
              <p className="font-medium">{resource.provider}</p>
            </div>
            <div>
              <span className="text-zinc-400">Status:</span>
              <p className={`font-medium capitalize ${resource.status === 'active' ? 'text-green-400' : resource.status === 'beta' ? 'text-yellow-400' : 'text-red-400'}`}>
                {resource.status}
              </p>
            </div>
          </div>

          {/* Compute Resource Specific Content */}
          {isComputeResource(resource) && (
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Models</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.models.map((model, index) => (
                    <Badge 
                      key={index} 
                      className={model.is_free 
                        ? "bg-green-900 text-green-300 hover:bg-green-800 border-green-700" 
                        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border-zinc-600"}
                    >
                      {model.name} {model.is_free ? '(Free)' : ''}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-zinc-300 mb-2">Features</h4>
                <div className="flex flex-wrap gap-2">
                  {resource.features.map((feature, index) => (
                    <Badge key={index} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Skill Resource Specific Content */}
          {isSkillResource(resource) && (
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Content Preview</h4>
              <div className="bg-zinc-800 p-3 rounded-md text-xs font-mono overflow-auto max-h-32">
                {resource.content.slice(0, 150)}{resource.content.length > 150 ? '...' : ''}
              </div>
            </div>
          )}

          {/* Blueprint Resource Specific Content */}
          {isBlueprintResource(resource) && (
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                {resource.tech_stack.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Tool Resource Specific Content */}
          {isToolResource(resource) && (
            <div>
              <h4 className="text-sm font-medium text-zinc-300 mb-2">Features</h4>
              <div className="flex flex-wrap gap-2">
                {resource.features.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="bg-zinc-800 text-zinc-300 border-zinc-700">
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    );
  };

  // Render card footer based on resource type
  const renderCardFooter = () => {
    if (isComputeResource(resource)) {
      return (
        <CardFooter>
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-white" 
            onClick={handleOpenDialog}
          >
            Connect
          </Button>
        </CardFooter>
      );
    }

    if (isToolResource(resource)) {
      return (
        <CardFooter className="flex gap-2">
          <Button 
            className="flex-1 bg-zinc-700 hover:bg-zinc-600" 
            onClick={() => window.open(resource.url, "_blank", "noopener noreferrer")}
          >
            Visit Website
          </Button>
          <Button 
            className="flex-1 bg-primary hover:bg-primary/90" 
            onClick={handleOpenGuide}
          >
            Read Guide
          </Button>
        </CardFooter>
      );
    }

    if (isSkillResource(resource)) {
      return (
        <CardFooter className="flex gap-2">
          <Button 
            className="flex-1 bg-zinc-700 hover:bg-zinc-600" 
            onClick={() => handleCopy(resource.content, "Skill Content")}
          >
            Copy Content
          </Button>
        </CardFooter>
      );
    }

    // Blueprint resource or any other resource type
    return (
      <CardFooter>
        <Button 
          className="w-full bg-primary hover:bg-primary/90 text-white" 
          onClick={() => window.open(resource.url, "_blank", "noopener noreferrer")}
        >
          View Repository
        </Button>
      </CardFooter>
    );
  };

  return (
    <>
      <Card className="bg-zinc-900 border-zinc-800 text-white hover:shadow-lg hover:shadow-primary/20 transition-shadow">
        {renderCardHeader()}
        {renderCardContent()}
        {renderCardFooter()}
      </Card>

      {/* Compute Resource Connect Dialog */}
      {isComputeResource(resource) && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Connect to {resource.name}</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="cursor" className="mt-4">
              <TabsList className="bg-zinc-800">
                <TabsTrigger value="cursor">Cursor</TabsTrigger>
                <TabsTrigger value="roo-code">Roo Code</TabsTrigger>
                <TabsTrigger value="aider">Aider</TabsTrigger>
                <TabsTrigger value="open-webui">Open WebUI</TabsTrigger>
              </TabsList>
              
              <TabsContent value="cursor" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-300">Cursor Configuration</h4>
                  <pre className="bg-zinc-800 p-4 rounded-md overflow-auto text-xs font-mono">
                    {generateConfig(resource, "cursor")}
                  </pre>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-zinc-700 hover:bg-zinc-600 text-sm" 
                      onClick={() => handleCopy(generateConfig(resource, "cursor"), "Cursor Configuration")}
                    >
                      Copy Config
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="roo-code" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-300">Roo Code Configuration</h4>
                  <pre className="bg-zinc-800 p-4 rounded-md overflow-auto text-xs font-mono">
                    {generateConfig(resource, "roo-code")}
                  </pre>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-zinc-700 hover:bg-zinc-600 text-sm" 
                      onClick={() => handleCopy(generateConfig(resource, "roo-code"), "Roo Code Configuration")}
                    >
                      Copy Config
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="aider" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-300">Aider Configuration</h4>
                  <pre className="bg-zinc-800 p-4 rounded-md overflow-auto text-xs font-mono">
                    {generateConfig(resource, "aider")}
                  </pre>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-zinc-700 hover:bg-zinc-600 text-sm" 
                      onClick={() => handleCopy(generateConfig(resource, "aider"), "Aider Configuration")}
                    >
                      Copy Config
                    </Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="open-webui" className="mt-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-300">Open WebUI Configuration</h4>
                  <pre className="bg-zinc-800 p-4 rounded-md overflow-auto text-xs font-mono">
                    {generateConfig(resource, "open-webui")}
                  </pre>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-zinc-700 hover:bg-zinc-600 text-sm" 
                      onClick={() => handleCopy(generateConfig(resource, "open-webui"), "Open WebUI Configuration")}
                    >
                      Copy Config
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Tool Resource Guide Sheet */}
      {isToolResource(resource) && (
        <Sheet open={isGuideOpen} onOpenChange={setIsGuideOpen}>
          <SheetContent className="bg-zinc-900 border-zinc-800 text-white w-full sm:max-w-2xl">
            <SheetHeader>
              <SheetTitle className="text-xl font-bold">{resource.name} - Vibe Guide</SheetTitle>
            </SheetHeader>
            <div className="mt-6 bg-zinc-800 p-4 rounded-md overflow-auto max-h-[70vh]">
              <ReactMarkdown>
                {resource.guide}
              </ReactMarkdown>
            </div>
            <SheetFooter className="mt-6 flex justify-end">
              <Button 
                className="bg-primary hover:bg-primary/90 text-white" 
                onClick={() => handleCopy(resource.guide, "Guide Content")}
              >
                Copy Full Guide
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
}