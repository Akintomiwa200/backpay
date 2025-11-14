import swaggerDocs from '@/lib/swagger';
import SwaggerUIComponent from '@/components/swaggerUI';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata = {
  title: 'Laskad API Documentation',
  description: 'API documentation for Laskad application',
};

export default function ApiDocs() {
  return (
    <div className='h-auto'>
      <Navbar/>
    
      <SwaggerUIComponent spec={swaggerDocs} />
      <Footer/>
    </div>
  );
}
