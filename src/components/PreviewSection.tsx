import { Eye } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface PreviewSectionProps {
  content: string;
}

export function PreviewSection({ content }: PreviewSectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 h-fit">
      <div className="flex items-center space-x-3 p-4 border-b border-gray-200">
        <Eye className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
      </div>

      <div className="p-6 max-h-[600px] overflow-y-auto">
        {content ? (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown
              components={{
                code: (props) => {
                  const { children, className } = props;
                  const match = /language-(\w+)/.exec(className || "");

                  if (match) {
                    return (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    );
                  }

                  return <code className={className}>{children}</code>;
                },
                h1: ({ children }) => (
                  <h1 className="text-3xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-200">
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4 pb-1 border-b border-gray-100">
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-xl font-semibold text-gray-700 mt-6 mb-3">
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {children}
                  </p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-inside text-gray-600 mb-4 space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside text-gray-600 mb-4 space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }) => (
                  <li className="text-gray-600 ml-6">{children}</li>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    className="text-primary-600 hover:text-primary-800 underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {children}
                  </a>
                ),
                img: ({ src, alt }) => (
                  <img
                    src={src}
                    alt={alt}
                    className="inline-block max-h-6 mx-1"
                  />
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-4 border-primary-500 pl-4 italic text-gray-600 bg-primary-50 py-2 my-4">
                    {children}
                  </blockquote>
                ),
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="min-w-full border border-gray-300">
                      {children}
                    </table>
                  </div>
                ),
                thead: ({ children }) => (
                  <thead className="bg-gray-50">{children}</thead>
                ),
                th: ({ children }) => (
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border border-gray-300">
                    {children}
                  </th>
                ),
                td: ({ children }) => (
                  <td className="px-4 py-2 text-gray-600 border border-gray-300">
                    {children}
                  </td>
                ),
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex items-center justify-center h-32 text-gray-400">
            <p>Preview will appear here as you type...</p>
          </div>
        )}
      </div>
    </div>
  );
}
