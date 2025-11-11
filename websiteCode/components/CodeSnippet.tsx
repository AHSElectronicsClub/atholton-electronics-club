'use client';
import React, { useState } from 'react';

export default function CodeSnippet({ codeString, language = 'cpp' }: { codeString: string, language?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(codeString).then(() => {
      setCopied(true);
      setTimeout(()=>setCopied(false),2000);
    });
  };
  return (
    <div className="bg-navy-dark rounded-xl shadow-lg my-8">
      <div className="flex justify-between items-center px-4 py-2 border-b border-navy-light">
        <span className="text-sm text-gray-400">Example Code: {language}</span>
        <button onClick={handleCopy} className="text-sm bg-navy-light text-teal px-3 py-1 rounded-md hover:bg-teal hover:text-navy transition-colors">{copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm text-gray-200">
        <code>{codeString.trim()}</code>
      </pre>
    </div>
  );
}



