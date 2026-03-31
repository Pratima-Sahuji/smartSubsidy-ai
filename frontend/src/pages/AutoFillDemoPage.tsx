import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FileSignature, Database, Check, RefreshCw } from 'lucide-react';
import type { RuleResult, FarmerProfile } from '../lib/api';

export default function AutoFillDemoPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { scheme, profile } = (location.state as { scheme?: RuleResult, profile?: FarmerProfile }) || {};
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!scheme || !profile) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No application context found</h2>
        <button onClick={() => navigate('/form')} className="btn-primary">Back to Form</button>
      </div>
    );
  }

  // Generate a mock application ID
  const appId = `APP-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-earthy-100 rounded-full flex items-center justify-center mb-6 shadow-sm border border-earthy-200 ring-4 ring-earthy-50">
          <Check className="w-10 h-10 text-earthy-600" />
        </div>
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Application Submitted Successfully</h2>
        <p className="text-xl text-gray-500">Your application for {scheme.schemeName} has been received.</p>
        
        <div className="glass-card p-6 inline-block text-left mt-8 border border-earthy-200">
           <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Reference ID</p>
           <p className="text-3xl font-mono text-earthy-800 font-bold">{appId}</p>
        </div>

        <div className="pt-8">
           <button onClick={() => navigate('/decoder')} className="btn-secondary mr-4">Track Status</button>
           <button onClick={() => navigate('/')} className="btn-primary">Return Home</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8 text-center space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
          <FileSignature className="w-8 h-8 text-earthy-600" /> Auto-Filled Application
        </h1>
        <p className="text-gray-500">
           Applying for: <strong>{scheme.schemeName}</strong>
        </p>
      </div>

      <div className="glass-card p-8 border border-earthy-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 bg-earthy-50 border-b border-earthy-200 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-earthy-700 text-sm font-medium">
             <Database className="w-4 h-4" /> Data fetched from Mock AgriStack Integrations
          </div>
          <div className="flex gap-2">
            <span className="flex h-2 w-2 relative pt-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-earthy-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-earthy-500"></span>
            </span>
            <span className="text-xs text-earthy-600 font-semibold uppercase tracking-wider">Synced Live</span>
          </div>
        </div>

        <div className="mt-14 space-y-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Farmer Registry Match</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="label-text">Verified Name</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value={profile.name} />
               </div>
               <div>
                 <label className="label-text">Aadhaar (Masked)</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value="XXXX-XXXX-9012" />
                 <p className="text-xs text-earthy-600 mt-1 flex items-center gap-1"><Check className="w-3 h-3"/> e-KYC Verified</p>
               </div>
               <div>
                 <label className="label-text">State</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value={profile.state} />
               </div>
               <div>
                 <label className="label-text">District</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value={profile.district} />
               </div>
            </div>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Land Records (Bhulekh Match)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="label-text">Total Land Holding (Ha)</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value={profile.landSize} />
               </div>
               <div>
                 <label className="label-text">Primary Crop (Current Seaso)</label>
                 <input type="text" className="input-field bg-gray-50" readOnly value={profile.cropType} />
               </div>
            </div>
          </div>

          {/* Section 3 Documents */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Auto-Attached Documents</h3>
            <ul className="space-y-3">
              {scheme.documents?.map((doc, idx) => (
                <li key={idx} className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="text-sm font-medium text-gray-700">{doc}</span>
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">ATTACHED VIA DL</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6 flex justify-end gap-4">
          <button onClick={() => navigate(-1)} className="btn-secondary">Cancel</button>
          <button onClick={() => setIsSubmitted(true)} className="btn-primary shadow-sm">
             Confirm & Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}
