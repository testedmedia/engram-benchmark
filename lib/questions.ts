/**
 * Engram Memory Benchmark Questions
 * 15 questions across 5 categories, each worth different points
 */

export interface QuestionOption {
  text: string;
  score: number; // 0-100
}

export interface Question {
  id: string;
  category: "dedup" | "recall" | "efficiency" | "speed" | "health";
  text: string;
  options: QuestionOption[];
}

export interface CategoryMetadata {
  id: string;
  name: string;
  weight: number; // percentage of total score
  maxPoints: number;
  engramBaseline: number; // Engram's typical score (87)
  description: string;
}

export const CATEGORIES: Record<string, CategoryMetadata> = {
  dedup: {
    id: "dedup",
    name: "Duplicate Prevention",
    weight: 25,
    maxPoints: 25,
    engramBaseline: 87,
    description: "How effectively the system prevents storing duplicate information",
  },
  recall: {
    id: "recall",
    name: "Recall Accuracy",
    weight: 30,
    maxPoints: 30,
    engramBaseline: 87,
    description: "Ability to find facts even when phrased differently",
  },
  efficiency: {
    id: "efficiency",
    name: "Token Efficiency",
    weight: 20,
    maxPoints: 20,
    engramBaseline: 87,
    description: "Memory bloat prevention and budget enforcement",
  },
  speed: {
    id: "speed",
    name: "Retrieval Speed",
    weight: 15,
    maxPoints: 15,
    engramBaseline: 87,
    description: "Indexing strategy and retrieval at scale",
  },
  health: {
    id: "health",
    name: "System Health",
    weight: 10,
    maxPoints: 10,
    engramBaseline: 87,
    description: "Health checks, monitoring, and auto-learning",
  },
};

export const QUESTIONS: Question[] = [
  // Duplicate Prevention (3 questions × 25pts each)
  {
    id: "dedup-1",
    category: "dedup",
    text: "How does your memory system detect and prevent duplicate information?",
    options: [
      {
        text: "No deduplication - stores everything verbatim (high memory bloat)",
        score: 15,
      },
      {
        text: "Simple string matching on exact phrases only",
        score: 45,
      },
      {
        text: "Semantic similarity detection with configurable thresholds",
        score: 75,
      },
      {
        text: "Multi-layer dedup (syntax + semantic + intent) with learned patterns",
        score: 100,
      },
    ],
  },
  {
    id: "dedup-2",
    category: "dedup",
    text: "When a duplicate is detected, what happens to your memory budget?",
    options: [
      {
        text: "Duplicate is stored anyway; budget not enforced",
        score: 20,
      },
      {
        text: "Duplicate replaced, but old version orphaned in storage",
        score: 50,
      },
      {
        text: "Duplicate replaced; old entry cleaned up, budget freed",
        score: 80,
      },
      {
        text: "Merge duplicates, consolidate metadata, optimize all references",
        score: 100,
      },
    ],
  },
  {
    id: "dedup-3",
    category: "dedup",
    text: "How often is your deduplication logic audited or improved?",
    options: [
      {
        text: "Never - dedup rules are static",
        score: 20,
      },
      {
        text: "Quarterly or when duplicates are manually reported",
        score: 50,
      },
      {
        text: "Monthly - metrics tracked, refined based on false positives",
        score: 75,
      },
      {
        text: "Real-time ML-driven dedup with continuous improvement from false positives",
        score: 100,
      },
    ],
  },

  // Recall Accuracy (3 questions × 30pts each)
  {
    id: "recall-1",
    category: "recall",
    text: "If you stored 'The Engram system prevents duplicate memories' and search for 'How does Engram avoid repetition?', what happens?",
    options: [
      {
        text: "Search fails - exact phrase not found",
        score: 15,
      },
      {
        text: "Keyword overlap finds it, but low confidence",
        score: 50,
      },
      {
        text: "Semantic search finds it with high confidence (>0.8 similarity)",
        score: 80,
      },
      {
        text: "Semantic + intent matching finds it AND suggests related facts",
        score: 100,
      },
    ],
  },
  {
    id: "recall-2",
    category: "recall",
    text: "How does your system handle contradictory facts in memory?",
    options: [
      {
        text: "Stores both; user must resolve manually",
        score: 30,
      },
      {
        text: "Latest fact overwrites older one, no audit trail",
        score: 55,
      },
      {
        text: "Stores both with timestamps, flags contradiction, suggests resolution",
        score: 80,
      },
      {
        text: "Stores both, auto-resolves based on source reliability + context, maintains lineage",
        score: 100,
      },
    ],
  },
  {
    id: "recall-3",
    category: "recall",
    text: "Can you recall facts across different contexts or time periods?",
    options: [
      {
        text: "No - memories are session-specific",
        score: 20,
      },
      {
        text: "Yes, but search is slow (must scan all memories)",
        score: 55,
      },
      {
        text: "Yes, fast - indexed by topic + time period",
        score: 80,
      },
      {
        text: "Yes, instant - multi-dimensional index with relevance decay over time",
        score: 100,
      },
    ],
  },

  // Token Efficiency (3 questions × 20pts each)
  {
    id: "efficiency-1",
    category: "efficiency",
    text: "How do you monitor token usage across your memory system?",
    options: [
      {
        text: "No monitoring - no idea how many tokens are being used",
        score: 10,
      },
      {
        text: "Manual counting - approximate tokens per memory",
        score: 40,
      },
      {
        text: "Automated tracking per entry; alerts if approaching budget",
        score: 75,
      },
      {
        text: "Real-time token accounting + predictive budgeting + auto-pruning",
        score: 100,
      },
    ],
  },
  {
    id: "efficiency-2",
    category: "efficiency",
    text: "What happens when memory approaches or exceeds the token budget?",
    options: [
      {
        text: "No action - memories keep growing unbounded",
        score: 15,
      },
      {
        text: "Manual warning; user must delete entries",
        score: 45,
      },
      {
        text: "Automatic pruning of least-used entries",
        score: 75,
      },
      {
        text: "Smart tiering (hot/cold) + compression + relevance decay + user control",
        score: 100,
      },
    ],
  },
  {
    id: "efficiency-3",
    category: "efficiency",
    text: "How effectively does your system compress or summarize memories?",
    options: [
      {
        text: "No compression - raw text only",
        score: 20,
      },
      {
        text: "Basic text compression (gzip-style)",
        score: 50,
      },
      {
        text: "Semantic compression - extracting key facts and condensing",
        score: 75,
      },
      {
        text: "Adaptive compression with metadata indexing + full-text search on summaries",
        score: 100,
      },
    ],
  },

  // Retrieval Speed (3 questions × 15pts each)
  {
    id: "speed-1",
    category: "speed",
    text: "How is your memory indexed for fast retrieval?",
    options: [
      {
        text: "No index - linear scan through all memories (O(n))",
        score: 15,
      },
      {
        text: "Simple keyword index (B-tree or hash table)",
        score: 50,
      },
      {
        text: "Vector embeddings + FAISS or similar (O(log n))",
        score: 80,
      },
      {
        text: "Hybrid index (keyword + semantic + graph) with caching layer",
        score: 100,
      },
    ],
  },
  {
    id: "speed-2",
    category: "speed",
    text: "How does retrieval speed scale as memory grows?",
    options: [
      {
        text: "Degrades linearly - 10x more memories = 10x slower",
        score: 20,
      },
      {
        text: "Degrades logarithmically - noticeable slowdown at scale",
        score: 50,
      },
      {
        text: "Constant time for top-N results with large datasets",
        score: 80,
      },
      {
        text: "Constant or faster with smart caching + predictive prefetch",
        score: 100,
      },
    ],
  },
  {
    id: "speed-3",
    category: "speed",
    text: "What is your typical retrieval latency (time to return results)?",
    options: [
      {
        text: ">500ms per query",
        score: 25,
      },
      {
        text: "100-500ms per query",
        score: 55,
      },
      {
        text: "<100ms per query",
        score: 80,
      },
      {
        text: "<20ms with optional async prefetch for next results",
        score: 100,
      },
    ],
  },

  // System Health (3 questions × 10pts each)
  {
    id: "health-1",
    category: "health",
    text: "Do you have automated health checks for your memory system?",
    options: [
      {
        text: "No health monitoring",
        score: 10,
      },
      {
        text: "Manual checks when problems are noticed",
        score: 40,
      },
      {
        text: "Automated checks (hourly) - alerts on failures",
        score: 75,
      },
      {
        text: "Real-time monitoring + predictive error detection + auto-healing",
        score: 100,
      },
    ],
  },
  {
    id: "health-2",
    category: "health",
    text: "How does your system learn and improve from errors?",
    options: [
      {
        text: "No learning - same bugs repeat",
        score: 15,
      },
      {
        text: "Manual postmortem process; fixes rolled out slowly",
        score: 50,
      },
      {
        text: "Automated error patterns detected; fixes deployed weekly",
        score: 75,
      },
      {
        text: "Real-time ML-driven error detection + auto-fix + immediate deployment",
        score: 100,
      },
    ],
  },
  {
    id: "health-3",
    category: "health",
    text: "What is your system's uptime and disaster recovery capability?",
    options: [
      {
        text: "No backup; data loss possible",
        score: 20,
      },
      {
        text: "Weekly backups; recovery takes hours",
        score: 55,
      },
      {
        text: "Daily backups; recovery takes <5 minutes",
        score: 80,
      },
      {
        text: "Real-time replication; instant failover; 99.99% uptime SLA",
        score: 100,
      },
    ],
  },
];
