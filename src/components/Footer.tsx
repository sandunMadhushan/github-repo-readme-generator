import { Github, Twitter, Heart } from "lucide-react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <button
              onClick={() => scrollToSection("home")}
              className="flex items-center space-x-3 mb-4 cursor-pointer"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="font-bold text-gray-900">README Pro</span>
            </button>
            <p className="text-gray-600 text-sm leading-relaxed">
              Create professional README files with advanced features and
              beautiful templates.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  onClick={() => scrollToSection("features")}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("templates")}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Templates
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection("examples")}
                  className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
                >
                  Examples
                </button>
              </li>
              <li>
                <a
                  href="https://github.com/sandunMadhushan/github-repo-readme-generator#api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  API
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/sandunMadhushan/github-repo-readme-generator/blob/master/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sandunMadhushan/github-repo-readme-generator/wiki"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Guides
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sandunMadhushan/github-repo-readme-generator/blob/master/CHANGELOG.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Changelog
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/sandunMadhushan/github-repo-readme-generator/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Connect</h4>
            <div className="flex items-center space-x-4">
              <a
                href="https://github.com/sandunMadhushan/github-repo-readme-generator"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub Repository"
                title="GitHub Repository"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/sandunMadhushan"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub Profile"
                title="GitHub Profile"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
            <div className="mt-4">
              <a
                href="mailto:contact@example.com"
                className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-8 mt-8 border-t border-gray-200">
          <p className="text-gray-600 text-sm">
            © 2025 README Pro. All rights reserved.
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
