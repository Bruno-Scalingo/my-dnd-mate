import { useState } from "react";
import { motion } from "framer-motion";
import { Dices, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RACES,
  CLASSES,
  PERSONALITY_TRAITS,
  APPEARANCES,
  MOTIVATIONS,
  SECRETS,
  VOICE_MANNERISMS,
  generateRandomNPC,
} from "@/data/npcData";
import type { NPC } from "@/data/npcData";

type NPCDraft = Omit<NPC, "id" | "createdAt">;

interface NPCFormProps {
  onSave: (npc: NPCDraft) => void;
}

const FIELD_OPTIONS: Record<string, string[]> = {
  race: RACES,
  occupation: CLASSES,
  personality: PERSONALITY_TRAITS,
  appearance: APPEARANCES,
  motivation: MOTIVATIONS,
  secret: SECRETS,
  voice: VOICE_MANNERISMS,
};

export default function NPCForm({ onSave }: NPCFormProps) {
  const [spinning, setSpinning] = useState(false);
  const [draft, setDraft] = useState<NPCDraft>(() => generateRandomNPC());

  const randomize = () => {
    setSpinning(true);
    setTimeout(() => setSpinning(false), 500);
    setDraft(generateRandomNPC());
  };

  const randomizeField = (field: keyof NPCDraft) => {
    const options = FIELD_OPTIONS[field as string];
    if (!options) return;
    const val = options[Math.floor(Math.random() * options.length)];
    setDraft((prev) => ({ ...prev, [field]: val }));
  };

  const set = (field: keyof NPCDraft, value: string) => {
    setDraft((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (!draft.name.trim()) return;
    onSave(draft);
  };

  const fields: { key: keyof NPCDraft; label: string; type: "input" | "select" | "textarea"; icon: string }[] = [
    { key: "name", label: "Name", type: "input", icon: "👤" },
    { key: "race", label: "Race", type: "select", icon: "🧬" },
    { key: "occupation", label: "Occupation", type: "select", icon: "⚒️" },
    { key: "appearance", label: "Appearance", type: "select", icon: "👁️" },
    { key: "personality", label: "Personality", type: "select", icon: "🎭" },
    { key: "voice", label: "Voice & Mannerisms", type: "select", icon: "🗣️" },
    { key: "motivation", label: "Motivation", type: "select", icon: "⚡" },
    { key: "secret", label: "Secret", type: "select", icon: "🔒" },
    { key: "notes", label: "DM Notes", type: "textarea", icon: "📜" },
  ];

  return (
    <div className="space-y-5">
      {/* Randomize All */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={randomize}
        className="w-full flex items-center justify-center gap-3 py-3 px-6 rounded border border-gold-dim bg-card-gradient hover:border-gold transition-all duration-200 hover:glow-gold group"
      >
        <motion.span
          animate={spinning ? { rotate: 360 } : { rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xl"
        >
          🎲
        </motion.span>
        <span className="font-display text-gold text-sm tracking-widest uppercase">
          Roll Random NPC
        </span>
      </motion.button>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-4">
        {fields.map(({ key, label, type, icon }) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-1"
          >
            <div className="flex items-center justify-between">
              <Label className="font-display text-xs tracking-widest uppercase text-gold-dim flex items-center gap-1.5">
                <span>{icon}</span> {label}
              </Label>
              {FIELD_OPTIONS[key] && (
                <button
                  onClick={() => randomizeField(key)}
                  className="text-muted-foreground hover:text-gold transition-colors p-0.5"
                  title={`Random ${label}`}
                >
                  <RefreshCw size={11} />
                </button>
              )}
            </div>

            {type === "input" && (
              <Input
                value={draft[key] as string}
                onChange={(e) => set(key, e.target.value)}
                className="bg-input border-border text-foreground font-body text-base focus:border-gold-dim focus:ring-0"
                placeholder={`Enter ${label.toLowerCase()}...`}
              />
            )}

            {type === "select" && (
              <Select value={draft[key] as string} onValueChange={(v) => set(key, v)}>
                <SelectTrigger className="bg-input border-border text-foreground font-body text-base focus:ring-0 focus:border-gold-dim">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border max-h-60">
                  {FIELD_OPTIONS[key].map((opt) => (
                    <SelectItem
                      key={opt}
                      value={opt}
                      className="font-body text-sm text-foreground focus:bg-secondary focus:text-gold"
                    >
                      {opt}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {type === "textarea" && (
              <Textarea
                value={draft[key] as string}
                onChange={(e) => set(key, e.target.value)}
                className="bg-input border-border text-foreground font-body text-base focus:border-gold-dim focus:ring-0 resize-none"
                rows={3}
                placeholder="Any extra notes for this NPC..."
              />
            )}
          </motion.div>
        ))}
      </div>

      {/* Save button */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        disabled={!draft.name.trim()}
        className="w-full py-3 px-6 rounded font-display text-sm tracking-widest uppercase bg-gold-gradient text-primary-foreground hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-gold"
      >
        ✦ Save NPC ✦
      </motion.button>
    </div>
  );
}
