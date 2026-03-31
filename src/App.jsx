import { useState, useEffect, useCallback } from "react";

const GLOSSARY = {
  "Développé incliné barre libre":"Allongé sur un banc incliné (30-45°), tu pousses une barre vers le haut. Cible le haut des pecs et les épaules.",
  "Développé couché machine assis":"Assis sur une machine, tu pousses des poignées devant toi. Même mouvement que le développé couché mais guidé et plus sûr.",
  "Écarté machine butterfly":"Assis, bras écartés sur les coussins de la machine, tu ramènes les bras devant toi en serrant les pecs. Isolation pecs pure.",
  "Machine dips":"Machine assistée pour les dips. Tu pousses vers le bas. Cible les triceps.",
  "Triceps corde poulie haute":"Debout face à une poulie haute avec une corde, tu tends les bras vers le bas en écartant la corde en bas du mouvement. Isolation triceps.",
  "Développé militaire machine":"Assis sur une machine, tu pousses vers le haut. Même mouvement que le développé épaules mais guidé.",
  "Élévation latérale haltères":"Debout, bras le long du corps avec haltères légers, monte les bras sur les côtés jusqu'à l'horizontale. LE meilleur exo pour élargir les épaules.",
  "Élévation latérale machine":"Même mouvement que les latérales haltères mais sur une machine. Permet de mieux isoler le deltoïde moyen.",
  "Curl barre libre debout":"Debout, barre dans les mains en supination (paumes vers le haut), tu plies les coudes pour monter la barre. Biceps.",
  "Curl alterné prise marteau haltères":"Debout, haltères en prise neutre (pouces vers le haut), tu montes en alternant les bras. Biceps + avant-bras.",
  "Machine crunch abdos":"Assis sur une machine, tu enroules le buste vers le bas contre une résistance. Abdos avec charge.",
  "Leg extension":"Assis sur une machine, jambes pendantes, tu tends les jambes devant toi. Isolation des quadriceps.",
  "Squat barre libre":"La barre sur le haut du dos, tu descends en pliant les genoux comme pour t'asseoir, puis tu remontes. Le roi des exercices jambes.",
  "Squat machine":"Même mouvement mais sur une machine guidée (Smith machine ou hack squat). Plus sûr si tu débutes.",
  "Presse à cuisses":"Assis sur une machine inclinée, tu pousses une plateforme avec les pieds. Quadriceps et fessiers sans charger le dos.",
  "Leg curl allongé (ischios)":"Allongé face contre le banc, tu plies les jambes en ramenant les talons vers les fesses. Isolation des ischios (arrière des cuisses).",
  "Leg curl debout":"Debout, tu plies une jambe à la fois. Même cible que le leg curl allongé mais unilatéral.",
  "Machine adducteurs/abducteurs":"Assis, tu écartes les jambes (abducteurs = extérieur) ou tu les serres (adducteurs = intérieur). En superset = les deux enchaînés.",
  "Mollet debout machine":"Sur une machine, tu te mets sur la pointe des pieds puis tu redescends. Mollets.",
  "Tirage vertical poulie prise large":"Assis face à une poulie haute, tu tires une barre large vers la poitrine. Dos large (grand dorsal).",
  "Tirage horizontal machine prise large":"Assis, tu tires des poignées vers ton ventre, coudes écartés. Épaisseur du dos.",
  "Tirage horizontal machine prise serrée":"Même chose mais mains rapprochées. Cible le milieu du dos et les rhomboïdes.",
  "Tirage vertical poulie prise serrée":"Comme le tirage large mais mains rapprochées. Travaille aussi les biceps.",
  "Relevé de jambes":"Suspendu ou sur un banc incliné, tu montes les jambes tendues. Abdos du bas.",
  "Cardio escalier / course":"30 min de marche sur machine escalier ou course en zone 2 (tu peux parler mais pas chanter). 114-133 bpm si tu as 30 ans.",
};

const M = {
  pecs:{l:"Pecs",c:"#ef4444"},epaules:{l:"Épaules",c:"#f59e0b"},triceps:{l:"Triceps",c:"#f97316"},
  dos:{l:"Dos",c:"#3b82f6"},biceps:{l:"Biceps",c:"#6366f1"},
  ischios:{l:"Ischios",c:"#10b981"},quadriceps:{l:"Quads",c:"#14b8a6"},fessiers:{l:"Fessiers",c:"#06b6d4"},
  mollets:{l:"Mollets",c:"#22d3ee"},abdos:{l:"Abdos",c:"#ec4899"},
  cardio:{l:"Cardio",c:"#84cc16"},adducteurs:{l:"Add/Abd",c:"#0ea5e9"},avbras:{l:"Avant-bras",c:"#a78bfa"},
};

function ex(name,sets,rest,muscles,notes=""){return{name,sets,rest,muscles,notes};}

const WK = {
  "pecs-triceps":{title:"Jour 1 — Pecs / Triceps + Cardio",duration:"70-80 min",calories:"~600 kcal",exercises:[
    ex("Développé incliné barre libre","2×20 (échauf.)","60s",["pecs","epaules"],"Échauffement léger"),
    ex("Développé incliné barre libre","5×12","60s",["pecs","epaules","triceps"],"Contrôle la descente"),
    ex("Développé couché machine assis","5×12","60s",["pecs","triceps"],"Pousse explosive, retour lent"),
    ex("Écarté machine butterfly","5×12","60s",["pecs"],"Squeeze 1s pecs contractés"),
    ex("Machine dips","5×12","60s",["triceps","pecs"],"Coudes le long du corps"),
    ex("Triceps corde poulie haute","5×12","60s",["triceps"],"Écarte la corde en bas"),
    ex("Cardio escalier / course","30 min","—",["cardio"],"Zone 2 — post-training"),
  ]},
  "epaules-biceps":{title:"Jour 2 — Épaules / Biceps / Abdos + Cardio",duration:"75-85 min",calories:"~550 kcal",exercises:[
    ex("Développé militaire machine","5×12","60s",["epaules"],"Pousse vers le plafond"),
    ex("Élévation latérale haltères","5×12","60s",["epaules"],"Léger, technique propre, pas d'élan"),
    ex("Élévation latérale machine","5×12","60s",["epaules"],"Contrôle total"),
    ex("Curl barre libre debout","4×12","60s",["biceps"],"Coudes fixes, pas de balancement"),
    ex("Curl alterné prise marteau haltères","4×12","60s",["biceps","avbras"],"Pouce vers le haut"),
    ex("Machine crunch abdos","5×12","60s",["abdos"],"Enroule le buste, expire en bas"),
    ex("Cardio escalier / course","30 min","—",["cardio"],"Zone 2 — post-training"),
  ]},
  jambes:{title:"Jour 3 — Jambes + Cardio",duration:"75-85 min",calories:"~700 kcal",exercises:[
    ex("Leg extension","2×20 (échauf.)","60s",["quadriceps"],"Échauffement"),
    ex("Leg extension","5×12","60s",["quadriceps"],"Squeeze 1s en haut"),
    ex("Squat barre libre","5×12","60s",["quadriceps","fessiers"],"Descends cuisse parallèle au sol"),
    ex("Presse à cuisses","5×12","60s",["quadriceps","fessiers"],"Pieds largeur d'épaules"),
    ex("Leg curl allongé (ischios)","6×12","60s",["ischios"],"Contrôle la descente"),
    ex("Mollet debout machine","5×12","60s",["mollets"],"Amplitude complète"),
    ex("Cardio escalier / course","30 min","—",["cardio"],"Zone 2 — post-training"),
  ]},
  "dos-pecs-abdos":{title:"Jour 4 — Dos / Pecs / Abdos",duration:"65-75 min",calories:"~550 kcal",exercises:[
    ex("Tirage vertical poulie prise large","2×20 (échauf.)","60s",["dos"],"Échauffement"),
    ex("Tirage vertical poulie prise large","4×12","60s",["dos","biceps"],"Tire vers la poitrine, pas la nuque"),
    ex("Tirage horizontal machine prise large","4×12","60s",["dos"],"Serre les omoplates"),
    ex("Tirage horizontal machine prise serrée","4×12","60s",["dos"],"Coudes le long du corps"),
    ex("Tirage vertical poulie prise serrée","4×12","60s",["dos","biceps"],"Pleine amplitude"),
    ex("Développé couché machine assis","4×12","60s",["pecs","triceps"],"Rappel pecs"),
    ex("Écarté machine butterfly","4×12","60s",["pecs"],"Squeeze"),
    ex("Relevé de jambes","4×15","60s",["abdos"],"Contrôle, pas d'élan"),
  ]},
  "cardio-social":{title:"Jour 5 — Cardio + Sortie",duration:"45-60 min",calories:"~350 kcal",
    socialNote:"🍸 Sortie ce soir : protéines dans la journée. Tequila/vodka + eau gazeuse >> bière. 1 eau entre chaque. Max 4 verres. Pas de kebab.",
    exercises:[
      ex("Marche escalier machine OU course","45-60 min","—",["cardio","fessiers"],"Faible intensité, zone 2"),
      ex("Étirements","10 min","—",[],"Hanches, épaules, ischios"),
  ]},
  rest:{title:"Repos Actif",duration:"30 min",calories:"~150 kcal",exercises:[
    ex("Marche extérieur","30 min","—",["cardio"],"Tranquille"),
    ex("Étirements / foam roller","15 min","—",[],""),
  ]},
  calisthenics:{title:"Calisthenics (avec ami)",duration:"50 min",calories:"~400 kcal",exercises:[
    ex("Tractions pronation","5×max","90s",["dos","biceps"],"Varier les prises"),
    ex("Dips aux barres","5×max","90s",["pecs","triceps","epaules"],""),
    ex("Pompes variantes","4×12","60s",["pecs","triceps"],"Diamant, déclinées, larges"),
    ex("Australian pull-ups","3×15","45s",["dos"],""),
    ex("Gainage : planche + hollow body","3×45s chaque","30s",["abdos"],""),
  ]},
};

const MEALS = [
  {time:"~8h30",name:"Petit-déjeuner",cal:"~400 kcal",detail:"Crêpes : 70g avoine + 2 œufs + 2 blancs (60ml) + 3g cannelle de Ceylan. 10g raisins secs.",supps:"Multivitamines + Oméga-3 + CLA",macros:"L=14g P=28g G=42g"},
  {time:"~12h",name:"Collation 1",cal:"~250 kcal",detail:"5 amandes + 30g whey + 1 fruit",supps:"",macros:"L=5g P=25g G=32g"},
  {time:"~14h30",name:"Déjeuner",cal:"~665 kcal",detail:"Crudités + 150g poulet/dinde/poisson OU 150g viande rouge 5% OU 100g tofu. 150g légumes verts + 80g féculents (cru) + 10g huile coco.",supps:"Multivitamines + Oméga-3 + CLA",macros:"L=20g P=30g G=55g"},
  {time:"~17h30",name:"Collation 2",cal:"~145 kcal",detail:"5 amandes + 30g whey",supps:"",macros:"L=5g P=25g G=4g"},
  {time:"Pré-training",name:"Avant entraînement",cal:"—",detail:"30 min avant : Caféine 100mg (si fatigue) + L-Carnitine + Brûleur de graisse",supps:"Caféine + L-Carnitine + Fat burner",macros:""},
  {time:"Pendant",name:"Pendant training",cal:"—",detail:"1L eau minérale + 5g BCAAs",supps:"BCAAs 5g",macros:""},
  {time:"Post-training",name:"Après entraînement",cal:"~200 kcal",detail:"1 compote de pomme + 30g whey isolate",supps:"",macros:"L=1g P=25g G=22g"},
  {time:"~20h30",name:"Dîner",cal:"~500 kcal",detail:"Crudités + 150g poulet/poisson OU 100g saumon (max 3×/sem) OU omelette (2 œufs + 3 blancs). 60g féculents (cru) + 200g légumes verts + 10g huile coco.",supps:"Oméga-3",macros:"L=15g P=33g G=54g"},
];

const SUPPS_ALL = [
  {cat:"☀️ Matin",items:[{n:"Multivitamines",d:"1 cachet",t:"avec petit-déj"},{n:"Oméga-3",d:"1 cachet",t:"avec petit-déj"},{n:"CLA",d:"1 cachet",t:"avec petit-déj"}],c:"#f5c518"},
  {cat:"🍽️ Déjeuner",items:[{n:"Multivitamines",d:"1 cachet",t:"avec le repas"},{n:"Oméga-3",d:"1 cachet",t:"avec le repas"},{n:"CLA",d:"1 cachet",t:"avec le repas"}],c:"#4ade80"},
  {cat:"💪 Pré-training",items:[{n:"Caféine",d:"100-200mg",t:"si fatigue — café ou comprimé"},{n:"L-Carnitine",d:"2g",t:"favorise l'utilisation des graisses"},{n:"Brûleur de graisse",d:"selon produit",t:"thermogénique"},{n:"Créatine",d:"5g",t:"monohydrate — force et volume"}],c:"#ff6b6b"},
  {cat:"🏋️ Pendant",items:[{n:"BCAAs",d:"5g",t:"dans 1L d'eau minérale"}],c:"#f97316"},
  {cat:"🤸 Post-training",items:[{n:"Whey isolate",d:"30g",t:"+ 1 compote de pomme"}],c:"#8b5cf6"},
  {cat:"🌙 Soir",items:[{n:"Oméga-3",d:"1 cachet",t:"avec le dîner"},{n:"Ashwagandha KSM-66",d:"600mg",t:"anti-cortisol + sommeil"},{n:"Magnésium glycinate",d:"400mg",t:"30 min avant coucher"}],c:"#88f"},
];

function generatePlan() {
  const days = [], start = new Date(2026, 3, 1);
  const tpl = [
    {type:"pecs-triceps",label:"Pecs / Triceps + Cardio",icon:"🏋️"},
    {type:"calisthenics",label:"Calisthenics (ami)",icon:"💪"},
    {type:"epaules-biceps",label:"Épaules / Biceps / Abdos + Cardio",icon:"🏋️"},
    {type:"cardio-social",label:"Cardio + Sortie",icon:"🍸"},
    {type:"rest",label:"Repos actif",icon:"😴"},
    {type:"jambes",label:"Jambes + Cardio",icon:"🦵"},
    {type:"dos-pecs-abdos",label:"Dos / Pecs / Abdos",icon:"🏋️"},
  ];
  for (let i = 0; i < 30; i++) {
    const d = new Date(start); d.setDate(d.getDate() + i);
    const wn = Math.floor(i / 7), dw = i % 7, t = tpl[dw];
    let f = "Alimentation normale — 5 repas + collations (~2250 kcal)";
    if (wn < 2 && dw === 4) f = "⚡ JEÛNE 36h commence ce soir à 20h";
    if (wn < 2 && dw === 5) f = "⚡ JEÛNE 36h — Eau, café noir, électrolytes. Remanges demain 12h.";
    if (wn < 2 && dw === 6) f = "⚡ Fin jeûne 36h à 12h — Premier repas léger";
    const wp = ["Semaine 1 — Mise en route","Semaine 2 — Montée en charge","Semaine 3 — Intensification","Semaine 4 — Push final"][wn];
    days.push({num:i+1,date:d,ds:d.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"}),wp,...t,wk:WK[t.type],f});
  }
  return days;
}

const PLAN = generatePlan();

// Storage helpers using localStorage
function loadProgress() {
  try { const d = localStorage.getItem("wm-progress"); return d ? JSON.parse(d) : {}; }
  catch(e) { return {}; }
}
function saveProgress(data) {
  try { localStorage.setItem("wm-progress", JSON.stringify(data)); } catch(e) {}
}

export default function App() {
  const [sel, setSel] = useState(() => {
    const d = Math.floor((new Date() - new Date(2026,3,1)) / 864e5);
    return d >= 0 && d < 30 ? d : 0;
  });
  const [done, setDone] = useState(loadProgress);
  const [tab, setTab] = useState("plan");
  const [vm, setVm] = useState("detail");
  const [gl, setGl] = useState(null);

  const tog = useCallback((dn, ei) => {
    setDone(p => {
      const k = `${dn}-${ei}`, u = {...p, [k]: !p[k]};
      saveProgress(u); return u;
    });
  }, []);

  const togAll = useCallback((dn, n) => {
    setDone(p => {
      const all = Array.from({length:n},(_,i)=>p[`${dn}-${i}`]).every(Boolean);
      const u = {...p};
      for (let i = 0; i < n; i++) u[`${dn}-${i}`] = !all;
      saveProgress(u); return u;
    });
  }, []);

  const dp = (dn, n) => { let c = 0; for (let i = 0; i < n; i++) if (done[`${dn}-${i}`]) c++; return c; };
  const dc = (dn, n) => { for (let i = 0; i < n; i++) if (!done[`${dn}-${i}`]) return false; return n > 0; };

  const tot = PLAN.reduce((s,d) => s + d.wk.exercises.length, 0);
  const td = Object.values(done).filter(Boolean).length;
  const pp = Math.round(td / tot * 100);
  const ti = PLAN.findIndex(d => d.date.toDateString() === new Date().toDateString());
  const cd = PLAN[sel], wk = cd.wk;

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Instrument+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { font-size: 16px; }
        .app {
          font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
          background: #0a0a0a; color: #e8e8e8;
          min-height: 100vh; min-height: 100dvh;
          line-height: 1.5;
          max-width: 600px; margin: 0 auto;
          -webkit-tap-highlight-color: transparent;
        }
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#111}::-webkit-scrollbar-thumb{background:#333;border-radius:3px}
        @keyframes su{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .db{border:1px solid #222;background:#111;color:#888;width:100%;aspect-ratio:1;border-radius:6px;cursor:pointer;font-size:11px;font-family:inherit;transition:all .15s;display:flex;align-items:center;justify-content:center;position:relative;-webkit-tap-highlight-color:transparent}
        .db:hover,.db:active{border-color:#f5c518;color:#f5c518}
        .db.a{border-color:#f5c518;background:#f5c518;color:#0a0a0a;font-weight:700}
        .db.c{background:#1a2e1a;border-color:#2d5a2d;color:#4ade80}.db.c.a{background:#f5c518;color:#0a0a0a}
        .db.t::after{content:'';position:absolute;bottom:2px;width:4px;height:4px;border-radius:50%;background:#f5c518}
        .tb{background:none;border:none;color:#555;font-family:inherit;font-size:10px;padding:10px 10px;cursor:pointer;border-bottom:2px solid transparent;transition:all .15s;text-transform:uppercase;letter-spacing:.5px;white-space:nowrap;-webkit-tap-highlight-color:transparent}
        .tb:hover,.tb:active{color:#aaa}.tb.a{color:#f5c518;border-bottom-color:#f5c518}
        .er{display:grid;grid-template-columns:28px 1fr auto auto;gap:6px;padding:10px 12px;border-bottom:1px solid #1a1a1a;animation:su .3s ease forwards;opacity:0;align-items:start}
        .er:active{background:#141414}
        .xb{width:24px;height:24px;border-radius:4px;border:2px solid #333;background:none;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;font-size:12px;color:transparent;margin-top:1px;flex-shrink:0;-webkit-tap-highlight-color:transparent}
        .xb:active{border-color:#4ade80}.xb.d{border-color:#4ade80;background:#4ade80;color:#0a0a0a}
        .mt{display:inline-block;padding:1px 5px;border-radius:2px;font-size:8px;letter-spacing:.3px;margin-right:3px;margin-top:3px}
        .cd{background:#111;border:1px solid #1a1a1a;border-radius:8px;padding:16px}
        .pf{height:4px;background:linear-gradient(90deg,#f5c518,#4ade80);border-radius:2px;transition:width .5s}
        .vt{background:#111;border:1px solid #222;color:#888;padding:6px 12px;border-radius:4px;font-family:inherit;font-size:11px;cursor:pointer;transition:all .15s;-webkit-tap-highlight-color:transparent}
        .vt.a{background:#f5c518;color:#0a0a0a;border-color:#f5c518}
        .nb{flex:1;background:#111;border:1px solid #222;color:#888;padding:12px;border-radius:6px;cursor:pointer;font-family:inherit;font-size:12px;transition:all .15s;-webkit-tap-highlight-color:transparent}
        .nb:active{border-color:#444;color:#ccc}.nb:disabled{opacity:.3}
        .gd{background:#080f08;border:1px solid #1a2a1a;border-radius:6px;padding:10px 12px;margin:4px 0 8px 30px;font-size:11px;color:#8b8;line-height:1.7;animation:su .2s ease}
        .tg{display:inline-block;padding:2px 8px;border-radius:3px;font-size:10px}
        .ab{background:none;border:1px solid #333;color:#888;padding:6px 12px;border-radius:4px;font-family:inherit;font-size:10px;cursor:pointer;text-transform:uppercase;letter-spacing:.4px;-webkit-tap-highlight-color:transparent}
        .ab:active{border-color:#4ade80;color:#4ade80}.ab.d{border-color:#4ade80;background:#1a2e1a;color:#4ade80}
        .ml{background:#0a0a12;border:1px solid #1a1a2a;border-radius:6px;padding:12px 14px;margin-bottom:6px}
        @media (max-width: 380px) {
          .db { font-size: 10px; border-radius: 4px; }
          .er { grid-template-columns: 26px 1fr auto; padding: 8px 10px; }
          .er > div:last-child { display: none; }
        }
      `}</style>

      {/* Header */}
      <div style={{padding:"24px 20px 16px",borderBottom:"1px solid #1a1a1a"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div>
            <h1 style={{fontFamily:"'Instrument Sans',sans-serif",fontSize:24,fontWeight:700,color:"#f5c518",letterSpacing:"-.5px"}}>WAR MACHINE</h1>
            <p style={{color:"#555",fontSize:11,marginTop:3}}>89kg → ~82kg · ~20% → 13-14% BF · 30j</p>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:28,fontWeight:700,color:td>0?"#4ade80":"#333"}}>{pp}<span style={{fontSize:13,color:"#555"}}>%</span></div>
            <div style={{fontSize:10,color:"#555"}}>{td}/{tot}</div>
          </div>
        </div>
        <div style={{background:"#1a1a1a",borderRadius:2,height:5,overflow:"hidden"}}><div className="pf" style={{width:`${pp}%`}}/></div>
      </div>

      {/* Tabs */}
      <div style={{display:"flex",borderBottom:"1px solid #1a1a1a",padding:"0 8px",overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
        {[{id:"plan",l:"Programme"},{id:"glossary",l:"Glossaire"},{id:"nutrition",l:"Nutrition"},{id:"supps",l:"Supps"},{id:"rules",l:"Règles"}].map(t=>
          <button key={t.id} className={`tb ${tab===t.id?"a":""}`} onClick={()=>setTab(t.id)}>{t.l}</button>
        )}
      </div>

      <div style={{padding:"16px 18px 100px"}}>

      {tab==="plan"&&<>
        <div style={{marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <span style={{fontSize:10,color:"#555",textTransform:"uppercase",letterSpacing:1}}>Avril 2026</span>
            <div style={{display:"flex",gap:4}}>
              <button className={`vt ${vm==="detail"?"a":""}`} onClick={()=>setVm("detail")}>Détail</button>
              <button className={`vt ${vm==="calendar"?"a":""}`} onClick={()=>setVm("calendar")}>Liste</button>
            </div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:4}}>
            {["L","M","M","J","V","S","D"].map((d,i)=><div key={i} style={{textAlign:"center",fontSize:10,color:"#444",padding:"4px 0"}}>{d}</div>)}
            <div/><div/>
            {PLAN.map((d,i)=><button key={i} className={`db ${sel===i?"a":""} ${dc(d.num,d.wk.exercises.length)?"c":""} ${ti===i?"t":""}`}
              onClick={()=>{setSel(i);setVm("detail");}}>{d.num}</button>)}
          </div>
          <div style={{marginTop:8,display:"flex",gap:10,flexWrap:"wrap",fontSize:10,color:"#666"}}>
            <span>🏋️ Muscu</span><span>💪 Cali</span><span>🦵 Jambes</span><span>🍸 Sortie</span><span>😴 Repos</span>
          </div>
        </div>

        {vm==="calendar"?
          <div style={{display:"flex",flexDirection:"column",gap:2}}>
            {PLAN.map((d,i)=>{const p=dp(d.num,d.wk.exercises.length),c=p===d.wk.exercises.length&&p>0;return(
              <div key={i} onClick={()=>{setSel(i);setVm("detail");}}
                style={{display:"grid",gridTemplateColumns:"30px 20px 1fr auto",gap:8,alignItems:"center",padding:"9px 10px",
                  background:sel===i?"#151508":"transparent",borderRadius:6,cursor:"pointer",
                  borderLeft:ti===i?"2px solid #f5c518":"2px solid transparent"}}>
                <span style={{fontSize:11,color:"#555"}}>J{d.num}</span>
                <span style={{fontSize:13}}>{d.icon}</span>
                <span style={{fontSize:11,color:c?"#4ade80":"#bbb"}}>{d.label}</span>
                <span style={{fontSize:10,color:c?"#4ade80":"#555"}}>{p}/{d.wk.exercises.length}</span>
              </div>);})}
          </div>
        :
          <div style={{animation:"su .3s ease"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
              <div>
                <div style={{fontSize:10,color:"#f5c518",textTransform:"uppercase",letterSpacing:1,marginBottom:3}}>{cd.wp}</div>
                <h2 style={{fontFamily:"'Instrument Sans',sans-serif",fontSize:16,fontWeight:600,color:"#fff"}}>
                  {cd.icon} J{cd.num} — {cd.ds}
                </h2>
              </div>
              <button className={`ab ${dc(cd.num,wk.exercises.length)?"d":""}`} onClick={()=>togAll(cd.num,wk.exercises.length)}>
                {dc(cd.num,wk.exercises.length)?"✓ Fait":"Tout ✓"}
              </button>
            </div>

            <div style={{background:cd.f.includes("36h")?"#1a1208":"#081208",
              border:`1px solid ${cd.f.includes("36h")?"#3a2a10":"#1a2a1a"}`,
              borderRadius:6,padding:"10px 14px",marginBottom:12,fontSize:12}}>{cd.f}</div>

            <div style={{background:"#111",border:"1px solid #1a1a1a",borderRadius:8,overflow:"hidden",marginBottom:12}}>
              <div style={{padding:"12px 14px",borderBottom:"1px solid #1a1a1a",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:6}}>
                <h3 style={{fontFamily:"'Instrument Sans',sans-serif",fontSize:14,fontWeight:600}}>{wk.title}</h3>
                <div style={{display:"flex",gap:5}}>
                  <span className="tg" style={{background:"#1a1a2a",color:"#88f"}}>{wk.duration}</span>
                  <span className="tg" style={{background:"#2a1a1a",color:"#f88"}}>{wk.calories}</span>
                </div>
              </div>
              {wk.exercises.map((e,i)=>{
                const dn=done[`${cd.num}-${i}`],hg=GLOSSARY[e.name],go=gl===`${cd.num}-${i}`;
                const isShoulder=e.muscles.includes("epaules");
                return(<div key={i}>
                  <div className="er" style={{animationDelay:`${i*.04}s`,opacity:dn?.4:undefined,borderLeft:isShoulder?"2px solid #f59e0b":"2px solid transparent"}}>
                    <button className={`xb ${dn?"d":""}`} onClick={()=>tog(cd.num,i)}>{dn?"✓":""}</button>
                    <div>
                      <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
                        <span style={{fontSize:12,fontWeight:500,color:dn?"#555":"#ddd",textDecoration:dn?"line-through":"none"}}>{e.name}</span>
                        {hg&&<button onClick={()=>setGl(go?null:`${cd.num}-${i}`)}
                          style={{background:"none",border:"1px solid #333",borderRadius:3,color:go?"#4ade80":"#555",
                            fontSize:9,padding:"1px 5px",cursor:"pointer",fontFamily:"inherit"}}>?</button>}
                      </div>
                      {e.notes&&<div style={{fontSize:10,color:"#666",marginTop:2}}>{e.notes}</div>}
                      <div style={{marginTop:3}}>
                        {(e.muscles||[]).map(m=>{const md=M[m];return md?<span key={m} className="mt" style={{background:md.c+"22",color:md.c}}>{md.l}</span>:null;})}
                      </div>
                    </div>
                    <div style={{fontSize:12,color:"#f5c518",fontWeight:500,whiteSpace:"nowrap"}}>{e.sets}</div>
                    <div style={{fontSize:10,color:"#555",whiteSpace:"nowrap"}}>{e.rest}</div>
                  </div>
                  {go&&hg&&<div className="gd">{hg}</div>}
                </div>);
              })}
            </div>

            {wk.socialNote&&<div style={{background:"#1a1508",border:"1px solid #3a3010",borderRadius:6,padding:"10px 14px",marginBottom:12,fontSize:12,color:"#dda"}}>{wk.socialNote}</div>}

            <div style={{display:"flex",gap:8}}>
              <button className="nb" onClick={()=>setSel(Math.max(0,sel-1))} disabled={sel===0}>← Précédent</button>
              <button className="nb" onClick={()=>setSel(Math.min(29,sel+1))} disabled={sel===29}>Suivant →</button>
            </div>
          </div>
        }
      </>}

      {tab==="glossary"&&
        <div style={{display:"flex",flexDirection:"column",gap:2,animation:"su .3s ease"}}>
          <p style={{fontSize:11,color:"#888",marginBottom:12,borderLeft:"2px solid #f5c518",paddingLeft:12}}>
            Chaque exercice expliqué. Le bouton <span style={{border:"1px solid #555",borderRadius:3,padding:"1px 5px",fontSize:9}}>?</span> apparaît aussi dans le programme.
          </p>
          {Object.entries(GLOSSARY).sort((a,b)=>a[0].localeCompare(b[0])).map(([n,d],i)=>
            <details key={i} style={{borderBottom:"1px solid #1a1a1a"}}>
              <summary style={{padding:"10px 0",fontSize:12,color:"#ddd",cursor:"pointer"}}><span style={{color:"#f5c518",marginRight:6}}>▸</span>{n}</summary>
              <div style={{padding:"0 0 10px 18px",fontSize:11,color:"#999",lineHeight:1.7}}>{d}</div>
            </details>
          )}
        </div>
      }

      {tab==="nutrition"&&
        <div style={{display:"flex",flexDirection:"column",gap:12,animation:"su .3s ease"}}>
          <div className="cd" style={{borderColor:"#2a2a1a"}}>
            <h3 style={{fontSize:13,fontWeight:600,marginBottom:8,color:"#f5c518",fontFamily:"'Instrument Sans',sans-serif"}}>📊 Total journalier</h3>
            <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8}}>
              {[{l:"Kcal",v:"~2250",c:"#f5c518"},{l:"Prot",v:"185g",c:"#ff6b6b"},{l:"Glu",v:"205g",c:"#4ade80"},{l:"Lip",v:"60g",c:"#88f"}].map((m,i)=>
                <div key={i} style={{textAlign:"center"}}><div style={{fontSize:15,fontWeight:700,color:m.c}}>{m.v}</div><div style={{fontSize:9,color:"#666"}}>{m.l}</div></div>
              )}
            </div>
          </div>
          {MEALS.map((m,i)=>(
            <div key={i} className="ml">
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
                <div><span style={{fontSize:12,fontWeight:600,color:"#fff"}}>{m.name}</span><span style={{fontSize:10,color:"#666",marginLeft:8}}>{m.time}</span></div>
                {m.cal!=="—"&&<span style={{fontSize:10,color:"#f5c518",fontWeight:600}}>{m.cal}</span>}
              </div>
              <p style={{fontSize:11,color:"#bbb",lineHeight:1.6}}>{m.detail}</p>
              {m.macros&&<p style={{fontSize:10,color:"#666",marginTop:3}}>{m.macros}</p>}
              {m.supps&&<p style={{fontSize:10,color:"#f59e0b",marginTop:3}}>💊 {m.supps}</p>}
            </div>
          ))}
          <div className="cd">
            <h3 style={{fontSize:12,fontWeight:600,marginBottom:6,color:"#dda",fontFamily:"'Instrument Sans',sans-serif"}}>🍸 Samedi soir</h3>
            <p style={{fontSize:11,color:"#999"}}>Mange normalement la journée. Tequila/vodka soda &gt; bière. 1 eau entre chaque. Max 4. Pas de kebab — fromage blanc ou œufs.</p>
          </div>
          <div className="cd">
            <h3 style={{fontSize:12,fontWeight:600,marginBottom:6,color:"#88f",fontFamily:"'Instrument Sans',sans-serif"}}>🛒 Courses semaine</h3>
            <div style={{fontSize:11,color:"#999",columns:2,gap:16}}>
              {["Poulet/dinde ×1kg","Poisson blanc ×500g","Œufs ×18","Viande rouge 5% ×500g","Whey isolate","Avoine instantanée","Riz basmati 1kg","Patate douce","Brocoli/haricots verts","Tomates/concombres","Amandes ×200g","Huile de coco bio","Compotes de pomme","Cannelle de Ceylan","Raisins secs","Fruits frais"].map((it,i)=>
                <div key={i} style={{padding:"3px 0"}}>· {it}</div>
              )}
            </div>
          </div>
        </div>
      }

      {tab==="supps"&&
        <div style={{display:"flex",flexDirection:"column",gap:14,animation:"su .3s ease"}}>
          <p style={{fontSize:11,color:"#888",borderLeft:"2px solid #f5c518",paddingLeft:12}}>Programme coach + ajouts sommeil/récupération.</p>
          {SUPPS_ALL.map((s,si)=>
            <div key={si} className="cd">
              <h3 style={{fontSize:12,fontWeight:600,marginBottom:10,color:s.c,fontFamily:"'Instrument Sans',sans-serif"}}>{s.cat}</h3>
              {s.items.map((it,j)=><div key={j} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:j<s.items.length-1?"1px solid #1a1a1a":"none"}}>
                <div><span style={{fontSize:12,fontWeight:500}}>{it.n}</span><span style={{fontSize:10,color:"#666",marginLeft:8}}>{it.t}</span></div>
                <span style={{fontSize:12,color:s.c,fontWeight:700}}>{it.d}</span>
              </div>)}
            </div>
          )}
          <div className="cd" style={{borderColor:"#2a2a1a"}}>
            <h3 style={{fontSize:12,fontWeight:600,marginBottom:8,color:"#f5c518",fontFamily:"'Instrument Sans',sans-serif"}}>💰 Budget</h3>
            <div style={{fontSize:11,color:"#999"}}>
              {[["Whey isolate 1kg","~35€"],["Multivitamines","~12€"],["Oméga-3 120caps","~15€"],["CLA 90caps","~15€"],["BCAAs 300g","~18€"],
                ["L-Carnitine 90caps","~15€"],["Brûleur de graisse","~25€"],["Créatine 500g","~15€"],["Ashwagandha 60caps","~20€"],["Magnésium 60caps","~12€"]].map(([n,p],i)=>
                <div key={i} style={{display:"flex",justifyContent:"space-between",padding:"3px 0"}}><span>{n}</span><span>{p}</span></div>
              )}
              <div style={{display:"flex",justifyContent:"space-between",padding:"8px 0 0",borderTop:"1px solid #333",fontWeight:700,color:"#f5c518"}}><span>Total</span><span>~182€</span></div>
            </div>
          </div>
        </div>
      }

      {tab==="rules"&&
        <div style={{display:"flex",flexDirection:"column",gap:14,animation:"su .3s ease"}}>
          {[
            {t:"📅 Semaine type",c:"#f5c518",i:[["Mercredi","Pecs / Triceps + 30min cardio"],["Jeudi","Calisthenics avec ton pote"],["Vendredi","Épaules / Biceps / Abdos + 30min cardio"],["Samedi","Cardio léger + sortie"],["Dimanche","Repos actif (marche)"],["Lundi","Jambes + 30min cardio"],["Mardi","Dos / Pecs / Abdos"]]},
            {t:"⚙️ Training",c:"#f59e0b",i:[["Volume","5×12 sur la plupart des exos"],["Repos","1 min entre les séries. Chronomètre."],["Technique","Contrôlé, pas d'élan. Descente 2-3s."],["Cardio","3×30min post-training (mer/ven/lun)"],["Progression","+2.5kg quand 12 reps faciles"]]},
            {t:"😴 Sommeil",c:"#88f",i:[["7-8h minimum","Non négociable"],["Caféine < 14h","Demi-vie 5-6h"],["Ashwagandha + Magnésium","30 min avant coucher"],["Chambre","18°C, obscure, silencieuse"]]},
            {t:"⚡ Jeûne (sem 1-2)",c:"#ff6b6b",i:[["Dim soir → Mar midi","36h. Eau, café noir, électrolytes."],["Pas de muscu pendant","Marche uniquement."],["Sem 3-4","Plus de jeûne. Nutrition normale."]]},
            {t:"📊 Progression",c:"#4ade80",i:[["Semaine 1","2-3kg (eau+glycogène). ~87kg."],["Semaine 2","~1kg gras. ~85-86kg."],["Semaine 3","~0.8kg. ~84-85kg. Épaules se dessinent."],["Semaine 4","~0.5-0.8kg. ~82-83kg. V-shape visible."],["Objectif","82-83kg · 13-14% BF"]]},
            {t:"🍸 Samedi",c:"#dda",i:[["Journée","Mange normalement. Protéines."],["Bar","Tequila/vodka soda > bière. 1 eau entre chaque. Max 4."],["Rentrée","Pas de kebab. Fromage blanc ou œufs."]]},
            {t:"🚫 Erreurs",c:"#ef4444",i:[["Balance tous les jours","1×/semaine matin à jeun."],["Sauter les protéines","185g/jour."],["Repos trop long","1 min. Pas 3 min sur le tel."],["5 bières","= 750 kcal = 1 jour annulé."],["Zapper le cardio","3×30min fait la différence."]]},
          ].map((s,i)=>
            <div key={i} className="cd">
              <h3 style={{fontSize:12,fontWeight:600,marginBottom:10,color:s.c,fontFamily:"'Instrument Sans',sans-serif"}}>{s.t}</h3>
              {s.i.map(([t,d],j)=><p key={j} style={{fontSize:11,color:"#bbb",marginBottom:6}}><strong style={{color:s.c==="#ef4444"?"#f88":"#fff"}}>{t}</strong> — {d}</p>)}
            </div>
          )}
        </div>
      }
      </div>
    </div>
  );
}
