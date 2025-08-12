import { useState, useEffect } from 'react'
import { Edit3, RefreshCw } from 'lucide-react'
import type { Template, RepoData } from '../types'

interface EditorSectionProps {
  content: string
  onChange: (content: string) => void
  template: Template
  repoData: RepoData
}

export function EditorSection({ content, onChange, template, repoData }: EditorSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const generateContent = () => {
    setIsGenerating(true)
    
    // Simulate content generation based on template and repo data
    setTimeout(() => {
      const generatedContent = createReadmeContent(template, repoData)
      onChange(generatedContent)
      setIsGenerating(false)
    }, 1500)
  }

  useEffect(() => {
    if (!content && repoData) {
      generateContent()
    }
  }, [template, repoData])

  const createReadmeContent = (template: Template, repoData: RepoData): string => {
    const shields = generateShields(repoData)
    const sections = generateSections(template, repoData)
    
    return `# ${repoData.name}

${shields}

${repoData.description}

${sections}

---

⭐ Don't forget to star this project if you found it helpful!`
  }

  const generateShields = (repo: RepoData): string => {
    const shields: string[] = []
    
    // Language shield
    if (repo.language) {
      shields.push(`![${repo.language}](https://img.shields.io/badge/language-${repo.language}-blue)`)
    }
    
    // Stars and forks
    shields.push(`![Stars](https://img.shields.io/github/stars/${repo.owner}/${repo.name})`)
    shields.push(`![Forks](https://img.shields.io/github/forks/${repo.owner}/${repo.name})`)
    
    // License
    if (repo.hasLicense && repo.license) {
      shields.push(`![License](https://img.shields.io/github/license/${repo.owner}/${repo.name})`)
    }
    
    return shields.join(' ')
  }

  const generateSections = (template: Template, repo: RepoData): string => {
    let sections = ''

    // Table of Contents
    if (template !== 'minimal') {
      sections += `
## 📋 Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

`
    }

    // Features
    if (repo.features.length > 0) {
      sections += `
## ✨ Features

${repo.features.map(feature => `- ${feature}`).join('\n')}

`
    }

    // Tech Stack
    if (Object.keys(repo.languages).length > 1) {
      const sortedLanguages = Object.entries(repo.languages)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([lang]) => lang)
      
      sections += `
## 🛠️ Tech Stack

${sortedLanguages.map(lang => `- **${lang}**`).join('\n')}

`
    }

    // Installation
    sections += `
## 🚀 Installation

1. Clone the repository:
\`\`\`bash
git clone ${repo.url}
cd ${repo.name}
\`\`\`

`

    // Add specific installation based on detected dependencies
    if (repo.dependencies && Object.keys(repo.dependencies).length > 0) {
      sections += `2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

`
    }

    // Scripts section if package.json scripts are detected
    if (repo.scripts && Object.keys(repo.scripts).length > 0) {
      sections += `3. Available scripts:
${Object.entries(repo.scripts).map(([name, script]) => `- \`npm run ${name}\` - ${script}`).join('\n')}

`
    }

    // Usage
    sections += `
## 📖 Usage

[Provide usage examples and code snippets here]

\`\`\`javascript
// Example usage
const example = new ${repo.name.charAt(0).toUpperCase() + repo.name.slice(1)}();
example.start();
\`\`\`

`

    // API Reference for libraries/packages
    if (template === 'comprehensive' || template === 'open-source') {
      sections += `
## 📚 API Reference

### Main Methods

#### \`method()\`

Description of the method.

**Parameters:**
- \`param1\` (string): Description
- \`param2\` (number): Description

**Returns:**
- \`returnType\`: Description

`
    }

    // Contributing section for open source
    if (template === 'open-source' || template === 'comprehensive') {
      sections += `
## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create your feature branch (\`git checkout -b feature/amazing-feature\`)
3. Commit your changes (\`git commit -m 'Add some amazing feature'\`)
4. Push to the branch (\`git push origin feature/amazing-feature\`)
5. Open a Pull Request

`
    }

    // License
    if (repo.hasLicense) {
      sections += `
## 📄 License

This project is licensed under the ${repo.license || 'MIT'} License - see the [LICENSE](LICENSE) file for details.

`
    }

    // Additional sections for enterprise template
    if (template === 'enterprise') {
      sections += `
## 🔒 Security

Please report security vulnerabilities to security@company.com

## 📋 Compliance

This project follows:
- Company coding standards
- Security best practices
- Data protection regulations

## 🏢 Support

For enterprise support, contact support@company.com

`
    }

    return sections
  }

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
  )
}
