import React from 'react';
import { ViewState } from '../types';
import { Car, MapPin, UserCheck, ArrowRight } from 'lucide-react';

interface ServicesSectionProps {
  setView: (view: ViewState) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ setView }) => {
  const services = [
    {
      title: 'Book a Ride',
      description: 'Need a reliable ride? Book fast and get picked up in minutes.',
      icon: <MapPin className="w-8 h-8 text-blue-600" />,
      action: 'Book Now',
      view: ViewState.BOOK_RIDE,
      image: 'https://picsum.photos/id/183/800/600',
    },
    {
      title: 'Rent a Car',
      description: 'Affordable car rentals for a day, week, or month. Choose from sedans, SUVs, and more.',
      icon: <Car className="w-8 h-8 text-blue-600" />,
      action: 'Rent a Car',
      view: ViewState.RENT_CAR,
      image: 'https://picsum.photos/id/133/800/600',
    },
    {
      title: 'Become a Driver',
      description: 'Earn more with your car, bike, or minibus. Join BlueRide and start driving today.',
      icon: <UserCheck className="w-8 h-8 text-blue-600" />,
      action: 'Apply Now',
      view: ViewState.BECOME_DRIVER,
      image: 'https://picsum.photos/id/1071/800/600',
    },
  ];

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Our Services</h2>
          <p className="mt-4 text-lg text-slate-600">Choose how you want to move with BlueRide.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              <div className="h-48 overflow-hidden relative">
                 <div className="absolute inset-0 bg-blue-900/10 hover:bg-transparent transition-colors duration-300" />
                 <img src={service.image} alt={service.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 flex-1">{service.description}</p>
                <button
                  onClick={() => setView(service.view)}
                  className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  {service.action} <ArrowRight className="ml-2 w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
