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
        <section className="text-center py-16">
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
          <section className="py-16">
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
    </div>
  );
}

export default App;
