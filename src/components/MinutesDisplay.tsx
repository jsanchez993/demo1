import React from 'react';
import Markdown from 'react-markdown';

interface MinutesDisplayProps {
  content: string;
}

const MinutesDisplay: React.FC<MinutesDisplayProps> = ({ content }) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-lg border border-gray-200 font-[Roboto]">
      <div className="border-b border-gray-200 bg-gradient-to-r from-purple-50 to-white p-4 rounded-t-lg">
        <h2 className="text-2xl font-semibold text-purple-900 tracking-tight">Meeting Minutes</h2>
      </div>
      <div className="p-8">
        <div className="prose prose-lg max-w-none prose-headings:font-[Roboto] prose-headings:tracking-tight prose-p:text-gray-700 prose-li:text-gray-700 prose-p:font-[Roboto] prose-li:font-[Roboto]">
          <Markdown
            components={{
              h1: ({node, ...props}) => (
                <h1 
                  className="text-3xl font-bold border-b border-purple-100 pb-2 mb-6 tracking-tight" 
                  style={{ color: '#6A1B9A' }}  // Color del sidebar
                  {...props} 
                />
              ),
              h2: ({node, ...props}) => (
                <h2 className="text-2xl font-semibold mt-8 mb-4 tracking-tight text-purple-900" {...props} />
              ),
              h3: ({node, ...props}) => (
                <h3 className="text-xl font-medium mt-6 mb-3 tracking-tight text-purple-900" {...props} />
              ),
              p: ({node, ...props}) => (
                <p className="leading-7 mb-5 text-[15px] font-normal text-gray-700" {...props} />
              ),
              ul: ({node, ...props}) => (
                <ul className="space-y-2 mb-6 ml-6 list-disc text-[15px]" {...props} />
              ),
              ol: ({node, ...props}) => (
                <ol className="space-y-2 mb-6 ml-6 list-decimal text-[15px]" {...props} />
              ),
              li: ({node, ...props}) => (
                <li className="pl-2 text-gray-700" {...props} />
              ),
              blockquote: ({node, ...props}) => (
                <blockquote className="border-l-4 border-purple-300 bg-purple-50 pl-6 py-4 my-6 text-gray-700 rounded-r text-[15px] italic" {...props} />
              ),
              hr: ({node, ...props}) => (
                <hr className="my-8 border-t-2 border-purple-100" {...props} />
              ),
              code: ({node, inline, ...props}) => (
                inline ? 
                <code className="bg-purple-50 text-purple-800 px-1.5 py-0.5 rounded text-sm font-mono" {...props} /> :
                <code className="block bg-gray-50 p-4 rounded-lg text-sm font-mono overflow-x-auto" {...props} />
              ),
            }}
          >
            {content}
          </Markdown>
        </div>
      </div>
    </div>
  );
};

export default MinutesDisplay;
