import { Resource } from "@/types/resource";

/**
 * Generate .env format configuration string
 * @param resource Resource object
 * @returns .env format string
 */
export function generateEnvFormat(resource: Resource): string {
  const { name, config } = resource;
  const apiKey = config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : config.apiKey;
  
  return `# ${name} Configuration
BASE_URL=${config.baseUrl}
API_KEY=${apiKey}
MODEL=${config.model}
`;
}

/**
 * Generate .cursorrules JSON snippet
 * @param resource Resource object
 * @returns JSON string for .cursorrules
 */
export function generateCursorRules(resource: Resource): string {
  const { name, config } = resource;
  const apiKey = config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : config.apiKey;
  
  const cursorRule = {
    rule: {
      name: name,
      model: config.model,
      apiKey: apiKey,
      endpoint: config.baseUrl,
      provider: "openai",
      override: true
    }
  };
  
  return JSON.stringify(cursorRule, null, 2);
}

/**
 * Generate Roo Code/Cline configuration JSON snippet
 * @param resource Resource object
 * @returns JSON string for Roo Code
 */
export function generateRooCode(resource: Resource): string {
  const { name, config } = resource;
  const apiKey = config.apiKey === "sk-xxx" ? "<YOUR_API_KEY>" : config.apiKey;
  
  const rooConfig = {
    id: resource.id,
    name: name,
    type: "openai-compatible",
    config: {
      apiKey: apiKey,
      baseUrl: config.baseUrl,
      defaultModel: config.model,
      models: [config.model]
    }
  };
  
  return JSON.stringify(rooConfig, null, 2);
}