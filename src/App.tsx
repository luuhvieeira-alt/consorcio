/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Calculator as CalcIcon, 
  TrendingDown, 
  BarChart3, 
  Settings as SettingsIcon,
  LayoutDashboard,
  Percent,
  Wallet,
  ArrowRightLeft
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { calculateConsorcio, calculateFinancing, type ConsorcioParams, type FinancingParams } from './lib/calculator';
import PlannerView from './components/PlannerView';
import ComparisonView from './components/ComparisonView';
import { cn } from './lib/utils';

type View = 'planner' | 'comparison';

const DEFAULT_CONSORCIO: ConsorcioParams = {
  credit: 112500,
  terms: 80,
  admFee: 18,
  reserveFund: 2,
  insurance: 0.038,
  ownResources: 30000,
  embeddedBidPercent: 30, // 30% representing approx 33750
  redutor: 45,
};

const DEFAULT_FINANCING: FinancingParams = {
  credit: 112500,
  terms: 80,
  monthlyInterestRate: 1.5,
};

export default function App() {
  const [activeView, setActiveView] = useState<View>('planner');
  const [consorcioParams, setConsorcioParams] = useState<ConsorcioParams>(DEFAULT_CONSORCIO);
  const [financingParams, setFinancingParams] = useState<FinancingParams>(DEFAULT_FINANCING);

  // Sync credit between both
  useEffect(() => {
    setFinancingParams(prev => ({ ...prev, credit: consorcioParams.credit }));
  }, [consorcioParams.credit]);

  const consorcioResult = calculateConsorcio(consorcioParams);
  const financingResult = calculateFinancing(financingParams);

  return (
    <div className="flex min-h-screen bg-dark-surface font-sans selection:bg-brand-primary/30">
      {/* Sidebar */}
      <aside className="w-64 border-r border-dark-border flex flex-col sticky top-0 h-screen">
        <div className="p-8 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-brand-primary flex items-center justify-center shadow-lg shadow-brand-primary/20">
              <CalcIcon className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif italic text-xl text-white tracking-wide leading-tight">ELITE</h1>
              <p className="text-[10px] uppercase tracking-[0.2em] text-brand-primary/80 font-bold">Consórcio Planner</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveView('planner')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-xs uppercase tracking-widest font-bold",
              activeView === 'planner' 
                ? "bg-white/5 text-white border-l-2 border-brand-primary pl-3" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <LayoutDashboard className={cn("w-4 h-4 transition-colors", activeView === 'planner' ? "text-brand-primary" : "group-hover:text-neutral-400")} />
            Planejamento
          </button>

          <button
            onClick={() => setActiveView('comparison')}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-xs uppercase tracking-widest font-bold",
              activeView === 'comparison' 
                ? "bg-white/5 text-white border-l-2 border-brand-primary pl-3" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
          >
            <ArrowRightLeft className={cn("w-4 h-4 transition-colors", activeView === 'comparison' ? "text-brand-primary" : "group-hover:text-neutral-400")} />
            Comparativo
          </button>
        </nav>

        <div className="p-4 border-t border-dark-border">
          <div className="bg-dark-elevated/50 p-4 rounded-xl border border-dark-border">
            <p className="text-xs text-neutral-500 mb-2">Comercial Porto Bank</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-800" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-medium text-neutral-200 truncate">Vendedor Master</p>
                <p className="text-[10px] text-neutral-500 truncate">Porto Consórcios</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="p-8 max-w-7xl mx-auto"
          >
            {activeView === 'planner' ? (
              <PlannerView 
                params={consorcioParams} 
                setParams={setConsorcioParams} 
                result={consorcioResult} 
              />
            ) : (
              <ComparisonView 
                consorcioResult={consorcioResult} 
                financingParams={financingParams}
                setFinancingParams={setFinancingParams}
                financingResult={financingResult}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

