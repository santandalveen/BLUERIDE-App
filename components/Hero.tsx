import React from 'react';
import { ViewState } from '../types';
import { ChevronRight } from 'lucide-react';

interface HeroProps {
  setView: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <div className="relative bg-slate-900 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://picsum.photos/id/111/1920/1080"
          alt="Vintage car on road"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 to-slate-900/40 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 lg:py-40">
        <div className="lg:w-2/3">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
            Fast, Safe & Affordable <br className="hidden md:block" />
            <span className="text-blue-400">Rides in Malawi</span>
          </h1>
          
          <p className="text-xl text-slate-200 mb-8 max-w-2xl font-light">
            Book a ride, rent a car, or become a driver — all in one place.
            <br />
            <span className="font-semibold text-white mt-2 block">BlueRide Malawi — Moving you forward.</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setView(ViewState.BOOK_RIDE)}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center"
            >
              Book a Ride
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            
            <button
              onClick={() => setView(ViewState.RENT_CAR)}
              className="px-8 py-4 bg-white hover:bg-slate-100 text-blue-900 font-bold rounded-lg shadow-lg transform transition hover:-translate-y-0.5 flex items-center justify-center"
            >
              Rent a Car
            </button>
            
            <button
              onClick={() => setView(ViewState.BECOME_DRIVER)}
              className="px-8 py-4 border-2 border-slate-300 text-white font-bold rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Become a Driver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
