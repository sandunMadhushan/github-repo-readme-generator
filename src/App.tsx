import { useState } from "react";
import { Header } from "./components/Header";
import {
  RepoInput,
  TemplateSelector,
  EditorSection,
  PreviewSection,
  ExportOptions,
  FeatureCard,
  Footer,
  BackToTop,
} from "./components";
import type { RepoData, Template } from "./types/index";

function App() {
  const [repoData, setRepoData] = useState<RepoData | null>(null);
  const [selectedTemplate, setSelectedTemplate] =
    useState<Template>("comprehensive");
  const [readmeContent, setReadmeContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Hero Section */}
        <section id="home" className="text-center py-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced README Generator
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create comprehensive, professional README files for your GitHub
            repositories. Analyze your codebase, choose from multiple templates,
            and generate documentation that stands out.
          </p>
        </section>

        {/* Repository Input */}
        <section className="max-w-4xl mx-auto">
          <RepoInput
            onRepoAnalyzed={setRepoData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </section>

        {/* Features Grid */}
        {!repoData && (
          <section id="features" className="py-16">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
              Advanced Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <FeatureCard
                icon="🔍"
                title="Repository Analysis"
                description="Automatically analyze your repository structure, languages, and dependencies"
              />
              <FeatureCard
                icon="📝"
                title="Multiple Templates"
                description="Choose from various professional templates tailored for different project types"
              />
              <FeatureCard
                icon="👁️"
                title="Live Preview"
                description="See real-time preview of your README as you edit and customize it"
              />
              <FeatureCard
                icon="⚡"
                title="Smart Generation"
                description="AI-powered content generation based on your repository analysis"
              />
              <FeatureCard
                icon="🎨"
                title="Custom Styling"
                description="Customize badges, shields, and visual elements to match your brand"
              />
              <FeatureCard
                icon="📥"
                title="Export Options"
                description="Export as Markdown, PDF, or HTML with different styling options"
              />
            </div>
          </section>
        )}

        {/* Templates Section */}
        {!repoData && (
          <section id="templates" className="py-16 bg-white rounded-2xl shadow-sm">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Choose Your Template
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Minimal</h3>
                  <p className="text-gray-600 text-sm">Clean and simple for small projects</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📄</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Standard</h3>
                  <p className="text-gray-600 text-sm">Perfect balance of detail and simplicity</p>
                </div>
                <div className="text-center p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📚</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comprehensive</h3>
                  <p className="text-gray-600 text-sm">Detailed documentation for large projects</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Examples Section */}
        {!repoData && (
          <section id="examples" className="py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
                Example Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">React Component Library</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    A comprehensive README for a React UI component library with installation guides, 
                    usage examples, and API documentation.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">React</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">TypeScript</span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">Storybook</span>
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-2">Python API Server</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Professional documentation for a Python FastAPI server with setup instructions, 
                    API endpoints, and deployment guides.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Python</span>
                    <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">FastAPI</span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">Docker</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Main Editor Interface */}
        {repoData && (
          <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {/* Left Panel */}
            <div className="space-y-6">
              <TemplateSelector
                selected={selectedTemplate}
                onSelect={setSelectedTemplate}
                repoData={repoData}
              />
              <EditorSection
                content={readmeContent}
                onChange={setReadmeContent}
                template={selectedTemplate}
                repoData={repoData}
              />
              <ExportOptions content={readmeContent} />
            </div>

            {/* Right Panel */}
            <div className="lg:sticky lg:top-8">
              <PreviewSection content={readmeContent} />
            </div>
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
