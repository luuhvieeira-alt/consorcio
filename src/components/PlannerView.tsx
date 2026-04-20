import React from 'react';
import { type ConsorcioParams, type ConsorcioResult } from '../lib/calculator';
import { formatCurrency, formatPercent } from '../lib/utils';
import { 
  DollarSign, 
  Calendar, 
  Percent, 
  ShieldCheck, 
  Wallet, 
  Zap,
  Info,
  BarChart3
} from 'lucide-react';

interface PlannerViewProps {
  params: ConsorcioParams;
  setParams: React.Dispatch<React.SetStateAction<ConsorcioParams>>;
  result: ConsorcioResult;
}

export default function PlannerView({ params, setParams, result }: PlannerViewProps) {
  const handleChange = (field: keyof ConsorcioParams, value: number) => {
    setParams(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Proposal Header for Normal Display */}
      <header className="no-print">
        <h2 className="text-3xl font-serif italic text-white tracking-tight">Simulador de Consórcio</h2>
        <p className="text-white/40 mt-1">Configure o plano ideal para o seu cliente.</p>
      </header>

      {/* Professional Proposal for Printing */}
      <div className="print-only proposal-page">
        <div className="proposal-header text-center">
          <h1 className="text-4xl font-serif italic text-black mb-2">PROPOSTA DE PLANEJAMENTO ESTRATÉGICO</h1>
          <p className="text-gray-500 uppercase tracking-[0.3em] text-xs">Preparado exclusivamente para você</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif italic mb-6 border-b border-brand-primary pb-2">Por que este planejamento é sua melhor escolha?</h2>
        <div className="grid grid-cols-2 gap-8 text-black mb-12">
            <div className="space-y-4">
              <p className="font-serif italic text-lg text-brand-primary">O Poder da Composição de Lances</p>
              <p className="text-sm leading-relaxed text-gray-700">
                Sua estratégia utiliza o **Lance Embutido**, permitindo que você use parte do próprio crédito contratado para potencializar suas chances de contemplação.
              </p>
              <div className="bg-gray-100 p-4 rounded border-l-4 border-brand-primary">
                <p className="text-xs uppercase text-gray-500 font-bold mb-2">Composição do Lance Total</p>
                <div className="flex justify-between text-sm mb-1">
                  <span>Recurso Próprio (Seu Bolso):</span>
                  <span className="font-bold">{formatCurrency(params.ownResources)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lance Embutido ({params.embeddedBidPercent}%):</span>
                  <span className="font-bold">{formatCurrency(result.embeddedBidValue)}</span>
                </div>
                <div className="flex justify-between text-md font-bold border-t border-gray-300 pt-2 mt-2">
                  <span>LANCE FINAL PARA SORTEIO:</span>
                  <span className="text-brand-primary">{formatCurrency(params.ownResources + result.embeddedBidValue)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-serif italic text-lg text-brand-primary">Liberdade de Escolha</p>
              <p className="text-sm leading-relaxed text-gray-700">
                Este planejamento foi desenhado para que você tenha o **poder de compra à vista** no momento da contemplação, garantindo melhores negociações e descontos reais no imóvel ou veículo, enquanto seus concorrentes estão presos às taxas variáveis dos bancos.
              </p>
              <p className="text-xs text-gray-400 italic">
                * Proposta sujeita a análise de crédito e disponibilidade de grupo.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="bg-gray-50 p-8 border border-gray-200">
            <h3 className="text-xl font-serif italic mb-6">Detalhamento do Plano</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs uppercase text-gray-500">Valor do Crédito</span>
                <span className="font-serif italic text-lg">{formatCurrency(params.credit)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs uppercase text-gray-500">Prazo Total</span>
                <span className="font-serif italic text-lg">{params.terms} meses</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs uppercase text-gray-500">Parcela Inicial</span>
                <span className="font-serif italic text-lg text-brand-primary font-bold">{formatCurrency(result.totalInstallment)}</span>
              </div>
              <div className="flex justify-between border-b pb-2">
                <span className="text-xs uppercase text-gray-500">Taxa Adm + Res.</span>
                <span className="font-serif italic text-lg">{(params.admFee + params.reserveFund).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-[10px] uppercase text-gray-500 tracking-widest">Expectativa de Contemplação</p>
              <p className="text-lg text-gray-800 leading-tight">
                Utilizando o lance embutido de <strong>{params.embeddedBidPercent}%</strong>, você maximiza suas chances mensais sem precisar desembolsar todo o valor do seu bolso.
              </p>
            </div>
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-[10px] uppercase text-gray-500 tracking-widest">Resultado Pós-Contemplação</p>
              <p className="text-lg text-gray-800 leading-tight">
                Sua parcela será recalculada para aproximadamente <strong>{formatCurrency(result.newInstallmentAfterBid)}</strong>, mantendo sua saúde financeira intacta.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 p-12 bg-black text-white">
          <p className="text-2xl font-serif italic mb-4">"A melhor forma de prever o futuro é criá-lo."</p>
          <p className="text-xs uppercase tracking-widest opacity-60">Vamos garantir seu patrimônio hoje?</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 no-print">
        {/* Configuration Column */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-dark-elevated rounded-2xl border border-dark-border overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-lg font-serif text-white italic flex items-center gap-2">
                Configurações do Crédito
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Crédito Contratado" 
                value={params.credit} 
                onChange={(v) => handleChange('credit', v)} 
                type="currency"
              />
              <InputField 
                label="Prazo (Meses)" 
                value={params.terms} 
                onChange={(v) => handleChange('terms', v)} 
              />
              <InputField 
                label="Taxa Adm. (%)" 
                value={params.admFee} 
                onChange={(v) => handleChange('admFee', v)} 
              />
              <InputField 
                label="Fundo Reserva (%)" 
                value={params.reserveFund}
                onChange={(v) => handleChange('reserveFund', v)} 
              />
              <InputField 
                label="Redutor de Parcela (%)" 
                value={params.redutor} 
                onChange={(v) => handleChange('redutor', v)} 
                type="percent"
              />
              <InputField 
                label="Seguro de Vida (Mensal %)" 
                value={params.insurance} 
                onChange={(v) => handleChange('insurance', v)} 
                step={0.001}
              />
            </div>
          </section>

          <section className="bg-dark-elevated rounded-2xl border border-dark-border overflow-hidden">
            <div className="p-6 border-b border-white/5 bg-white/5">
              <h3 className="text-lg font-serif text-white italic flex items-center gap-2">
                Estratégia de Lance
              </h3>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField 
                label="Recurso Próprio" 
                value={params.ownResources} 
                onChange={(v) => handleChange('ownResources', v)} 
                type="currency"
              />
              <InputField 
                label="Lance Embutido (%)" 
                value={params.embeddedBidPercent} 
                onChange={(v) => handleChange('embeddedBidPercent', v)} 
                type="percent"
              />
            </div>
            <div className="px-6 pb-6 pt-2">
              <div className="p-3 bg-brand-primary/5 border border-brand-primary/20 rounded-xl flex items-center justify-between">
                <span className="text-[10px] text-brand-primary font-bold uppercase tracking-widest">Valor do Lance Embutido:</span>
                <span className="text-sm font-serif italic text-white">{formatCurrency(result.embeddedBidValue)}</span>
              </div>
            </div>
          </section>
        </div>

        {/* Results Column */}
        <div className="space-y-6">
          <div className="bg-brand-primary/5 rounded-2xl border-2 border-brand-primary/30 p-6 space-y-4 relative">
            <div className="absolute -top-3 left-6 px-3 bg-brand-primary text-black text-[10px] font-bold uppercase tracking-widest rounded-full py-1 shadow-lg shadow-brand-primary/20">
              A Escolha Inteligente
            </div>
            <p className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.2em] pt-2">Parcela Inicial Estimada</p>
            <div>
              <span className="text-4xl font-serif italic text-white">{formatCurrency(result.totalInstallment)}</span>
              <p className="text-xs text-white/40 mt-2">Sem juros bancários, apenas taxa administrativa diluída.</p>
            </div>
            <div className="pt-4 border-t border-white/5 space-y-2">
              <ResultRow label="Taxa Adm. Total" value={formatCurrency(result.totalAdminFee)} />
              <ResultRow label="Fundo de Reserva" value={formatCurrency(result.totalReserveFund)} />
              <ResultRow label="Seguro Mensal" value={formatCurrency(result.insuranceValue)} />
            </div>
          </div>

          <div className="bg-dark-elevated rounded-2xl border border-white/5 p-6 space-y-6">
            <div>
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Análise Financeira</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total a Pagar</p>
                  <p className="text-xl font-serif italic text-white">{formatCurrency(result.totalPaid)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Custo Total (%)</p>
                    <p className="text-sm font-serif italic text-white">{(params.admFee + params.reserveFund).toFixed(2)}%</p>
                  </div>
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Seguro/Mês</p>
                    <p className="text-sm font-serif italic text-white">{formatCurrency(result.insuranceValue)}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">Estratégia de Contemplação</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 uppercase tracking-widest text-[10px]">Lance Total</span>
                  <span className="text-white font-serif italic">{formatCurrency(params.ownResources + result.embeddedBidValue)}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-white/20 uppercase tracking-widest">Percentual do Lance</span>
                  <span className="text-brand-primary/60 font-serif italic">
                    {((params.ownResources + result.embeddedBidValue) / params.credit * 100).toFixed(2)}%
                  </span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5 mt-2">
                  <span className="text-white/60 font-medium font-serif italic">Crédito Líquido</span>
                  <span className="text-brand-secondary font-serif italic text-lg">{formatCurrency(result.effectiveCredit)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <button 
                onClick={() => window.print()}
                className="w-full bg-brand-primary text-black text-xs font-bold py-4 rounded-xl hover:bg-brand-secondary transition-all uppercase tracking-widest shadow-lg shadow-brand-primary/20 flex items-center justify-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                Gerar Proposta PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'number', step = 1 }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] uppercase tracking-widest text-white/40 mb-2 block">{label}</label>
      <div className="relative">
        <input 
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all font-sans text-sm"
        />
        {type === 'currency' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-sans text-xs pointer-events-none">
            R$
          </div>
        )}
        {type === 'percent' && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 font-sans text-xs pointer-events-none">
            %
          </div>
        )}
      </div>
    </div>
  );
}

function ResultRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-[11px] items-center border-b border-white/5 pb-2">
      <span className="text-white/40 uppercase tracking-widest">{label}</span>
      <span className="text-white font-serif italic text-sm">{value}</span>
    </div>
  );
}
