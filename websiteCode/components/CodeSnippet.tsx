import React from 'react';

// This component receives the code string and language as props
export default function CodeSnippet({ codeString, language }: { codeString: string, language: string }) {
  return (
    // We add all the styling to the <pre> tag
    <pre className="bg-dark-gray rounded-xl p-4 overflow-x-auto shadow-inner">
      
      {/* We add the text styling to the <code> tag */}
      <code className={`language-${language} text-off-white font-mono text-sm`}>
        {codeString}
      </code>
    </pre>
  );
}