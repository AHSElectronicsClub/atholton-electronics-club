import React from 'react';

export default function GeminiResponseDisplay({ isLoading, error, response }: { isLoading: boolean, error: string | null, response: string }) {
  if (isLoading) return <div className="flex items-center justify-center p-6">Generating...</div>;
  if (error) return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg"><p><strong>Error:</strong> {error}</p></div>;
  if (!response) return null;
  const formatted = response.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br />');
  return <div className="text-gray-700 leading-relaxed space-y-2" dangerouslySetInnerHTML={{ __html: formatted }} />;
}