import { useState, useEffect, useCallback } from "react";
import { Edit3, RefreshCw } from "lucide-react";
import type { Template, RepoData } from "../types/index";
import { ReadmeGenerator } from "../utils/ReadmeGenerator";

interface EditorSectionProps {
  content: string;
  onChange: (content: string) => void;
  template: Template;
  repoData: RepoData;
}

export function EditorSection({
  content,
  onChange,
  template,
  repoData,
}: EditorSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateContent = useCallback(() => {
    setIsGenerating(true);

    // Use the advanced README generator with a slight delay for better UX
    setTimeout(() => {
      const generatedContent = ReadmeGenerator.generate(template, repoData);
      onChange(generatedContent);
      setIsGenerating(false);
    }, 800);
  }, [template, repoData, onChange]);

  useEffect(() => {
    if (!content && repoData) {
      generateContent();
    }
  }, [content, repoData, generateContent]);

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200">
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <Edit3 className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">README Editor</h3>
        </div>
        <button
          onClick={generateContent}
          disabled={isGenerating}
          className="btn-outline px-4 py-2 text-sm"
        >
          {isGenerating ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin inline mr-2" />
              Generating...
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 inline mr-2" />
              Regenerate
            </>
          )}
        </button>
      </div>

      <div className="p-4">
        <textarea
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Your README content will appear here..."
        />
      </div>
    </div>
  );
}
