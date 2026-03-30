import { useState, useEffect, useCallback, useMemo } from "react";

// --- DATA ---
const SIGNS = [
  // Lesson 1: The World
  {
    char: "\u{1202D}", name: "AN", meaning: "heaven, sky, god",
    mnemonic: "A star radiating outward — the sky above",
    origin: "Originally a star shape — the sky was full of gods to the Sumerians.",
    lesson: 1, category: "logogram",
  },
  {
    char: "\u{121A0}", name: "KI", meaning: "earth, place, ground",
    mnemonic: "A wedge pressing down into the ground",
    origin: "A drawing of the earth's surface. Often paired with AN to mean 'universe' (heaven + earth).",
    lesson: 1, category: "logogram",
  },
  {
    char: "\u{12000}", name: "A", meaning: "water",
    mnemonic: "Flowing lines — water streaming",
    origin: "Depicted waves or flowing water. Also a common syllabic sign.",
    lesson: 1, category: "logogram",
  },
  {
    char: "\u{12313}", name: "UD", meaning: "sun, day, light",
    mnemonic: "The sun emerging on the horizon",
    origin: "Originally a sun rising. Also read UTU (the sun god) and BABBAR (white/bright).",
    lesson: 1, category: "logogram",
  },
  {
    char: "\u{121FD}", name: "LÚ", meaning: "man, person",
    mnemonic: "A figure standing upright",
    origin: "A simplified human figure. One of the most common signs in Sumerian texts.",
    lesson: 1, category: "logogram",
  },
  // Lesson 2: People & Power
  {
    char: "\u{12217}", name: "LUGAL", meaning: "king",
    mnemonic: "LÚ + GAL — literally 'big man'",
    origin: "A compound sign: the sign for 'person' combined with 'great'. Kingship = greatness.",
    lesson: 2, category: "logogram",
  },
  {
    char: "\u{120F2}", name: "GAL", meaning: "great, big",
    mnemonic: "A large open container — bigness",
    origin: "Possibly depicted a large vessel or opening. Used constantly as an adjective.",
    lesson: 2, category: "logogram",
  },
  {
    char: "\u{1208D}", name: "É", meaning: "house, temple",
    mnemonic: "A building with a roof",
    origin: "Originally a simple house plan seen from above. É.GAL ('big house') = palace!",
    lesson: 2, category: "logogram",
  },
  {
    char: "\u{12337}", name: "URU", meaning: "city",
    mnemonic: "A dense cluster — buildings packed together",
    origin: "A complex sign showing density of settlement. Used as a determinative before city names.",
    lesson: 2, category: "logogram",
  },
  {
    char: "\u{12295}", name: "SAG", meaning: "head",
    mnemonic: "A head in profile",
    origin: "Clearly a human head. Also means 'first' or 'front' — the head leads.",
    lesson: 2, category: "logogram",
  },
  // Lesson 3: Actions & Objects
  {
    char: "\u{12157}", name: "KA", meaning: "mouth, word, speech",
    mnemonic: "A head with the mouth area emphasized",
    origin: "Derived from SAG with marks for the mouth. Also read INIM (word) and DUG₄ (to speak).",
    lesson: 3, category: "logogram",
  },
  {
    char: "\u{122D7}", name: "ŠU", meaning: "hand",
    mnemonic: "Fingers spread out — an open hand",
    origin: "A hand with fingers visible. Many compound signs use ŠU for actions done by hand.",
    lesson: 3, category: "logogram",
  },
  {
    char: "\u{1210A}", name: "GIR₃", meaning: "foot, path",
    mnemonic: "A foot or leg in motion",
    origin: "Depicted a leg/foot. Related signs express walking, standing, and carrying.",
    lesson: 3, category: "logogram",
  },
  {
    char: "\u{12100}", name: "GI", meaning: "reed",
    mnemonic: "A tall reed plant",
    origin: "Reeds were everywhere in southern Mesopotamia and essential for writing, building, and crafts.",
    lesson: 3, category: "logogram",
  },
  {
    char: "\u{12252}", name: "NINDA", meaning: "bread, food",
    mnemonic: "A round loaf shape",
    origin: "A ration bowl or bread loaf. Appears in the earliest known texts — accounting for grain!",
    lesson: 3, category: "logogram",
  },
  // Lesson 4: Concepts & Compounds
  {
    char: "\u{12038}", name: "AŠ", meaning: "one",
    mnemonic: "A single wedge — the simplest mark",
    origin: "One vertical wedge = one. The very first number. Cuneiform is built from these wedge impressions.",
    lesson: 4, category: "logogram",
  },
  {
    char: "\u{1222C}", name: "MU", meaning: "name, year",
    mnemonic: "Identity — your name marks your year",
    origin: "Used for both 'name' and 'year'. Year-names commemorated royal achievements.",
    lesson: 4, category: "logogram",
  },
  {
    char: "\u{12097}", name: "EN", meaning: "lord, high priest",
    mnemonic: "A seat of authority",
    origin: "One of the oldest titles. The EN of Uruk was both religious and political leader.",
    lesson: 4, category: "logogram",
  },
  {
    char: "\u{1238F}", name: "NIN", meaning: "lady, queen, sister",
    mnemonic: "The feminine counterpart to EN",
    origin: "NIN.AN.NA = 'Lady of Heaven' = the goddess Inanna!",
    lesson: 4, category: "logogram",
  },
  {
    char: "\u{12309}", name: "DUMU", meaning: "child, son/daughter",
    mnemonic: "A small figure — offspring",
    origin: "Used in genealogies: 'X DUMU Y' = 'X, child of Y'. Essential for king lists.",
    lesson: 4, category: "logogram",
  },
];

const LESSONS = [
  { id: 1, title: "The World", desc: "Sky, earth, water, sun, and people" },
  { id: 2, title: "People & Power", desc: "Kings, cities, temples, and greatness" },
  { id: 3, title: "Actions & Objects", desc: "Mouth, hand, foot, reed, and bread" },
  { id: 4, title: "Concepts & Compounds", desc: "Numbers, names, lords, and lineage" },
];

const FUN_FACTS = [
  "The oldest known written complaint letter (c. 1750 BCE) is from a copper merchant named Nanni, furious at his supplier Ea-nāṣir for delivering substandard ingots.",
  "Scribal students practiced by copying proverbs. One reads: 'He who has much silver may be happy; he who has much barley may be happy; but he who has nothing at all can sleep.'",
  "The sign AN (𒀭) placed before a name tells you it's a god. This is called a 'determinative' — a silent reading aid.",
  "Cuneiform was written by pressing a reed stylus into wet clay at different angles. The word 'cuneiform' comes from Latin cuneus, meaning 'wedge.'",
  "É.GAL (𒂍 + 𒃲) literally means 'big house' = palace. LUGAL (𒈗) means 'big person' = king. Sumerian loved compounds!",
  "At its peak, cuneiform was used to write at least 15 different languages across the ancient Near East.",
  "Henry Rawlinson copied the Behistun inscription (c. 520 BCE) while dangling from a cliff face in western Iran — the Rosetta Stone of cuneiform.",
  "The last known cuneiform tablet dates to 75 CE — an astronomical text. The script was in use for over 3,000 years.",
  "Sumerian schoolchildren had to copy the same word lists hundreds of times. Some tablets survive with the teacher's neat version on one side and the student's messy attempt on the other.",
];

// --- COMPONENTS ---

function SignCard({ sign, flipped, onFlip, size = "lg" }) {
  const sizes = {
    lg: "text-7xl",
    md: "text-5xl",
    sm: "text-4xl",
  };
  return (
    <div
      onClick={onFlip}
      className={`cursor-pointer select-none rounded-2xl border-2 transition-all duration-300 ${
        flipped
          ? "bg-amber-50 border-amber-400 shadow-lg"
          : "bg-white border-stone-200 hover:border-amber-300 hover:shadow-md"
      }`}
      style={{ minHeight: size === "lg" ? 220 : 160 }}
    >
      <div className="flex flex-col items-center justify-center h-full p-6">
        <div className={`${sizes[size]} mb-3 leading-none`} style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>
          {sign.char}
        </div>
        {flipped ? (
          <div className="text-center space-y-1 animate-fadeIn">
            <div className="text-lg font-bold text-amber-800">{sign.name}</div>
            <div className="text-sm text-stone-600">{sign.meaning}</div>
            <div className="text-xs text-stone-400 italic mt-2 max-w-xs">{sign.mnemonic}</div>
          </div>
        ) : (
          <div className="text-sm text-stone-400">tap to reveal</div>
        )}
      </div>
    </div>
  );
}

function LearnMode({ unlockedLessons }) {
  const [currentLesson, setCurrentLesson] = useState(1);
  const [expandedSign, setExpandedSign] = useState(null);

  const lessonSigns = SIGNS.filter((s) => s.lesson === currentLesson);

  return (
    <div className="space-y-6">
      {/* lesson selector */}
      <div className="flex gap-2 flex-wrap">
        {LESSONS.map((l) => (
          <button
            key={l.id}
            onClick={() => { setCurrentLesson(l.id); setExpandedSign(null); }}
            disabled={l.id > unlockedLessons}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              currentLesson === l.id
                ? "bg-amber-600 text-white shadow"
                : l.id <= unlockedLessons
                ? "bg-stone-100 text-stone-700 hover:bg-stone-200"
                : "bg-stone-50 text-stone-300 cursor-not-allowed"
            }`}
          >
            {l.id}. {l.title}
          </button>
        ))}
      </div>

      <div className="bg-amber-50 rounded-xl p-4 border border-amber-200">
        <h3 className="font-bold text-amber-900">Lesson {currentLesson}: {LESSONS[currentLesson - 1].title}</h3>
        <p className="text-sm text-amber-700 mt-1">{LESSONS[currentLesson - 1].desc}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessonSigns.map((sign, i) => (
          <div
            key={sign.name}
            className={`rounded-2xl border-2 p-5 cursor-pointer transition-all ${
              expandedSign === i
                ? "bg-amber-50 border-amber-400 shadow-lg col-span-1 sm:col-span-2 lg:col-span-3"
                : "bg-white border-stone-200 hover:border-amber-300 hover:shadow-md"
            }`}
            onClick={() => setExpandedSign(expandedSign === i ? null : i)}
          >
            <div className="flex items-center gap-4">
              <div className="text-5xl leading-none" style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>
                {sign.char}
              </div>
              <div>
                <div className="font-bold text-lg text-stone-800">{sign.name}</div>
                <div className="text-sm text-stone-500">{sign.meaning}</div>
              </div>
            </div>
            {expandedSign === i && (
              <div className="mt-4 pt-4 border-t border-amber-200 space-y-2 animate-fadeIn">
                <p className="text-sm text-stone-700"><span className="font-semibold text-amber-800">Memory hook:</span> {sign.mnemonic}</p>
                <p className="text-sm text-stone-600"><span className="font-semibold text-amber-800">Origin:</span> {sign.origin}</p>
                <p className="text-xs text-stone-400">Unicode: U+{sign.char.codePointAt(0).toString(16).toUpperCase().padStart(5, "0")}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function PracticeMode({ unlockedLessons }) {
  const available = useMemo(() => SIGNS.filter((s) => s.lesson <= unlockedLessons), [unlockedLessons]);
  const [queue, setQueue] = useState([]);
  const [current, setCurrent] = useState(null);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [mode, setMode] = useState("sign-to-name"); // or "name-to-sign"
  const [streak, setStreak] = useState(0);

  const pickQuestion = useCallback(() => {
    const pool = available.length > 0 ? available : SIGNS.slice(0, 5);
    const answer = pool[Math.floor(Math.random() * pool.length)];
    const distractors = pool.filter((s) => s.name !== answer.name).sort(() => Math.random() - 0.5).slice(0, 3);
    const opts = [answer, ...distractors].sort(() => Math.random() - 0.5);
    setCurrent(answer);
    setOptions(opts);
    setSelected(null);
  }, [available]);

  useEffect(() => { pickQuestion(); }, [pickQuestion]);

  const handleSelect = (sign) => {
    if (selected !== null) return;
    setSelected(sign.name);
    const correct = sign.name === current.name;
    setScore((s) => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    setStreak(correct ? streak + 1 : 0);
  };

  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* controls */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => { setMode("sign-to-name"); pickQuestion(); setScore({ correct: 0, total: 0 }); setStreak(0); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${mode === "sign-to-name" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-600"}`}
          >
            Sign → Name
          </button>
          <button
            onClick={() => { setMode("name-to-sign"); pickQuestion(); setScore({ correct: 0, total: 0 }); setStreak(0); }}
            className={`px-3 py-1.5 rounded-full text-xs font-medium ${mode === "name-to-sign" ? "bg-amber-600 text-white" : "bg-stone-100 text-stone-600"}`}
          >
            Name → Sign
          </button>
        </div>
        <div className="text-sm text-stone-500">
          {score.correct}/{score.total} ({pct}%) {streak >= 3 && <span className="text-amber-600 font-bold ml-1">🔥 {streak}</span>}
        </div>
      </div>

      {/* question */}
      {current && (
        <div className="bg-white rounded-2xl border-2 border-stone-200 p-8 text-center">
          {mode === "sign-to-name" ? (
            <>
              <div className="text-xs text-stone-400 mb-2 uppercase tracking-wide">What sign is this?</div>
              <div className="text-8xl mb-2 leading-none" style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>
                {current.char}
              </div>
            </>
          ) : (
            <>
              <div className="text-xs text-stone-400 mb-2 uppercase tracking-wide">Find the sign for:</div>
              <div className="text-3xl font-bold text-amber-800 mb-1">{current.name}</div>
              <div className="text-sm text-stone-500">{current.meaning}</div>
            </>
          )}
        </div>
      )}

      {/* options */}
      <div className="grid grid-cols-2 gap-3">
        {options.map((opt) => {
          const isCorrectAnswer = opt.name === current?.name;
          const isSelected = selected === opt.name;
          let bg = "bg-white border-stone-200 hover:border-amber-300";
          if (selected !== null) {
            if (isCorrectAnswer) bg = "bg-green-50 border-green-400";
            else if (isSelected) bg = "bg-red-50 border-red-400";
          }
          return (
            <button
              key={opt.name}
              onClick={() => handleSelect(opt)}
              className={`rounded-xl border-2 p-4 transition-all ${bg} ${selected !== null ? "cursor-default" : "cursor-pointer"}`}
            >
              {mode === "sign-to-name" ? (
                <>
                  <div className="font-bold text-stone-800">{opt.name}</div>
                  <div className="text-xs text-stone-500">{opt.meaning}</div>
                </>
              ) : (
                <div className="text-4xl leading-none" style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>
                  {opt.char}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* feedback + next */}
      {selected !== null && (
        <div className="text-center space-y-3 animate-fadeIn">
          {selected === current.name ? (
            <p className="text-green-700 font-medium">Correct! {current.origin.split(".")[0]}.</p>
          ) : (
            <p className="text-red-700 font-medium">
              That's {options.find(o => o.name === selected)?.name}. The answer was <strong>{current.name}</strong> ({current.meaning}).
            </p>
          )}
          <button
            onClick={pickQuestion}
            className="px-6 py-2 bg-amber-600 text-white rounded-full font-medium hover:bg-amber-700 transition-colors"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function ReferenceMode() {
  const [search, setSearch] = useState("");
  const filtered = SIGNS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.meaning.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Search signs by name or meaning..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:outline-none text-sm"
      />
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b-2 border-stone-200 text-left">
              <th className="py-2 px-3 text-stone-500 font-medium">Sign</th>
              <th className="py-2 px-3 text-stone-500 font-medium">Name</th>
              <th className="py-2 px-3 text-stone-500 font-medium">Meaning</th>
              <th className="py-2 px-3 text-stone-500 font-medium hidden sm:table-cell">Lesson</th>
              <th className="py-2 px-3 text-stone-500 font-medium hidden md:table-cell">Unicode</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.name} className="border-b border-stone-100 hover:bg-amber-50 transition-colors">
                <td className="py-3 px-3 text-3xl" style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>{s.char}</td>
                <td className="py-3 px-3 font-bold text-stone-800">{s.name}</td>
                <td className="py-3 px-3 text-stone-600">{s.meaning}</td>
                <td className="py-3 px-3 text-stone-400 hidden sm:table-cell">{s.lesson}</td>
                <td className="py-3 px-3 text-stone-400 text-xs hidden md:table-cell font-mono">
                  U+{s.char.codePointAt(0).toString(16).toUpperCase().padStart(5, "0")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-stone-400 py-8">No signs match "{search}"</p>
      )}
    </div>
  );
}

// --- MAIN APP ---
export default function CuneiformStudy() {
  const [tab, setTab] = useState("learn");
  const [unlockedLessons, setUnlockedLessons] = useState(4); // all unlocked for POC
  const [factIndex, setFactIndex] = useState(Math.floor(Math.random() * FUN_FACTS.length));

  const tabs = [
    { id: "learn", label: "Learn", icon: "📜" },
    { id: "practice", label: "Practice", icon: "✏️" },
    { id: "reference", label: "Reference", icon: "📖" },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Cuneiform&display=swap');
        @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>

      {/* header */}
      <header className="bg-gradient-to-r from-amber-800 to-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-1">
            <span className="text-4xl" style={{ fontFamily: "Noto Sans Cuneiform, serif" }}>𒀭𒆠</span>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Cuneiform Study</h1>
              <p className="text-amber-200 text-sm">Learn to read the world's oldest writing</p>
            </div>
          </div>
        </div>
      </header>

      {/* fun fact banner */}
      <div className="bg-amber-100 border-b border-amber-200">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-start gap-3">
          <span className="text-amber-600 mt-0.5 flex-shrink-0">💡</span>
          <p className="text-sm text-amber-900 flex-1">{FUN_FACTS[factIndex]}</p>
          <button
            onClick={() => setFactIndex((factIndex + 1) % FUN_FACTS.length)}
            className="text-xs text-amber-600 hover:text-amber-800 flex-shrink-0 underline"
          >
            another
          </button>
        </div>
      </div>

      {/* tabs */}
      <div className="bg-white border-b border-stone-200 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 flex gap-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`px-5 py-3 text-sm font-medium border-b-2 transition-colors ${
                tab === t.id
                  ? "border-amber-600 text-amber-800"
                  : "border-transparent text-stone-500 hover:text-stone-700"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {tab === "learn" && <LearnMode unlockedLessons={unlockedLessons} />}
        {tab === "practice" && <PracticeMode unlockedLessons={unlockedLessons} />}
        {tab === "reference" && <ReferenceMode />}
      </main>

      {/* footer */}
      <footer className="text-center py-6 text-xs text-stone-400">
        Proof of concept — sign data is approximate. 20 signs across 4 lessons.
        <br />
        For deep learning, pair with an Opus tutoring conversation.
      </footer>
    </div>
  );
}
