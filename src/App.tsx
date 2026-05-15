/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { QRConfig, QRCodeType } from './types';
import GeneratorTypeSelector from '@/components/generator/GeneratorTypeSelector';
import ConfigPanel from '@/components/generator/ConfigPanel';
import LivePreview from '@/components/generator/LivePreview';
import StatsGrid from '@/components/analytics/StatsGrid';
import ChartsContainer from '@/components/analytics/ChartsContainer';
import BulkUpload from '@/components/management/BulkUpload';
import CampaignList from '@/components/management/CampaignList';
import DeveloperSettings from '@/components/management/DeveloperSettings';
import { Button } from '@/components/ui/button';
import { Search, Bell, HelpCircle, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('generator');
  const [qrConfig, setQrConfig] = useState<QRConfig>({
    type: 'url',
    data: { url: 'https://ais.studio' },
    design: {
      dots: 'square',
      corners: 'rounded',
      color: '#cc785c', // Claude primary coral
    }
  });

  const handleTypeChange = (type: QRCodeType) => {
    setQrConfig({ ...qrConfig, type, data: {} });
  };

  return (
    <div className="flex min-h-screen bg-canvas text-ink selection:bg-primary/20">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-hairline bg-canvas flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center gap-3">
            <div className="flex h-6 w-6 items-center justify-center rounded-sm bg-ink text-canvas font-serif text-lg leading-none">
              *
            </div>
            <h1 className="text-xl font-serif text-ink tracking-tight">
              Claude <span className="text-primary font-sans text-[10px] font-bold uppercase tracking-[0.2em] ml-2">PRO Dashboard</span>
            </h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-muted">
              <a href="#" className="hover:text-ink transition-colors">Product</a>
              <a href="#" className="hover:text-ink transition-colors">Developer Portal</a>
              <a href="#" className="hover:text-ink transition-colors">Enterprise</a>
            </div>
            <div className="h-6 w-px bg-hairline mx-2" />
            <div className="flex items-center gap-4">
              <button className="text-[13px] font-medium text-ink hover:text-primary transition-colors">Sign in</button>
              <Button className="bg-primary hover:bg-primary-active text-white rounded-md px-5 h-9 text-[13px] font-medium shadow-sm border-none">
                Try Claude Pro
              </Button>
            </div>
          </div>
        </header>

        {/* Content Area with editorial rhythm */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="p-8 md:p-12 lg:p-16 max-w-7xl mx-auto w-full">
            <header className="mb-16">
              <h2 className="text-5xl md:text-6xl font-serif text-ink mb-6 tracking-tight">
                Meet your thinking partner.
              </h2>
              <p className="text-xl text-body max-w-2xl leading-relaxed">
                A highly capable, reliable, and steerable analytics system designed to scale with your organization. 
                Manage dynamic campaign flows and monitor real-time reach metrics.
              </p>
            </header>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {activeTab === 'generator' && (
                  <div className="space-y-16">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                      <div className="lg:col-span-8 space-y-12">
                        <section className="bg-surface-card rounded-lg p-8 border border-hairline">
                          <h3 className="text-2xl font-serif mb-8">Architecturally robust generation.</h3>
                          <GeneratorTypeSelector 
                            currentType={qrConfig.type} 
                            onTypeChange={handleTypeChange} 
                          />
                        </section>
                        
                        <section className="p-2">
                          <ConfigPanel 
                            config={qrConfig} 
                            setConfig={setQrConfig} 
                          />
                        </section>
                      </div>
                      
                      <div className="lg:col-span-4 sticky top-24">
                        <LivePreview config={qrConfig} />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'analytics' && (
                  <div className="space-y-16">
                    <section>
                      <div className="flex items-end justify-between mb-8 border-b border-hairline pb-8">
                        <div>
                          <h3 className="text-3xl font-serif mb-2">Metrics Oversight</h3>
                          <p className="text-muted text-sm">Deep-visibility scanning telemetry.</p>
                        </div>
                        <div className="flex gap-3">
                          <Button variant="outline" className="bg-canvas border-hairline h-9 text-xs font-medium">Export Repository</Button>
                          <Button variant="outline" className="bg-canvas border-hairline h-9 text-xs font-medium">Global Filters</Button>
                        </div>
                      </div>
                      <StatsGrid />
                    </section>
                    
                    <section className="bg-surface-dark rounded-xl p-10 text-on-dark shadow-2xl">
                        <div className="mb-8">
                          <h3 className="text-2xl font-serif text-on-dark mb-2">Real-time Velocity</h3>
                          <p className="text-on-dark-soft text-sm">Synthetic latency mapping and scan requests per hour.</p>
                        </div>
                        <ChartsContainer />
                    </section>

                    <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       <div className="bg-surface-card rounded-lg p-8 border border-hairline">
                          <h4 className="text-xl font-serif mb-6">Device Distribution</h4>
                          <ChartsContainer showOnlyDevice />
                       </div>
                       <div className="bg-surface-card rounded-lg p-8 border border-hairline">
                          <h4 className="text-xl font-serif mb-6">Geographic Nodes</h4>
                          <ChartsContainer showOnlyLocations />
                       </div>
                    </section>
                  </div>
                )}

                {activeTab === 'management' && (
                  <div className="space-y-16">
                    <header className="border-b border-hairline pb-8">
                      <h3 className="text-3xl font-serif mb-2">Campaign Infrastructure</h3>
                      <p className="text-muted text-sm">Manage enterprise-scale dynamic flows.</p>
                    </header>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                      <div className="lg:col-span-4">
                        <BulkUpload />
                      </div>
                      <div className="lg:col-span-8">
                        <CampaignList />
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'developers' && (
                  <div className="space-y-16">
                     <header className="border-b border-hairline pb-8">
                      <h3 className="text-3xl font-serif mb-2">API Documentation & Integration</h3>
                      <p className="text-muted text-sm">Direct system hooks and JSON-LD structured data.</p>
                    </header>
                    <DeveloperSettings />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="mt-20 border-t border-hairline bg-surface-dark px-8 md:px-16 py-20 text-on-dark-soft">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                <div className="lg:col-span-2 space-y-6">
                  <div className="flex items-center gap-2 text-on-dark">
                    <div className="h-6 w-6 bg-on-dark rounded-sm flex items-center justify-center font-serif text-surface-dark text-xl leading-none">*</div>
                    <span className="font-serif text-2xl tracking-tight">Anthropic</span>
                  </div>
                  <p className="text-sm max-w-xs leading-relaxed">
                    Building reliable, interpretable, and steerable AI systems. We focus on research, safety, and scale.
                  </p>
                </div>
                <div className="space-y-4">
                  <h4 className="text-on-dark font-medium text-sm">Product</h4>
                  <div className="flex flex-col gap-2 text-[13px]">
                    <a href="#" className="hover:text-on-dark transition-colors">Claude</a>
                    <a href="#" className="hover:text-on-dark transition-colors">API Portal</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Claude for Enterprise</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Pricing</a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-on-dark font-medium text-sm">Resources</h4>
                  <div className="flex flex-col gap-2 text-[13px]">
                    <a href="#" className="hover:text-on-dark transition-colors">Documentation</a>
                    <a href="#" className="hover:text-on-dark transition-colors">System Status</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Safety Center</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Model Releases</a>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-on-dark font-medium text-sm">Company</h4>
                  <div className="flex flex-col gap-2 text-[13px]">
                    <a href="#" className="hover:text-on-dark transition-colors">About</a>
                    <a href="#" className="hover:text-on-dark transition-colors">News</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Research</a>
                    <a href="#" className="hover:text-on-dark transition-colors">Privacy Policy</a>
                  </div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row items-center justify-between text-[11px] font-medium uppercase tracking-widest gap-6">
                <div className="flex items-center gap-6">
                  <span>© 2026 Anthropic PBC</span>
                  <span className="text-primary cursor-pointer hover:underline underline-offset-4">Legal Notice</span>
                </div>
                <div className="flex items-center gap-8 text-on-dark">
                   <a href="#" className="hover:text-primary transition-colors">X</a>
                   <a href="#" className="hover:text-primary transition-colors">LinkedIn</a>
                   <a href="#" className="hover:text-primary transition-colors">GitHub</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

