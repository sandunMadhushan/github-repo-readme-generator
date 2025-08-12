import { Download, FileText, Globe, FileType } from 'lucide-react'

interface ExportOptionsProps {
  content: string
}

export function ExportOptions({ content }: ExportOptionsProps) {
  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.md'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const downloadHTML = () => {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>README</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; }
    h1, h2, h3 { color: #24292e; }
    pre { background: #f6f8fa; padding: 16px; border-radius: 6px; overflow-x: auto; }
    code { background: #f6f8fa; padding: 0.2em 0.4em; border-radius: 3px; }
    blockquote { border-left: 4px solid #dfe2e5; padding-left: 16px; color: #586069; }
  </style>
</head>
<body>
  <div id="content">${content.replace(/\n/g, '<br>')}</div>
</body>
</html>`

    const blob = new Blob([htmlContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'README.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(content)
      // Could add a toast notification here
    } catch (err) {
      console.error('Failed to copy to clipboard:', err)
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-4">
        <Download className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Export Options</h3>
      </div>
      
      <div className="space-y-3">
        <button
          onClick={downloadMarkdown}
          disabled={!content}
          className="w-full btn-primary px-4 py-3 text-left flex items-center space-x-3"
        >
          <FileText className="w-5 h-5" />
          <div>
            <div className="font-medium">Download as Markdown</div>
            <div className="text-sm opacity-80">README.md file for GitHub</div>
          </div>
        </button>

        <button
          onClick={downloadHTML}
          disabled={!content}
          className="w-full btn-secondary px-4 py-3 text-left flex items-center space-x-3"
        >
          <Globe className="w-5 h-5" />
          <div>
            <div className="font-medium">Download as HTML</div>
            <div className="text-sm opacity-70">Standalone HTML file</div>
          </div>
        </button>

        <button
          onClick={copyToClipboard}
          disabled={!content}
          className="w-full btn-outline px-4 py-3 text-left flex items-center space-x-3"
        >
          <FileType className="w-5 h-5" />
          <div>
            <div className="font-medium">Copy to Clipboard</div>
            <div className="text-sm opacity-70">Copy markdown content</div>
          </div>
        </button>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Pro Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Download as Markdown for direct GitHub upload</li>
          <li>• Use HTML export for documentation websites</li>
          <li>• Copy to clipboard for quick pasting</li>
        </ul>
      </div>
    </div>
  )
}
