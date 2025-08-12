# 🚀 Deployment Guide

This document explains how to deploy the README Generator Pro to GitHub Pages.

## 📋 Prerequisites

- GitHub repository with your code
- GitHub Pages enabled in repository settings
- Node.js 20+ for local development

## ⚙️ Automated Deployment (Recommended)

The project is configured with automatic deployment via GitHub Actions:

### Setup Steps:

1. **Enable GitHub Pages:**

   - Go to your repository settings
   - Navigate to "Pages" section
   - Set Source to "GitHub Actions"

2. **Push to main/master branch:**

   ```bash
   git add .
   git commit -m "Configure GitHub Pages deployment"
   git push origin master
   ```

3. **Automatic Build & Deploy:**
   - GitHub Actions will automatically build and deploy on every push
   - Check the "Actions" tab for deployment status
   - Your site will be available at: `https://yourusername.github.io/repository-name/`

### Custom Domain Setup:

For custom domain (like `https://sandun.is-a.dev/github-repo-readme-generator/`):

1. **DNS Configuration:**

   - Add CNAME record pointing to `yourusername.github.io`
   - Or add A records pointing to GitHub Pages IPs

2. **Repository Settings:**
   - Go to Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

## 🔧 Manual Deployment

If you prefer manual deployment:

1. **Build the project:**

   ```bash
   npm run build
   ```

2. **Deploy dist folder:**
   - Upload the `dist/` folder contents to your web server
   - Or use GitHub Pages manual upload

## 🐛 Troubleshooting

### Common Issues:

#### Empty/Blank Page

- **Cause:** Incorrect base path configuration
- **Solution:** Ensure `vite.config.ts` has correct base path:
  ```typescript
  export default defineConfig({
    base: "/your-repository-name/",
  });
  ```

#### 404 Errors for Assets

- **Cause:** Assets not loading due to incorrect paths
- **Solution:** Check that `index.html` uses relative paths (`./` instead of `/`)

#### Build Failures

- **Cause:** TypeScript errors or missing dependencies
- **Solution:** Run `npm run lint` and fix any issues

## 📁 File Structure After Build

```
dist/
├── index.html          # Main HTML file
├── assets/
│   ├── index-*.css    # Bundled styles
│   └── index-*.js     # Bundled JavaScript
└── vite.svg           # Favicon
```

## 🔄 Deployment Workflow

Our GitHub Actions workflow (`.github/workflows/deploy.yml`) performs:

1. ✅ Checkout code
2. ✅ Setup Node.js 20
3. ✅ Install dependencies
4. ✅ Build project
5. ✅ Deploy to GitHub Pages

## 📊 Live Sites

- **Production:** [https://sandun.is-a.dev/github-repo-readme-generator/](https://sandun.is-a.dev/github-repo-readme-generator/)
- **GitHub Pages:** `https://yourusername.github.io/github-repo-readme-generator/`

---

Need help? Check the [main README](./README.md) or open an issue!
