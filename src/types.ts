export interface RepoData {
  name: string;
  description: string;
  owner: string;
  url: string;
  language: string;
  languages: { [key: string]: number };
  stars: number;
  forks: number;
  topics: string[];
  hasLicense: boolean;
  license?: string;
  hasReadme: boolean;
  structure: FileStructure[];
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
  scripts: { [key: string]: string };
  features: string[];
}

export interface FileStructure {
  name: string;
  type: "file" | "directory";
  path: string;
}

export interface GitHubRepo {
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  topics?: string[];
  license?: {
    name: string;
    key: string;
  };
  homepage?: string;
  default_branch: string;
  created_at: string;
  updated_at: string;
  owner: {
    login: string;
    avatar_url: string;
    type: "User" | "Organization";
  };
  has_issues: boolean;
  has_wiki: boolean;
  has_pages: boolean;
  private: boolean;
}

export interface GitHubContent {
  name: string;
  path: string;
  type: "file" | "dir";
  download_url?: string;
  url: string;
}

export type Template =
  | "minimal"
  | "standard"
  | "comprehensive"
  | "professional"
  | "modern"
  | "academic"
  | "project-specific"
  | "open-source"
  | "enterprise";

export interface ReadmeSection {
  id: string;
  title: string;
  content: string;
  enabled: boolean;
  order: number;
}

export interface TemplateConfig {
  id: Template;
  name: string;
  description: string;
  sections: string[];
  suitable_for: string[];
}

export interface ExportOptions {
  format: "markdown" | "html" | "pdf";
  includeTableOfContents: boolean;
  includeBadges: boolean;
  customStyling?: string;
}
