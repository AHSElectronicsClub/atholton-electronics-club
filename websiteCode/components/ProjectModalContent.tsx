'use client';
import React, { useState } from 'react';
import Button from './Button';
import SparklesIcon from './Icons';
import GeminiResponseDisplay from './GeminiResponseDisplay';
import type { Project } from '@/data/types';
import { callGeminiApi } from '../data/db';

export default function ProjectModalContent({ project, onClose }: { project: Project, onClose: ()=>void }) {
  const [currentImage, setCurrentImage] = useState(project.images[0]);
  const [geminiResponse, setGeminiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGemini = async () => {
    setLoading(true);
    setError(null);
    setGeminiResponse('');
    const systemPrompt = `You are a helpful assistant for a high school electronics club...`;
    const userQuery = `A student is looking at ${project.title}. Provide 3 next steps etc.`;
    const res = await callGeminiApi(systemPrompt, userQuery);
    if (res.startsWith('Error:')) setError(res);
    else setGeminiResponse(res);
    setLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative p-6 bg-gray-light rounded-t-xl md:rounded-l-xl md:rounded-tr-none">
          <img src={currentImage} alt={project.title} className="w-full h-64 md:h-96 object-cover rounded-lg shadow-md" onError={(e:any)=>e.target.src='/images/placeholder.png'} />
          {project.images.length > 1 && (
            <div className="flex space-x-2 mt-4">
              {project.images.map((img, idx)=>(
                <img key={idx} src={img} alt={`thumb-${idx}`} className={`w-16 h-16 object-cover rounded-md cursor-pointer ${currentImage===img ? 'ring-2 ring-orange' : 'opacity-60 hover:opacity-100'}`} onClick={()=>setCurrentImage(img)} />
              ))}
            </div>
          )}
        </div>

        <div className="p-8 max-h-[85vh] overflow-y-auto">
          <h2 className="text-3xl font-bold font-display text-forest mb-4">{project.title}</h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag=> <span key={tag} className="inline-block bg-teal text-forest text-sm font-bold px-3 py-1 rounded-full">{tag}</span>)}
          </div>

          <h4 className="text-lg font-semibold font-display text-forest mt-6 mb-2">Project Summary</h4>
          <p className="text-gray-700 leading-relaxed">{project.description}</p>

          <h4 className="text-lg font-semibold font-display text-forest mt-6 mb-2">Parts List</h4>
          <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
            {project.partsList.map(part=> <li key={part}>{part}</li>)}
          </ul>

          <div className="bg-gray-100 p-6 rounded-lg mt-8 border border-gold/30">
            <h4 className="text-lg font-semibold text-forest mb-4 flex items-center">
              <span className="mr-2">✨</span> AI Project Helper
            </h4>
            <p className="text-sm text-gray-600 mb-4">Get ideas from our AI assistant!</p>
            <Button onClick={handleGemini} variant="outline" className="w-full" disabled={loading}>{loading ? 'Thinking...' : 'Suggest Next Steps & Ideas'}</Button>

            <div className="mt-6">
              <GeminiResponseDisplay isLoading={loading} error={error} response={geminiResponse} />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button href={project.repoLink} target="_blank" variant="primary" className="w-full sm:w-auto">View on GitHub</Button>
            <Button href={project.pdfLink} target="_blank" variant="secondary" className="w-full sm:w-auto">Download Build Guide</Button>
          </div>
        </div>
      </div>
    </div>
  );
}