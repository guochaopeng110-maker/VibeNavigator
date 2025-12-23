// Resource Type Definitions for Vibe Navigator v2.0
// Based on PRD Section 4: Data Structure

export type ResourceCategory = 'compute' | 'tool' | 'skill' | 'blueprint';

export type ResourceStatus = 'active' | 'inactive' | 'beta';

export type SkillType = 'open-spec' | 'custom' | 'api';

// Base Resource interface
export interface BaseResource {
  id: string;
  name: string;
  description: string;
  category: ResourceCategory;
  provider: string;
  url: string;
  features: string[];
  pricing: string;
  status: ResourceStatus;
  createdAt: string;
  updatedAt: string;
}

// Compute Resource - For AI inference providers
export interface ComputeResource extends BaseResource {
  category: 'compute';
  config: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
}

// Tool Resource - For developer tools
export interface ToolResource extends BaseResource {
  category: 'tool';
  toolType: 'ide' | 'cli' | 'web' | 'desktop';
  integration?: string;
}

// Skill Resource - For AI capabilities
export interface SkillResource extends BaseResource {
  category: 'skill';
  skillType: SkillType;
  content: string; // Markdown content for open-spec skills
  runtime?: 'python' | 'nodejs' | 'browser';
}

// Blueprint Resource - For project templates
export interface BlueprintResource extends BaseResource {
  category: 'blueprint';
  install_cmd: string;
  tech_stack: string[];
  stars?: number;
}

// Discriminated Union Type
export type Resource = ComputeResource | ToolResource | SkillResource | BlueprintResource;