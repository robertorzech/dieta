import { useState, useEffect, useCallback } from "react";

const MEALS_DB = {
  posilek1: [
    { id: "p1_1", name: "Kanapki z jajkiem i hummusem", kcal: 698, b: 40, w: 67, t: 33, ingredients: "Chleb żytni razowy 90g, Hummus 50g, Jajka 4szt, Rukola 30g, Papryka czerwona 170g", steps: "Jajka gotuj na twardo ~8 min. Chleb posmaruj hummusem. Ułóż sałatę, plastry jajka i paprykę." },
    { id: "p1_2", name: "Owsianka z mango oraz marakują", kcal: 707, b: 36, w: 98, t: 22, ingredients: "Płatki owsiane 40g, Mleko 1.5% 150g, Skyr waniliowy 225g, Mango 50g, Marakuja 3szt, Wiórki kokosowe 24g", steps: "Płatki zalej ciepłym mlekiem na 10 min. Pokrój owoce. Dodaj skyr, ułóż owoce, posyp wiórkami." },
    { id: "p1_3", name: "Waniliowa owsianka z bananem oraz kiwi", kcal: 695, b: 44, w: 90, t: 21, ingredients: "Mleko 1.5% 125g, Płatki owsiane 40g, Erytrol 5g, Wanilia 1.5g, Banan 120g, Kiwi 75g, Jogurt skyr 225g, Migdały 30g", steps: "Gotuj płatki z mlekiem. Dodaj erytrol, wanilię i skyr. Na wierzch ułóż migdały, banana i kiwi." },
    { id: "p1_4", name: "Shake snickers", kcal: 719, b: 43, w: 67, t: 32, ingredients: "Mleko 1.5% 375g, Odżywka białkowa 25g, Kakao 5g, Lód 20g, Masło orzechowe 10g, Czekolada gorzka 30g, Orzechy włoskie 5g, Płatki owsiane 40g", steps: "Zblenduj mleko, odżywkę, kakao, lód, masło orzechowe, płatki. Oblej szklankę czekoladą. Wlej shake, posyp orzechami." },
    { id: "p1_5", name: "Tost z szynką, serem i warzywami", kcal: 690, b: 42, w: 75, t: 24, ingredients: "Chleb żytni razowy 120g, Szynka z kurczaka 40g, Mozzarella 120g, Pomidor 160g, Rzodkiewka 60g, Szczypiorek 5g", steps: "Na pieczywie ułóż mozzarellę i szynkę. Zapiekaj 6 min w 180°C. Dodaj pomidora, rzodkiewkę i szczypiorek." },
    { id: "p1_6", name: "Tosty francuskie z szynką i warzywami", kcal: 701, b: 39, w: 76, t: 30, ingredients: "Jajko 56g, Mleko 30g, Chleb żytni razowy 120g, Oliwa 20g, Szynka z indyka 120g, Pomidor 160g, Ogórek 75g, Rzodkiewka 60g, Szczypiorek 15g", steps: "Jajko wymieszaj z mlekiem, solą i pieprzem. Namocz chleb i usmaż na oliwie. Ułóż wędlinę i warzywa." },
    { id: "p1_7", name: "Kanapki z szynką z indyka, hummusem i warzywami", kcal: 707, b: 49, w: 86, t: 23, ingredients: "Chleb żytni razowy 120g, Hummus 60g, Szynka z indyka 60g, Pomidor 160g, Ogórek 75g, Serek wiejski 200g", steps: "Na pieczywo nałóż hummus i szynkę. Pokrój warzywa i ułóż na kanapce. Do posiłku zjedz serek wiejski." },
  ],
  posilek2: [
    { id: "p2_1", name: "Kebab z grilla", kcal: 806, b: 44, w: 93, t: 28, ingredients: "Tortilla pełnoziarnista 2szt, Pierś kurczaka 150g, Ogórek 150g, Papryka czerwona 170g, Miks sałat 50g, Ketchup 40g, Oliwa 12.5g, Sos BBQ 25g, Papryka wędzona, ostra", steps: "Zamarynuj mięso (oliwa, sos BBQ, papryka). Grilluj 15 min. Pokrój warzywa. Ułóż na tortilli z sałatą i ketchupem." },
    { id: "p2_2", name: "Makaron z indykiem i suszonymi pomidorami", kcal: 808, b: 46, w: 77, t: 33, ingredients: "Pierś indyka 150g, Pomidory suszone 30g, Szpinak 25g, Cebula czerwona 40g, Czosnek 6g, Makaron pełnoziarnisty 100g, Oliwa 25g", steps: "Pokrój mięso w paski. Ugotuj makaron. Podsmaż cebulę, czosnek i pomidory. Dodaj mięso na 6-8 min, potem szpinak. Wymieszaj z makaronem." },
    { id: "p2_3", name: "Tortilla z kurczakiem", kcal: 814, b: 47, w: 80, t: 33, ingredients: "Pierś kurczaka 150g, Przyprawa gyros, Oliwa 5g, Tortilla pełnoziarnista 2szt, Papryka 85g, Pomidor 160g, Ogórek 75g, Jogurt 80g, Majonez 15g, Czosnek 6g, Miks sałat 40g", steps: "Pokrój kurczaka, posyp gyrosem. Smaż 6-8 min. Zrób sos (jogurt + majonez + czosnek + cytryna). Ułóż na tortilli z warzywami." },
    { id: "p2_4", name: "Pinsa z cukinią oraz burratą", kcal: 819, b: 37, w: 117, t: 21, ingredients: "Pinsa 230g, Passata pomidorowa 100g, Bazylia suszona, Cukinia 150g, Szynka parmeńska 45g, Burrata 40g", steps: "Nagrzej piekarnik do 250°C. Pokrój cukinię. Posmaruj pinsę passatą, ułóż cukinię. Zapiekaj 5 min, dodaj szynkę i burratę na 1 min." },
    { id: "p2_5", name: "Kurczak na parze z warzywami i ryżem", kcal: 787, b: 42, w: 84, t: 33, ingredients: "Pierś kurczaka 150g, Tymianek, Marchew 80g, Brokuł 100g, Ryż biały 90g, Oliwa 30g", steps: "Ugotuj ryż. Obsyp mięso tymiankiem. Gotuj na parze 20 min z warzywami. Podaj z oliwą." },
    { id: "p2_6", name: "Makaron z pieczarkami w sosie śmietanowym", kcal: 789, b: 37, w: 84, t: 33, ingredients: "Makaron pełnoziarnisty 80g, Szpinak 75g, Śmietanka 12% 150g, Czosnek 6g, Cebula 65g, Pieczarki 200g, Grana Padano 20g, Brokuł 200g, Pomidorki koktajlowe 100g, Oliwa 5g", steps: "Ugotuj makaron i brokuły. Podsmaż cebulę, czosnek i pieczarki. Wlej śmietanę. Dodaj brokuły, szpinak, pomidorki. Wymieszaj z makaronem, posyp serem." },
    { id: "p2_7", name: "Leczo z kurczakiem", kcal: 785, b: 41, w: 89, t: 31, ingredients: "Pierś kurczaka 125g, Pomidory z puszki 300g, Koncentrat pomidorowy 25g, Papryka 170g, Cukinia 100g, Bazylia, Oliwa 25g, Ryż basmati 70g", steps: "Ugotuj ryż. Podsmaż cukinię i paprykę na oliwie. Dodaj pomidory z puszki. Duś 10 min z bulionem. Dodaj kurczaka w kostkę na 15 min." },
  ],
  posilek3: [
    { id: "p3_1", name: "Kakaowa kokosanka", kcal: 698, b: 41, w: 32, t: 47, ingredients: "Mleczko kokosowe 12% 200g, Nasiona chia 10g, Siemię lniane 10g, Wiórki kokosowe 12g, Kakao 5g, Wanilia 1.5g, Jogurt skyr 75g, Migdały 10g, Borówki 50g, Odżywka białkowa 30g", steps: "W rondelku wymieszaj mleczko kokosowe z chia, siemieniem, wiórkami, kakao, wanilią i odżywką. Zagotuj, gotuj 4 min. Podaj z jogurtem, owocami i migdałami." },
    { id: "p3_2", name: "Kanapka z jajkiem", kcal: 692, b: 35, w: 77, t: 31, ingredients: "Chleb żytni razowy 120g, Serek śmietankowy 50g, Jajka 3szt, Pomidor 160g, Rzodkiewka 90g, Rukola 50g, Szczypiorek 10g", steps: "Ugotuj jajka na twardo 8 min. Posmaruj chleb serkiem. Ułóż rukolę, jajka, pomidora, rzodkiewkę. Posyp szczypiorkiem." },
    { id: "p3_3", name: "Koktajl malinowy", kcal: 705, b: 43, w: 94, t: 26, ingredients: "Maliny 400g, Mleko 1.5% 250g, Jogurt skyr 150g, Siemię lniane 10g, Masło orzechowe 30g, Płatki owsiane 25g", steps: "Zblenduj wszystkie składniki. W razie potrzeby dodaj wody." },
    { id: "p3_4", name: "Tost z mozzarellą oraz szynką z kurczaka", kcal: 695, b: 45, w: 70, t: 24, ingredients: "Chleb żytni razowy 120g, Mozzarella kulka 120g, Szynka z kurczaka 60g, Pomidorki koktajlowe 160g", steps: "Na chleb ułóż mozzarellę i szynkę. Podpiekaj na patelni 3 min pod przykryciem z każdej strony. Podaj z pomidorkami." },
    { id: "p3_5", name: "Wiosenny serek wiejski z pieczywem", kcal: 702, b: 47, w: 82, t: 24, ingredients: "Serek wiejski 300g, Ogórek 75g, Papryka czerwona 85g, Rzodkiewka 60g, Szczypiorek 10g, Chleb żytni razowy 120g, Masło extra 10g", steps: "Pokrój warzywa i wymieszaj z serkiem. Podaj z pieczywem posmarowanym masłem." },
    { id: "p3_6", name: "Dutch baby z owocami", kcal: 699, b: 44, w: 79, t: 27, ingredients: "Mąka pełnoziarnista 60g, Mleko 1.5% 125g, Jajka 2szt, Erytrol 15g, Olej rzepakowy 5g, Wanilia, Jogurt skyr 120g, Masło orzechowe 15g, Borówki 100g, Truskawki 50g", steps: "Nagrzej piekarnik do 210°C z patelnią. Wymiksuj ciasto. Wlej na natłuszczoną patelnię. Piecz 10 min. Nałóż skyr z masłem orzechowym i owoce." },
    { id: "p3_7", name: "Czekoladowe smoothie", kcal: 661, b: 43, w: 71, t: 25, ingredients: "Mleko roślinne 375g, Kakao 15g, Masło orzechowe 25g, Erytrol 15g, Odżywka białkowa 40g, Płatki owsiane 30g", steps: "Wszystkie składniki miksuj na gładkie smoothie. Dolej wody w razie potrzeby." },
  ],
  przekaska: [
    { id: "pk_1", name: "Gruszka", kcal: 203, b: 2, w: 50, t: 1, ingredients: "Gruszka – 2 sztuki (350g)", steps: "Zjedz jako przekąskę." },
    { id: "pk_2", name: "Mieszanka orzechów", kcal: 212, b: 7, w: 8, t: 19, ingredients: "Mieszanka orzechów – 35g", steps: "Zjedz orzechy jako przekąskę." },
    { id: "pk_3", name: "Banan", kcal: 194, b: 2, w: 47, t: 1, ingredients: "Banan – 200g", steps: "Zjedz jako przekąskę." },
    { id: "pk_4", name: "Pudding proteinowy Valio + owoce", kcal: 193, b: 20, w: 21, t: 3, ingredients: "Pudding proteinowy czekoladowy Valio 180g, Kiwi 75g", steps: "Zjedz pudding z owocami jako przekąskę." },
    { id: "pk_5", name: "Owsianka Lubella + orzechy", kcal: 190, b: 6, w: 21, t: 10, ingredients: "Owsianka Lubella z bananami i kakao 100g, Orzechy nerkowca 20g", steps: "Zjedz owsiankę z orzechami jako przekąskę." },
    { id: "pk_6", name: "Owolowo tropikalnie + orzechy", kcal: 192, b: 3, w: 23, t: 9, ingredients: "Owolowo tropikalnie 200g, Orzechy włoskie 15g", steps: "Zjedz mus z orzechami jako przekąskę." },
    { id: "pk_7", name: "Pieczona marchew z masłem orzechowym", kcal: 201, b: 6, w: 13, t: 16, ingredients: "Marchew 80g, Papryka ostra, Imbir, Kumin, Masło orzechowe 15g, Oliwa 5g, Sezam 2.5g", steps: "Pokrój marchew w słupki. Przygotuj sos (masło orzechowe, imbir, oliwa, papryka, kumin). Piecz w 180°C przez 25 min." },
  ],
};

const SLOT_LABELS = {
  posilek1: { label: "Posiłek 1", time: "7:00–10:00", icon: "☀️" },
  posilek2: { label: "Posiłek 2", time: "12:00–15:00", icon: "🍽️" },
  posilek3: { label: "Posiłek 3", time: "17:00–20:00", icon: "🌙" },
  przekaska: { label: "Przekąska", time: "dowolna pora", icon: "🍎" },
};

const DAYS = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"];
const FULL_DAYS = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

const STORAGE_KEY = "respo-meal-plan";

function getWeekId(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  return `${d.getFullYear()}-W${String(Math.round(((d - week1) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7) + 1).padStart(2, "0")}`;
}

function getMondayOfWeek(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export default function MealPlanner() {
  const [plan, setPlan] = useState({});
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);
  const [expandedSlot, setExpandedSlot] = useState(null);
  const [detailMeal, setDetailMeal] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const today = new Date();
  const monday = getMondayOfWeek(today);
  monday.setDate(monday.getDate() + currentWeekOffset * 7);
  const weekId = getWeekId(monday);

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(d.getDate() + i);
    return d;
  });

  const isToday = (dayIdx) => {
    const d = weekDates[dayIdx];
    return d.toDateString() === today.toDateString();
  };

  useEffect(() => {
    async function load() {
      try {
        const result = await window.storage.get(STORAGE_KEY);
        if (result && result.value) {
          setPlan(JSON.parse(result.value));
        }
      } catch {
        // no data yet
      }
      setLoaded(true);
    }
    load();
  }, []);

  const savePlan = useCallback(async (newPlan) => {
    setPlan(newPlan);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(newPlan));
    } catch (e) {
      console.error("Storage save error:", e);
    }
  }, []);

  const getSelection = (dayIdx, slot) => {
    const key = `${weekId}_${dayIdx}_${slot}`;
    return plan[key] || null;
  };

  const setSelection = (dayIdx, slot, mealId) => {
    const key = `${weekId}_${dayIdx}_${slot}`;
    const newPlan = { ...plan, [key]: mealId };
    savePlan(newPlan);
  };

  const clearSelection = (dayIdx, slot) => {
    const key = `${weekId}_${dayIdx}_${slot}`;
    const newPlan = { ...plan };
    delete newPlan[key];
    savePlan(newPlan);
  };

  const getMealById = (slot, mealId) => {
    return MEALS_DB[slot]?.find((m) => m.id === mealId) || null;
  };

  const getDayTotals = (dayIdx) => {
    let kcal = 0, b = 0, w = 0, t = 0, count = 0;
    for (const slot of Object.keys(SLOT_LABELS)) {
      const sel = getSelection(dayIdx, slot);
      if (sel) {
        const meal = getMealById(slot, sel);
        if (meal) {
          kcal += meal.kcal;
          b += meal.b;
          w += meal.w;
          t += meal.t;
          count++;
        }
      }
    }
    return { kcal, b, w, t, count };
  };

  const dayTotals = getDayTotals(selectedDay);

  if (!loaded) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", background: "#f5f7f2", fontFamily: "'DM Sans', sans-serif" }}>
        <div style={{ fontSize: 18, color: "#2d6a4f" }}>Ładowanie...</div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: 480, margin: "0 auto", minHeight: "100vh",
      background: "linear-gradient(180deg, #f5f7f2 0%, #eef2e8 100%)",
      fontFamily: "'DM Sans', sans-serif", position: "relative", overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1b4332 0%, #2d6a4f 50%, #40916c 100%)",
        padding: "20px 20px 24px", borderRadius: "0 0 28px 28px",
        boxShadow: "0 4px 24px rgba(27,67,50,0.25)",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, color: "#fff", fontWeight: 700, letterSpacing: -0.5 }}>
              Mój Plan
            </div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 2, letterSpacing: 1, textTransform: "uppercase" }}>
              ~2400 kcal · Redukcja
            </div>
          </div>
          <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
            <button onClick={() => setCurrentWeekOffset((o) => o - 1)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, width: 36, height: 36,
              color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}>‹</button>
            <button onClick={() => { setCurrentWeekOffset(0); setSelectedDay(today.getDay() === 0 ? 6 : today.getDay() - 1); }} style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, padding: "6px 12px",
              color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer", backdropFilter: "blur(8px)",
              fontFamily: "'DM Sans', sans-serif",
            }}>Dziś</button>
            <button onClick={() => setCurrentWeekOffset((o) => o + 1)} style={{
              background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 12, width: 36, height: 36,
              color: "#fff", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              backdropFilter: "blur(8px)",
            }}>›</button>
          </div>
        </div>

        {/* Day selector */}
        <div style={{ display: "flex", gap: 4, justifyContent: "space-between" }}>
          {DAYS.map((day, idx) => {
            const active = selectedDay === idx;
            const todayMark = isToday(idx);
            const dayNum = weekDates[idx].getDate();
            const totals = getDayTotals(idx);
            const filledRatio = totals.count / 4;
            return (
              <button key={idx} onClick={() => setSelectedDay(idx)} style={{
                flex: 1, border: "none", borderRadius: 14, padding: "8px 2px 6px",
                background: active ? "#fff" : "rgba(255,255,255,0.1)",
                color: active ? "#1b4332" : "rgba(255,255,255,0.85)",
                cursor: "pointer", transition: "all 0.2s ease", position: "relative",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
                fontFamily: "'DM Sans', sans-serif",
                boxShadow: active ? "0 2px 12px rgba(0,0,0,0.15)" : "none",
              }}>
                <span style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>{day}</span>
                <span style={{ fontSize: 16, fontWeight: 700 }}>{dayNum}</span>
                {/* Progress dots */}
                <div style={{ display: "flex", gap: 2, marginTop: 2 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{
                      width: 4, height: 4, borderRadius: "50%",
                      background: i < totals.count
                        ? (active ? "#2d6a4f" : "rgba(255,255,255,0.9)")
                        : (active ? "rgba(45,106,79,0.2)" : "rgba(255,255,255,0.2)"),
                    }} />
                  ))}
                </div>
                {todayMark && !active && <div style={{
                  position: "absolute", bottom: -2, left: "50%", transform: "translateX(-50%)",
                  width: 4, height: 4, borderRadius: "50%", background: "#95d5b2",
                }} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day title + totals */}
      <div style={{ padding: "16px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#1b4332" }}>{FULL_DAYS[selectedDay]}</div>
          <div style={{ fontSize: 12, color: "#52796f" }}>
            {weekDates[selectedDay].toLocaleDateString("pl-PL", { day: "numeric", month: "short" })}
          </div>
        </div>

        {dayTotals.count > 0 && (
          <div style={{
            marginTop: 10, background: "#fff", borderRadius: 16, padding: "12px 16px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
            boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: "#1b4332" }}>{dayTotals.kcal}</div>
              <div style={{ fontSize: 10, color: "#74796f", fontWeight: 500 }}>kcal</div>
            </div>
            <div style={{ width: 1, height: 28, background: "#e8ede4" }} />
            <MacroPill label="B" value={dayTotals.b} color="#2d6a4f" />
            <div style={{ width: 1, height: 28, background: "#e8ede4" }} />
            <MacroPill label="W" value={dayTotals.w} color="#d4a017" />
            <div style={{ width: 1, height: 28, background: "#e8ede4" }} />
            <MacroPill label="T" value={dayTotals.t} color="#c44536" />
            <div style={{ width: 1, height: 28, background: "#e8ede4" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: dayTotals.count === 4 ? "#2d6a4f" : "#95a392" }}>
                {dayTotals.count}/4
              </div>
              <div style={{ fontSize: 10, color: "#74796f" }}>posiłki</div>
            </div>
          </div>
        )}
      </div>

      {/* Meal slots */}
      <div style={{ padding: "12px 20px 120px", display: "flex", flexDirection: "column", gap: 10 }}>
        {Object.entries(SLOT_LABELS).map(([slotKey, slotInfo]) => {
          const selectedMealId = getSelection(selectedDay, slotKey);
          const selectedMeal = selectedMealId ? getMealById(slotKey, selectedMealId) : null;
          const isExpanded = expandedSlot === `${selectedDay}_${slotKey}`;

          return (
            <div key={slotKey} style={{
              background: "#fff", borderRadius: 18, overflow: "hidden",
              boxShadow: "0 1px 8px rgba(0,0,0,0.05)",
              border: selectedMeal ? "2px solid #b7e4c7" : "2px solid transparent",
              transition: "all 0.2s ease",
            }}>
              {/* Slot header */}
              <div style={{
                padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center",
                cursor: "pointer",
              }} onClick={() => {
                if (isExpanded) {
                  setExpandedSlot(null);
                } else {
                  setExpandedSlot(`${selectedDay}_${slotKey}`);
                }
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
                  <div style={{
                    width: 40, height: 40, borderRadius: 12,
                    background: selectedMeal ? "linear-gradient(135deg, #d8f3dc, #b7e4c7)" : "#f0f4ec",
                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0,
                  }}>
                    {selectedMeal ? "✓" : slotInfo.icon}
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: 11, color: "#74796f", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.5 }}>
                      {slotInfo.label} · {slotInfo.time}
                    </div>
                    {selectedMeal ? (
                      <div style={{ fontSize: 14, fontWeight: 600, color: "#1b4332", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {selectedMeal.name}
                      </div>
                    ) : (
                      <div style={{ fontSize: 14, color: "#95a392", fontStyle: "italic" }}>Wybierz posiłek...</div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                  {selectedMeal && (
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#2d6a4f" }}>
                      {selectedMeal.kcal}
                    </div>
                  )}
                  <div style={{
                    width: 28, height: 28, borderRadius: 8, background: "#f0f4ec",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, color: "#52796f", transition: "transform 0.2s",
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0)",
                  }}>▾</div>
                </div>
              </div>

              {/* Expanded: meal list */}
              {isExpanded && (
                <div style={{
                  borderTop: "1px solid #e8ede4", padding: "8px 8px 8px",
                  background: "#fafcf8",
                }}>
                  {MEALS_DB[slotKey].map((meal) => {
                    const isSelected = selectedMealId === meal.id;
                    return (
                      <div key={meal.id} style={{
                        display: "flex", alignItems: "center", gap: 10, padding: "10px 10px",
                        borderRadius: 14, cursor: "pointer", marginBottom: 4,
                        background: isSelected ? "linear-gradient(135deg, #d8f3dc, #b7e4c7)" : "transparent",
                        transition: "all 0.15s ease",
                      }} onClick={() => {
                        if (isSelected) {
                          clearSelection(selectedDay, slotKey);
                        } else {
                          setSelection(selectedDay, slotKey, meal.id);
                        }
                        setExpandedSlot(null);
                      }}>
                        <div style={{
                          width: 22, height: 22, borderRadius: 7, flexShrink: 0,
                          border: isSelected ? "2px solid #2d6a4f" : "2px solid #c8d5c0",
                          background: isSelected ? "#2d6a4f" : "transparent",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: 12, color: "#fff", transition: "all 0.15s",
                        }}>
                          {isSelected && "✓"}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{
                            fontSize: 13, fontWeight: isSelected ? 700 : 500,
                            color: isSelected ? "#1b4332" : "#344e41",
                            whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                          }}>
                            {meal.name}
                          </div>
                          <div style={{ fontSize: 11, color: "#74796f", marginTop: 2 }}>
                            {meal.kcal} kcal · B:{meal.b}g · W:{meal.w}g · T:{meal.t}g
                          </div>
                        </div>
                        <button onClick={(e) => {
                          e.stopPropagation();
                          setDetailMeal(meal);
                        }} style={{
                          background: "rgba(45,106,79,0.08)", border: "none", borderRadius: 8,
                          padding: "4px 8px", fontSize: 16, cursor: "pointer", color: "#2d6a4f",
                          flexShrink: 0,
                        }}>📋</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Water reminder */}
        <div style={{
          background: "linear-gradient(135deg, #d4e7fe, #e8f0fe)",
          borderRadius: 16, padding: "14px 16px",
          display: "flex", alignItems: "center", gap: 12,
        }}>
          <div style={{ fontSize: 22 }}>💧</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#1a4a7a" }}>Pamiętaj o wodzie!</div>
            <div style={{ fontSize: 12, color: "#4a7ab5" }}>Min. 2.8 litra dziennie</div>
          </div>
        </div>
      </div>

      {/* Meal detail modal */}
      {detailMeal && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", zIndex: 100,
          display: "flex", alignItems: "flex-end", justifyContent: "center",
          backdropFilter: "blur(4px)",
        }} onClick={() => setDetailMeal(null)}>
          <div style={{
            background: "#fff", borderRadius: "24px 24px 0 0", width: "100%", maxWidth: 480,
            maxHeight: "80vh", overflow: "auto", padding: "24px 20px 40px",
          }} onClick={(e) => e.stopPropagation()}>
            <div style={{ width: 40, height: 4, borderRadius: 2, background: "#d0d5cc", margin: "0 auto 16px" }} />
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: "#1b4332", marginBottom: 4 }}>
              {detailMeal.name}
            </div>
            <div style={{ display: "flex", gap: 12, marginBottom: 16, flexWrap: "wrap" }}>
              <MacroTag label="kcal" value={detailMeal.kcal} bg="#f0f4ec" color="#1b4332" />
              <MacroTag label="Białko" value={`${detailMeal.b}g`} bg="#d8f3dc" color="#2d6a4f" />
              <MacroTag label="Węgle" value={`${detailMeal.w}g`} bg="#fff3cd" color="#856404" />
              <MacroTag label="Tłuszcz" value={`${detailMeal.t}g`} bg="#fde8e4" color="#c44536" />
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#1b4332", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Składniki
            </div>
            <div style={{
              background: "#f8faf6", borderRadius: 14, padding: "12px 14px", marginBottom: 16,
              fontSize: 13, lineHeight: 1.8, color: "#344e41",
            }}>
              {detailMeal.ingredients.split(", ").map((ing, i) => (
                <div key={i} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                  <span style={{ color: "#2d6a4f", fontSize: 8 }}>●</span> {ing}
                </div>
              ))}
            </div>

            <div style={{ fontSize: 13, fontWeight: 700, color: "#1b4332", marginBottom: 8, textTransform: "uppercase", letterSpacing: 0.5 }}>
              Przygotowanie
            </div>
            <div style={{
              background: "#f8faf6", borderRadius: 14, padding: "12px 14px",
              fontSize: 13, lineHeight: 1.7, color: "#344e41",
            }}>
              {detailMeal.steps}
            </div>

            <button onClick={() => setDetailMeal(null)} style={{
              width: "100%", marginTop: 20, padding: "14px",
              background: "linear-gradient(135deg, #1b4332, #2d6a4f)",
              color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 600,
              cursor: "pointer", fontFamily: "'DM Sans', sans-serif",
            }}>Zamknij</button>
          </div>
        </div>
      )}
    </div>
  );
}

function MacroPill({ label, value, color }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 16, fontWeight: 700, color }}>{value}g</div>
      <div style={{ fontSize: 10, color: "#74796f", fontWeight: 600 }}>{label}</div>
    </div>
  );
}

function MacroTag({ label, value, bg, color }) {
  return (
    <div style={{
      background: bg, borderRadius: 10, padding: "6px 12px",
      display: "flex", gap: 4, alignItems: "baseline",
    }}>
      <span style={{ fontSize: 14, fontWeight: 700, color }}>{value}</span>
      <span style={{ fontSize: 11, color, opacity: 0.7 }}>{label}</span>
    </div>
  );
}
