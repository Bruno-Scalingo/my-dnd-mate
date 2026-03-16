import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Scroll, Users } from "lucide-react";
import NPCForm from "@/components/NPCForm";
import NPCCard from "@/components/NPCCard";
import type { NPC } from "@/data/npcData";

const STORAGE_KEY = "rpg-npcs";

function loadNPCs(): NPC[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveNPCs(npcs: NPC[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(npcs));
}

export default function Index() {
  const [npcs, setNPCs] = useState<NPC[]>(loadNPCs);
  const [tab, setTab] = useState<"create" | "roster">("create");

  const handleSave = useCallback((draft: Omit<NPC, "id" | "createdAt">) => {
    const npc: NPC = {
      ...draft,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setNPCs((prev) => {
      const next = [npc, ...prev];
      saveNPCs(next);
      return next;
    });
    setTab("roster");
  }, []);

  const handleDelete = useCallback((id: string) => {
    setNPCs((prev) => {
      const next = prev.filter((n) => n.id !== id);
      saveNPCs(next);
      return next;
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/60 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl animate-flicker">🗡️</span>
            <div>
              <h1 className="font-display text-gold text-lg leading-tight tracking-wide">
                NPC Forge
              </h1>
              <p className="text-muted-foreground text-xs font-body">
                Roll. Create. Remember.
              </p>
            </div>
          </div>
          <div className="text-muted-foreground text-xs font-display uppercase tracking-widest">
            {npcs.length} {npcs.length === 1 ? "soul" : "souls"}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Tab nav */}
        <div className="flex gap-1 mb-6 border border-border rounded bg-card/40 p-1">
          {(["create", "roster"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 rounded text-sm font-display uppercase tracking-widest transition-all duration-200 ${
                tab === t
                  ? "bg-gold-gradient text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "create" ? (
                <><Scroll size={14} /> Create</>
              ) : (
                <><Users size={14} /> Roster {npcs.length > 0 && `(${npcs.length})`}</>
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {tab === "create" ? (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Ornamental title */}
              <div className="text-center mb-6">
                <p className="text-muted-foreground text-xs font-display uppercase tracking-widest ornament">
                  Forge a New Soul
                </p>
              </div>
              <NPCForm onSave={handleSave} />
            </motion.div>
          ) : (
            <motion.div
              key="roster"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {npcs.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20 space-y-3"
                >
                  <p className="text-4xl">📖</p>
                  <p className="font-display text-muted-foreground text-sm uppercase tracking-widest">
                    No souls forged yet
                  </p>
                  <button
                    onClick={() => setTab("create")}
                    className="text-gold font-display text-xs uppercase tracking-widest hover:underline"
                  >
                    Create your first NPC →
                  </button>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {npcs.map((npc) => (
                    <NPCCard key={npc.id} npc={npc} onDelete={handleDelete} />
                  ))}
                </AnimatePresence>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-muted-foreground text-xs font-body">
        <span className="ornament">NPC Forge</span>
      </footer>
    </div>
  );
}
