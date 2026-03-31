import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { checkEligibility } from '../lib/api';
import type { FarmerProfile } from '../lib/api';
import { Loader2 } from 'lucide-react';

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  district: z.string().min(2, "District is required"),
  state: z.string().min(2, "State is required"),
  cropType: z.string().min(2, "Crop type is required"),
  landSize: z.coerce.number().positive("Land size must be a positive number"),
  previousSubsidyClaimed: z.boolean(),
});

type FormValues = z.infer<typeof formSchema>;

export default function FarmerFormPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      district: '',
      state: '',
      cropType: '',
      landSize: 0,
      previousSubsidyClaimed: false,
    }
  });

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);
      setErrorMsg('');
      const results = await checkEligibility(data as FarmerProfile);
      navigate('/results', { state: { results, profile: data } });
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="glass-card p-8 shadow-sm">
        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Farmer Profile Evaluation</h2>
        <p className="mt-2 text-gray-500 mb-8">Enter your details and our engine will cross-check your eligibility across all current schemes.</p>

        {errorMsg && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-6">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="label-text">Full Name</label>
              <input {...register("name")} className="input-field" placeholder="Kisan Kumar" />
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            <div>
              <label className="label-text">Land Size (Hectares)</label>
              <input type="number" step="0.01" {...register("landSize")} className="input-field" placeholder="1.5" />
              {errors.landSize && <p className="mt-1 text-sm text-red-500">{errors.landSize.message}</p>}
            </div>

            <div>
              <label className="label-text">State</label>
              <input {...register("state")} className="input-field" placeholder="Maharashtra" />
              {errors.state && <p className="mt-1 text-sm text-red-500">{errors.state.message}</p>}
            </div>

            <div>
              <label className="label-text">District</label>
              <input {...register("district")} className="input-field" placeholder="Pune" />
              {errors.district && <p className="mt-1 text-sm text-red-500">{errors.district.message}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="label-text">Primary Crop Type</label>
              <input {...register("cropType")} className="input-field" placeholder="Wheat, Sugarcane, Cotton..." />
              {errors.cropType && <p className="mt-1 text-sm text-red-500">{errors.cropType.message}</p>}
            </div>

            <div className="md:col-span-2 flex items-center mt-4">
              <input 
                type="checkbox" 
                id="previousSubsidy" 
                {...register("previousSubsidyClaimed")}
                className="h-5 w-5 rounded border-earthy-300 text-earthy-600 focus:ring-earthy-600 transition-colors cursor-pointer" 
              />
              <label htmlFor="previousSubsidy" className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                I have claimed a government agricultural subsidy in the past 2 years.
              </label>
            </div>
          </div>

          <div className="pt-6">
            <button type="submit" disabled={loading} className="btn-primary w-full text-lg h-14">
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" /> Analyzing Engine...
                </>
              ) : "Check Eligibility"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
