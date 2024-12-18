const jokes = [
    "Why did the writer break up with grammar? It was too possessive.",
    "Why was the blogger’s computer so slow? Too many drafts!",
    "How do bloggers prefer their coffee? Strong and well-written!",
    "Why did the freelance writer stay up all night? To meet a dead-line!",
    "Why don’t bloggers play hide-and-seek? They’d just leave a trail of tags!",
    "Why did the blogger go broke? She ran out of content ideas.",
    "How many bloggers does it take to change a lightbulb? One to change it, and a thousand to blog about the experience.",
    "What did the writer say to the blank page? You’re about to get served.",
    "Why was the SEO copywriter unhappy? Because they just couldn't get any clicks!",
    "Why did the editor break up with the writer? There were just too many red flags!",
    "What’s a writer’s favorite exercise? Word crunches.",
    "Why did the blogger get lost? They missed the point.",
    "What did the editor say to the writer at the bar? Take out the passive voice!",
    "How did the writer apologize? They gave a well-documented sorry.",
    "Why did the blog post feel unappreciated? It just wanted more comments!",
    "Why don’t writers trust stairs? They’re always up to something.",
    "How did the blog article become so popular? It went viral.",
    "Why don’t bloggers use whiteboards? They like to keep things digital.",
    "Why did the punctuation marks break up? It was a period of transition.",
    "Why do writers love libraries? They’re in a committed relationship with words.",
    "What do you call a writer who doesn't proofread? A rough draft enthusiast!",
    "Why did the writer join the circus? To try a new story angle.",
    "What do writers do when they retire? Start a book club and judge everyone else’s work.",
    "How do bloggers stay calm? They meditate on their page views.",
    "Why did the blogger call tech support? Their site was down for the count!",
    "What do you call a blogger without WiFi? Offline content.",
    "Why did the blogger wear a sweater? Because it was getting chilly online.",
    "Why did the writing contest end early? Everyone kept running out of ideas.",
    "How does a writer know they've gone viral? The comments section catches fire.",
    "Why do bloggers love coffee? It keeps their ideas percolating!",
    "What did the blog post say to the headline? Thanks for the attention!",
    "How did the writer respond to criticism? With a well-structured rebuttal.",
    "Why did the blogger bring a ladder to the meeting? To reach new heights!",
    "Why don’t bloggers work weekends? They’re already publishing daily!",
    "Why was the writer so organized? They had a paragraph planner!",
    "Why do bloggers get so excited about analytics? They love watching the stats stack up.",
    "Why did the blogger take a dictionary to bed? They wanted to sleep on it!",
    "How do you keep a writer in suspense? I’ll tell you tomorrow.",
    "What did the writer say to the editor? Thanks for setting me straight!",
    "Why did the content creator cross the road? To get more engagement on the other side.",
    "What’s a blogger’s favorite breakfast? Word Toast.",
    "Why did the poet get kicked out of the party? They kept making verse moves.",
    "Why do writers carry notebooks? Because you never know when inspiration might strike!",
    "How did the blogger get famous? They started writing in bold.",
    "What did the reader say to the blog post? I see you’ve made some points.",
    "Why did the grammar teacher lose his job? He couldn’t hold a sentence together.",
    "What’s a writer’s least favorite punctuation mark? The full stop—it’s so final!",
    "Why do writers love thesauruses? Because they give them more than one way to say things.",
    "How do bloggers make a decision? They weigh the pros and the content.",
    "Why did the blogger get a dog? For more followers!",
    "What’s a blogger’s favorite type of math? Page view statistics."
];

export default function randomJoke() {
    return jokes[Math.floor(Math.random() * jokes.length)];
}

