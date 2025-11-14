'use client';

import { useSwaggerDocs } from '@/hooks/use-swagger-docs.query';
import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), {
  ssr: false,
  loading: () => <div>Loading API documentation...</div>,
});

interface SwaggerUIComponentProps {
  spec: any;
}

export default function SwaggerUIComponent({}: SwaggerUIComponentProps) {
  const { data, isLoading } = useSwaggerDocs();
  if (isLoading) return <>Loading...</>;
  return (
    <div className="swagger-container">
      <SwaggerUI
        spec={data}
        docExpansion="list"
        defaultModelsExpandDepth={2}
        defaultModelExpandDepth={2}
      />
      <style jsx global>{`
        .swagger-container {
          height: 100vh;
          overflow: auto;
        }
      `}</style>
    </div>
  );
}
