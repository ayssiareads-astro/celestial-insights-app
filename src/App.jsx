import { useState, useRef } from "react";
const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const planets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto","Rising"];
const OUTER = ["Uranus","Neptune","Pluto"];
const generationDates = {
Uranus: { Aries:"2010-2018",Taurus:"2018-2026",Gemini:"1941-1949",Cancer:"1948-1956",Leo:"1955-1962",Virgo:"1961-1969",Libra:"1968-1975",Scorpio:"1974-1981",Sagittarius:"1981-1988",Capricorn:"1988-1996",Aquarius:"1995-2003",Pisces:"2003-2011" },
Neptune: { Aries:"2025-2039",Taurus:"1874-1889",Gemini:"1888-1902",Cancer:"1901-1916",Leo:"1914-1929",Virgo:"1928-1943",Libra:"1942-1957",Scorpio:"1955-1970",Sagittarius:"1970-1984",Capricorn:"1984-1998",Aquarius:"1998-2012",Pisces:"2011-2026" },
Pluto: { Aries:"2068-2097",Taurus:"1851-1884",Gemini:"1882-1914",Cancer:"1912-1939",Leo:"1937-1958",Virgo:"1956-1972",Libra:"1971-1984",Scorpio:"1983-1995",Sagittarius:"1995-2008",Capricorn:"2008-2024",Aquarius:"2023-2043",Pisces:"2043-2068" },
};
const facts = {
"Scorpio-Venus": [
"Venus in Scorpio means love is never casual for you - you merge completely or not at all, and people can feel that intensity the moment you show interest.",
"You have an almost psychic ability to sense when someone is being dishonest with you in love. You may not say it immediately, but you never forget it.",
"Your love language is transformation. You don’t just want a partner - you want someone who challenges you to evolve at the deepest level.",
"Venus in Scorpio is considered in its detriment, which means love doesn’t come easily or lightly for you. But when it’s real, it’s the most powerful bond in the zodiac.",
"You tend to test people - not consciously, but you create situations that reveal whether someone is truly trustworthy before you fully open up.",
"The shadow side of this placement is possessiveness. The gift side is that you love with a loyalty and depth most people never experience in a lifetime.",
"You’re deeply attracted to mystery. Someone too available or too easy to read will rarely hold your attention for long.",
"Heartbreak for you is a full-body experience. You don’t just grieve emotionally - you transform entirely because of it.",
],
"Libra-Venus": [
"Venus in Libra is the planet in its home sign - meaning love, beauty, and harmony come naturally to you in a way that feels almost effortless to others.",
"You have an extraordinary eye for aesthetics. Your home, your style, your environment - everything around you tends to be carefully curated and beautiful.",
"You are a natural mediator. You can see both sides of any conflict so clearly that people come to you to help them navigate their relationships.",
"The challenge with this placement is that you sometimes sacrifice your own needs for the sake of keeping the peace - and then quietly resent it.",
"You fall in love with potential. You see who someone could be, not just who they are, which can make you stay in situations longer than you should.",
"You need a partner who is your intellectual equal. Stimulating conversation is genuinely part of your love language.",
"Indecision in relationships is real for you - not because you don’t know what you want, but because you want everything to be perfectly fair before you choose.",
],
"Taurus-Venus": [
"Venus in Taurus is exalted - this is one of the most powerful placements for love and beauty in the entire zodiac.",
"You love through your senses. Physical touch, good food, beautiful surroundings, and comfort are not luxuries for you - they are how you express and receive love.",
"You are one of the most loyal partners in the zodiac. Once you commit, you commit fully - and you expect the same in return.",
"You take your time falling in love, but once you do, it takes an enormous amount for you to walk away. Stability matters more to you than excitement.",
"Money and material security are tied to your sense of self-worth with this placement. Learning that your value isn’t your bank account is often a lifelong lesson.",
"You have a gift for creating beauty everywhere you go - in your home, your relationships, your creative work. People feel nourished just being in your space.",
"The shadow of this placement is stubbornness. When you decide something, changing your mind can feel physically uncomfortable.",
"You are deeply sensual and tend to express love through acts of physical care - cooking for people, touching them, making their environment beautiful.",
],
"Aries-Venus": [
"Venus in Aries means you fall fast, hard, and all at once - the chase is genuinely exciting for you, and you lose interest when the thrill fades.",
"You are bold in love. You will make the first move, say what you feel, and pursue what you want without apology.",
"Independence is non-negotiable in your relationships. A partner who is too clingy or dependent will push you away faster than anything.",
"You tend to love competitively - you want a partner who can match your energy, challenge you, and keep you on your toes.",
"The shadow of this placement is impulsiveness. You can rush into relationships that look exciting and exit just as quickly when reality sets in.",
"You have a short fuse in love but also a short memory for conflict. You blow up and then you’re completely over it - which can confuse slower-processing partners.",
"You are attracted to confidence above almost anything else. Insecurity in a partner is genuinely a turnoff for you.",
"Venus in Aries people often pioneer new relationship structures. You don’t do things the traditional way - you do things your way.",
],
"Gemini-Venus": [
"Venus in Gemini means you fall in love with minds first. If someone can’t hold a real conversation with you, the attraction fades fast.",
"You need variety in love - not necessarily different partners, but variety in how you connect. Routine kills your romantic spirit.",
"You are one of the most playful and flirtatious Venus placements. You keep relationships light and fun in a way that people find genuinely refreshing.",
"The challenge is depth. You can talk about everything brilliantly, but going deep emotionally can feel vulnerable in a way that makes you dart away.",
"You may have had overlapping love interests at different points in your life - not because you’re unloyal, but because your heart genuinely opens in multiple directions.",
"Texting and communication are part of your love language. A partner who goes quiet on you will lose your interest quickly.",
"You are attracted to people who are curious, witty, and constantly learning. Someone settled and rigid in their thinking simply cannot hold you.",
"Your love life often reads like a great novel - full of interesting characters, unexpected plot twists, and brilliant dialogue.",
],
"Cancer-Venus": [
"Venus in Cancer means home is where your heart lives. Creating a safe, warm, nurturing environment for your partner is how you say ‘I love you’ most loudly.",
"You have an extraordinary emotional memory. You remember exactly how someone made you feel years ago - the good and the painful.",
"You are deeply intuitive about the people you love. You often sense what they need before they articulate it, which makes you an incredibly comforting presence.",
"The challenge is that you can be emotionally guarded at first. Your soft interior is protected by a hard shell, and it takes time to feel safe enough to open it.",
"You may romanticize the past in relationships - idealizing old loves or holding onto relationships longer than is healthy out of familiarity and comfort.",
"You need to feel emotionally secure before physical or romantic connection can deepen. Someone who rushes you will lose you entirely.",
"Your love is deeply maternal or paternal - you tend to care for and nurture your partners in ways that go far beyond romance.",
"The people you love rarely doubt that they are loved. You express it constantly and genuinely, and that kind of devotion is rare.",
],
"Leo-Venus": [
"Venus in Leo loves grandly and dramatically - you don’t do anything halfway, and your partners know they are loved because you make it impossible to miss.",
"You need to feel celebrated in your relationships. A partner who takes you for granted or forgets to appreciate you openly will slowly break your heart.",
"You are incredibly generous in love - with your time, your attention, your resources, and your affection. You give everything.",
"Loyalty is your highest value. Betrayal from someone you love hits you harder than almost anything else in life.",
"You are attracted to people with confidence and presence - someone who commands a room the way you do, or who makes you feel like royalty just by being with them.",
"The shadow of this placement is pride. Apologizing doesn’t come naturally, and sometimes your ego gets in the way of genuine reconciliation.",
"You love with flair - grand gestures, thoughtful gifts, dramatic declarations. If your love isn’t felt, you feel unseen.",
"Your love life often becomes the stuff of legend. The stories people tell about you and your relationships are genuinely memorable.",
],
"Virgo-Venus": [
"Venus in Virgo expresses love through service and devotion - you show up, you fix things, you pay attention to details that most people miss.",
"You are attracted to intelligence and competence. Someone who is good at what they do, who takes care of themselves and their responsibilities, is genuinely attractive to you.",
"The challenge of this placement is that you can critique the people you love as a way of caring - but they don’t always experience it that way.",
"You have impossibly high standards in love, which can leave you single longer than most. You would genuinely rather be alone than settle.",
"You are not naturally demonstrative with affection, but the depth of your devotion is evident in how consistently you show up for the people you love.",
"Health and shared routines become part of your love language. Working out together, cooking together, building healthy habits together - this is romance for you.",
"The shadow of this placement is self-criticism. You can internalize relationship problems as evidence of your own inadequacy.",
"When you commit, you are one of the most dependable partners in the zodiac. You take relationships seriously and follow through on your promises.",
],
"Sagittarius-Venus": [
"Venus in Sagittarius loves freely and adventurously - you need a partner who is also your travel companion, your philosophical sparring partner, and your best friend.",
"You are attracted to people from different backgrounds, cultures, or belief systems. Someone who expands your worldview is deeply appealing.",
"Freedom in love is non-negotiable. A relationship that feels like a cage - even a comfortable one - will eventually push you out the door.",
"You are one of the most honest Venus placements. Sometimes brutally so. Diplomacy in love is not your strongest suit.",
"The shadow is commitment avoidance. You genuinely love the feeling of potential and possibility, which can make the settled reality of a long-term relationship feel anticlimactic.",
"Your enthusiasm in love is infectious. When you’re interested in someone, you make them feel like the most exciting person in the world.",
"You fall in love with ideas as much as people. Someone who has a fascinating philosophy on life will captivate you completely.",
"You tend to be luckier in love the further you travel - physically, intellectually, or spiritually - from where you started.",
],
"Capricorn-Venus": [
"Venus in Capricorn takes love seriously. You don’t date casually - you date with intention, and you’re assessing long-term compatibility from the very beginning.",
"You are attracted to people who are ambitious, successful, and self-sufficient. Someone who has built something in their life earns your deep respect.",
"You express love through acts of reliability - showing up on time, keeping your word, building a stable life alongside someone. These are your love letters.",
"The challenge is that you can be emotionally reserved in ways that make partners feel kept at arm’s length, even when you’re deeply committed.",
"You may have experienced love as conditional early in life, which created a belief that you have to earn affection. Unlearning this is often a central life theme.",
"Your love life tends to improve dramatically with age. You become more comfortable with vulnerability as you accumulate trust in yourself.",
"Status and shared ambition can be aphrodisiacs for you. A partner who is going somewhere in life genuinely excites you.",
"When you fully commit, you are one of the most reliable and devoted partners in the zodiac. Your love is built to last.",
],
"Aquarius-Venus": [
"Venus in Aquarius needs intellectual freedom in love above all else. A partner who tries to control your thinking or limit your social world will not last.",
"You are attracted to people who are unusual, unconventional, or ahead of their time. The ordinary rarely captivates you.",
"Friendship is the foundation of all your romantic relationships. If you can’t be genuine friends first, the romance doesn’t have a real foundation.",
"You can appear emotionally detached in love - not because you don’t feel deeply, but because you process emotions through your intellect first.",
"You may thrive in non-traditional relationship structures, or at least need significant independence within traditional ones.",
"The shadow of this placement is emotional unavailability. You can intellectualize your feelings so thoroughly that you lose touch with them entirely.",
"You are genuinely ahead of your time in how you approach love and relationships. What you normalized years ago, others are only now beginning to discuss.",
"When you find your person, the connection is electric and deeply intellectual - a meeting of minds that feels unlike anything either of you has experienced before.",
],
"Pisces-Venus": [
"Venus in Pisces is exalted - this is considered the highest expression of Venus energy, meaning your capacity for love, empathy, and devotion is almost limitless.",
"You love unconditionally and sometimes unwisely. Your capacity to see the best in people can lead you to stay in situations that don’t serve you.",
"You are deeply romantic in the old-fashioned, poetic sense - love for you exists in another dimension, almost sacred and transcendent.",
"Your empathy in relationships is your greatest gift and your greatest vulnerability. You absorb your partner’s feelings as your own, which can be overwhelming.",
"You are attracted to people who need saving - not always healthy, but deeply human. Learning to love people who are already whole is often a central growth edge.",
"Spiritual or creative connection is essential in your romantic life. A purely pragmatic relationship will never fully satisfy you.",
"You have a gift for making people feel deeply seen and understood. People often feel more like themselves around you than they do with anyone else.",
"The shadow of this placement is losing yourself completely in a relationship. Maintaining your own identity while loving deeply is the lifelong work.",
],
"Aries-Moon": [
"Your Moon in Aries means your emotional reactions are immediate and instinctive - you feel it, you express it, and often you’re over it before others have even processed what happened.",
"You restore yourself through action, not reflection. When you’re emotionally activated, you need to move - exercise, drive, do something physical - or the energy has nowhere to go.",
"Emotional independence is a deep need for you. Being told how to feel, or having someone else’s emotions poured onto you, is genuinely depleting.",
"You are emotionally brave in ways others aren’t. You will have the hard conversation, confront the difficult truth, and say the thing no one else will say.",
"The shadow of this placement is emotional impulsivity - saying or doing things in the heat of the moment that you genuinely regret when you cool down.",
"Your inner child is a warrior. At your core, you need to feel like you can handle anything - and you almost always can.",
"You are most emotionally healthy when you have something to fight for - a goal, a project, a cause that gives your fire somewhere to go.",
"People with Moon in Aries often had to learn emotional self-sufficiency early. You didn’t always feel you had permission to be vulnerable.",
],
"Taurus-Moon": [
"Moon in Taurus is exalted - the Moon is considered most powerful in this sign, giving you an unusually stable, grounded, and reliable emotional nature.",
"You restore through the senses. A good meal, a long bath, physical comfort, beautiful surroundings - these aren’t indulgences for you, they’re emotional medicine.",
"Your nervous system craves consistency. Sudden changes, chaotic environments, or emotional unpredictability are genuinely distressing to you in a way others may not understand.",
"You are one of the most emotionally dependable people in anyone’s life. When people need a steady presence, they come to you.",
"The shadow of this placement is stubbornness rooted in fear. You can resist change long after change has become necessary because the familiar feels safe.",
"You have a strong connection to the body and to the physical world as a source of emotional comfort - which gives you an incredible instinct for what people physically need.",
"Material security is tied to your emotional security in a way that’s important to acknowledge. Financial instability hits you on a deeper, more personal level than most.",
"Your patience is legendary. You can endure what would break others - not because you’re numb, but because your roots go very, very deep.",
],
"Gemini-Moon": [
"Moon in Gemini means your emotions arrive as thoughts first. You process feelings by talking about them, writing about them, or thinking them through rather than simply sitting with them.",
"You need mental stimulation to feel emotionally well. Boredom is genuinely destabilizing for you in a way that may surprise people who underestimate the emotional weight of restlessness.",
"You are gifted at articulating how you feel, which makes you an unusually good communicator in relationships - though sometimes the talking is also a way to avoid going deeper.",
"Your moods shift frequently and quickly. You might feel entirely different about something in the span of a single afternoon, which can confuse people who expect emotional consistency.",
"The shadow of this placement is emotional superficiality - skimming the surface of your feelings rather than diving into the ones that feel too big or complicated.",
"You have a remarkable ability to find the humor in emotional situations, which is genuinely healing - for yourself and for the people around you.",
"You often have two simultaneous emotional experiences about the same thing - feeling excited and anxious, sad and relieved, in love and uncertain, all at once.",
"You restore through conversation, learning, and connection. Isolation is one of the worst things for your emotional wellbeing.",
],
"Cancer-Moon": [
"Moon in Cancer is the Moon in its home sign - the placement it rules - giving you one of the most emotionally intuitive, sensitive, and deeply feeling natures in the zodiac.",
"Your emotional memory is extraordinary. You carry the feeling of every significant moment with you indefinitely - the joy, the grief, and everything in between.",
"You often absorb the emotional atmosphere of the room you walk into before you’ve consciously registered it. You feel it in your body first.",
"Home is not just a place for you - it’s an emotional state. When your home environment is chaotic or unwelcoming, your entire inner world destabilizes.",
"The shadow of this placement is emotional manipulation through guilt, or withdrawing into your shell when hurt rather than expressing what’s wrong.",
"You have a gift for nurturing that is almost instinctive. People around you feel fed, held, and cared for - even when you’re not consciously doing anything.",
"Your intuition about people’s emotional states borders on psychic. You often know what someone is feeling before they know it themselves.",
"The Moon changes signs every 2.5 days, so your emotional rhythms track closely with the lunar cycle. New and full moons hit you with particular intensity.",
],
"Leo-Moon": [
"Moon in Leo means your emotional world is dramatic, generous, and deeply expressive. You feel things with your whole chest and you need to express them just as fully.",
"You restore through creativity, play, and being genuinely celebrated. Feeling unseen or unappreciated is one of the most destabilizing things for your emotional health.",
"You have a gift for making emotional experiences feel significant and memorable. People feel like their feelings matter more when they share them with you.",
"Your inner child needs to be the star sometimes - not out of ego, but because deep down you have a pure, genuine need to be loved for exactly who you are.",
"The shadow of this placement is emotional pride - difficulty admitting when you’re wrong or when you’re hurting, because vulnerability can feel like losing your crown.",
"You are an extraordinarily loyal emotional support for the people you love. You show up, you cheer loudly, and you defend fiercely.",
"Dramatic emotional expression comes naturally to you, which can read as intense to more subdued Moon signs - but for you, it’s simply authentic.",
"When your need for appreciation goes unmet, it can tip into attention-seeking behavior that you later regret. Knowing this pattern is half the work.",
],
"Virgo-Moon": [
"Moon in Virgo means you process emotions analytically - you need to understand why you feel the way you feel before you can fully move through it.",
"You restore through order and usefulness. When your emotional world is chaotic, cleaning, organizing, or helping someone with a practical problem genuinely soothes you.",
"You have an extraordinary ability to stay functional during emotional difficulties - which is a strength, but can also mean you bypass the actual feeling in favor of fixing.",
"You are deeply critical of yourself emotionally, often holding yourself to a standard of emotional regulation that is genuinely impossible.",
"The shadow of this placement is anxiety masquerading as practicality - catastrophizing, overanalyzing, and preparing for worst-case scenarios as a way of feeling in control.",
"Your instinct is to be useful when someone is hurting. You bring practical solutions, make food, research options - love expressed through competence and care.",
"You often suppress your own emotional needs in service of others, and then feel quietly resentful when no one notices.",
"Your emotional wellbeing is deeply tied to your physical health. When your body is well - exercised, nourished, rested - your emotional state follows.",
],
"Libra-Moon": [
"Moon in Libra means your emotional wellbeing is directly tied to the quality of your relationships. When your connections are harmonious, you flourish. When they’re in conflict, you suffer.",
"You have a strong need for fairness in your emotional life. Being treated unjustly or witnessing injustice creates a genuine sense of inner disturbance.",
"You restore through beauty, balance, and companionship. Solitude is fine in small doses, but you genuinely need other people to feel emotionally complete.",
"Decision-making can be emotionally agonizing for you - not because you’re indecisive, but because you genuinely feel the pull of both sides and don’t want to cause harm.",
"The shadow of this placement is people-pleasing at the expense of your own emotional truth. You may agree with people to avoid conflict even when you don’t.",
"You are an extraordinary emotional mediator. You can hold multiple people’s feelings simultaneously and find the place where everyone feels heard.",
"You have a refined emotional sensitivity to atmosphere and aesthetic. An ugly or discordant environment affects your mood more than most people would believe.",
"Your emotional maturity comes from learning that conflict is sometimes necessary - and that avoiding it doesn’t protect the relationship, it hollows it out.",
],
"Scorpio-Moon": [
"Moon in Scorpio is one of the most emotionally intense placements in the zodiac. Your feelings don’t visit - they take up residence.",
"You have an instinctive ability to see beneath the surface of people and situations. Pretense doesn’t fool you for long, and dishonesty feels like a physical offense.",
"You restore through depth - intense conversations, transformative experiences, or time alone processing the layers of what you’ve felt.",
"The shadow of this placement is emotional control as self-protection. If you control what people know about you, they can’t use it against you. Letting that wall down is the work.",
"You have an extraordinary capacity for loyalty. When you are fully committed to someone, you would walk through fire for them without thinking twice.",
"Betrayal hits you at a cellular level. You may forgive eventually, but you never fully forget - and your trust, once broken, is extraordinarily difficult to rebuild.",
"Your emotional depth means you feel joy, love, and connection more profoundly than most people - not just pain. The intensity goes in every direction.",
"Transformation is your emotional cycle. You don’t just grow - you periodically shed an old version of yourself entirely and emerge completely different.",
],
"Sagittarius-Moon": [
"Moon in Sagittarius means your emotional wellbeing is directly tied to your sense of freedom and expansion. When you feel trapped, you feel desperate. When you feel free, you feel alive.",
"You restore through adventure, travel, learning, and philosophical exploration. Anything that expands your understanding of the world is emotionally nourishing.",
"You have an extraordinary ability to find meaning and silver linings in difficult experiences - which makes you genuinely resilient and inspiring to be around.",
"The shadow of this placement is emotional avoidance through perpetual motion. If you keep moving, you never have to sit with the uncomfortable feelings.",
"You are emotionally honest to a fault - sometimes saying exactly what you feel before you’ve considered whether the timing or framing is kind.",
"Your optimism is a genuine emotional gift, but it can also mean you minimize your own pain or rush yourself through grief before it’s done.",
"You need a partner who doesn’t clip your wings. Emotional confinement - even from someone who loves you - is one of the most destabilizing things for your mental health.",
"At your core, you believe life is fundamentally meaningful and things work out. This faith is your emotional anchor - and it has gotten you through things that would have broken others.",
],
"Capricorn-Moon": [
"Moon in Capricorn means you learned early that emotions were something to manage, not indulge - which gave you extraordinary self-discipline and extraordinary emotional loneliness.",
"You restore through achievement and structure. When your life feels ordered and purposeful, your emotional state stabilizes. Chaos destabilizes you at a deep level.",
"You have an exceptional ability to function during emotional difficulty - to hold it together publicly even when you’re falling apart privately.",
"The shadow of this placement is emotional suppression disguised as strength. The belief that needing support is weakness is one of the central wounds to heal.",
"You often carry a sense of responsibility for everyone around you that was never actually yours to carry. Putting it down is both terrifying and liberating.",
"Your emotional maturity tends to be impressive even in youth - but it can come at the cost of not having had the space to simply be young and unguarded.",
"Deep down, beneath the competence and the composure, is someone who longs to be taken care of. Letting that be true is some of the most important emotional work of your life.",
"As you age and accumulate genuine accomplishment and self-trust, your emotional world softens. The best emotional years for Moon in Capricorn are often the later ones.",
],
"Aquarius-Moon": [
"Moon in Aquarius means you process emotions intellectually - feelings arrive as ideas first, which means you can articulate them brilliantly but sometimes struggle to actually feel them.",
"You restore through solitude, intellectual stimulation, and connection to causes larger than yourself. Being around too many people for too long is genuinely draining.",
"You have an unusual emotional independence that others often mistake for coldness. You simply don’t need external validation to know how you feel.",
"The shadow of this placement is emotional detachment - intellectualizing your feelings so completely that you lose touch with the actual experience underneath.",
"You feel things about humanity collectively in a way that is profound and sometimes overwhelming. World events hit you emotionally in a way that can surprise more personally-focused signs.",
"You need significant space in your emotional relationships - not because you don’t care, but because you genuinely require room to be yourself fully.",
"You are often ahead of your time emotionally. You’ve processed things, normalized things, and moved through emotional territory that others won’t arrive at for years.",
"When you do connect deeply with someone, it’s a meeting of minds and souls that feels genuinely rare - because for you, it is.",
],
"Pisces-Moon": [
"Moon in Pisces is one of the most psychically sensitive placements in astrology. You pick up on emotional undercurrents in a room before anyone has spoken a word.",
"You restore through creative expression, spiritual practice, time near water, and genuine solitude where you can decompress from absorbing everyone else’s emotions all day.",
"You have the most empathetic emotional nature in the zodiac. The line between your feelings and other people’s feelings is genuinely blurry - which is both a gift and an enormous burden.",
"The shadow of this placement is emotional escapism - retreating into fantasy, sleep, substances, or any numbing behavior when reality feels too heavy.",
"You often know things emotionally before you have any logical reason to know them. Your gut feelings are frequently more accurate than other people’s careful analysis.",
"You carry other people’s pain as your own without realizing it. Regular emotional clearing practices - time alone, meditation, time in nature - aren’t optional for you, they’re necessary.",
"Your emotional world is rich, complex, and layered in ways that are genuinely difficult to articulate. Sometimes you feel things there are simply no words for.",
"You are at your most emotionally healthy when you have a creative or spiritual outlet for the depth of what you feel. Without that channel, the feelings can become overwhelming.",
],
"Aries-Sun": [
"Your Sun in Aries means you are ruled by Mars - the planet of action, desire, and courage. Your entire identity is built around initiation. You were born to go first.",
"You have a directness that is genuinely rare. You say what others only think, you start what others only consider, and you live at a pace that leaves most people breathless.",
"The shadow of this placement is impatience - with others, with processes, with yourself. You want results yesterday, which means you sometimes skip the steps that would actually get you there faster.",
"Your identity is strongly tied to independence. You need to feel like you’re your own person - not defined by relationship, job, or any external label.",
"You are a natural leader not because you seek authority, but because you simply start moving and others follow. Leadership is almost accidental for you.",
"Aries is the youngest energy in the zodiac - the archetype of the newborn - which means you approach life with a freshness and enthusiasm that others have to deliberately cultivate.",
"Your competitive streak is real, but it’s mostly directed inward. You want to be better than you were yesterday more than you want to beat someone else.",
"You are most alive when you’re beginning something - a new project, a new relationship, a new adventure. The middle and the maintenance are genuinely harder for you.",
],
"Taurus-Sun": [
"Your Sun in Taurus is ruled by Venus, which means beauty, pleasure, and sensory experience aren’t distractions from your purpose - they are part of it.",
"You have a groundedness that others are genuinely drawn to. In a world of reactivity and chaos, your steadiness is a rare and valuable thing.",
"The shadow of this placement is resistance to change long after change has become necessary. Security feels so good that you can mistake comfort for contentment.",
"You have an unusual relationship with time. You are not in a rush - which frustrates faster-moving signs, but also means the things you build actually last.",
"Your senses are heightened. Food tastes richer, music moves you more deeply, physical comfort matters more to you than to most. This is not indulgence - it’s how you’re built.",
"You have an extraordinary work ethic when you care about something. When you’re invested, you are one of the most reliable and persistent forces in the zodiac.",
"Taurus rules the throat and voice, which often gives this placement either a beautiful speaking or singing voice, or a particularly powerful way with words.",
"Your deepest security doesn’t actually come from material stability - though you need that too. It comes from your relationship with your own values, which rarely waver.",
],
"Gemini-Sun": [
"Your Sun in Gemini means your identity is built around your mind - your curiosity, your communication, and your ability to hold multiple perspectives simultaneously.",
"You are genuinely one of the most interesting conversationalists in the zodiac. You can go deep or stay light, get technical or stay playful, and you read your audience perfectly.",
"The shadow of this placement is inconsistency - not in your values, but in your focus. You are genuinely interested in everything, which can make sustained commitment to any one thing feel like a loss.",
"You process the world through language. Talking, writing, listening, reading - these aren’t just activities for you, they’re how you make sense of your entire experience.",
"Gemini is the sign of the twins, which means you contain genuine multitudes. The version of you that your coworkers know may be entirely different from the one your closest friends know.",
"You have a gift for translation - taking complex ideas and making them accessible, or bridging worlds that don’t usually speak the same language.",
"Your nervous system runs faster than most. You need more sensory input, more variety, and more stimulation than average - and you need to know this about yourself.",
"Your greatest fear is often boredom - a life without learning, without newness, without interesting people to engage with. The good news is you almost never let that happen.",
],
"Cancer-Sun": [
"Your Sun in Cancer is ruled by the Moon - the only sign in the zodiac ruled by a luminary rather than a planet - giving you a depth of emotional intelligence that is genuinely extraordinary.",
"Your identity is built around care, protection, and belonging. You are most yourself when you are nurturing something - a person, a home, a project, a community.",
"The shadow of this placement is using emotional care as a way to control. When you take care of everyone, you have a reason to be needed - and being needed can feel safer than being loved.",
"You have an almost photographic emotional memory. You remember how every significant moment felt - which makes you both deeply empathetic and sometimes slow to move on.",
"Your intuition is one of your most valuable assets. You read people and situations at an energetic level that bypasses logic, and you are right more often than you’re wrong.",
"Home is not just where you live - it is an extension of your inner world. When your home environment is right, you feel right. When it’s wrong, everything feels off.",
"The crab moves sideways rather than straight ahead, which is often how Cancer approaches goals too - indirectly, carefully, ensuring safety before fully committing.",
"Your strength is often underestimated because it’s wrapped in softness. But you are one of the most tenacious signs in the zodiac when it comes to protecting what you love.",
],
"Leo-Sun": [
"Your Sun in Leo is ruled by the Sun itself - the only sign with this distinction - meaning your identity, your self-expression, and your vitality are inextricably linked.",
"You were born to shine. Not in a performative way - in a genuinely luminous way. When you’re fully yourself, you light up rooms without trying.",
"The shadow of this placement is ego fragility beneath the confidence. The roar of the lion can sometimes be loudest when the lion is actually afraid.",
"You have a gift for making people feel special. When you give someone your full attention, they feel like the only person in the world - which is a genuinely rare and powerful thing.",
"Your creative impulse is central to your identity. Whether it manifests as art, performance, leadership, or simply the way you present yourself - you are always creating.",
"You need to be appreciated, and there is nothing shameful about that. The shadow version of this need becomes attention-seeking. The high version becomes true generosity and inspiration.",
"Loyalty is one of your most defining qualities. You defend the people you love with a ferocity that surprises those who only know your warm surface.",
"The fixed fire of Leo means you don’t just start things - unlike Aries - you sustain them. You have the staying power to see your visions through to completion.",
],
"Virgo-Sun": [
"Your Sun in Virgo is ruled by Mercury, giving you a mind that is analytical, detail-oriented, and genuinely brilliant at seeing what others overlook.",
"Your identity is built around usefulness and excellence. You feel most like yourself when you are doing something well and making a real difference for someone.",
"The shadow of this placement is the inner critic - a relentless internal voice that holds you to a standard of perfection that no human can actually meet.",
"You have an extraordinary eye for systems and patterns. You see the flaw in the blueprint before the building is even halfway up, which makes you invaluable in almost any field.",
"Virgo rules the sixth house of health, daily routines, and service - which means these areas aren’t just habits for you, they’re directly connected to your sense of self and purpose.",
"You have a gift for analysis that, at its best, leads to profound discernment and, at its shadow, leads to overthinking that paralyzes more than it helps.",
"You are one of the most genuinely helpful signs in the zodiac - not because you’re people-pleasing, but because contributing meaningfully to others’ lives is how you express love.",
"Your attention to detail is legendary. You notice the thing in the corner of the room that everyone else walked past - and more often than not, it matters.",
],
"Libra-Sun": [
"Your Sun in Libra is ruled by Venus, giving you an identity built around beauty, balance, relationship, and the pursuit of genuine fairness.",
"You see both sides of everything - which makes you an extraordinary diplomat and mediator, but can also make it deeply difficult to know what you actually think.",
"The shadow of this placement is identity dissolution through relationships. If you’re not careful, you can lose track of who you are outside of how you’re perceived by others.",
"You have an aesthetic intelligence that operates almost involuntarily. You feel the imbalance in a room, the discordance in an outfit, the injustice in a situation - before you consciously register it.",
"Your social grace is one of your most impressive qualities. You make almost everyone feel comfortable, seen, and valued within minutes of meeting you.",
"Libra is the only sign of the zodiac represented by an inanimate object - the scales - which speaks to your role as the cosmic witness, always weighing, always seeking truth.",
"The indecision Libra is famous for often isn’t about not knowing what you want. It’s about genuinely caring what impact your choice will have on others.",
"Your drive for fairness and equality runs very deep. You are not a fence-sitter - you are someone who takes justice seriously enough to see every angle before acting.",
],
"Scorpio-Sun": [
"Your Sun in Scorpio is co-ruled by Mars and Pluto - the planets of power, transformation, and intensity - which means your identity is built around depth, truth, and evolution.",
"You are one of the most psychologically complex signs in the zodiac. There are layers to you that most people never access, and you like it that way.",
"The shadow of this placement is the desire for control as protection. If you understand everything - every angle, every motive, every possibility - nothing can catch you off guard.",
"You have a remarkable ability to sit with darkness - your own and others’ - without flinching. This makes you an extraordinary friend in crisis and a profound healer.",
"Scorpio rules the eighth house of death, rebirth, and shared resources - which means transformation is not something that happens to you occasionally. It’s your fundamental mode of existence.",
"Your lie detector is legendary. You can read through inauthenticity, manipulation, and performance almost instantly, which makes it very difficult for people to fool you twice.",
"The intensity you bring to everything you do is your greatest asset and your greatest challenge. You don’t do anything at half power, which is both extraordinary and exhausting.",
"Scorpios often appear to have multiple lifetimes within one. The person you are at 40 may be completely unrecognizable from who you were at 20 - and that’s the point.",
],
"Sagittarius-Sun": [
"Your Sun in Sagittarius is ruled by Jupiter - the largest planet in the solar system and the planet of expansion, abundance, and higher truth - which means you think big by nature.",
"Your identity is built around freedom, truth-seeking, and the belief that life is fundamentally meaningful. You are one of the most philosophically oriented signs in the zodiac.",
"The shadow of this placement is inconsistency and over-promising. Your enthusiasm is genuine in the moment, but follow-through requires discipline that doesn’t always come naturally.",
"You have a gift for inspiring others. When you believe in something - really believe - you can make other people feel that fire too, which is a powerful and rare quality.",
"Sagittarius rules the ninth house of higher education, travel, philosophy, and belief systems - meaning these aren’t just interests for you, they’re central to who you are.",
"Your honesty is one of your most defining traits. You may be diplomatic about many things, but when asked a direct question, you will give a direct answer.",
"You have a natural optimism that isn’t naivety - it’s a deeply held belief that things can and do work out, which has gotten you through situations that would have broken more pessimistic signs.",
"The centaur - half human, half horse - is your symbol. You straddle two worlds: the philosophical and the physical, the idealistic and the visceral. Both are fully you.",
],
"Capricorn-Sun": [
"Your Sun in Capricorn is ruled by Saturn - the planet of discipline, structure, and mastery - which means your identity is built around achievement, integrity, and the long game.",
"You have a relationship with time that sets you apart from most signs. You are willing to work for years toward something most people would give up on in months.",
"The shadow of this placement is defining your worth by your accomplishments. When achievement becomes the condition for self-acceptance, no amount of success is ever quite enough.",
"You have an instinctive understanding of how systems work and how to navigate them - which makes you exceptionally effective in almost any institutional or professional context.",
"Capricorn rules the tenth house of career, public reputation, and legacy. These are not just ambitions for you - they’re tied to your deepest sense of identity and meaning.",
"You often took on adult responsibilities very young, which gave you extraordinary competence but sometimes robbed you of ease. Learning to play - really play - can be a genuine practice.",
"Your dry humor is one of your most underrated qualities. When you decide to be funny, you are extraordinarily funny - and most people never see it coming.",
"Saturn rules Capricorn, and Saturn rewards those who do the work. This means your life genuinely does get better with age - more ease, more confidence, more genuine satisfaction.",
],
"Aquarius-Sun": [
"Your Sun in Aquarius is co-ruled by Saturn and Uranus - structure and disruption - which means your identity is built around being simultaneously ahead of your time and deeply principled.",
"You have a strong sense of what humanity could be if it lived up to its potential. This vision drives you more than personal ambition ever could.",
"The shadow of this placement is emotional detachment - being so oriented toward the collective that you lose touch with your own individual needs and feelings.",
"You are a natural innovator. You see existing systems, question their assumptions, and imagine better alternatives - often before anyone else has recognized the problem.",
"Aquarius rules the eleventh house of community, networks, and collective vision. You thrive when you are part of something larger than yourself.",
"Your individuality is sacred to you. Even when you’re part of a group, you maintain a distinct and non-conformist identity - you belong on your own terms or not at all.",
"You have a gift for seeing people outside the context of their social role - which means you often connect with people others have dismissed, overlooked, or misunderstood.",
"The water bearer pours water - knowledge, vision, truth - for all of humanity. Your role is not just to receive insight but to share it. You are here to contribute to the whole.",
],
"Pisces-Sun": [
"Your Sun in Pisces is co-ruled by Jupiter and Neptune - expansion and transcendence - meaning your identity exists partly in a dimension that most people don’t have easy access to.",
"You are one of the most spiritually attuned signs in the zodiac. You have a felt sense of connection to something larger than the visible world that informs how you move through life.",
"The shadow of this placement is identity dissolution - losing yourself in other people, in escapism, or in a formlessness that makes it difficult to show up fully in practical reality.",
"Your empathy is your most extraordinary quality. You feel what others feel so accurately and completely that people often experience you as the most understanding presence they’ve ever encountered.",
"Pisces rules the twelfth house - the house of the unconscious, hidden things, and transcendence. This gives you access to depths of intuition and creative imagination that are genuinely rare.",
"You are at your best when you have a creative or spiritual practice that gives the vast inner world somewhere to go. Without it, the depth can become overwhelming.",
"The two fish swimming in opposite directions represent the Piscean tension between transcendence and groundedness, between escape and engagement. Learning to swim in both directions is the work.",
"You are the final sign of the zodiac - the one that contains all the others - which gives you an unusual wisdom and empathy for the full range of human experience.",
],
"Aries-Rising": [
"Aries Rising means Mars rules your chart, which gives you a direct, energetic, and immediate quality that people register the moment you walk into a room.",
"Your first impression is bold, confident, and action-oriented. People sense that you are not someone who waits around - and they’re right.",
"You tend to lead with your energy before your words. Your body language communicates intention and readiness before you’ve said a single thing.",
"The challenge of this Ascendant is that your directness can read as aggression to more sensitive signs, even when you mean no harm.",
"Mars-ruled Ascendants often have a distinctive sharpness to their features - angular jaw, strong brow, or something in the eyes that communicates intensity.",
"You tend to attract challenges and competition as if by magnetism - which is actually by design, because you grow through the friction.",
"Your life themes often revolve around identity, independence, and courage. You are here to learn to be fully, unapologetically yourself.",
"Aries Rising people often look younger than their age. That fresh, pioneering energy keeps something youthful alive in you regardless of how old you get.",
],
"Taurus-Rising": [
"Taurus Rising means Venus rules your chart, giving you a physical presence that is grounded, graceful, and somehow deeply reassuring to others.",
"Your first impression is calm, solid, and trustworthy. People feel safe around you before they know why - your body carries a stability that others unconsciously lean toward.",
"You tend to be physically beautiful in a timeless way - there is often something classically attractive about your features, your voice, or the way you carry yourself.",
"The challenge of this Ascendant is that you can appear unmovable or stubborn, even when your inner experience is far more flexible than your outer expression suggests.",
"Taurus Rising people often have a natural affinity with material beauty - your home, your style, and your environment tend to reflect genuine aesthetic consideration.",
"Your life themes revolve around value, self-worth, and the relationship between the material and the spiritual. What do you truly own? What is truly yours?",
"You take life at a slower, more deliberate pace than many - which can frustrate faster-moving people, but also means the things you build are solid and lasting.",
"Venus ruling your chart means beauty, pleasure, and relationship are not peripheral to your path - they are central to it.",
],
"Gemini-Rising": [
"Gemini Rising means Mercury rules your chart, giving you a quick, curious, and communicative outer manner that immediately puts people at ease.",
"Your first impression is witty, intellectually engaged, and genuinely interested in whoever you’re talking to. People feel stimulated by you.",
"You tend to move through the world with a lightness and adaptability that allows you to connect across very different worlds and social circles.",
"The challenge of this Ascendant is that people may underestimate your depth because your surface is so quick and socially agile.",
"Your physical appearance often has a youthful, mobile quality - expressive eyes, animated face, hands that move when you talk.",
"Your life themes revolve around communication, learning, connection, and the integration of your own contradictions. You contain multitudes and are here to learn to live them all.",
"Mercury ruling your chart means information, language, and connection are core to how you engage with the world - these aren’t incidental, they’re your medium.",
"You are often known for your versatility - you can do many things well, adapt to many environments, and connect with many different kinds of people.",
],
"Cancer-Rising": [
"Cancer Rising means the Moon rules your chart, giving you a soft, receptive, and deeply empathetic outer manner that makes people feel immediately cared for.",
"Your first impression is warm, nurturing, and somehow familiar - people often feel they’ve known you longer than they have.",
"You tend to read the emotional temperature of any room or relationship with extraordinary accuracy. This sensitivity is both your greatest gift and your most demanding challenge.",
"The challenge of this Ascendant is that you can absorb others’ emotions and carry them as your own, which requires regular clearing and strong boundaries to manage.",
"Cancer Rising often gives a rounded, soft quality to features - expressive eyes, full cheeks, or something generally approachable and gentle in the face.",
"Your life themes revolve around home, belonging, family, and emotional safety. You are here to learn what true security feels like - and that it comes from within.",
"The Moon’s cycle directly affects your outer expression. At new and full moons, you may feel genuinely different to others - more internal, more expansive, more sensitive.",
"You are often the emotional anchor for everyone around you, which is a beautiful role - as long as you remember to have your own anchor too.",
],
"Leo-Rising": [
"Leo Rising means the Sun rules your chart - the only Ascendant with this distinction - giving you a radiant, warm, and magnetically confident outer presence.",
"Your first impression is larger than life. There is something about you that people notice immediately - the way you carry yourself, the warmth you project, the presence you have.",
"You tend to have a physical quality that draws attention - strong hair, dramatic features, or simply an energy that takes up space in the best possible way.",
"The challenge of this Ascendant is that you are always being watched, which can create pressure to perform rather than simply be.",
"Leo Rising people often find that their life becomes more public than they expected - career paths that involve visibility, leadership, or some form of audience tend to find them.",
"Your life themes revolve around identity, self-expression, creativity, and the journey from seeking validation to genuinely knowing your own worth.",
"The Sun ruling your chart means vitality, identity, and creative expression are core to how you show up in the world. When you’re dimming yourself, everything feels wrong.",
"You have a natural gift for leadership that emerges not from ambition but from the simple fact that when you’re fully yourself, people naturally follow.",
],
"Virgo-Rising": [
"Virgo Rising means Mercury rules your chart, giving you an observant, precise, and quietly intelligent outer manner that notices everything.",
"Your first impression is modest, competent, and somehow immediately trustworthy. People sense that you are someone who will actually do what you say you’ll do.",
"You tend to have a clean, refined quality to your appearance - something carefully considered without being overdone, always appropriate for the context.",
"The challenge of this Ascendant is that you can come across as critical or reserved before people know you - your analytical eye is always working, and it shows.",
"Virgo Rising people often have an unusual connection to health and the body - either as a focus of study, a career in healing, or a heightened sensitivity to physical wellbeing.",
"Your life themes revolve around service, excellence, discernment, and learning to extend to yourself the same compassion you so freely give to others.",
"Mercury ruling your chart means analysis, communication, and precision are core to how you engage with the world - these are not just skills, they’re part of your identity.",
"You notice the details that others walk past. This is your superpower - and the source of both your greatest contributions and your most exhausting self-criticism.",
],
"Libra-Rising": [
"Libra Rising means Venus rules your chart, giving you a graceful, charming, and aesthetically attuned outer manner that makes you genuinely lovely to be around.",
"Your first impression is elegant, balanced, and socially effortless. People feel comfortable with you almost immediately because you make them feel at ease.",
"You tend to have a naturally attractive quality to your appearance - symmetry, grace, or something polished and considered in how you present yourself.",
"The challenge of this Ascendant is that your drive to maintain harmony can make it difficult for people to know what you really think, because you always present both sides.",
"Libra Rising often attracts significant relationships as a central theme of life - partners, collaborators, and significant others who bring important lessons.",
"Your life themes revolve around balance, justice, relationship, and learning to make decisions from your own center rather than in reaction to others.",
"Venus ruling your chart means beauty, love, and harmony are not just aesthetic preferences - they are core to your life’s purpose and the lens through which you engage with the world.",
"You have a gift for creating environments where people feel welcome, heard, and valued - which makes you a natural host, mediator, and connector.",
],
"Scorpio-Rising": [
"Scorpio Rising means Pluto and Mars co-rule your chart, giving you an intense, magnetic, and penetrating outer presence that people feel before you’ve said a word.",
"Your first impression is magnetic, mysterious, and somehow both inviting and guarded. People are drawn to you and slightly uncertain how to approach you - simultaneously.",
"You tend to have a striking physical quality - intense eyes in particular - something that conveys depth and the sense that there is far more beneath the surface than is visible.",
"The challenge of this Ascendant is that you can intimidate people without meaning to. Your stillness and perceptiveness can feel like judgment even when it isn’t.",
"Scorpio Rising people often experience significant transformation through their lives - circumstances that completely remake their outer identity and sense of self.",
"Your life themes revolve around power, depth, truth, and the alchemical process of turning wound into wisdom. You are not here for a surface-level life.",
"You have an extraordinary ability to see through inauthenticity almost instantly, which means superficial social interactions are genuinely exhausting for you.",
"People don’t forget you. Whatever impression you make - positive or challenging - it tends to be permanent. You are not a background character in anyone’s story.",
],
"Sagittarius-Rising": [
"Sagittarius Rising means Jupiter rules your chart, giving you an expansive, enthusiastic, and genuinely optimistic outer manner that people find immediately uplifting.",
"Your first impression is open, adventurous, and somehow bigger than life. People sense that things happen around you - that life tends to be more interesting in your presence.",
"You tend to have a tall, open quality to your physical presence - something athletic, outdoorsy, or simply spacious about the way you carry yourself.",
"The challenge of this Ascendant is that your enthusiasm can make promises your follow-through doesn’t always keep, and people may experience you as more consistent than you actually are.",
"Sagittarius Rising people often find themselves drawn into international experiences, higher education, or philosophical inquiry as central life themes.",
"Your life themes revolve around truth, freedom, expansion, and finding the philosophy that actually fits your lived experience - not just the one you inherited.",
"Jupiter ruling your chart means abundance, growth, and meaning are core to how you engage with the world - and you tend to attract opportunities in ways that luckier than average.",
"You are naturally funny, often without trying. Your take on life is sufficiently original that the observation itself becomes the joke.",
],
"Capricorn-Rising": [
"Capricorn Rising means Saturn rules your chart, giving you a composed, authoritative, and quietly serious outer manner that commands respect before you’ve established any credentials.",
"Your first impression is competent, reliable, and somehow mature - people assume you are good at your job, whatever it is, within minutes of meeting you.",
"You tend to have strong, angular features - something classically structured about your face or a dignified quality to your bearing that reads as authority.",
"The challenge of this Ascendant is that your composure can read as coldness or aloofness, keeping people at a distance who would benefit from knowing the warmth underneath.",
"Capricorn Rising people often achieve more recognition later in life than early - Saturn takes time, and your outer success tends to build steadily and then compound dramatically.",
"Your life themes revolve around authority, mastery, legacy, and the distinction between external achievement and genuine inner fulfillment.",
"Saturn ruling your chart means discipline, structure, and long-term vision are core to how you engage with the world - and you tend to be taken seriously in whatever you do.",
"You have an unusual capacity for patience and sustained effort that allows you to accomplish things that simply exhaust people who need faster results.",
],
"Aquarius-Rising": [
"Aquarius Rising means Uranus and Saturn co-rule your chart, giving you a distinctive, unconventional, and somehow futuristic outer quality that sets you apart in any room.",
"Your first impression is original, slightly unpredictable, and genuinely interesting. People can’t quite categorize you, which is exactly as you intend.",
"You tend to have a distinctive quality to your appearance or style - something that marks you as someone who makes their own choices about how to present themselves.",
"The challenge of this Ascendant is that your need for independence can make you appear detached or emotionally unavailable, even when your inner experience is warm and engaged.",
"Aquarius Rising people often find themselves in the role of the outsider who becomes the pioneer - initially misunderstood, eventually influential.",
"Your life themes revolve around individuality, community, innovation, and the tension between belonging and maintaining your absolute uniqueness.",
"Uranus ruling your chart means disruption, originality, and radical thinking are core to your outer expression - you are here to shake things up, even if gently.",
"You tend to be ahead of your time in your thinking and your way of living. What you normalize today, others will adopt in five to ten years.",
],
"Pisces-Rising": [
"Pisces Rising means Neptune and Jupiter co-rule your chart, giving you a soft, dreamy, and otherworldly outer quality that makes people feel they’ve stepped into a gentler dimension just by being with you.",
"Your first impression is compassionate, sensitive, and somehow difficult to pin down. People sense that there is more to you than you’re revealing - because there always is.",
"You tend to have soft, large eyes or something fluid and expressive in your features - a quality that conveys depth and emotional availability.",
"The challenge of this Ascendant is that your permeable boundaries mean you absorb the energy of your environment, which requires deliberate and consistent practices to manage.",
"Pisces Rising people are often natural artists, healers, or spiritual seekers - the outer life tends to be drawn toward work that has meaning beyond the material.",
"Your life themes revolve around transcendence, compassion, creative expression, and learning to be present in the physical world without losing your connection to the mystical.",
"Neptune ruling your chart means imagination, spiritual sensitivity, and the blurring of boundaries are core to how you engage with the world - which makes you a natural channel for beauty and healing.",
"People often feel healed, softened, or more themselves just from spending time with you - without being able to explain exactly why. That is your gift.",
],
"Gemini-Mercury": [
"Mercury in Gemini is the planet in its home sign - this is Mercury at its most powerful and natural, giving you one of the sharpest, quickest, and most versatile minds in the zodiac.",
"You process information laterally - making unexpected connections between things that seem unrelated - which is the hallmark of genuine creative intelligence.",
"The shadow of this placement is mental restlessness. Your mind moves so fast that slowing down to complete one thought before moving to the next requires genuine effort.",
"You have a gift for language that goes beyond vocabulary. You understand rhythm, tone, and the emotional register of words in a way that makes your communication unusually effective.",
"Your learning style is broad rather than deep - you absorb information quickly across many areas, which makes you extraordinarily well-rounded but can make sustained expertise feel elusive.",
"You communicate best when you can think out loud. Writing, conversation, and teaching often help you understand your own ideas better than silent reflection.",
"Boredom is cognitively damaging for you in a way that most signs don’t experience. Your brain needs constant new input or it starts to malfunction through anxiety or dissociation.",
"You are an extraordinary mimic - of accents, of communication styles, of the emotional register of whoever you’re talking to - which is a form of social intelligence that borders on genius.",
],
"Virgo-Mercury": [
"Mercury in Virgo is exalted - this is considered the highest expression of Mercury’s energy, giving you a mind that is precise, analytical, and extraordinarily capable of making sense of complexity.",
"You have an instinctive ability to find the flaw in any argument, system, or plan - which makes you invaluable as an editor, analyst, or advisor, and occasionally exhausting as a partner.",
"The shadow of this placement is overthinking - your mind’s ability to analyze can outrun its ability to decide, leaving you in loops of consideration that prevent action.",
"You have a natural gift for writing - particularly clear, precise, well-organized prose. You communicate more effectively on the page than most people do in person.",
"Your learning style is meticulous. You want to understand things thoroughly before you feel confident discussing them, which means you may undersell your actual knowledge.",
"You have an extraordinary eye for language - you notice the wrong word, the imprecise phrase, the grammatical error in a way that is automatic and unavoidable.",
"Health, nutrition, and the body are often areas where your analytical mind excels - you can research, systematize, and apply information about physical wellbeing with unusual effectiveness.",
"Your mind is most at peace when it has a problem to solve. Purposeless mental activity - idle gossip, circular conversation - genuinely drains you.",
],
"Aries-Mars": [
"Mars in Aries is the planet in its home sign - Mars rules Aries - meaning your drive, desire, and capacity for action are operating at their most natural and powerful.",
"You have one of the most direct and courageous drives in the zodiac. When you want something, you go for it immediately, without the deliberation that slows other placements down.",
"Your anger is the most honest in the zodiac - it flares, it’s real, and it passes. You rarely hold grudges because the emotion moves through you too fast to calcify.",
"The shadow of this placement is impulsiveness - acting before thinking, starting before planning, committing before you’ve considered the full picture.",
"You have an extraordinary capacity to start things. The challenge is finishing them, because once the initial thrill of initiation fades, maintaining momentum requires discipline that doesn’t come as naturally.",
"Competition doesn’t frighten you - it energizes you. You perform better when there’s something at stake and someone to measure yourself against.",
"Physical activity is not optional for your mental health with this placement. Mars energy needs a physical outlet or it turns inward as irritability, anxiety, or restlessness.",
"You have a natural instinct for leadership in high-pressure situations. When things get urgent, you don’t freeze - you move.",
],
"Scorpio-Mars": [
"Mars in Scorpio gives you one of the most strategically powerful drives in the zodiac. You don’t just want - you pursue with a patience and intensity that borders on unstoppable.",
"Your motivation runs beneath the surface. People may not realize how driven you are until they try to get in your way - and then it becomes very clear.",
"The shadow of this placement is vindictiveness. You have a long memory for slights, and your revenge - when it comes - is rarely explosive but often devastatingly effective.",
"You have an extraordinary capacity for sustained effort toward a goal. You can wait. You can strategize. You can outlast almost anyone.",
"Your sexuality is one of the most intense in the zodiac - full of depth, psychology, and a desire for genuine merger rather than mere physical satisfaction.",
"You are drawn to power dynamics - understanding them, navigating them, and often mastering them - which makes you highly effective in competitive or complex environments.",
"When you commit to something or someone, you commit completely. Half-hearted effort is genuinely foreign to you.",
"Your instinct in conflict is not to explode but to observe, gather information, and respond at the most strategic possible moment - which is far more effective than most people expect.",
],
"Sagittarius-Jupiter": [
"Jupiter in Sagittarius is the planet in its home sign - this is Jupiter operating at its most abundant and expansive, giving you a genuinely fortunate relationship with growth, opportunity, and belief.",
"You have a natural magnetism that attracts teachers, mentors, opportunities, and experiences that expand your understanding of the world.",
"Your optimism is not naivety - it is a deeply held philosophical position that life is fundamentally meaningful and that things tend to work out. And for you, they often do.",
"The shadow of this placement is excess - too much confidence, too many commitments, too grand a vision without the practical steps to match it.",
"You are at your most alive when you’re learning, traveling, teaching, or exploring the edges of what you previously believed was possible.",
"Your generosity is one of your most defining qualities. You give abundantly - of your time, your knowledge, your resources, your enthusiasm - because abundance feels natural to you.",
"You have a gift for seeing the bigger picture in situations where others are lost in the details, which makes you a valuable strategic thinker and inspiring guide.",
"Faith - in people, in ideas, in the universe - is your most reliable resource. Even when things fall apart, you find a way to believe in what comes next.",
],
"Capricorn-Saturn": [
"Saturn in Capricorn is the planet in its home sign - Saturn rules Capricorn - meaning your relationship with discipline, structure, and long-term achievement is operating at its most potent.",
"You have an unusual capacity to delay gratification in service of something more significant. You understand that the best things are built slowly, and you build accordingly.",
"The shadow of this placement is an internalized authority that is never fully satisfied - a voice that says ‘more, better, harder’ regardless of what you’ve actually accomplished.",
"You were likely given more responsibility than was appropriate for your age - which built incredible competence and a quiet loneliness that you may not have fully named.",
"Your relationship with authority is complex - you respect it, you can embody it, and you have a finely tuned sense of when it is being abused.",
"Saturn returns at approximately 29-30 and 58-60 years old, which are often turning points of reckoning and restructuring for this placement in particular.",
"Your standards are high - for yourself above all - which means failure hits you harder than most, and you tend to be harder on yourself than anyone around you ever would be.",
"The gift of Saturn in Capricorn is that the things you build are real. Not flash, not luck - genuinely solid, genuinely earned. That is not something everyone can say.",
],
"Scorpio-Pluto": [
"Pluto in Scorpio (born approx. 1983-1995) - your generation was forged in psychological intensity. You arrived already knowing that transformation is not optional, it’s survival.",
"Your generation broke open the cultural conversation around trauma, mental health, sexuality, and power in ways that no generation before you had the language or courage to do.",
"You have a collective obsession with truth beneath the surface - fake, performative, or shallow culture genuinely repels you at an instinctive level.",
"The wound your generation carries is around trust and betrayal. The gift is an extraordinary collective capacity for radical honesty and deep psychological healing.",
"You don’t fear darkness. You were born into it and you know your way around - which is why you’re often the one others come to when things get real.",
"Your generation is doing the psychological excavation work that previous generations refused - and it is genuinely changing what it means to be a conscious human being.",
"You transform completely and repeatedly throughout your life - not despite the intensity, but through it. Each version of you is genuinely unrecognizable from the last.",
"Pluto in Scorpio people often feel they have lived multiple lifetimes within one. That’s because, in a meaningful sense, you have.",
],
"Sagittarius-Pluto": [
"Pluto in Sagittarius (born approx. 1995-2008) - your generation is here to transform belief itself. Every inherited truth is up for examination, and you will not accept anything on faith alone.",
"You grew up watching ideological systems collapse in real time - political, religious, social - which gave you a profound skepticism and an equally profound hunger for something real to believe in.",
"Your generation’s relationship to truth is complex. You know information can be weaponized, which makes you both more questioning and sometimes more vulnerable to alternative narratives.",
"Freedom - of thought, of movement, of identity - is non-negotiable for you at a soul level. Any structure that limits this feels like an existential threat.",
"The shadow of this placement is fanaticism - when the need to believe becomes so strong that you hold to a truth past the point where the evidence supports it.",
"Your gift is the courage to question everything - including yourself - and to keep seeking even when the seeking is uncomfortable.",
"Your generation will rewrite the spiritual map of humanity. Not by returning to old religions, but by building new frameworks of meaning from lived experience.",
"You don’t just want the truth - you want the truth behind the truth. Surface answers are genuinely unsatisfying to you, which makes you one of the most philosophically serious generations alive.",
],
"Capricorn-Pluto": [
"Pluto in Capricorn (born approx. 2008-2024) - you arrived as the old world was visibly crumbling. Corrupt institutions, collapsing economies, climate emergency - this was your cradle.",
"Your generation has an instinctive radar for structural rot. You can see where systems have been hollowed out by corruption or inertia before the surface has shown any cracks.",
"You take authority seriously - but only authority that has genuinely earned it. Titles, credentials, and inherited status mean almost nothing to you without demonstrated integrity.",
"Your generation’s task is not just to critique the failing systems - it’s to build the replacements. That is enormous, serious, generational work.",
"You carry a gravity and seriousness that older generations sometimes find unsettling in someone so young. You came in knowing things were urgent.",
"The shadow of this placement is cynicism - becoming so accustomed to institutional failure that you stop believing in the possibility of anything better.",
"Your generation’s gift is pragmatic transformation - not idealistic revolution, but disciplined, structural rebuilding from the ground up.",
"You are old souls who arrived at exactly the right moment. The world needed people who could hold the weight of this transition without breaking - and that is you.",
],
"Aquarius-Pluto": [
"Pluto in Aquarius (born approx. 2023-2043) - your generation arrives as artificial intelligence, collective consciousness, and radical social reorganization reshape what it means to be human.",
"You carry a revolutionary charge that existing social structures were not designed to contain. The old frameworks of community, identity, and collective organization will need to evolve to hold you.",
"The tension at the heart of your generation is individual versus collective - how to be fully yourself within systems that require collective participation and sacrifice.",
"You will define what humanity means in an age of artificial intelligence. That is not a small task. It may be the most important task any generation has ever been given.",
"Your gift is the ability to imagine and build social systems that genuinely serve everyone - not just the powerful, not just the majority, but the full human family.",
"The shadow of this placement is the loss of individual identity in the collective - the dissolution of the self into the group, the algorithm, the movement.",
"You are architects of a new era. The blueprints haven’t been drawn yet, but they are encoded in who you are and what you care about.",
"History will look back at your generation as the one that decided what kind of future humanity actually chose. No pressure - but also, exactly the right amount of pressure.",
],
};
const emojis = {
Sun:"☀️", Moon:"🌙", Mercury:"☿", Venus:"♀️", Mars:"♂️",
Jupiter:"♃", Saturn:"♄", Uranus:"♅", Neptune:"♆", Pluto:"♇", Rising:"⬆️",
Aries:"♈", Taurus:"♉", Gemini:"♊", Cancer:"♋", Leo:"♌", Virgo:"♍",
Libra:"♎️", Scorpio:"♏", Sagittarius:"♐", Capricorn:"♑️", Aquarius:"♒", Pisces:"♓",
};
const colors = {
Aries:"#ff6b6b", Taurus:"#a8c97f", Gemini:"#f7c948", Cancer:"#a3c4d8",
Leo:"#ffab40", Virgo:"#8fbc8f", Libra:"#d4a5c9", Scorpio:"#a03060",
Sagittarius:"#e07b39", Capricorn:"#8b7355", Aquarius:"#5bc8d8", Pisces:"#9b8fcc",
};
function getFact(sign, planet) {
const key = `${sign}-${planet}`;
if (facts[key]) {
const arr = facts[key];
return arr[Math.floor(Math.random() * arr.length)];
}
const pfx = OUTER.includes(planet) ? `${planet} in ${sign} - ` : "";
const planetContext = {
Sun: "your core identity and life force are shaped by",
Moon: "your emotional world and instinctive responses are colored by",
Mercury: "your mind, communication style, and way of processing information are shaped by",
Venus: "your approach to love, beauty, and what you value most is expressed through",
Mars: "your drive, ambition, and the way you pursue what you want is channeled through",
Jupiter: "your relationship to growth, abundance, and where life expands most naturally is found in",
Saturn: "your relationship to discipline, structure, and your deepest lessons in life are shaped by",
Rising: "the mask you wear and the energy you lead with in the world is that of",
Uranus: "your generation’s collective impulse toward radical change and innovation is expressed through",
Neptune: "your generation’s relationship to spirituality, idealism, and transcendence is shaped by",
Pluto: "your generation’s deepest transformation and collective evolution is carried through",
};
const ctx = planetContext[planet] || "this placement means";
const generics = [
`${pfx}${ctx} ${sign} - a combination that gives you a genuinely rare and specific way of engaging with this area of life.`,
`${pfx}${ctx} ${sign} - which means the qualities of ${sign} are deeply woven into how you experience this part of yourself.`,
`${pfx}${ctx} ${sign} - study the themes of ${sign} deeply, and you'll understand something essential about who you are.`,
`${pfx}${ctx} ${sign} - an influence that shapes you in ways you may recognize immediately or only understand in retrospect.`,
`${pfx}${ctx} ${sign} - making this one of the most revealing placements in understanding your full astrological story.`,
];
return generics[Math.floor(Math.random() * generics.length)];
}
function drawShareCard(canvas, sign, planet, fact) {
const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;
ctx.fillStyle = "#0d0a14";
ctx.fillRect(0, 0, W, H);
for (let i = 0; i < 140; i++) {
const x = Math.random()*W, y = Math.random()*H, r = Math.random()*1.8+0.3;
ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2);
ctx.fillStyle = `rgba(255,255,255,${Math.random()*0.6+0.15})`; ctx.fill();
}
const accent = colors[sign] || "#e8a800";
const shimmer = (y) => { const g=ctx.createLinearGradient(0,0,W,0); g.addColorStop(0,"transparent"); g.addColorStop(0.5,accent); g.addColorStop(1,"transparent"); ctx.fillStyle=g; ctx.fillRect(0,y,W,2); };
shimmer(70); shimmer(H-70);
ctx.textAlign = "center";
ctx.fillStyle = accent;
ctx.font = "bold 26px Georgia";
ctx.fillText("✦ CELESTIAL INSIGHTS ✦", W/2, 120);
ctx.font = "72px serif";
ctx.fillText(`${emojis[planet]||""} ${emojis[sign]||""}`, W/2, 230);
ctx.fillStyle = "#e8dcc8";
ctx.font = "italic 38px Georgia";
ctx.fillText(`${planet} in ${sign}`, W/2, 300);
const gen = generationDates[planet]?.[sign];
if (gen) { ctx.fillStyle = accent; ctx.font = "22px Georgia"; ctx.fillText(`Born approx. ${gen}`, W/2, 344); }
const divY = gen ? 380 : 350;
const dg = ctx.createLinearGradient(100,0,W-100,0); dg.addColorStop(0,"transparent"); dg.addColorStop(0.5,"rgba(255,255,255,0.18)"); dg.addColorStop(1,"transparent");
ctx.fillStyle = dg; ctx.fillRect(80, divY, W-160, 1);
ctx.fillStyle = "#ddd0be"; ctx.font = "italic 30px Georgia";
const words = `"${fact}"`.split(" ");
let line="", y=divY+60, lh=46;
for (const w of words) {
const t = line ? line+" "+w : w;
if (ctx.measureText(t).width > W-140 && line) { ctx.fillText(line, W/2, y); line=w; y+=lh; } else line=t;
}
if (line) ctx.fillText(line, W/2, y);
ctx.fillStyle = "rgba(201,169,110,0.5)"; ctx.font = "20px Georgia";
ctx.fillText("celestialinsights.app", W/2, H-32);
}
function jdn(year, month, day) {
if (month <= 2) { year; month += 12; }
const A = Math.floor(year / 100);
const B = 2 - A + Math.floor(A / 4);
return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1524.5;
}
function signFromLon(lon) {
const s = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
return s[Math.floor(((lon % 360) + 360) % 360 / 30)];
}
function calcSunLon(jd) {
const T = (jd - 2451545.0) / 36525;
const L0 = 280.46646 + 36000.76983 * T;
const M = (357.52911 + 35999.05029 * T) * Math.PI / 180;
const C = (1.914602 - 0.004817*T) * Math.sin(M) + 0.019993 * Math.sin(2*M);
return (L0 + C) % 360;
}
function calcMoonLon(jd) {
const T = (jd - 2451545.0) / 36525;
const L = 218.3165 + 481267.8813 * T;
const M = (357.5291 + 35999.0503 * T) * Math.PI / 180;
const Mm = (134.9634 + 477198.8676 * T) * Math.PI / 180;
const D = (297.8502 + 445267.1115 * T) * Math.PI / 180;
const F = (93.2721 + 483202.0175 * T) * Math.PI / 180;
const lon = L

- 6.2888 * Math.sin(Mm)
- 1.2740 * Math.sin(2*D - Mm)
- 0.6583 * Math.sin(2*D)
- 0.2136 * Math.sin(2*Mm)

- 0.1851 * Math.sin(M)
- 0.1143 * Math.sin(2*F)

- 0.0588 * Math.sin(2*D - 2*Mm)
- 0.0572 * Math.sin(2*D - M - Mm)
- 0.0533 * Math.sin(2*D + Mm);
  return lon % 360;
  }
  function calcRising(jd, hour, lat, lon) {
  const T = (jd - 2451545.0) / 36525;
  const GMST = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933*T*T;
  const LST = ((GMST + lon) % 360 + 360) % 360;
  const eps = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
  const RAMC = LST;
  const latR = lat * Math.PI / 180;
  const epsR = eps;
  const ascLon = Math.atan2(Math.cos(RAMC * Math.PI/180), -(Math.sin(RAMC * Math.PI/180) * Math.cos(epsR) + Math.tan(latR) * Math.sin(epsR))) * 180/Math.PI;
  return ((ascLon + 360) % 360);
  }
  function calcPlanetLon(jd, planet) {
  const T = (jd - 2451545.0) / 36525;
  const data = {
  Mercury: { L: 252.250906 + 149474.0722491*T, e: 0.20563175, a: 0.387098 },
  Venus: { L: 181.979801 + 58519.2130302*T, e: 0.00677192, a: 0.723330 },
  Mars: { L: 355.433275 + 19141.6964746*T, e: 0.09340065, a: 1.523688 },
  Jupiter: { L: 34.351519 + 3036.3027748*T, e: 0.04849793, a: 5.202561 },
  Saturn: { L: 50.077444 + 1223.5110686*T, e: 0.05550825, a: 9.511682 },
  Uranus: { L: 314.055005 + 429.8640561*T, e: 0.04629590, a: 19.21948 },
  Neptune: { L: 304.348665 + 219.8833092*T, e: 0.00898809, a: 30.18987 },
  Pluto: { L: 238.92903833 + 145.20780515*T, e: 0.24882730, a: 39.48211 },
  };
  const p = data[planet];
  if (!p) return 0;
  return ((p.L % 360) + 360) % 360;
  }
  function capitalize(str) {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
  const CITY_COORDS = {
  "washington": { lat: 38.9072, lon: -77.0369 },
  "new york": { lat: 40.7128, lon: -74.0060 },
  "los angeles": { lat: 34.0522, lon: -118.2437 },
  "chicago": { lat: 41.8781, lon: -87.6298 },
  "houston": { lat: 29.7604, lon: -95.3698 },
  "phoenix": { lat: 33.4484, lon: -112.0740 },
  "philadelphia": { lat: 39.9526, lon: -75.1652 },
  "san antonio": { lat: 29.4241, lon: -98.4936 },
  "san diego": { lat: 32.7157, lon: -117.1611 },
  "dallas": { lat: 32.7767, lon: -96.7970 },
  "miami": { lat: 25.7617, lon: -80.1918 },
  "atlanta": { lat: 33.7490, lon: -84.3880 },
  "boston": { lat: 42.3601, lon: -71.0589 },
  "seattle": { lat: 47.6062, lon: -122.3321 },
  "denver": { lat: 39.7392, lon: -104.9903 },
  "nashville": { lat: 36.1627, lon: -86.7816 },
  "detroit": { lat: 42.3314, lon: -83.0458 },
  "portland": { lat: 45.5051, lon: -122.6750 },
  "las vegas": { lat: 36.1699, lon: -115.1398 },
  "memphis": { lat: 35.1495, lon: -90.0490 },
  "baltimore": { lat: 39.2904, lon: -76.6122 },
  "louisville": { lat: 38.2527, lon: -85.7585 },
  "milwaukee": { lat: 43.0389, lon: -87.9065 },
  "albuquerque": { lat: 35.0844, lon: -106.6504 },
  "tucson": { lat: 32.2226, lon: -110.9747 },
  "fresno": { lat: 36.7378, lon: -119.7871 },
  "sacramento": { lat: 38.5816, lon: -121.4944 },
  "kansas city": { lat: 39.0997, lon: -94.5786 },
  "mesa": { lat: 33.4152, lon: -111.8315 },
  "omaha": { lat: 41.2565, lon: -95.9345 },
  "cleveland": { lat: 41.4993, lon: -81.6944 },
  "raleigh": { lat: 35.7796, lon: -78.6382 },
  "minneapolis": { lat: 44.9778, lon: -93.2650 },
  "new orleans": { lat: 29.9511, lon: -90.0715 },
  "honolulu": { lat: 21.3069, lon: -157.8583 },
  "anchorage": { lat: 61.2181, lon: -149.9003 },
  };
  async function fetchChartFromServer(birthDate, birthTime, birthCity, birthState) {
  const [year, month, day] = birthDate.split("-").map(Number);
  const [hour, min] = birthTime ? birthTime.split(":").map(Number) : [12, 0];
  function jd(y, m, d, h) {
  if (m <= 2) { y; m += 12; }
  const A = Math.floor(y/100), B = 2 - A + Math.floor(A/4);
  return Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + d + B - 1524.5 + h/24;
  }
  function norm(x) { return ((x % 360) + 360) % 360; }
  function sign(lon) {
  const s = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  return s[Math.floor(norm(lon)/30)];
  }
  const J = jd(year, month, day, hour + min/60);
  const T = (J - 2451545.0) / 36525;
  const L0 = norm(280.46646 + 36000.76983*T);
  const M0 = (norm(357.52911 + 35999.05029*T)) * Math.PI/180;
  const sunLon = norm(L0 + (1.914602-0.004817*T)*Math.sin(M0) + 0.019993*Math.sin(2*M0));
  const Lm = norm(218.3165 + 481267.8813*T);
  const Mm = norm(134.9634 + 477198.8676*T) * Math.PI/180;
  const Dm = norm(297.8502 + 445267.1115*T) * Math.PI/180;
  const moonLon = norm(Lm + 6.2888*Math.sin(Mm) + 1.274*Math.sin(2*Dm-Mm) + 0.6583*Math.sin(2*Dm) + 0.2136*Math.sin(2*Mm));
  const merc = norm(252.250906 + 149474.0722491*T);
  const venus = norm(181.979801 + 58519.2130302*T);
  const mars = norm(355.433275 + 19141.6964746*T);
  const jup = norm(34.351519 + 3036.3027748*T);
  const sat = norm(50.077444 + 1223.5110686*T);
  const uran = norm(314.055005 + 429.8640561*T);
  const nept = norm(304.348665 + 219.8833092*T);
  const plut = norm(238.929038 + 145.207805*T);
  let rising = null;
  if (birthTime) {
  const cities = {"washington":{"lat":38.9072,"lon":-77.0369},"new york":{"lat":40.7128,"lon":-74.006},"los angeles":{"lat":34.0522,"lon":-118.2437},"chicago":{"lat":41.8781,"lon":-87.6298},"houston":{"lat":29.7604,"lon":-95.3698},"miami":{"lat":25.7617,"lon":-80.1918},"atlanta":{"lat":33.749,"lon":-84.388},"dallas":{"lat":32.7767,"lon":-96.797},"boston":{"lat":42.3601,"lon":-71.0589},"seattle":{"lat":47.6062,"lon":-122.3321},"denver":{"lat":39.7392,"lon":-104.9903},"phoenix":{"lat":33.4484,"lon":-112.074},"philadelphia":{"lat":39.9526,"lon":-75.1652},"san diego":{"lat":32.7157,"lon":-117.1611},"nashville":{"lat":36.1627,"lon":-86.7816},"portland":{"lat":45.5051,"lon":-122.675},"las vegas":{"lat":36.1699,"lon":-115.1398},"detroit":{"lat":42.3314,"lon":-83.0458},"memphis":{"lat":35.1495,"lon":-90.049},"baltimore":{"lat":39.2904,"lon":-76.6122},"new orleans":{"lat":29.9511,"lon":-90.0715},"minneapolis":{"lat":44.9778,"lon":-93.265},"cleveland":{"lat":41.4993,"lon":-81.6944},"pittsburgh":{"lat":40.4406,"lon":-79.9959},"sacramento":{"lat":38.5816,"lon":-121.4944},"kansas city":{"lat":39.0997,"lon":-94.5786},"raleigh":{"lat":35.7796,"lon":-78.6382},"omaha":{"lat":41.2565,"lon":-95.9345},"richmond":{"lat":37.5407,"lon":-77.4361},"louisville":{"lat":38.2527,"lon":-85.7585}};
  const key = birthCity.toLowerCase().trim();
  const coords = cities[key] || { lat: 38.9072, lon: -77.0369 };
  const GMST = norm(280.46061837 + 360.98564736629*(J-2451545));
  const LST = norm(GMST + coords.lon);
  const eps = (23.439291 - 0.013004*T) * Math.PI/180;
  const latR = coords.lat * Math.PI/180;
  const RAMC = LST * Math.PI/180;
  const ascRad = Math.atan2(Math.cos(RAMC), -(Math.sin(RAMC)*Math.cos(eps) + Math.tan(latR)*Math.sin(eps)));
  rising = sign(ascRad * 180/Math.PI);
  }
  return { Sun:sign(sunLon), Moon:sign(moonLon), Rising:rising,
  Mercury:sign(merc), Venus:sign(venus), Mars:sign(mars),
  Jupiter:sign(jup), Saturn:sign(sat), Uranus:sign(uran),
  Neptune:sign(nept), Pluto:sign(plut) };
  }
  function parseChartResponse(data, hasBirthTime) {
  const result = {};
  const validSigns = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
  for (const [planet, sign] of Object.entries(data)) {
  if (sign && validSigns.includes(sign)) result[planet] = sign;
  }
  if (!hasBirthTime) delete result["Rising"];
  return result;
  }
  const US_STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virginia","Washington","West Virginia","Wisconsin","Wyoming","District of Columbia","Outside the US"];
  const celebBySign = {};
  celebrities.forEach(c => {
  if (!celebBySign[c.sign]) celebBySign[c.sign] = [];
  celebBySign[c.sign].push(c);
  });
  function CelebrityAvatar({ celeb }) {
  return (

 <div style={{
 background:"rgba(255,200,50,0.04)",
 border:"1px solid rgba(255,200,50,0.15)",
 borderRadius:14,
 padding:"16px 12px",
 textAlign:"center",
 cursor:"default",
 }}>
 <div style={{
 width:72, height:72,
 borderRadius:"50%",
 background:`linear-gradient(135deg,rgba(255,200,50,0.15),rgba(168,224,96,0.1))`,
 border:"2px solid rgba(255,200,50,0.3)",
 margin:"0 auto 10px",
 display:"flex",
 alignItems:"center",
 justifyContent:"center",
 fontSize:32,
 position:"relative",
 overflow:"hidden",
 }}>
 <div style={{fontSize:36}}>{celeb.emoji}</div>
 <div style={{
 position:"absolute",inset:0,
 background:"linear-gradient(to bottom,transparent 40%,rgba(13,10,20,0.4))",
 borderRadius:"50%",
 }}/>
 </div>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#ffffff",marginBottom:4}}>{celeb.name}</div>
 <div style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:12,color:"#a8e060",marginBottom:8}}>Born {celeb.born}</div>
 <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:10,flexWrap:"wrap"}}>
 {[["☀️",celeb.sun],["🌙",celeb.moon],["⬆️",celeb.rising]].map(([icon,val])=>(
 val && val !== "Unknown" ? (
 <span key={icon} style={{background:"rgba(255,200,50,0.08)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:6,padding:"2px 7px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:"#f5c842"}}>
 {icon} {val}
 </span>
 ) : null
 ))}
 </div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:13,color:"#ffffff",lineHeight:1.5,margin:0}}>
 "{celeb.fact}"
 </p>
 </div>
 );
}
function CelebrityConnection() {
 const [selectedSign, setSelectedSign] = useState(null);
 const allSigns = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
 return (
 <div style={{animation:"up .5s ease"}}>
 <div style={{textAlign:"center",marginBottom:24}}>
 <div style={{fontSize:36,marginBottom:10}}>🌟</div>
 <h2 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:26,color:"#ffffff",margin:"0 0 8px"}}>Celebrity Connection</h2>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontStyle:"normal",color:"#a8e060",fontSize:15,margin:0}}>Select a sign to see which celebrity shares that Sun sign.</p>
 </div>
 {/* Sign selector */}
 <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:28}}>
 {allSigns.map(s=>(
 <button
 key={s}
 onClick={()=>setSelectedSign(selectedSign===s?null:s)}
 style={{
 background: selectedSign===s ? `linear-gradient(135deg,${colors[s]},${colors[s]}88)` : "rgba(255,200,50,0.06)",
 border: `2px solid ${selectedSign===s ? "#ff2222" : "rgba(255,200,50,0.2)"}`,
 color: selectedSign===s ? "#0d0a14" : "#f0c030",
 padding:"8px 14px",
 borderRadius:"100px",
 fontFamily:"'Cinzel',serif",
 fontWeight:700,
 fontSize:10,
 letterSpacing:".07em",
 cursor:"pointer",
 transition:"all 0.22s",
 }}
 >{emojis[s]} {s}</button>
 ))}
 </div>
 {/* Results - FIX: slice(0,1) shows only 1 celebrity, single column layout */}
 {selectedSign && (
 <div style={{animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:"#a8e060",marginBottom:16,textAlign:"center"}}>
 ✦ {selectedSign.toUpperCase()} SUN CELEBRITY ✦
 </div>
 {celebBySign[selectedSign] && celebBySign[selectedSign].length > 0 ? (
 <div style={{display:"grid",gridTemplateColumns:"1fr",gap:12,maxWidth:320,margin:"0 auto"}}>
 {celebBySign[selectedSign].slice(0,1).map(c=>(
 <CelebrityAvatar key={c.name} celeb={c} />
 ))}
 </div>
 ) : (
 <div style={{textAlign:"center",padding:"32px 20px",background:"rgba(255,200,50,0.04)",border:"1px solid rgba(255,200,50,0.15)",borderRadius:16}}>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,color:"#f5c842",fontSize:16,margin:0}}>More {selectedSign} celebrities coming soon ✨</p>
 </div>
 )}
 </div>
 )}
 {!selectedSign && (
 <div style={{textAlign:"center",padding:"24px 0",fontFamily:"'Special Elite',cursive",fontWeight:700,color:"#6a6058",fontSize:15}}>
 Select a sign above to reveal the stars ✨
 </div>
 )}
 </div>
 );
}
const guessClues = {
 Aries: ["I act before I think - and somehow it usually works out.", "I've been told I'm 'a lot' more times than I can count.", "I get bored if nothing exciting is happening.", "I would rather lead than follow, always.", "My temper flares fast - but I forgive just as quickly."],
 Taurus: ["People always say my home feels incredibly cozy.", "I know exactly what I like - and I don't apologize for it.", "I take my time with decisions, but once I decide, I'm decided.", "Good food is genuinely one of my love languages.", "I am more stubborn than most people realize."],
 Gemini: ["I can talk to literally anyone about anything.", "I've been called two-faced - I prefer 'multidimensional.'", "My brain never shuts off. Ever.", "I can see every side of an argument, which makes choosing hard.", "I pick up new skills incredibly fast but rarely stick with them long."],
 Cancer: ["I remember exactly how every important moment felt.", "My home is my sanctuary - I take it very seriously.", "I can sense someone's mood the moment I walk in the room.", "I tend to nurture everyone around me without being asked.", "I hold on to things - memories, people, feelings - for a long time."],
 Leo: ["I light up in front of an audience, even if it's just two people.", "I am incredibly loyal - but I expect the same in return.", "I've been told I have a presence that's hard to ignore.", "I genuinely love making people feel special and celebrated.", "My pride is real - apologizing doesn't come naturally."],
 Virgo: ["I notice the detail everyone else walked right past.", "My inner critic is louder than anyone else's voice.", "I show love by helping - practically, specifically, efficiently.", "I research things obsessively before making a decision.", "I feel physically calmer when my space is organized."],
 Libra: ["I can see both sides of any argument so clearly it's hard to pick one.", "I have a strong physical reaction to things that are ugly or discordant.", "Conflict genuinely makes me uncomfortable in my body.", "People always come to me to help them navigate their relationships.", "I fall in love with the idea of partnership - deeply."],
 Scorpio: ["I can tell when someone is lying almost immediately.", "I don't do anything halfway - it's all or nothing.", "I've completely reinvented myself at least once, maybe more.", "I remember everything. Especially the things that hurt.", "People find me magnetic but slightly hard to read - intentionally."],
 Sagittarius: ["I genuinely believe things will work out - and they usually do.", "I need freedom more than I need almost anything else.", "I say exactly what I think, sometimes before I should.", "Travel or learning something new resets me completely.", "I have a philosophy for life that I've built entirely from scratch."],
 Capricorn: ["I have always felt older than my actual age.", "I set standards for myself that most people would find exhausting.", "My dry humor surprises people who only know my serious side.", "I take commitments - in work and love - very, very seriously.", "Life genuinely gets better for me the older I get."],
 Aquarius: ["I've always felt slightly outside the group, even when I'm in it.", "I care about humanity as a whole more than I care about fitting in.", "I need space the way other people need air.", "I was thinking about things years ago that people are only now discussing.", "My emotional needs are genuinely different from most people's."],
 Pisces: ["I absorb other people's moods without meaning to.", "I have a rich inner world that is more real to me than most of reality.", "Creative work isn't just something I do - it's how I survive.", "I often know things without knowing how I know them.", "I love without limits, which is both my gift and my wound."],
};
function GuessYourSign() {
 const [step, setStep] = useState(0);
 const [currentSign, setCurrentSign] = useState(null);
 const [clueIndex, setClueIndex] = useState(0);
 const [guess, setGuess] = useState(null);
 const [score, setScore] = useState({ correct: 0, total: 0 });
 const [feedback, setFeedback] = useState(null);
 const allSigns = Object.keys(guessClues);
 const startGame = () => {
 const s = allSigns[Math.floor(Math.random() * allSigns.length)];
 setCurrentSign(s);
 setClueIndex(0);
 setGuess(null);
 setFeedback(null);
 setStep(1);
 };
 const nextClue = () => {
 if (clueIndex < guessClues[currentSign].length - 1) setClueIndex(i => i+1);
 };
 const makeGuess = (g) => {
 setGuess(g);
 const correct = g === currentSign;
 setScore(s => ({ correct: s.correct + (correct?1:0), total: s.total+1 }));
 setFeedback(correct ? "✓ Correct! " + currentSign + " energy is undeniable." : "Not quite - this was " + currentSign + ". " + (emojis[currentSign]||""));
 setStep(2);
 };
 const accent = "#e8a800";
 if (step === 0) return (
 <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
 <div style={{fontSize:48,marginBottom:16}}>🔮</div>
 <h2 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:28,color:"#ffffff",marginBottom:12}}>Guess Your Sign</h2>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontStyle:"normal",color:"#a8e060",fontSize:16,marginBottom:32}}>Read the clues. Guess the zodiac sign. How well do you know the signs?</p>
 <button className="rb" style={{"--a":accent}} onClick={startGame}>✦ START GUESSING</button>
 {score.total > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#f5c842",marginTop:20}}>Score: {score.correct}/{score.total}</p>}
 </div>
 );
 if (step === 1) return (
 <div style={{animation:"up .5s ease"}}>
 <div style={{background:"rgba(255,200,50,0.06)",border:"1px solid rgba(255,200,50,0.25)",borderRadius:20,padding:"28px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
 <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#e8a800,transparent)"}}/>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".2em",color:"#a8e060",marginBottom:16}}>CLUE {clueIndex+1} OF {guessClues[currentSign].length}</div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:22,color:"#ffffff",lineHeight:1.6,margin:"0 0 20px"}}>"{guessClues[currentSign][clueIndex]}"</p>
 {clueIndex < guessClues[currentSign].length - 1 && (
 <button onClick={nextClue} style={{background:"none",border:"1px solid rgba(168,224,96,0.3)",color:"#a8e060",padding:"8px 20px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,cursor:"pointer",letterSpacing:".1em"}}>
 NEXT CLUE →
 </button>
 )}
 </div>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15em",color:"#f5c842",marginBottom:12}}>YOUR GUESS:</div>
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
 {allSigns.map(s=>(
 <button key={s} className="sb" style={{"--a":colors[s]}} onClick={()=>makeGuess(s)}>
 <div style={{fontSize:14,marginBottom:2}}>{emojis[s]||"★"}</div>
 <div style={{fontSize:9,fontWeight:700}}>{s}</div>
 </button>
 ))}
 </div>
 </div>
 );
 if (step === 2) return (
 <div style={{animation:"up .5s ease",textAlign:"center"}}>
 <div style={{background: guess===currentSign ? "rgba(168,224,96,0.08)" : "rgba(255,80,80,0.08)", border: `1px solid ${guess===currentSign ? "rgba(168,224,96,0.4)" : "rgba(255,100,100,0.3)"}`,borderRadius:20,padding:"32px 24px",marginBottom:24}}>
 <div style={{fontSize:40,marginBottom:12}}>{emojis[currentSign]||"★"}</div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:20,color: guess===currentSign ? "#a8e060" : "#f5c842",margin:"0 0 8px"}}>{feedback}</p>
 <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15em",color:"#f5c842",margin:0}}>SCORE: {score.correct}/{score.total}</p>
 </div>
 <button className="rb" style={{"--a":accent}} onClick={startGame}>✦ PLAY AGAIN</button>
 </div>
 );
}
export default function AstrologyApp() {
 const [mode, setMode] = useState("home");
 const [topTab, setTopTab] = useState("facts");
 const [selectedSign, setSelectedSign] = useState(null);
 const [selectedPlanet, setSelectedPlanet] = useState(null);
 const [fact, setFact] = useState(null);
 const [animating, setAnimating] = useState(false);
 const [shareSuccess, setShareSuccess] = useState("");
 const canvasRef = useRef(null);
 const [birthDate, setBirthDate] = useState("");
 const [birthState, setBirthState] = useState("");
 const [birthCity, setBirthCity] = useState("");
 const [birthTime, setBirthTime] = useState("");
 const [chartData, setChartData] = useState(null);
 const [chartReading, setChartReading] = useState(null);
 const [refreshing, setRefreshing] = useState({});
 const [chartLoading, setChartLoading] = useState(false);
 const [chartError, setChartError] = useState("");
 const [loadingStep, setLoadingStep] = useState("");
 const accent = selectedSign ? colors[selectedSign] : "#e8a800";
 const handleReveal = () => {
 if (!selectedSign || !selectedPlanet) return;
 setAnimating(true); setFact(null);
 setTimeout(() => { setFact(getFact(selectedSign, selectedPlanet)); setAnimating(false); }, 500);
 };
 const handleShare = (sign, planet, factText, key) => {
 const canvas = canvasRef.current;
 canvas.width = 1080; canvas.height = 1350;
 drawShareCard(canvas, sign, planet, factText);
 canvas.toBlob(blob => {
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a"); a.href=url; a.download=`${planet}-in-${sign}.png`; a.click();
 URL.revokeObjectURL(url);
 setShareSuccess(key);
 setTimeout(() => setShareSuccess(""), 3000);
 });
 };
 const handleGenerateChart = async () => {
 if (!birthDate || !birthCity) return;
 setChartLoading(true);
 setChartError("");
 setChartData(null);
 setChartReading(null);
 try {
 setLoadingStep("Finding your birth location...");
 await new Promise(r => setTimeout(r, 600));
 setLoadingStep("Calculating your planetary positions...");
 let raw;
 try {
 raw = await fetchChartFromServer(birthDate, birthTime, birthCity, birthState);
 } catch(fetchErr) {
 throw new Error("Connection error: " + fetchErr.message);
 }
 if (raw.error) throw new Error("API error: " + raw.error);
 const computed = parseChartResponse(raw, !!birthTime);
 if (!Object.keys(computed).length) throw new Error("No planets found in response: " + JSON.stringify(raw).slice(0,200));
 setChartData(computed);
 const reading = {};
 Object.entries(computed).forEach(([planet, sign]) => { if (sign) reading[planet] = getFact(sign, planet); });
 setChartReading(reading);
 } catch (err) {
 setChartError(err.message || "Something went wrong. Please try again.");
 } finally {
 setChartLoading(false);
 setLoadingStep("");
 }
 };
 const refreshOne = (planet) => {
 setRefreshing(prev=>({...prev,[planet]:true}));
 setTimeout(()=>{
 setChartReading(prev=>({...prev,[planet]:getFact(chartData[planet],planet)}));
 setRefreshing(prev=>{const n={...prev};delete n[planet];return n;});
 }, 400);
 };
 const resetChart = () => { setBirthDate(""); setBirthState(""); setBirthCity(""); setBirthTime(""); setChartData(null); setChartReading(null); setChartError(""); setLoadingStep(""); };
 const reset = () => { setSelectedSign(null); setSelectedPlanet(null); setFact(null); };
 return (
 <div style={{minHeight:"100vh",background:"#0d0a14",fontFamily:"Georgia,serif",color:"#ffffff",position:"relative",overflow:"hidden"}}>
 <canvas ref={canvasRef} style={{display:"none"}} />
 {/* Stars */}
 <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
 {[...Array(70)].map((_,i)=>(
 <div key={i} style={{position:"absolute",width:Math.random()*2.5+0.4+"px",height:Math.random()*2.5+0.4+"px",borderRadius:"50%",background: i%7===0 ? `rgba(168,224,96,${Math.random()*0.5+0.2})` : `rgba(255,200,50,${Math.random()*0.5+0.15})`,left:Math.random()*100+"%",top:Math.random()*100+"%",animation:`tw ${Math.random()*3+2}s ease-in-out infinite`,animationDelay:Math.random()*4+"s"}}/>
 ))}
 </div>
 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Cinzel:wght@700;900&family=Courier+Prime:wght@400;700&display=swap');
 @keyframes tw{0%,100%{opacity:0.2}50%{opacity:1}}
 @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
 @keyframes sh{0%{background-position:200% center}100%{background-position:-200% center}}
 @keyframes gl{0%,100%{box-shadow:0 0 18px 3px rgba(201,169,110,0.25)}50%{box-shadow:0 0 36px 9px rgba(201,169,110,0.55)}}
 @keyframes pu{0%,100%{opacity:0.4}50%{opacity:1}}
 .sb{background:rgba(255,200,50,0.06);border:2px solid #ff2222;color:#f0c030;padding:9px 12px;border-radius:8px;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.07em;font-weight:700;transition:all .22s;text-align:center}
 .sb:hover,.sb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a);transform:translateY(-2px)}
 .pb{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#c8baa0;padding:9px 18px;border-radius:100px;cursor:pointer;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.09em;font-weight:700;transition:all .22s}
 .pb:hover,.pb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a)}
 .rb{background:linear-gradient(135deg,var(--a),#8a6000);color:#0d0a14;border:2px solid #ff2222;padding:14px 38px;border-radius:100px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.14em;font-weight:700;cursor:pointer;transition:all .3s;animation:gl 3s ease-in-out infinite}
 .rb:hover{transform:scale(1.04);filter:brightness(1.12)}
 .rb:disabled{opacity:.35;cursor:default;animation:none}
 .fc{animation:up .65s ease forwards;background:linear-gradient(135deg,rgba(255,200,50,0.08),rgba(0,0,0,0.3));border:1px solid rgba(255,200,50,0.3);border-radius:20px;padding:30px 34px;position:relative;overflow:hidden}
 .fc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--a),transparent)}
 .cp{background:rgba(255,200,50,0.04);border:1px solid rgba(255,200,50,0.15);border-radius:14px;padding:18px 20px;margin-bottom:10px;animation:up .5s ease both;position:relative;overflow:hidden;transition:opacity .3s}
 .cp::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,var(--pc),transparent)}
 .mb{background:rgba(255,200,50,0.06);border:1px solid rgba(255,200,50,0.2);color:#f0c030;padding:20px 22px;border-radius:16px;cursor:pointer;font-family:'Cinzel',serif;font-size:12px;letter-spacing:.11em;font-weight:700;transition:all .28s;text-align:center;width:100%}
 .mb:hover{background:rgba(255,200,50,0.12);color:#f5c842;transform:translateY(-3px);border-color:rgba(255,200,50,0.4)}
 .shb{background:rgba(168,224,96,0.08);border:1px solid rgba(168,224,96,0.3);color:#a8e060;padding:7px 18px;border-radius:100px;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.1em;cursor:pointer;transition:all .22s}
 .shb:hover{background:rgba(168,224,96,0.15);color:#c8f080}
 .gn{display:inline-block;background:rgba(168,224,96,0.08);border:1px solid rgba(168,224,96,0.3);border-radius:100px;padding:2px 10px;font-family:'Cinzel',serif;font-size:9px;letter-spacing:.08em;color:#a8e060;margin-left:7px}
 select{background:#110e1a;border:1px solid rgba(255,255,255,0.1);color:#c8baa0;padding:7px 10px;border-radius:8px;font-family:'Cinzel',serif;font-size:10px;width:100%;cursor:pointer;outline:none;transition:border .2s}
 select:hover{border-color:rgba(255,255,255,0.22)}
 select option{background:#110e1a;color:#c8baa0}
 .bk{background:none;border:none;color:#5a5048;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.13em;display:flex;align-items:center;gap:6px;margin-bottom:28px}
 .bk:hover{color:#9a8e80}
 input[type="date"]:focus,input[type="time"]:focus,input[type="text"]:focus{border-color:rgba(201,169,110,0.5)!important;box-shadow:0 0 0 2px rgba(201,169,110,0.08)}
 input[type="text"]::placeholder{color:#4a4038}
 input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-calendar-picker-indicator{filter:invert(0.5) sepia(1) saturate(0.5);cursor:pointer}
 `}</style>
 <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"20px 18px 80px"}}>
 {/* Top Nav */}
 <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:20,flexWrap:"wrap"}}>
 {[
 {label:"✦ Fun Facts", key:"facts"},
 {label:"★ Celebrity Connection", key:"celebrity"},
 {label:"🔮 Guess Your Sign", key:"guess"},
 ].map(tab=>(
 <button
 key={tab.key}
 onClick={()=>setTopTab(tab.key)}
 style={{
 background: topTab===tab.key ? "linear-gradient(135deg,#e8a800,#8a6000)" : "rgba(255,200,50,0.1)",
 border: topTab===tab.key ? "2px solid #ff3333" : "2px solid rgba(255,200,50,0.35)",
 color: topTab===tab.key ? "#0d0a14" : "#f5c842",
 padding:"12px 20px",
 borderRadius:"100px",
 fontFamily:"'Cinzel',serif",
 fontWeight:900,
 fontSize:12,
 letterSpacing:".1em",
 cursor:"pointer",
 transition:"all 0.25s",
 boxShadow: topTab===tab.key ? "0 0 16px 4px rgba(232,168,0,0.35)" : "none",
 }}
 >{tab.label}</button>
 ))}
 </div>
 {/* CELEBRITY CONNECTION TAB */}
 {topTab==="celebrity" && <CelebrityConnection />}
 {/* GUESS YOUR SIGN TAB */}
 {topTab==="guess" && <GuessYourSign />}
 {/* MAIN CONTENT - only show when on facts tab */}
 {topTab==="facts" && <>
 {/* Header */}
 <div style={{textAlign:"center",marginBottom:18}}>
 <div style={{fontSize:11,fontFamily:"'Cinzel',serif",letterSpacing:".3em",color:"#a8e060",marginBottom:12,opacity:1}}>✦ CELESTIAL INSIGHTS ✦</div>
 <h1 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:"clamp(36px,8vw,60px)",lineHeight:1.05,margin:"0 0 10px",color:"#ffffff",textShadow:"0 0 30px rgba(255,255,255,0.3)"}}>
 Your Cosmic<br/><em>Fun Facts</em>
 </h1>
 <p style={{color:"#c0c0c0",fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:16,margin:0}}>Discover what the stars reveal about you</p>
 </div>
 {/* HOME */}
 {mode==="home" && (
 <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
 <div style={{fontSize:48,marginBottom:20}}>🌙</div>
 <div style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:20,color:"#7a6e62",marginBottom:36}}>
 Choose a sign and a planet to discover your cosmic fun fact.
 </div>
 <button onClick={()=>setMode("single")} style={{
 background:"linear-gradient(135deg,#f5c842,#c88000)",
 border:"2px solid #ff2222",
 color:"#0d0a14",
 padding:"18px 48px",
 borderRadius:"100px",
 fontFamily:"'Cinzel',serif",
 fontWeight:900,
 fontSize:15,
 letterSpacing:".16em",
 cursor:"pointer",
 boxShadow:"0 0 30px 8px rgba(245,200,66,0.4),0 0 60px 16px rgba(245,200,66,0.15)",
 animation:"gl 3s ease-in-out infinite",
 transition:"all 0.3s",
 }}>
 ✦ EXPLORE YOUR PLACEMENTS
 </button>
 </div>
 )}
 {/* SINGLE */}
 {mode==="single" && (
 <div style={{animation:"up .45s ease"}}>
 <button className="bk" onClick={()=>{setMode("home");reset();}}>← BACK</button>
 {/* Sign */}
 <div style={{marginBottom:30}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:accent,marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
 <span style={{width:19,height:19,borderRadius:"50%",background:accent,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0d0a14",fontWeight:700,flexShrink:0}}>1</span>
 SELECT YOUR SIGN
 </div>
 <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"center"}}>
 {/* Tip of A - 1 sign */}
 <div style={{display:"grid",gridTemplateColumns:"1fr",gap:6,width:"25%"}}>
 {["Aries"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--a":colors[s]}} onClick={()=>{setSelectedSign(s);setFact(null);}}>
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Row 2 - 2 signs */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,width:"50%"}}>
 {["Taurus","Gemini"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--a":colors[s]}} onClick={()=>{setSelectedSign(s);setFact(null);}}>
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Row 3 - 3 signs */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,width:"75%"}}>
 {["Cancer","Virgo"].map((s,i)=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--a":colors[s],gridColumn:i===0?"1":"3"}} onClick={()=>{setSelectedSign(s);setFact(null);}}>
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 {/* Leo as shooting star */}
 <div
 onClick={()=>{setSelectedSign("Leo");setFact(null);}}
 style={{
 gridColumn:"2",
 gridRow:"1",
 cursor:"pointer",
 display:"flex",
 flexDirection:"column",
 alignItems:"center",
 justifyContent:"center",
 padding:"10px 6px",
 borderRadius:8,
 position:"relative",
 background: selectedSign==="Leo" ? "rgba(255,171,64,0.18)" : "transparent",
 transition:"all 0.25s",
 }}
 >
 <style>{`
 @keyframes shoot {
 0% { transform: translateX(-8px) translateY(8px) rotate(-35deg); opacity:0; }
 30% { opacity:1; }
 100% { transform: translateX(8px) translateY(-8px) rotate(-35deg); opacity:0; }
 }
 @keyframes shootTrail {
 0% { opacity:0; width:0px; }
 30% { opacity:0.8; }
 100% { opacity:0; width:22px; }
 }
 .leo-star { animation: shoot 2.2s ease-in-out infinite; }
 .leo-trail { animation: shootTrail 2.2s ease-in-out infinite; }
 `}</style>
 <div style={{position:"relative",width:36,height:28,marginBottom:3}}>
 <div className="leo-trail" style={{
 position:"absolute",
 top:"52%",left:"10%",
 height:2,
 background:"linear-gradient(90deg,transparent,#ffab40)",
 borderRadius:2,
 transformOrigin:"right center",
 transform:"rotate(-35deg)",
 }}/>
 <div className="leo-star" style={{
 position:"absolute",
 top:"10%",right:"5%",
 fontSize:16,
 filter: selectedSign==="Leo" ? "drop-shadow(0 0 6px #ffab40)" : "drop-shadow(0 0 3px #ffab40)",
 }}>⭐</div>
 </div>
 <div style={{
 fontFamily:"'Cinzel',serif",
 fontWeight:700,
 fontSize:9,
 letterSpacing:".07em",
 color: selectedSign==="Leo" ? "#ffab40" : "#f0c030",
 textShadow: selectedSign==="Leo" ? "0 0 8px #ffab40" : "none",
 }}>Leo</div>
 </div>
 </div>
 {/* Crossbar of A - 4 signs full width */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,width:"100%"}}>
 {["Libra","Scorpio","Sagittarius","Capricorn"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--a":colors[s]}} onClick={()=>{setSelectedSign(s);setFact(null);}}>
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Legs of A - 2 signs on outer sides with gap */}
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,width:"100%"}}>
 {["Aquarius","Pisces"].map((s,i)=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--a":colors[s],gridColumn:i===0?"1":"4"}} onClick={()=>{setSelectedSign(s);setFact(null);}}>
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 </div>
 </div>
 {/* Planet */}
 {selectedSign && (
 <div style={{marginBottom:30,animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:accent,marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
 <span style={{width:19,height:19,borderRadius:"50%",background:accent,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0d0a14",fontWeight:700,flexShrink:0}}>2</span>
 SELECT YOUR PLANET
 </div>
 <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
 {planets.map(p=>(
 <button key={p} className={`pb${selectedPlanet===p?" sel":""}`} style={{"--a":accent}} onClick={()=>{setSelectedPlanet(p);setFact(null);}}>
 {emojis[p]} {p}
 </button>
 ))}
 </div>
 </div>
 )}
 {/* Reveal */}
 {selectedSign && selectedPlanet && (
 <div style={{textAlign:"center",marginBottom:28,animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Special Elite',cursive",fontSize:19,color:"#f5c842",marginBottom:6}}>
 {emojis[selectedPlanet]} {selectedPlanet} in {selectedSign} {emojis[selectedSign]}
 </div>
 {OUTER.includes(selectedPlanet) && generationDates[selectedPlanet]?.[selectedSign] && (
 <div style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#6a6058",letterSpacing:".09em",marginBottom:18}}>
 Born approx. {generationDates[selectedPlanet][selectedSign]}
 </div>
 )}
 <button className="rb" style={{"--a":accent}} onClick={handleReveal}>
 {fact?"✦ REVEAL ANOTHER FACT":"✦ REVEAL MY COSMIC FACT"}
 </button>
 </div>
 )}
 {animating && <div style={{textAlign:"center",padding:28,color:accent,fontSize:26,animation:"pu .5s ease infinite"}}>✦</div>}
 {fact && !animating && (
 <div className="fc" style={{"--a":accent}}>
 <div style={{fontSize:28,marginBottom:14,textAlign:"center"}}>{emojis[selectedSign]}{emojis[selectedPlanet]}</div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:"clamp(16px,3vw,21px)",lineHeight:1.78,margin:"0 0 22px",fontStyle:"normal",color:"#ffffff",textAlign:"center"}}>"{fact}"</p>
 <div style={{textAlign:"center",display:"flex",alignItems:"center",justifyContent:"center",gap:14,flexWrap:"wrap"}}>
 <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".18em",color:accent,opacity:.7}}>✦ {selectedPlanet.toUpperCase()} IN {selectedSign.toUpperCase()} ✦</span>
 <button className="shb" onClick={()=>handleShare(selectedSign,selectedPlanet,fact,"single")}>
 {shareSuccess==="single"?"✓ Saved!":"↓ Save Story Card"}
 </button>
 </div>
 </div>
 )}
 {(selectedSign||selectedPlanet) && (
 <div style={{textAlign:"center",marginTop:24}}>
 <button onClick={reset} style={{background:"none",border:"none",color:"#504840",cursor:"pointer",fontFamily:"'Cinzel',serif",fontSize:10,letterSpacing:".13em"}}>
 ← START OVER
 </button>
 </div>
 )}
 </div>
 )}
 </>}
 {/* Footer */}
 <div style={{textAlign:"center",marginTop:60,paddingTop:24,borderTop:"1px solid rgba(255,255,255,0.05)"}}>
 <p style={{fontFamily:"'Special Elite',cursive",fontSize:13,color:"#3a3430",margin:0}}>
 powered by <span style={{color:"#5a5048"}}>Ayssia</span>
 </p>
 </div>
 </div>
 </div>
 );
}
