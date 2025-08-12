import type { Template, RepoData } from "../types/index";

export class ReadmeGenerator {
  private static generateHeader(repo: RepoData): string {
    return `# ${repo.name}\n\n${
      repo.description ? repo.description + "\n\n" : ""
    }`;
  }

  private static generateShields(repo: RepoData): string {
    const shields: string[] = [];

    // GitHub stats
    shields.push(
      `![GitHub stars](https://img.shields.io/github/stars/${repo.owner}/${repo.name}?style=flat-square)`
    );
    shields.push(
      `![GitHub forks](https://img.shields.io/github/forks/${repo.owner}/${repo.name}?style=flat-square)`
    );

    // Language
    if (repo.language) {
      const languageColor = this.getLanguageColor(repo.language);
      shields.push(
        `![${repo.language}](https://img.shields.io/badge/language-${repo.language}-${languageColor}?style=flat-square)`
      );
    }

    // License
    if (repo.hasLicense && repo.license) {
      shields.push(
        `![License](https://img.shields.io/github/license/${repo.owner}/${repo.name}?style=flat-square)`
      );
    }

    // Build status (if CI detected)
    if (repo.features.includes("CI/CD Pipeline")) {
      shields.push(
        `![Build Status](https://img.shields.io/github/actions/workflow/status/${repo.owner}/${repo.name}/ci.yml?style=flat-square)`
      );
    }

    // Package managers
    if (repo.dependencies?.["react"]) {
      shields.push(
        `![React](https://img.shields.io/badge/React-18+-61DAFB?style=flat-square&logo=react)`
      );
    }
    if (
      repo.dependencies?.["typescript"] ||
      repo.devDependencies?.["typescript"]
    ) {
      shields.push(
        `![TypeScript](https://img.shields.io/badge/TypeScript-4+-3178C6?style=flat-square&logo=typescript)`
      );
    }
    if (repo.dependencies?.["next"]) {
      shields.push(
        `![Next.js](https://img.shields.io/badge/Next.js-13+-000000?style=flat-square&logo=nextdotjs)`
      );
    }

    return shields.join(" ") + "\n\n";
  }

  private static getLanguageColor(language: string): string {
    const colors: { [key: string]: string } = {
      JavaScript: "F7DF1E",
      TypeScript: "3178C6",
      Python: "3776AB",
      Java: "ED8B00",
      Go: "00ADD8",
      Rust: "000000",
      "C++": "00599C",
      "C#": "239120",
      PHP: "777BB4",
      Ruby: "CC342D",
    };
    return colors[language] || "2196F3";
  }

  private static generateTableOfContents(sections: string[]): string {
    if (sections.length === 0) return "";

    return `## 📋 Table of Contents\n\n${sections
      .map(
        (section) =>
          `- [${section}](#${section
            .toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]/g, "")})`
      )
      .join("\n")}\n\n`;
  }

  private static generateFeatures(repo: RepoData): string {
    if (repo.features.length === 0) return "";

    return `## ✨ Features\n\n${repo.features
      .map((feature) => `- ✅ ${feature}`)
      .join("\n")}\n\n`;
  }

  private static generateTechStack(repo: RepoData): string {
    const languages = Object.entries(repo.languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 6)
      .map(([lang, bytes]) => ({ lang, percentage: bytes }));

    if (languages.length <= 1) return "";

    const total = languages.reduce(
      (sum, { percentage }) => sum + percentage,
      0
    );

    return (
      `## 🛠️ Tech Stack\n\n` +
      languages
        .map(({ lang, percentage }) => {
          const percent = ((percentage / total) * 100).toFixed(1);
          return `- **${lang}** (${percent}%)`;
        })
        .join("\n") +
      "\n\n"
    );
  }

  private static generateInstallation(repo: RepoData): string {
    let installation = `## 🚀 Installation\n\n`;

    // Clone repository
    installation += `1. Clone the repository:\n\`\`\`bash\ngit clone ${repo.url}\ncd ${repo.name}\n\`\`\`\n\n`;

    // Package manager detection and installation
    if (repo.dependencies && Object.keys(repo.dependencies).length > 0) {
      const hasYarnLock = repo.structure.some(
        (file) => file.name === "yarn.lock"
      );
      const hasPnpmLock = repo.structure.some(
        (file) => file.name === "pnpm-lock.yaml"
      );
      const packageManager = hasPnpmLock
        ? "pnpm"
        : hasYarnLock
        ? "yarn"
        : "npm";

      installation += `2. Install dependencies:\n\`\`\`bash\n${packageManager} install\n\`\`\`\n\n`;
    }

    // Environment setup
    const hasEnvExample = repo.structure.some(
      (file) => file.name === ".env.example"
    );
    if (hasEnvExample) {
      installation += `3. Set up environment variables:\n\`\`\`bash\ncp .env.example .env\n# Edit .env with your configuration\n\`\`\`\n\n`;
    }

    // Scripts
    if (repo.scripts && Object.keys(repo.scripts).length > 0) {
      const commonScripts = ["dev", "start", "build", "test"];
      const availableScripts = commonScripts.filter(
        (script) => repo.scripts?.[script]
      );

      if (availableScripts.length > 0) {
        installation += `4. Available scripts:\n`;
        availableScripts.forEach((script) => {
          if (repo.scripts?.[script]) {
            installation += `- \`npm run ${script}\` - ${this.getScriptDescription(
              script,
              repo.scripts[script]
            )}\n`;
          }
        });
        installation += "\n";
      }
    }

    return installation;
  }

  private static getScriptDescription(
    scriptName: string,
    scriptCommand: string
  ): string {
    const descriptions: { [key: string]: string } = {
      dev: "Start development server",
      start: "Start production server",
      build: "Build for production",
      test: "Run tests",
      lint: "Run linting",
      format: "Format code",
    };

    return descriptions[scriptName] || scriptCommand;
  }

  private static generateUsage(repo: RepoData): string {
    let usage = `## 📖 Usage\n\n`;

    // Framework-specific usage examples
    if (repo.features.includes("React Application")) {
      usage += `### React Application\n\n\`\`\`jsx\nimport React from 'react';\nimport { ${
        repo.name.charAt(0).toUpperCase() + repo.name.slice(1)
      } } from './${
        repo.name
      }';\n\nfunction App() {\n  return (\n    <div>\n      <${
        repo.name.charAt(0).toUpperCase() + repo.name.slice(1)
      } />\n    </div>\n  );\n}\n\nexport default App;\n\`\`\`\n\n`;
    } else if (repo.features.includes("Express.js Server")) {
      usage += `### Server Usage\n\n\`\`\`javascript\nconst express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Hello from ${repo.name}!' });\n});\n\napp.listen(3000, () => {\n  console.log('Server running on port 3000');\n});\n\`\`\`\n\n`;
    } else if (repo.language === "Python") {
      usage += `### Python Usage\n\n\`\`\`python\nfrom ${repo.name.replace(
        "-",
        "_"
      )} import main\n\nif __name__ == "__main__":\n    main()\n\`\`\`\n\n`;
    } else {
      usage += `### Basic Usage\n\n\`\`\`${repo.language.toLowerCase()}\n// Add your usage example here\nconsole.log('Hello from ${
        repo.name
      }!');\n\`\`\`\n\n`;
    }

    return usage;
  }

  private static generateAPI(repo: RepoData, template: Template): string {
    if (
      template !== "comprehensive" &&
      template !== "open-source" &&
      template !== "enterprise"
    ) {
      return "";
    }

    let api = `## 📚 API Reference\n\n`;

    // Generate API docs based on detected frameworks
    if (repo.features.includes("Express.js Server")) {
      api += `### REST Endpoints\n\n`;
      api += `#### GET /\n- **Description**: Health check endpoint\n- **Response**: \`{ "status": "ok" }\`\n\n`;
      api += `#### GET /api/data\n- **Description**: Get application data\n- **Response**: \`{ "data": [...] }\`\n\n`;
    }

    if (repo.features.includes("React Application")) {
      api += `### Components\n\n`;
      api += `#### Main Component\n\n\`\`\`jsx\n<${
        repo.name.charAt(0).toUpperCase() + repo.name.slice(1)
      } \n  prop1="value"\n  prop2={true}\n  onEvent={handleEvent}\n/>\n\`\`\`\n\n`;
      api += `**Props:**\n- \`prop1\` (string): Description of prop1\n- \`prop2\` (boolean): Description of prop2\n- \`onEvent\` (function): Event handler\n\n`;
    }

    return api;
  }

  private static generateContributing(template: Template): string {
    if (
      template !== "open-source" &&
      template !== "comprehensive" &&
      template !== "enterprise"
    ) {
      return "";
    }

    return `## 🤝 Contributing\n\nContributions are welcome! Please feel free to submit a Pull Request.\n\n### Development Process\n\n1. Fork the repository\n2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)\n3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)\n4. Push to the branch (\`git push origin feature/amazing-feature\`)\n5. Open a Pull Request\n\n### Code Style\n\n- Follow the existing code style\n- Run tests before submitting\n- Update documentation as needed\n\n`;
  }

  private static generateTesting(repo: RepoData): string {
    if (
      !repo.features.includes("Unit Testing") &&
      !repo.features.includes("E2E Testing")
    ) {
      return "";
    }

    let testing = `## 🧪 Testing\n\n`;

    if (repo.features.includes("Unit Testing")) {
      testing += `### Unit Tests\n\n\`\`\`bash\nnpm run test\n\`\`\`\n\n`;
    }

    if (repo.features.includes("E2E Testing")) {
      testing += `### E2E Tests\n\n\`\`\`bash\nnpm run test:e2e\n\`\`\`\n\n`;
    }

    testing += `### Coverage\n\n\`\`\`bash\nnpm run test:coverage\n\`\`\`\n\n`;

    return testing;
  }

  private static generateDeployment(
    repo: RepoData,
    template: Template
  ): string {
    if (template === "minimal") return "";

    let deployment = `## 🚀 Deployment\n\n`;

    if (repo.features.includes("Docker Support")) {
      deployment += `### Docker\n\n\`\`\`bash\n# Build image\ndocker build -t ${repo.name} .\n\n# Run container\ndocker run -p 3000:3000 ${repo.name}\n\`\`\`\n\n`;
    }

    if (repo.features.includes("Next.js Framework")) {
      deployment += `### Vercel\n\n\`\`\`bash\nnpm i -g vercel\nvercel --prod\n\`\`\`\n\n`;
    }

    if (repo.features.includes("React Application")) {
      deployment += `### Netlify\n\n1. Build the project: \`npm run build\`\n2. Deploy the \`build\` folder to Netlify\n\n`;
    }

    return deployment;
  }

  private static generateLicense(repo: RepoData): string {
    if (!repo.hasLicense) return "";

    return `## 📄 License\n\nThis project is licensed under the ${repo.license} License - see the [LICENSE](LICENSE) file for details.\n\n`;
  }

  private static generateEnterpriseSections(template: Template): string {
    if (template !== "enterprise") return "";

    return `## 🔒 Security\n\nFor security vulnerabilities, please email security@company.com instead of using the issue tracker.\n\n## 📋 Compliance\n\nThis project adheres to:\n- Company coding standards\n- Security best practices\n- Data protection regulations (GDPR, CCPA)\n- Industry compliance requirements\n\n## 🏢 Enterprise Support\n\nFor enterprise support and custom solutions:\n- Email: enterprise@company.com\n- Phone: +1 (555) 123-4567\n- Documentation: [Enterprise Docs](https://docs.company.com)\n\n## 🔍 Monitoring & Analytics\n\n- Application monitoring with DataDog\n- Error tracking with Sentry\n- Performance monitoring enabled\n- Audit logging compliant\n\n`;
  }

  public static generate(template: Template, repo: RepoData): string {
    let readme = "";

    // Header and description
    readme += this.generateHeader(repo);

    // Shields/badges
    readme += this.generateShields(repo);

    // Table of contents (for non-minimal templates)
    if (template !== "minimal") {
      const sections = this.getSectionsForTemplate(template, repo);
      readme += this.generateTableOfContents(sections);
    }

    // Main sections
    readme += this.generateFeatures(repo);
    readme += this.generateTechStack(repo);
    readme += this.generateInstallation(repo);
    readme += this.generateUsage(repo);

    // Advanced sections
    if (template !== "minimal" && template !== "standard") {
      readme += this.generateAPI(repo, template);
      readme += this.generateTesting(repo);
      readme += this.generateDeployment(repo, template);
    }

    // Contributing
    readme += this.generateContributing(template);

    // Enterprise-specific sections
    readme += this.generateEnterpriseSections(template);

    // License
    readme += this.generateLicense(repo);

    // Footer
    readme += `---\n\n⭐ **Don't forget to star this project if you found it helpful!**\n\n`;
    readme += `📝 *README generated with [Advanced README Generator](https://github.com/yourusername/readme-generator)*`;

    return readme;
  }

  private static getSectionsForTemplate(
    template: Template,
    repo: RepoData
  ): string[] {
    const baseSections = ["Features", "Installation", "Usage"];

    switch (template) {
      case "minimal":
        return [];
      case "standard":
        return [...baseSections, "License"];
      case "comprehensive":
      case "open-source":
        return [
          ...baseSections,
          "API Reference",
          "Testing",
          "Contributing",
          "Deployment",
          "License",
        ];
      case "enterprise":
        return [
          ...baseSections,
          "API Reference",
          "Testing",
          "Deployment",
          "Security",
          "Compliance",
          "Support",
          "License",
        ];
      case "project-specific": {
        const sections = [...baseSections];
        if (
          repo.features.includes("Unit Testing") ||
          repo.features.includes("E2E Testing")
        ) {
          sections.push("Testing");
        }
        if (repo.features.includes("Docker Support")) {
          sections.push("Deployment");
        }
        sections.push("License");
        return sections;
      }
      default:
        return baseSections;
    }
  }
}
