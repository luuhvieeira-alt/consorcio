import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { type ConsorcioResult, type FinancingParams, type FinancingResult } from '../lib/calculator';
import { formatCurrency } from '../lib/utils';
import { 
  TrendingDown, 
  ArrowDownCircle, 
  AlertCircle,
  PiggyBank
} from 'lucide-react';

interface ComparisonViewProps {
  consorcioResult: ConsorcioResult;
  financingParams: FinancingParams;
  setFinancingParams: React.Dispatch<React.SetStateAction<FinancingParams>>;
  financingResult: FinancingResult;
}

export default function ComparisonView({ 
  consorcioResult, 
  financingParams, 
  setFinancingParams, 
  financingResult 
}: ComparisonViewProps) {
  
  const economy = financingResult.totalPaid - consorcioResult.totalPaid;
  const economyPercentage = (economy / financingResult.totalPaid) * 100;

  const data = [
    {
      name: 'Consórcio',
      total: consorcioResult.totalPaid,
      color: '#d97706'
    },
    {
      name: 'Financiamento',
      total: financingResult.totalPaid,
      color: '#ef4444'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif italic text-white tracking-tight">Consórcio vs. Financiamento</h2>
          <p className="text-white/40 mt-1 italic">Análise técnica de patrimônio e alocação de recursos.</p>
        </div>
        <div className="bg-gradient-to-r from-brand-primary/20 to-transparent border border-brand-primary/30 px-8 py-4 rounded-2xl text-right shadow-lg shadow-brand-primary/5">
          <p className="text-[10px] text-white/60 font-bold uppercase tracking-[0.3em] mb-1">Economia Gerada para o Cliente</p>
          <p className="text-3xl font-serif italic text-white">{formatCurrency(economy)} <span className="text-lg text-brand-primary ml-2 uppercase tracking-widest font-sans not-italic font-bold">Poupados</span></p>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financing Params */}
        <div className="space-y-6">
          <section className="bg-dark-elevated rounded-2xl border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-lg font-serif text-white italic flex items-center gap-2">
                Parâmetros Banco
              </h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">Juros Mensais (%)</label>
                <div className="relative">
                  <input 
                    type="number"
                    step="0.01"
                    value={financingParams.monthlyInterestRate}
                    onChange={(e) => setFinancingParams(prev => ({ ...prev, monthlyInterestRate: Number(e.target.value) }))}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-red-500/50 transition-all font-sans text-sm"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-sans text-xs pointer-events-none">
                    % ao mês
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest leading-none">Parcela Banco</span>
                  <span className="text-lg font-serif italic text-white">{formatCurrency(financingResult.monthlyInstallment)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/20 uppercase tracking-wider">Custo Total Efetivo</span>
                  <span className="text-red-500/80 font-serif italic">{formatCurrency(financingResult.totalPaid)}</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-neutral-900/50 rounded-lg border border-dark-border">
                <TrendingDown className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-neutral-400 leading-relaxed">
                  O consórcio economiza <span className="text-emerald-400 font-bold">{Math.round(economyPercentage)}%</span> do valor total do financiamento.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Charts and Visual Comparison */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#111111] rounded-2xl border border-white/5 p-8">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em] mb-8">Investimento Total (Custo de Aquisição)</h4>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data} layout="vertical" margin={{ left: 20, right: 80 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" horizontal={true} vertical={false} />
                  <XAxis type="number" hide />
                  <YAxis 
                    dataKey="name" 
                    type="category" 
                    stroke="#737373" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                  />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-neutral-900 border border-dark-border p-3 rounded-lg shadow-2xl">
                            <p className="text-[10px] text-neutral-500 uppercase mb-1">{payload[0].payload.name}</p>
                            <p className="text-sm font-mono font-bold text-neutral-100">{formatCurrency(payload[0].value as number)}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="total" radius={[0, 4, 4, 0]} barSize={40}>
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-8 pt-8 border-t border-white/5">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-brand-primary shadow-lg shadow-brand-primary/20" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Plano Elite Consórcio</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-serif italic text-white">{formatCurrency(consorcioResult.totalPaid)}</p>
                  <p className="text-[10px] text-brand-primary/60 tracking-wider uppercase italic">Taxa Adm. única diluída</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-600/80 shadow-lg shadow-red-900/20" />
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Financiamento Convencional</span>
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-serif italic text-white">{formatCurrency(financingResult.totalPaid)}</p>
                  <p className="text-[10px] text-red-500/40 tracking-wider uppercase italic">Juros compostos sobre juros</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary/5 rounded-2xl border border-brand-primary/30 p-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0">
              <PiggyBank className="text-brand-primary w-8 h-8" />
            </div>
            <div>
              <h5 className="text-brand-primary font-serif italic text-xl tracking-tight">Onde está a economia?</h5>
              <p className="text-sm text-white/40 mt-2 leading-relaxed">
                No financiamento, você paga ao banco pelo aluguel do dinheiro (juros). No consórcio, você apenas paga uma taxa flexível para a prestação do serviço de administração. Para o valor solicitado, vocẽ estaria deixando de pagar <span className="text-brand-primary font-bold italic">{formatCurrency(economy)}</span> extras em juros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
