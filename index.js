/**
    Fifty Shades of Gray Excerpt Generator for Apep
    
    Grammar ported from: https://github.com/lisawray/fiftyshades
*/
const pep = require('apep');
const pep_trans = require('apep-std-transformations');
const pep_vars = require('apep-std-vars');
const md = require('apep-md');

/**
    Sentence level capitalization.
*/
const capitalize = (g) => pep_trans.capitalizeFirst(pep.join(g));


////////////////////////////////////////////////////////////////////////////////
// Excerpt
const excerpt = pep.declare(() =>
    pep.choice(
	    md.paragraphs(
            fetishParagraph,
	        interrogative,
	        affirmation,
	        [pep.opt(confirmation), heTouchesMeGently],
	        paragraph,
	        rParagraph),
	
        md.paragraphs(
	        rParagraph,
	        paragraph),
	
	    md.paragraphs(
	        [interjection, ". That ", singularAbstractNoun, "!"],
	        remark,
            paragraph,
            rParagraph),
	
	    md.paragraphs(
	        [interrogative, statementOfNervousness],
	        paragraph,
	        fetishParagraph,
	        rParagraph),
	
	    md.paragraphs(
	        interrogative,
	        affirmation,
	        confirmation,
	        command,
	        paragraph),
	
	    md.paragraphs(
            paragraph,
	        order,
	        fetishParagraph,
	        [remark, rParagraph])));
	
// PG-rated paragraph
const paragraph = pep.declare(() =>
    pep.choice(
        [kissSentence1, repeatedKissSentence2,
            headHoldingSentence, innerGoddessSentence],
        [kissSentence1, repeatedKissSentence2,
            musicSentence, musicSentence2, headHoldingSentence]));

const repeatedKissSentence2 = pep.declare(() =>
    pep.choice(
        kissSentence2,
        [kissSentence2, kissSentence2],
        [kissSentence2, kissSentence2, kissSentence2]));

// R-rated paragraph
const rParagraph = pep.declare(() =>
    pep.choice(
        [forcefulSentence, kissSentenceR, observationSentence],
        [forcefulSentence, touchSentence, rhetoricalQuestion],
        [forcefulSentence, touchSentence,iBlush,
            md.italic(interjection), ". "]));


const observationSentence = pep.declare(() =>
    pep.seq(
        capitalize(observation), ". "));

////////////////////////////////////////////////////////////////////////////////
// Fetish Sentences

const fetishParagraph = pep.declare(() =>
    pep.choice(
        [statementOfFetishObj, statementOfNervousness,
            pep.choice(statementOfFetishObj3, statementOfFetishObj2)],

        [transition, statementOfFetishObj3, statementOfFetishObj,
            statementOfFetishObj2],

	    [statementOfFetishObj, md.italic(interjection), ". ",
	        statementOfFetishObj2]));


 //TODO: sub/verb agreement
const statementOfFetishObj = pep.declare(() =>
    pep.choice(
	    ["His ", fetishObj, " ", isPositioned(fetishObj), " ",
	        onTopOf(fetishObj), ". "],
	
	    [capitalize(demonstrativePronoun(fetishObj)), " ",
	        fetishObj, "! We've never used ", fetishArticle, " before. "]));

const statementOfFetishObj3 = pep.declare(() =>
    pep.choice(
	    [exclamation, ", he's so ",
	        pep.choice("complicated", "hard to please", "fucked-up"), ". "],
	
	    ["If only it didn't take a contract and ", fetishArticle, " to ", pep.choice("please", "satisfy"), " him. "],
	
	    [capitalize(badImNervous),
	        ". I worry, again, that I'm not enough for him. "]));

//TODO: sub/verb agreement
const statementOfFetishObj2 = pep.declare(() =>
	pep.choice(
	    "I don't know if I can do this for him. ",
	    ["I can't imagine how he wants to use ",
	        md.italic(demonstrativePronoun(fetishObj)), ". "],
	    "What on earth does he have in store for me? " ,
	    ["His ", pep.choice("fingers brush", "eyes glance over"), " the ",
	        shortForm(fetishObj), ", and ", imTurnedOn, ". "]));
	
const statementOfNervousness = pep.declare(() =>
	pep.choice(
	    ["I glance ", nervousAdv, " at the ",
	        pep.choice("bed", "doorway", "playroom"), ". "],
	
	    ["I ", shiver, " ", nervousAdv,
	        ", excitement blooming deep inside me. "],
	
        [capitalize(imNervous), ". "]));

const imNervous = pep.choice(
	["my heart starts pounding", pep.opt(" in anticipation")],
	"my heart skips a beat",
    "my breathing accelerates",
	"my stomach somersaults",
	"I'm quaking like a leaf",
	"my breath hitches");

const badImNervous = pep.choice(
	"my stomach sinks",
	"my mouth goes dry",
	"I'm suddenly flooded with despair");

const nervousAdv = pep.choice("nervously", "anxiously");	

////////////////////////////////////////////////////////////////////////////////
// Fetish Object

const fetishObj = pep_vars.store('fetishObject', pep.choice(
    "handcuffs", "nipple clamps", "flogger", "paddle",
    "leather strap", "rope"));

const demonstrativePronoun = pep_trans.dicti({
	"handcuffs": "those",
	"nipple clamps": "those",
	"flogger": "that",
	"paddle": "that",
	"leather strap": "that",
	"rope": "that",
});
	
const shortForm = pep_trans.dicti({
	"handcuffs": "cuffs",
	"nipple clamps": "clamps",
	"flogger": "instrument",
	"paddle": "paddle",
	"leather strap": "strap",
	"rope": "coil"
});

const article = pep_trans.dicti({
	"handcuffs": "a pair of",
	"nipple clamps": "a pair of",
	"flogger": "a",
	"paddle": "a",
	"leather strap": "a",
	"rope": ""
});

const fetishArticle = pep.seq(
    article(fetishObj), " ", fetishObj);

const isPositioned = pep_trans.dicti({
	"handcuffs": "sit on top of" ,
	"nipple clamps": "peek out of",
	"flogger": "is draped over",
	"paddle": "lies casually on",
	"leather strap": "is propped against",
	"rope": "is coiled on"
});

const onTopOf = pep_trans.dicti({
	"handcuffs": "the still-rumpled bed",
	"nipple clamps": "that velvet drawer",
	"flogger": "the edge of the bed",
	"paddle": "his imposing, leather-topped desk",
	"leather strap": "the stack of books on his desk",
	"rope": "the foot of the bed"
});
	
////////////////////////////////////////////////////////////////////////////////
// Communication

const yes = pep.choice("Yes", "Yes. Oh, yes", "Okay", "Please");


const affirmation = pep.declare(() =>
    pep.seq("'", yes,
        pep.choice(
            [pep.choice(",", "..."), "' ", iSay, " breathlessly"],
            [".' ", pep.choice("My voice is barely audible", "I swallow")]),
        ". "));

const command = pep.declare(() =>
    pep.seq("'",
        pep.choice("Surprise me", "Take me", "Don't make me wait"),
        ",' ", iSay, ". "));

const order = pep.declare(() =>
    pep.seq("'",
        capitalize(pep.choice("turn around", "face the wall",
            "get on the bed", "on your knees")),
        pep.choice(
            ".' ",
            [",' ", heSays, ", ", pep.choice(
                "and I comply immediately",
                [turningMeOn, " and ", turningMeOn])]),
        ". "));

const conf = pep.choice(
	"Good",
	"Good girl",
	"Tell me what you want",
	["I want to hear you ", pep.opt([
	    pep.choice("moan", "scream"), " for me"])],
	"This will be hard, but I won't hurt you",
	"Remember, I'll never hurt you",
	"This is not going to hurt. It will be intense");
	
const confirmation = pep.declare(() =>
    pep.choice(
        [capitalize(smile), ". '", conf, ".' "],
	    ["'", conf, ",' ", heSays, ", ", compoundAdj, ". "],
	    ["'", conf, ". ", conf, ".' "]));

const smile = pep.choice(
    ["he smiles ", pep.choice("wickedly", "teasingly", "twistedly")],
    "he smirks",
    "his lips tense",
    "his lips part", "his lips twitch");

const remark = pep.declare(() =>
    pep.seq("'",
        pep.choice(
            "The things I'm going to do to you ...",
            "God, I need you",
            "I want you so much",
            "You are so beautiful",
            "You. Are. So. Beautiful",
            "You. Are. So. Sweet",
            "Keep still"),
        ",' ",
        heSays,
        pep.choice(
            " as he hovers over me",
            ", staring intently into my eyes",
            ", pinning me with his bold gaze"),
        ". "));

const interrogative = pep.declare(() =>
    pep.choice(
	    ["'", question, ",' ", heSays, ", ", compoundAdj, ", and ",
	        imTurnedOn, " as " , imTurnedOn, ". "],
	
	    ["'", question, ",' ", heSays, ". ",
	        capitalize(compoundSentence),
	        ", and ", imTurnedOn, ". "],
			
	    ["'", question, ",' ", heSays, " ", compoundAdv, ", ",
	        turningMeOn, ". "]));

const question = pep.choice(
	["Do you want ", pep.choice("me", "to play"), "? "],
	"You were very disobedient",
	"I am going to teach you a lesson",
	"Here? ",
	"Do you have anything in mind? ",
	"Ready?");

//For modifying "he says"
const compoundAdj = pep.declare(() =>
    pep.choice(
	    ["his ", pep.choice("voice", "breathing"), " ", voiceAdj],
	    ["his ", eyes, " ", eyesAdj]));

//Same thing, but as a sentence.
const compoundSentence = pep.declare(() =>
    pep.choice(
	    ["his ", pep.choice("voice", "breathing"), " is ", voiceAdj],
	    ["his ", eyesSame, " ", is(eyesSame), " ", eyesAdjPhrase]));

////////////////////////////////////////////////////////////////////////////////
// Eyes

const eyes = pep.choice('eyes', 'gaze');

const eyesSame = pep_vars.store('eyes', eyes);

const is = pep_trans.dicti({
    "eyes": "are",
    "gaze": "is"
});

const slate = pep.choice("slate", "darkest slate");

const eyesAdj = pep.choice("smoky", "gray", "intense", "burning", "smouldering",
    "darkening", slate, "scorching", "stormy");

const eyesAdjPhrase = pep.choice(
    eyesAdj,
    eyesAdj,
    eyesAdj,
    [eyesAdj, ", ", eyesAdj],
    "scorching molten gray",
    "softly luminous in the diffuse glow of the lamp",
    "drinking me in",
    "burning brighter");

const voiceAdj = pep.choice("husky", "harsh", "hard", "low");

// For modifying "he says"
const compoundAdv = pep.choice("in my ear", "teasingly");

////////////////////////////////////////////////////////////////////////////////
// Turned on Sentences

const imTurnedOn = pep.choice(
	"everything in my body tightens",
	"desire unfurls deep in my belly",
	"my muscles clench deep inside me",
	"dark desire unfolds throughout my body",
	"an electric thrill thrums through me",
	[pep.opt("a delicious "), "tingling shoots through me"],
	"a pulse of warmth pools inside me",
	"I tingle ... everywhere",
	"everything south of my waist tightens deliciously");
	
const imTurnedOnR = pep.choice(
	"desire courses through my blood",
	"desire seizes me with a vengeance",
	"my craving spirals out of control",
	"my body rises and fills with my arousal",
	"desire and anxiety pump through me",
	"I'm drowning in a pool of desire",
	"I surrender briefly to the sensation",
	"I am awash with sensation",
	"I lose myself to his fervent passion",
	"I am all sensation");

const turningMeOn = pep.choice(
	"making me tremble",
	"igniting a fire deep within",
	["making my muscles clench ",
	    pep.choice("in response", "deep, deep inside")],
	["sending", pep.opt(" delicious"), " shivers ",
	    pep.choice(
	        "through me ... ", md.italic("there"),
	        "down my spine")],
	"raising uncontrollable urges in me",
	"sparking electricity ... below",
	"making me squirm",
	"feeling spiraling out from deep within my belly",
	"coursing heat throughout my body",
	"igniting my blood",
	"shallowing my breath",
	"warmth pooling below my waist",
	"anticipation and anxiety charging through me",
	"my insides liquefying");
	
const turningMeOnR = pep.choice(
	"making me writhe",
	"making me yearn for him",
	"pleasure lancing directly to my groin");
	
const iMoan = pep.choice(
    ["I moan", pep.opt(" again "),
        pep.choice(" into his mouth", " against his lips", pep.empty)],
    "I squirm against him",
	["I gasp ",
	    pep.choice(
	        "at his words ",
	        ["and moan ", pep.opt("against his lips")])],
	"I yelp",
	"I bite my lip");

////////////////////////////////////////////////////////////////////////////////
// Inner Goddess Sentences

const innerGoddess = pep.choice("my subconscious", "my inner goddess");

const doesGoddessAction = pep.choice(
	"is purring with pleasure",
	"is screaming at me",
	"does the samba",
	"does a slow erotic dance",
	"glares at me",
	"is staring at me in awe",
	"swoons and passes out somewhere in the back of my head",
	"is thrilled",
	"is doing the merengue with some salsa moves",
	"has stopped dancing and is staring too, mouth open and drooling slightly");

const innerGoddessSentence = pep.seq(
    capitalize(innerGoddess), " ", doesGoddessAction, ". ");


////////////////////////////////////////////////////////////////////////////////
// Kissing Sentences

//The start of kissing
const kissSentence1 = pep.declare(() =>
    pep.choice(
	    [movingToKissMe, ", ", heKissesMe, ", ", kissAdj, ", ",
	        turningMeOn, ". "],
	    
	    [heMovesToKissMe, ", and ", imNervous, ". ",
	        capitalize(heKissesMe), commaKissAdj, ". "]));


const commaKissAdj = pep.declare(() =>
    pep.many1([", ", kissAdj]));

//A generic kiss
const kissSentence2 = pep.declare(() =>
    pep.choice(
        [capitalize(heKissesMe), ", ",
            kissAdj, commaTurningMeOn, ". "],
        
        [capitalize(heKissesMe), ", and ", imTurnedOn, ". "],
        
        [capitalize(kissAdjComma), heKissesMe, ". "]));
	
const kissAdjComma = pep.declare(() =>
    pep.many1([kissAdj, ", ", ]));

const commaTurningMeOn = pep.declare(() =>
    pep.weightedChoice([
        [1, [", ", turningMeOn]],
        [2, [", ", turningMeOn, ", ", turningMeOn]]]));
	
//Dirty kiss!
const kissSentenceR = pep.declare(() =>
	pep.choice(
	    [capitalize(heKissesMe), ", ", dirtyKissAdj, commaTurningMeOnR, ". "],
	    [capitalize(heKissesMe), ", and ", imTurnedOnR, ". "],
	    [capitalize(dirtyKissAdjComma), heKissesMe, ". "]));

//Use one, two, or three phrases.		
const dirtyKissAdjComma = pep.declare(() =>
    pep.choice(
        [dirtyKissAdj, ", "],
        [dirtyKissAdj, ", ", dirtyKissAdj, ", "]));

const commaTurningMeOnR = pep.declare(() =>
    pep.weightedChoice([
        [1, [", ", turningMeOnR]],
        [2, [", ", turningMeOnR, ", ", turningMeOnR]]]));

const movingToKissMe = pep.choice(
	"Tipping my chin back",
	"Leaning down");

const heMovesToKissMe = pep.seq("He ",
    pep.choice(
		"reaches down",
		"lifts my chin",
		["runs his nose along my ", pep.choice("jaw", "forehead")],
		"leans in"));
		
const heKissesMe = pep.choice(
	["he plants a soft ", pep.opt("wet "), "kiss on my lips"],
	["he softly kisses my ",
	    pep.choice("face", "throat", "cheek", "temple", "bottom lip")],
    "he kisses me",
	["his ", pep.opt("skilled "), "tongue invades my mouth"],
	"his mouth is on mine");

const kissAdj = pep.choice(
	"insistent",
	"tasting",
	"exploring",
	"dominating",
	"his eyes glowing with lust");

const dirtyKissAdj = pep.choice(
    "forceful",
    "lustful",
    "exploring",
    "frantic",
    "his eyes wild");
	
const dirtyKissAdv = pep.choice(
	"savagely",
	"frantically",
	"forcefully");


////////////////////////////////////////////////////////////////////////////////
// Head Holding Sentences

const heHoldsMyHead = pep.choice(
    ["he curls his fingers ", pep.choice("around my head", "into my hair")],
	["his hand tightens around my hair", pep.opt(" at my nape")],
	"his fingers curl into my hair",
	"he grabs my hair and yanks down",
	"one of his hands moves into my hair");

const holdingMyHead = pep.declare(() =>
    pep.seq(
        pep.choice(
	    "holding my head in place",
		["holding me ", pep.choice("gently ", "firmly "), "in place"],
		"pulling my head back",
		"lifting his other hand to cradle my face"),
	
	    pep.opt([" as we kiss", pep.opt([", ", dirtyKissAdv])])));

const playingWithHair = pep.choice(
	"running his fingers through my hair",
	"fisting his hands",
	"holding tight");

const headHoldingSentence = pep.declare(() =>
    pep.choice(
        [capitalize(heHoldsMyHead), ", ",  holdingMyHead, ". "],
	    [iMoan, ", and ", heHoldsMyHead, ", ", holdingMyHead, ". "],
	    [capitalize(holdingMyHead), ", ", heHoldsMyHead, ", ",
	         playingWithHair, ". "]));

////////////////////////////////////////////////////////////////////////////////
// Touching Sentences

const gently = pep.choice("gently", "softly");

const touchVerb = pep.choice("trail", "skim", "run", "trace");

const touchPrep = pep.choice("up", "down", "along", "across");

const hands = pep.choice("hands", "fingers", "fingertips");

const bodyPart = pep.choice("body", "back", "thighs", "neck", "belly");

const heTouchesMe = pep.choice(
	["his ", hands, " ", touchVerb, " ", touchPrep, " my ", bodyPart],
    ["his ", hands, " ", gently, " ", touchVerb, " ", touchPrep,
        " my ", bodyPart],
	["his ", hands, " ", touchVerb, " ", touchPrep, " my ", bodyPart,
	    " ", gently],
	["he ", touchVerb, "s his ", hands, " ", touchPrep, " my ", bodyPart],
	["he ", gently, " ", touchVerb, "s his ", hands, " ", touchPrep,
	    " my ", bodyPart],
	["he ", touchVerb, "s his ", hands, " ", gently, " ", touchPrep,
	    " my ", bodyPart],
	["he ", touchVerb, "s his ", hands, " ", touchPrep, " my ",
	    bodyPart, " ", gently]);

const heTouchesMeGently = pep.declare(() =>
    pep.seq(
    pep.choice(
        pep.seq(
            pep.choice(
                ["His fingers ", pep.choice("brush", "graze")],
                ["He ", pep.choice("touches", "cups")]),
             " my face gently"),
        
        ["He caresses my ", pep.choice("cheek", "hair"), ", gazing at me ",
            pep.choice("lovingly", "tenderly")]),
            
    ", ", turningMeOn, ". "));

const t1 = capitalize(heTouchesMe);

const t2 = pep.choice(
    [" so that ", imTurnedOnR],
    [", and ", imTurnedOnR]);

// Only use 1 of these (not enough variety).
const touchSentence = pep.declare(() =>
    pep.choice(
        [t1, t2, ". "],
        [t1, ". ", capitalize(observation), ". "]));

////////////////////////////////////////////////////////////////////////////////
// Forceful Sentences

const wall = pep_vars.store('wall',
    pep.choice("wall", "bedpost", "desk", "doorway"));

const actionPrefix = pep.choice(
	"Moving suddenly",
	"All of a sudden",
	"Suddenly",
	"Abruptly",
    "Without warning",
	"Catching me off guard")

const actsForcefully = pep.choice(
	["grabs me by the ", pep.choice("waist", "shoulders")],
	"yanks me off my feet");

const shovesMe = pep.seq(
    pep.choice("shoves", "pushes", "slams"),
    " me against the ", wall);
		
const shovingMe = pep.seq(
    pep.choice("shoving", "pushing", "slamming"),
    " me against the ", wall);

const hePinsMe = pep.choice(
	["He's pinning me to the ", wall, " using his hips"],
	"He holds me against his hips",
	"He restrains me with his hips");

// Use 1 only, at the beginning of a paragraph.
const forcefulSentence = pep.declare(() =>
    pep.choice(
        [actionPrefix, ", he ", actsForcefully, ", ", shovingMe, ". ",
            capitalize(observation), commaTurningMeOnR, ". "],
    
        [actionPrefix, ", he ", shovesMe, ". ", hePinsMe, ", and ",
            observation, ". "]));
    
////////////////////////////////////////////////////////////////////////////////
// Transition Sentences

const observation = pep.choice(
	"it's so hot",
	"my breathing is too loud",
	"fuck, I'm panting already",
	"I'm going to combust",
	"I can see nothing, all I can hear is my rapid breathing",
	"all the air leaves my body",
	"I groan, frustrated",
	"it's pleasure overload",
	"it's so erotic—his need for me",
	"I groan loudly, panting",
	"I inhale sharply",
	"I practically convulse",
	"my heart is pounding",
    "my pulse is haywire");

const rhetoricalQuestion = pep.choice(
	"How can his body do this to me?",
	"How can he turn me on with one word?",
	"How can he do this to me?",
	"How does he have this power over me?");

const transition = pep.choice(
	"He grins against my neck. ",
	"He straightens. ",
	"He smirks at me. ",
	"He stalks gracefully forward. ",
	"He smiles a slow sexy smile. ");

//That look.
const singularAbstractNoun = pep.choice("look", "power", "sex appeal", "gaze");

const exclamation = pep.choice("Boy", "God", "Jeez");

const interjection = pep.choice(
    "Holy shit", "Holy crap", "Holy cow", "Holy hell", "Crap", "Shit", "Oh my",
	"I want him so badly",
	"Oh, I want this");
	
const shiver = pep.choice("tremble", "shiver");
const shivered = pep.seq(shiver, "ed");

const kiss = pep.choice("kiss is", "lips are");

////////////////////////////////////////////////////////////////////////////////
// Music Sentences

const musicAdjective = pep.choice("haunting", "sultry", "sensual", "pulsing");

const composer = pep_vars.store('composer', 
    pep.choice("Kings of Leon", "Tallis", "Miley Cyrus", "Justin Bieber"));
    
const musicReaction = pep.choice("unexpected", "appropriate");

const musicSentence = pep.choice(
	"I can hear music faintly. ",
	["I can hear a song by ", composer, " drifting through the air. "],
	["The ", musicAdjective, " strains of ", composer,
	    pep.choice(
	        " waft through the air",
	        " drift through the headphones he put on me"),
	    ". "]);
	    
const musicSentence2 = pep.choice(
    ["How ", musicReaction, ". "],
	"He always puts songs on repeat in here. ",
	"I love his choice. ");

////////////////////////////////////////////////////////////////////////////////
// Blush Sentences

const blush = pep.choice("blush", "flush");

const blushAdjective = pep.choice(
    "scarlet",
    "from my head to my toes",
    "deeply",
    ", feeling my face flame");

const humiliated = pep.choice("humiliated", "ashamed");
const excited = pep.choice("excited", "turned on");

const blushModifier = pep.seq(humiliated, " and ", excited," at the same time");

const iBlush = pep.choice(
	["I ", blush, " ", blushAdjective, ". "],
	["I ", blush, " ", blushAdjective, ", ", blushModifier, ". "],
	"Why am I embarrassed by this? ");

////////////////////////////////////////////////////////////////////////////////
// Says
const heSays = pep.seq(
    "he ",
    pep.choice("murmurs", "growls", "whispers", "breathes"));

const iSay = pep.seq("I ", pep.choice("exhale", "whisper", "breathe"));




console.log(excerpt.run());