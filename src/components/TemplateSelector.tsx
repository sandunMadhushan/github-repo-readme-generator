import { Check } from "lucide-react";
import type { Template, RepoData, TemplateConfig } from "../types";

interface TemplateSelectorProps {
  selected: Template;
  onSelect: (template: Template) => void;
  repoData: RepoData;
}

const templates: TemplateConfig[] = [
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and simple README with essential information only",
    sections: [],
    suitable_for: ["Small projects", "Quick prototypes", "Learning projects"],
  },
  {
    id: "standard",
    name: "Standard",
    description:
      "Well-structured README with common sections for most projects",
    sections: [],
    suitable_for: [
      "Personal projects",
      "Medium-sized applications",
      "Portfolio pieces",
    ],
  },
  {
    id: "comprehensive",
    name: "Comprehensive",
    description: "Detailed README with extensive documentation and features",
    sections: [],
    suitable_for: [
      "Open source projects",
      "Production applications",
      "Team projects",
    ],
  },
  {
    id: "project-specific",
    name: "Project-Specific",
    description:
      "Customized based on your repository analysis and detected frameworks",
    sections: [],
    suitable_for: [
      "Framework-specific projects",
      "Complex applications",
      "Multi-service projects",
    ],
  },
  {
    id: "open-source",
    name: "Open Source",
    description:
      "Optimized for open source projects with contribution guidelines",
    sections: [],
    suitable_for: [
      "Public repositories",
      "Community projects",
      "Library/package projects",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description:
      "Professional template with compliance and governance sections",
    sections: [],
    suitable_for: [
      "Corporate projects",
      "Enterprise applications",
      "Regulated industries",
    ],
  },
];

export function TemplateSelector({
  selected,
  onSelect,
  repoData,
}: TemplateSelectorProps) {
  const getRecommendedTemplate = (): Template => {
    // Recommend based on repository analysis
    if (repoData.topics.some((topic) => topic.includes("enterprise")))
      return "enterprise";
    if (repoData.stars > 100 || repoData.forks > 50) return "open-source";
    if (repoData.features.length > 5) return "comprehensive";
    if (repoData.features.length > 2) return "standard";
    return "minimal";
  };

  const recommendedTemplate = getRecommendedTemplate();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        Choose Template
      </h3>
      <p className="text-gray-600 mb-6">
        Select a template that best fits your project. We recommend{" "}
        <strong>
          {templates.find((t) => t.id === recommendedTemplate)?.name}
        </strong>{" "}
        based on your repository analysis.
      </p>

      <div className="space-y-3">
        {templates.map((template) => {
          const isSelected = selected === template.id;
          const isRecommended = recommendedTemplate === template.id;

          return (
            <div
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`
                relative p-4 rounded-lg border-2 cursor-pointer transition-all
                ${
                  isSelected
                    ? "border-primary-500 bg-primary-50"
                    : "border-gray-200 hover:border-gray-300 bg-white"
                }
              `}
            >
              {isRecommended && (
                <div className="absolute top-2 right-2">
                  <span className="bg-primary-100 text-primary-800 text-xs px-2 py-1 rounded-full font-medium">
                    Recommended
                  </span>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <div
                  className={`
                  w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5
                  ${
                    isSelected
                      ? "border-primary-500 bg-primary-500"
                      : "border-gray-300"
                  }
                `}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>

                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">
                    {template.name}
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {template.suitable_for.map((use, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
                      >
                        {use}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
