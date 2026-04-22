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
  { name:"Tupac Shakur", sign:"Gemini", sun:"Gemini", moon:"Sagittarius", rising:"Unknown", born:"Jun 16, 1971", emoji:"✊", fact:"His Gemini Sun gave him the ability to speak in two registers at once – the street poet and the political philosopher." },
  { name:"Ariana Grande", sign:"Cancer", sun:"Cancer", moon:"Libra", rising:"Capricorn", born:"Jun 26, 1993", emoji:"🌙", fact:"Her Cancer Sun is the source of her otherworldly emotional depth – she channels genuine feeling into every note." },
  { name:"Selena Gomez", sign:"Cancer", sun:"Cancer", moon:"Aries", rising:"Unknown", born:"Jul 22, 1992", emoji:"💜", fact:"Her Cancer Sun is the quiet engine behind her longevity – the emotional authenticity that makes her feel like a person, not a product." },
  { name:"Jennifer Lopez", sign:"Leo", sun:"Leo", moon:"Scorpio", rising:"Sagittarius", born:"Jul 24, 1969", emoji:"👑", fact:"Her Leo Sun is textbook – she was literally born to perform, and decades in, she is still the most magnetic person in any room." },
  { name:"Kylie Jenner", sign:"Leo", sun:"Leo", moon:"Scorpio", rising:"Unknown", born:"Aug 10, 1997", emoji:"💄", fact:"Her Leo Sun built an empire on visibility and personal brand – she understood instinctively that in the attention economy, the self is the product." },
  { name:"Beyonce", sign:"Virgo", sun:"Virgo", moon:"Scorpio", rising:"Libra", born:"Sep 4, 1981", emoji:"⭐", fact:"Her Virgo Sun is the secret behind the flawless execution – she rehearses until excellence becomes effortless." },
  { name:"Zendaya", sign:"Virgo", sun:"Virgo", moon:"Gemini", rising:"Unknown", born:"Sep 1, 1996", emoji:"🌟", fact:"Her Virgo Sun is behind the precision and intentionality of every career move – nothing she does is accidental." },
  { name:"Kim Kardashian", sign:"Libra", sun:"Libra", moon:"Pisces", rising:"Sagittarius", born:"Oct 21, 1980", emoji:"💋", fact:"Her Libra Sun explains the brand – beauty, aesthetics, and relatability weaponized into a billion-dollar empire." },
  { name:"Cardi B", sign:"Libra", sun:"Libra", moon:"Aries", rising:"Unknown", born:"Oct 11, 1992", emoji:"💅", fact:"Her Libra Sun is behind the charm and the aesthetic intelligence – she knows exactly how to present herself." },
  { name:"Drake", sign:"Scorpio", sun:"Scorpio", moon:"Scorpio", rising:"Unknown", born:"Oct 24, 1986", emoji:"🎤", fact:"Sun AND Moon in Scorpio – he literally cannot write a surface-level song. Everything comes from the wound." },
  { name:"Katy Perry", sign:"Scorpio", sun:"Scorpio", moon:"Scorpio", rising:"Unknown", born:"Oct 25, 1984", emoji:"🌟", fact:"Her Scorpio Sun gives her the intensity that lives underneath the pop surface – she transforms her most painful experiences into anthems." },
  { name:"Nicki Minaj", sign:"Sagittarius", sun:"Sagittarius", moon:"Virgo", rising:"Unknown", born:"Dec 8, 1982", emoji:"🏹", fact:"Her Sagittarius Sun is pure – she expanded rap's entire idea of what a female rapper could be." },
  { name:"Britney Spears", sign:"Sagittarius", sun:"Sagittarius", moon:"Aquarius", rising:"Libra", born:"Dec 2, 1981", emoji:"🎀", fact:"Her Sagittarius Sun is the freedom-seeker at the center of her story." },
  { name:"LeBron James", sign:"Capricorn", sun:"Capricorn", moon:"Aries", rising:"Unknown", born:"Dec 30, 1984", emoji:"🏀", fact:"His Capricorn Sun built the empire. He did not just play basketball – he studied power and played the longest game imaginable." },
  { name:"Michelle Obama", sign:"Capricorn", sun:"Capricorn", moon:"Aquarius", rising:"Unknown", born:"Jan 17, 1964", emoji:"🌿", fact:"Her Capricorn Sun is the structural integrity behind everything she does – the discipline and the refusal to be anything less than fully prepared." },
  { name:"Oprah Winfrey", sign:"Aquarius", sun:"Aquarius", moon:"Sagittarius", rising:"Sagittarius", born:"Jan 29, 1954", emoji:"📺", fact:"Her Aquarius Sun is the source of her revolutionary vision – she transformed what television could mean for humanity." },
  { name:"Harry Styles", sign:"Aquarius", sun:"Aquarius", moon:"Libra", rising:"Unknown", born:"Feb 1, 1994", emoji:"🌈", fact:"His Aquarius Sun is behind the genre-defying, norm-breaking persona – he belongs to no category and he built that freedom deliberately." },
  { name:"Rihanna", sign:"Pisces", sun:"Pisces", moon:"Aries", rising:"Aries", born:"Feb 20, 1988", emoji:"💎", fact:"Her Pisces Sun gives her that effortless, otherworldly quality – she moves through the world like she is partly somewhere else." },
  { name:"Bad Bunny", sign:"Pisces", sun:"Pisces", moon:"Virgo", rising:"Unknown", born:"Mar 10, 1994", emoji:"🐰", fact:"His Pisces Sun is the source of the emotional fluidity in his music – he crosses genre, gender expectation, and cultural boundary without effort." },
];

const facts = {
"Scorpio-Venus": ["Venus in Scorpio means love is never casual for you – you merge completely or not at all.","You have an almost psychic ability to sense when someone is being dishonest with you in love.","Your love language is transformation. You do not just want a partner – you want someone who challenges you to evolve."],
"Libra-Venus": ["Venus in Libra is the planet in its home sign – meaning love, beauty, and harmony come naturally to you.","You have an extraordinary eye for aesthetics. Your home, your style – everything around you tends to be carefully curated."],
"Taurus-Venus": ["Venus in Taurus is exalted – this is one of the most powerful placements for love and beauty in the entire zodiac.","You love through your senses. Physical touch, good food, beautiful surroundings are how you express and receive love."],
"Aries-Venus": ["Venus in Aries means you fall fast, hard, and all at once – the chase is genuinely exciting for you.","You are bold in love. You will make the first move, say what you feel, and pursue what you want without apology."],
"Gemini-Venus": ["Venus in Gemini means you fall in love with minds first. If someone cannot hold a real conversation, the attraction fades fast.","You need variety in love – not necessarily different partners, but variety in how you connect."],
"Cancer-Venus": ["Venus in Cancer means home is where your heart lives. Creating a safe, warm, nurturing environment is how you say I love you.","You have an extraordinary emotional memory. You remember exactly how someone made you feel years ago."],
"Leo-Venus": ["Venus in Leo loves grandly and dramatically – you do not do anything halfway.","You need to feel celebrated in your relationships. A partner who takes you for granted will slowly break your heart."],
"Virgo-Venus": ["Venus in Virgo expresses love through service and devotion – you show up, you fix things, you pay attention to details.","You are attracted to intelligence and competence. Someone who is good at what they do is genuinely attractive to you."],
"Sagittarius-Venus": ["Venus in Sagittarius loves freely and adventurously – you need a partner who is also your travel companion and best friend.","Freedom in love is non-negotiable. A relationship that feels like a cage will eventually push you out the door."],
"Capricorn-Venus": ["Venus in Capricorn takes love seriously. You do not date casually – you date with intention.","You express love through acts of reliability – showing up on time, keeping your word, building a stable life alongside someone."],
"Aquarius-Venus": ["Venus in Aquarius needs intellectual freedom in love above all else.","Friendship is the foundation of all your romantic relationships. If you cannot be genuine friends first, the romance has no foundation."],
"Pisces-Venus": ["Venus in Pisces is exalted – your capacity for love, empathy, and devotion is almost limitless.","You love unconditionally and sometimes unwisely. Your capacity to see the best in people can lead you to stay too long."],
"Aries-Moon": ["Your Moon in Aries means your emotional reactions are immediate and instinctive – you feel it, you express it, and often you are over it before others have even processed what happened.","You restore yourself through action, not reflection. When you are emotionally activated, you need to move."],
"Cancer-Moon": ["Moon in Cancer is the Moon in its home sign – giving you one of the most emotionally intuitive natures in the zodiac.","Your emotional memory is extraordinary. You carry the feeling of every significant moment with you indefinitely."],
"Scorpio-Moon": ["Moon in Scorpio is one of the most emotionally intense placements in the zodiac. Your feelings do not visit – they take up residence.","You have an instinctive ability to see beneath the surface of people and situations."],
"Leo-Moon": ["Moon in Leo means your emotional world is dramatic, generous, and deeply expressive. You feel things with your whole chest.","You restore through creativity, play, and being genuinely celebrated."],
"Taurus-Moon": ["Moon in Taurus is the Moon in its exaltation – emotional security, steadiness, and genuine presence are your greatest gifts.","You restore through physical comfort, good food, time in nature, and the simple pleasure of a beautiful, calm environment."],
"Gemini-Moon": ["Moon in Gemini means you process emotions through language – you need to talk about what you feel before it becomes real.","Your emotional world is quick-moving and varied. You can cycle through several feeling states in a single day."],
"Virgo-Moon": ["Moon in Virgo means you process emotions analytically – when something upsets you, your first instinct is to understand it.","You restore through order, productive work, and the satisfaction of having done something useful."],
"Libra-Moon": ["Moon in Libra means your emotional wellbeing is deeply tied to the quality of your relationships.","You restore through beauty, aesthetic pleasure, meaningful conversation, and time in balanced environments."],
"Sagittarius-Moon": ["Moon in Sagittarius means your emotional world is expansive, optimistic, and oriented toward freedom and meaning.","You restore through movement – travel, learning, outdoor space, or any experience that makes the world feel larger."],
"Capricorn-Moon": ["Moon in Capricorn means your emotional world is private, disciplined, and deeply serious beneath a composed exterior.","You restore through solitary productive work, time in nature, and the quiet satisfaction of having handled something difficult."],
"Aquarius-Moon": ["Moon in Aquarius means you process emotions intellectually – feelings arrive as ideas first.","You restore through solitude, intellectual stimulation, and connection to causes larger than yourself."],
"Pisces-Moon": ["Moon in Pisces is one of the most psychically sensitive placements in astrology. You pick up on emotional undercurrents before anyone has spoken.","You restore through creative expression, spiritual practice, time near water, and genuine solitude."],
"Leo-Sun": ["Your Sun in Leo is ruled by the Sun itself – the only sign with this distinction – meaning your identity and self-expression are inextricably linked.","You were born to shine. Not in a performative way – in a genuinely luminous way."],
"Scorpio-Sun": ["Your Sun in Scorpio means your identity is built around depth, truth, and evolution.","You are one of the most psychologically complex signs in the zodiac. There are layers to you that most people never access."],
"Capricorn-Sun": ["Your Sun in Capricorn means your identity is built around achievement, integrity, and the long game.","You have a relationship with time that sets you apart from most signs."],
"Aries-Sun": ["Your Sun in Aries means your identity is built around action, independence, and the courage to go first.","You were born to begin things. The spark of a new idea activates something in you that more cautious signs simply do not have access to."],
"Taurus-Sun": ["Your Sun in Taurus means your identity is built around what you love, what you create, and what you choose to call yours.","You have an instinctive relationship with quality. You know the difference between what is real and what is merely shiny."],
"Gemini-Sun": ["Your Sun in Gemini means your identity is built around ideas, language, and the endlessly stimulating exchange of both.","You are one of the most intellectually alive signs in the zodiac."],
"Cancer-Sun": ["Your Sun in Cancer means your identity is fluid, cyclical, and deeply tied to your emotional world and the people you love.","You have an emotional intelligence that operates almost like a sixth sense."],
"Virgo-Sun": ["Your Sun in Virgo gives you a mind that is precise, analytical, and perpetually oriented toward improvement.","You notice what others miss. Details, patterns, inconsistencies – these register for you automatically."],
"Libra-Sun": ["Your Sun in Libra means your identity is built around relationship, aesthetic intelligence, and the pursuit of genuine fairness.","You have a natural gift for seeing all sides of any situation with clarity and evenhandedness."],
"Sagittarius-Sun": ["Your Sun in Sagittarius means your identity is built around belief, freedom, and the perpetual pursuit of what lies beyond the next horizon.","You have a relationship with optimism that is not naivety but a genuine philosophical position."],
"Aquarius-Sun": ["Your Sun in Aquarius means your identity is built around originality, independence, and a genuine vision of how things could be better.","You have always felt slightly outside the mainstream – not as an affectation but as a lived experience."],
"Pisces-Sun": ["Your Sun in Pisces means your identity is fluid, imaginative, and fundamentally oriented toward the invisible dimensions of existence.","You have a permeability to experience that is both your greatest gift and your most demanding challenge."],
"Aries-Mercury": ["Mercury in Aries means your mind moves faster than almost anyone else in the room.","You communicate with directness that some people find refreshing and others find startling.","Your thinking is original and instinctive rather than methodical. You trust the first idea that arrives."],
"Taurus-Mercury": ["Mercury in Taurus means you think slowly, thoroughly, and almost always correctly.","Your communication style is calm, measured, and deeply reliable.","You have an instinctive connection between ideas and the physical world."],
"Gemini-Mercury": ["Mercury in Gemini is the planet in its home sign – giving you one of the most naturally agile minds in the entire zodiac.","You can hold two completely contradictory ideas at the same time without discomfort.","Your curiosity has no ceiling. The moment you feel like you fully understand something, your interest begins to migrate."],
"Cancer-Mercury": ["Mercury in Cancer means your mind is deeply intuitive and emotionally intelligent.","Your memory for feeling is extraordinary. You do not just remember events – you remember exactly how they felt.","You think best when you feel safe. In environments of genuine trust, you become one of the most insightful people in the conversation."],
"Leo-Mercury": ["Mercury in Leo gives you a natural gift for communication that commands attention.","You think in narratives, not bullet points. Your mind naturally organizes information into stories with stakes.","Your ideas come with conviction. You do not float suggestions – you make pronouncements."],
"Virgo-Mercury": ["Mercury in Virgo is the most analytically precise placement in the zodiac. Your mind is a finely calibrated instrument.","You notice the error everyone else walked past.","You express care through precision. When you edit someone's work, the extraordinary detail you bring is an act of respect."],
"Libra-Mercury": ["Mercury in Libra gives you a mind that is naturally diplomatic, fair, and extraordinarily good at seeing every side.","You think in relationships between ideas rather than isolated facts.","Your communication is elegant by instinct. You have a gift for saying difficult things in ways that preserve the relationship."],
"Scorpio-Mercury": ["Mercury in Scorpio gives you a mind that goes beneath the surface automatically.","You are a natural lie detector. You read subtext, body language, and what is conspicuously absent from a conversation.","Your silence is as powerful as your words. You know exactly when to withhold information."],
"Sagittarius-Mercury": ["Mercury in Sagittarius gives you a philosophical mind that is always reaching for the bigger picture.","You speak with a confidence and enthusiasm that is genuinely infectious.","Your honesty can arrive faster than your tact. You say the true thing before you have finished calculating whether this is the right moment."],
"Capricorn-Mercury": ["Mercury in Capricorn gives you a mind that is strategic, disciplined, and oriented toward what is actually useful.","Your communication is economical and precise. You do not use ten words when four will do.","You think in long timelines. Where others are planning for next week, you are mapping the next three years."],
"Aquarius-Mercury": ["Mercury in Aquarius gives you a mind that operates outside the mainstream almost by default.","You think in systems, patterns, and structures rather than individual cases.","Your intellectual independence is total. You form your own conclusions from your own research."],
"Pisces-Mercury": ["Mercury in Pisces gives you a mind that thinks in images, feelings, and impressions rather than linear logic.","You communicate with a poetic quality that is not affectation – it is simply how your mind works.","Your imagination is your most powerful cognitive tool."],
"Aries-Mars": ["Mars in Aries is the planet in its home sign – the most direct, energized, and instinctively courageous placement.","Your anger is clean. It arrives fast, burns hot, and is gone before others have even processed the conflict.","You are most alive when you are competing, initiating, or going first into something new."],
"Taurus-Mars": ["Mars in Taurus moves slowly and builds unstoppably. Once you have decided to move, nothing redirects you.","Your drive is sensory and material. You work for things you can touch, own, inhabit, and enjoy.","You have an extraordinary capacity for sustained effort. Where others sprint and burn out, you set a pace you can maintain for years."],
"Gemini-Mars": ["Mars in Gemini means your energy is mental first. You are most activated by intellectual challenge and debate.","You can pursue multiple goals simultaneously without losing track of any of them.","Your arguments are fast, precise, and occasionally devastating. When you are in conflict, you reach for words."],
"Cancer-Mars": ["Mars in Cancer means your drive is deeply protective. You are motivated by the safety of the people and places you love.","Your energy moves in tides rather than straight lines.","When someone threatens what you care about, a fierceness emerges that surprises people who only know your softer side."],
"Leo-Mars": ["Mars in Leo drives you toward visibility, recognition, and the expression of your full creative power.","Your energy is theatrical and generous. You bring drama, warmth, and genuine commitment to everything you pursue.","Your pride is your fuel. The suggestion that you cannot do something activates a competitive fire that is extremely difficult to extinguish."],
"Virgo-Mars": ["Mars in Virgo channels your drive into precision, improvement, and the relentless refinement of whatever you are working on.","Your work ethic is extraordinary and occasionally punishing.","You are most effective when you have a clear problem to solve."],
"Libra-Mars": ["Mars in Libra is the planet in its most challenged placement – you are built for harmony in a planet that runs on conflict.","You do not act unilaterally if you can help it. You consult, consider, and weigh before moving.","When you finally decide to fight for something, you fight with extraordinary skill and composure."],
"Scorpio-Mars": ["Mars in Scorpio is one of the most intensely driven placements in the zodiac. Your energy is focused, strategic, and almost completely invisible until the moment it is needed.","You do not pursue surface-level goals. Everything you go after has a deeper significance.","Your capacity for sustained focus on a single target is unmatched. You do not get distracted, you do not get discouraged."],
"Sagittarius-Mars": ["Mars in Sagittarius drives you toward freedom, expansion, and the feeling that you are moving toward something larger.","Your energy is enthusiastic and contagious. When you are genuinely excited about a direction, you bring people with you.","You pursue goals in bursts of intense, inspired effort. Your best work happens when you are lit up."],
"Capricorn-Mars": ["Mars in Capricorn is exalted – the planet of drive in the sign of mastery. Your ambition is patient, strategic, and oriented toward building something that lasts.","You do not waste energy on fights you cannot win or goals that do not serve your larger structure.","Your discipline is your superpower. You can delay gratification indefinitely in service of a goal that matters."],
"Aquarius-Mars": ["Mars in Aquarius drives you toward collective impact, innovation, and the disruption of systems that are no longer working.","You are most energized when working toward something that benefits more than just yourself.","Your approach to conflict is detached and strategic rather than emotional."],
"Pisces-Mars": ["Mars in Pisces drives you through feeling rather than strategy. You move toward what you love and away from what deadens you.","Your energy is diffuse and creative rather than focused and direct.","When you are connected to a purpose that genuinely moves you, you access a devotion and endurance that more practically-driven signs cannot match."],
"Aries-Jupiter": ["Jupiter in Aries expands through courage, initiative, and the willingness to go first. Your greatest opportunities arrive when you trust your instinct and act before you feel fully ready.","You grow through competition, challenge, and the direct pursuit of what you want."],
"Taurus-Jupiter": ["Jupiter in Taurus expands through patience, sensory pleasure, and the steady accumulation of real, tangible value.","You have a natural gift for recognizing quality and genuine worth – in objects, in people, in opportunities."],
"Gemini-Jupiter": ["Jupiter in Gemini expands through learning, communication, and the restless pursuit of new information.","You grow through connection – meeting people, exchanging ideas, and being present in the flow of information."],
"Cancer-Jupiter": ["Jupiter in Cancer is exalted – your capacity for emotional generosity, nurturing, and creating safety for others is one of your most profound gifts.","Your abundance is directly connected to your emotional world. When you feel genuinely at home, good things arrive with unusual ease."],
"Leo-Jupiter": ["Jupiter in Leo expands through creative expression, generosity, and the courage to be fully, visibly yourself.","You grow through joy. Play, creativity, romance, and genuine celebration are not indulgences for you – they are fuel."],
"Virgo-Jupiter": ["Jupiter in Virgo grows through service, skill, and the mastery of craft. Your abundance is built through genuine usefulness.","You expand through improvement. Each incremental refinement compounds over time into something extraordinary."],
"Libra-Jupiter": ["Jupiter in Libra expands through partnership, collaboration, and the pursuit of genuine fairness.","You grow through beauty and aesthetic refinement. Surrounding yourself with what is genuinely beautiful is a direct portal to expansion."],
"Scorpio-Jupiter": ["Jupiter in Scorpio expands through depth, transformation, and the willingness to go where others will not.","You have a gift for finding resources, insight, and power that others overlook – buried in the complicated or hidden."],
"Sagittarius-Jupiter": ["Jupiter in Sagittarius is the planet in its home sign – the most naturally abundant, optimistic placement Jupiter can occupy.","Your belief that things will work out is not naivety – it is a self-fulfilling orientation that genuinely shapes your reality."],
"Capricorn-Jupiter": ["Jupiter in Capricorn grows through structure, discipline, and the steady execution of a long-term plan.","You expand through taking on greater responsibility and demonstrating mastery."],
"Aquarius-Jupiter": ["Jupiter in Aquarius expands through community, innovation, and the contribution of original thinking to collective problems.","You grow through intellectual freedom. The moment you stop thinking what you are supposed to think is frequently when your expansion begins."],
"Pisces-Jupiter": ["Jupiter in Pisces is the planet in one of its home signs – giving you a natural abundance of spiritual sensitivity and creative imagination.","Your faith is your fortune. A fundamental trust in something larger, a willingness to surrender to the current of your life."],
"Aries-Saturn": ["Saturn in Aries asks you to master patience, strategy, and the discipline of timing.","You are building the capacity to lead with genuine authority rather than just energy."],
"Taurus-Saturn": ["Saturn in Taurus is building your relationship with security, self-worth, and material stability from the inside out.","You are learning that real stability is not given – it is built. And what you build yourself has a solidity that inherited security can never match."],
"Gemini-Saturn": ["Saturn in Gemini asks you to master depth over breadth. The natural Gemini tendency to skim the surface is being disciplined into genuine expertise.","You are building a relationship with your own mind that is rigorous rather than merely quick."],
"Cancer-Saturn": ["Saturn in Cancer is one of the more demanding placements – you are learning to build your own inner security rather than seeking it from others.","The emotional self-sufficiency you develop through this placement is extraordinary once it is built."],
"Leo-Saturn": ["Saturn in Leo asks you to earn rather than assume recognition.","You are building a creative and expressive life that is grounded in real skill and real craft."],
"Virgo-Saturn": ["Saturn in Virgo intensifies your already considerable relationship with precision and standard-setting.","You are building a mastery of craft and service that is genuinely rare."],
"Libra-Saturn": ["Saturn in Libra is exalted – the discipline, fairness, and commitment to genuine justice are most fully expressed here.","You are learning what genuine partnership requires – not just harmony and beauty, but the harder work of honest negotiation."],
"Scorpio-Saturn": ["Saturn in Scorpio asks you to build a relationship with power, depth, and transformation rooted in genuine integrity rather than control.","The psychological work you do with this placement becomes the foundation of an extraordinary and hard-won wisdom."],
"Sagittarius-Saturn": ["Saturn in Sagittarius asks you to build a philosophy that can survive contact with reality.","You are learning the discipline of focused belief – the capacity to commit to a direction and hold it through difficulty."],
"Capricorn-Saturn": ["Saturn in Capricorn is the planet in its home sign – amplifying your already considerable relationship with discipline and the long game.","You are building something that will outlast you – a body of work, a legacy, a reputation."],
"Aquarius-Saturn": ["Saturn in Aquarius asks you to build structures that serve the collective rather than just yourself.","You are learning to balance your need for freedom with the responsibilities of genuine belonging."],
"Pisces-Saturn": ["Saturn in Pisces asks you to build a relationship with the invisible, the spiritual, and the creative that is grounded and sustainable rather than escapist.","The discipline of bringing your imagination into material reality – through art, through spiritual practice – is your Saturn path."],
"Aries-Uranus": ["Uranus in Aries (2010–2018) gave your generation a revolutionary relationship with identity and individuality.","Your generation breaks with the past not through argument but through action."],
"Taurus-Uranus": ["Uranus in Taurus (2018–2026) is rewiring your generation's relationship with money, value, and the material world at its roots.","You carry an instinctive sense that the old relationship between humans and resources is unsustainable."],
"Gemini-Uranus": ["Uranus in Gemini (1941–1949) produced a generation with a revolutionary relationship to information and communication.","Your mind was wired for a kind of connectivity and information processing that was genuinely ahead of its time."],
"Cancer-Uranus": ["Uranus in Cancer (1948–1956) disrupted the very idea of home, family, and belonging.","You carry a deep tension between the need for security and the compulsion to break free of it."],
"Leo-Uranus": ["Uranus in Leo (1955–1962) produced a generation that would revolutionize self-expression, creativity, and the very idea of stardom.","You carry a fierce, almost defiant individualism – the conviction that your creative expression is not a luxury but a right."],
"Virgo-Uranus": ["Uranus in Virgo (1961–1969) rewired an entire generation's relationship to work, health, and service.","Your generation brought a revolutionary precision to practical problems."],
"Libra-Uranus": ["Uranus in Libra (1968–1975) disrupted every inherited idea about partnership, marriage, and social justice.","You carry an instinctive sense that fairness is not a given – it must be constructed and fought for."],
"Scorpio-Uranus": ["Uranus in Scorpio (1974–1981) produced a generation with a revolutionary relationship to power, sexuality, and psychological truth.","Your generation brought a fierce, unsentimental honesty to the darkest rooms in human experience."],
"Sagittarius-Uranus": ["Uranus in Sagittarius (1981–1988) gave your generation a revolutionary relationship to belief, freedom, and global connection.","You carry an instinctive rejection of any ideology that demands unquestioning allegiance."],
"Capricorn-Uranus": ["Uranus in Capricorn (1988–1996) produced a generation that would fundamentally disrupt institutions and authority structures.","Your generation's relationship to ambition is genuinely different from what came before."],
"Aquarius-Uranus": ["Uranus in Aquarius (1995–2003) is the planet in its home sign – producing a generation with a native fluency in collective intelligence and digital networks.","Your generation does not experience community and individuality as opposites."],
"Pisces-Uranus": ["Uranus in Pisces (2003–2011) produced a generation with a revolutionary relationship to spirituality, creativity, and the boundary between real and imagined.","Your generation carries an instinctive fluency with altered states of consciousness, reality, and identity."],
"Aries-Neptune": ["Neptune in Aries (2025–2039) is beginning to dissolve the boundaries of individual identity itself – your generation will reimagine what the self means in an age of collective consciousness.","You carry an instinctive spiritual courage – a willingness to leap into the unknown and trust what cannot yet be seen."],
"Taurus-Neptune": ["Neptune in Taurus (1874–1889) dissolved the boundaries between the material and the spiritual in an era of extraordinary artistic and economic transformation.","This generation carried a mystical relationship to the physical world – matter itself was seen as sacred, sensory, and infused with invisible meaning."],
"Gemini-Neptune": ["Neptune in Gemini (1888–1902) dissolved the boundaries between information and imagination – producing a generation for whom language, story, and myth were genuinely indistinguishable from reality.","This cohort gave the world some of its most enduring literature and ideas, born from the place where fact and dream intersect."],
"Cancer-Neptune": ["Neptune in Cancer (1901–1916) dissolved the boundaries of home, nation, and belonging – producing a generation whose spiritual longing was inseparable from their grief for what was lost.","This was the generation shaped by two world wars, whose deepest dreams were of safety, rootedness, and a home that could not be taken away."],
"Leo-Neptune": ["Neptune in Leo (1914–1929) dissolved the boundaries between self and spectacle – producing a generation that dreamed through glamour, performance, and the golden age of cinema and jazz.","This cohort carried a collective fantasy of radiance – the dream that the individual self, fully expressed, could redeem a broken world."],
"Virgo-Neptune": ["Neptune in Virgo (1928–1943) dissolved the boundaries between the ideal and the practical – producing a generation whose deepest spiritual longing was for a world that actually worked the way it was supposed to.","This cohort brought a quiet, service-oriented idealism to everything they touched – the dream expressed through craft, care, and disciplined devotion."],
"Libra-Neptune": ["Neptune in Libra (1942–1957) dissolved the boundaries between love and ideal – producing a generation whose spiritual longing was inseparable from their search for perfect partnership and universal justice.","This cohort carried the dream of peace as a lived reality – not just a political hope but a genuine spiritual orientation toward harmony."],
"Scorpio-Neptune": ["Neptune in Scorpio (1955–1970) dissolved the boundary between conscious and unconscious in an entire generation.","Your generation collectively dreamed of transformation – and produced the cultural upheaval of the 1960s and 70s."],
"Sagittarius-Neptune": ["Neptune in Sagittarius (1970–1984) dissolved the boundaries between spiritual traditions, producing a generation with a native hunger for meaning.","Your generation dreamed of freedom as a spiritual state, not just a political one."],
"Capricorn-Neptune": ["Neptune in Capricorn (1984–1998) dissolved the boundaries between dream and ambition in an entire generation.","Your generation carries a complex relationship to success – simultaneously drawn to achievement and aware of its hollowness."],
"Aquarius-Neptune": ["Neptune in Aquarius (1998–2012) dissolved the boundaries between individual and collective consciousness in a generation that grew up online.","Your generation dreams of collective healing and systemic change with an idealism that is both Neptune's greatest gift and its most significant challenge."],
"Pisces-Neptune": ["Neptune in Pisces (2011–2026) is the planet in its home sign – the most spiritually and creatively saturated placement possible.","Your generation is arriving with a permeability to collective feeling that no previous cohort has carried in this form."],
"Aries-Pluto": ["Pluto in Aries (2068–2097) will transform an entire generation's relationship to identity, will, and the very nature of individual existence – this placement belongs to the future, carrying the seeds of a civilization not yet built.","Those born under this placement will arrive as pioneers of a kind humanity has not yet encountered."],
"Taurus-Pluto": ["Pluto in Taurus (1851–1884) transformed an entire generation's relationship to land, wealth, and the physical foundations of power – this was the era of industrialization at its most raw and transformative.","This generation carried the deep compulsion to build, own, and control the material world – and in doing so, reshaped civilization permanently."],
"Gemini-Pluto": ["Pluto in Gemini (1882–1914) transformed an entire generation's relationship to information, language, and the power of ideas – this was the era that gave the world psychoanalysis, modernism, and the electric age of communication.","This cohort carried a compulsive relationship to the mind itself – the conviction that ideas could transform everything, for better or for catastrophic worse."],
"Cancer-Pluto": ["Pluto in Cancer (1912–1939) transformed an entire generation's relationship to home, family, and national belonging – this was the generation shaped by the Great Depression and two World Wars.","They carried a fierce, almost desperate need to protect what they loved, and a capacity for collective sacrifice that has rarely been seen since."],
"Leo-Pluto": ["Pluto in Leo (1937–1958) transformed an entire generation's relationship to power, creativity, and the individual will.","Your generation carried a compulsive relationship to significance – the need to matter, to leave a mark, to be remembered."],
"Virgo-Pluto": ["Pluto in Virgo (1956–1972) transformed an entire generation's relationship to work, health, and the systems that sustain life.","You carry a deep compulsion toward improvement, analysis, and the correction of what is broken."],
"Libra-Pluto": ["Pluto in Libra (1971–1984) transformed an entire generation's relationship to partnership, justice, and the balance of power.","You carry a deep awareness of power dynamics in relationships that previous generations either did not see or chose not to name."],
"Scorpio-Pluto": ["Pluto in Scorpio (1983–1995) is the planet in its home sign – the most intensely transformative generational placement possible.","You were born into a world where the shadow was erupting into visibility."],
"Sagittarius-Pluto": ["Pluto in Sagittarius (1995–2008) transformed an entire generation's relationship to belief, globalization, and the clash of worldviews.","You carry a deep awareness that belief systems are constructed, that truth is contested, and that the map is not the territory."],
"Capricorn-Pluto": ["Pluto in Capricorn (2008–2024) is transforming an entire generation's relationship to authority, institutions, and the structures of power.","You were born knowing at a cellular level that the old structures do not hold."],
"Aquarius-Pluto": ["Pluto in Aquarius (2023–2043) is beginning to transform an entire generation's relationship to collective intelligence, technology, and the definition of what it means to be human.","Your cohort is arriving at the moment when the boundary between human and artificial, individual and network, is being fundamentally renegotiated."],
"Pisces-Pluto": ["Pluto in Pisces (2043–2068) will transform an entire generation's relationship to consciousness, spirituality, and the invisible dimensions of existence – this placement belongs to the future, arriving at a moment when the boundary between worlds may be thinner than it has ever been.","Those born under this placement will carry a depth of spiritual perception and a relationship to dissolution and rebirth that represents the full completion of Pluto's journey through the zodiac."],
"Aries-Rising": ["Aries Rising means Mars rules your chart – giving you a direct, energetic, and instinctively forward-moving outer presence.","Your first impression is one of confidence, energy, and a certain restless aliveness. People sense that you are oriented toward action.","The challenge of this Ascendant is that your directness can land as aggression or impatience to people who are not expecting it."],
"Taurus-Rising": ["Taurus Rising means Venus rules your chart – giving you a grounded, beautiful, and quietly magnetic outer presence.","Your first impression is one of calm, reliability, and a certain sensory richness. People feel at ease around you quickly.","You tend to have a physical quality that is naturally attractive – a strong ease in your body that reads as someone deeply comfortable in their own skin."],
"Gemini-Rising": ["Gemini Rising means Mercury rules your chart – giving you a quick, communicative, and intellectually alive outer presence.","Your first impression is one of wit, curiosity, and adaptability. People sense that your mind is always running.","You tend to have a youthful quality that persists across decades – a lightness of expression and animated eyes."],
"Cancer-Rising": ["Cancer Rising means the Moon rules your chart – giving you a warm, receptive, and deeply empathic outer presence.","Your first impression is one of gentleness, care, and a kind of soft attentiveness that makes people feel instinctively safe.","The challenge of this Ascendant is that your receptivity can absorb too much – you take in the emotional atmosphere at a level that can be genuinely depleting."],
"Leo-Rising": ["Leo Rising means the Sun rules your chart – the only Ascendant with this distinction – giving you a radiant, magnetically confident outer presence.","Your first impression is larger than life. There is something about you that people register the moment you enter a room.","You tend to have a physical quality that draws attention – strong hair, dramatic features, or simply an energy that takes up space in the best possible way."],
"Virgo-Rising": ["Virgo Rising means Mercury rules your chart – giving you a precise, observant, and quietly capable outer presence.","Your first impression is one of intelligence, attentiveness, and a certain quiet discernment. People sense that you are noticing things.","You look put-together because you genuinely are."],
"Libra-Rising": ["Libra Rising means Venus rules your chart – giving you a gracious, aesthetically refined, and socially gifted outer presence.","Your first impression is one of elegance, warmth, and a certain careful attentiveness to the people around you.","You tend to have a naturally attractive physical quality – symmetrical features, a graceful bearing."],
"Scorpio-Rising": ["Scorpio Rising means Mars and Pluto rule your chart – giving you a magnetic, penetrating, and quietly powerful outer presence.","Your first impression is one of intensity, depth, and a certain controlled stillness. People sense there is more beneath your surface than you are showing.","You tend to have a physically striking quality – intense eyes, a magnetic bearing, or simply an energy that pulls the room slightly toward you."],
"Sagittarius-Rising": ["Sagittarius Rising means Jupiter rules your chart – giving you an expansive, warm, and genuinely optimistic outer presence.","Your first impression is one of enthusiasm, openness, and a certain generous aliveness. People find it genuinely contagious.","The challenge of this Ascendant is that your enthusiasm can run ahead of your discernment."],
"Capricorn-Rising": ["Capricorn Rising means Saturn rules your chart – giving you a serious, authoritative, and quietly formidable outer presence.","Your first impression is one of competence, composure, and a certain restrained power. People sense that you have actually earned it.","The challenge of this Ascendant is that your composure can read as coldness."],
"Aquarius-Rising": ["Aquarius Rising means Saturn and Uranus rule your chart – giving you an original, intellectually alive, and quietly magnetic outer presence.","Your first impression is one of intelligence, independence, and a certain friendly detachment.","You tend to have a physically distinctive quality – something slightly unconventional about your appearance or bearing."],
"Pisces-Rising": ["Pisces Rising means Jupiter and Neptune rule your chart – giving you a gentle, permeable, and otherworldly outer presence.","Your first impression is one of softness, depth, and a certain dreamy quality that makes people want to know what you are actually thinking.","The challenge of this Ascendant is that your permeability makes it easy for others' energies to enter your field uninvited."],
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
  return sign + " " + planet + " gives you a uniquely powerful energy that shapes how you experience this area of life.";
}

const avatarData = [
  { sign:"Aries", symbol:"♈", color:"#FF3D00", glow:"#FF6D00", scifiClass:"Vanguard Striker", emoji:"🔥" },
  { sign:"Taurus", symbol:"♉", color:"#2E7D32", glow:"#00C853", scifiClass:"Titan Guardian", emoji:"🌿" },
  { sign:"Gemini", symbol:"♊", color:"#F9A825", glow:"#FFD600", scifiClass:"Dual-Core Phantom", emoji:"✨" },
  { sign:"Cancer", symbol:"♋", color:"#1565C0", glow:"#2979FF", scifiClass:"Lunar Sentinel", emoji:"🌙" },
  { sign:"Leo", symbol:"♌", color:"#E65100", glow:"#FF9100", scifiClass:"Solar Sovereign", emoji:"👑" },
  { sign:"Virgo", symbol:"♍", color:"#00695C", glow:"#1DE9B6", scifiClass:"Nano Architect", emoji:"🌾" },
  { sign:"Libra", symbol:"♎", color:"#6A1B9A", glow:"#D500F9", scifiClass:"Equilibrium Arbiter", emoji:"⚖️" },
  { sign:"Scorpio", symbol:"♏", color:"#880E4F", glow:"#FF1744", scifiClass:"Shadow Infiltrator", emoji:"🖤" },
  { sign:"Sagittarius", symbol:"♐", color:"#E64A19", glow:"#FF6D00", scifiClass:"Void Ranger", emoji:"🏹" },
  { sign:"Capricorn", symbol:"♑", color:"#37474F", glow:"#78909C", scifiClass:"Iron Strategist", emoji:"⛰️" },
  { sign:"Aquarius", symbol:"♒", color:"#0277BD", glow:"#00B0FF", scifiClass:"Quantum Visionary", emoji:"⚡" },
  { sign:"Pisces", symbol:"♓", color:"#4527A0", glow:"#7C4DFF", scifiClass:"Astral Mystic", emoji:"💜" },
];

const quizLevels = [
  {
    level: 1,
    title: "Guess the Sign",
    subtitle: "Read the clues — which sign is it?",
    icon: "🔮",
    isClueFormat: true,
    questions: [
      { clue:"I get bored easily and I love being the first to try something new. People say I act before I think — and honestly? They are right.", options:["Taurus","Scorpio","Aries","Capricorn"], answer:"Aries" },
      { clue:"I take my time with everything. I love good food, cozy spaces, and things that last. Once I make up my mind, nothing can change it.", options:["Aries","Taurus","Libra","Virgo"], answer:"Taurus" },
      { clue:"I love talking, asking questions, and learning new things. I can be into something one week and completely different the next!", options:["Sagittarius","Aquarius","Gemini","Leo"], answer:"Gemini" },
      { clue:"My home is my whole world. I feel everything really deeply and I never forget how someone made me feel.", options:["Pisces","Cancer","Scorpio","Taurus"], answer:"Cancer" },
      { clue:"I love being the center of attention and making people feel special. I am generous, dramatic, and I give everything I have.", options:["Aries","Libra","Leo","Sagittarius"], answer:"Leo" },
      { clue:"I notice details no one else sees. I like having a plan, keeping things organized, and doing everything the right way.", options:["Capricorn","Virgo","Cancer","Aquarius"], answer:"Virgo" },
      { clue:"I hate conflict and I try to make everyone happy. I love beautiful things and I always want everything to be fair.", options:["Gemini","Libra","Pisces","Leo"], answer:"Libra" },
      { clue:"I feel things more deeply than I ever show. I am loyal, intense, and I never forget. Do not cross me — I remember everything.", options:["Scorpio","Aries","Cancer","Virgo"], answer:"Scorpio" },
      { clue:"I love adventures, telling it like it is, and believing that everything will work out. Freedom is everything to me.", options:["Aquarius","Leo","Aries","Sagittarius"], answer:"Sagittarius" },
      { clue:"I work harder than anyone. I am patient, responsible, and I am always thinking about the future. I do not quit.", options:["Taurus","Virgo","Capricorn","Scorpio"], answer:"Capricorn" },
      { clue:"I do things my own way and I do not care if it seems weird. I care more about ideas and helping the world than fitting in.", options:["Gemini","Aquarius","Libra","Sagittarius"], answer:"Aquarius" },
      { clue:"I pick up on everyone's feelings without trying. I am dreamy, creative, and sometimes I live more in my imagination than real life.", options:["Cancer","Scorpio","Pisces","Libra"], answer:"Pisces" },
    ]
  },
  {
    level: 2,
    title: "Match the Symbol",
    subtitle: "Do you know your signs by sight?",
    icon: "🔣",
    questions: [
      { q:"Which sign does the symbol ♈ represent?", options:["Taurus","Aries","Aquarius","Capricorn"], answer:"Aries" },
      { q:"Which sign does the symbol ♉ represent?", options:["Gemini","Virgo","Taurus","Leo"], answer:"Taurus" },
      { q:"Which sign does the symbol ♊ represent?", options:["Libra","Aquarius","Gemini","Cancer"], answer:"Gemini" },
      { q:"Which sign does the symbol ♋ represent?", options:["Scorpio","Cancer","Capricorn","Pisces"], answer:"Cancer" },
      { q:"Which sign does the symbol ♌ represent?", options:["Leo","Libra","Sagittarius","Aries"], answer:"Leo" },
      { q:"Which sign does the symbol ♍ represent?", options:["Gemini","Taurus","Virgo","Scorpio"], answer:"Virgo" },
      { q:"Which sign does the symbol ♎ represent?", options:["Aquarius","Libra","Leo","Virgo"], answer:"Libra" },
      { q:"Which sign does the symbol ♏ represent?", options:["Capricorn","Aries","Pisces","Scorpio"], answer:"Scorpio" },
      { q:"Which sign does the symbol ♐ represent?", options:["Sagittarius","Aquarius","Cancer","Libra"], answer:"Sagittarius" },
      { q:"Which sign does the symbol ♑ represent?", options:["Pisces","Scorpio","Capricorn","Virgo"], answer:"Capricorn" },
      { q:"Which sign does the symbol ♒ represent?", options:["Aquarius","Gemini","Aries","Cancer"], answer:"Aquarius" },
      { q:"Which sign does the symbol ♓ represent?", options:["Libra","Taurus","Sagittarius","Pisces"], answer:"Pisces" },
    ]
  },
  {
    level: 3,
    title: "Planetary Definitions",
    subtitle: "What rules what?",
    icon: "🪐",
    questions: [
      { q:"What is a Sun sign?", options:["The sign the Moon was in at your birth","The sign the Sun was in at your birth","Your Rising sign","The sign that rules your chart"], answer:"The sign the Sun was in at your birth" },
      { q:"What is a Moon sign?", options:["The sign the Sun was in at your birth","The sign ruling your career","The sign the Moon was in at your birth","Your Ascendant sign"], answer:"The sign the Moon was in at your birth" },
      { q:"What is a Mercury sign?", options:["The sign ruling love","The sign ruling communication and thinking style","The sign ruling your career","The sign ruling your home life"], answer:"The sign ruling communication and thinking style" },
      { q:"What is a Venus sign?", options:["The sign ruling love, beauty, and values","The sign ruling ambition and drive","The sign ruling home and family","The sign ruling intellect"], answer:"The sign ruling love, beauty, and values" },
      { q:"What is a Mars sign?", options:["The sign ruling beauty and romance","The sign ruling drive, ambition, and how you take action","The sign ruling communication","The sign ruling spirituality"], answer:"The sign ruling drive, ambition, and how you take action" },
      { q:"What is a Jupiter sign?", options:["The sign ruling restriction and discipline","The sign ruling expansion, luck, and abundance","The sign ruling home and roots","The sign ruling deep transformation"], answer:"The sign ruling expansion, luck, and abundance" },
      { q:"What is a Saturn sign?", options:["The sign ruling luck and joy","The sign ruling love and pleasure","The sign ruling discipline, structure, and life lessons","The sign ruling intuition"], answer:"The sign ruling discipline, structure, and life lessons" },
      { q:"What is a Rising sign (Ascendant)?", options:["The sign the Sun was in at birth","The sign the Moon was in at birth","The sign rising on the eastern horizon at your exact birth time","The sign ruling your subconscious"], answer:"The sign rising on the eastern horizon at your exact birth time" },
      { q:"What is a Uranus sign?", options:["The sign ruling daily routine and health","The sign ruling innovation, rebellion, and generational change","The sign ruling love and romance","The sign ruling creativity and self-expression"], answer:"The sign ruling innovation, rebellion, and generational change" },
      { q:"What is a Neptune sign?", options:["The sign ruling ambition and status","The sign ruling dreams, spirituality, and illusions","The sign ruling communication and logic","The sign ruling the physical body"], answer:"The sign ruling dreams, spirituality, and illusions" },
      { q:"What is a Pluto sign?", options:["The sign ruling day-to-day habits","The sign ruling beauty and romance","The sign ruling deep transformation, power, and rebirth","The sign ruling intellectual curiosity"], answer:"The sign ruling deep transformation, power, and rebirth" },
      { q:"Which planet rules both Gemini and Virgo?", options:["Venus","Mars","Jupiter","Mercury"], answer:"Mercury" },
    ]
  },
  {
    level: 4,
    title: "Animals & Mythology",
    subtitle: "The creatures of the cosmos",
    icon: "🐉",
    questions: [
      { q:"Which animal represents Aries?", options:["Bull","Ram","Lion","Crab"], answer:"Ram" },
      { q:"Which animal represents Taurus?", options:["Ram","Horse","Bull","Fish"], answer:"Bull" },
      { q:"Which mythological figures are associated with Gemini?", options:["Castor and Pollux","Apollo and Artemis","Romulus and Remus","Zeus and Hera"], answer:"Castor and Pollux" },
      { q:"Which creature represents Cancer?", options:["Scorpion","Crab","Fish","Goat"], answer:"Crab" },
      { q:"Which animal represents Leo?", options:["Eagle","Horse","Bull","Lion"], answer:"Lion" },
      { q:"Which mythological figure is Virgo associated with?", options:["Aphrodite","Ares","Astraea, goddess of justice","Poseidon"], answer:"Astraea, goddess of justice" },
      { q:"What symbol is Libra associated with?", options:["The scales of justice","The sword","The shield","The crown"], answer:"The scales of justice" },
      { q:"Which creature represents Scorpio?", options:["Crab","Eagle","Scorpion","Serpent"], answer:"Scorpion" },
      { q:"Which creature represents Sagittarius?", options:["Centaur — half human, half horse","Minotaur — half human, half bull","Mermaid — half human, half fish","Satyr — half human, half goat"], answer:"Centaur — half human, half horse" },
      { q:"Which mythological creature is Capricorn associated with?", options:["Pegasus — a winged horse","Sea-goat — half goat, half fish","Phoenix — a fire bird","Chimera — a fire-breathing hybrid"], answer:"Sea-goat — half goat, half fish" },
      { q:"What does the Aquarius symbol of water waves actually represent?", options:["The ocean","Waves of electricity and innovation","Waves of knowledge and wisdom poured from a water-bearer","Rain falling from the sky"], answer:"Waves of knowledge and wisdom poured from a water-bearer" },
      { q:"Which creatures represent Pisces?", options:["One fish swimming alone","Two fish swimming in opposite directions","Two dolphins leaping together","Two whales diving deep"], answer:"Two fish swimming in opposite directions" },
    ]
  }
];

function getAvatarForMilestone(level, questionIndex) {
  const milestone = Math.floor(questionIndex / 4);
  const avatarIndex = (level - 1) * 3 + milestone;
  return avatarData[avatarIndex];
}

const STRIPE_TRIAL_LINK = "https://buy.stripe.com/bJefZa8lH4TBetl2VL5sA01";
const STRIPE_PORTAL_LINK = "https://billing.stripe.com/p/login/5kQ3co6dzeub70TfIx5sA00";
const PAYWALL_AFTER = 5;

function AvatarSVG({ avatar, size = 90 }) {
  const c = avatar.color;
  const g = avatar.glow;
  return (
    <svg width={size} height={size} viewBox="0 0 120 140" fill="none">
      <defs>
        <radialGradient id={`ag-${avatar.sign}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={g} stopOpacity="0.5" />
          <stop offset="100%" stopColor={g} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="70" rx="52" ry="58" fill={`url(#ag-${avatar.sign})`} />
      <rect x="40" y="105" width="16" height="28" rx="6" fill={c} opacity="0.7" />
      <rect x="64" y="105" width="16" height="28" rx="6" fill={c} opacity="0.7" />
      <rect x="32" y="68" width="56" height="42" rx="10" fill={c} />
      <rect x="42" y="74" width="36" height="26" rx="6" fill={g} opacity="0.4" />
      <circle cx="60" cy="87" r="7" fill={g} opacity="0.9" />
      <circle cx="60" cy="87" r="4" fill="white" opacity="0.8" />
      <rect x="18" y="65" width="20" height="14" rx="6" fill={c} opacity="0.8" />
      <rect x="82" y="65" width="20" height="14" rx="6" fill={c} opacity="0.8" />
      <rect x="20" y="76" width="14" height="32" rx="6" fill={c} opacity="0.7" />
      <rect x="86" y="76" width="14" height="32" rx="6" fill={c} opacity="0.7" />
      <rect x="50" y="56" width="20" height="14" rx="4" fill={c} opacity="0.8" />
      <ellipse cx="60" cy="45" rx="26" ry="28" fill={c} />
      <polygon points="60,10 54,28 66,28" fill={c} opacity="0.6" />
      <ellipse cx="60" cy="44" rx="18" ry="10" fill={g} opacity="0.9" />
      <ellipse cx="54" cy="41" rx="5" ry="3" fill="white" opacity="0.25" />
    </svg>
  );
}

function ZodiacQuiz() {
  const loadSaved = (key, fallback) => {
    try {
      const val = localStorage.getItem("aww_" + key);
      return val !== null ? JSON.parse(val) : fallback;
    } catch(e) { return fallback; }
  };
  const save = (key, val) => {
    try { localStorage.setItem("aww_" + key, JSON.stringify(val)); } catch(e) {}
  };

  const [screen, setScreen] = useState(() => {
    const s = loadSaved("screen", "intro");
    return (s === "playing" || s === "levelComplete" || s === "paywall") ? s : "intro";
  });
  const [level, setLevel] = useState(() => loadSaved("level", 1));
  const [questionIndex, setQuestionIndex] = useState(() => loadSaved("questionIndex", 0));
  const [totalAnswered, setTotalAnswered] = useState(() => loadSaved("totalAnswered", 0));
  const [correctInLevel, setCorrectInLevel] = useState(() => loadSaved("correctInLevel", 0));
  const [score, setScore] = useState(() => loadSaved("score", { correct: 0, total: 0 }));
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [newAvatar, setNewAvatar] = useState(null);
  const [unlockedAvatars, setUnlockedAvatars] = useState(() => loadSaved("unlockedAvatars", []));
  const [isSubscribed, setIsSubscribed] = useState(() => {
    try { return localStorage.getItem("aww_subscribed") === "true"; } catch(e) { return false; }
  });
  const [showMemberVerify, setShowMemberVerify] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberError, setMemberError] = useState(null);
  const [memberVerifying, setMemberVerifying] = useState(false);

  React.useEffect(() => { save("screen", screen); }, [screen]);
  React.useEffect(() => { save("level", level); }, [level]);
  React.useEffect(() => { save("questionIndex", questionIndex); }, [questionIndex]);
  React.useEffect(() => { save("totalAnswered", totalAnswered); }, [totalAnswered]);
  React.useEffect(() => { save("correctInLevel", correctInLevel); }, [correctInLevel]);
  React.useEffect(() => { save("score", score); }, [score]);
  React.useEffect(() => { save("unlockedAvatars", unlockedAvatars); }, [unlockedAvatars]);

  const levelData = quizLevels[level - 1];
  const currentQuestion = levelData.questions[questionIndex];

  const handleAnswer = (option) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(option);
    const correct = option === currentQuestion.answer;
    setIsCorrect(correct);
    const newScore = { correct: score.correct + (correct ? 1 : 0), total: score.total + 1 };
    setScore(newScore);
    const newCorrectInLevel = correctInLevel + (correct ? 1 : 0);
    setCorrectInLevel(newCorrectInLevel);
    const newTotal = totalAnswered + 1;
    setTotalAnswered(newTotal);

    setTimeout(() => {
      const nextQIndex = questionIndex + 1;
      const prevMilestone = Math.floor(correctInLevel / 4);
      const newMilestone = Math.floor(newCorrectInLevel / 4);
      if (newMilestone > prevMilestone && correct) {
        const av = getAvatarForMilestone(level, questionIndex);
        if (av) {
          setNewAvatar(av);
          setUnlockedAvatars(prev => [...prev, av.sign]);
          setSelectedAnswer(null); setIsCorrect(null);
          if (newTotal >= PAYWALL_AFTER && !isSubscribed && nextQIndex < 12) {
            setScreen("avatarUnlock");
            return;
          }
          setScreen("avatarUnlock");
          return;
        }
      }
      if (newTotal >= PAYWALL_AFTER && !isSubscribed && nextQIndex < 12) {
        setScreen("paywall");
        return;
      }
      if (nextQIndex >= 12) {
        setScreen("levelComplete");
      } else {
        setQuestionIndex(nextQIndex);
        setSelectedAnswer(null);
        setIsCorrect(null);
      }
    }, 1400);
  };

  const handleNextAfterAvatar = () => {
    const nextQIndex = questionIndex + 1;
    setNewAvatar(null);
    if (totalAnswered >= PAYWALL_AFTER && !isSubscribed && nextQIndex < 12) {
      setScreen("paywall");
      return;
    }
    if (nextQIndex >= 12) {
      setScreen("levelComplete");
    } else {
      setQuestionIndex(nextQIndex);
      setScreen("playing");
    }
  };

  const handleNextLevel = () => {
    if (level >= 4) { setScreen("trophy"); return; }
    setLevel(l => l + 1);
    setQuestionIndex(0);
    setCorrectInLevel(0);
    setScreen("playing");
  };

  const handleSubscribe = () => { window.location.href = STRIPE_TRIAL_LINK; };

  const handleVerifyMember = async () => {
    const email = memberEmail.trim().toLowerCase();
    if (!email || !email.includes("@")) { setMemberError("Please enter a valid email."); return; }
    setMemberVerifying(true); setMemberError(null);
    try {
      const res = await fetch(`/api/check-subscription?email=${encodeURIComponent(email)}`);
      const data = await res.json();
      if (data.active) {
        try { localStorage.setItem("aww_subscribed", "true"); } catch(e) {}
        setIsSubscribed(true);
        setScreen("playing");
      } else {
        setMemberError("No active subscription found for that email.");
      }
    } catch {
      setMemberError("Something went wrong. Please check your connection and try again.");
    } finally { setMemberVerifying(false); }
  };

  const resetAll = () => {
    ["screen","level","questionIndex","totalAnswered","correctInLevel","score","unlockedAvatars"].forEach(k => {
      try { localStorage.removeItem("aww_" + k); } catch(e) {}
    });
    setScreen("intro"); setLevel(1); setQuestionIndex(0);
    setTotalAnswered(0); setCorrectInLevel(0);
    setScore({ correct:0, total:0 }); setSelectedAnswer(null);
    setIsCorrect(null); setNewAvatar(null); setUnlockedAvatars([]);
    setShowMemberVerify(false); setMemberEmail(""); setMemberError(null);
  };

  React.useEffect(() => {
    if (screen === "intro") setScreen("playing");
  }, []);
  if (screen === "intro") return null;

  if (screen === "paywall") return (
    <div style={{animation:"up .5s ease",textAlign:"center"}}>
      <div style={{background:"linear-gradient(135deg,rgba(232,168,0,0.12),rgba(0,0,0,0.35))",border:"1px solid rgba(255,200,50,0.35)",borderRadius:20,padding:"32px 24px",marginBottom:16,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#e8a800,transparent)"}}/>
        <div style={{fontSize:44,marginBottom:12}}>🔮</div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:20,color:"#f5c842",marginBottom:10}}>Ready for More?</div>
        <p style={{fontFamily:"Georgia,serif",color:"#d8c890",fontSize:15,lineHeight:1.75,marginBottom:16}}>
          You have completed your free preview.<br/>
          Unlock the full quiz — all 4 levels, all 12 avatars — with a <strong style={{color:"#f5c842"}}>7-day free trial</strong>.<br/>
          Then just <strong style={{color:"#f5c842"}}>$4.99/month</strong>. Cancel anytime.
        </p>
        <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"center",marginBottom:20}}>
          {["✦ All 48 questions across 4 levels","✦ All 12 Zodiac Operative avatars","✦ Cancel instantly via Stripe — no emails"].map((item,i)=>(
            <div key={i} style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#a8e060",letterSpacing:".06em"}}>{item}</div>
          ))}
        </div>
        {unlockedAvatars.length > 0 && (
          <div style={{marginBottom:20}}>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#f5c842",letterSpacing:".12em",marginBottom:10}}>AVATARS COLLECTED SO FAR</div>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              {unlockedAvatars.map(s=>{const av=avatarData.find(a=>a.sign===s);return(
                <div key={s} style={{textAlign:"center"}}>
                  <AvatarSVG avatar={av} size={48}/>
                  <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:av.color,marginTop:2}}>{s}</div>
                </div>
              );})}
              {Array.from({length: Math.max(0, 3 - unlockedAvatars.length)}).map((_,i)=>(
                <div key={"lock"+i} style={{width:48,height:48,borderRadius:8,background:"rgba(255,255,255,0.03)",border:"1px solid rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18}}>🔒</div>
              ))}
            </div>
          </div>
        )}
        <button className="rb" style={{"--a":"#e8a800",marginBottom:12}} onClick={handleSubscribe}>✦ START MY FREE TRIAL</button>
        <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:"#4a4440",margin:"0 0 16px",letterSpacing:".08em"}}>7-DAY FREE TRIAL · $4.99/MONTH AFTER · CANCEL ANYTIME</p>
        {!showMemberVerify ? (
          <button onClick={()=>setShowMemberVerify(true)} style={{background:"none",border:"1px solid rgba(168,224,96,0.3)",color:"#a8e060",padding:"10px 24px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer",marginBottom:14}}>✦ ALREADY A MEMBER</button>
        ) : (
          <div style={{marginBottom:14,padding:"18px",background:"rgba(168,224,96,0.05)",border:"1px solid rgba(168,224,96,0.2)",borderRadius:14}}>
            <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"#a8e060",letterSpacing:".1em",marginBottom:10}}>VERIFY YOUR MEMBERSHIP</p>
            <input
              type="email" placeholder="your@email.com" value={memberEmail}
              onChange={e=>setMemberEmail(e.target.value)}
              onKeyDown={e=>e.key==="Enter"&&handleVerifyMember()}
              style={{width:"100%",padding:"11px 14px",borderRadius:10,border:"1px solid rgba(168,224,96,0.3)",background:"rgba(255,255,255,0.04)",color:"#f5f0e0",fontFamily:"Georgia,serif",fontSize:14,textAlign:"center",outline:"none",boxSizing:"border-box",marginBottom:10}}
            />
            {memberError && <p style={{fontFamily:"Georgia,serif",color:"#f5c842",fontSize:12,marginBottom:8,lineHeight:1.5}}>{memberError}</p>}
            <button className="rb" style={{"--a":"#a8e060",marginBottom:8,opacity:memberVerifying?0.6:1}} onClick={handleVerifyMember} disabled={memberVerifying}>
              {memberVerifying ? "CHECKING..." : "✦ VERIFY & CONTINUE"}
            </button>
            <br/>
            <button onClick={()=>{setShowMemberVerify(false);setMemberError(null);setMemberEmail("");}} style={{background:"none",border:"none",color:"#4a4440",cursor:"pointer",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".1em"}}>← BACK</button>
          </div>
        )}
        <br/>
        <button onClick={resetAll} style={{background:"none",border:"1px solid rgba(255,200,50,0.15)",color:"#6a6058",padding:"8px 22px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".1em",cursor:"pointer"}}>← BACK TO START</button>
      </div>
    </div>
  );

  if (screen === "avatarUnlock" && newAvatar) return (
    <div style={{animation:"up .6s ease",textAlign:"center"}}>
      <div style={{background:`linear-gradient(135deg,${newAvatar.color}22,rgba(0,0,0,0.4))`,border:`2px solid ${newAvatar.color}66`,borderRadius:24,padding:"36px 24px",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,transparent,${newAvatar.glow},transparent)`}}/>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,letterSpacing:".3em",color:newAvatar.color,marginBottom:16}}>✦ AVATAR UNLOCKED ✦</div>
        <div style={{display:"flex",justifyContent:"center",marginBottom:16}}>
          <AvatarSVG avatar={newAvatar} size={130}/>
        </div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:28,color:newAvatar.color,marginBottom:6}}>{newAvatar.symbol} {newAvatar.sign}</div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:"#a8e060",letterSpacing:".12em",marginBottom:20}}>{newAvatar.scifiClass}</div>
        <p style={{fontFamily:"Georgia,serif",fontSize:15,color:"#d8c890",lineHeight:1.7,marginBottom:24}}>
          You have earned the <strong style={{color:newAvatar.color}}>{newAvatar.sign} Operative</strong>.<br/>
          This cosmic warrior now joins your collection.
        </p>
        <div style={{marginBottom:24}}>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#f5c842",letterSpacing:".15em",marginBottom:12}}>YOUR COLLECTION</div>
          <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
            {[...unlockedAvatars, newAvatar.sign].filter((v,i,a)=>a.indexOf(v)===i).map(s=>{
              const av=avatarData.find(a=>a.sign===s);
              return(<div key={s} style={{textAlign:"center"}}><AvatarSVG avatar={av} size={52}/><div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:av.color,marginTop:2}}>{s}</div></div>);
            })}
          </div>
        </div>
        <button className="rb" style={{"--a":newAvatar.color}} onClick={handleNextAfterAvatar}>✦ CONTINUE THE QUEST</button>
      </div>
    </div>
  );

  if (screen === "levelComplete") return (
    <div style={{animation:"up .5s ease",textAlign:"center"}}>
      <div style={{background:"rgba(168,224,96,0.07)",border:"1px solid rgba(168,224,96,0.3)",borderRadius:20,padding:"32px 24px",marginBottom:16}}>
        <div style={{fontSize:48,marginBottom:12}}>🏅</div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:22,color:"#a8e060",marginBottom:8}}>Level {level} Complete!</div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:14,color:"#f5c842",marginBottom:16}}>{levelData.title}</div>
        <div style={{fontFamily:"Georgia,serif",fontSize:15,color:"#d8c890",lineHeight:1.7,marginBottom:20}}>
          Score: <strong style={{color:"#f5c842"}}>{score.correct}/{score.total}</strong> correct overall.<br/>
          Avatars collected: <strong style={{color:"#a8e060"}}>{unlockedAvatars.length} of 12</strong>
        </div>
        {unlockedAvatars.length > 0 && (
          <div style={{marginBottom:20}}>
            <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
              {unlockedAvatars.map(s=>{const av=avatarData.find(a=>a.sign===s);return(
                <div key={s} style={{textAlign:"center"}}><AvatarSVG avatar={av} size={52}/><div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:av.color,marginTop:2}}>{s}</div></div>
              );})}
            </div>
          </div>
        )}
        {level < 4 ? (
          <div>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#f5c842",marginBottom:16,letterSpacing:".08em"}}>NEXT: Level {level+1} — {quizLevels[level].title}</div>
            <button className="rb" style={{"--a":"#e8a800"}} onClick={handleNextLevel}>✦ START LEVEL {level+1}</button>
          </div>
        ) : (
          <button className="rb" style={{"--a":"#e8a800"}} onClick={()=>setScreen("trophy")}>✦ SEE FINAL RESULTS</button>
        )}
      </div>
      <button onClick={resetAll} style={{background:"none",border:"1px solid rgba(255,200,50,0.15)",color:"#5a5048",padding:"8px 22px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".1em",cursor:"pointer"}}>← START OVER</button>
    </div>
  );

  if (screen === "trophy") {
    const pct = Math.round((score.correct / score.total) * 100);
    const msg = pct===100?{t:"Perfect Score!",s:"The cosmos bows to you. Absolute mastery.",c:"#f5c842"}
      :pct>=80?{t:"Cosmic Expert!",s:"Your astrological knowledge is deeply tuned.",c:"#f5c842"}
      :pct>=60?{t:"Star Seeker!",s:"You read the signs well. The cosmos is impressed.",c:"#a8e060"}
      :pct>=40?{t:"Rising Apprentice!",s:"You are learning the language of the stars.",c:"#a8e060"}
      :{t:"Cosmic Beginner!",s:"Every master started somewhere. The stars are patient.",c:"#5bc8d8"};
    return (
      <div style={{animation:"up .6s ease",textAlign:"center",padding:"12px 0"}}>
        <div style={{background:"linear-gradient(135deg,rgba(232,168,0,0.12),rgba(0,0,0,0.4))",border:"2px solid rgba(255,200,50,0.4)",borderRadius:24,padding:"36px 24px",position:"relative",overflow:"hidden",marginBottom:16}}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"linear-gradient(90deg,transparent,#e8a800,transparent)"}}/>
          <div style={{fontSize:64,marginBottom:10}}>🏆</div>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,letterSpacing:".3em",color:"#a8e060",marginBottom:12}}>✦ QUEST COMPLETE ✦</div>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:msg.c,marginBottom:8}}>{msg.t}</div>
          <p style={{fontFamily:"Georgia,serif",fontSize:15,color:"#d8c890",lineHeight:1.7,marginBottom:20}}>{msg.s}</p>
          <div style={{width:110,height:110,borderRadius:"50%",background:"linear-gradient(135deg,rgba(232,168,0,0.2),rgba(0,0,0,0.3))",border:"3px solid #e8a800",margin:"0 auto 20px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"}}>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:30,color:"#f5c842",lineHeight:1}}>{score.correct}</div>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".1em"}}>OF {score.total}</div>
          </div>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:"#f5c842",marginBottom:16}}>{pct}% Accuracy</div>
          {unlockedAvatars.length > 0 && (
            <div style={{marginBottom:20}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".14em",marginBottom:12}}>✦ OPERATIVES COLLECTED: {unlockedAvatars.length}/12 ✦</div>
              <div style={{display:"flex",gap:8,justifyContent:"center",flexWrap:"wrap"}}>
                {unlockedAvatars.map(s=>{const av=avatarData.find(a=>a.sign===s);return(
                  <div key={s} style={{textAlign:"center"}}><AvatarSVG avatar={av} size={52}/><div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:av.color,marginTop:2}}>{s}</div></div>
                );})}
              </div>
            </div>
          )}
          <button className="rb" style={{"--a":"#e8a800"}} onClick={resetAll}>✦ PLAY AGAIN</button>
        </div>
      </div>
    );
  }

  const progress = ((questionIndex) / 12) * 100;
  const levelColor = ["#FF3D00","#2E7D32","#6A1B9A","#0277BD"][level-1];
  const answerBg = (opt) => {
    if (selectedAnswer === null) return "rgba(255,200,50,0.06)";
    if (opt === currentQuestion.answer) return "rgba(168,224,96,0.18)";
    if (opt === selectedAnswer && !isCorrect) return "rgba(255,80,80,0.18)";
    return "rgba(255,200,50,0.03)";
  };
  const answerBorder = (opt) => {
    if (selectedAnswer === null) return "rgba(255,200,50,0.2)";
    if (opt === currentQuestion.answer) return "rgba(168,224,96,0.6)";
    if (opt === selectedAnswer && !isCorrect) return "rgba(255,80,80,0.5)";
    return "rgba(255,200,50,0.08)";
  };
  const answerColor = (opt) => {
    if (selectedAnswer === null) return "#f0c030";
    if (opt === currentQuestion.answer) return "#a8e060";
    if (opt === selectedAnswer && !isCorrect) return "#ff7070";
    return "#4a4440";
  };

  return (
    <div style={{animation:"up .45s ease"}}>
      {totalAnswered > 0 && questionIndex === loadSaved("questionIndex", 0) && (
        <div style={{background:"rgba(168,224,96,0.08)",border:"1px solid rgba(168,224,96,0.2)",borderRadius:10,padding:"8px 14px",marginBottom:14,textAlign:"center",animation:"up .4s ease"}}>
          <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#a8e060",letterSpacing:".1em"}}>✦ WELCOME BACK — PROGRESS RESTORED ✦</span>
        </div>
      )}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".15em",color:levelColor}}>
          {levelData.icon} LEVEL {level} — {levelData.title.toUpperCase()}
        </div>
        <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#f5c842",letterSpacing:".08em"}}>
          Q{questionIndex+1}/12 · {score.correct}/{score.total} ✓
        </div>
      </div>
      <div style={{height:3,background:"rgba(255,255,255,0.06)",borderRadius:2,marginBottom:16,overflow:"hidden"}}>
        <div style={{height:"100%",width:progress+"%",background:`linear-gradient(90deg,${levelColor},#f5c842)`,borderRadius:2,transition:"width 0.4s ease"}}/>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:18,justifyContent:"center"}}>
        {[0,1,2].map(i=>{
          const threshQ = i*4;
          const avatarIndex = (level-1)*3+i;
          const av = avatarData[avatarIndex];
          const unlocked = unlockedAvatars.includes(av.sign);
          const inProgress = questionIndex >= threshQ && !unlocked;
          return (
            <div key={i} style={{display:"flex",alignItems:"center",gap:5,background:unlocked?"rgba(168,224,96,0.1)":inProgress?"rgba(255,200,50,0.08)":"rgba(255,255,255,0.03)",border:`1px solid ${unlocked?av.color:inProgress?"rgba(255,200,50,0.2)":"rgba(255,255,255,0.05)"}`,borderRadius:8,padding:"6px 10px"}}>
              <div style={{fontSize:unlocked?16:12,opacity:unlocked?1:0.4}}>{av.emoji}</div>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:unlocked?av.color:inProgress?"#f5c842":"#3a3428",letterSpacing:".06em"}}>{unlocked?"EARNED":inProgress?"Q"+(threshQ+1)+"-"+(threshQ+4):"LOCKED"}</div>
            </div>
          );
        })}
      </div>
      <div style={{background:"rgba(255,200,50,0.05)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:18,padding:"24px 20px",marginBottom:18,position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:`linear-gradient(90deg,transparent,${levelColor},transparent)`}}/>
        {levelData.isClueFormat ? (
          <>
            <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".18em",color:"#a8e060",textAlign:"center",marginBottom:12}}>✦ WHICH SIGN IS THIS? ✦</div>
            <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"clamp(15px,3.5vw,19px)",color:"#ffffff",lineHeight:1.75,margin:0,textAlign:"center"}}>"{currentQuestion.clue}"</p>
          </>
        ) : (
          <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:"clamp(15px,3.5vw,20px)",color:"#ffffff",lineHeight:1.65,margin:0,textAlign:"center"}}>{currentQuestion.q}</p>
        )}
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:18}}>
        {currentQuestion.options.map((opt,i)=>(
          <button key={i} onClick={()=>handleAnswer(opt)} disabled={selectedAnswer!==null}
            style={{background:answerBg(opt),border:`1.5px solid ${answerBorder(opt)}`,borderRadius:12,padding:"14px 18px",textAlign:"left",cursor:selectedAnswer===null?"pointer":"default",fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:answerColor(opt),transition:"all 0.25s",display:"flex",alignItems:"center",gap:12}}>
            <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,color:"inherit",opacity:0.6,flexShrink:0}}>{"ABCD"[i]}</span>
            {opt}
            {selectedAnswer !== null && opt === currentQuestion.answer && <span style={{marginLeft:"auto",fontSize:18}}>✓</span>}
            {selectedAnswer === opt && !isCorrect && <span style={{marginLeft:"auto",fontSize:18}}>✗</span>}
          </button>
        ))}
      </div>
      {selectedAnswer !== null && (
        <div style={{animation:"up .35s ease",textAlign:"center",padding:"12px",background:isCorrect?"rgba(168,224,96,0.08)":"rgba(255,80,80,0.08)",border:`1px solid ${isCorrect?"rgba(168,224,96,0.3)":"rgba(255,100,100,0.3)"}`,borderRadius:12}}>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:isCorrect?"#a8e060":"#ff7070"}}>
            {isCorrect?"✦ Correct! The stars align.":"✗ Not quite — "+currentQuestion.answer}
          </div>
        </div>
      )}
      {!isSubscribed && (
        <div style={{marginTop:16,textAlign:"center"}}>
          <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:8,color:"#4a4440",letterSpacing:".08em"}}>
            {Math.max(0, PAYWALL_AFTER - totalAnswered) > 0 ? `${Math.max(0,PAYWALL_AFTER-totalAnswered)} free questions remaining` : "✦ TRIAL ACTIVE"}
          </span>
        </div>
      )}
    </div>
  );
}

const celebBySign = {};
celebrities.forEach(c => {
  if (!celebBySign[c.sign]) celebBySign[c.sign] = [];
  celebBySign[c.sign].push(c);
});

const dailyHoroscopes = {
  Aries:[
    "There is a lot of energy pushing on you right now — like three people all talking to you at once. Take a breath. You do not have to answer everyone today. Pick the one thing that matters most and focus there.",
    "Saturn is sitting right in your sign and it is asking you a big question: are you building something real, or just moving fast? Today slow down enough to check. Fast is fun but strong lasts longer.",
    "You have been feeling more tired than usual lately and that is not weakness — that is your body telling you the work you are doing is real. Rest today without guilt. Even the bravest person needs sleep.",
    "Something you started a while back is finally showing results. It might feel small but it is actually big. Saturn in your sign means the things you build now will last a really long time. Keep going.",
    "Your feelings are really intense today and it might feel like too much. That is Neptune sitting in your sign making everything feel bigger and deeper. Write it down, draw it out, or talk to someone you trust.",
    "You feel like starting something brand new today and honestly? Go for it. With Saturn in Aries backing you up, anything you begin right now has the power to become something really solid and lasting.",
    "Someone challenged you recently and part of you is still thinking about it. That is okay. Mars energy in your sign means you have the strength to respond — just make sure you respond with truth, not just anger.",
  ],
  Taurus:[
    "The Sun is in your sign right now which means this is literally your season. You are at your most magnetic, your most grounded, and your most powerful. Let people see how steady and beautiful you are.",
    "Venus is also in your sign right now — your ruling planet at home. Love, money, beauty, and comfort are all flowing your way. Enjoy something delicious today. You earned it and you deserve it.",
    "Someone is noticing you in a really good way right now and they might not say it yet — but they see you. The Sun and Venus in Taurus make you quietly irresistible. Just keep being yourself.",
    "A money situation that felt uncertain is starting to become clearer. Venus in your sign helps with finances and self worth. You are worth more than you have been asking for — remember that.",
    "Today wants you to slow way down and enjoy exactly where you are. Not every day needs to be productive. Sometimes just being present and feeling good is the whole point. Let today be that day.",
    "Something creative is trying to come out of you. Venus in Taurus loves beauty and art. Even if you do not think of yourself as creative — try making something today just for fun. You might surprise yourself.",
    "A relationship feels warmer and more comfortable than usual today. That is Venus doing her work in your sign. If there has been tension with someone you care about, today is a really good day to soften it.",
  ],
  Gemini:[
    "Something big is about to change in your world and you can already feel it coming. Uranus is moving into your sign very soon and it is going to shake things up in the best way. Get ready for something new.",
    "Your mind is moving really fast today — even faster than usual. Ideas are popping up everywhere. Write them all down even the ones that seem silly. One of them is actually really important.",
    "A conversation you have today will matter more than you expect. Uranus entering your sign means the words you say and hear right now are planting seeds. Choose them carefully and listen closely.",
    "You are feeling restless and ready for a change. That is completely normal — Uranus coming into your sign stirs up the desire for something different and new. Trust that feeling. It is pointing you somewhere good.",
    "Something you thought was finished is actually just beginning again in a new form. Uranus energy is all about surprises and plot twists. The ending you thought happened was actually just a door opening.",
    "Your social life is picking up energy right now. New people, new ideas, new conversations. Uranus in Gemini loves connection and electricity. Say yes to something you would normally hesitate on today.",
    "You see something clearly today that other people are still confused about. That quick mind of yours is working at full power. Share what you see — even if it feels obvious to you, someone else really needs to hear it.",
  ],
  Cancer:[
    "Jupiter is in your sign right now and that is a huge deal — it only happens every 12 years. Good things are coming your way. Stay open, stay kind, and watch how much flows toward you this week.",
    "Your home or family is on your mind today and for good reason. Jupiter in Cancer means the people closest to you are your biggest blessing right now. Tell someone you love them — they need to hear it.",
    "Something you have been wishing for quietly is getting closer. Jupiter in your sign is like having a really powerful lucky star above you. Do not give up on that hope — it is more alive than you think.",
    "You are more sensitive than usual today and that is totally okay. Jupiter makes everything feel bigger — the good stuff and the hard stuff. Spend time somewhere that feels safe and cozy to you.",
    "A new opportunity is coming through someone you already know — not a stranger, but someone close. Jupiter in Cancer works through the people you trust. Pay attention to what the people you love are saying.",
    "Today is a great day to ask for something you need. Jupiter in your sign means the universe is in a generous mood toward you right now. Do not be too proud to accept help — receiving is also a gift.",
    "Your gut feeling is incredibly strong today. If something feels right, it probably is. If something feels off, trust that too. Jupiter in Cancer makes your instincts one of the most reliable tools you have.",
  ],
  Leo:[
    "Jupiter is heading toward your sign later this year and you can already feel the energy shifting in your favor. Something that felt blocked is starting to loosen up. Keep showing up fully — your moment is building.",
    "Your creativity is at a peak today. Whatever you make, perform, write, draw, or express right now has a special energy behind it. Do not keep it to yourself — let someone see it. It is better than you think.",
    "Someone in your life needs your specific kind of warmth today. You have a gift for making people feel like they matter — use it on purpose today. It will mean more to them than you know.",
    "Recognition is coming your way but it might come quietly. Not every trophy is loud. Sometimes someone notices your work and says one simple true thing that lands deeper than any applause. Watch for that today.",
    "You have been carrying a lot and giving a lot and today your heart needs some of that energy back. Do something just for you — something fun, something playful, something that makes you feel like a kid again.",
    "A leadership moment is showing up today and you are the right person for it. You do not need a title. You just need to step forward and be willing to go first. That is all courage really is.",
    "Something creative or romantic that felt stuck is waking back up. The energy around you is shifting and what felt frozen is starting to flow again. Lean into it and see where it goes.",
  ],
  Virgo:[
    "Jupiter in Cancer is sending a wave of support your way right now. Something you have been carefully working on is about to get a boost from an unexpected direction. Keep the quality up — it is being noticed.",
    "Your eye for detail is sharper than ever today. You notice the one thing everyone else walked right past — and that thing matters. Trust what you see even if you cannot fully explain why yet.",
    "Neptune in Aries is creating a little bit of fog in your world right now — things feel less clear than you like. That is okay. You do not need all the answers today. Just focus on what is right in front of you.",
    "A project or plan you have been refining is ready. You have adjusted it enough. Jupiter in Cancer says the timing is good right now. Done is better than perfect today — share it.",
    "Your body is trying to tell you something today. Maybe it is tiredness, maybe tension, maybe just a quiet nudge. Listen to it. You take such good care of everyone else — today take care of you.",
    "Something at work or school is going better than you are giving yourself credit for. More is working in your favor than you realize. Stop looking at what is wrong and notice what is right.",
    "A quiet act of kindness you did for someone recently is coming back to you in a good way. You did not do it for the reward — but the universe noticed anyway. Something nice is on its way to you.",
  ],
  Libra:[
    "There is a lot of intense energy in Aries right now — directly across from you — and that means relationships are getting real. Have the honest conversation you have been avoiding. It is time.",
    "Something that felt unfair in a relationship is asking to be addressed. It might feel uncomfortable but speaking up today is the right move. Real fairness includes your voice too.",
    "You have been trying to keep the peace and it is exhausting you. Today it is okay to say what you actually think. Balance does not mean silence — it means everyone gets heard, including you.",
    "A decision you have been going back and forth on is ready to be made. The stars are not waiting for perfect clarity — they are waiting for you to choose. Pick a direction and trust that you can adjust as you go.",
    "Neptune in Aries opposite your sign is making things feel a little dreamy and confusing in relationships right now. If someone seems unclear about what they want — give them space. Clarity is coming, just not today.",
    "Something beautiful is available to you today — art, music, a real conversation, a moment of connection. Even with all the tension in the sky right now, beauty is still here. Go find it.",
    "A partnership is being tested right now by all that intense Aries energy pushing against you. The ones worth keeping will get stronger through this. The ones that fall away were already done.",
  ],
  Scorpio:[
    "The Sun and Venus are both in Taurus right now — directly across from you — and that means relationships are in the spotlight. Someone wants more closeness than you have been giving. Is it safe to let them in a little more?",
    "Pluto is in Aquarius right now and it is quietly shaking up the structures in your life. Something that used to feel solid might feel wobbly. That is not collapse — that is transformation getting ready to begin.",
    "Your instincts about a person or situation are correct right now. You can feel something that other people cannot see yet. Do not doubt that feeling just because you cannot prove it. You will be right.",
    "Something that has been secret — maybe even your own feelings — is ready to come out. Venus in Taurus opposite your sign is asking for honesty in relationships. One true thing said today changes everything.",
    "You have been through something hard recently and you have been carrying it quietly. Today it is okay to let someone see that you are going through it. Strength is not always silence. Sometimes it is letting someone help.",
    "A transformation you have been resisting is actually going to make your life better. Pluto in Aquarius is clearing out what no longer works for you. Trust the process even when it feels uncomfortable.",
    "Deep feelings are coming up today — old ones you thought were done. They are not here to hurt you. They are here because you are finally strong enough to look at them and let them go for real this time.",
  ],
  Sagittarius:[
    "Jupiter is in Cancer right now and it is in a tense angle with your sign. Big opportunities are available but they come with emotional strings attached. Something good is asking you to also go deep. Are you ready for that?",
    "You want freedom right now but something is asking you to stay and do the work. That tension is real. The growth available to you this season might live in the uncomfortable place — not the open road.",
    "An adventure or opportunity you have been dreaming about is more possible than you think — but it needs a plan. Your aim goes far but today take time to actually map the path. Details matter right now.",
    "Someone close to you needs more from you than you have been giving. Jupiter in Cancer is highlighting home and family. Your biggest adventure this season might actually be the people right next to you.",
    "You said something true recently that landed harder than you expected. That is Jupiter expanding everything — including the impact of your words. Be honest today but add a little softness to how you say it.",
    "Something you believed strongly in is being challenged and that feels uncomfortable. Good. The beliefs that survive being tested are the real ones. Let this make you stronger not smaller.",
    "A door is opening in an unexpected direction — not the one you were looking at. Stay open. Right now the universe is rerouting you somewhere even better than where you were headed.",
  ],
  Capricorn:[
    "Saturn — your ruling planet — has moved into Aries and it is in a challenging angle with your sign. What is solid in your life will stay. What was only pretending to be solid is showing cracks. Now you can fix it.",
    "An authority figure or system at work or school is frustrating you right now. Instead of fighting it, ask yourself: what is this showing me that needs to change? That question leads somewhere useful.",
    "You have been working really hard and the results feel slow. That is okay. The timeline is longer than you want but the reward is bigger than you can see right now. Stay steady — you are building something real.",
    "Something you have been in control of is slipping a little and that bothers you more than you let on. Today practice letting one thing go. Not everything needs to be managed. Some things just need to unfold.",
    "Your reputation is stronger than you know. Even when you feel unseen, the people who matter are watching how you handle pressure. And right now you are handling it with more grace than you realize.",
    "A long-term goal is closer than it looks. Every hard day right now is building something in you that cannot be faked or bought. Keep going — the foundation you are laying will hold for years.",
    "Someone younger or less experienced is looking to you for guidance today. You do not have to have all the answers. Just be honest about what you know and what you do not. That honesty is more powerful than any advice.",
  ],
  Aquarius:[
    "Pluto is moving through your sign right now and it is one of the rarest things that can happen in astrology. Your whole sense of who you are is being rebuilt from the inside. This is not destruction — it is becoming.",
    "Something about who you thought you were is changing. Old labels, old roles, old ways of seeing yourself are falling away. That can feel strange but Pluto in Aquarius is making room for the truest version of you.",
    "A group, community, or cause you care about is calling for your specific kind of thinking today. You see patterns that other people miss. Your point of view is not weird — it is exactly what is needed right now.",
    "Something you are building right now has both roots and wings — both structure and freedom. Do not choose between them. You can have both and that combination is actually your greatest strength.",
    "You need more alone time than usual right now and that is completely okay. Deep internal work is happening and it needs quiet. Protect your energy today — not everyone gets access to all of you.",
    "An idea you have been carrying for a long time — one that felt too big or too different — is actually the right size for right now. The world is catching up to how you think. Start sharing it more boldly.",
    "Something old in your life is ending and something new is just beginning. You might feel the sadness of the ending and the excitement of what is coming at the exact same time. Both feelings are real and both are okay.",
  ],
  Pisces:[
    "Neptune — your ruling planet — has just moved out of your sign after 14 years. That is a huge shift. Things that felt dreamy and unclear are slowly getting sharper. You are stepping into a new chapter of your life.",
    "For the first time in a long time the fog is starting to lift. You are seeing yourself and your life more clearly than you have in years. What you see might surprise you — in a really good way.",
    "Jupiter in Cancer is sending you a beautiful wave of support right now. Your creativity, your heart, your compassion — all of it is being lifted up. Make something today. Express something today. It matters.",
    "A boundary you set recently — one that felt hard and maybe even a little guilty — was the right call. Neptune moving out of your sign is helping you see where you were giving too much. Hold that line. It is protecting you.",
    "Your dreams have been more vivid and meaningful lately. Pay attention to them. Neptune shifting signs stirs up deep feelings and things that come to you in dreams right now are carrying real messages for you.",
    "Something you let go of a while ago is showing you why that was the right choice. The distance you have now is giving you a clear view that being too close never could have.",
    "You are more grounded and present than you have been in a really long time. The beautiful blur is clearing and the picture is coming into focus. What you see in your life right now — it is worth staying for.",
  ],
};

function DailyHoroscope() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const todayIndex = new Date().getDay();
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const today = days[todayIndex];
  const accent = selectedSign ? colors[selectedSign] : "#e8a800";
  const horoscope = selectedSign ? dailyHoroscopes[selectedSign][todayIndex] : null;

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
            <button key={s} className={"sb"+(selectedSign===s?" sel":"")} style={{"--a":colors[s]}} onClick={()=>{setSelectedSign(s);setRevealed(false);}}>
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

function CelebrityAvatar({ celeb }) {
  return (
    <div style={{background:"rgba(255,200,50,0.04)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:16,padding:"24px 20px",textAlign:"center",maxWidth:360,margin:"0 auto"}}>
      <div style={{width:80,height:80,borderRadius:"50%",background:"linear-gradient(135deg,rgba(255,200,50,0.15),rgba(168,224,96,0.1))",border:"2px solid rgba(255,200,50,0.4)",margin:"0 auto 12px",display:"flex",alignItems:"center",justifyContent:"center",fontSize:40}}>{celeb.emoji}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:16,color:"#f5c842",marginBottom:4}}>{celeb.name}</div>
      <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#a8e060",marginBottom:14}}>Born {celeb.born}</div>
      <div style={{display:"flex",gap:6,justifyContent:"center",marginBottom:16,flexWrap:"wrap"}}>
        {[["☀️",celeb.sun],["🌙",celeb.moon],["⬆️",celeb.rising]].map(([icon,val])=>val&&val!=="Unknown"?(<span key={icon} style={{background:"rgba(255,200,50,0.1)",border:"1px solid rgba(255,200,50,0.3)",borderRadius:6,padding:"3px 9px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#f5c842"}}>{icon} {val}</span>):null)}
      </div>
      <p style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:15,color:"#ffffff",lineHeight:1.65,margin:0}}>"{celeb.fact}"</p>
    </div>
  );
}

function CelebrityConnection() {
  const [selectedSign, setSelectedSign] = useState(null);
  const [celebIndex, setCelebIndex] = useState(0);
  const pool = selectedSign ? (celebBySign[selectedSign]||[]) : [];
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
          <button key={s} onClick={()=>{setSelectedSign(s===selectedSign?null:s);setCelebIndex(0);}} style={{background:selectedSign===s?("linear-gradient(135deg,"+colors[s]+","+colors[s]+"88)"):"rgba(255,200,50,0.06)",border:"2px solid "+(selectedSign===s?colors[s]:"rgba(255,200,50,0.25)"),color:selectedSign===s?"#0d0a14":"#f0c030",padding:"8px 14px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".07em",cursor:"pointer",transition:"all 0.22s"}}>{emojis[s]} {s}</button>
        ))}
      </div>
      {selectedSign && currentCeleb && (
        <div style={{animation:"up .4s ease"}}>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".18em",color:"#a8e060",marginBottom:16,textAlign:"center"}}>✦ {selectedSign.toUpperCase()} SUN CELEBRITY ✦</div>
          <CelebrityAvatar celeb={currentCeleb}/>
          {pool.length>1&&(
            <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:16,marginTop:20}}>
              <button onClick={()=>setCelebIndex(i=>(i-1+pool.length)%pool.length)} style={{background:"none",border:"1px solid rgba(255,200,50,0.3)",color:"#f5c842",padding:"8px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer"}}>← PREV</button>
              <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,color:"#4a4440",letterSpacing:".12em"}}>{celebIndex+1}/{pool.length}</span>
              <button onClick={()=>setCelebIndex(i=>(i+1)%pool.length)} style={{background:"none",border:"1px solid rgba(255,200,50,0.3)",color:"#f5c842",padding:"8px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".1em",cursor:"pointer"}}>NEXT →</button>
            </div>
          )}
        </div>
      )}
      {!selectedSign&&<div style={{textAlign:"center",padding:"24px 0",fontFamily:"Georgia,serif",color:"#6a6058",fontSize:15}}>Select a sign above to reveal the stars ✨</div>}
    </div>
  );
}

function DocSection({title,children}){return(<div style={{marginBottom:24}}><div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:13,color:"#f5c842",marginBottom:8,paddingBottom:4,borderBottom:"1px solid rgba(255,200,50,0.1)"}}>{title}</div><div style={{color:"#c8c0b0",fontSize:14,lineHeight:1.85}}>{children}</div></div>);}
function DocP({children}){return <p style={{margin:"0 0 10px"}}>{children}</p>;}
function DocBullet({items}){return(<ul style={{margin:"0 0 10px",paddingLeft:20}}>{items.map((item,i)=><li key={i} style={{marginBottom:6}}>{item}</li>)}</ul>);}
function TermsContent(){return(<><DocP>Please read these Terms of Service carefully before using Arewewoke.</DocP><DocSection title="1. About Arewewoke"><DocP>Arewewoke is an astrology-based entertainment application operated by Ayssia Mason.</DocP></DocSection><DocSection title="2. Entertainment Disclaimer"><DocP>All content on Arewewoke is intended solely for entertainment and personal reflection.</DocP></DocSection><DocSection title="3. Eligibility"><DocP>You must be at least 18 years of age to subscribe to paid features of Arewewoke.</DocP></DocSection><DocSection title="4. Free Trial & Billing"><DocP>Arewewoke offers a 7-day free trial. After the trial, your subscription automatically renews at $4.99 per month unless you cancel before the trial ends.</DocP></DocSection><DocSection title="5. Cancellation"><DocP>You may cancel your subscription at any time via the Stripe customer portal — no emailing required.</DocP></DocSection><DocSection title="6. Intellectual Property"><DocP>All content, design, and features of Arewewoke are the property of Ayssia Mason unless otherwise credited.</DocP></DocSection><DocSection title="7. Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function PrivacyContent(){return(<><DocP>Your privacy matters to Arewewoke.</DocP><DocSection title="1. Information We Collect"><DocBullet items={["Email address and name when you subscribe","Payment information, processed securely by Stripe","Usage data to improve app performance","Subscription status to manage access to paid features"]}/></DocSection><DocSection title="2. How We Use Your Information"><DocBullet items={["To process and manage your subscription","To send receipts and billing communications","To improve app features","To respond to support requests"]}/><DocP>We do not sell, rent, share, or trade your personal information to third parties for marketing purposes.</DocP></DocSection><DocSection title="3. Your Rights"><DocP>You have the right to access, correct, or delete the personal data we hold about you. Contact us at arewewoke@gmail.com.</DocP></DocSection><DocSection title="4. Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function CancellationContent(){return(<><DocSection title="Free Trial Period"><DocP>Your 7-day free trial begins the moment your payment method is verified. If you do not cancel before the trial ends, your $4.99/month subscription begins automatically on day 8.</DocP></DocSection><DocSection title="How to Cancel"><DocBullet items={["Via the Stripe customer portal — the fastest method, available 24/7.","By emailing arewewoke@gmail.com with the subject line: Cancel My Subscription."]}/></DocSection><DocSection title="Refund Policy"><DocP>All subscription fees are non-refundable once charged.</DocP></DocSection><DocSection title="Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function DisclaimerContent(){return(<><DocP>All astrological content on Arewewoke is provided strictly for entertainment and personal reflection.</DocP><DocSection title="Not Professional Advice"><DocP>Nothing on Arewewoke constitutes medical, psychological, financial, legal, or any other form of professional advice.</DocP></DocSection><DocSection title="Contact"><DocP>arewewoke@gmail.com</DocP></DocSection></>);}
function CreditsContent(){return(<><DocP>Arewewoke is created and operated by Ayssia Mason.</DocP><DocSection title="Astrological Authors Referenced"><DocBullet items={["Steven Forrest — The Inner Sky, evolutionary astrology","Liz Greene — Saturn: A New Look at an Old Devil, psychological astrology","Robert Hand — Planets in Transit","Howard Sasportas — The Twelve Houses","Donna Cunningham — Moon and Venus placements","Isabel Hickey — Astrology: A Cosmic Science","Dane Rudhyar — An Astrological Mandala"]}/></DocSection><DocSection title="Contact"><DocP>celestia.insights.app@gmail.com</DocP></DocSection></>);}

// ─── TAURUS SEASON HELPERS ──────────────────────────────────────
const isTaurusSeason = () => {
  const now = new Date();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  return (month === 4 && day >= 20) || (month === 5 && day <= 20);
};

// Stable confetti pieces generated once
const CONFETTI_PIECES = [...Array(80)].map((_, i) => {
  const taurusColors = ["#a8c97f","#f5c842","#d4a5c9","#ffffff","#8fbc8f","#e8a800","#c9f0a8"];
  return {
    color: taurusColors[i % taurusColors.length],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: 2.5 + Math.random() * 2,
    size: 6 + Math.random() * 8,
    shape: i % 3 === 0 ? "50%" : i % 3 === 1 ? "0%" : "2px",
    rotation: Math.random() * 360,
  };
});

// ─── MAIN APP ───────────────────────────────────────────────────
export default function AstrologyApp() {
  const [topTab, setTopTab] = useState("horoscope");
  const [mode, setMode] = useState("home");
  const [selectedSign, setSelectedSign] = useState(null);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const [fact, setFact] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [activeDoc, setActiveDoc] = useState(null);
  const accent = selectedSign ? colors[selectedSign] : "#e8a800";

  // ─── TAURUS SEASON STATE ────────────────────────────────────
  const [showTaurusBanner, setShowTaurusBanner] = useState(() => isTaurusSeason());
  const [confettiActive, setConfettiActive] = useState(() => isTaurusSeason());

  React.useEffect(() => {
    if (confettiActive) {
      const timer = setTimeout(() => setConfettiActive(false), 4000);
      return () => clearTimeout(timer);
    }
  }, []);

  const reset = () => { setSelectedSign(null); setSelectedPlanet(null); setFact(null); };

  const handleReveal = () => {
    if(!selectedSign||!selectedPlanet)return;
    setAnimating(true); setFact(null);
    setTimeout(()=>{ setFact(getFact(selectedSign,selectedPlanet)); setAnimating(false); },500);
  };

  const tabs = [
    {label:"🌠 Daily Horoscope",key:"horoscope"},
    {label:"🔮 Game",key:"guess"},
    {label:"🌟 Celebrity",key:"celebrity"},
    {label:"✦ Fun Facts",key:"facts"},
    {label:"📲 Get The App",key:"install"},
  ];

  return (
    <div style={{minHeight:"100vh",background:"#0d0a14",fontFamily:"Georgia,serif",color:"#ffffff",position:"relative",overflow:"hidden"}}>
      <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
        {[...Array(70)].map((_,i)=>(<div key={i} style={{position:"absolute",width:Math.random()*2.5+0.4+"px",height:Math.random()*2.5+0.4+"px",borderRadius:"50%",background:i%7===0?("rgba(168,224,96,"+(Math.random()*0.5+0.2)+")"):"rgba(255,200,50,"+(Math.random()*0.5+0.15)+")",left:Math.random()*100+"%",top:Math.random()*100+"%",animation:"tw "+(Math.random()*3+2)+"s ease-in-out infinite",animationDelay:Math.random()*4+"s"}}/>))}
      </div>

      {/* ── TAURUS SEASON CONFETTI ── */}
      {confettiActive && (
        <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:999,overflow:"hidden"}}>
          {CONFETTI_PIECES.map((p, i) => (
            <div key={i} style={{
              position:"absolute", top:"-20px", left:`${p.left}%`,
              width:`${p.size}px`, height:`${p.size}px`,
              background:p.color, borderRadius:p.shape,
              animation:`confettiFall ${p.duration}s ${p.delay}s ease-in forwards`,
              transform:`rotate(${p.rotation}deg)`
            }}/>
          ))}
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700;900&display=swap'); @keyframes tw{0%,100%{opacity:0.2}50%{opacity:1}} @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}} @keyframes sh{0%{background-position:200% center}100%{background-position:-200% center}} @keyframes gl{0%,100%{box-shadow:0 0 18px 3px rgba(232,168,0,0.3)}50%{box-shadow:0 0 40px 10px rgba(232,168,0,0.6)}} @keyframes pu{0%,100%{opacity:0.4}50%{opacity:1}} @keyframes confettiFall{0%{transform:translateY(0) rotate(0deg);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}} .sb{background:rgba(255,200,50,0.06);border:1px solid rgba(255,200,50,0.2);color:#f0c030;padding:9px 12px;border-radius:8px;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.07em;font-weight:700;transition:all .22s;text-align:center} .sb:hover,.sb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a);transform:translateY(-2px)} .pb{background:rgba(255,200,50,0.05);border:1px solid rgba(255,200,50,0.18);color:#f0c030;padding:9px 18px;border-radius:100px;cursor:pointer;font-family:'Cinzel',serif;font-size:11px;letter-spacing:.09em;font-weight:700;transition:all .22s} .pb:hover,.pb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a)} .rb{background:linear-gradient(135deg,var(--a),#8a6000);color:#0d0a14;border:none;padding:14px 38px;border-radius:100px;font-family:'Cinzel',serif;font-size:13px;letter-spacing:.14em;font-weight:900;cursor:pointer;transition:all .3s;animation:gl 3s ease-in-out infinite} .rb:hover{transform:scale(1.04);filter:brightness(1.12)} .fc{animation:up .65s ease forwards;background:linear-gradient(135deg,rgba(255,200,50,0.08),rgba(0,0,0,0.3));border:1px solid rgba(255,200,50,0.3);border-radius:20px;padding:30px 34px;position:relative;overflow:hidden} .fc::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,var(--a),transparent)} .bk{background:none;border:none;color:#5a5048;cursor:pointer;font-family:'Cinzel',serif;font-size:10px;letter-spacing:.13em;font-weight:700;display:flex;align-items:center;gap:6px;margin-bottom:28px} .bk:hover{color:#a8e060}`}</style>

      <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"20px 18px 80px"}}>
        <div style={{display:"flex",gap:8,justifyContent:"center",marginBottom:24,flexWrap:"wrap"}}>
          {tabs.map(tab=>(
            <button key={tab.key} onClick={()=>{setTopTab(tab.key);setMode("home");reset();}} style={{background:topTab===tab.key?"linear-gradient(135deg,#e8a800,#8a6000)":"rgba(255,200,50,0.08)",border:"2px solid "+(topTab===tab.key?"#e8a800":"rgba(255,200,50,0.3)"),color:topTab===tab.key?"#0d0a14":"#f5c842",padding:"11px 18px",borderRadius:"100px",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,letterSpacing:".09em",cursor:"pointer",transition:"all 0.25s",boxShadow:topTab===tab.key?"0 0 16px 4px rgba(232,168,0,0.3)":"none"}}>{tab.label}</button>
          ))}
        </div>

        {topTab==="horoscope" && <DailyHoroscope />}
        {topTab==="celebrity" && <CelebrityConnection />}
        {topTab==="guess" && <ZodiacQuiz />}

        {topTab==="install" && (
          <div style={{animation:"up .5s ease"}}>
            <div style={{textAlign:"center",marginBottom:28}}>
              <div style={{fontSize:48,marginBottom:12}}>📲</div>
              <h2 style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:24,color:"#f5c842",margin:"0 0 8px"}}>Get The App</h2>
              <p style={{fontFamily:"Georgia,serif",color:"#a8e060",fontSize:15,margin:0,lineHeight:1.7}}>Save Arewewoke to your home screen for instant access — it works just like an app.</p>
            </div>
            <div style={{background:"rgba(255,200,50,0.06)",border:"1px solid rgba(255,200,50,0.2)",borderRadius:16,padding:"24px 20px",marginBottom:16}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:"#f5c842",marginBottom:16,letterSpacing:".1em"}}>🍎 ON IPHONE (SAFARI)</div>
              {[{num:1,icon:"🌐",text:"Open arewewoke.com in Safari — this must be Safari, not Chrome or another browser."},{num:2,icon:"⬆️",text:'Tap the Share button at the bottom of your screen.'},{num:3,icon:"➕",text:'Scroll down and tap "Add to Home Screen".'},{num:4,icon:"✏️",text:'Name it "AreWeWoke" then tap "Add" in the top right corner.'},{num:5,icon:"🔮",text:"Done! Tap the icon on your home screen any time for instant access."}].map(step=>(
                <div key={step.num} style={{display:"flex",gap:14,marginBottom:16,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#e8a800,#8a6000)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,color:"#0d0a14",flexShrink:0}}>{step.num}</div>
                  <div><div style={{fontSize:18,marginBottom:4}}>{step.icon}</div><div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#d8c890",lineHeight:1.65}}>{step.text}</div></div>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(168,224,96,0.05)",border:"1px solid rgba(168,224,96,0.15)",borderRadius:16,padding:"24px 20px",marginBottom:16}}>
              <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:12,color:"#a8e060",marginBottom:16,letterSpacing:".1em"}}>🤖 ON ANDROID (CHROME)</div>
              {[{num:1,icon:"🌐",text:"Open arewewoke.com in Chrome."},{num:2,icon:"⋮",text:'Tap the three dots menu in the top right corner.'},{num:3,icon:"➕",text:'Tap "Add to Home screen" from the menu.'},{num:4,icon:"✏️",text:'Name it "AreWeWoke" and tap "Add".'},{num:5,icon:"🔮",text:"The icon will appear on your home screen for instant access."}].map(step=>(
                <div key={step.num} style={{display:"flex",gap:14,marginBottom:16,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:"linear-gradient(135deg,#a8e060,#4a8020)",display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:11,color:"#0d0a14",flexShrink:0}}>{step.num}</div>
                  <div><div style={{fontSize:18,marginBottom:4}}>{step.icon}</div><div style={{fontFamily:"Georgia,serif",fontSize:14,color:"#d8c890",lineHeight:1.65}}>{step.text}</div></div>
                </div>
              ))}
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
                  {OUTER.includes(selectedPlanet) && generationDates[selectedPlanet]?.[selectedSign] && (
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

      {/* ── TAURUS SEASON BANNER ── */}
      {showTaurusBanner && (
        <div style={{
          position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)",
          zIndex:1000, width:"calc(100% - 32px)", maxWidth:480,
          background:"linear-gradient(135deg,#1a1508,#0d1a08,#1a1508)",
          border:"2px solid #a8c97f",
          borderRadius:20, padding:"20px 24px",
          boxShadow:"0 0 40px rgba(168,201,127,0.25)",
          animation:"up .6s ease",
          textAlign:"center"
        }}>
          <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gradient(90deg,transparent,#a8c97f,transparent)",borderRadius:"20px 20px 0 0"}}/>
          <div style={{fontSize:28,marginBottom:8}}>🌿♉🌿</div>
          <div style={{fontFamily:"'Cinzel',serif",fontWeight:900,fontSize:15,color:"#a8c97f",letterSpacing:".12em",marginBottom:6}}>
            HAPPY TAURUS SEASON!
          </div>
          <p style={{fontFamily:"Georgia,serif",fontSize:14,color:"#d8e8c0",lineHeight:1.65,margin:"0 0 16px"}}>
            To every Taurus visiting today — <strong style={{color:"#f5c842"}}>happy birthday, beautiful soul.</strong> The cosmos celebrates you. 🎂✨
          </p>
          <button
            onClick={() => setShowTaurusBanner(false)}
            style={{
              background:"linear-gradient(135deg,#a8c97f,#4a8020)",
              border:"none", color:"#0d1a08",
              padding:"10px 28px", borderRadius:"100px",
              fontFamily:"'Cinzel',serif", fontWeight:900,
              fontSize:11, letterSpacing:".12em", cursor:"pointer"
            }}>
            ✦ THANK YOU ✦
          </button>
        </div>
      )}

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
