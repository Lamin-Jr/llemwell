'use client';
import { motion } from 'framer-motion';

interface SpecRowProps {
  label: string;
  value: string;
}

function SpecRow({ label, value }: SpecRowProps) {
  return (
    <div className="flex flex-col md:flex-row py-6 border-b border-black/10">
      <div className="w-full md:w-1/3 mb-2 md:mb-0">
        <h4 className="uppercase tracking-[0.2em] text-[10px] font-semibold text-brand-primary">
          {label}
        </h4>
      </div>
      <div className="w-full md:w-2/3">
        <p className="font-serif text-lg text-foreground/90 leading-relaxed">
          {value}
        </p>
      </div>
    </div>
  );
}

export default function TechnicalSpecs() {
  return (
    <section id="specifications" className="py-24 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl luxury-heading mb-4 text-foreground">Specifications</h2>
          <p className="uppercase tracking-[0.2em] text-[11px] font-semibold text-foreground/50">
            Reference 01.STRUCTURAL.ARTIFACT
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="border-t border-black/20"
        >
          <SpecRow label="Model Architecture" value="Heavy-duty reinforced silhouette, 40mm width, triple-stitched edge anchoring." />
          <SpecRow label="Material" value="Dense, scarred calfskin, brutally treated to mourn the passage of time." />
          <SpecRow label="Hardware" value="Industrial-grade iron eyelets and oxidized spikes, anchored directly through the flesh." />
          <SpecRow label="Buckle" value="Forged iron structural buckle with a dual-prong severity system." />
          <SpecRow label="Origin" value="Engineered in the underground, assembled in Geneva." />
          <SpecRow label="Certification" value="LLEMWELL Structural Integrity Certified." />
        </motion.div>
      </div>
    </section>
  );
}
