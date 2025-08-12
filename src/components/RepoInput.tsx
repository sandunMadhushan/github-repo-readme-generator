import { useState } from "react";
import { Github, Search, Loader2, AlertCircle } from "lucide-react";
import type { RepoData, GitHubRepo, GitHubContent } from "../types";

interface RepoInputProps {
  onRepoAnalyzed: (data: RepoData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function RepoInput({
  onRepoAnalyzed,
  isLoading,
  setIsLoading,
}: RepoInputProps) {
  const [repoUrl, setRepoUrl] = useState("");
  const [error, setError] = useState("");

  const extractRepoInfo = (url: string) => {
    const match = url.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;
    return { owner: match[1], repo: match[2].replace(".git", "") };
  };

  const analyzeRepository = async () => {
    if (!repoUrl.trim()) {
      setError("Please enter a GitHub repository URL");
      return;
    }

    const repoInfo = extractRepoInfo(repoUrl);
    if (!repoInfo) {
      setError("Please enter a valid GitHub repository URL");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Fetch repository data
      const repoResponse = await fetch(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}`
      );
      if (!repoResponse.ok) {
        throw new Error("Repository not found or not accessible");
      }

      const repoData: GitHubRepo = await repoResponse.json();

      // Fetch repository contents
      const contentsResponse = await fetch(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/contents`
      );
      const contents: GitHubContent[] = contentsResponse.ok
        ? await contentsResponse.json()
        : [];

      // Fetch languages
      const languagesResponse = await fetch(
        `https://api.github.com/repos/${repoInfo.owner}/${repoInfo.repo}/languages`
      );
      const languages = languagesResponse.ok
        ? await languagesResponse.json()
        : {};

      // Check for package.json to get dependencies
      let dependencies = {};
      let devDependencies = {};
      let scripts = {};

      const packageJsonFile = contents.find(
        (file) => file.name === "package.json"
      );
      if (packageJsonFile && packageJsonFile.download_url) {
        try {
          const packageResponse = await fetch(packageJsonFile.download_url);
          const packageData = await packageResponse.json();
          dependencies = packageData.dependencies || {};
          devDependencies = packageData.devDependencies || {};
          scripts = packageData.scripts || {};
        } catch (e) {
          console.warn("Failed to fetch package.json:", e);
        }
      }

      // Generate features based on repository analysis
      const features = generateFeatures(
        repoData,
        contents,
        dependencies,
        devDependencies
      );

      const analyzedData: RepoData = {
        name: repoData.name,
        description: repoData.description || "",
        owner: repoInfo.owner,
        url: repoData.html_url,
        language: repoData.language || "Unknown",
        languages,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        topics: repoData.topics || [],
        hasLicense: !!repoData.license,
        license: repoData.license?.name,
        hasReadme: contents.some((file) =>
          file.name.toLowerCase().includes("readme")
        ),
        structure: contents.map((item) => ({
          name: item.name,
          type: item.type === "dir" ? "directory" : "file",
          path: item.path,
        })),
        dependencies,
        devDependencies,
        scripts,
        features,
      };

      onRepoAnalyzed(analyzedData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to analyze repository"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const generateFeatures = (
    repoData: GitHubRepo,
    contents: GitHubContent[],
    deps: Record<string, string>,
    devDeps: Record<string, string>
  ): string[] => {
    const features: string[] = [];

    // Framework/Library detection
    if (deps.react || devDeps.react) features.push("React Application");
    if (deps.vue || devDeps.vue) features.push("Vue.js Application");
    if (deps.angular || devDeps.angular) features.push("Angular Application");
    if (deps.next || devDeps.next) features.push("Next.js Framework");
    if (deps.express || devDeps.express) features.push("Express.js Server");
    if (deps.typescript || devDeps.typescript)
      features.push("TypeScript Support");

    // Testing
    if (devDeps.jest || devDeps.vitest || devDeps.mocha)
      features.push("Unit Testing");
    if (devDeps.cypress || devDeps.playwright) features.push("E2E Testing");

    // Build tools
    if (devDeps.vite || devDeps.webpack) features.push("Modern Build System");
    if (devDeps.eslint) features.push("Code Linting");
    if (devDeps.prettier) features.push("Code Formatting");

    // Deployment/CI
    const hasGitHubActions = contents.some((file) => file.name === ".github");
    if (hasGitHubActions) features.push("CI/CD Pipeline");

    // Documentation
    if (contents.some((file) => file.name.includes("docs")))
      features.push("Documentation");

    // Docker
    if (contents.some((file) => file.name === "Dockerfile"))
      features.push("Docker Support");

    // Repository-specific features
    if (repoData.topics && repoData.topics.length > 0) {
      repoData.topics.forEach((topic) => {
        if (topic.includes("api")) features.push("API Development");
        if (topic.includes("web")) features.push("Web Application");
        if (topic.includes("mobile")) features.push("Mobile Development");
      });
    }

    return features;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      analyzeRepository();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
          <Github className="w-8 h-8 text-primary-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Analyze Your Repository
        </h2>
        <p className="text-gray-600">
          Enter your GitHub repository URL to get started with AI-powered README
          generation
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="url"
            value={repoUrl}
            onChange={(e) => setRepoUrl(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="https://github.com/username/repository"
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-lg"
            disabled={isLoading}
          />
        </div>

        {error && (
          <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <button
          onClick={analyzeRepository}
          disabled={isLoading || !repoUrl.trim()}
          className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin inline mr-2" />
              Analyzing Repository...
            </>
          ) : (
            "Analyze Repository"
          )}
        </button>
      </div>

      <div className="mt-8 text-center text-sm text-gray-500">
        <p>
          We'll analyze your repository structure, dependencies, and generate a
          comprehensive README
        </p>
      </div>
    </div>
  );
}
