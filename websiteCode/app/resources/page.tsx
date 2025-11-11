// components/ResourcesSection.tsx

import React from 'react';
import { RESOURCES_DATA } from '@/data/db'; 
import CodeSnippet from '@/components/CodeSnippet'; 
import SAMPLE_CODE_SNIPPET from '@/data/sampleSnippet'; 

// ... rest of your file
export default function ResourcesSection() {
  // Add additional resources dynamically
  const extendedResources = [
    ...RESOURCES_DATA,
    {
      id: 999,
      title: 'Howard County Sierra Club',
      description: 'Environmental advocacy group focused on local sustainability and water protection.',
      link: 'https://www.sierraclub.org/maryland/howard-county-group',
      type: 'organization'
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold font-display text-navy mb-8">Resources</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {extendedResources.map(resource => (
          <div
            key={resource.id}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between hover:shadow-2xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-navy mb-2">{resource.title}</h3>
            <p className="text-gray-600 text-sm flex-grow">{resource.description}</p>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-teal font-bold hover:underline"
            >
              Visit
            </a>
          </div>
        ))}
      </div>

      {/* Include a code snippet resource */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold font-display text-navy mb-4">Example Code</h3>
        <CodeSnippet codeString={SAMPLE_CODE_SNIPPET} language="cpp" />
      </div>
    </div>
  );
}
