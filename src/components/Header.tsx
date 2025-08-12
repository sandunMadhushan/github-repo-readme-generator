import { Github, Star, Menu, X } from "lucide-react";
import { useState } from "react";

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">R</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">README Pro</h1>
              <p className="text-xs text-gray-500">Advanced Generator</p>
            </div>
          </button>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('features')}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection('templates')}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Templates
            </button>
            <button
              onClick={() => scrollToSection('examples')}
              className="text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
            >
              Examples
            </button>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Mobile menu button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            
            <a
              href="https://github.com/sandunMadhushan/github-repo-readme-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="hidden sm:inline">Star on GitHub</span>
            </a>
            <a
              href="https://github.com/sandunMadhushan/github-repo-readme-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white">
            <nav className="px-4 py-4 space-y-3">
              <button
                onClick={() => {
                  scrollToSection('features');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Features
              </button>
              <button
                onClick={() => {
                  scrollToSection('templates');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Templates
              </button>
              <button
                onClick={() => {
                  scrollToSection('examples');
                  setMobileMenuOpen(false);
                }}
                className="block w-full text-left text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Examples
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
