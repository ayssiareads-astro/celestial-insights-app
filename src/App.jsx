import React, { useState } from "react";

const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
const planets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto","Rising"];
const OUTER = ["Uranus","Neptune","Pluto"];

const generationDates = {
  Uranus: { Aries:"2010-2018",Taurus:"2018-2026",Gemini:"1941-1949",Cancer:"1948-1956",Leo:"1955-1962",Virgo:"1961-1969",Libra:"1968-1975",Scorpio:"1974-1981",Sagittarius:"1981-1988",Capricorn:"1988-1996",Aquarius:"1995-2003",Pisces:"2003-2011" },
  Neptune: { Aries:"2025-2039",Taurus:"1874-1889",Gemini:"1888-1902",Cancer:"1901-1916",Leo:"1914-1929",Virgo:"1928-1943",Libra:"1942-1957",Scorpio:"1955-1970",Sagittarius:"1970-1984",Capricorn:"1984-1998",Aquarius:"1998-2012",Pisces:"2011-2026" },
  Pluto: { Aries:"2068-2097",Taurus:"1851-1884",Gemini:"1882-1914",Cancer:"1912-1939",Leo:"1937-1958",Virgo:"1956-1972",Libra:"1971-1984",Scorpio:"1983-1995",Sagittarius:"1995-2008",Capricorn:"2008-2024",Aquarius:"2023-2043",Pisces:"2043-2068" },
};

const celebrities = [
  { name:"Lady Gaga", sign:"Aries", sun:"Aries", moon:"Scorpio", rising:"Gemini", born:"Mar 28, 1986", emoji:"🎤", fact:"Her Aries Sun drives her fearless reinvention. She does not follow trends – she creates them and moves on before anyone catches up." },
  { name:"Mariah Carey", sign:"Aries", sun:"Aries", moon:"Virgo", rising:"Unknown", born:"Mar 27, 1969", emoji:"🎶", fact:"Her Aries Sun is the fire behind one of the most dominant careers in music history. She did not just want to sing – she wanted to reign." },
  { name:"Adele", sign:"Taurus", sun:"Taurus", moon:"Sagittarius", rising:"Sagittarius", born:"May 5, 1988", emoji:"🎵", fact:"Her Taurus Sun gives her that unmistakable groundedness – her voice feels like it comes from the earth itself." },
  { name:"Dwayne Johnson", sign:"Taurus", sun:"Taurus", moon:"Scorpio", rising:"Unknown", born:"May 2, 1972", emoji:"💪", fact:"His Taurus Sun is the foundation of his brand – reliable, physical, built over years of consistent, serious effort." },
  { name:"Kanye West", sign:"Gemini", sun:"Gemini", moon:"Pisces", rising:"Unknown", born:"Jun 8, 1977", emoji:"🎧", fact:"His Gemini Sun is the genius behind his ability to hold contradictions – visionary and chaotic, brilliant and volatile, all at once." },
  { name:"Tupac Shakur", sign:"Gemini", sun:"Gemini", moon:"Sagittarius", rising:"Unknown", born:"Jun 16, 1971", emoji:"✊", fact:"His Gemini Sun gave him the ability to speak in two registers at once – the street poet and the political philosopher, equally real and equally him." },
  { name:"Ariana Grande", sign:"Cancer", sun:"Cancer", moon:"Libra", rising:"Capricorn", born:"Jun 26, 1993", emoji:"🌙", fact:"Her Cancer Sun is the source of her otherworldly emotional depth – she channels genuine feeling into every note in a way that bypasses your defenses." },
  { name:"Selena Gomez", sign:"Cancer", sun:"Cancer", moon:"Aries", rising:"Unknown", born:"Jul 22, 1992", emoji:"💜", fact:"Her Cancer Sun is the quiet engine behind her longevity – the emotional authenticity that makes her feel like a person, not a product, to everyone who follows her." },
  { name:"Jennifer Lopez", sign:"Leo", sun:"Leo", moon:"Scorpio", rising:"Sagittarius", born:"Jul 24, 1969", emoji:"👑", fact:"Her Leo Sun is textbook – she was literally born to perform, and decades in, she is still the most magnetic person in any room she enters." },
  { name:"Kylie Jenner", sign:"Leo", sun:"Leo", moon:"Scorpio", rising:"Unknown", born:"Aug 10, 1997", emoji:"💄", fact:"Her Leo Sun built an empire on visibility and personal brand – she understood instinctively that in the attention economy, the self is the product." },
  { name:"Beyonce", sign:"Virgo", sun:"Virgo", moon:"Scorpio", rising:"Libra", born:"Sep 4, 1981", emoji:"⭐", fact:"Her Virgo Sun is the secret behind the flawless execution – she rehearses until excellence becomes effortless." },
  { name:"Zendaya", sign:"Virgo", sun:"Virgo", moon:"Gemini", rising:"Unknown", born:"Sep 1, 1996", emoji:"🌟", fact:"Her Virgo Sun is behind the precision and intentionality of every career move – nothing she does is accidental, and it shows." },
  { name:"Kim Kardashian", sign:"Libra", sun:"Libra", moon:"Pisces", rising:"Sagittarius", born:"Oct 21, 1980", emoji:"💋", fact:"Her Libra Sun explains the brand – beauty, aesthetics, and relatability weaponized into a billion-dollar empire." },
  { name:"Cardi B", sign:"Libra", sun:"Libra", moon:"Aries", rising:"Unknown", born:"Oct 11, 1992", emoji:"💅", fact:"Her Libra Sun is behind the charm and the aesthetic intelligence – she knows exactly how to present herself and she does it with complete conviction." },
  { name:"Drake", sign:"Scorpio", sun:"Scorpio", moon:"Scorpio", rising:"Unknown", born:"Oct 24, 1986", emoji:"🎤", fact:"Sun AND Moon in Scorpio – he literally cannot write a surface-level song. Everything comes from the wound, which is why it hits so hard." },
  { name:"Katy Perry", sign:"Scorpio", sun:"Scorpio", moon:"Scorpio", rising:"Unknown", born:"Oct 25, 1984", emoji:"🌟", fact:"Her Scorpio Sun gives her the intensity that lives underneath the pop surface – she transforms her most painful experiences into her biggest anthems." },
  { name:"Nicki Minaj", sign:"Sagittarius", sun:"Sagittarius", moon:"Virgo", rising:"Unknown", born:"Dec 8, 1982", emoji:"🏹", fact:"Her Sagittarius Sun is pure – she expanded rap's entire idea of what a female rapper could be, then kept pushing the boundaries further." },
  { name:"Britney Spears", sign:"Sagittarius", sun:"Sagittarius", moon:"Aquarius", rising:"Libra", born:"Dec 2, 1981", emoji:"🎀", fact:"Her Sagittarius Sun is the freedom-seeker at the center of her story – the tension between that need and the control placed around her defined an era." },
  { name:"LeBron James", sign:"Capricorn", sun:"Capricorn", moon:"Aries", rising:"Unknown", born:"Dec 30, 1984", emoji:"🏀", fact:"His Capricorn Sun built the empire. He did not just play basketball – he studied power, built an institution, and played the longest game imaginable." },
  { name:"Michelle Obama", sign:"Capricorn", sun:"Capricorn", moon:"Aquarius", rising:"Unknown", born:"Jan 17, 1964", emoji:"🌿", fact:"Her Capricorn Sun is the structural integrity behind everything she does – the discipline, the precision, and the refusal to be anything less than fully prepared." },
  { name:"Oprah Winfrey", sign:"Aquarius", sun:"Aquarius", moon:"Sagittarius", rising:"Sagittarius", born:"Jan 29, 1954", emoji:"📺", fact:"Her Aquarius Sun is the source of her revolutionary vision – she did not just do television, she transformed what television could mean for humanity." },
  { name:"Harry Styles", sign:"Aquarius", sun:"Aquarius", moon:"Libra", rising:"Unknown", born:"Feb 1, 1994", emoji:"🌈", fact:"His Aquarius Sun is behind the genre-defying, norm-breaking, deeply individualistic persona – he belongs to no category and he built that freedom deliberately." },
  { name:"Rihanna", sign:"Pisces", sun:"Pisces", moon:"Aries", rising:"Aries", born:"Feb 20, 1988", emoji:"💎", fact:"Her Pisces Sun gives her that effortless, otherworldly quality – she moves through the world like she is partly somewhere else, and it is utterly magnetic." },
  { name:"Bad Bunny", sign:"Pisces", sun:"Pisces", moon:"Virgo", rising:"Unknown", born:"Mar 10, 1994", emoji:"🐰", fact:"His Pisces Sun is the source of the emotional fluidity in his music – he crosses genre, gender expectation, and cultural boundary the way Pisces crosses every border, without effort and without apology." },
];

const facts = {
"Scorpio-Venus": ["Venus in Scorpio means love is never casual for you – you merge completely or not at all, and people can feel that intensity the moment you show interest.","You have an almost psychic ability to sense when someone is being dishonest with you in love. You may not say it immediately, but you never forget it.","Your love language is transformation. You do not just want a partner – you want someone who challenges you to evolve at the deepest level."],
"Libra-Venus": ["Venus in Libra is the planet in its home sign – meaning love, beauty, and harmony come naturally to you in a way that feels almost effortless to others.","You have an extraordinary eye for aesthetics. Your home, your style, your environment – everything around you tends to be carefully curated and beautiful."],
"Taurus-Venus": ["Venus in Taurus is exalted – this is one of the most powerful placements for love and beauty in the entire zodiac.","You love through your senses. Physical touch, good food, beautiful surroundings, and comfort are not luxuries for you – they are how you express and receive love."],
"Aries-Venus": ["Venus in Aries means you fall fast, hard, and all at once – the chase is genuinely exciting for you, and you lose interest when the thrill fades.","You are bold in love. You will make the first move, say what you feel, and pursue what you want without apology."],
"Gemini-Venus": ["Venus in Gemini means you fall in love with minds first. If someone cannot hold a real conversation with you, the attraction fades fast.","You need variety in love – not necessarily different partners, but variety in how you connect."],
"Cancer-Venus": ["Venus in Cancer means home is where your heart lives. Creating a safe, warm, nurturing environment for your partner is how you say I love you most loudly.","You have an extraordinary emotional memory. You remember exactly how someone made you feel years ago – the good and the painful."],
"Leo-Venus": ["Venus in Leo loves grandly and dramatically – you do not do anything halfway, and your partners know they are loved because you make it impossible to miss.","You need to feel celebrated in your relationships. A partner who takes you for granted will slowly break your heart."],
"Virgo-Venus": ["Venus in Virgo expresses love through service and devotion – you show up, you fix things, you pay attention to details that most people miss.","You are attracted to intelligence and competence. Someone who is good at what they do is genuinely attractive to you."],
"Sagittarius-Venus": ["Venus in Sagittarius loves freely and adventurously – you need a partner who is also your travel companion and your best friend.","Freedom in love is non-negotiable. A relationship that feels like a cage will eventually push you out the door."],
"Capricorn-Venus": ["Venus in Capricorn takes love seriously. You do not date casually – you date with intention, assessing long-term compatibility from the very beginning.","You express love through acts of reliability – showing up on time, keeping your word, building a stable life alongside someone."],
"Aquarius-Venus": ["Venus in Aquarius needs intellectual freedom in love above all else. A partner who tries to control your thinking will not last.","Friendship is the foundation of all your romantic relationships. If you cannot be genuine friends first, the romance does not have a real foundation."],
"Pisces-Venus": ["Venus in Pisces is exalted – this is considered the highest expression of Venus energy, meaning your capacity for love, empathy, and devotion is almost limitless.","You love unconditionally and sometimes unwisely. Your capacity to see the best in people can lead you to stay in situations that do not serve you."],
"Aries-Moon": ["Your Moon in Aries means your emotional reactions are immediate and instinctive – you feel it, you express it, and often you are over it before others have even processed what happened.","You restore yourself through action, not reflection. When you are emotionally activated, you need to move."],
"Cancer-Moon": ["Moon in Cancer is the Moon in its home sign – giving you one of the most emotionally intuitive, sensitive, and deeply feeling natures in the zodiac.","Your emotional memory is extraordinary. You carry the feeling of every significant moment with you indefinitely."],
"Scorpio-Moon": ["Moon in Scorpio is one of the most emotionally intense placements in the zodiac. Your feelings do not visit – they take up residence.","You have an instinctive ability to see beneath the surface of people and situations."],
"Leo-Moon": ["Moon in Leo means your emotional world is dramatic, generous, and deeply expressive. You feel things with your whole chest.","You restore through creativity, play, and being genuinely celebrated."],
"Taurus-Moon": ["Moon in Taurus is the Moon in its exaltation – meaning emotional security, steadiness, and the capacity to be genuinely present are your greatest gifts.","You restore through physical comfort, good food, time in nature, and the simple pleasure of a beautiful, calm environment."],
"Gemini-Moon": ["Moon in Gemini means you process emotions through language – you need to talk about what you feel before it becomes real and manageable.","Your emotional world is quick-moving and varied. You can cycle through several different feeling states in a single day."],
"Virgo-Moon": ["Moon in Virgo means you process emotions analytically – when something upsets you, your first instinct is to understand it and figure out what needs to be fixed.","You restore through order, productive work, and the satisfaction of having done something useful."],
"Libra-Moon": ["Moon in Libra means your emotional wellbeing is deeply tied to the quality of your relationships.","You restore through beauty, aesthetic pleasure, meaningful conversation, and time in environments that feel balanced."],
"Sagittarius-Moon": ["Moon in Sagittarius means your emotional world is expansive, optimistic, and oriented toward freedom and meaning.","You restore through movement – travel, learning, outdoor space, or any experience that makes the world feel larger."],
"Capricorn-Moon": ["Moon in Capricorn means your emotional world is private, disciplined, and deeply serious beneath a composed exterior.","You restore through solitary productive work, time in nature, and the quiet satisfaction of having handled something difficult with competence."],
"Aquarius-Moon": ["Moon in Aquarius means you process emotions intellectually – feelings arrive as ideas first.","You restore through solitude, intellectual stimulation, and connection to causes larger than yourself."],
"Pisces-Moon": ["Moon in Pisces is one of the most psychically sensitive placements in astrology. You pick up on emotional undercurrents in a room before anyone has spoken a word.","You restore through creative expression, spiritual practice, time near water, and genuine solitude."],
"Leo-Sun": ["Your Sun in Leo is ruled by the Sun itself – the only sign with this distinction – meaning your identity, your self-expression, and your vitality are inextricably linked.","You were born to shine. Not in a performative way – in a genuinely luminous way."],
"Scorpio-Sun": ["Your Sun in Scorpio is co-ruled by Mars and Pluto – meaning your identity is built around depth, truth, and evolution.","You are one of the most psychologically complex signs in the zodiac. There are layers to you that most people never access."],
"Capricorn-Sun": ["Your Sun in Capricorn is ruled by Saturn – meaning your identity is built around achievement, integrity, and the long game.","You have a relationship with time that sets you apart from most signs."],
"Aries-Sun": ["Your Sun in Aries is ruled by Mars – meaning your identity is built around action, independence, and the courage to go first.","You were born to begin things. The spark of a new idea activates something in you that more cautious signs simply do not have access to."],
"Taurus-Sun": ["Your Sun in Taurus is ruled by Venus – meaning your identity is built around what you love, what you create, and what you choose to call yours.","You have an instinctive relationship with quality. You know the difference between what is real and what is merely shiny."],
"Gemini-Sun": ["Your Sun in Gemini is ruled by Mercury – meaning your identity is built around ideas, language, and the endlessly stimulating exchange of both.","You are one of the most intellectually alive signs in the zodiac."],
"Cancer-Sun": ["Your Sun in Cancer is ruled by the Moon – meaning your identity is fluid, cyclical, and deeply tied to your emotional world and the people you love.","You have an emotional intelligence that operates almost like a sixth sense."],
"Virgo-Sun": ["Your Sun in Virgo is ruled by Mercury – giving you a mind that is precise, analytical, and perpetually oriented toward improvement.","You notice what others miss. Details, patterns, inconsistencies – these register for you automatically."],
"Libra-Sun": ["Your Sun in Libra is ruled by Venus – meaning your identity is built around relationship, aesthetic intelligence, and the pursuit of genuine fairness.","You have a natural gift for seeing all sides of any situation with clarity and evenhandedness."],
"Sagittarius-Sun": ["Your Sun in Sagittarius is ruled by Jupiter – meaning your identity is built around belief, freedom, and the perpetual pursuit of what lies beyond the next horizon.","You have a relationship with optimism that is not naivety but a genuine philosophical position."],
"Aquarius-Sun": ["Your Sun in Aquarius is ruled by Saturn and Uranus – meaning your identity is built around originality, independence, and a genuine vision of how things could be better.","You have always felt slightly outside the mainstream – not as an affectation but as a lived experience."],
"Pisces-Sun": ["Your Sun in Pisces is ruled by Jupiter and Neptune – meaning your identity is fluid, imaginative, and fundamentally oriented toward the invisible dimensions of existence.","You have a permeability to experience that is both your greatest gift and your most demanding challenge."],
"Aries-Mercury": ["Mercury in Aries means your mind moves faster than almost anyone else in the room. You have the answer before others have finished processing the question – and the impatience to match.","You communicate with directness that some people find refreshing and others find startling. You do not dress up what you mean with softening language. You say the thing.","Your thinking is original and instinctive rather than methodical. You trust the first idea that arrives because it is usually right – and the five minutes of second-guessing rarely improves it."],
"Taurus-Mercury": ["Mercury in Taurus means you think slowly, thoroughly, and almost always correctly. You do not rush to conclusions and you do not change your mind without a genuinely good reason.","Your communication style is calm, measured, and deeply reliable. When you say something, people believe you – because you do not say things you have not already thought through completely.","You have an instinctive connection between ideas and the physical world. Abstract concepts make sense to you once you can connect them to something real, tangible, and felt."],
"Gemini-Mercury": ["Mercury in Gemini is the planet in its home sign – giving you one of the most naturally agile, quick, and linguistically gifted minds in the entire zodiac.","You can hold two completely contradictory ideas at the same time without discomfort. Where others see a conflict, you see a spectrum – and you are genuinely comfortable living in the middle of it.","Your curiosity has no ceiling. The moment you feel like you fully understand something, your interest begins to migrate. This is not a flaw – it is the engine of your extraordinary range."],
"Cancer-Mercury": ["Mercury in Cancer means your mind is deeply intuitive and emotionally intelligent. You pick up on what is not being said in a conversation as fluently as what is.","Your memory for feeling is extraordinary. You do not just remember events – you remember exactly how they felt, who said what, and the atmosphere in the room. This makes you a natural storyteller.","You think best when you feel safe. In environments of genuine trust, you become one of the most insightful people in the conversation."],
"Leo-Mercury": ["Mercury in Leo gives you a natural gift for communication that commands attention. When you speak – in a room, in writing, in any medium – people orient toward you instinctively.","You think in narratives, not bullet points. Your mind naturally organizes information into stories with stakes, characters, and momentum – which is why you are so persuasive without even trying.","Your ideas come with conviction. You do not float suggestions – you make pronouncements. This is enormously effective when you are right, which is often."],
"Virgo-Mercury": ["Mercury in Virgo is the planet in its home and exaltation – the most analytically precise placement in the zodiac. Your mind is a finely calibrated instrument.","You notice the error everyone else walked past. The misplaced word, the flawed assumption, the number that does not quite add up – these register for you automatically.","You express care through precision. When you edit someone's work or explain something, the extraordinary detail you bring is an act of respect – you are taking it seriously enough to get it exactly right."],
"Libra-Mercury": ["Mercury in Libra gives you a mind that is naturally diplomatic, fair, and extraordinarily good at seeing every side of any situation with genuine clarity.","You think in relationships between ideas rather than isolated facts. The most interesting question for you is how things connect to, balance against, and affect everything around them.","Your communication is elegant by instinct. You have a gift for saying difficult things in ways that preserve the relationship."],
"Scorpio-Mercury": ["Mercury in Scorpio gives you a mind that goes beneath the surface automatically. Surface-level explanations feel insufficient – you need to understand the root, the motive, the thing underneath the thing.","You are a natural lie detector. You read subtext, body language, and what is conspicuously absent from a conversation with an accuracy that unsettles people who are not being fully honest.","Your silence is as powerful as your words. You know exactly when to withhold information and when to ask the question that changes everything."],
"Sagittarius-Mercury": ["Mercury in Sagittarius gives you a philosophical mind that is always reaching for the bigger picture. Individual facts interest you primarily as evidence for a larger theory about how things work.","You speak with a confidence and enthusiasm that is genuinely infectious. Your ideas arrive with energy – you are not reporting information, you are making a case.","Your honesty can arrive faster than your tact. You say the true thing before you have finished calculating whether this is the right moment."],
"Capricorn-Mercury": ["Mercury in Capricorn gives you a mind that is strategic, disciplined, and oriented toward what is actually useful. You do not think in abstractions unless they have a practical application.","Your communication is economical and precise. You do not use ten words when four will do, and the four you choose are always exactly right.","You think in long timelines. Where others are planning for next week, you are mapping the next three years."],
"Aquarius-Mercury": ["Mercury in Aquarius gives you a mind that operates outside the mainstream almost by default. Your best ideas arrive from a direction no one else was looking.","You think in systems, patterns, and structures rather than individual cases. What an instance reveals about the underlying pattern is what actually captures your attention.","Your intellectual independence is total. You form your own conclusions from your own research and hold them until genuinely better evidence arrives."],
"Pisces-Mercury": ["Mercury in Pisces gives you a mind that thinks in images, feelings, and impressions rather than linear logic. You arrive at correct conclusions through routes you cannot always explain.","You communicate with a poetic quality that is not affectation – it is simply how your mind works. The metaphor, the story, the feeling-tone of an idea is as real to you as its literal content.","Your imagination is your most powerful cognitive tool. You can feel your way into a situation or problem with an empathy that more analytical minds cannot access."],
"Aries-Mars": ["Mars in Aries is the planet in its home sign – the most direct, energized, and instinctively courageous placement Mars can occupy. You act first and assess later, and your instincts are usually correct.","Your anger is clean. It arrives fast, burns hot, and is gone before others have even processed that there was a conflict. You do not nurse grievances – you express the feeling and move on.","You are most alive when you are competing, initiating, or going first into something new. Waiting and following someone else's lead are genuinely uncomfortable for you."],
"Taurus-Mars": ["Mars in Taurus moves slowly and builds unstoppably. You do not rush into action – but once you have decided to move, nothing redirects you. Your persistence is one of the most powerful forces in the zodiac.","Your drive is sensory and material. You work for things you can touch, own, inhabit, and enjoy. Physical security and genuine comfort are your most reliable motivators.","You have an extraordinary capacity for sustained effort. Where others sprint and burn out, you set a pace you can maintain for years."],
"Gemini-Mars": ["Mars in Gemini means your energy is mental first. You are most activated by intellectual challenge, debate, and the fast exchange of ideas. Boredom is a genuine physical drain for you.","You can pursue multiple goals simultaneously without losing track of any of them. Your mind manages parallel tracks naturally.","Your arguments are fast, precise, and occasionally devastating. When you are in conflict, you reach for words – and your words are usually the sharpest weapon in the room."],
"Cancer-Mars": ["Mars in Cancer means your drive is deeply protective. You are motivated by the safety and wellbeing of the people and places you love. That motivation is ferocious.","Your energy moves in tides rather than straight lines. Periods of intense effort followed by genuine withdrawal is your natural rhythm.","When someone threatens what you care about, a fierceness emerges that surprises people who only know your softer side."],
"Leo-Mars": ["Mars in Leo drives you toward visibility, recognition, and the expression of your full creative power. You do not just want to succeed – you want to succeed in a way that people remember.","Your energy is theatrical and generous. You bring drama, warmth, and genuine commitment to everything you pursue.","Your pride is your fuel. The suggestion that you cannot do something activates a competitive fire that is extremely difficult to extinguish."],
"Virgo-Mars": ["Mars in Virgo channels your drive into precision, improvement, and the relentless refinement of whatever you are working on. You are not satisfied with good enough – ever.","Your work ethic is extraordinary and occasionally punishing. You hold yourself to standards that most people would find exhausting.","You are most effective when you have a clear problem to solve. Specific targets with measurable progress activate your best and most focused energy."],
"Libra-Mars": ["Mars in Libra is the planet in its most challenged placement – you are built for harmony in a planet that runs on conflict. Your drive is toward justice, fairness, and the resolution of imbalance.","You do not act unilaterally if you can help it. You consult, consider, and weigh before moving – making you slower to start but far more strategically effective once you do.","When you finally decide to fight for something, you fight with extraordinary skill and composure."],
"Scorpio-Mars": ["Mars in Scorpio is one of the most intensely driven placements in the zodiac. Your energy is focused, strategic, and almost completely invisible until the moment it is needed – and then it is overwhelming.","You do not pursue surface-level goals. Everything you go after has a deeper significance – power, transformation, truth, or the resolution of something long unfinished.","Your capacity for sustained focus on a single target is unmatched. You do not get distracted, you do not get discouraged, and you do not give up."],
"Sagittarius-Mars": ["Mars in Sagittarius drives you toward freedom, expansion, and the feeling that you are moving toward something larger than where you currently are. Confinement is intolerable.","Your energy is enthusiastic and contagious. When you are genuinely excited about a direction, you bring people with you through the sheer force of your belief.","You pursue goals in bursts of intense, inspired effort. Your best work happens when you are lit up – and it is extraordinary when you are."],
"Capricorn-Mars": ["Mars in Capricorn is exalted – the planet of drive in the sign of mastery. Your ambition is patient, strategic, and oriented toward building something that lasts.","You do not waste energy on fights you cannot win or goals that do not serve your larger structure. Every action is evaluated against the long-term architecture you are building.","Your discipline is your superpower. You can delay gratification indefinitely in service of a goal that matters to you."],
"Aquarius-Mars": ["Mars in Aquarius drives you toward collective impact, innovation, and the disruption of systems that are no longer working. Your ambition is not personal – it is structural.","You are most energized when working toward something that benefits more than just yourself. Individual achievement feels hollow compared to contributing to a genuine shift.","Your approach to conflict is detached and strategic rather than emotional. You do not get angry in a hot way – you get precise."],
"Pisces-Mars": ["Mars in Pisces drives you through feeling rather than strategy. You move toward what you love and away from what deadens you – and your intuition about which is which is more reliable than any rational analysis.","Your energy is diffuse and creative rather than focused and direct. You work best when you have freedom to follow inspiration and trust the process.","When you are connected to a purpose that genuinely moves you – creative, spiritual, or service-oriented – you access a devotion and endurance that more practically-driven signs cannot match."],
"Aries-Jupiter": ["Jupiter in Aries expands through courage, initiative, and the willingness to go first. Your greatest opportunities arrive when you trust your instinct and act before you feel fully ready.","You grow through competition, challenge, and the direct pursuit of what you want. Waiting for permission or consensus shrinks your world. Acting on your own authority expands it."],
"Taurus-Jupiter": ["Jupiter in Taurus expands through patience, sensory pleasure, and the steady accumulation of real, tangible value. Your abundance grows when you build slowly and trust the process.","You have a natural gift for recognizing quality and genuine worth – in objects, in people, in opportunities. This discernment, trusted consistently, becomes one of your most reliable paths to prosperity."],
"Gemini-Jupiter": ["Jupiter in Gemini expands through learning, communication, and the restless pursuit of new information. Your greatest growth comes from following your curiosity wherever it leads.","You grow through connection – meeting people, exchanging ideas, and being present in the flow of information. The conversation you almost skipped is frequently the one that changes everything."],
"Cancer-Jupiter": ["Jupiter in Cancer is exalted – meaning your capacity for emotional generosity, nurturing, and creating safety for others is one of your most profound and expansive gifts.","Your abundance is directly connected to your emotional world. When you feel genuinely at home – in yourself, in your relationships, in your physical space – good things arrive with unusual ease."],
"Leo-Jupiter": ["Jupiter in Leo expands through creative expression, generosity, and the courage to be fully, visibly yourself. Your greatest growth comes from stepping into the spotlight rather than dimming yourself for others' comfort.","You grow through joy. Play, creativity, romance, and genuine celebration are not indulgences for you – they are the fuel that powers your expansion."],
"Virgo-Jupiter": ["Jupiter in Virgo grows through service, skill, and the mastery of craft. Your abundance is built through genuine usefulness – the kind of competence that makes you indispensable rather than merely impressive.","You expand through improvement. Each incremental refinement of your work, your health, your systems compounds over time into something extraordinary."],
"Libra-Jupiter": ["Jupiter in Libra expands through partnership, collaboration, and the pursuit of genuine fairness. Your greatest opportunities frequently arrive through other people – specifically the right people, chosen with your natural discernment.","You grow through beauty and aesthetic refinement. Surrounding yourself with what is genuinely beautiful and harmonious is a direct portal to expansion for you."],
"Scorpio-Jupiter": ["Jupiter in Scorpio expands through depth, transformation, and the willingness to go where others will not. Your greatest growth comes from the experiences that require total commitment and genuine risk.","You have a gift for finding resources, insight, and power that others overlook – buried in the complicated, the dark, or the hidden."],
"Sagittarius-Jupiter": ["Jupiter in Sagittarius is the planet in its home sign – the most naturally abundant, optimistic, and philosophically expansive placement Jupiter can occupy. You were born with a relationship to luck that others find astonishing.","Your belief that things will work out is not naivety – it is a self-fulfilling orientation that genuinely shapes your reality. The world tends to confirm what you expect from it."],
"Capricorn-Jupiter": ["Jupiter in Capricorn grows through structure, discipline, and the steady execution of a long-term plan. Your abundance does not arrive in windfalls – it builds through consistent, serious effort over years.","You expand through taking on greater responsibility and demonstrating mastery. Each time you prove capable of handling more, the universe hands you more to handle."],
"Aquarius-Jupiter": ["Jupiter in Aquarius expands through community, innovation, and the contribution of original thinking to collective problems. Your greatest growth comes from being part of something larger than yourself.","You grow through intellectual freedom. The moment you stop thinking what you are supposed to think and start following your own genuinely unconventional ideas is frequently the moment your expansion begins."],
"Pisces-Jupiter": ["Jupiter in Pisces is the planet in one of its home signs – giving you a natural abundance of spiritual sensitivity, creative imagination, and compassionate understanding that expands everything it touches.","Your faith is your fortune. Not necessarily religious faith – but a fundamental trust in something larger, a willingness to surrender to the current of your life rather than forcing it into a predetermined shape."],
"Aries-Saturn": ["Saturn in Aries asks you to master patience, strategy, and the discipline of timing. Your instinct is to act immediately – and Saturn is teaching you that the most powerful action is often the one that waits for exactly the right moment.","You are building the capacity to lead with genuine authority rather than just energy. The impulsiveness that came naturally is being refined into something more deliberate – and far more effective."],
"Taurus-Saturn": ["Saturn in Taurus is building your relationship with security, self-worth, and material stability from the inside out. The external security you seek is being constructed, brick by brick, through your own sustained effort.","You are learning that real stability is not given – it is built. And what you build yourself, slowly and with full attention, has a solidity that inherited security can never match."],
"Gemini-Saturn": ["Saturn in Gemini asks you to master depth over breadth. The natural Gemini tendency to skim the surface of many things is being disciplined into the capacity for genuine, focused expertise.","You are building a relationship with your own mind that is rigorous rather than merely quick. The thinking you commit to developing slowly and seriously becomes one of your most powerful and lasting assets."],
"Cancer-Saturn": ["Saturn in Cancer is one of the more demanding placements – the planet of discipline in the sign of emotional need. You are learning to build your own inner security rather than seeking it from others.","The emotional self-sufficiency you develop through this placement is extraordinary once it is built. You become someone who can genuinely provide stability for others because you have constructed it within yourself first."],
"Leo-Saturn": ["Saturn in Leo asks you to earn rather than assume recognition. The deep need to be seen and celebrated meets Saturn's demand for genuine merit – and the result, over time, is an authority that is completely deserved.","You are building a creative and expressive life that is grounded in real skill and real craft. The recognition that eventually arrives is more satisfying than anything that comes easily could ever be."],
"Virgo-Saturn": ["Saturn in Virgo intensifies your already considerable relationship with precision, standard-setting, and self-criticism. The work here is learning to apply your exacting nature to the world without turning it entirely on yourself.","You are building a mastery of craft and service that is genuinely rare. The standards you hold yourself to, refined over time into something sustainable rather than punishing, produce work of extraordinary quality."],
"Libra-Saturn": ["Saturn in Libra is exalted – meaning the discipline, fairness, and commitment to genuine justice that Saturn demands are most fully expressed here. You are building relationships on a foundation of integrity rather than convenience.","You are learning what genuine partnership requires – not just harmony and beauty, but the harder work of honest negotiation, fair compromise, and staying present through difficulty."],
"Scorpio-Saturn": ["Saturn in Scorpio asks you to build a relationship with power, depth, and transformation that is rooted in genuine integrity rather than control. You are learning the difference between the two.","The psychological work you do with this placement – understanding your own depths, your relationship to power, your fear of loss and change – becomes the foundation of an extraordinary and hard-won wisdom."],
"Sagittarius-Saturn": ["Saturn in Sagittarius asks you to build a philosophy that can survive contact with reality. The beliefs you hold are being tested, refined, and strengthened through experience – emerging as genuine wisdom rather than inherited assumption.","You are learning the discipline of focused belief – the capacity to commit to a direction and hold it through difficulty, rather than perpetually searching for a freer or truer horizon."],
"Capricorn-Saturn": ["Saturn in Capricorn is the planet in its home sign – amplifying your already considerable relationship with discipline, structure, and the long game. You feel the weight of responsibility as a fundamental feature of your identity.","You are building something that will outlast you – a body of work, a legacy, an institution, a family, a reputation. The seriousness with which you approach this is not burden; it is purpose."],
"Aquarius-Saturn": ["Saturn in Aquarius asks you to build structures that serve the collective rather than just yourself. Your discipline is being directed toward systems, communities, and ideas that have lasting social value.","You are learning to balance your need for freedom with the responsibilities of genuine belonging. The community you build and commit to – on your own terms – becomes one of your most enduring sources of meaning."],
"Pisces-Saturn": ["Saturn in Pisces asks you to build a relationship with the invisible, the spiritual, and the creative that is grounded and sustainable rather than escapist. You are learning to give your inner world a real and lasting form.","The discipline of bringing your imagination into material reality – through art, through spiritual practice, through consistent creative work – is your Saturn path. What you build from the inside out has a depth that purely practical creation cannot match."],
"Aries-Uranus": ["Uranus in Aries (2010–2018) gave your generation a revolutionary relationship with identity and individuality. You arrived knowing that the self is not fixed – it is a technology to be upgraded.","Your generation breaks with the past not through argument but through action. You simply do things differently, without apology, as if the old way never occurred to you as an option."],
"Taurus-Uranus": ["Uranus in Taurus (2018–2026) is rewiring your generation's relationship with money, value, and the material world at its roots. The financial and ecological systems inherited are being fundamentally reimagined.","You carry an instinctive sense that the old relationship between humans and resources is unsustainable – and a genuine, practical creativity about what could replace it."],
"Gemini-Uranus": ["Uranus in Gemini (1941–1949) produced a generation with a revolutionary relationship to information and communication. This was the generation that would eventually produce the intellectual infrastructure of the modern world.","Your mind was wired for a kind of connectivity and information processing that was genuinely ahead of its time – and that shaped every field you entered."],
"Cancer-Uranus": ["Uranus in Cancer (1948–1956) disrupted the very idea of home, family, and belonging. Your generation inherited a post-war world and proceeded to interrogate every assumption it had made about domestic life.","You carry a deep tension between the need for security and the compulsion to break free of it – and the resolution of that tension became one of the defining cultural questions of your era."],
"Leo-Uranus": ["Uranus in Leo (1955–1962) produced a generation that would revolutionize self-expression, creativity, and the very idea of stardom. This is the generation that gave us rock and roll as a cultural force.","You carry a fierce, almost defiant individualism – the conviction that your creative expression is not a luxury but a right, and that the authentic self is worth any cost to express."],
"Virgo-Uranus": ["Uranus in Virgo (1961–1969) rewired an entire generation's relationship to work, health, and service. This placement produced the thinkers and builders who would redesign the systems the world runs on.","Your generation brought a revolutionary precision to practical problems – an insistence that systems should actually work, that craft matters, and that the details are where reality lives."],
"Libra-Uranus": ["Uranus in Libra (1968–1975) disrupted every inherited idea about partnership, marriage, and social justice. Your generation normalized relationship structures and rights movements that previous generations had considered impossible.","You carry an instinctive sense that fairness is not a given – it must be constructed, fought for, and redesigned in every generation."],
"Scorpio-Uranus": ["Uranus in Scorpio (1974–1981) produced a generation with a revolutionary relationship to power, sexuality, and psychological truth. You were born into a world where the previously unspeakable was beginning to be said.","Your generation brought a fierce, unsentimental honesty to the darkest rooms in human experience – and refused to look away from what previous generations had agreed not to discuss."],
"Sagittarius-Uranus": ["Uranus in Sagittarius (1981–1988) gave your generation a revolutionary relationship to belief, freedom, and global connection. You were the first generation to grow up genuinely expecting to move across the world.","You carry an instinctive rejection of any ideology that demands unquestioning allegiance. Your generation built its philosophy from scratch – synthesizing traditions, crossing borders, and refusing inherited absolutes."],
"Capricorn-Uranus": ["Uranus in Capricorn (1988–1996) produced a generation that would fundamentally disrupt institutions, authority structures, and the very definition of career. You were born knowing that the old ladders lead somewhere you do not want to go.","Your generation's relationship to ambition is genuinely different from what came before. You are not less driven – you are driven toward different structures, built on different foundations, measured by different standards."],
"Aquarius-Uranus": ["Uranus in Aquarius (1995–2003) is the planet in its home sign – producing a generation with a native fluency in collective intelligence, digital networks, and the idea that individuals are most powerful when genuinely connected.","Your generation does not experience community and individuality as opposites. You move between them instinctively, understanding at a cellular level that the network and the node are equally real."],
"Pisces-Uranus": ["Uranus in Pisces (2003–2011) produced a generation with a revolutionary relationship to spirituality, creativity, and the boundary between real and imagined. You were born into a world where virtual and physical had already begun to blur.","Your generation carries an instinctive fluency with altered states – of consciousness, of reality, of identity. The question of what is real is not destabilizing for you. It is simply where you live."],
"Scorpio-Neptune": ["Neptune in Scorpio (1955–1970) dissolved the boundary between conscious and unconscious in an entire generation. Yours was the cohort that brought depth psychology, sexuality, and the shadow self into mainstream conversation.","Your generation collectively dreamed of transformation – and produced the cultural upheaval of the 1960s and 70s, dismantling structures that had seemed permanent and replacing them with something rawer and more honest."],
"Sagittarius-Neptune": ["Neptune in Sagittarius (1970–1984) dissolved the boundaries between spiritual traditions, producing a generation with a native hunger for meaning that crossed every religious and philosophical border.","Your generation dreamed of freedom as a spiritual state, not just a political one. The quest for authentic belief – built personally rather than inherited institutionally – is written into your generational soul."],
"Capricorn-Neptune": ["Neptune in Capricorn (1984–1998) dissolved the boundaries between dream and ambition in an entire generation. You were born into a world where the imagination was being systematically monetized – and you internalized both the possibility and the cost.","Your generation carries a complex relationship to success – simultaneously drawn to achievement and aware of its hollowness when it is the only thing."],
"Aquarius-Neptune": ["Neptune in Aquarius (1998–2012) dissolved the boundaries between individual and collective consciousness in a generation that grew up online. Your cohort experienced the dissolution of privacy, geography, and singular identity as a lived daily reality.","Your generation dreams of collective healing and systemic change with an idealism that is both Neptune's greatest gift and its most significant challenge."],
"Pisces-Neptune": ["Neptune in Pisces (2011–2026) is the planet in its home sign – the most spiritually and creatively saturated placement possible. Your generation is arriving with a permeability to collective feeling that no previous cohort has carried in this form.","You were born at a moment when the membrane between self and other, real and imagined, human and digital, was thinner than it has ever been. What your generation does with that thinness will define the spiritual and creative landscape of the century."],
"Leo-Pluto": ["Pluto in Leo (1937–1958) transformed an entire generation's relationship to power, creativity, and the individual will. This cohort arrived to reshape what leadership, stardom, and self-expression could mean.","Your generation carried a compulsive relationship to significance – the need to matter, to leave a mark, to be remembered. That drive, at its best, produced extraordinary creative and cultural transformation."],
"Virgo-Pluto": ["Pluto in Virgo (1956–1972) transformed an entire generation's relationship to work, health, and the systems that sustain life. Your cohort arrived to dismantle and rebuild the infrastructure of daily existence.","You carry a deep compulsion toward improvement, analysis, and the correction of what is broken – in bodies, in systems, in processes."],
"Libra-Pluto": ["Pluto in Libra (1971–1984) transformed an entire generation's relationship to partnership, justice, and the balance of power in relationships of every kind. Your cohort arrived to renegotiate every contract between individuals.","You carry a deep awareness of power dynamics in relationships that previous generations either did not see or chose not to name."],
"Scorpio-Pluto": ["Pluto in Scorpio (1983–1995) is the planet in its home sign – producing the most intensely transformative generational placement possible. Your cohort arrived carrying a collective assignment to face what previous generations had buried.","You were born into a world where the shadow was erupting into visibility. Your generation's relationship to mortality, power, and truth is unlike any that came before it."],
"Sagittarius-Pluto": ["Pluto in Sagittarius (1995–2008) transformed an entire generation's relationship to belief, globalization, and the clash of worldviews. Your cohort arrived at the exact moment when every absolute was being questioned simultaneously.","You carry a deep awareness that belief systems are constructed, that truth is contested, and that the map is not the territory."],
"Capricorn-Pluto": ["Pluto in Capricorn (2008–2024) is transforming an entire generation's relationship to authority, institutions, and the structures of power. Your cohort is arriving into a world where every establishment is in the process of being dismantled and rebuilt.","You were born knowing at a cellular level that the old structures do not hold. What you build in their place is your generational assignment."],
"Aquarius-Pluto": ["Pluto in Aquarius (2023–2043) is beginning to transform an entire generation's relationship to collective intelligence, technology, and the very definition of what it means to be human in community.","Your cohort is arriving at the moment when the boundary between human and artificial, individual and network, is being fundamentally renegotiated. The transformation Pluto brings here will not be gentle – and the generation born through it will carry its depth."],

// ── RISING ──
"Aries-Rising": ["Aries Rising means Mars rules your chart – giving you a direct, energetic, and instinctively forward-moving outer presence that people register immediately as someone who gets things done.","Your first impression is one of confidence, energy, and a certain restless aliveness. People sense that you are oriented toward action rather than deliberation – and they are right.","The challenge of this Ascendant is that your directness can land as aggression or impatience to people who are not expecting it. You are not trying to bulldoze – you simply operate without the softening layer that other Ascendants naturally provide.","Aries Rising people often find that their life is a series of new beginnings – fresh starts, new chapters, reinventions. Mars ruling your chart keeps the energy of initiation permanently available to you.","You are at your best when you have something to initiate – a new project, a new phase, a new challenge. Stagnation is not just uncomfortable for you; it is genuinely contrary to your nature."],
"Taurus-Rising": ["Taurus Rising means Venus rules your chart – giving you a grounded, beautiful, and quietly magnetic outer presence that people find immediately comfortable and aesthetically appealing.","Your first impression is one of calm, reliability, and a certain sensory richness. People feel at ease around you quickly – there is something about your presence that says the ground is solid here.","You tend to have a physical quality that is naturally attractive – a strong ease in your body that reads as someone deeply comfortable in their own skin.","The challenge of this Ascendant is that your steadiness can be misread as slowness or resistance to change. You are not opposed to growth – you simply need it to be real, not performative.","You are at your best when you are building something – a home, a creative body of work, a relationship, a financial foundation. The act of patient, devoted construction is deeply native to your Rising sign."],
"Gemini-Rising": ["Gemini Rising means Mercury rules your chart – giving you a quick, communicative, and intellectually alive outer presence that people find immediately engaging and endlessly interesting.","Your first impression is one of wit, curiosity, and adaptability. People sense that your mind is always running – always making connections, always finding the interesting angle in whatever is happening.","You tend to have a youthful quality that persists across decades – a lightness of expression, animated eyes, and a physical energy that reflects your mental aliveness.","The challenge of this Ascendant is that your versatility can read as inconsistency. You are not unreliable – you are responsive to context, which is a different thing entirely.","Gemini Rising people often find that their life involves multiple simultaneous threads – careers, relationships, interests – that more linear Ascendants would find overwhelming but that you navigate with genuine ease."],
"Cancer-Rising": ["Cancer Rising means the Moon rules your chart – giving you a warm, receptive, and deeply empathic outer presence that people find immediately nurturing and emotionally safe.","Your first impression is one of gentleness, care, and a kind of soft attentiveness that makes people feel instinctively that you will not hurt them. You are a safe harbor to those you meet.","You tend to have an expressive face that reflects your emotional world – people often know what you are feeling before you say anything, because your inner life shows through your outer presence.","The challenge of this Ascendant is that your receptivity can absorb too much – you take in the emotional atmosphere around you at a level that can be genuinely depleting if you do not maintain strong boundaries.","You are at your best when you feel emotionally safe – when the people and environment around you are trustworthy and nourishing, your creativity, care, and genuine wisdom become fully available."],
"Leo-Rising": ["Leo Rising means the Sun rules your chart – the only Ascendant with this distinction – giving you a radiant, warm, and magnetically confident outer presence that people notice immediately.","Your first impression is larger than life. There is something about you that people register the moment you enter a room – the way you carry yourself, the warmth you project, the presence you have.","You tend to have a physical quality that draws attention – strong hair, dramatic features, or simply an energy that takes up space in the best possible way.","The challenge of this Ascendant is that you are always being watched, which can create a pressure to perform rather than simply be. Learning the difference between performing confidence and embodying it is part of your journey.","Leo Rising people often find that their life becomes more public than they initially expected – career paths involving visibility, leadership, or some form of audience tend to find them regardless of whether they sought it."],
"Virgo-Rising": ["Virgo Rising means Mercury rules your chart – giving you a precise, observant, and quietly capable outer presence that people find immediately competent and trustworthy.","Your first impression is one of intelligence, attentiveness, and a certain quiet discernment. People sense that you are noticing things – and that what you notice, you remember.","You tend to have a clean, refined physical quality – a careful attention to presentation that is never ostentatious but always considered. You look put-together because you genuinely are.","The challenge of this Ascendant is that your discernment can read as critical or reserved to people who do not know you well. You are not cold – you are careful, which is a different thing entirely.","You are at your best when you are working on something that genuinely matters and doing it to the standard your Mercury-ruled chart demands. Shoddy work in important domains is one of the things you find hardest to tolerate."],
"Libra-Rising": ["Libra Rising means Venus rules your chart – giving you a gracious, aesthetically refined, and socially gifted outer presence that people find immediately charming and genuinely beautiful.","Your first impression is one of elegance, warmth, and a certain careful attentiveness to the people around you. You make people feel considered – like you actually noticed them and thought about how to make them comfortable.","You tend to have a naturally attractive physical quality – symmetrical features, a graceful bearing, or simply a way of presenting yourself that reflects your deeply developed aesthetic sensibility.","The challenge of this Ascendant is that your social grace can be mistaken for superficiality, or your desire for harmony can make your own preferences difficult to locate beneath all the accommodation.","Libra Rising people often find that relationships – personal, professional, and social – are the central arena of their life's development. How you relate is inseparable from who you are becoming."],
"Scorpio-Rising": ["Scorpio Rising means Mars and Pluto rule your chart – giving you a magnetic, penetrating, and quietly powerful outer presence that people register immediately as someone not to be taken lightly.","Your first impression is one of intensity, depth, and a certain controlled stillness. People sense that there is more happening beneath your surface than you are showing – and they are right.","You tend to have a physically striking quality – intense eyes, a magnetic bearing, or simply an energy that seems to pull the room slightly toward you without any apparent effort on your part.","The challenge of this Ascendant is that your intensity can make people uncomfortable before they know you. Your gaze sees too much, and some people would rather not be seen that clearly.","Scorpio Rising people often find that themes of power, transformation, and depth run through their entire life – not just occasionally but as the fundamental texture of their ongoing experience."],
"Sagittarius-Rising": ["Sagittarius Rising means Jupiter rules your chart – giving you an expansive, warm, and genuinely optimistic outer presence that people find immediately uplifting and energizing.","Your first impression is one of enthusiasm, openness, and a certain generous aliveness. People sense that you are oriented toward possibility rather than constraint, and they find it genuinely contagious.","You tend to have a physically open quality – a broad smile, expansive gestures, or a bearing that communicates welcome and genuine interest in the world and the people in it.","The challenge of this Ascendant is that your enthusiasm can run ahead of your discernment – you commit to things with your whole heart before you have fully understood what they will require of you.","Sagittarius Rising people often find that education, travel, philosophy, and the search for meaning are not just interests but genuine organizing principles of their entire life."],
"Capricorn-Rising": ["Capricorn Rising means Saturn rules your chart – giving you a serious, authoritative, and quietly formidable outer presence that people register immediately as someone substantial and reliable.","Your first impression is one of competence, composure, and a certain restrained power. People sense that you are not performing capability – you have actually earned it, and the difference is palpable.","You tend to have a physically composed quality – a measured expression, or a way of taking up space that communicates authority without having to announce it.","The challenge of this Ascendant is that your composure can read as coldness, and your seriousness can make your warmth difficult to access for people who do not know you well.","You are at your best when you are building something that matters – when your Saturn-ruled chart has a genuine long-term project that justifies the discipline and patience your Ascendant demands and rewards."],
"Aquarius-Rising": ["Aquarius Rising means Saturn and Uranus rule your chart – giving you an original, intellectually alive, and quietly magnetic outer presence that people find immediately unusual and fascinating.","Your first impression is one of intelligence, independence, and a certain friendly detachment. People sense that you are genuinely interested in them as individuals while simultaneously not needing their approval in any conventional way.","You tend to have a physically distinctive quality – something slightly unconventional about your appearance or bearing that sets you apart from the crowd in a way you may not even be fully aware of.","The challenge of this Ascendant is that your detachment can read as unavailability, and your originality can make it difficult for people to know how to approach you at first.","You are at your best when you are among people who share your genuine values – when your Aquarius Ascendant has a real community that challenges and inspires you rather than just tolerating your unusualness."],
"Pisces-Rising": ["Pisces Rising means Jupiter and Neptune rule your chart – giving you a gentle, permeable, and otherworldly outer presence that people find immediately soothing, mysterious, and somehow difficult to fully define.","Your first impression is one of softness, depth, and a certain dreamy quality that makes people want to know what you are actually thinking – because they sense it is more interesting than what you are saying.","You tend to have a physically fluid quality – soft eyes, a gentle bearing, or a way of moving through the world that seems slightly unbound by the ordinary rules of solid matter.","The challenge of this Ascendant is that your permeability makes it easy for others' energies to enter your field uninvited. You absorb the world around you at a level that requires conscious protection and regular clearing.","You are at your best when you have a creative or spiritual practice that gives the depth and sensitivity of your Pisces Ascendant somewhere to go – art, music, healing, prayer, or any form that allows the invisible world to become visible through you."],
};

const emojis = {
  Sun:"☀️", Moon:"🌙", Mercury:"☿", Venus:"♀️", Mars:"♂️",
  Jupiter:"♃", Saturn:"♄", Uranus:"🪐", Neptune:"🌊", Pluto:"🔮", Rising:"⬆️",
  Aries:"🔥", Taurus:"🌿", Gemini:"✨", Cancer:"🫧", Leo:"👑", Virgo:"🌾",
  Libra:"⚖️", Scorpio:"🖤", Sagittarius:"🏹", Capricorn:"⛰️", Aquarius:"⚡", Pisces:"💜",
};

const colors = {
  Aries:"#ff6b6b", Taurus:"#a8c97f", Gemini:"#f7c948", Cancer:"#a3c4d8",
  Leo:"#ffab40", Virgo:"#8fbc8f", Libra:"#d4a5c9", Scorpio:"#a03060",
  Sagittarius:"#e07b39", Capricorn:"#8b7355", Aquarius:"#5bc8d8", Pisces:"#9b8fcc",
};

function getFact(sign, planet) {
  const key = sign + "-" + planet;
  if (facts[key]) {
    const arr = facts[key];
    return arr[Math.floor(Math.random() * arr.length)];
  }
  const generics = [
    sign + " " + planet + " gives you a uniquely powerful energy that shapes how you experience this area of life.",
    "With " + planet + " in " + sign + ", the qualities of " + sign + " are deeply woven into how you express this planetary energy.",
    planet + " in " + sign + " is one of the most revealing placements in understanding your full astrological story.",
  ];
  return generics[Math.floor(Math.random() * generics.length)];
}

const allGuessQuestions = [
  { sign:"Aries", clues:["I act before I think – and somehow it usually works out.","I have been told I am a lot more times than I can count.","I get bored if nothing exciting is happening.","I would rather lead than follow, always.","My temper flares fast – but I forgive just as quickly."] },
  { sign:"Taurus", clues:["People always say my home feels incredibly cozy.","I know exactly what I like – and I do not apologize for it.","I take my time with decisions, but once I decide, I am decided.","Good food is genuinely one of my love languages.","I am more stubborn than most people realize."] },
  { sign:"Gemini", clues:["I can talk to literally anyone about anything.","I have been called two-faced – I prefer multidimensional.","My brain never shuts off. Ever.","I can see every side of an argument, which makes choosing hard.","I pick up new skills incredibly fast but rarely stick with them long."] },
  { sign:"Cancer", clues:["I remember exactly how every important moment felt.","My home is my sanctuary – I take it very seriously.","I can sense someone's mood the moment I walk in the room.","I tend to nurture everyone around me without being asked.","I hold on to things – memories, people, feelings – for a long time."] },
  { sign:"Leo", clues:["I light up in front of an audience, even if it is just two people.","I am incredibly loyal – but I expect the same in return.","I have been told I have a presence that is hard to ignore.","I genuinely love making people feel special and celebrated.","My pride is real – apologizing does not come naturally."] },
  { sign:"Virgo", clues:["I notice the detail everyone else walked right past.","My inner critic is louder than anyone else's voice.","I show love by helping – practically, specifically, efficiently.","I research things obsessively before making a decision.","I feel physically calmer when my space is organized."] },
  { sign:"Libra", clues:["I can see both sides of any argument so clearly it is hard to pick one.","I have a strong physical reaction to things that are ugly or discordant.","Conflict genuinely makes me uncomfortable in my body.","People always come to me to help them navigate their relationships.","I fall in love with the idea of partnership – deeply."] },
  { sign:"Scorpio", clues:["I can tell when someone is lying almost immediately.","I do not do anything halfway – it is all or nothing.","I have completely reinvented myself at least once, maybe more.","I remember everything. Especially the things that hurt.","People find me magnetic but slightly hard to read – intentionally."] },
  { sign:"Sagittarius", clues:["I genuinely believe things will work out – and they usually do.","I need freedom more than I need almost anything else.","I say exactly what I think, sometimes before I should.","Travel or learning something new resets me completely.","I have a philosophy for life that I have built entirely from scratch."] },
  { sign:"Capricorn", clues:["I have always felt older than my actual age.","I set standards for myself that most people would find exhausting.","My dry humor surprises people who only know my serious side.","I take commitments – in work and love – very, very seriously.","Life genuinely gets better for me the older I get."] },
  { sign:"Aquarius", clues:["I have always felt slightly outside the group, even when I am in it.","I care about humanity as a whole more than I care about fitting in.","I need space the way other people need air.","I was thinking about things years ago that people are only now discussing.","My emotional needs are genuinely different from most people's."] },
  { sign:"Pisces", clues:["I absorb other people's moods without meaning to.","I have a rich inner world that is more real to me than most of reality.","Creative work is not just something I do – it is how I survive.","I often know things without knowing how I know them.","I love without limits, which is both my gift and my wound."] },
  { sign:"Aries", clues:["People describe me as intense, direct, and occasionally a lot.","I am most alive when I am working toward something new.","I do not hold grudges – my anger burns fast and clean.","I need to feel like I am moving forward or I become restless.","Competition does not scare me – it energizes me."] },
  { sign:"Taurus", clues:["I rarely change my mind once I have made a decision.","I need beauty in my environment to feel emotionally regulated.","I am deeply sensual – food, texture, music all hit me differently.","I am slow to trust but extraordinarily loyal once I do.","I am genuinely better at finishing things than starting them."] },
  { sign:"Gemini", clues:["I have at least two very different social personalities.","I get bored in long-term situations faster than most people.","I text back immediately or three days later – no in between.","I can argue any side of a debate and kind of enjoy it.","My interests shift constantly but I remember everything I have ever learned."] },
  { sign:"Cancer", clues:["I close off completely when I feel unsafe, without warning.","My feelings run so deep that I sometimes do not know what to do with them.","I create environments where people feel completely at home.","I know when something is wrong before anyone says a word.","I am fiercely protective of the people I love."] },
  { sign:"Leo", clues:["I need to feel genuinely appreciated or I lose my motivation entirely.","When I commit to something, I give it everything.","I am generous to a fault – sometimes too generous.","I have been told my energy changes the room when I walk in.","Betrayal hits me harder than almost anything else."] },
  { sign:"Virgo", clues:["I am my own harshest critic by a very wide margin.","I express care by fixing problems, not by talking about feelings.","I have a system for everything – and the system works.","I find vague plans genuinely stressful to be around.","I am more sensitive than I let on – I just do not show it easily."] },
  { sign:"Scorpio", clues:["I do not give second chances easily once trust is broken.","I feel everything deeply but rarely show the full extent of it.","I am drawn to the hidden, the dark, and the complicated.","I have survived things that would have stopped other people.","My intuition about people is accurate to a degree that unsettles me."] },
  { sign:"Aquarius", clues:["I form opinions based on my own research, not what I am told to think.","I care deeply about justice but process it intellectually rather than emotionally.","I am loyal to the people I choose – but I choose carefully.","I have always been a little ahead of my time.","I can be warm and deeply detached at the same time – it confuses people."] },
  { sign:"Sagittarius", clues:["I have a hard time staying in situations that feel like they are shrinking me.","I get restless when life becomes too predictable – I need the feeling of something opening up.","I tend to be the most optimistic person in any room, even when things are hard.","I say what I believe, sometimes before I have calculated whether this is the right moment.","People either love how direct I am or find it a lot to handle."] },
  { sign:"Libra", clues:["I find it genuinely difficult to make decisions – not because I do not care, but because I see everything too clearly.","I am deeply affected by ugliness – in spaces, in people, in interactions. It physically bothers me.","I tend to give people more chances than they probably deserve because I want to believe in the best version of them.","I am at my best when I am in a genuine partnership – I think better, work better, feel better.","People describe me as charming and I genuinely do not always understand what I am doing differently."] },
  { sign:"Pisces", clues:["I have always felt like I exist slightly outside of ordinary reality – like I am picking up on something others are not.","My imagination is not an escape. It is where I actually live.","I can feel a shift in someone's mood before they have said a single word.","I tend to fall for people's potential rather than who they actually are right now.","The line between my feelings and other people's feelings has always been blurry."] },
  { sign:"Capricorn", clues:["I have always been the responsible one – sometimes I wonder what it would feel like not to be.","I set goals the way other people make wishes – with a plan attached.","I take a long time to trust people, but once I do I am completely reliable to them.","I find genuine pleasure in work that most people would find tedious. The craft matters to me.","People underestimate me constantly. I have learned to find that useful."] },
];

const STRIPE_TRIAL_LINK = "https://buy.stripe.com/bJefZa8lH4TBetl2VL5sA01";
const STRIPE_PORTAL_LINK = "https://billing.stripe.com/p/login/5kQ3co6dzeub70TfIx5sA00";
const FREE_QUESTIONS = 4;

const dailyHoroscopes = {
  Aries: ["The Sun's current position activates your first house of identity – today is not the day to shrink. Say the thing you have been rehearsing. Lead with your instinct and clean up the details later. Your directness is not too much; it is exactly what is needed.","Mars is stirring your sector of ambition and this energy wants an outlet. Channel it into the project that has been stalling. A short burst of focused effort today will move something further than a week of cautious planning ever could.","The Moon in your opposing sign asks you to pause before firing. Your instinct is correct but your timing can be refined. What you have to say will land harder if you wait until the room is ready to receive it.","Venus brushes your chart today with an invitation toward pleasure and ease. You have been pushing hard. The cosmos is giving you permission to stop. Rest is not retreat – it is strategy.","A trine between your ruling planet Mars and the outer planets opens a window of unusual clarity. You see exactly what needs to happen and exactly who is in the way. Move decisively but without cruelty.","Your fire is at a peak today but it needs direction, not just ignition. Pick the one thing that matters most and give it everything. Scattered effort will leave you tired. Focused effort will leave you ahead.","The lunar energy today softens your edges just enough to make you approachable to someone who has been waiting for the right moment. Let them in. Not everyone who wants access is a threat."],
  Taurus: ["Venus, your ruling planet, is making a quiet but significant move today that touches your sector of values and self-worth. Something you have been underselling – about yourself, your work, your time – is ready to be reassessed at its true price.","The Moon in an earth sign today deepens your already considerable capacity for patience. Use it. The situation that feels stalled is not dead – it is composting. What grows from this will be more substantial than what you originally planted.","A financial or material matter that has been vague is becoming clearer. The numbers are telling you something if you are willing to do the arithmetic honestly. Do not round down what you are owed.","Your senses are particularly sharp today – beauty, pleasure, and physical comfort are not distractions from your purpose. They are part of how you restore the energy you give so steadily to everything and everyone around you.","Resistance you have been feeling toward a particular change is worth examining today. Is it genuine wisdom or familiar comfort? The answer to that question will tell you everything you need to know about what to do next.","The Sun illuminates your sector of communication and asks you to say the thing you have been holding in careful, measured silence. You do not have to be dramatic. You just have to be honest.","A creative or financial opportunity that seemed to have passed is circling back. This time, the terms are better and you are better prepared. Do not let familiarity breed dismissal – look at it fresh."],
  Gemini: ["Mercury, your ruling planet, is in a particularly agile position today, sharpening your already quick mind to an unusual degree. The idea that surfaces in conversation, almost as a throwaway, is not a throwaway. Write it down.","The dual nature of your sign is an asset today, not a liability. You can see both sides with perfect clarity, which puts you in the rare position of being able to broker a genuine resolution rather than just a temporary peace.","Your social sector is lit up and the connections you make today have longer roots than they appear. The casual introduction, the brief exchange – these are seeds. The harvest is further out than you can see from here.","Information that has been incomplete is filling in. Hold off on the conclusion you were about to reach until the full picture is available, which it will be by the end of the day if you stay curious rather than closing early.","Restlessness is real today and fighting it will cost more than redirecting it. Give yourself permission to move between projects, conversations, and ideas. The synthesis you are unconsciously building will reveal itself soon.","A communication from someone unexpected is worth more than face value. Read between the lines – not with suspicion but with your natural gift for subtext. What they are not saying is the most important part of the message.","The Moon activates your seventh house of partnership today. Someone in your orbit is more aligned with your vision than you have given them credit for. The collaboration you have been trying to build alone is available if you ask."],
  Cancer: ["The Moon, your ruling planet, is in a powerful position today that amplifies your already extraordinary intuition. The feeling you have about a situation – the one you keep talking yourself out of with logic – is correct. Trust it.","Your home and emotional life are under a gentle but clarifying light today. Something that has felt murky about a domestic situation or a family dynamic is becoming clear enough to address. The conversation you have been postponing is ready.","A creative project that lives close to your heart is asking for more of your time and attention. Give it one hour today. One hour will remind you why it matters.","Your empathy is at its peak today and the people around you can feel it. Someone will seek you out for support. Give what you genuinely have – not what you think you should have. Authentic presence is more valuable than performed strength.","The Sun is activating your sector of values and asking you to identify what you are no longer willing to accept. You have been accommodating something that has outlived its justification.","A financial or security matter that has been causing low-level anxiety is ready to be looked at directly. The reality, once you see it clearly, is more manageable than the fear has been.","Old feelings about a past relationship or unresolved situation are surfacing today – not to destabilize you but to complete something. Let them move through rather than pushing them back down."],
  Leo: ["The Sun, your ruling planet, is in a position of particular strength today and its light is falling directly on you. This is not a day to be modest about what you want, what you have built, or what you are capable of. Step into the spotlight you were made for.","Your creative sector is activated and the idea that feels too big, too bold, or too much is probably exactly the right size. The instinct to scale it back is fear dressed as practicality. Make it bigger.","A recognition or acknowledgment you have been waiting for is closer than it appears. In the meantime, the most powerful move is to act as if it has already arrived – not from ego but from genuine self-knowledge.","Someone in your orbit needs your particular brand of warmth and confidence today. You have the ability to make people feel like the best version of themselves simply by believing in them fully. Use that gift deliberately.","The Moon is moving through your sector of home and private life, asking you to tend to your inner world with the same generosity you bring to your public one. What you need to restore yourself is not a luxury – it is maintenance.","A leadership opportunity is presenting itself in a context where you least expected it. You do not need a title or a platform to lead. You just need to be willing to go first, which has always been your nature.","A creative or romantic situation that stalled is being reanimated by today's planetary weather. Approach it with fresh eyes rather than the weight of what did not work before."],
  Virgo: ["Mercury, your ruling planet, is making precise and favorable contacts today that sharpen your analytical capacity to a fine edge. The problem that has resisted solution is ready to yield. Come at it from the angle you have not tried yet.","Your sector of health and daily routine is illuminated today. The small adjustment you have been meaning to make – the one that feels too minor to prioritize – is more significant than it appears. Small pivots compound over time.","A work situation is asking for your most characteristic gift: the ability to see exactly what is wrong and know precisely how to fix it. Do not undervalue this skill or give it away without appropriate acknowledgment.","The perfectionism that drives your best work is working against you in one specific area today. Done is better than endlessly refined. The version you have is good enough to release and improve from there.","Someone is underestimating you in a professional context. The most effective response is not to correct them verbally but to deliver work so precise and so excellent that the misperception corrects itself.","Your body is communicating something today that your mind has been overriding. The fatigue, the tension, the persistent low-level signal – these are data, not weakness. Listen to what they are telling you.","A collaborative project benefits enormously from your attention to detail today. What others would let slide, you catch – and what you catch matters more than anyone currently realizes."],
  Libra: ["Venus, your ruling planet, is in a harmonious position today that smooths the friction in a relationship or partnership that has felt slightly off-balance. The conversation you initiate today – gently, with genuine fairness – will do more good than weeks of careful avoidance.","Your aesthetic sensibility is particularly sharp today. Trust it in creative decisions, in how you present yourself, and in the environment you curate around you. Beauty is not vanity for Libra – it is intelligence.","A decision you have been holding in suspension is ready to be made. You have enough information. Choose, knowing you can course correct.","The scales are tipping in your favor in a professional context today. The fairness you have been advocating for – perhaps quietly, perhaps for a long time – is being recognized by someone with the ability to act on it.","A one-on-one relationship of any kind – romantic, professional, or friendship – is ready for a deeper conversation than the ones you have been having. You know what needs to be said. So do they.","Your natural diplomacy is an asset in a group situation today where tensions are running higher than the actual stakes warrant. You are the person in the room who can name what is really happening without making it worse.","Something you created or contributed to is being seen more widely than you know. Trust that the work speaks for itself even when you are not in the room to advocate for it."],
  Scorpio: ["Pluto, your co-ruler, is making a long and slow contact with a sensitive point in your chart that is asking you to release something you have been holding tightly – a grievance, a version of the story, a person you have not fully let go of. The release will not diminish you. It will free you.","Your instincts about a situation involving shared resources, finances, or power are accurate today. Do not second-guess what you already know. The information you are sensing beneath the surface is real even without evidence to prove it yet.","A transformation that has been underway beneath the surface of your life is becoming visible today. What felt like loss in recent months is revealing its purpose. The new structure is beginning to show.","Someone is not being fully honest with you in a situation that matters. You already know this. The question is not whether to address it but how – directly enough to get the truth, carefully enough to preserve what is worth preserving.","Your depth is your greatest asset and your most demanding companion. Today it wants to be expressed – in art, in conversation, in work that requires you to go somewhere most people will not. Go there.","A healing opportunity presents itself today in an unexpected form. It might look like a difficult conversation, an uncomfortable realization, or an invitation to revisit something you thought was finished. Accept it.","The intimacy you crave – genuine, total, nothing-held-back – is available today if you are willing to go first. The vulnerability you are most afraid of is the exact thing that will create the connection you most want."],
  Sagittarius: ["Jupiter, your ruling planet, is in an expansive and fortunate position today that opens a door you have been knocking on for a while. Walk through it before you talk yourself into waiting for a better moment. The moment is now.","Your philosophical mind is particularly active today and the insight you are circling – the one that keeps returning no matter how many times you redirect your attention – is worth stopping to examine fully. It is trying to tell you something important.","An opportunity involving travel, education, publishing, or the expansion of your reach in some direction is presenting itself. It may look smaller than what you imagined but it is the right shape.","Your honesty is your greatest gift and your most common social casualty. Today, before you say the true thing, ask yourself: is this the right moment, the right person, and the right way?","The freedom you are seeking in a particular area of your life is closer than it appears. One practical step in the direction of what you actually want will shift the energy of the entire situation.","A teacher, mentor, or guide appears today in a form you might not immediately recognize. Stay open to wisdom from unexpected sources. The most useful insight often arrives without credentials.","Your faith – in yourself, in the process, in whatever larger force you trust – is being tested in a specific area right now. Hold it. Your belief in what is possible is one of your most reliable navigation tools."],
  Capricorn: ["Saturn, your ruling planet, is making a stabilizing contact today that rewards the discipline you have maintained through a period that has not been easy. Evidence of that is beginning to surface. Do not dismiss the small signs – they are the leading edge of something substantial.","A professional matter that has required patience beyond what felt reasonable is reaching a resolution point. The long game you have been playing is paying out. Stay steady for just a little longer.","Your reputation and public standing are benefiting today from work you did quietly, without acknowledgment, some time ago. The credit is arriving on a delay – as it often does for Capricorn – but it is arriving.","An authority figure or institutional structure that has been a source of friction is becoming more navigable. Your understanding of how power actually works is your most undervalued asset.","Your body is asking for rest and your ambition is refusing to grant it. Today the body wins. The work will be sharper after genuine recovery than it ever is after exhausted effort.","A long-term goal that has felt impossibly distant is showing signs of becoming real. The gap between where you are and where you are going has narrowed significantly.","Someone in your professional circle is watching your steadiness with more admiration than they have expressed. The influence you carry is larger than your visibility – which is exactly how you prefer it."],
  Aquarius: ["Uranus, your modern ruler, is activating your sector of innovation and originality today in a way that makes your most unconventional ideas not just acceptable but necessary. The room needs what only you can see from where you are standing.","A community, group, or collective effort that you are part of is reaching a moment where your specific contribution is exactly what is missing. Offer it without waiting to be asked.","Your intellectual independence is being tested by a group consensus that does not feel right to you. Trust your read. History consistently shows that the Aquarian who holds their position thoughtfully is often the one who turns out to be correct.","A friendship or platonic connection is deepening in a way that surprises you. The person who felt like a peripheral figure in your life is becoming a genuine anchor. Let them.","The cause or vision you carry – the one that feels too large and too far away to be practical – is receiving energy today. A small act in service of it will have disproportionate impact.","Your need for space is particularly pronounced today and honoring it is not antisocial – it is necessary. The ideas that will serve the collective best emerge when you have had genuine time alone to let them develop.","A technology, system, or unconventional approach you have been exploring is closer to ready than you think. The resistance you are encountering is not evidence that it will not work. It is evidence that it is new."],
  Pisces: ["Neptune, your ruling planet, is in a deeply creative and spiritually attuned position today that makes your intuition almost uncomfortably accurate. The sense you have about a situation – the one that has no logical basis – is worth following.","Your creative work is receiving invisible but real support from the planetary weather today. The project that has been stalled is not stuck – it is incubating. Return to it with fresh eyes and no agenda. Something will open.","A boundary you have been struggling to maintain is being tested again today. The compassion that makes you want to give more than you have is real and beautiful – and it needs a limit to remain sustainable.","The emotional weight you have been carrying for someone else – their anxiety, their grief, their unresolved energy – is not yours to hold indefinitely. Today is a good day to consciously return what is not yours and reclaim what is.","A spiritual or creative insight is arriving today through an unexpected channel – a conversation, a dream fragment, something you overhear. The message you receive in passing is not passing. It is for you.","Your sensitivity to the emotional atmosphere around you is heightened today. Spend time in environments and with people that nourish rather than drain you. This is not avoidance – it is discernment.","Something you released – a relationship, a project, a version of yourself – is showing you today why the release was necessary. The distance is giving you clarity that closeness never could."],
};

const celebBySign = {};
celebrities.forEach(c => {
  if (!celebBySign[c.sign]) celebBySign[c.sign] = [];
  celebBySign[c.sign].push(c);
});

// ── DAILY HOROSCOPE ──
function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const todayIndex = new Date().getDay();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[todayIndex];
  const accent = selectedSign ? colors[selectedSign] : "#e8a800";
  const horoscope = selectedSign ? dailyHoroscopes[selectedSign][todayIndex] : null;

  const handleSignSelect = (sign) => {
    if (selectedSign === sign) { setSelectedSign(null); setRevealed(false); return; }
    setSelectedSign(sign); setRevealed(false);
  };

  return (
    <div style={{animation:"up .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:28}}>
        <div style={{fontSize:36,marginBottom:10}}>🌠</div>
        <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:"#f5c842",margin:"0 0 8px"}}>Daily Horoscope</h2>
        <p style={{fontFamily:"Georgia,serif",color:"#a8e060",fontSize:14,margin:0}}>Your cosmic forecast for {today}.</p>
      </div>
      <div style={{marginBottom:24}}>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:"#f5c842",marginBottom:12,textAlign:"center"}}>SELECT YOUR SIGN</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
          {signs.map(s=>(
            <button key={s} className={"sb"+(selectedSign===s?" sel":"")} style={{"--a":colors[s]}} onClick={()=>handleSignSelect(s)}>
              <div style={{fontSize:16,marginBottom:3}}>{emojis[s]}</div>
              <div style={{fontSize:9}}>{s}</div>
            </button>
          ))}
        </div>
      </div>
      {selectedSign && !revealed && (
        <div style={{textAlign:"center",marginBottom:20,animation:"up .4s ease"}}>
          <button className="rb" style={{"--a":accent}} onClick={()=>setRevealed(true)}>✦ REVEAL MY HOROSCOPE</button>
        </div>
      )}
      {selectedSign && revealed && (
        <div style={{animation:"up .4s ease"}}>
          <div className="fc" style={{"--a":accent}}>
            <div style={{position:"absolute",top:14,right:16,fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,letterSpacing:".12em",color:accent,opacity:.7}}>{today.toUpperCase()}</div>
            <div style={{fontSize:28,marginBottom:14,textAlign:"center"}}>{emojis[selectedSign]}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:accent,textAlign:"center",marginBottom:14}}>{selectedSign.toUpperCase()} – {today.toUpperCase()}</div>
            <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"clamp(14px,3vw,18px)",lineHeight:1.85,margin:"0 0 22px",color:"#f5f0e0",textAlign:"center"}}>{horoscope}</p>
            <div style={{textAlign:"center"}}><span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,letterSpacing:".18em",color:accent,opacity:.6}}>✦ AREWEWOKE ✦</span></div>
          </div>
        </div>
      )}
      {!selectedSign && (
        <div style={{textAlign:"center",padding:"24px 0",fontFamily:"Georgia,serif",color:"#6a6058",fontSize:15}}>Select your sign above to receive today's horoscope ✨</div>
      )}
    </div>
  );
}

// ── CELEBRITY CONNECTION ──
function CelebrityAvatar({ celeb }) {
  return (
    <div style={{background:"rgba(255,200,50,0.04)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:16,padding:"24px 20px",textAlign:"center",maxWidth:360,margin:"0 auto"}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,200,50,0.15),rgba(168,224,96,0.1))",border:"2px solid rgba(255,200,50,0.4)",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>{celeb.emoji}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:16,color:"#f5c842",marginBottom:4}}>{celeb.name}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#a8e060",marginBottom:14}}>Born {celeb.born}</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
        {[["☀️",celeb.sun],["🌙",celeb.moon],["⬆️",celeb.rising]].map(([icon,val])=>(
          val&&val!=="Unknown"?(<span key={icon} style={{background:"rgba(255,200,50,0.1)",border:"1px solid rgba(255,200,50,0.3)",borderRadius:6,padding:"3px 9px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#f5c842"}}>{icon} {val}</span>):null
        ))}
      </div>
      <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:"#ffffff",lineHeight:1.65,margin:0}}>"{celeb.fact}"</p>
    </div>
  );
}

function CelebrityConnection() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [celebIndex, setCelebIndex] = useState(0);

  const handleSignSelect = (sign) => {
    if (selectedSign === sign) { setSelectedSign(null); setCelebIndex(0); return; }
    setSelectedSign(sign); setCelebIndex(0);
  };

  const pool = selectedSign ? (celebBySign[selectedSign] || []) : [];
  const currentCeleb = pool[celebIndex];

  return (
    <div style={{animation:"up .5s ease"}}>
      <div style={{textAlign:"center",marginBottom:24}}>
        <div style={{fontSize:36,marginBottom:10}}>🌟</div>
        <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:"#f5c842",margin:"0 0 8px"}}>Celebrity Connection</h2>
        <p style={{fontFamily:"Georgia,serif",color:"#a8e060",fontSize:15,margin:0}}>Select a sign to see which celebrities share that Sun sign.</p>
      </div>
      <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom:28}}>
        {signs.map(s=>(
          <button key={s} onClick={()=>handleSignSelect(s)} style={{background:selectedSign===s?("linear-gradient(135deg,"+colors[s]+","+colors[s]+"88)"):"rgba(255,200,50,0.06)",border:"2px solid "+(selectedSign===s?colors[s]:"rgba(255,200,50,0.25)"),color:selectedSign===s?"#0d0a14":"#f0c030",padding:"8px 14px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".07em",cursor:"pointer",transition:"all 0.22s"}}>{emojis[s]} {s}</button>
        ))}
      </div>
      {selectedSign && currentCeleb && (
        <div style={{animation:"up .4s ease"}}>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:"#a8e060",marginBottom:16,textAlign:"center"}}>✦ {selectedSign.toUpperCase()} SUN CELEBRITY ✦</div>
          <CelebrityAvatar celeb={currentCeleb} />
          {pool.length > 1 && (
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:20}}>
              <button onClick={()=>setCelebIndex(i=>(i-1+pool.length)%pool.length)} style={{background:"none",border:"1px solid rgba(255,200,50,0.3)",color:"#f5c842",padding:"8px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer"}}>← PREV</button>
              <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#4a4440",letterSpacing:".12em"}}>{celebIndex+1} / {pool.length}</span>
              <button onClick={()=>setCelebIndex(i=>(i+1)%pool.length)} style={{background:"none",border:"1px solid rgba(255,200,50,0.3)",color:"#f5c842",padding:"8px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer"}}>NEXT →</button>
            </div>
          )}
        </div>
      )}
      {!selectedSign && (<div style={{textAlign:"center",padding:"24px 0",fontFamily:"Georgia,serif",color:"#6a6058",fontSize:15}}>Select a sign above to reveal the stars ✨</div>)}
    </div>
  );
}

// ── GUESS YOUR SIGN ──
function isReturningSubscriber() {
  try { return localStorage.getItem("arewewoke_subscribed") === "true"; } catch(e) { return false; }
}
function saveSubscriberStatus() {
  try { localStorage.setItem("arewewoke_subscribed", "true"); } catch(e) {}
}
function getPersonalBest() {
  try { return parseInt(localStorage.getItem("arewewoke_best") || "0"); } catch(e) { return 0; }
}
function savePersonalBest(streak) {
  try {
    const current = getPersonalBest();
    if (streak > current) localStorage.setItem("arewewoke_best", String(streak));
  } catch(e) {}
}

function GuessYourSign() {
  const urlVerified = typeof window !== "undefined" && new URLSearchParams(window.location.search).get("verified") === "true";
  const returning = isReturningSubscriber();
  if (urlVerified) {
    saveSubscriberStatus();
    try { window.history.replaceState({}, "", window.location.pathname); } catch(e) {}
  }

  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [trialActivated, setTrialActivated] = useState(urlVerified || returning);
  const [usedIndices, setUsedIndices] = useState([]);
  const [currentQ, setCurrentQ] = useState(null);
  const [clueIndex, setClueIndex] = useState(0);
  const [step, setStep] = useState("start");
  const [guess, setGuess] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState({correct:0,total:0});
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(getPersonalBest());
  const [awaitingStripe, setAwaitingStripe] = useState(false);

  const pickQuestion = (prevUsed) => {
    const available = allGuessQuestions.map((_,i)=>i).filter(i=>!prevUsed.includes(i));
    if (available.length === 0) {
      const idx = Math.floor(Math.random()*allGuessQuestions.length);
      return { q: allGuessQuestions[idx], newUsed: [idx] };
    }
    const idx = available[Math.floor(Math.random()*available.length)];
    return { q: allGuessQuestions[idx], newUsed: [...prevUsed, idx] };
  };

  const startGame = () => {
    const { q, newUsed } = pickQuestion([]);
    setCurrentQ(q); setUsedIndices(newUsed); setClueIndex(0);
    setGuess(null); setFeedback(null); setStep("playing");
  };

  const handleGuess = (g) => {
    const correct = g === currentQ.sign;
    const newStreak = correct ? streak + 1 : 0;
    setScore(s=>({correct:s.correct+(correct?1:0),total:s.total+1}));
    setStreak(newStreak);
    if (newStreak > bestStreak) {
      setBestStreak(newStreak);
      savePersonalBest(newStreak);
    }
    setGuess(g);
    setFeedback(correct?"Correct! "+currentQ.sign+" energy is undeniable.":"Not quite – this was "+currentQ.sign+" "+(emojis[currentQ.sign]||""));
    setStep("result");
  };

  const handleNext = () => {
    const nextAnswered = questionsAnswered + 1;
    setQuestionsAnswered(nextAnswered);
    if (nextAnswered >= FREE_QUESTIONS && !trialActivated) { setStep("paywall"); return; }
    const { q, newUsed } = pickQuestion(usedIndices);
    setCurrentQ(q); setUsedIndices(newUsed); setClueIndex(0);
    setGuess(null); setFeedback(null); setStep("playing");
  };

  const handleStartTrial = () => { window.location.href = STRIPE_TRIAL_LINK; };

  const handleConfirmTrial = () => {
    setTrialActivated(true); setAwaitingStripe(false);
    const { q, newUsed } = pickQuestion(usedIndices);
    setCurrentQ(q); setUsedIndices(newUsed); setClueIndex(0);
    setGuess(null); setFeedback(null); setStep("playing");
  };

  const resetAll = () => {
    setQuestionsAnswered(0); setUsedIndices([]); setCurrentQ(null);
    setClueIndex(0); setStep("start"); setGuess(null); setFeedback(null);
    setScore({correct:0,total:0}); setStreak(0); setAwaitingStripe(false);
  };

  if (step === "start") return (
    <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
      <div style={{fontSize:48,marginBottom:16}}>🔮</div>
      <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:26,color:"#f5c842",marginBottom:12}}>Guess Your Sign</h2>
      <p style={{fontFamily:"Georgia,serif",color:"#a8e060",fontSize:16,marginBottom:12,lineHeight:1.7}}>Read the clues. Guess the zodiac sign.<br/>How well do you know the signs?</p>
      {trialActivated && (
        <div style={{display:"inline-block",background:"rgba(168,224,96,0.07)",border:"1px solid rgba(168,224,96,0.25)",borderRadius:12,padding:"10px 22px",marginBottom:16}}>
          <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#a8e060",letterSpacing:".1em"}}>✦ WELCOME BACK — TRIAL ACTIVE ✦</span>
        </div>
      )}
      {bestStreak > 0 && (
        <div style={{marginBottom:24}}>
          <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#f5c842",letterSpacing:".08em"}}>🏆 Personal Best: {bestStreak} in a row</span>
        </div>
      )}
      <br/>
      <button className="rb" style={{"--a":"#e8a800"}} onClick={startGame}>✦ START GUESSING</button>
      {trialActivated && (
        <div style={{marginTop:20}}>
          <button onClick={()=>window.open(STRIPE_PORTAL_LINK,"_blank")} style={{background:"none",border:"1px solid rgba(255,200,50,0.2)",color:"#4a4440",padding:"8px 22px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".1em",cursor:"pointer"}}>⚙ MANAGE SUBSCRIPTION</button>
        </div>
      )}
      {score.total>0&&<p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#f5c842",marginTop:20}}>Score: {score.correct}/{score.total}</p>}
    </div>
  );

  if (step === "paywall") return (
    <div style={{animation:"up .5s ease",textAlign:"center"}}>
      <div style={{background:"linear-gradient(135deg,rgba(232,168,0,0.1),rgba(0,0,0,0.3))",border:"1px solid rgba(255,200,50,0.35)",borderRadius:20,padding:"36px 28px",marginBottom:20,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#e8a800,transparent)"}}/>
        <div style={{fontSize:44,marginBottom:14}}>🔮</div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:20,color:"#f5c842",marginBottom:10}}>Hey Let Me Finish This!</div>
        {streak > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:14,color:"#a8e060",marginBottom:10}}>🔥 You had a {streak} question streak! Keep it going.</p>}
        {bestStreak > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#4a4440",marginBottom:14,letterSpacing:".06em"}}>🏆 Personal best: {bestStreak} in a row</p>}
        <p style={{fontFamily:"Georgia,serif",color:"#d8c890",fontSize:15,lineHeight:1.75,marginBottom:20}}>
          Unlock more questions and potential winnings –<br/>
          sign up for a <strong style={{color:"#f5c842"}}>7-day free trial</strong>.<br/>
          After 7 days, your subscription is <strong style={{color:"#f5c842"}}>$4.99/month</strong>. Cancel anytime.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:8,alignItems:"center",marginBottom:24}}>
          {["✦ Unlock more questions and potential winnings","✦ Unlimited replays","✦ Cancel instantly via Stripe – no emailing required"].map((item,i)=>(
            <div key={i} style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#a8e060",letterSpacing:".06em"}}>{item}</div>
          ))}
        </div>
        <button className="rb" style={{"--a":"#e8a800",marginBottom:14}} onClick={handleStartTrial}>✦ START MY FREE TRIAL</button>
        <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:"#4a4440",margin:"0 0 18px",letterSpacing:".08em"}}>CARD AUTHORIZATION TODAY · $4.99/MONTH AFTER 7 DAYS · CANCEL ANYTIME</p>
        <button onClick={resetAll} style={{background:"none",border:"1px solid rgba(255,200,50,0.2)",color:"#6a6058",padding:"8px 22px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".1em",cursor:"pointer"}}>← BACK TO START</button>
      </div>
    </div>
  );

  if (step === "playing" && currentQ) {
    const freeLeft = trialActivated ? null : Math.max(0, FREE_QUESTIONS - questionsAnswered);
    return (
      <div style={{animation:"up .45s ease"}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".15em",color:"#f5c842"}}>QUESTION {questionsAnswered+1}</div>
          {!trialActivated && <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".08em"}}>{freeLeft} free {freeLeft===1?"question":"questions"} left</div>}
          {trialActivated && <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".08em"}}>✦ TRIAL ACTIVE</div>}
        </div>
        <div style={{background:"rgba(255,200,50,0.06)",border:"1px solid rgba(255,200,50,0.25)",borderRadius:20,padding:"28px 24px",marginBottom:20,position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#e8a800,transparent)"}}/>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".2em",color:"#a8e060",marginBottom:16}}>CLUE {clueIndex+1} OF {currentQ.clues.length}</div>
          <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:20,color:"#ffffff",lineHeight:1.6,margin:"0 0 20px"}}>"{currentQ.clues[clueIndex]}"</p>
          {clueIndex < currentQ.clues.length-1 && (
            <button onClick={()=>setClueIndex(i=>i+1)} style={{background:"none",border:"1px solid rgba(168,224,96,0.3)",color:"#a8e060",padding:"8px 20px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,cursor:"pointer",letterSpacing:".1em"}}>NEXT CLUE →</button>
          )}
        </div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15em",color:"#f5c842",marginBottom:12}}>YOUR GUESS:</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
          {signs.map(s=>(
            <button key={s} className="sb" style={{"--a":colors[s]}} onClick={()=>handleGuess(s)}>
              <div style={{fontSize:14,marginBottom:2}}>{emojis[s]||"★"}</div>
              <div style={{fontSize:9,fontWeight:700}}>{s}</div>
            </button>
          ))}
        </div>
        {score.total>0&&<p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#f5c842",marginTop:16,textAlign:"center"}}>Score: {score.correct}/{score.total} {streak >= 2 ? "🔥 "+streak+" in a row!" : ""}</p>}
      </div>
    );
  }

  if (step === "result") return (
    <div style={{animation:"up .5s ease",textAlign:"center"}}>
      <div style={{background:guess===currentQ.sign?"rgba(168,224,96,0.08)":"rgba(255,80,80,0.08)",border:"1px solid "+(guess===currentQ.sign?"rgba(168,224,96,0.4)":"rgba(255,100,100,0.3)"),borderRadius:20,padding:"32px 24px",marginBottom:24}}>
        <div style={{fontSize:40,marginBottom:12}}>{emojis[currentQ.sign]||"★"}</div>
        <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:18,color:guess===currentQ.sign?"#a8e060":"#f5c842",margin:"0 0 8px"}}>{feedback}</p>
        {streak >= 2 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:"#f5c842",margin:"0 0 8px"}}>🔥 {streak} in a row!</p>}
        {guess !== currentQ.sign && streak === 0 && score.correct > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#a8e060",margin:"0 0 8px"}}>Streak reset — you had {score.correct} correct!</p>}
        <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15em",color:"#f5c842",margin:0}}>SCORE: {score.correct}/{score.total}</p>
        {bestStreak > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#4a4440",margin:"8px 0 0",letterSpacing:".08em"}}>🏆 Personal best: {bestStreak} in a row</p>}
      </div>
      <button className="rb" style={{"--a":"#e8a800"}} onClick={handleNext}>
        {questionsAnswered+1 >= FREE_QUESTIONS && !trialActivated ? "✦ SEE WHAT'S NEXT →" : "✦ NEXT QUESTION"}
      </button>
    </div>
  );

  return null;
}

// ── LEGAL CONTENT ──
function DocSection({title,children}){return(<div style={{marginBottom:24}}><div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:"#f5c842",marginBottom:8,paddingBottom:4,borderBottom:"1px solid rgba(255,200,50,0.1)"}}>{title}</div><div style={{color:"#c8c0b0",fontSize:14,lineHeight:1.85}}>{children}</div></div>);}
function DocP({children}){return <p style={{margin:"0 0 10px"}}>{children}</p>;}
function DocBullet({items}){return(<ul style={{margin:"0 0 10px",paddingLeft:20}}>{items.map((item,i)=><li key={i} style={{marginBottom:6}}>{item}</li>)}</ul>);}

function TermsContent(){return(<><DocP>Please read these Terms of Service carefully before using Arewewoke. By accessing or using the app, you agree to be bound by these terms.</DocP><DocSection title="1. About Arewewoke"><DocP>Arewewoke is an astrology-based entertainment application operated by Ayssia Mason. The app provides astrological content including cosmic fun facts, daily horoscopes, celebrity connections, and the Guess Your Sign game for entertainment purposes only.</DocP></DocSection><DocSection title="2. Entertainment Disclaimer"><DocP>All content on Arewewoke is intended solely for entertainment and personal reflection. Nothing on this platform constitutes professional advice of any kind.</DocP></DocSection><DocSection title="3. Eligibility"><DocP>You must be at least 18 years of age to subscribe to paid features of Arewewoke.</DocP></DocSection><DocSection title="4. Free Trial & Billing"><DocP>Arewewoke offers a 7-day free trial for the Guess Your Sign full feature. A small card authorization hold is placed on your payment method at sign-up to verify it is valid. This hold is not a charge and is released automatically within a few business days. After the 7-day trial, your subscription automatically renews at $4.99 per month unless you cancel before the trial ends.</DocP></DocSection><DocSection title="5. Cancellation"><DocP>You may cancel your subscription at any time via the Stripe customer portal — no emailing required. See our Cancellation Policy for full details.</DocP></DocSection><DocSection title="6. Intellectual Property"><DocP>All content, design, and features of Arewewoke are the property of Ayssia Mason unless otherwise credited. You may not reproduce, distribute, or create derivative works without express written permission.</DocP></DocSection><DocSection title="7. Limitation of Liability"><DocP>Arewewoke and Ayssia Mason shall not be liable for any indirect, incidental, or consequential damages arising from your use of the app. The app is provided on an as-is basis.</DocP></DocSection><DocSection title="8. Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function PrivacyContent(){return(<><DocP>Your privacy matters to Arewewoke.</DocP><DocSection title="1. Information We Collect"><DocBullet items={["Email address and name when you subscribe or contact us","Payment information, processed securely by Stripe — we never store full card details","Usage data and device information to improve app performance","Subscription status, stored securely to manage access to paid features"]}/></DocSection><DocSection title="2. How We Use Your Information"><DocBullet items={["To process and manage your subscription","To send receipts and billing communications","To improve app features and user experience","To respond to support requests"]}/><DocP>We do not sell, rent, share, or trade your personal information to third parties for marketing purposes.</DocP></DocSection><DocSection title="3. Your Rights"><DocP>You have the right to access, correct, or delete the personal data we hold about you. Contact us at arewewoke@gmail.com.</DocP></DocSection><DocSection title="4. Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function CancellationContent(){return(<><DocP>We want the cancellation process to be simple, transparent, and fully in your control.</DocP><DocSection title="Free Trial Period"><DocP>Your 7-day free trial begins the moment your payment method is verified via the authorization hold. You will not be charged during the trial. If you do not cancel before the trial ends, your $4.99/month subscription begins automatically on day 8.</DocP></DocSection><DocSection title="How to Cancel"><DocBullet items={["Via the Stripe customer portal — the fastest method, available 24/7, no emailing required. Stripe sends a confirmation email automatically.","By emailing arewewoke@gmail.com with the subject line: Cancel My Subscription. Allow up to 2 business days for processing."]}/><DocP>Cancellation takes effect at the end of your current billing period. You retain access to paid features until that date.</DocP></DocSection><DocSection title="Refund Policy"><DocP>All subscription fees are non-refundable once charged. We do not offer refunds for partial months or for subscriptions not cancelled before renewal. The authorization hold placed at sign-up is not a charge and is released automatically.</DocP></DocSection><DocSection title="Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function DisclaimerContent(){return(<><DocP>All astrological content on Arewewoke is provided strictly for entertainment and personal reflection. Astrology is a belief system and symbolic framework, not an empirical science.</DocP><DocSection title="Not Professional Advice"><DocP>Nothing on Arewewoke constitutes medical, psychological, financial, legal, or any other form of professional advice. If you are experiencing concerns in any of these areas, please consult a qualified professional.</DocP></DocSection><DocSection title="Celebrity Information"><DocP>Birth data and astrological placements for public figures are sourced from publicly available records and astrological databases. Arewewoke does not claim insider knowledge of any individual's personal life or character.</DocP></DocSection><DocSection title="Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function CreditsContent(){return(<><DocP>Arewewoke is created and operated by Ayssia Mason. The astrological interpretations in this app are original creative work by Ayssia Mason, informed by the following foundational astrological authors and traditions.</DocP><DocSection title="Astrological Authors & Works Referenced"><DocBullet items={["Steven Forrest — The Inner Sky, The Book of the Moon, evolutionary astrology","Liz Greene — Saturn: A New Look at an Old Devil, The Astrology of Fate, psychological astrology","Robert Hand — Planets in Transit, Horoscope Symbols","Howard Sasportas — The Twelve Houses","Donna Cunningham — humanistic interpretation of Moon and Venus placements","Isabel Hickey — Astrology: A Cosmic Science","Dane Rudhyar — An Astrological Mandala, humanistic and transpersonal astrology"]}/></DocSection><DocSection title="Technical"><DocP>Arewewoke is built with React and hosted on Vercel. Payment processing is handled by Stripe. Fonts by Google Fonts (Cinzel).</DocP></DocSection><DocSection title="Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}

// ── MAIN APP ──
export default function AstrologyApp() {
  const [topTab, setTopTab] = useState("horoscope");
  const [mode, setMode] = useState("home");
  const [selectedSign, setSelectedSign] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [fact, setFact] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const accent = selectedSign ? colors[selectedSign] : "#e8a800";

  const reset = () => { setSelectedSign(null); setSelectedPlanet(null); setFact(null); };

  const handleReveal = () => {
    if(!selectedSign||!selectedPlanet)return;
    setAnimating(true); setFact(null);
    setTimeout(()=>{ setFact(getFact(selectedSign,selectedPlanet)); setAnimating(false); },500);
  };

  const tabs = [
    {label:"🌠 Daily Horoscope",key:"horoscope"},
    {label:"🔮 Guess Your Sign",key:"guess"},
    {label:"🌟 Celebrity",key:"celebrity"},
    {label:"✦ Fun Facts",key:"facts"},
    {label:"📲 Get The App",key:"install"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0d0a14",fontFamily:"Georgia,serif",color:"#ffffff",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {[...Array(70)].map((_,i)=>(<div key={i} style={{position:"absolute",width:Math.random()*2.5+0.4+"px",height:Math.random()*2.5+0.4+"px",borderRadius:"50%",background:i%7===0?("rgba(168,224,96,"+(Math.random()*0.5+0.2)+")"):"rgba(255,200,50,"+(Math.random()*0.5+0.15)+")",left:Math.random()*100+"%",top:Math.random()*100+"%",animation:"tw "+(Math.random()*3+2)+"s ease-in-out infinite",animationDelay:Math.random()*4+"s"}}/>))}
      </div>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap'); @keyframes tw{0%,100%{opacity:0.2}50%{opacity:1}} @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}} @keyframes sh{0%{background-position:200% center}100%{background-position:-200% center}} @keyframes gl{0%,100%{box-shadow:0 0 18px 3px rgba(232,168,0,0.3)}50%{box-shadow:0 0 40px 10px rgba(232,168,0,0.6)}} @keyframes pu{0%,100%{opacity:0.4}50%{opacity:1}} .sb{background:rgba(255,200,50,0.06);border:1px solid rgba(255,200,50,0.2);color:#f0c030;padding:9px 12px;border-radius:8px;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.07em;font-weight:700;transition:all .22s;text-align:center} .sb:hover,.sb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a);transform:translateY(-2px)} .pb{background:rgba(255,200,50,0.05);border:1px solid rgba(255,200,50,0.18);color:#f0c030;padding:9px 18px;border-radius:100px;cursor:pointer;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.09em;font-weight:700;transition:all .22s} .pb:hover,.pb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a)} .rb{background:linear-gradient(135deg,var(--a),#8a6000);color:#0d0a14;border:none;padding:14px 38px;border-radius:100px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.14em;font-weight:900;cursor:pointer;transition:all .3s;animation:gl 3s ease-in-out infinite} .rb:hover{transform:scale(1.04);filter:brightness(1.12)} .fc{animation:up .65s ease forwards;background:linear-gradient(135deg,rgba(255,200,50,0.08),rgba(0,0,0,0.3));border:1px solid rgba(255,200,50,0.3);border-radius:20px;padding:30px 34px;position:relative;overflow:hidden} .fc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--a),transparent)} .bk{background:none;border:none;color:#5a5048;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.13em;font-weight:700;display:flex;align-items:center;gap:6px;margin-bottom:28px} .bk:hover{color:#a8e060}`}</style>

      <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"20px 18px 80px"}}>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
          {tabs.map(tab=>(
            <button key={tab.key} onClick={()=>{setTopTab(tab.key);setMode("home");reset();}} style={{background:topTab===tab.key?"linear-gradient(135deg,#e8a800,#8a6000)":"rgba(255,200,50,0.08)",border:"2px solid "+(topTab===tab.key?"#e8a800":"rgba(255,200,50,0.3)"),color:topTab===tab.key?"#0d0a14":"#f5c842",padding:"11px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,letterSpacing:".09em",cursor:"pointer",transition:"all 0.25s",boxShadow:topTab===tab.key?"0 0 16px 4px rgba(232,168,0,0.3)":"none"}}>{tab.label}</button>
          ))}
        </div>

        {topTab==="horoscope" && <DailyHoroscope />}
        {topTab==="celebrity" && <CelebrityConnection />}
        {topTab==="guess" && <GuessYourSign />}
        {topTab==="install" && (
          <div style={{animation:"up .5s ease"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:48,marginBottom:12}}>📲</div>
              <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:"#f5c842",margin:"0 0 8px"}}>Get The App</h2>
              <p style={{fontFamily:"Georgia,serif",color:"#a8e060",fontSize:15,margin:0,lineHeight:1.7}}>Save Arewewoke to your home screen for instant access — it works just like an app.</p>
            </div>

            {/* iPhone Instructions */}
            <div style={{background:"rgba(255,200,50,0.06)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:16,padding:"24px 20px",marginBottom:16}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:"#f5c842",marginBottom:16,letterSpacing:".1em"}}>🍎 ON IPHONE (SAFARI)</div>
              {[
                {num:1, icon:"🌐", text:"Open arewewoke.com in Safari — this must be Safari, not Chrome or another browser."},
                {num:2, icon:"⬆️", text:'Tap the Share button at the bottom of your screen — it looks like a box with an arrow pointing up.'},
                {num:3, icon:"➕", text:'Scroll down in the share menu and tap "Add to Home Screen".'},
                {num:4, icon:"✏️", text:'You can rename it to "AreWeWoke" or leave it as is — then tap "Add" in the top right corner.'},
                {num:5, icon:"🔮", text:"Done! You will now see the Arewewoke icon on your home screen. Tap it any time to open the app instantly."},
              ].map(step=>(
                <div key={step.num} style={{display:"flex",gap:14,marginBottom:16,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#e8a800,#8a6000)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,color:"#0d0a14",flexShrink:0}}>{step.num}</div>
                  <div>
                    <div style={{fontSize:18,marginBottom:4}}>{step.icon}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#d8c890",lineHeight:1.65}}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Android Instructions */}
            <div style={{background:"rgba(168,224,96,0.05)",border:"1px solid rgba(168,224,96,0.15)",borderRadius:16,padding:"24px 20px",marginBottom:16}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:"#a8e060",marginBottom:16,letterSpacing:".1em"}}>🤖 ON ANDROID (CHROME)</div>
              {[
                {num:1, icon:"🌐", text:"Open arewewoke.com in Chrome."},
                {num:2, icon:"⋮", text:'Tap the three dots menu in the top right corner of Chrome.'},
                {num:3, icon:"➕", text:'Tap "Add to Home screen" from the menu.'},
                {num:4, icon:"✏️", text:'Name it "AreWeWoke" and tap "Add".'},
                {num:5, icon:"🔮", text:"The Arewewoke icon will appear on your home screen — tap it any time for instant access."},
              ].map(step=>(
                <div key={step.num} style={{display:"flex",gap:14,marginBottom:16,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#a8e060,#4a8020)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,color:"#0d0a14",flexShrink:0}}>{step.num}</div>
                  <div>
                    <div style={{fontSize:18,marginBottom:4}}>{step.icon}</div>
                    <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#d8c890",lineHeight:1.65}}>{step.text}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Why */}
            <div style={{background:"rgba(255,200,50,0.04)",border:"1px solid rgba(255,200,50,0.1)",borderRadius:16,padding:"20px",textAlign:"center"}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#f5c842",marginBottom:10,letterSpacing:".1em"}}>✦ WHY ADD TO HOME SCREEN? ✦</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#7a6e62",lineHeight:1.7}}>No app store needed. Opens full screen like a real app. Your subscription and streak stay saved. One tap access every day.</div>
            </div>
          </div>
        )}

        {topTab==="facts" && <>
          <div style={{textAlign:"center",marginBottom:24}}>
            <div style={{fontSize:11,fontFamily:"'Cinzel',serif",fontWeight:700,letterSpacing:".3em",color:"#a8e060",marginBottom:12}}>✦ AREWEWOKE ✦</div>
            <h1 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:"clamp(28px,6vw,52px)",lineHeight:1.05,margin:"0 0 10px",background:"linear-gradient(135deg,#f5c842,#e8a800,#f5c842)",backgroundSize:"200% auto",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",backgroundClip:"text",animation:"sh 4s linear infinite"}}>Your Cosmic Fun Facts</h1>
            <p style={{color:"#a8e060",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,margin:0,letterSpacing:".05em"}}>Discover what the stars reveal about you</p>
          </div>
          {mode==="home" && (
            <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
              <div style={{fontSize:48,marginBottom:20}}>🌙</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:17,color:"#7a6e62",marginBottom:36}}>Choose a sign and a planet to discover your cosmic fun fact.</div>
              <button className="rb" style={{"--a":"#e8a800"}} onClick={()=>setMode("single")}>✦ EXPLORE YOUR PLACEMENTS</button>
            </div>
          )}
          {mode==="single" && (
            <div style={{animation:"up .45s ease"}}>
              <button className="bk" onClick={()=>{setMode("home");reset();}}>← BACK</button>
              <div style={{marginBottom:30}}>
                <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:accent,marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
                  <span style={{width:19,height:19,borderRadius:"50%",background:accent,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0d0a14",fontWeight:700,flexShrink:0}}>1</span>
                  SELECT YOUR SIGN
                </div>
                <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:7}}>
                  {signs.map(s=>(<button key={s} className={"sb"+(selectedSign===s?" sel":"")} style={{"--a":colors[s]}} onClick={()=>{setSelectedSign(s);setFact(null);}}><div style={{fontSize:16,marginBottom:3}}>{emojis[s]}</div><div style={{fontSize:9}}>{s}</div></button>))}
                </div>
              </div>
              {selectedSign && (
                <div style={{marginBottom:30,animation:"up .4s ease"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:accent,marginBottom:12,display:"flex",alignItems:"center",gap:9}}>
                    <span style={{width:19,height:19,borderRadius:"50%",background:accent,display:"inline-flex",alignItems:"center",justifyContent:"center",fontSize:9,color:"#0d0a14",fontWeight:700,flexShrink:0}}>2</span>
                    SELECT YOUR PLANET
                  </div>
                  <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                    {planets.map(p=>(<button key={p} className={"pb"+(selectedPlanet===p?" sel":"")} style={{"--a":accent}} onClick={()=>{setSelectedPlanet(p);setFact(null);}}>{emojis[p]} {p}</button>))}
                  </div>
                </div>
              )}
              {selectedSign && selectedPlanet && (
                <div style={{textAlign:"center",marginBottom:28,animation:"up .4s ease"}}>
                  <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:17,color:"#f5c842",marginBottom:6}}>{emojis[selectedPlanet]} {selectedPlanet} in {selectedSign} {emojis[selectedSign]}</div>
                  {OUTER.includes(selectedPlanet) && generationDates[selectedPlanet] && generationDates[selectedPlanet][selectedSign] && (
                    <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".09em",marginBottom:18}}>Born approx. {generationDates[selectedPlanet][selectedSign]}</div>
                  )}
                  <button className="rb" style={{"--a":accent}} onClick={handleReveal}>{fact?"✦ REVEAL ANOTHER FACT":"✦ REVEAL MY COSMIC FACT"}</button>
                </div>
              )}
              {animating && <div style={{textAlign:"center",padding:28,color:accent,fontSize:26,animation:"pu .5s ease infinite"}}>✦</div>}
              {fact && !animating && (
                <div className="fc" style={{"--a":accent}}>
                  <div style={{fontSize:28,marginBottom:14,textAlign:"center"}}>{emojis[selectedSign]}{emojis[selectedPlanet]}</div>
                  <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"clamp(15px,3vw,20px)",lineHeight:1.78,margin:"0 0 22px",color:"#f5c842",textAlign:"center"}}>"{fact}"</p>
                  <div style={{textAlign:"center"}}><span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".18em",color:accent,opacity:.8}}>✦ {selectedPlanet.toUpperCase()} IN {selectedSign.toUpperCase()} ✦</span></div>
                </div>
              )}
              {(selectedSign||selectedPlanet) && (
                <div style={{textAlign:"center",marginTop:24}}>
                  <button onClick={reset} style={{background:"none",border:"none",color:"#504840",cursor:"pointer",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".13em"}}>← START OVER</button>
                </div>
              )}
            </div>
          )}
        </>}

        <div style={{marginTop:60,paddingTop:28,borderTop:"1px solid rgba(255,200,50,0.08)"}}>
          <div style={{display:"flex",flexWrap:"wrap",justifyContent:"center",gap:"6px 18px",marginBottom:16}}>
            {["Terms of Service","Privacy Policy","Cancellation Policy","Disclaimer","Credits & Sources"].map(label=>(
              <button key={label} onClick={()=>setActiveDoc(label)} style={{background:"none",border:"none",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#4a4440",letterSpacing:".08em",cursor:"pointer",transition:"color .2s",padding:0}} onMouseEnter={e=>e.target.style.color="#a8e060"} onMouseLeave={e=>e.target.style.color="#4a4440"}>{label}</button>
            ))}
          </div>
          <div style={{textAlign:"center",color:"#2a2420",fontFamily:"'Cinzel',serif",fontSize:9,marginBottom:14,letterSpacing:".2em"}}>✦ ✦ ✦</div>
          <p style={{fontFamily:"Georgia,serif",fontSize:10,color:"#3a3228",textAlign:"center",lineHeight:1.7,margin:"0 0 16px",padding:"0 12px"}}>Arewewoke is for entertainment purposes only. Astrological content does not constitute professional advice of any kind.</p>
          <div style={{textAlign:"center",marginBottom:18}}>
            <a href="mailto:arewewoke@gmail.com" style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#4a4440",letterSpacing:".1em",textDecoration:"none"}} onMouseEnter={e=>e.target.style.color="#a8e060"} onMouseLeave={e=>e.target.style.color="#4a4440"}>arewewoke@gmail.com</a>
          </div>
          <div style={{textAlign:"center"}}>
            <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#2a2420",margin:0,letterSpacing:".1em"}}>powered by <span style={{color:"#a8e060"}}>Ayssia</span></p>
          </div>
        </div>
      </div>

      {activeDoc && (
        <div onClick={()=>setActiveDoc(null)} style={{position:"fixed",inset:0,background:"rgba(5,3,10,0.92)",zIndex:1000,overflowY:"auto",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px"}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#0f0c18",border:"1px solid rgba(255,200,50,0.25)",borderRadius:20,maxWidth:680,width:"100%",padding:"36px 32px",position:"relative",animation:"up .4s ease"}}>
            <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#e8a800,transparent)",borderRadius:"20px 20px 0 0"}}/>
            <button onClick={()=>setActiveDoc(null)} style={{position:"absolute",top:16,right:20,background:"none",border:"none",color:"#5a5048",cursor:"pointer",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,letterSpacing:".1em"}}>✕ CLOSE</button>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:20,color:"#f5c842",marginBottom:6}}>{activeDoc}</div>
              <div style={{fontFamily:"Georgia,serif",fontSize:11,color:"#5a5048"}}>Arewewoke — Last Updated: April 2026</div>
            </div>
            <div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#c8c0b0",lineHeight:1.85}}>
              {activeDoc==="Terms of Service" && <TermsContent/>}
              {activeDoc==="Privacy Policy" && <PrivacyContent/>}
              {activeDoc==="Cancellation Policy" && <CancellationContent/>}
              {activeDoc==="Disclaimer" && <DisclaimerContent/>}
              {activeDoc==="Credits & Sources" && <CreditsContent/>}
            </div>
            <div style={{textAlign:"center",marginTop:32}}>
              <button onClick={()=>setActiveDoc(null)} style={{background:"none",border:"1px solid rgba(255,200,50,0.3)",color:"#f5c842",padding:"10px 28px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer"}}>✕ CLOSE</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
