import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, FileText, ArrowRight } from 'lucide-react';
import type { RuleResult } from '../lib/api';

export default function EligibilityResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { results, profile } = location.state || {};

  if (!results) {
    return (
      <div className="flex flex-col items-center justify-center p-20 text-center">
        <h2 className="text-2xl font-bold mb-4">No results found</h2>
        <button onClick={() => navigate('/form')} className="btn-primary">Back to Form</button>
      </div>
    );
  }

  const { eligible, rejected } = results;

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-10 text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-gray-900">Your Subsidy Recommendations</h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Based on your profile ({profile.landSize} Ha in {profile.district}, {profile.state}), our rules engine has identified the following matches.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Eligible Schemes Container */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-earthy-100 pb-4">
            <CheckCircle className="text-earthy-500 w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Eligible ({eligible.length})</h2>
          </div>
          
          {eligible.length === 0 ? (
            <p className="text-gray-500 p-6 glass-card bg-gray-50">No eligible schemes found based on current criteria.</p>
          ) : (
            eligible.map((scheme: RuleResult) => (
              <div key={scheme.id} className="glass-card p-6 border-l-4 border-l-earthy-500 hover:shadow-md transition-shadow relative overflow-hidden">
                <div className="absolute top-0 right-0 bg-earthy-100 text-earthy-800 text-xs font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{scheme.schemeName}</h3>
                
                <div className="bg-earthy-50 text-earthy-900 p-3 rounded-xl mb-4 text-sm font-medium">
                  💳 Potential Benefit: {scheme.benefitStr}
                </div>
                
                <div className="space-y-2 mb-4">
                  <p className="text-sm font-semibold text-gray-700">Why you are eligible:</p>
                  <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                    {scheme.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-semibold text-gray-700">Required Documents:</p>
                  <div className="flex flex-wrap gap-2">
                    {scheme.documents?.map((doc, i) => (
                      <span key={i} className="inline-flex items-center gap-1 bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"><FileText className="w-3 h-3"/> {doc}</span>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/autofill', { state: { scheme, profile } })}
                  className="btn-primary w-full shadow-sm text-sm py-2 px-4 flex items-center justify-center gap-2"
                >
                  Auto-Fill Application <ArrowRight className="w-4 h-4"/>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Rejected Schemes Container */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-earthy-100 pb-4">
            <XCircle className="text-red-500 w-8 h-8" />
            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Not Eligible ({rejected.length})</h2>
          </div>

          {rejected.length === 0 ? (
            <p className="text-gray-500 p-6 glass-card bg-gray-50">You are eligible for everything!</p>
          ) : (
            rejected.map((scheme: RuleResult) => (
              <div key={scheme.id} className="glass-card p-6 border-l-4 border-l-red-400 opacity-90">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{scheme.schemeName}</h3>
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-red-600 flex items-center gap-1">Plain Language Reasons:</p>
                  <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                    {scheme.reasons.map((r, i) => <li key={i}>{r}</li>)}
                  </ul>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
