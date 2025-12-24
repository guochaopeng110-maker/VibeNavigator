// Resource Type Definitions for Vibe Navigator v2.0
// Based on PRD Section 4: Data Structure
export type ResourceCategory = 'compute' | 'tool' | 'skill' | 'blueprint';
export type ResourceStatus = 'active' | 'inactive' | 'beta';
export type SkillType = 'open-spec' | 'custom' | 'api';
export type SkillSubCategory = 'mcp-server' | 'claude-skill' | 'open-spec';
export type ToolPlatform = 'vscode' | 'jetbrains' | 'cursor' | 'cli' | 'desktop' | 'browser';

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
  endpoint: string;
  api_key_url: string;
  models: Array<{
    id: string;
    name: string;
    is_free: boolean;
  }>;
}

// Tool Resource - For developer tools
export interface ToolResource extends BaseResource {
  category: 'tool';
  platforms: ToolPlatform[];
  guide: string; // Markdown format for Vibe Guide
  integration?: string;
}

// Skill Resource - For AI capabilities
export interface SkillResource extends BaseResource {
  category: 'skill';
  skillType: SkillType;
  sub_category: SkillSubCategory;
  content: string; // Markdown or JSON content
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