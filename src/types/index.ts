export interface RepoData {
  name: string
  description: string
  owner: string
  url: string
  language: string
  languages: Record<string, number>
  stars: number
  forks: number
  topics: string[]
  hasLicense: boolean
  license?: string
  hasReadme: boolean
  structure: FileStructure[]
  dependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  scripts?: Record<string, string>
  features: string[]
}

export interface FileStructure {
  name: string
  type: 'file' | 'directory'
  path: string
  children?: FileStructure[]
}

export type Template = 
  | 'minimal' 
  | 'standard' 
  | 'comprehensive' 
  | 'project-specific'
  | 'open-source'
  | 'enterprise'

export interface TemplateConfig {
  id: Template
  name: string
  description: string
  sections: ReadmeSection[]
  suitable_for: string[]
}

export interface ReadmeSection {
  id: string
  title: string
  content: string
  required: boolean
  editable: boolean
}

export interface ExportFormat {
  format: 'markdown' | 'html' | 'pdf'
  styling?: 'github' | 'gitlab' | 'custom'
}

export interface GitHubRepo {
  name: string
  full_name: string
  description: string
  html_url: string
  language: string
  stargazers_count: number
  forks_count: number
  topics: string[]
  license: {
    name: string
    spdx_id: string
  } | null
  default_branch: string
}

export interface GitHubContent {
  name: string
  path: string
  type: 'file' | 'dir'
  download_url: string | null
  content?: string
  encoding?: string
}
