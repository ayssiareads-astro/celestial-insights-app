import { useState, useRef } from "react";
const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittariuconst planets = ["Sun","Moon","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune",const OUTER = ["Uranus","Neptune","Pluto"];
const generationDates = {
 Uranus: { Aries:"2010-2018",Taurus:"2018-2026",Gemini:"1941-1949",Cancer:"1948-1956",Leo:"1 Neptune: { Aries:"2025-2039",Taurus:"1874-1889",Gemini:"1888-1902",Cancer:"1901-1916",Leo:" Pluto: { Aries:"2068-2097",Taurus:"1851-1884",Gemini:"1882-1914",Cancer:"1912-1939",Leo:"19};
const facts = {
 "Scorpio-Venus": [
 "Venus in Scorpio means love is never casual for you - you merge completely or not at all "You have an almost psychic ability to sense when someone is being dishonest with you in  "Your love language is transformation. You don't just want a partner - you want someone w "Venus in Scorpio is considered in its detriment, which means love doesn't come easily or "You tend to test people - not consciously, but you create situations that reveal whether "The shadow side of this placement is possessiveness. The gift side is that you love with "You're deeply attracted to mystery. Someone too available or too easy to read will rarel "Heartbreak for you is a full-body experience. You don't just grieve emotionally - you tr ],
 "Libra-Venus": [
 "Venus in Libra is the planet in its home sign - meaning love, beauty, and harmony come n "You have an extraordinary eye for aesthetics. Your home, your style, your environment -  "You are a natural mediator. You can see both sides of any conflict so clearly that peopl "The challenge with this placement is that you sometimes sacrifice your own needs for the "You fall in love with potential. You see who someone could be, not just who they are, wh "You need a partner who is your intellectual equal. Stimulating conversation is genuinely "Indecision in relationships is real for you - not because you don't know what you want,  "Your charm is completely natural and almost impossible to resist. You rarely have to try ],
 "Taurus-Venus": [
 "Venus in Taurus is exalted - this is one of the most powerful placements for love and be "You love through your senses. Physical touch, good food, beautiful surroundings, and com "You are one of the most loyal partners in the zodiac. Once you commit, you commit fully  "You take your time falling in love, but once you do, it takes an enormous amount for you "Money and material security are tied to your sense of self-worth with this placement. Le "You have a gift for creating beauty everywhere you go - in your home, your relationships "The shadow of this placement is stubbornness. When you decide something, changing your m "You are deeply sensual and tend to express love through acts of physical care - cooking  ],
 "Aries-Venus": [
 "Venus in Aries means you fall fast, hard, and all at once - the chase is genuinely excit "You are bold in love. You will make the first move, say what you feel, and pursue what y "Independence is non-negotiable in your relationships. A partner who is too clingy or dep "You tend to love competitively - you want a partner who can match your energy, challenge "The shadow of this placement is impulsiveness. You can rush into relationships that look "You have a short fuse in love but also a short memory for conflict. You blow up and then "You are attracted to confidence above almost anything else. Insecurity in a partner is g "Venus in Aries people often pioneer new relationship structures. You don't do things the ],
 "Gemini-Venus": [
 "Venus in Gemini means you fall in love with minds first. If someone can't hold a real co "You need variety in love - not necessarily different partners, but variety in how you co "You are one of the most playful and flirtatious Venus placements. You keep relationships "The challenge is depth. You can talk about everything brilliantly, but going deep emotio "You may have had overlapping love interests at different points in your life - not becau "Texting and communication are part of your love language. A partner who goes quiet on yo "You are attracted to people who are curious, witty, and constantly learning. Someone set "Your love life often reads like a great novel - full of interesting characters, unexpect ],
 "Cancer-Venus": [
 "Venus in Cancer means home is where your heart lives. Creating a safe, warm, nurturing e "You have an extraordinary emotional memory. You remember exactly how someone made you fe "You are deeply intuitive about the people you love. You often sense what they need befor "The challenge is that you can be emotionally guarded at first. Your soft interior is pro "You may romanticize the past in relationships - idealizing old loves or holding onto rel "You need to feel emotionally secure before physical or romantic connection can deepen. S "Your love is deeply maternal or paternal - you tend to care for and nurture your partner "The people you love rarely doubt that they are loved. You express it constantly and genu ],
 "Leo-Venus": [
 "Venus in Leo loves grandly and dramatically - you don't do anything halfway, and your pa "You need to feel celebrated in your relationships. A partner who takes you for granted o "You are incredibly generous in love - with your time, your attention, your resources, an "Loyalty is your highest value. Betrayal from someone you love hits you harder than almos "You are attracted to people with confidence and presence - someone who commands a room t "The shadow of this placement is pride. Apologizing doesn't come naturally, and sometimes "You love with flair - grand gestures, thoughtful gifts, dramatic declarations. If your l "Your love life often becomes the stuff of legend. The stories people tell about you and  ],
 "Virgo-Venus": [
 "Venus in Virgo expresses love through service and devotion - you show up, you fix things "You are attracted to intelligence and competence. Someone who is good at what they do, w "The challenge of this placement is that you can critique the people you love as a way of "You have impossibly high standards in love, which can leave you single longer than most. "You are not naturally demonstrative with affection, but the depth of your devotion is ev "Health and shared routines become part of your love language. Working out together, cook
 "The shadow of this placement is self-criticism. You can internalize relationship problem "When you commit, you are one of the most dependable partners in the zodiac. You take rel ],
 "Sagittarius-Venus": [
 "Venus in Sagittarius loves freely and adventurously - you need a partner who is also you "You are attracted to people from different backgrounds, cultures, or belief systems. Som "Freedom in love is non-negotiable. A relationship that feels like a cage - even a comfor "You are one of the most honest Venus placements. Sometimes brutally so. Diplomacy in lov "The shadow is commitment avoidance. You genuinely love the feeling of potential and poss "Your enthusiasm in love is infectious. When you're interested in someone, you make them  "You fall in love with ideas as much as people. Someone who has a fascinating philosophy  "You tend to be luckier in love the further you travel - physically, intellectually, or s ],
 "Capricorn-Venus": [
 "Venus in Capricorn takes love seriously. You don't date casually - you date with intenti "You are attracted to people who are ambitious, successful, and self-sufficient. Someone  "You express love through acts of reliability - showing up on time, keeping your word, bu "The challenge is that you can be emotionally reserved in ways that make partners feel ke "You may have experienced love as conditional early in life, which created a belief that  "Your love life tends to improve dramatically with age. You become more comfortable with  "Status and shared ambition can be aphrodisiacs for you. A partner who is going somewhere "When you fully commit, you are one of the most reliable and devoted partners in the zodi ],
 "Aquarius-Venus": [
 "Venus in Aquarius needs intellectual freedom in love above all else. A partner who tries "You are attracted to people who are unusual, unconventional, or ahead of their time. The "Friendship is the foundation of all your romantic relationships. If you can't be genuine "You can appear emotionally detached in love - not because you don't feel deeply, but bec "You may thrive in non-traditional relationship structures, or at least need significant  "The shadow of this placement is emotional unavailability. You can intellectualize your f "You are genuinely ahead of your time in how you approach love and relationships. What yo "When you find your person, the connection is electric and deeply intellectual - a meetin ],
 "Pisces-Venus": [
 "Venus in Pisces is exalted - this is considered the highest expression of Venus energy,  "You love unconditionally and sometimes unwisely. Your capacity to see the best in people "You are deeply romantic in the old-fashioned, poetic sense - love for you exists in anot "Your empathy in relationships is your greatest gift and your greatest vulnerability. You "You are attracted to people who need saving - not always healthy, but deeply human. Lear "Spiritual or creative connection is essential in your romantic life. A purely pragmatic  "You have a gift for making people feel deeply seen and understood. People often feel mor "The shadow of this placement is losing yourself completely in a relationship. Maintainin ],
 "Aries-Moon": [
 "Your Moon in Aries means your emotional reactions are immediate and instinctive - you fe
 "You restore yourself through action, not reflection. When you're emotionally activated,  "Emotional independence is a deep need for you. Being told how to feel, or having someone "You are emotionally brave in ways others aren't. You will have the hard conversation, co "The shadow of this placement is emotional impulsivity - saying or doing things in the he "Your inner child is a warrior. At your core, you need to feel like you can handle anythi "You are most emotionally healthy when you have something to fight for - a goal, a projec "People with Moon in Aries often had to learn emotional self-sufficiency early. You didn' ],
 "Taurus-Moon": [
 "Moon in Taurus is exalted - the Moon is considered most powerful in this sign, giving yo "You restore through the senses. A good meal, a long bath, physical comfort, beautiful su "Your nervous system craves consistency. Sudden changes, chaotic environments, or emotion "You are one of the most emotionally dependable people in anyone's life. When people need "The shadow of this placement is stubbornness rooted in fear. You can resist change long  "You have a strong connection to the body and to the physical world as a source of emotio "Material security is tied to your emotional security in a way that's important to acknow "Your patience is legendary. You can endure what would break others - not because you're  ],
 "Gemini-Moon": [
 "Moon in Gemini means your emotions arrive as thoughts first. You process feelings by tal "You need mental stimulation to feel emotionally well. Boredom is genuinely destabilizing "You are gifted at articulating how you feel, which makes you an unusually good communica "Your moods shift frequently and quickly. You might feel entirely different about somethi "The shadow of this placement is emotional superficiality - skimming the surface of your  "You have a remarkable ability to find the humor in emotional situations, which is genuin "You often have two simultaneous emotional experiences about the same thing - feeling exc "You restore through conversation, learning, and connection. Isolation is one of the wors ],
 "Cancer-Moon": [
 "Moon in Cancer is the Moon in its home sign - the placement it rules - giving you one of "Your emotional memory is extraordinary. You carry the feeling of every significant momen "You often absorb the emotional atmosphere of the room you walk into before you've consci "Home is not just a place for you - it's an emotional state. When your home environment i "The shadow of this placement is emotional manipulation through guilt, or withdrawing int "You have a gift for nurturing that is almost instinctive. People around you feel fed, he "Your intuition about people's emotional states borders on psychic. You often know what s "The Moon changes signs every 2.5 days, so your emotional rhythms track closely with the  ],
 "Leo-Moon": [
 "Moon in Leo means your emotional world is dramatic, generous, and deeply expressive. You "You restore through creativity, play, and being genuinely celebrated. Feeling unseen or  "You have a gift for making emotional experiences feel significant and memorable. People  "Your inner child needs to be the star sometimes - not out of ego, but because deep down  "The shadow of this placement is emotional pride - difficulty admitting when you're wrong "You are an extraordinarily loyal emotional support for the people you love. You show up, "Dramatic emotional expression comes naturally to you, which can read as intense to more  "When your need for appreciation goes unmet, it can tip into attention-seeking behavior t
 ],
 "Virgo-Moon": [
 "Moon in Virgo means you process emotions analytically - you need to understand why you f "You restore through order and usefulness. When your emotional world is chaotic, cleaning "You have an extraordinary ability to stay functional during emotional difficulties - whi "You are deeply critical of yourself emotionally, often holding yourself to a standard of "The shadow of this placement is anxiety masquerading as practicality - catastrophizing,  "Your instinct is to be useful when someone is hurting. You bring practical solutions, ma "You often suppress your own emotional needs in service of others, and then feel quietly  "Your emotional wellbeing is deeply tied to your physical health. When your body is well  ],
 "Libra-Moon": [
 "Moon in Libra means your emotional wellbeing is directly tied to the quality of your rel "You have a strong need for fairness in your emotional life. Being treated unjustly or wi "You restore through beauty, balance, and companionship. Solitude is fine in small doses, "Decision-making can be emotionally agonizing for you - not because you're indecisive, bu "The shadow of this placement is people-pleasing at the expense of your own emotional tru "You are an extraordinary emotional mediator. You can hold multiple people's feelings sim "You have a refined emotional sensitivity to atmosphere and aesthetic. An ugly or discord "Your emotional maturity comes from learning that conflict is sometimes necessary - and t ],
 "Scorpio-Moon": [
 "Moon in Scorpio is one of the most emotionally intense placements in the zodiac. Your fe "You have an instinctive ability to see beneath the surface of people and situations. Pre "You restore through depth - intense conversations, transformative experiences, or time a "The shadow of this placement is emotional control as self-protection. If you control wha "You have an extraordinary capacity for loyalty. When you are fully committed to someone, "Betrayal hits you at a cellular level. You may forgive eventually, but you never fully f "Your emotional depth means you feel joy, love, and connection more profoundly than most  "Transformation is your emotional cycle. You don't just grow - you periodically shed an o ],
 "Sagittarius-Moon": [
 "Moon in Sagittarius means your emotional wellbeing is directly tied to your sense of fre "You restore through adventure, travel, learning, and philosophical exploration. Anything "You have an extraordinary ability to find meaning and silver linings in difficult experi "The shadow of this placement is emotional avoidance through perpetual motion. If you kee "You are emotionally honest to a fault - sometimes saying exactly what you feel before yo "Your optimism is a genuine emotional gift, but it can also mean you minimize your own pa "You need a partner who doesn't clip your wings. Emotional confinement - even from someon "At your core, you believe life is fundamentally meaningful and things work out. This fai ],
 "Capricorn-Moon": [
 "Moon in Capricorn means you learned early that emotions were something to manage, not in "You restore through achievement and structure. When your life feels ordered and purposef "You have an exceptional ability to function during emotional difficulty - to hold it tog "The shadow of this placement is emotional suppression disguised as strength. The belief  "You often carry a sense of responsibility for everyone around you that was never actuall
 "Your emotional maturity tends to be impressive even in youth - but it can come at the co "Deep down, beneath the competence and the composure, is someone who longs to be taken ca "As you age and accumulate genuine accomplishment and self-trust, your emotional world so ],
 "Aquarius-Moon": [
 "Moon in Aquarius means you process emotions intellectually - feelings arrive as ideas fi "You restore through solitude, intellectual stimulation, and connection to causes larger  "You have an unusual emotional independence that others often mistake for coldness. You s "The shadow of this placement is emotional detachment - intellectualizing your feelings s "You feel things about humanity collectively in a way that is profound and sometimes over "You need significant space in your emotional relationships - not because you don't care, "You are often ahead of your time emotionally. You've processed things, normalized things "When you do connect deeply with someone, it's a meeting of minds and souls that feels ge ],
 "Pisces-Moon": [
 "Moon in Pisces is one of the most psychically sensitive placements in astrology. You pic "You restore through creative expression, spiritual practice, time near water, and genuin "You have the most empathetic emotional nature in the zodiac. The line between your feeli "The shadow of this placement is emotional escapism - retreating into fantasy, sleep, sub "You often know things emotionally before you have any logical reason to know them. Your  "You carry other people's pain as your own without realizing it. Regular emotional cleari "Your emotional world is rich, complex, and layered in ways that are genuinely difficult  "You are at your most emotionally healthy when you have a creative or spiritual outlet fo ],
 "Aries-Sun": [
 "Your Sun in Aries means you are ruled by Mars - the planet of action, desire, and courag "You have a directness that is genuinely rare. You say what others only think, you start  "The shadow of this placement is impatience - with others, with processes, with yourself. "Your identity is strongly tied to independence. You need to feel like you're your own pe "You are a natural leader not because you seek authority, but because you simply start mo "Aries is the youngest energy in the zodiac - the archetype of the newborn - which means  "Your competitive streak is real, but it's mostly directed inward. You want to be better  "You are most alive when you're beginning something - a new project, a new relationship,  ],
 "Taurus-Sun": [
 "Your Sun in Taurus is ruled by Venus, which means beauty, pleasure, and sensory experien "You have a groundedness that others are genuinely drawn to. In a world of reactivity and "The shadow of this placement is resistance to change long after change has become necess "You have an unusual relationship with time. You are not in a rush - which frustrates fas "Your senses are heightened. Food tastes richer, music moves you more deeply, physical co "You have an extraordinary work ethic when you care about something. When you're invested "Taurus rules the throat and voice, which often gives this placement either a beautiful s "Your deepest security doesn't actually come from material stability - though you need th ],
 "Gemini-Sun": [
 "Your Sun in Gemini means your identity is built around your mind - your curiosity, your  "You are genuinely one of the most interesting conversationalists in the zodiac. You can  "The shadow of this placement is inconsistency - not in your values, but in your focus. Y "You process the world through language. Talking, writing, listening, reading - these are "Gemini is the sign of the twins, which means you contain genuine multitudes. The version "You have a gift for translation - taking complex ideas and making them accessible, or br "Your nervous system runs faster than most. You need more sensory input, more variety, an "Your greatest fear is often boredom - a life without learning, without newness, without  ],
 "Cancer-Sun": [
 "Your Sun in Cancer is ruled by the Moon - the only sign in the zodiac ruled by a luminar "Your identity is built around care, protection, and belonging. You are most yourself whe "The shadow of this placement is using emotional care as a way to control. When you take  "You have an almost photographic emotional memory. You remember how every significant mom "Your intuition is one of your most valuable assets. You read people and situations at an "Home is not just where you live - it is an extension of your inner world. When your home "The crab moves sideways rather than straight ahead, which is often how Cancer approaches "Your strength is often underestimated because it's wrapped in softness. But you are one  ],
 "Leo-Sun": [
 "Your Sun in Leo is ruled by the Sun itself - the only sign with this distinction - meani "You were born to shine. Not in a performative way - in a genuinely luminous way. When yo "The shadow of this placement is ego fragility beneath the confidence. The roar of the li "You have a gift for making people feel special. When you give someone your full attentio "Your creative impulse is central to your identity. Whether it manifests as art, performa "You need to be appreciated, and there is nothing shameful about that. The shadow version "Loyalty is one of your most defining qualities. You defend the people you love with a fe "The fixed fire of Leo means you don't just start things - unlike Aries - you sustain the ],
 "Virgo-Sun": [
 "Your Sun in Virgo is ruled by Mercury, giving you a mind that is analytical, detail-orie "Your identity is built around usefulness and excellence. You feel most like yourself whe "The shadow of this placement is the inner critic - a relentless internal voice that hold "You have an extraordinary eye for systems and patterns. You see the flaw in the blueprin "Virgo rules the sixth house of health, daily routines, and service - which means these a "You have a gift for analysis that, at its best, leads to profound discernment and, at it "You are one of the most genuinely helpful signs in the zodiac - not because you're peopl "Your attention to detail is legendary. You notice the thing in the corner of the room th ],
 "Libra-Sun": [
 "Your Sun in Libra is ruled by Venus, giving you an identity built around beauty, balance "You see both sides of everything - which makes you an extraordinary diplomat and mediato "The shadow of this placement is identity dissolution through relationships. If you're no "You have an aesthetic intelligence that operates almost involuntarily. You feel the imba "Your social grace is one of your most impressive qualities. You make almost everyone fee "Libra is the only sign of the zodiac represented by an inanimate object - the scales - w "The indecision Libra is famous for often isn't about not knowing what you want. It's abo
 "Your drive for fairness and equality runs very deep. You are not a fence-sitter - you ar ],
 "Scorpio-Sun": [
 "Your Sun in Scorpio is co-ruled by Mars and Pluto - the planets of power, transformation "You are one of the most psychologically complex signs in the zodiac. There are layers to "The shadow of this placement is the desire for control as protection. If you understand  "You have a remarkable ability to sit with darkness - your own and others' - without flin "Scorpio rules the eighth house of death, rebirth, and shared resources - which means tra "Your lie detector is legendary. You can read through inauthenticity, manipulation, and p "The intensity you bring to everything you do is your greatest asset and your greatest ch "Scorpios often appear to have multiple lifetimes within one. The person you are at 40 ma ],
 "Sagittarius-Sun": [
 "Your Sun in Sagittarius is ruled by Jupiter - the largest planet in the solar system and "Your identity is built around freedom, truth-seeking, and the belief that life is fundam "The shadow of this placement is inconsistency and over-promising. Your enthusiasm is gen "You have a gift for inspiring others. When you believe in something - really believe - y "Sagittarius rules the ninth house of higher education, travel, philosophy, and belief sy "Your honesty is one of your most defining traits. You may be diplomatic about many thing "You have a natural optimism that isn't naivety - it's a deeply held belief that things c "The centaur - half human, half horse - is your symbol. You straddle two worlds: the phil ],
 "Capricorn-Sun": [
 "Your Sun in Capricorn is ruled by Saturn - the planet of discipline, structure, and mast "You have a relationship with time that sets you apart from most signs. You are willing t "The shadow of this placement is defining your worth by your accomplishments. When achiev "You have an instinctive understanding of how systems work and how to navigate them - whi "Capricorn rules the tenth house of career, public reputation, and legacy. These are not  "You often took on adult responsibilities very young, which gave you extraordinary compet "Your dry humor is one of your most underrated qualities. When you decide to be funny, yo "Saturn rules Capricorn, and Saturn rewards those who do the work. This means your life g ],
 "Aquarius-Sun": [
 "Your Sun in Aquarius is co-ruled by Saturn and Uranus - structure and disruption - which "You have a strong sense of what humanity could be if it lived up to its potential. This  "The shadow of this placement is emotional detachment - being so oriented toward the coll "You are a natural innovator. You see existing systems, question their assumptions, and i "Aquarius rules the eleventh house of community, networks, and collective vision. You thr "Your individuality is sacred to you. Even when you're part of a group, you maintain a di "You have a gift for seeing people outside the context of their social role - which means "The water bearer pours water - knowledge, vision, truth - for all of humanity. Your role ],
 "Pisces-Sun": [
 "Your Sun in Pisces is co-ruled by Jupiter and Neptune - expansion and transcendence - me "You are one of the most spiritually attuned signs in the zodiac. You have a felt sense o "The shadow of this placement is identity dissolution - losing yourself in other people,  "Your empathy is your most extraordinary quality. You feel what others feel so accurately
 "Pisces rules the twelfth house - the house of the unconscious, hidden things, and transc "You are at your best when you have a creative or spiritual practice that gives the vast  "The two fish swimming in opposite directions represent the Piscean tension between trans "You are the final sign of the zodiac - the one that contains all the others - which give ],
 "Aries-Rising": [
 "Aries Rising means Mars rules your chart, which gives you a direct, energetic, and immed "Your first impression is bold, confident, and action-oriented. People sense that you are "You tend to lead with your energy before your words. Your body language communicates int "The challenge of this Ascendant is that your directness can read as aggression to more s "Mars-ruled Ascendants often have a distinctive sharpness to their features - angular jaw "You tend to attract challenges and competition as if by magnetism - which is actually by "Your life themes often revolve around identity, independence, and courage. You are here  "Aries Rising people often look younger than their age. That fresh, pioneering energy kee ],
 "Taurus-Rising": [
 "Taurus Rising means Venus rules your chart, giving you a physical presence that is groun "Your first impression is calm, solid, and trustworthy. People feel safe around you befor "You tend to be physically beautiful in a timeless way - there is often something classic "The challenge of this Ascendant is that you can appear unmovable or stubborn, even when  "Taurus Rising people often have a natural affinity with material beauty - your home, you "Your life themes revolve around value, self-worth, and the relationship between the mate "You take life at a slower, more deliberate pace than many - which can frustrate faster-m "Venus ruling your chart means beauty, pleasure, and relationship are not peripheral to y ],
 "Gemini-Rising": [
 "Gemini Rising means Mercury rules your chart, giving you a quick, curious, and communica "Your first impression is witty, intellectually engaged, and genuinely interested in whoe "You tend to move through the world with a lightness and adaptability that allows you to  "The challenge of this Ascendant is that people may underestimate your depth because your "Your physical appearance often has a youthful, mobile quality - expressive eyes, animate "Your life themes revolve around communication, learning, connection, and the integration "Mercury ruling your chart means information, language, and connection are core to how yo "You are often known for your versatility - you can do many things well, adapt to many en ],
 "Cancer-Rising": [
 "Cancer Rising means the Moon rules your chart, giving you a soft, receptive, and deeply  "Your first impression is warm, nurturing, and somehow familiar - people often feel they' "You tend to read the emotional temperature of any room or relationship with extraordinar "The challenge of this Ascendant is that you can absorb others' emotions and carry them a "Cancer Rising often gives a rounded, soft quality to features - expressive eyes, full ch "Your life themes revolve around home, belonging, family, and emotional safety. You are h "The Moon's cycle directly affects your outer expression. At new and full moons, you may  "You are often the emotional anchor for everyone around you, which is a beautiful role -  ],
 "Leo-Rising": [
 "Leo Rising means the Sun rules your chart - the only Ascendant with this distinction - g "Your first impression is larger than life. There is something about you that people noti "You tend to have a physical quality that draws attention - strong hair, dramatic feature "The challenge of this Ascendant is that you are always being watched, which can create p "Leo Rising people often find that their life becomes more public than they expected - ca "Your life themes revolve around identity, self-expression, creativity, and the journey f "The Sun ruling your chart means vitality, identity, and creative expression are core to  "You have a natural gift for leadership that emerges not from ambition but from the simpl ],
 "Virgo-Rising": [
 "Virgo Rising means Mercury rules your chart, giving you an observant, precise, and quiet "Your first impression is modest, competent, and somehow immediately trustworthy. People  "You tend to have a clean, refined quality to your appearance - something carefully consi "The challenge of this Ascendant is that you can come across as critical or reserved befo "Virgo Rising people often have an unusual connection to health and the body - either as  "Your life themes revolve around service, excellence, discernment, and learning to extend "Mercury ruling your chart means analysis, communication, and precision are core to how y "You notice the details that others walk past. This is your superpower - and the source o ],
 "Libra-Rising": [
 "Libra Rising means Venus rules your chart, giving you a graceful, charming, and aestheti "Your first impression is elegant, balanced, and socially effortless. People feel comfort "You tend to have a naturally attractive quality to your appearance - symmetry, grace, or "The challenge of this Ascendant is that your drive to maintain harmony can make it diffi "Libra Rising often attracts significant relationships as a central theme of life - partn "Your life themes revolve around balance, justice, relationship, and learning to make dec "Venus ruling your chart means beauty, love, and harmony are not just aesthetic preferenc "You have a gift for creating environments where people feel welcome, heard, and valued - ],
 "Scorpio-Rising": [
 "Scorpio Rising means Pluto and Mars co-rule your chart, giving you an intense, magnetic, "Your first impression is magnetic, mysterious, and somehow both inviting and guarded. Pe "You tend to have a striking physical quality - intense eyes in particular - something th "The challenge of this Ascendant is that you can intimidate people without meaning to. Yo "Scorpio Rising people often experience significant transformation through their lives -  "Your life themes revolve around power, depth, truth, and the alchemical process of turni "You have an extraordinary ability to see through inauthenticity almost instantly, which  "People don't forget you. Whatever impression you make - positive or challenging - it ten ],
 "Sagittarius-Rising": [
 "Sagittarius Rising means Jupiter rules your chart, giving you an expansive, enthusiastic "Your first impression is open, adventurous, and somehow bigger than life. People sense t "You tend to have a tall, open quality to your physical presence - something athletic, ou "The challenge of this Ascendant is that your enthusiasm can make promises your follow-th "Sagittarius Rising people often find themselves drawn into international experiences, hi "Your life themes revolve around truth, freedom, expansion, and finding the philosophy th
 "Jupiter ruling your chart means abundance, growth, and meaning are core to how you engag "You are naturally funny, often without trying. Your take on life is sufficiently origina ],
 "Capricorn-Rising": [
 "Capricorn Rising means Saturn rules your chart, giving you a composed, authoritative, an "Your first impression is competent, reliable, and somehow mature - people assume you are "You tend to have strong, angular features - something classically structured about your  "The challenge of this Ascendant is that your composure can read as coldness or aloofness "Capricorn Rising people often achieve more recognition later in life than early - Saturn "Your life themes revolve around authority, mastery, legacy, and the distinction between  "Saturn ruling your chart means discipline, structure, and long-term vision are core to h "You have an unusual capacity for patience and sustained effort that allows you to accomp ],
 "Aquarius-Rising": [
 "Aquarius Rising means Uranus and Saturn co-rule your chart, giving you a distinctive, un "Your first impression is original, slightly unpredictable, and genuinely interesting. Pe "You tend to have a distinctive quality to your appearance or style - something that mark "The challenge of this Ascendant is that your need for independence can make you appear d "Aquarius Rising people often find themselves in the role of the outsider who becomes the "Your life themes revolve around individuality, community, innovation, and the tension be "Uranus ruling your chart means disruption, originality, and radical thinking are core to "You tend to be ahead of your time in your thinking and your way of living. What you norm ],
 "Pisces-Rising": [
 "Pisces Rising means Neptune and Jupiter co-rule your chart, giving you a soft, dreamy, a "Your first impression is compassionate, sensitive, and somehow difficult to pin down. Pe "You tend to have soft, large eyes or something fluid and expressive in your features - a "The challenge of this Ascendant is that your permeable boundaries mean you absorb the en "Pisces Rising people are often natural artists, healers, or spiritual seekers - the oute "Your life themes revolve around transcendence, compassion, creative expression, and lear "Neptune ruling your chart means imagination, spiritual sensitivity, and the blurring of  "People often feel healed, softened, or more themselves just from spending time with you  ],
 "Gemini-Mercury": [
 "Mercury in Gemini is the planet in its home sign - this is Mercury at its most powerful  "You process information laterally - making unexpected connections between things that se "The shadow of this placement is mental restlessness. Your mind moves so fast that slowin "You have a gift for language that goes beyond vocabulary. You understand rhythm, tone, a "Your learning style is broad rather than deep - you absorb information quickly across ma "You communicate best when you can think out loud. Writing, conversation, and teaching of "Boredom is cognitively damaging for you in a way that most signs don't experience. Your  "You are an extraordinary mimic - of accents, of communication styles, of the emotional r ],
 "Virgo-Mercury": [
 "Mercury in Virgo is exalted - this is considered the highest expression of Mercury's ene
 "You have an instinctive ability to find the flaw in any argument, system, or plan - whic "The shadow of this placement is overthinking - your mind's ability to analyze can outrun "You have a natural gift for writing - particularly clear, precise, well-organized prose. "Your learning style is meticulous. You want to understand things thoroughly before you f "You have an extraordinary eye for language - you notice the wrong word, the imprecise ph "Health, nutrition, and the body are often areas where your analytical mind excels - you  "Your mind is most at peace when it has a problem to solve. Purposeless mental activity - ],
 "Aries-Mars": [
 "Mars in Aries is the planet in its home sign - Mars rules Aries - meaning your drive, de "You have one of the most direct and courageous drives in the zodiac. When you want somet "Your anger is the most honest in the zodiac - it flares, it's real, and it passes. You r "The shadow of this placement is impulsiveness - acting before thinking, starting before  "You have an extraordinary capacity to start things. The challenge is finishing them, bec "Competition doesn't frighten you - it energizes you. You perform better when there's som "Physical activity is not optional for your mental health with this placement. Mars energ "You have a natural instinct for leadership in high-pressure situations. When things get  ],
 "Scorpio-Mars": [
 "Mars in Scorpio gives you one of the most strategically powerful drives in the zodiac. Y "Your motivation runs beneath the surface. People may not realize how driven you are unti "The shadow of this placement is vindictiveness. You have a long memory for slights, and  "You have an extraordinary capacity for sustained effort toward a goal. You can wait. You "Your sexuality is one of the most intense in the zodiac - full of depth, psychology, and "You are drawn to power dynamics - understanding them, navigating them, and often masteri "When you commit to something or someone, you commit completely. Half-hearted effort is g "Your instinct in conflict is not to explode but to observe, gather information, and resp ],
 "Sagittarius-Jupiter": [
 "Jupiter in Sagittarius is the planet in its home sign - this is Jupiter operating at its "You have a natural magnetism that attracts teachers, mentors, opportunities, and experie "Your optimism is not naivety - it is a deeply held philosophical position that life is f "The shadow of this placement is excess - too much confidence, too many commitments, too  "You are at your most alive when you're learning, traveling, teaching, or exploring the e "Your generosity is one of your most defining qualities. You give abundantly - of your ti "You have a gift for seeing the bigger picture in situations where others are lost in the "Faith - in people, in ideas, in the universe - is your most reliable resource. Even when ],
 "Capricorn-Saturn": [
 "Saturn in Capricorn is the planet in its home sign - Saturn rules Capricorn - meaning yo "You have an unusual capacity to delay gratification in service of something more signifi
 "The shadow of this placement is an internalized authority that is never fully satisfied  "You were likely given more responsibility than was appropriate for your age - which buil "Your relationship with authority is complex - you respect it, you can embody it, and you "Saturn returns at approximately 29-30 and 58-60 years old, which are often turning point "Your standards are high - for yourself above all - which means failure hits you harder t "The gift of Saturn in Capricorn is that the things you build are real. Not flash, not lu ],
 "Scorpio-Pluto": [
 "Pluto in Scorpio (born approx. 1983-1995) - your generation was forged in psychological  "Your generation broke open the cultural conversation around trauma, mental health, sexua "You have a collective obsession with truth beneath the surface - fake, performative, or  "The wound your generation carries is around trust and betrayal. The gift is an extraordi "You don't fear darkness. You were born into it and you know your way around - which is w "Your generation is doing the psychological excavation work that previous generations ref "You transform completely and repeatedly throughout your life - not despite the intensity "Pluto in Scorpio people often feel they have lived multiple lifetimes within one. That's ],
 "Sagittarius-Pluto": [
 "Pluto in Sagittarius (born approx. 1995-2008) - your generation is here to transform bel "You grew up watching ideological systems collapse in real time - political, religious, s "Your generation's relationship to truth is complex. You know information can be weaponiz "Freedom - of thought, of movement, of identity - is non-negotiable for you at a soul lev "The shadow of this placement is fanaticism - when the need to believe becomes so strong  "Your gift is the courage to question everything - including yourself - and to keep seeki "Your generation will rewrite the spiritual map of humanity. Not by returning to old reli "You don't just want the truth - you want the truth behind the truth. Surface answers are ],
 "Capricorn-Pluto": [
 "Pluto in Capricorn (born approx. 2008-2024) - you arrived as the old world was visibly c "Your generation has an instinctive radar for structural rot. You can see where systems h "You take authority seriously - but only authority that has genuinely earned it. Titles,  "Your generation's task is not just to critique the failing systems - it's to build the r "You carry a gravity and seriousness that older generations sometimes find unsettling in  "The shadow of this placement is cynicism - becoming so accustomed to institutional failu "Your generation's gift is pragmatic transformation - not idealistic revolution, but disc "You are old souls who arrived at exactly the right moment. The world needed people who c ],
 "Aquarius-Pluto": [
 "Pluto in Aquarius (born approx. 2023-2043) - your generation arrives as artificial intel "You carry a revolutionary charge that existing social structures were not designed to co "The tension at the heart of your generation is individual versus collective - how to be  "You will define what humanity means in an age of artificial intelligence. That is not a  "Your gift is the ability to imagine and build social systems that genuinely serve everyo "The shadow of this placement is the loss of individual identity in the collective - the  "You are architects of a new era. The blueprints haven't been drawn yet, but they are enc
 "History will look back at your generation as the one that decided what kind of future hu ],
};
const emojis = {
 Sun:"__", Moon:"_", Mercury:"_", Venus:"__", Mars:"__",
 Jupiter:"_", Saturn:"_", Uranus:"_", Neptune:"_", Pluto:"_", Rising:"__",
 Aries:"_", Taurus:"_", Gemini:"_", Cancer:"_", Leo:"_", Virgo:"_",
 Libra:"__", Scorpio:"_", Sagittarius:"_", Capricorn:"__", Aquarius:"_", Pisces:"_",
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
 Mercury: "your mind, communication style, and way of processing information are shaped by Venus: "your approach to love, beauty, and what you value most is expressed through",
 Mars: "your drive, ambition, and the way you pursue what you want is channeled through",
 Jupiter: "your relationship to growth, abundance, and where life expands most naturally i Saturn: "your relationship to discipline, structure, and your deepest lessons in life are Rising: "the mask you wear and the energy you lead with in the world is that of",
 Uranus: "your generation's collective impulse toward radical change and innovation is exp Neptune: "your generation's relationship to spirituality, idealism, and transcendence is  Pluto: "your generation's deepest transformation and collective evolution is carried thro };
 const ctx = planetContext[planet] || "this placement means";
 const generics = [
 `${pfx}${ctx} ${sign} - a combination that gives you a genuinely rare and specific way of `${pfx}${ctx} ${sign} - which means the qualities of ${sign} are deeply woven into how yo `${pfx}${ctx} ${sign} - study the themes of ${sign} deeply, and you'll understand somethi `${pfx}${ctx} ${sign} - an influence that shapes you in ways you may recognize immediatel `${pfx}${ctx} ${sign} - making this one of the most revealing placements in understanding ];
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
 const shimmer = (y) => { const g=ctx.createLinearGradient(0,0,W,0); g.addColorStop(0,"trans shimmer(70); shimmer(H-70);
 ctx.textAlign = "center";
 ctx.fillStyle = accent;
 ctx.font = "bold 26px Georgia";
 ctx.fillText("_ CELESTIAL INSIGHTS _", W/2, 120);
 ctx.font = "72px serif";
 ctx.fillText(`${emojis[planet]||""} ${emojis[sign]||""}`, W/2, 230);
 ctx.fillStyle = "#e8dcc8";
 ctx.font = "italic 38px Georgia";
 ctx.fillText(`${planet} in ${sign}`, W/2, 300);
 const gen = generationDates[planet]?.[sign];
 if (gen) { ctx.fillStyle = accent; ctx.font = "22px Georgia"; ctx.fillText(`Born approx. ${ const divY = gen ? 380 : 350;
 const dg = ctx.createLinearGradient(100,0,W-100,0); dg.addColorStop(0,"transparent"); dg.ad ctx.fillStyle = dg; ctx.fillRect(80, divY, W-160, 1);
 ctx.fillStyle = "#ddd0be"; ctx.font = "italic 30px Georgia";
 const words = `"${fact}"`.split(" ");
 let line="", y=divY+60, lh=46;
 for (const w of words) {
 const t = line ? line+" "+w : w;
 if (ctx.measureText(t).width > W-140 && line) { ctx.fillText(line, W/2, y); line=w; y+=lh }
 if (line) ctx.fillText(line, W/2, y);
 ctx.fillStyle = "rgba(201,169,110,0.5)"; ctx.font = "20px Georgia";
 ctx.fillText("celestialinsights.app", W/2, H-32);
}
// __ ACCURATE EPHEMERIS CALCULATION ENGINE __
// Based on Jean Meeus "Astronomical Algorithms" - accurate to within 1 degree
function jdn(year, month, day) {
 if (month <= 2) { year--; month += 12; }
 const A = Math.floor(year / 100);
 const B = 2 - A + Math.floor(A / 4);
 return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + B - 1}
function signFromLon(lon) {
 const s = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius" return s[Math.floor(((lon % 360) + 360) % 360 / 30)];
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
 + 6.2888 * Math.sin(Mm)
 + 1.2740 * Math.sin(2*D - Mm)
 + 0.6583 * Math.sin(2*D)
 + 0.2136 * Math.sin(2*Mm)
 - 0.1851 * Math.sin(M)
 - 0.1143 * Math.sin(2*F)
 + 0.0588 * Math.sin(2*D - 2*Mm)
 + 0.0572 * Math.sin(2*D - M - Mm)
 + 0.0533 * Math.sin(2*D + Mm);
 return lon % 360;
}
function calcRising(jd, hour, lat, lon) {
 const T = (jd - 2451545.0) / 36525;
 const GMST = 280.46061837 + 360.98564736629 * (jd - 2451545) + 0.000387933*T*T;
 const LST = ((GMST + lon) % 360 + 360) % 360;
 const sunLon = calcSunLon(jd);
 const eps = (23.439291111 - 0.013004167 * T) * Math.PI / 180;
 const RAMC = LST;
 const latR = lat * Math.PI / 180;
 const epsR = eps;
 const ascLon = Math.atan2(Math.cos(RAMC * Math.PI/180), -(Math.sin(RAMC * Math.PI/180) * Ma return ((ascLon + 360) % 360);
}
// Accurate planetary positions using mean elements
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
// City coordinates lookup for common cities (fallback)
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
 if (m <= 2) { y--; m += 12; }
 const A = Math.floor(y/100), B = 2 - A + Math.floor(A/4);
 return Math.floor(365.25*(y+4716)) + Math.floor(30.6001*(m+1)) + d + B - 1524.5 + h/24;
 }
 function norm(x) { return ((x % 360) + 360) % 360; }
 function sign(lon) {
 const s = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittariu return s[Math.floor(norm(lon)/30)];
 }
 const J = jd(year, month, day, hour + min/60);
 const T = (J - 2451545.0) / 36525;
 const L0 = norm(280.46646 + 36000.76983*T);
 const M0 = (norm(357.52911 + 35999.05029*T)) * Math.PI/180;
 const sunLon = norm(L0 + (1.914602-0.004817*T)*Math.sin(M0) + 0.019993*Math.sin(2*M0));
 const Lm = norm(218.3165 + 481267.8813*T);
 const Mm = norm(134.9634 + 477198.8676*T) * Math.PI/180;
 const Dm = norm(297.8502 + 445267.1115*T) * Math.PI/180;
 const moonLon = norm(Lm + 6.2888*Math.sin(Mm) + 1.274*Math.sin(2*Dm-Mm) + 0.6583*Math.sin(2 const merc = norm(252.250906 + 149474.0722491*T);
 const venus = norm(181.979801 + 58519.2130302*T);
 const mars = norm(355.433275 + 19141.6964746*T);
 const jup = norm(34.351519 + 3036.3027748*T);
 const sat = norm(50.077444 + 1223.5110686*T);
 const uran = norm(314.055005 + 429.8640561*T);
 const nept = norm(304.348665 + 219.8833092*T);
 const plut = norm(238.929038 + 145.207805*T);
 let rising = null;
 if (birthTime) {

 const cities = {"washington":{"lat":38.9072,"lon":-77.0369},"new york":{"lat":40.7128,"lo const key = birthCity.toLowerCase().trim();
 const coords = cities[key] || { lat: 38.9072, lon: -77.0369 };
 const GMST = norm(280.46061837 + 360.98564736629*(J-2451545));
 const LST = norm(GMST + coords.lon);
 const eps = (23.439291 - 0.013004*T) * Math.PI/180;
 const latR = coords.lat * Math.PI/180;
 const RAMC = LST * Math.PI/180;
 const ascRad = Math.atan2(Math.cos(RAMC), -(Math.sin(RAMC)*Math.cos(eps) + Math.tan(latR) rising = sign(ascRad * 180/Math.PI);
 }
 return { Sun:sign(sunLon), Moon:sign(moonLon), Rising:rising,
 Mercury:sign(merc), Venus:sign(venus), Mars:sign(mars),
 Jupiter:sign(jup), Saturn:sign(sat), Uranus:sign(uran),
 Neptune:sign(nept), Pluto:sign(plut) };
}
function parseChartResponse(data, hasBirthTime) {
 const result = {};
 const validSigns = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sag for (const [planet, sign] of Object.entries(data)) {
 if (sign && validSigns.includes(sign)) result[planet] = sign;
 }
 if (!hasBirthTime) delete result["Rising"];
 return result;
}
const US_STATES = ["Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticconst celebBySign = {};
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
 {/* Silhouette avatar */}
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
 {/* Silhouette overlay */}
 <div style={{
 position:"absolute",inset:0,
 background:"linear-gradient(to bottom,transparent 40%,rgba(13,10,20,0.4))",
 borderRadius:"50%",
 }}/>
 </div>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,color:"#ffffff",mar <div style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:12,color:"#a8 {/* Big 3 */}
 <div style={{display:"flex",gap:4,justifyContent:"center",marginBottom:10,flexWrap:"wra {[["__",celeb.sun],["_",celeb.moon],["__",celeb.rising]].map(([icon,val])=>(
 val && val !== "Unknown" ? (
 <span key={icon} style={{background:"rgba(255,200,50,0.08)",border:"1px solid rgb {icon} {val}
 </span>
 ) : null
 ))}
 </div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:13,color:"#ffff "{celeb.fact}"
 </p>
 </div>
 );
}
function CelebrityConnection() {
 const [selectedSign, setSelectedSign] = useState(null);
 const allSigns = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagit return (
 <div style={{animation:"up .5s ease"}}>
 <div style={{textAlign:"center",marginBottom:24}}>
 <div style={{fontSize:36,marginBottom:10}}>_</div>
 <h2 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:26,color:"#f <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontStyle:"normal",col </div>
 {/* Sign selector */}
 <div style={{display:"flex",flexWrap:"wrap",gap:7,justifyContent:"center",marginBottom: {allSigns.map(s=>(
 <button
 key={s}
 onClick={()=>setSelectedSign(selectedSign===s?null:s)}
 style={{
 background: selectedSign===s ? `linear-gradient(135deg,${colors[s]},${colors[s] border: `2px solid ${selectedSign===s ? "#ff2222" : "rgba(255,200,50,0.2)"}` ,
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
 {/* Results */}
 {selectedSign && (
 <div style={{animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:"
 _ {selectedSign.toUpperCase()} SUN CELEBRITIES _
 </div>
 {celebBySign[selectedSign] && celebBySign[selectedSign].length > 0 ? (
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
 {celebBySign[selectedSign].map(c=>(
 <CelebrityAvatar key={c.name} celeb={c} />
 ))}
 </div>
 ) : (
 <div style={{textAlign:"center",padding:"32px 20px",background:"rgba(255,200,50,0 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,color:"#f5c842", </div>
 )}
 </div>
 )}
 {!selectedSign && (
 <div style={{textAlign:"center",padding:"24px 0",fontFamily:"'Special Elite',cursive" Select a sign above to reveal the stars _
 </div>
 )}
 </div>
 );
}
// __ GUESS YOUR SIGN GAME __
const guessClues = {
 Aries: ["I act before I think - and somehow it usually works out.", "I've been told I Taurus: ["People always say my home feels incredibly cozy.", "I know exactly what I li Gemini: ["I can talk to literally anyone about anything.", "I've been called two-faced Cancer: ["I remember exactly how every important moment felt.", "My home is my sanctua Leo: ["I light up in front of an audience, even if it's just two people.", "I am in Virgo: ["I notice the detail everyone else walked right past.", "My inner critic is l Libra: ["I can see both sides of any argument so clearly it's hard to pick one.", "I  Scorpio: ["I can tell when someone is lying almost immediately.", "I don't do anything  Sagittarius: ["I genuinely believe things will work out - and they usually do.", "I need fr Capricorn: ["I have always felt older than my actual age.", "I set standards for myself t Aquarius: ["I've always felt slightly outside the group, even when I'm in it.", "I care  Pisces: ["I absorb other people's moods without meaning to.", "I have a rich inner wor};
function GuessYourSign() {
 const [step, setStep] = useState(0); // 0=intro, 1=playing, 2=result
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
 setFeedback(correct ? "_ Correct! " + currentSign + " energy is undeniable." : "Not quite setStep(2);
 };
 const accent = "#e8a800";
 if (step === 0) return (
 <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
 <div style={{fontSize:48,marginBottom:16}}>_</div>
 <h2 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:28,color:"#fff <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontStyle:"normal",color <button className="rb" style={{"--a":accent}} onClick={startGame}>_ START GUESSING</but {score.total > 0 && <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:11,c </div>
 );
 if (step === 1) return (
 <div style={{animation:"up .5s ease"}}>
 <div style={{background:"rgba(255,200,50,0.06)",border:"1px solid rgba(255,200,50,0.25) <div style={{position:"absolute",top:0,left:0,right:0,height:2,background:"linear-gra <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterSpacing:".2e <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:22,color:"#ff {clueIndex < guessClues[currentSign].length - 1 && (
 <button onClick={nextClue} style={{background:"none",border:"1px solid rgba(168,224 NEXT CLUE _
 </button>
 )}
 </div>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15e <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
 {allSigns.map(s=>(
 <button key={s} className="sb" style={{"--a":colors[s]}} onClick={()=>makeGuess(s)} <div style={{fontSize:14,marginBottom:2}}>{emojis[s]||"_"}</div>
 <div style={{fontSize:9,fontWeight:700}}>{s}</div>
 </button>
 ))}
 </div>
 </div>
 );
 if (step === 2) return (
 <div style={{animation:"up .5s ease",textAlign:"center"}}>
 <div style={{background: guess===currentSign ? "rgba(168,224,96,0.08)" : "rgba(255,80,8 <div style={{fontSize:40,marginBottom:12}}>{emojis[currentSign]||"_"}</div>
 <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:20,color: gue <p style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpacing:".15e </div>
 <button className="rb" style={{"--a":accent}} onClick={startGame}>_ PLAY AGAIN</button>
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
 setTimeout(() => { setFact(getFact(selectedSign, selectedPlanet)); setAnimating(false); } };
 const handleShare = (sign, planet, factText, key) => {
 const canvas = canvasRef.current;
 canvas.width = 1080; canvas.height = 1350;
 drawShareCard(canvas, sign, planet, factText);
 canvas.toBlob(blob => {
 const url = URL.createObjectURL(blob);
 const a = document.createElement("a"); a.href=url; a.download=`${planet}-in-${sign}.png URL.revokeObjectURL(url);
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
 if (!Object.keys(computed).length) throw new Error("No planets found in response: " + J setChartData(computed);
 const reading = {};
 Object.entries(computed).forEach(([planet, sign]) => { if (sign) reading[planet] = getF setChartReading(reading);
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
 const resetChart = () => { setBirthDate(""); setBirthState(""); setBirthCity(""); setBirthT const reset = () => { setSelectedSign(null); setSelectedPlanet(null); setFact(null); };
 return (
 <div style={{minHeight:"100vh",background:"#0d0a14",fontFamily:"Georgia,serif",color:"#ff <canvas ref={canvasRef} style={{display:"none"}} />
 {/* Stars */}
 <div style={{position:"fixed",inset:0,pointerEvents:"none",zIndex:0}}>
 {[...Array(70)].map((_,i)=>(
 <div key={i} style={{position:"absolute",width:Math.random()*2.5+0.4+"px",height:Ma ))}
 </div>
 <style>{`
 @import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Cinzel:wgh @keyframes tw{0%,100%{opacity:0.2}50%{opacity:1}}
 @keyframes up{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:transl @keyframes sh{0%{background-position:200% center}100%{background-position:-200% cente @keyframes gl{0%,100%{box-shadow:0 0 18px 3px rgba(201,169,110,0.25)}50%{box-shadow:0 @keyframes pu{0%,100%{opacity:0.4}50%{opacity:1}}
 .sb{background:rgba(255,200,50,0.06);border:2px solid #ff2222;color:#f0c030;padding:9 .sb:hover,.sb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a .pb{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:#c .pb:hover,.pb.sel{background:rgba(255,200,50,0.15);color:#f5c842;border-color:var(--a .rb{background:linear-gradient(135deg,var(--a),#8a6000);color:#0d0a14;border:2px soli .rb:hover{transform:scale(1.04);filter:brightness(1.12)}
 .rb:disabled{opacity:.35;cursor:default;animation:none}
 .fc{animation:up .65s ease forwards;background:linear-gradient(135deg,rgba(255,200,50 .fc::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:l .cp{background:rgba(255,200,50,0.04);border:1px solid rgba(255,200,50,0.15);border-ra .cp::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:l .mb{background:rgba(255,200,50,0.06);border:1px solid rgba(255,200,50,0.2);color:#f0c .mb:hover{background:rgba(255,200,50,0.12);color:#f5c842;transform:translateY(-3px);b .shb{background:rgba(168,224,96,0.08);border:1px solid rgba(168,224,96,0.3);color:#a8 .shb:hover{background:rgba(168,224,96,0.15);color:#c8f080}
 .gn{display:inline-block;background:rgba(168,224,96,0.08);border:1px solid rgba(168,2 select{background:#110e1a;border:1px solid rgba(255,255,255,0.1);color:#c8baa0;paddin select:hover{border-color:rgba(255,255,255,0.22)}
 select option{background:#110e1a;color:#c8baa0}
 .bk{background:none;border:none;color:#5a5048;cursor:pointer;font-family:'Cinzel',ser .bk:hover{color:#9a8e80}
 input[type="date"]:focus,input[type="time"]:focus,input[type="text"]:focus{border-col input[type="text"]::placeholder{color:#4a4038}
 input[type="date"]::-webkit-calendar-picker-indicator,input[type="time"]::-webkit-cal `}</style>
 <div style={{position:"relative",zIndex:1,maxWidth:700,margin:"0 auto",padding:"20px 18 {/* Top Nav */}
 <div style={{display:"flex",gap:10,justifyContent:"center",marginBottom:20,flexWrap:" {[
 {label:"_ Fun Facts", key:"facts"},
 {label:"_ Celebrity Connection", key:"celebrity"},
 {label:"_ Guess Your Sign", key:"guess"},
 ].map(tab=>(
 <button
 key={tab.key}
 onClick={()=>setTopTab(tab.key)}
 style={{
 background: topTab===tab.key ? "linear-gradient(135deg,#e8a800,#8a6000)" : "r border: topTab===tab.key ? "2px solid #ff3333" : "2px solid rgba(255,200,50,0 color: topTab===tab.key ? "#0d0a14" : "#f5c842",
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
 <div style={{fontSize:11,fontFamily:"'Cinzel',serif",letterSpacing:".3em",color:"#a <h1 style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:"clamp(36p Your Cosmic<br/><em>Fun Facts</em>
 </h1>
 <p style={{color:"#c0c0c0",fontFamily:"'Special Elite',cursive",fontWeight:700,font </div>
 {/* HOME */}
 {mode==="home" && (
 <div style={{animation:"up .5s ease",textAlign:"center",paddingTop:20}}>
 <div style={{fontSize:48,marginBottom:20}}>_</div>
 <div style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:20,colo Choose a sign and a planet to discover your cosmic fun fact.
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
 boxShadow:"0 0 30px 8px rgba(245,200,66,0.4),0 0 60px 16px rgba(245,200,66,0.15 animation:"gl 3s ease-in-out infinite",
 transition:"all 0.3s",
 }}>
 _ EXPLORE YOUR PLACEMENTS
 </button>
 </div>
 )}
 {/* SINGLE */}
 {mode==="single" && (
 <div style={{animation:"up .45s ease"}}>
 <button className="bk" onClick={()=>{setMode("home");reset();}}>_ BACK</button>
 {/* Sign */}
 <div style={{marginBottom:30}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpaci <span style={{width:19,height:19,borderRadius:"50%",background:accent,display
 SELECT YOUR SIGN
 </div>
 <div style={{display:"flex",flexDirection:"column",gap:6,alignItems:"center"}}>
 {/* Tip of A - 1 sign */}
 <div style={{display:"grid",gridTemplateColumns:"1fr",gap:6,width:"25%"}}>
 {["Aries"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"-- <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Row 2 - 2 signs */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:6,width:" {["Taurus","Gemini"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"-- <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Row 3 - 3 signs */}
 <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,width:" {["Cancer","Virgo"].map((s,i)=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"-- <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
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
 background: selectedSign==="Leo" ? "rgba(255,171,64,0.18)" : "transpare transition:"all 0.25s",
 }}
 >
 <style>{`
 @keyframes shoot {
 0% { transform: translateX(-8px) translateY(8px) rotate(-35deg); opac 30% { opacity:1; }
 100% { transform: translateX(8px) translateY(-8px) rotate(-35deg); op }
 @keyframes shootTrail {
 0% { opacity:0; width:0px; }
 30% { opacity:0.8; }
 100% { opacity:0; width:22px; }
 }
 .leo-star { animation: shoot 2.2s ease-in-out infinite; }
 .leo-trail { animation: shootTrail 2.2s ease-in-out infinite; }
 `}</style>
 <div style={{position:"relative",width:36,height:28,marginBottom:3}}>
 {/* Trail */}
 <div className="leo-trail" style={{
 position:"absolute",
 top:"52%",left:"10%",
 height:2,
 background:"linear-gradient(90deg,transparent,#ffab40)",
 borderRadius:2,
 transformOrigin:"right center",
 transform:"rotate(-35deg)",
 }}/>
 {/* Star */}
 <div className="leo-star" style={{
 position:"absolute",
 top:"10%",right:"5%",
 fontSize:16,
 filter: selectedSign==="Leo" ? "drop-shadow(0 0 6px #ffab40)" : "drop }}>_</div>
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
 <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,width:" {["Libra","Scorpio","Sagittarius","Capricorn"].map(s=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"--
 <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 {/* Legs of A - 2 signs on outer sides with gap */}
 <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr 1fr",gap:6,width {["Aquarius","Pisces"].map((s,i)=>(
 <button key={s} className={`sb${selectedSign===s?" sel":""}`} style={{"-- <div style={{fontSize:15,marginBottom:3}}>{emojis[s]}</div>
 <div style={{fontSize:9}}>{s}</div>
 </button>
 ))}
 </div>
 </div>
 </div>
 {/* Planet */}
 {selectedSign && (
 <div style={{marginBottom:30,animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:10,letterSpa <span style={{width:19,height:19,borderRadius:"50%",background:accent,displ SELECT YOUR PLANET
 </div>
 <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
 {planets.map(p=>(
 <button key={p} className={`pb${selectedPlanet===p?" sel":""}`} style={{" {emojis[p]} {p}
 </button>
 ))}
 </div>
 </div>
 )}
 {/* Reveal */}
 {selectedSign && selectedPlanet && (
 <div style={{textAlign:"center",marginBottom:28,animation:"up .4s ease"}}>
 <div style={{fontFamily:"'Special Elite',cursive",fontSize:19,color:"#f5c842" {emojis[selectedPlanet]} {selectedPlanet} in {selectedSign} {emojis[selecte </div>
 {OUTER.includes(selectedPlanet) && generationDates[selectedPlanet]?.[selected <div style={{fontFamily:"'Cinzel',serif",fontSize:9,color:"#6a6058",letterS Born approx. {generationDates[selectedPlanet][selectedSign]}
 </div>
 )}
 <button className="rb" style={{"--a":accent}} onClick={handleReveal}>
 {fact?"_ REVEAL ANOTHER FACT":"_ REVEAL MY COSMIC FACT"}
 </button>
 </div>
 )}
 {animating && <div style={{textAlign:"center",padding:28,color:accent,fontSize:26 {fact && !animating && (
 <div className="fc" style={{"--a":accent}}>
 <div style={{fontSize:28,marginBottom:14,textAlign:"center"}}>{emojis[selecte <p style={{fontFamily:"'Special Elite',cursive",fontWeight:700,fontSize:"clam <div style={{textAlign:"center",display:"flex",alignItems:"center",justifyCon <span style={{fontFamily:"'Cinzel',serif",fontWeight:700,fontSize:9,letterS <button className="shb" onClick={()=>handleShare(selectedSign,selectedPlane {shareSuccess==="single"?"_ Saved!":"_ Save Story Card"}
 </button>
 </div>
 </div>
 )}
 {(selectedSign||selectedPlanet) && (
 <div style={{textAlign:"center",marginTop:24}}>
 <button onClick={reset} style={{background:"none",border:"none",color:"#50484 </div>
 )}
 </div>
 )}
 </> }
 {/* Footer */}
 <div style={{textAlign:"center",marginTop:60,paddingTop:24,borderTop:"1px solid rgba( <p style={{fontFamily:"'Special Elite',cursive",fontSize:13,color:"#3a3430",margin: powered by <span style={{color:"#5a5048"}}>Ayssia</span>
 </p>
 </div>
 </div>
 </div>
 );
}