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
      <div className="print-only proposal-page text-white">
        <div className="proposal-header text-center">
          <h1 className="text-4xl font-serif italic text-white mb-2">PROPOSTA DE PLANEJAMENTO ESTRATÉGICO</h1>
          <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">Consultoria Exclusiva de Patrimônio</p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-serif italic mb-6 border-b border-brand-primary/50 pb-2">Por que este planejamento é sua melhor escolha?</h2>
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="font-serif italic text-lg text-brand-primary">O Poder da Composição de Lances</p>
              <p className="text-sm leading-relaxed text-white/60">
                Sua estratégia utiliza o **Lance Embutido**, permitindo que você use parte do próprio crédito contratado para potencializar suas chances de contemplação.
              </p>
              <div className="bg-white/5 p-4 rounded border-l-4 border-brand-primary">
                <p className="text-[10px] uppercase text-white/40 font-bold mb-2 tracking-widest">Composição e Representatividade</p>
                <div className="flex justify-between text-sm mb-1">
                  <span>Recurso Próprio (Seu Bolso):</span>
                  <span className="font-serif italic">{formatCurrency(params.ownResources)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Lance Embutido ({params.embeddedBidPercent}%):</span>
                  <span className="font-serif italic">{formatCurrency(result.embeddedBidValue)}</span>
                </div>
                <div className="flex justify-between text-sm mb-1 text-brand-primary font-bold">
                  <span>Representatividade Real do Lance:</span>
                  <span>{result.bidRepresentativeness.toFixed(2)}%</span>
                </div>
                {params.targetRepresentativenessPercent > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-3">
                    <div className="flex justify-between items-center bg-brand-primary/10 p-3 rounded-lg border border-brand-primary/20">
                      <div>
                        <p className="text-[10px] uppercase text-brand-primary font-bold tracking-widest">Meta do Grupo</p>
                        <p className="text-xl font-serif italic">{params.targetRepresentativenessPercent.toFixed(2)}%</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] uppercase text-white/40 tracking-widest">Investimento Adicional</p>
                        <p className="text-xl font-serif italic text-brand-secondary">{formatCurrency(result.missingOwnResourcesValue)}</p>
                      </div>
                    </div>
                    <p className="text-[10px] text-white/60 leading-relaxed italic">
                      * Para atingir a meta de contemplação deste grupo, seu aporte adicional necessário seria de {formatCurrency(result.missingOwnResourcesValue)}.
                    </p>
                  </div>
                )}
                <div className="flex justify-between text-md font-bold border-t border-white/10 pt-2 mt-2">
                  <span className="text-[10px] uppercase tracking-widest">LANCE FINAL PARA SORTEIO:</span>
                  <span className="text-brand-primary text-xl font-serif italic">{formatCurrency(params.ownResources + result.embeddedBidValue)}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <p className="font-serif italic text-lg text-brand-primary">Diferencial do Redutor de Parcela</p>
              <p className="text-sm leading-relaxed text-white/60">
                Configuramos o seu plano com um **Redutor de {params.redutor}%**. Isso significa que, até o momento da sua contemplação, você paga uma parcela significativamente menor, protegendo o seu fluxo de caixa mensal.
              </p>
              <div className="bg-brand-primary/10 p-4 rounded border border-brand-primary/20">
                <p className="text-[10px] uppercase text-brand-primary font-bold mb-2 tracking-widest">Vantagem do Redutor</p>
                <p className="text-xs leading-relaxed italic text-white/80">
                  "O redutor permite que você inicie seu projeto de investimento com o fôlego financeiro necessário, mantendo seu padrão de vida enquanto sua carta de crédito trabalha para você."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12 mb-12">
          <div className="bg-white/5 p-8 border border-white/10 rounded-2xl">
            <h3 className="text-xl font-serif italic mb-6 text-brand-primary">Detalhamento do Plano</h3>
            <div className="space-y-4">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Valor do Crédito</span>
                <span className="font-serif italic text-lg">{formatCurrency(params.credit)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Prazo Total</span>
                <span className="font-serif italic text-lg">{params.terms} meses</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Parcela com Redutor</span>
                <span className="font-serif italic text-lg text-brand-primary font-bold">{formatCurrency(result.totalInstallment)}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[10px] uppercase text-white/40 tracking-widest">Taxa Adm + Res.</span>
                <span className="font-serif italic text-lg">{(params.admFee + params.reserveFund).toFixed(2)}%</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-6">
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Expectativa de Contemplação</p>
              <p className="text-lg text-white/80 font-serif italic leading-tight">
                Utilizando o lance embutido de <strong>{params.embeddedBidPercent}%</strong>, você maximiza suas chances mensais sem precisar desembolsar todo o valor do seu bolso.
              </p>
            </div>
            <div className="border-l-4 border-brand-primary pl-6 py-2">
              <p className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Resultado Pós-Contemplação</p>
              <p className="text-lg text-white/80 font-serif italic leading-tight">
                Sua parcela será recalculada para aproximadamente <strong>{formatCurrency(result.newInstallmentAfterBid)}</strong>, mantendo sua saúde financeira intacta.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-12">
          <div className="bg-brand-primary/10 border-2 border-brand-primary/30 p-8 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Zap className="w-32 h-32 text-brand-primary" />
            </div>
            <h3 className="text-2xl font-serif italic mb-4 text-brand-primary flex items-center gap-3">
              <ShieldCheck className="w-6 h-6" />
              Estratégia Vencedora para Contemplação
            </h3>
            <div className="grid grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-sm leading-relaxed text-white/80">
                  Para garantir sua posição no grupo e maximizar a probabilidade de contemplação imediata, identificamos que a **Meta de Representatividade** ideal é de **{params.targetRepresentativenessPercent.toFixed(2)}%**.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex-1 h-3 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-brand-primary shadow-[0_0_15px_rgba(217,119,6,0.5)]" 
                      style={{ width: `${Math.min(100, (result.bidRepresentativeness / params.targetRepresentativenessPercent) * 100)}%` }}
                    />
                  </div>
                  <span className="text-xs font-mono">{result.bidRepresentativeness.toFixed(1)}% / {params.targetRepresentativenessPercent.toFixed(1)}%</span>
                </div>
              </div>
              <div className="bg-black/60 p-6 rounded-2xl border border-brand-primary/20 backdrop-blur-sm">
                <p className="text-[10px] uppercase text-brand-primary font-bold tracking-widest mb-2">Aporte Final Necessário</p>
                <p className="text-4xl font-serif italic text-white mb-1">
                  {result.missingOwnResourcesValue > 0 ? formatCurrency(result.missingOwnResourcesValue) : "META ATINGIDA"}
                </p>
                <p className="text-[10px] text-white/40 italic">
                  {result.missingOwnResourcesValue > 0 
                    ? "* Valor adicional sugerido para alcançar a representatividade ideal do grupo." 
                    : "* Seu planejamento atual já atende aos critérios de alta performance do grupo."}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 mb-12">
          <div className="bg-white/5 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-2xl font-serif italic mb-6 text-brand-primary border-b border-brand-primary/20 pb-4">
              Estimativa Pós-Contemplação
            </h3>
            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-[10px] uppercase text-white/40 tracking-widest">Mês da Contemplação</span>
                  <span className="text-xl font-serif italic">{params.contemplationMonth}ª parcela</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/10 pb-3">
                  <span className="text-[10px] uppercase text-white/40 tracking-widest">Crédito Disponível</span>
                  <span className="text-xl font-serif italic text-brand-secondary font-bold">{formatCurrency(result.effectiveCredit)}</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-brand-primary/5 p-6 rounded-2xl border border-brand-primary/20">
                  <p className="text-[10px] uppercase text-brand-primary font-bold tracking-widest mb-4">OPÇÃO 1: Reduzir Valor da Mensalidade</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase mb-1">Nova Parcela</p>
                      <p className="text-2xl font-serif italic text-white">{formatCurrency(result.installmentReductions.reduceValue.newInstallment)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 uppercase mb-1">Prazo Restante</p>
                      <p className="text-lg font-serif italic text-white/60">{result.installmentReductions.reduceValue.remainingTerms} meses</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                  <p className="text-[10px] uppercase text-white/60 font-bold tracking-widest mb-4">OPÇÃO 2: Reduzir Prazo (Manter Parcela)</p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase mb-1">Parcela Integral</p>
                      <p className="text-2xl font-serif italic text-white">{formatCurrency(result.installmentReductions.reduceTerm.newInstallment)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-white/40 uppercase mb-1">Novo Prazo Total</p>
                      <p className="text-lg font-serif italic text-brand-primary font-bold">{result.installmentReductions.reduceTerm.remainingTerms} meses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-white/30 italic mt-8 text-center uppercase tracking-widest">
              * Valores baseados na configuração atual do plano e sujeitos a alterações de taxa e seguro.
            </p>
          </div>
        </div>

        <div className="text-center mt-12 p-12 bg-white/5 border border-white/10 rounded-3xl">
          <p className="text-2xl font-serif italic mb-4 text-brand-primary">"A melhor forma de prever o futuro é criá-lo."</p>
          <p className="text-[10px] uppercase tracking-[0.4em] opacity-40">Vamos garantir seu patrimônio hoje?</p>
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
              <InputField 
                label="Meta de Representatividade (%)" 
                value={params.targetRepresentativenessPercent} 
                onChange={(v) => handleChange('targetRepresentativenessPercent', v)} 
                type="percent"
                step={0.01}
              />
              <InputField 
                label="Contemplação (Mês)" 
                value={params.contemplationMonth} 
                onChange={(v) => handleChange('contemplationMonth', v)} 
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
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-4">Análise Financeira</h4>
              <div className="space-y-4">
                <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Total da Dívida (Crédito + Taxas)</p>
                  <p className="text-xl font-serif italic text-white">{formatCurrency(result.totalDebt)}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 bg-black/40 rounded-xl border border-white/5">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Custo Administrativo</p>
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
                  <span className="text-white/20 uppercase tracking-widest">Representatividade do Lance</span>
                  <span className="text-brand-primary font-serif italic font-bold">
                    {result.bidRepresentativeness.toFixed(2)}%
                  </span>
                </div>
                {result.missingOwnResourcesValue > 0 && (
                  <div className="bg-brand-primary/10 p-3 rounded-xl border border-brand-primary/20 mt-3">
                    <p className="text-[10px] text-brand-primary font-bold uppercase tracking-widest mb-1">Diferença para Meta ({params.targetRepresentativenessPercent}%):</p>
                    <p className="text-lg font-serif italic text-white">{formatCurrency(result.missingOwnResourcesValue)}</p>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm pt-2 border-t border-white/5 mt-2">
                  <span className="text-white/60 font-medium font-serif italic">Crédito Líquido</span>
                  <span className="text-brand-secondary font-serif italic text-lg">{formatCurrency(result.effectiveCredit)}</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5">
              <div className="bg-black/40 p-4 rounded-xl border border-white/5 mb-6">
                <h5 className="text-[10px] font-bold text-brand-primary uppercase tracking-widest mb-3">Pós-Contemplação (Est.)</h5>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Nova Parcela:</span>
                    <span className="text-white font-serif italic">{formatCurrency(result.installmentReductions.reduceValue.newInstallment)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-white/40">Ou Reduzir para:</span>
                    <span className="text-brand-secondary font-serif italic">{result.installmentReductions.reduceTerm.remainingTerms} meses</span>
                  </div>
                </div>
              </div>
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
