'use client';
import React, { useEffect } from 'react';

// We need to import a syntax highlighter. This is a standard one.
// @ts-ignore
import Prism from 'prismjs';
import 'prismjs/themes/prism-okaidia.css'; // A nice dark theme

// --- THIS IS THE FIX ---
// Added 'prism-c' which is required by 'prism-cpp'
import 'prismjs/components/prism-c'; 
import 'prismjs/components/prism-java'; 
import 'prismjs/components/prism-cpp';   
import 'prismjs/components/prism-json'; 

// Props for the component, matching what your page.tsx sends
type CodeSnippetProps = {
  codeString: string;
  language: string;
};

export default function CodeSnippet({ codeString, language }: CodeSnippetProps) {
  
  // This runs the highlighter after the component loads
  useEffect(() => {
    Prism.highlightAll();
  }, [codeString, language]);

  return (
    // We use the 'okaidia' theme for dark mode
    <div className="rounded-xl overflow-hidden shadow-lg">
      {/* This 'pre' tag needs the theme class and a language class.
        We add 'prism-code' for basic styling.
      */}
      <pre className="prism-code !m-0">
        {/* This is the code element. 
          We use `language-${language}` (e.g., "language-java")
          so Prism knows how to color it.
        */}
        <code className={`language-${language}`}>
          {codeString.trim()}
        </code>
      </pre>
    </div>
  );
}