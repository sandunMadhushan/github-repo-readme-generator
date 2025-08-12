# GitHub Pages Deployment

This project is configured to deploy to GitHub Pages at `https://sandun.is-a.dev/github-repo-readme-generator/`

## Automatic Deployment

The project uses GitHub Actions to automatically deploy to GitHub Pages when changes are pushed to the `master` branch.

## Manual Deployment

If you want to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The built files will be in the `dist` directory

3. Deploy the `dist` directory to your GitHub Pages branch

## Configuration

- **Vite base path**: `/github-repo-readme-generator/`
- **Custom domain**: `sandun.is-a.dev`
- **Build output**: `dist/`

## Troubleshooting

If the deployed site appears empty:

1. Check that the base path in `vite.config.ts` matches your GitHub Pages URL path
2. Ensure GitHub Pages is configured to serve from the `gh-pages` branch
3. Verify that the CNAME file contains the correct custom domain
4. Check the browser developer console for any asset loading errors

## Local Preview

To preview the built site locally:

```bash
npm run preview
```

This will serve the built site on `http://localhost:4173` with the correct base path.
