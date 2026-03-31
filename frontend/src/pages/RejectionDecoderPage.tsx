import React, { useState } from 'react';
import { Search, Info, AlertOctagon, CheckCircle, Clock, RefreshCw } from 'lucide-react';
import { getApplicationStatus } from '../lib/api';

export default function RejectionDecoderPage() {
  const [appId, setAppId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appId.trim()) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const data = await getApplicationStatus(appId.toUpperCase());
      setResult(data.application);
    } catch (err: any) {
      setError(err.message || 'Application not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'approved': return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'rejected': return <AlertOctagon className="w-12 h-12 text-red-500" />;
      case 'pending': return <Clock className="w-12 h-12 text-yellow-500" />;
      default: return <Info className="w-12 h-12 text-gray-400" />;
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 mb-10">
        <h1 className="text-3xl font-extrabold text-gray-900">Application Status Decoder</h1>
        <p className="text-gray-500">Track your application and decode rejection reasons.</p>
      </div>

      <div className="glass-card p-6 md:p-8 mb-8 shadow-sm">
        <form onSubmit={handleSearch} className="flex gap-4">
          <input 
            type="text" 
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
            placeholder="Enter Application ID (e.g. APP-9101)" 
            className="input-field flex-1 text-lg font-mono uppercase"
          />
          <button type="submit" disabled={loading} className="btn-primary shrink-0 px-8">
            {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
          </button>
        </form>

        <div className="mt-4 text-sm text-gray-500">
           Try mock IDs: <span className="font-mono bg-gray-100 px-1 rounded text-earthy-600">APP-1234</span>, <span className="font-mono bg-gray-100 px-1 rounded text-earthy-600">APP-5678</span>, <span className="font-mono bg-gray-100 px-1 rounded text-earthy-600">APP-9101</span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {result && (
        <div className="glass-card p-8 border-t-8 shadow-sm overflow-hidden relative
          {result.status === 'approved' ? 'border-t-green-500' : ''}
          {result.status === 'rejected' ? 'border-t-red-500' : ''}
          {result.status === 'pending' ? 'border-t-yellow-500' : ''}
        ">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-semibold text-gray-500 mb-1">Status Overview</p>
              <h2 className="text-2xl font-bold capitalize flex items-center gap-2">
                {result.status}
              </h2>
              <p className="text-gray-700 font-medium mt-2 text-lg">{result.scheme}</p>
              <p className="text-sm text-gray-500 mt-1">Applied Date: {result.date}</p>
            </div>
            {getStatusIcon(result.status)}
          </div>

          {result.status === 'rejected' && result.reasons && (
            <div className="mt-8 bg-red-50 rounded-xl p-6 border border-red-100">
              <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
                <AlertOctagon className="w-5 h-5" /> Plain Language Reasons
              </h3>
              <ul className="list-disc ml-5 space-y-2 text-red-700">
                {result.reasons.map((r: string, i: number) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>

              <div className="mt-6 pt-4 border-t border-red-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
                <span className="text-sm text-red-600 font-medium">Want to find other eligible schemes instead?</span>
                <button onClick={() => window.location.href='/form'} className="btn-secondary text-sm border-red-200 text-red-700 hover:bg-red-100 hover:text-red-800">Check Eligibility</button>
              </div>
            </div>
          )}

          {result.status === 'approved' && (
            <div className="mt-6 text-green-700 font-medium bg-green-50 p-4 rounded-xl border border-green-100">
              Your subsidy has been approved and is being processed by the local agriculture block officer.
            </div>
          )}

          {result.status === 'pending' && (
            <div className="mt-6 text-yellow-700 font-medium bg-yellow-50 p-4 rounded-xl border border-yellow-100">
              Your application is currently under manual verification by the regional office. Expected time: 3-5 working days.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
