export interface Resource {
  id: string;
  name: string;
  description: string;
  type: 'api' | 'model' | 'tool';
  provider: string;
  url: string;
  config: {
    apiKey: string;
    baseUrl: string;
    model: string;
  };
  features: string[];
  pricing: string;
  status: 'active' | 'inactive' | 'beta';
  createdAt: string;
  updatedAt: string;
}