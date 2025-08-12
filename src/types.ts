export interface RepoData {
  name: string;
  fullName: string;
  description?: string;
  topics: string[];
  language: string;
  languages: { [key: string]: number };
  stars: number;
  forks: number;
  license?: {
    name: string;
    key: string;
  };
  homepage?: string;
  defaultBranch: string;
  createdAt: string;
  updatedAt: string;
  owner: {
    login: string;
    avatarUrl: string;
    type: 'User' | 'Organization';
  };
  readme?: string;
  hasIssues: boolean;
  hasWiki: boolean;
  hasPages: boolean;
  isPrivate: boolean;
}

export type Template = 
  | 'minimal'
  | 'standard' 
  | 'comprehensive'
  | 'professional'
  | 'modern'
  | 'academic';

export interface ReadmeSection {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  order: number;
}

export interface ExportOptions {
  format: 'markdown' | 'html' | 'pdf';
  includeTableOfContents: boolean;
  includeBadges: boolean;
  customStyling?: string;
}
