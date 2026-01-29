import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PropertyDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const property = location.state?.property;
  const [openCalculator, setOpenCalculator] = useState(null); // 'emi', 'loan', 'interest', 'sqft', or null

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Property details section (optional, show only if property exists) */}
      {property ? (
        <div className="max-w-6xl mx-auto p-4 bg-white rounded-2xl shadow-lg mt-4 mb-4">
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          <img src={property.img || property.image} alt={property.title} className="w-full h-64 md:h-96 object-cover rounded-xl border mb-4" />
          <div className="text-lg text-gray-700 mb-2"><span className="font-semibold">Location:</span> {property.location}</div>
          <div className="text-base md:text-lg text-gray-700 mb-2"><span className="font-semibold">Price:</span> <span className="text-blue-800 font-bold text-xl md:text-2xl">₹ {property.price} Lakh</span></div>
          <div className="text-gray-600 text-sm md:text-base mb-4">{property.serving}</div>
          {/* Add more property details as needed */}
        </div>
      ) : (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">No property data found.</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate(-1)}>Go Back</button>
        </div>
      )}
      {/* Calculators Section always visible */}
      <div className="max-w-6xl mx-auto p-4 bg-white rounded-2xl shadow-lg mb-10 mt-4">
        <h2 className="text-2xl font-bold text-blue-900 mb-4">Live Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setOpenCalculator('emi')}>
            <img src="/images/calculator1.png" alt="EMI Calculator" className="w-20 h-20 object-contain mb-2" />
            <div className="font-semibold">EMI Calculator</div>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setOpenCalculator('loan')}>
            <img src="/images/calculator2.png" alt="Loan Calculator" className="w-20 h-20 object-contain mb-2" />
            <div className="font-semibold">Loan Calculator</div>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setOpenCalculator('interest')}>
            <img src="/images/calculator3.png" alt="Interest Calculator" className="w-20 h-20 object-contain mb-2" />
            <div className="font-semibold">Interest Calculator</div>
          </div>
          <div className="flex flex-col items-center cursor-pointer" onClick={() => setOpenCalculator('sqft')}>
            <img src="/images/calculator4.png" alt="Sqft Calculator" className="w-20 h-20 object-contain mb-2" />
            <div className="font-semibold">Sqft Calculator</div>
          </div>
        </div>
        {/* Calculator Modals */}
        {openCalculator === 'emi' && (
          <CalculatorModal title="EMI Calculator" onClose={() => setOpenCalculator(null)}>
            <EMICalculator />
          </CalculatorModal>
        )}
        {openCalculator === 'loan' && (
          <CalculatorModal title="Loan Calculator" onClose={() => setOpenCalculator(null)}>
            <LoanCalculator />
          </CalculatorModal>
        )}
        {openCalculator === 'interest' && (
          <CalculatorModal title="Interest Calculator" onClose={() => setOpenCalculator(null)}>
            <InterestCalculator />
          </CalculatorModal>
        )}
        {openCalculator === 'sqft' && (
          <CalculatorModal title="Sqft Calculator" onClose={() => setOpenCalculator(null)}>
            <SqftCalculator />
          </CalculatorModal>
        )}
      </div>
    </>
  );
};

function CalculatorModal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative">
        <button className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl" onClick={onClose}>&times;</button>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
}

function EMICalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [emi, setEmi] = useState(null);
  useEffect(() => {
    if (principal && rate && years) {
      const r = rate / 1200;
      const n = years * 12;
      const emiVal = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setEmi(emiVal ? emiVal.toFixed(2) : null);
    }
  }, [principal, rate, years]);
  return (
    <div className="flex flex-col gap-3">
      <label>Principal Amount (₹)
        <input type="number" className="border rounded px-2 py-1 w-full" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
      </label>
      <label>Interest Rate (% per annum)
        <input type="number" className="border rounded px-2 py-1 w-full" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </label>
      <label>Loan Tenure (years)
        <input type="number" className="border rounded px-2 py-1 w-full" value={years} onChange={e => setYears(Number(e.target.value))} />
      </label>
      <div className="mt-2 font-semibold">EMI: {emi ? `₹ ${emi}` : '--'}</div>
    </div>
  );
}

function LoanCalculator() {
  const [emi, setEmi] = useState(10000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [principal, setPrincipal] = useState(null);
  useEffect(() => {
    if (emi && rate && years) {
      const r = rate / 1200;
      const n = years * 12;
      const principalVal = emi * (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      setPrincipal(principalVal ? principalVal.toFixed(2) : null);
    }
  }, [emi, rate, years]);
  return (
    <div className="flex flex-col gap-3">
      <label>EMI (₹)
        <input type="number" className="border rounded px-2 py-1 w-full" value={emi} onChange={e => setEmi(Number(e.target.value))} />
      </label>
      <label>Interest Rate (% per annum)
        <input type="number" className="border rounded px-2 py-1 w-full" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </label>
      <label>Loan Tenure (years)
        <input type="number" className="border rounded px-2 py-1 w-full" value={years} onChange={e => setYears(Number(e.target.value))} />
      </label>
      <div className="mt-2 font-semibold">Loan Amount: {principal ? `₹ ${principal}` : '--'}</div>
    </div>
  );
}

function InterestCalculator() {
  const [principal, setPrincipal] = useState(1000000);
  const [rate, setRate] = useState(8);
  const [years, setYears] = useState(20);
  const [interest, setInterest] = useState(null);
  useEffect(() => {
    if (principal && rate && years) {
      const interestVal = (principal * rate * years) / 100;
      setInterest(interestVal ? interestVal.toFixed(2) : null);
    }
  }, [principal, rate, years]);
  return (
    <div className="flex flex-col gap-3">
      <label>Principal Amount (₹)
        <input type="number" className="border rounded px-2 py-1 w-full" value={principal} onChange={e => setPrincipal(Number(e.target.value))} />
      </label>
      <label>Interest Rate (% per annum)
        <input type="number" className="border rounded px-2 py-1 w-full" value={rate} onChange={e => setRate(Number(e.target.value))} />
      </label>
      <label>Loan Tenure (years)
        <input type="number" className="border rounded px-2 py-1 w-full" value={years} onChange={e => setYears(Number(e.target.value))} />
      </label>
      <div className="mt-2 font-semibold">Total Interest: {interest ? `₹ ${interest}` : '--'}</div>
    </div>
  );
}

function SqftCalculator() {
  const [length, setLength] = useState(10);
  const [width, setWidth] = useState(10);
  const [sqft, setSqft] = useState(null);
  useEffect(() => {
    if (length && width) {
      setSqft((length * width).toFixed(2));
    }
  }, [length, width]);
  return (
    <div className="flex flex-col gap-3">
      <label>Length (ft)
        <input type="number" className="border rounded px-2 py-1 w-full" value={length} onChange={e => setLength(Number(e.target.value))} />
      </label>
      <label>Width (ft)
        <input type="number" className="border rounded px-2 py-1 w-full" value={width} onChange={e => setWidth(Number(e.target.value))} />
      </label>
      <div className="mt-2 font-semibold">Sqft: {sqft ? sqft : '--'}</div>
    </div>
  );



}
export default PropertyDetails;
