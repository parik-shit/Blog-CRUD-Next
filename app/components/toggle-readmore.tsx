'use client'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react';


interface ReadMoreProps {
  initialText: string;
  expandedText: string;
}

const ReadMore: React.FC<ReadMoreProps> = ({ initialText, expandedText }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div>
        {isExpanded ? expandedText : initialText}
        {!isExpanded && (
          <Button variant='ghost'
          className='font-bold' size='sm'
            onClick={toggleReadMore}
            // className="text-blue-500 ml-2 hover:underline focus:outline-none"
          >
            Read More
          </Button>
        )}
      </div>
      {isExpanded && (
        <Button variant='ghost' size='sm'
        className='font-bold'
          onClick={toggleReadMore}
        //   className="text-blue-500 mt-2 hover:underline focus:outline-none"
        >
          Read Less
        </Button>
      )}
    </div>
  );
};

export default ReadMore;
