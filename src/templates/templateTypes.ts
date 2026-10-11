import React from 'react';
import { BiodataData } from '../features/biodata/biodataTypes';

export type TemplateCategory = 'Minimal' | 'Traditional' | 'Floral' | 'Premium' | 'Modern';

export interface TemplateDefinition {
  id: string;
  name: string;
  number: string;
  category: TemplateCategory[];
  description: string;
  features: string[];
  themeColor: string;
  accentColor: string;
  component: React.ComponentType<{ data: BiodataData; isPrint?: boolean; isThumbnail?: boolean }>;
}
