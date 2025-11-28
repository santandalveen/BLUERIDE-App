import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { Footer } from './components/Footer';
import { ContactSection } from './components/ContactSection';
import { ChatAssistant } from './components/ChatAssistant';
import { ViewState } from './types';
import { ArrowLeft, CheckCircle, Car, MapPin, Calendar, User, Truck, CreditCard, Phone, MessageSquare, Star, Navigation, Clock } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setView] = useState<ViewState>(ViewState.HOME);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case ViewState.BOOK_RIDE:
        return <BookingView goBack={() => setView(ViewState.HOME)} onBook={() => setView(ViewState.RIDE_TRACKING)} />;
      case ViewState.RENT_CAR:
        return <RentalView goBack={() => setView(ViewState.HOME)} />;
      case ViewState.BECOME_DRIVER:
        return <DriverView goBack={() => setView(ViewState.HOME)} />;
      case ViewState.RIDE_TRACKING:
        return <RideTrackingView goBack={() => setView(ViewState.HOME)} />;
      default:
        return (
          <>
            <Hero setView={setView} />
            <ServicesSection setView={setView} />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header currentView={currentView} setView={setView} />
      
      <main className="flex-grow">
        {renderView()}
      </main>

      <Footer />
      <ChatAssistant />
    </div>
  );
};

// --- Sub-Views ---

const BookingView: React.FC<{ goBack: () => void; onBook: () => void }> = ({ goBack, onBook }) => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
    </button>
    
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="bg-blue-600 p-8 text-white">
        <h2 className="text-3xl font-bold mb-2">Book a Ride</h2>
        <p className="text-blue-100">Get a reliable driver in minutes.</p>
      </div>
      
      <div className="p-8">
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onBook(); }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input required type="text" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. Gateway Mall, Lilongwe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Dropoff Destination</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                <input required type="text" className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="e.g. KIA Airport" />
              </div>
            </div>
          </div>
          
          <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Ride Type</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                 {['Economy', 'Comfort', 'XL'].map((type, idx) => (
                   <label key={type} className="border rounded-lg p-4 cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all">
                      <input type="radio" name="rideType" defaultChecked={idx === 0} className="sr-only" />
                      <div className="flex flex-col items-center">
                         <Car className="w-8 h-8 text-slate-600 mb-2" />
                         <span className="font-semibold text-slate-900">{type}</span>
                         <span className="text-xs text-slate-500 mt-1">{3 + idx}-5 mins away</span>
                      </div>
                   </label>
                 ))}
              </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all shadow-md">
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  </div>
);

const RideTrackingView: React.FC<{ goBack: () => void }> = ({ goBack }) => {
  const [status, setStatus] = useState<'searching' | 'found' | 'arriving' | 'arrived'>('searching');
  const [eta, setEta] = useState(6);
  const [progress, setProgress] = useState(0);

  // Simulation Logic
  useEffect(() => {
    const searchTimer = setTimeout(() => {
      setStatus('found');
    }, 2500);

    const routeTimer = setTimeout(() => {
      setStatus('arriving');
    }, 4500);

    return () => {
      clearTimeout(searchTimer);
      clearTimeout(routeTimer);
    };
  }, []);

  useEffect(() => {
    if (status === 'arriving') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setStatus('arrived');
            return 100;
          }
          return prev + 0.3; // Slower, smoother movement
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  // Update ETA
  useEffect(() => {
     if (status === 'arriving') {
        const remaining = Math.ceil((1 - progress / 100) * 6);
        setEta(remaining > 0 ? remaining : 1);
     }
  }, [progress, status]);

  // Calculate Driver Position on the Map Grid
  const getDriverStyle = () => {
    // Grid Logic:
    // Road 1: Horizontal at top 30%. Starts off-screen (-10%) ends at Intersection (75%).
    // Road 2: Vertical at left 75%. Starts at Intersection (30%) ends at User (70%).
    
    // The turn happens when the driver reaches 75% Left. 
    // Let's define the path length ratios.
    // Segment 1 (Horiz): 85 units distance.
    // Segment 2 (Vert): 40 units distance.
    // Total: 125 units.
    // Turn point is at 85/125 = 0.68 (68% of progress)
    
    const turnPoint = 68;
    
    let x, y, rot;
    
    if (progress < turnPoint) {
        // Segment 1: Horizontal
        const segmentProgress = progress / turnPoint; 
        x = -10 + (segmentProgress * 85); // -10 to 75
        y = 30;
        rot = 90; // Facing Right
    } else {
        // Segment 2: Vertical
        const segmentProgress = (progress - turnPoint) / (100 - turnPoint);
        x = 75;
        y = 30 + (segmentProgress * 40); // 30 to 70
        rot = 180; // Facing Down
    }
    
    return { 
        left: `${x}%`, 
        top: `${y}%`, 
        transform: `translate(-50%, -50%) rotate(${rot}deg)` 
    };
  };

  const driverStyle = getDriverStyle();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Map Container Simulation */}
      <div className="bg-slate-200 w-full h-[60vh] rounded-2xl relative overflow-hidden shadow-xl border border-slate-300 group">
        
        {/* Map Background / Grid */}
        <div className="absolute inset-0 bg-[#e5e7eb]">
           {/* City Blocks (Decoration) */}
           <div className="absolute top-[5%] left-[5%] w-[65%] h-[20%] bg-[#d1d5db] rounded-sm"></div>
           <div className="absolute top-[35%] left-[5%] w-[65%] h-[60%] bg-[#d1d5db] rounded-sm"></div>
           <div className="absolute top-[5%] left-[80%] w-[15%] h-[60%] bg-[#cbd5e1] rounded-sm"></div>
           <div className="absolute top-[75%] left-[80%] w-[15%] h-[20%] bg-[#cbd5e1] rounded-sm"></div>
        </div>
        
        {/* Roads */}
        {/* Horizontal Main Road */}
        <div className="absolute top-[30%] left-0 w-full h-10 bg-white shadow-sm transform -translate-y-1/2 flex items-center justify-around overflow-hidden">
            <div className="w-full border-b border-dashed border-slate-300"></div>
        </div>
        {/* Vertical Road */}
        <div className="absolute top-0 left-[75%] h-full w-10 bg-white shadow-sm transform -translate-x-1/2 flex flex-col items-center justify-around overflow-hidden">
            <div className="h-full border-r border-dashed border-slate-300"></div>
        </div>

        {/* User Location Pin */}
        <div className="absolute top-[70%] left-[75%] transform -translate-x-1/2 -translate-y-1/2 z-10 group">
          <div className="relative flex flex-col items-center">
             <span className="bg-slate-800 text-white text-[10px] px-2 py-1 rounded-full mb-1 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">Pickup Location</span>
             <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg relative z-20"></div>
             <div className="absolute w-12 h-12 bg-blue-500 rounded-full opacity-20 animate-ping z-10 top-[-16px]"></div>
          </div>
        </div>

        {/* Moving Driver Icon */}
        {(status === 'arriving' || status === 'arrived') && (
           <div 
             className="absolute z-30 transition-all duration-300 ease-linear"
             style={driverStyle}
           >
              <div className="relative">
                <div className="bg-slate-900 p-2 rounded-lg shadow-2xl transform transition-transform">
                  <Car className="text-white w-5 h-5" />
                </div>
                {/* Headlights effect */}
                <div className="absolute top-1/2 left-full w-8 h-6 bg-yellow-200/30 blur-sm transform -translate-y-1/2 rounded-full"></div>
              </div>
           </div>
        )}

        {/* Status Overlay */}
        <div className="absolute top-4 left-4 right-4 md:left-auto md:right-4 md:w-80 z-40">
           {status === 'searching' && (
             <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-fade-in">
               <div className="flex items-center space-x-3">
                 <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                 <span className="font-medium text-slate-700">Finding nearby drivers...</span>
               </div>
             </div>
           )}

           {status === 'found' && (
             <div className="bg-green-50 p-4 rounded-xl shadow-lg border border-green-200">
               <div className="flex items-center space-x-3">
                 <CheckCircle className="w-6 h-6 text-green-600" />
                 <span className="font-bold text-green-700">Driver Found!</span>
               </div>
             </div>
           )}
        </div>
        
        {/* Bottom Sheet Details */}
        {(status === 'arriving' || status === 'arrived' || status === 'found') && (
           <div className="absolute bottom-0 left-0 right-0 bg-white p-6 rounded-t-3xl shadow-[0_-5px_20px_-5px_rgba(0,0,0,0.1)] animate-slide-up z-50">
              <div className="w-12 h-1 bg-slate-200 rounded-full mx-auto mb-6"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                
                {/* Driver Info */}
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-100 rounded-full overflow-hidden border-2 border-white shadow-md">
                     <img src="https://picsum.photos/seed/driver/200" alt="Driver" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Chifundo Banda</h3>
                    <div className="flex items-center text-slate-500 text-sm">
                       <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                       <span className="font-medium mr-2">4.8</span>
                       <span>• Toyota Corolla (Silver)</span>
                    </div>
                    <div className="text-xs font-mono bg-slate-100 px-2 py-1 rounded inline-block mt-1">
                      BZ 4567
                    </div>
                  </div>
                </div>

                {/* Ride Status */}
                <div className="flex-1 w-full md:w-auto text-center md:text-left md:pl-8 md:border-l border-slate-100">
                   <div className="flex items-center justify-center md:justify-start space-x-2 text-blue-600 mb-1">
                      {status === 'arrived' ? <CheckCircle className="w-5 h-5" /> : <Clock className="w-5 h-5 animate-pulse" />}
                      <span className="font-bold text-lg">
                        {status === 'arrived' ? 'Driver Arrived' : `Arriving in ${eta} min`}
                      </span>
                   </div>
                   <p className="text-slate-500 text-sm">
                      {status === 'arrived' ? 'Your ride is here waiting for you.' : 'Driver is on the way to pickup.'}
                   </p>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 w-full md:w-auto">
                   <button className="flex-1 md:flex-none p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex justify-center items-center">
                      <Phone className="w-5 h-5" />
                   </button>
                   <button className="flex-1 md:flex-none p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors flex justify-center items-center">
                      <MessageSquare className="w-5 h-5" />
                   </button>
                   {status !== 'arrived' && (
                     <button onClick={goBack} className="flex-1 md:flex-none px-6 py-3 border border-red-200 text-red-600 rounded-xl hover:bg-red-50 transition-colors text-sm font-medium">
                        Cancel
                     </button>
                   )}
                   {status === 'arrived' && (
                     <button onClick={goBack} className="flex-1 md:flex-none px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm font-bold shadow-lg shadow-blue-200">
                        Start Ride
                     </button>
                   )}
                </div>

              </div>
           </div>
        )}

      </div>
      
      {/* Disclaimer */}
      <p className="text-center text-xs text-slate-400 mt-4">
        Map visualization is for demonstration purposes. Driver location is updated in real-time.
      </p>
    </div>
  );
};

const RentalView: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
    </button>
    
    <div className="text-center mb-10">
      <h2 className="text-3xl font-bold text-slate-900">Rent a Vehicle</h2>
      <p className="text-slate-600 mt-2">Choose from our wide range of premium vehicles.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: 'Toyota Corolla', type: 'Sedan', price: 'MWK 45,000', img: 'https://picsum.photos/id/111/400/300' },
        { name: 'Toyota Prado', type: 'SUV', price: 'MWK 120,000', img: 'https://picsum.photos/id/183/400/300' },
        { name: 'Toyota Hiace', type: 'Minibus', price: 'MWK 90,000', img: 'https://picsum.photos/id/655/400/300' },
      ].map((car, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col">
          <img src={car.img} alt={car.name} className="w-full h-48 object-cover" />
          <div className="p-6 flex-1 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{car.name}</h3>
                <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded mt-1 inline-block">{car.type}</span>
              </div>
            </div>
            <div className="mt-auto">
               <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-500 text-sm">Daily Rate</span>
                  <span className="text-blue-600 font-bold text-lg">{car.price}</span>
               </div>
               <button className="w-full py-2 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
                 Select Vehicle
               </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const DriverView: React.FC<{ goBack: () => void }> = ({ goBack }) => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <button onClick={goBack} className="flex items-center text-slate-500 hover:text-blue-600 mb-6 transition-colors">
      <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
    </button>
    
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      <div className="relative h-64">
        <img src="https://picsum.photos/id/1071/1200/600" alt="Driver" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end">
          <div className="p-8">
            <h2 className="text-3xl font-bold text-white mb-2">Become a Driver</h2>
            <p className="text-slate-200">Join our community and earn on your schedule.</p>
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
           <div className="p-4 bg-slate-50 rounded-lg text-center">
             <Calendar className="w-8 h-8 text-blue-600 mx-auto mb-2" />
             <h4 className="font-semibold text-slate-900">Flexible Hours</h4>
             <p className="text-xs text-slate-500 mt-1">Work whenever you want.</p>
           </div>
           <div className="p-4 bg-slate-50 rounded-lg text-center">
             <CreditCard className="w-8 h-8 text-blue-600 mx-auto mb-2" />
             <h4 className="font-semibold text-slate-900">Weekly Pay</h4>
             <p className="text-xs text-slate-500 mt-1">Get paid directly to your account.</p>
           </div>
           <div className="p-4 bg-slate-50 rounded-lg text-center">
             <User className="w-8 h-8 text-blue-600 mx-auto mb-2" />
             <h4 className="font-semibold text-slate-900">Be Your Own Boss</h4>
             <p className="text-xs text-slate-500 mt-1">Take control of your earnings.</p>
           </div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" className="w-full p-3 border border-slate-300 rounded-lg" />
            <input type="email" placeholder="Email Address" className="w-full p-3 border border-slate-300 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <input type="text" placeholder="Phone Number" className="w-full p-3 border border-slate-300 rounded-lg" />
             <input type="text" placeholder="City" className="w-full p-3 border border-slate-300 rounded-lg" />
          </div>
          <div>
             <select className="w-full p-3 border border-slate-300 rounded-lg text-slate-600">
               <option>Select Vehicle Type</option>
               <option>Personal Car (Sedan/Hatchback)</option>
               <option>Minibus</option>
               <option>Motorcycle</option>
               <option>I need a vehicle</option>
             </select>
          </div>
          
          <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-all mt-4">
            Submit Application
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default App;