import React from 'react';
import { Mail, Phone, MessageSquare } from 'lucide-react';

export const ContactSection: React.FC = () => {
  return (
    <section className="bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
        <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
          Have questions? We are here 24/7. Contact our support team or use our AI assistant for instant answers.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a
            href="mailto:support@blueride.mw"
            className="flex items-center px-6 py-3 bg-white text-blue-600 rounded-full font-semibold hover:bg-blue-50 transition-colors shadow-lg"
          >
            <Mail className="w-5 h-5 mr-2" />
            Contact Support
          </a>
          
          <div className="flex items-center px-6 py-3 border-2 border-blue-400 bg-blue-700/50 text-white rounded-full font-semibold">
            <Phone className="w-5 h-5 mr-2" />
            Call +265 999 123 456
          </div>
        </div>
      </div>
    </section>
  );
};
