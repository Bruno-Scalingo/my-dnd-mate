import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Trash2, ChevronDown, ChevronUp, Check } from "lucide-react";
import type { NPC } from "@/data/npcData";

interface NPCCardProps {
  npc: NPC;
  onDelete: (id: string) => void;
}

const FIELD_CONFIG = [
  { key: "race" as keyof NPC, label: "Race", icon: "🧬" },
  { key: "occupation" as keyof NPC, label: "Occupation", icon: "⚒️" },
  { key: "appearance" as keyof NPC, label: "Appearance", icon: "👁️" },
  { key: "personality" as keyof NPC, label: "Personality", icon: "🎭" },
  { key: "voice" as keyof NPC, label: "Voice", icon: "🗣️" },
  { key: "motivation" as keyof NPC, label: "Motivation", icon: "⚡" },
  { key: "secret" as keyof NPC, label: "Secret", icon: "🔒" },
];

function toClipboard(npc: NPC): string {
  return [
    `NPC: ${npc.name}`,
    `Race: ${npc.race} | Occupation: ${npc.occupation}`,
    `Appearance: ${npc.appearance}`,
    `Personality: ${npc.personality}`,
    `Voice: ${npc.voice}`,
    `Motivation: ${npc.motivation}`,
    `Secret: ${npc.secret}`,
    npc.notes ? `Notes: ${npc.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

export default function NPCCard({ npc, onDelete }: NPCCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(toClipboard(npc));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, y: -10 }}
      transition={{ duration: 0.3 }}
      className="parchment-card rounded border border-border bg-card-gradient shadow-card-rpg overflow-hidden"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-secondary/30 transition-colors"
        onClick={() => setExpanded((p) => !p)}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-gold font-display text-lg leading-none select-none">✦</span>
          <div className="min-w-0">
            <h3 className="font-display text-gold text-base leading-tight truncate">{npc.name}</h3>
            <p className="text-muted-foreground text-xs font-body">
              {npc.race} · {npc.occupation}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0 ml-2">
          <button
            onClick={(e) => { e.stopPropagation(); handleCopy(); }}
            className="p-1.5 text-muted-foreground hover:text-gold transition-colors rounded"
            title="Copy to clipboard"
          >
            {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(npc.id); }}
            className="p-1.5 text-muted-foreground hover:text-destructive transition-colors rounded"
            title="Delete NPC"
          >
            <Trash2 size={14} />
          </button>
          {expanded
            ? <ChevronUp size={14} className="text-muted-foreground" />
            : <ChevronDown size={14} className="text-muted-foreground" />
          }
        </div>
      </div>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-2 border-t border-border">
              {FIELD_CONFIG.map(({ key, label, icon }) => (
                <div key={key} className="flex gap-2 items-start">
                  <span className="text-sm leading-5 shrink-0">{icon}</span>
                  <div className="min-w-0">
                    <span className="text-gold-dim font-display text-xs uppercase tracking-wider">
                      {label}
                    </span>
                    <p className="text-foreground font-body text-sm leading-snug">
                      {npc[key] as string}
                    </p>
                  </div>
                </div>
              ))}
              {npc.notes && (
                <div className="flex gap-2 items-start mt-3 pt-3 border-t border-border">
                  <span className="text-sm leading-5 shrink-0">📜</span>
                  <div>
                    <span className="text-gold-dim font-display text-xs uppercase tracking-wider">
                      DM Notes
                    </span>
                    <p className="text-muted-foreground font-body text-sm leading-snug whitespace-pre-wrap">
                      {npc.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
