import React from 'react';
import { Facebook, Twitter, Instagram, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">BlueRide</h3>
            <p className="text-sm leading-relaxed mb-6">
              Moving you forward across Malawi. Reliable rides, affordable rentals, and driver opportunities.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400 transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-blue-400 transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Book a Ride</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Rent a Car</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Corporate Accounts</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Airport Transfers</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-blue-400" />
                <span>+265 999 123 456</span>
              </li>
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-blue-400" />
                <span>support@blueride.mw</span>
              </li>
              <li>
                <p className="text-xs text-slate-500 mt-2">Available 24/7</p>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
          &copy; {new Date().getFullYear()} BlueRide Malawi. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
