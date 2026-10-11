import React from 'react';
import { BiodataData } from '../features/biodata/biodataTypes';
import { getTemplateById } from './templateRegistry';

interface DocumentRendererProps {
  data: BiodataData;
  isPrint?: boolean;
  isThumbnail?: boolean;
  className?: string;
}

export const DocumentRenderer: React.FC<DocumentRendererProps> = ({
  data,
  isPrint = false,
  isThumbnail = false,
  className = '',
}) => {
  const templateDef = getTemplateById(data.templateId);
  const TemplateComponent = templateDef.component;

  return (
    <div
      id={isPrint ? 'biodata-document-print' : undefined}
      className={`biodata-document-wrapper transition-all duration-300 ${
        isPrint
          ? 'w-full max-w-[210mm] mx-auto bg-transparent'
          : isThumbnail
          ? 'w-full h-full overflow-hidden'
          : 'w-full max-w-[210mm] mx-auto shadow-xl'
      } ${className}`}
    >
      <TemplateComponent data={data} isPrint={isPrint} isThumbnail={isThumbnail} />
    </div>
  );
};
