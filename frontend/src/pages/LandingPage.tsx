import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Sprout, ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center pt-20 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-earthy-100 text-earthy-800 text-sm font-medium mb-4 shadow-sm border border-earthy-200">
          <Sparkles className="w-4 h-4" />
          <span>Smart Eligibility Guide</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Find your subsidies. <br/>
          <span className="text-earthy-600">Grow your future.</span>
        </h1>
        
        <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
          SmartSubsidy AI decodes complex agricultural schemes into a plain-language guide. 
          Discover what you're eligible for, instantly auto-fill forms, and understand rejections clearly.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link to="/form" className="btn-primary text-lg px-8 py-4 w-full sm:w-auto">
            Check Eligibility Now
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link to="/decoder" className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto">
            Decode Rejection
            <ShieldCheck className="ml-2 w-5 h-5 flex-shrink-0" />
          </Link>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="glass-card p-8 hover:shadow-md transition-shadow">
            <div className="bg-earthy-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Sprout className="w-6 h-6 text-earthy-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Matching</h3>
            <p className="text-gray-500">Our rules engine instantly checks your profile against all active government schemes.</p>
          </div>
          
          <div className="glass-card p-8 hover:shadow-md transition-shadow">
            <div className="bg-earthy-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <Sparkles className="w-6 h-6 text-earthy-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Auto-Form Filler</h3>
            <p className="text-gray-500">We auto-fill complex applications using mock verified AgriStack data to save you time.</p>
          </div>
          
          <div className="glass-card p-8 hover:shadow-md transition-shadow">
            <div className="bg-earthy-100 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6 text-earthy-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Rejection Decoder</h3>
            <p className="text-gray-500">Turn bureaucratic terms into plain English. Understand exactly why an app failed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
