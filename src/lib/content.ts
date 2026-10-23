/* ==========================================================================
   Site content. Everything a church volunteer would normally update lives here.
   Items marked sample: true are placeholders for the church team to confirm.
   ========================================================================== */

export type Category = "worship" | "prayer" | "youth" | "family" | "community" | "health";

export type WeeklyItem = {
  id: string;
  title: string;
  weekday: number; // 0 = Sunday … 6 = Saturday
  start: string; // "HH:MM" London time
  end: string;
  category: Category;
  location: string;
  desc: string;
  sample?: boolean;
};

export type ChurchEvent = {
  id: string;
  title: string;
  start: string; // "YYYY-MM-DDTHH:MM" London time
  end: string;
  category: Category;
  location: string;
  desc: string;
  sample?: boolean;
};

export type Sermon = { title: string; speaker: string; date: string; series: string; text: string; length: string };
export type Ministry = { name: string; audience: string[]; when: string; icon: string; colour: string; tint: string; desc: string; sample?: boolean };
export type Belief = { n: number; cat: string; title: string; ref: string; text: string };
export type Verse = { text: string; ref: string };

export const SITE = {
  church: {
    name: "Bradley Seventh-day Adventist Church",
    shortName: "Bradley Adventist Church",
    formerName: "Fartown SDA Church",
    conference: "North England Conference of Seventh-day Adventists",
    address: ["5 Copthorne Gardens", "Bradley, Huddersfield", "HD2 1RH"],
    phone: "01484 361622",
    mobile: "07707 404342",
    email: "Bradleysdachurch@outlook.com",
    youtubeLatest: "xFofiV_p0rc",
    youtubeChannel: "https://www.youtube.com/watch?v=xFofiV_p0rc",
    directions: "https://www.google.com/maps/dir/?api=1&destination=5+Copthorne+Gardens,+Huddersfield+HD2+1RH",
    mapEmbed: "https://www.google.com/maps?q=5+Copthorne+Gardens,+Bradley,+Huddersfield+HD2+1RH&z=15&output=embed",
    lat: 53.6687,
    lng: -1.7703,
    tz: "Europe/London",
    service: { weekday: 6, start: "10:00", end: "13:00" },
    pastor: "Pastor Fredrick Nti-Mensah"
  },

  // Weekly rhythm. weekday: 0 = Sunday … 6 = Saturday
  weekly: [
    { id: "sabbath-school", title: "Sabbath School", weekday: 6, start: "10:00", end: "11:00", category: "worship", location: "In person and online", desc: "Relaxed Bible study in small groups, with classes for every age." },
    { id: "family-worship", title: "Family worship", weekday: 6, start: "11:15", end: "13:00", category: "worship", location: "In person and online", desc: "Singing, prayer and a message from the Bible that everyone can follow." },
    { id: "midweek-prayer", title: "Midweek prayer and Bible study", weekday: 3, start: "19:00", end: "20:15", category: "prayer", location: "In person and on Zoom", desc: "A midweek breather. Share, pray and open the Bible together.", sample: true },
    { id: "friday-vespers", title: "Friday vespers", weekday: 5, start: "19:00", end: "20:00", category: "worship", location: "Online", desc: "Welcome the Sabbath with songs, a short devotional and prayer.", sample: true }
  ],

  // One-off events (local London time). Past events hide themselves automatically.
  events: [
    { id: "youth-vespers-oct", title: "Youth vespers and games night", start: "2026-10-30T19:00", end: "2026-10-30T21:30", category: "youth", location: "Church hall", desc: "Worship, pizza and board games for ages 12 to 25. Bring a friend.", sample: true },
    { id: "week-of-prayer", title: "Week of Prayer", start: "2026-11-07T19:00", end: "2026-11-07T20:30", category: "prayer", location: "In person and online", desc: "Eight evenings of readings and prayer, 7 to 14 November, alongside Adventist churches worldwide.", sample: true },
    { id: "health-morning", title: "Community health morning", start: "2026-11-08T10:00", end: "2026-11-08T13:00", category: "health", location: "Church hall", desc: "Free health checks, plant-based cooking demos and advice for the whole family.", sample: true },
    { id: "food-drive", title: "Winter food and coat drive", start: "2026-11-22T11:00", end: "2026-11-22T14:00", category: "community", location: "Church car park", desc: "Drop off tins, toiletries and warm coats for local families. Everything stays in Huddersfield.", sample: true },
    { id: "communion", title: "Communion Sabbath", start: "2026-11-28T11:15", end: "2026-11-28T13:15", category: "worship", location: "In person", desc: "The Lord's Supper with foot washing, bread and grape juice. Visitors are warmly welcome to take part or simply watch.", sample: true },
    { id: "pathfinder-day", title: "Pathfinder and Adventurer investiture", start: "2026-12-05T15:00", end: "2026-12-05T17:00", category: "youth", location: "Main hall", desc: "Celebrating our clubs as they receive this year's honours and badges.", sample: true },
    { id: "carols", title: "Carols by candlelight", start: "2026-12-12T18:00", end: "2026-12-12T19:30", category: "family", location: "Main hall", desc: "An evening of carols and the Christmas story. Bring friends and neighbours. Mince pies after.", sample: true },
    { id: "christmas-programme", title: "Children's Christmas programme", start: "2026-12-19T11:15", end: "2026-12-19T13:00", category: "family", location: "Main hall", desc: "The Sabbath School children tell the nativity story, with songs everyone knows.", sample: true },
    { id: "ten-days", title: "Ten Days of Prayer", start: "2027-01-06T19:00", end: "2027-01-06T20:00", category: "prayer", location: "Online", desc: "Begin the year together in prayer, 6 to 16 January, every evening online.", sample: true },
    { id: "cooking-course", title: "Healthy living cookery course", start: "2027-01-17T14:00", end: "2027-01-17T16:00", category: "health", location: "Church kitchen", desc: "Four Sunday afternoons of simple, budget-friendly plant-based cooking. Free, places limited.", sample: true }
  ],

  categories: {
    worship: { label: "Worship", chip: "" },
    prayer: { label: "Prayer", chip: "rose" },
    youth: { label: "Youth", chip: "sun" },
    family: { label: "Family", chip: "sun" },
    community: { label: "Community", chip: "green" },
    health: { label: "Health", chip: "green" }
  },

  sermons: [
    { title: "Rest for the restless", speaker: "Example speaker", date: "2026-10-17", series: "Sabbath: a gift in time", text: "Matthew 11:28-30", length: "38 min" },
    { title: "Made for us", speaker: "Example speaker", date: "2026-10-10", series: "Sabbath: a gift in time", text: "Mark 2:23-28", length: "34 min" },
    { title: "Remember", speaker: "Example speaker", date: "2026-10-03", series: "Sabbath: a gift in time", text: "Exodus 20:8-11", length: "41 min" },
    { title: "The God who sees", speaker: "Example speaker", date: "2026-09-26", series: "Unexpected people", text: "Genesis 16:7-13", length: "36 min" },
    { title: "Living water", speaker: "Example speaker", date: "2026-09-19", series: "Unexpected people", text: "John 4:1-26", length: "39 min" },
    { title: "Hope that holds", speaker: "Example speaker", date: "2026-09-12", series: "Blessed hope", text: "Titus 2:11-14", length: "35 min" },
    { title: "Ready, not anxious", speaker: "Example speaker", date: "2026-09-05", series: "Blessed hope", text: "Matthew 25:1-13", length: "29 min" },
    { title: "Whole-person health", speaker: "Example speaker", date: "2026-08-29", series: "Health and wholeness", text: "3 John 1:2", length: "33 min" },
    { title: "Bread for the journey", speaker: "Example speaker", date: "2026-08-22", series: "Health and wholeness", text: "1 Kings 19:1-8", length: "37 min" }
  ],

  seriesColours: {
    "Sabbath: a gift in time": "linear-gradient(135deg,#1d5c96,#0d2644)",
    "Unexpected people": "linear-gradient(135deg,#2c7656,#123d2c)",
    "Blessed hope": "linear-gradient(135deg,#d6831a,#8a4a0b)",
    "Health and wholeness": "linear-gradient(135deg,#b8475f,#5e1d2c)"
  },

  ministries: [
    { name: "Sabbath School", audience: ["All ages"], when: "Saturdays, 10:00am", icon: "book-open", colour: "#1d5c96", tint: "#dceaf6", desc: "The heart of our Saturday morning. Small groups open the Bible together, with classes for different ages.", sample: true },
    { name: "Children's ministries", audience: ["Children"], when: "During Sabbath School", icon: "baby", colour: "#d6831a", tint: "#fdebd0", desc: "Songs, stories and crafts that help children know Jesus as their friend.", sample: true },
    { name: "Adventurers", audience: ["Children"], when: "Alternate Sundays (to confirm)", icon: "compass", colour: "#2c7656", tint: "#dcefe4", desc: "A club for ages 4 to 9, building life skills, faith and friendships through badges, outings and family activities.", sample: true },
    { name: "Pathfinders", audience: ["Youth"], when: "Alternate Sundays (to confirm)", icon: "tent", colour: "#0d2644", tint: "#dceaf6", desc: "Camping, drill, first aid and honours for ages 10 to 15. Like scouting, with Jesus at the centre.", sample: true },
    { name: "Adventist Youth", audience: ["Youth"], when: "Saturday afternoons", icon: "flame", colour: "#b8475f", tint: "#f7e1e5", desc: "Young people leading worship, asking real questions and serving the community together.", sample: true },
    { name: "Health ministries", audience: ["All ages", "Community"], when: "Monthly", icon: "heart-pulse", colour: "#2c7656", tint: "#dcefe4", desc: "Cooking classes, health checks and talks on rest, nutrition and wellbeing. Open to all of Bradley.", sample: true },
    { name: "Community services", audience: ["Community"], when: "As needed", icon: "hand-heart", colour: "#d6831a", tint: "#fdebd0", desc: "Our Dorcas team runs food and clothing drives and supports neighbours through hard seasons.", sample: true },
    { name: "Women's ministries", audience: ["Adults"], when: "Monthly", icon: "flower-2", colour: "#b8475f", tint: "#f7e1e5", desc: "Encouragement, prayer breakfasts and mentoring for women at every stage of life.", sample: true },
    { name: "Men's ministries", audience: ["Adults"], when: "Monthly", icon: "users", colour: "#1d5c96", tint: "#dceaf6", desc: "Fellowship, Bible study and practical service. Breakfast usually involved.", sample: true },
    { name: "Music ministry", audience: ["All ages"], when: "Weekly rehearsals", icon: "music", colour: "#0d2644", tint: "#dceaf6", desc: "Choir, praise team and instrumentalists leading the church in worship. New voices always welcome.", sample: true },
    { name: "Prayer ministry", audience: ["All ages"], when: "Wednesdays, 7:00pm", icon: "heart-handshake", colour: "#b8475f", tint: "#f7e1e5", desc: "A team that prays for every request we receive, in confidence, and meets midweek to pray together.", sample: true },
    { name: "Family ministries", audience: ["Adults", "Children"], when: "Termly events", icon: "house", colour: "#2c7656", tint: "#dcefe4", desc: "Parenting seminars, marriage enrichment and family days out that strengthen homes.", sample: true }
  ],

  beliefs: [
    { n: 1, cat: "God", title: "The Holy Scriptures", ref: "2 Timothy 3:16-17", text: "The Bible is God's inspired Word and the trustworthy standard for faith and everyday life." },
    { n: 2, cat: "God", title: "The Trinity", ref: "Matthew 28:19", text: "There is one God: Father, Son and Holy Spirit, a unity of three eternal Persons." },
    { n: 3, cat: "God", title: "God the Father", ref: "John 3:16", text: "The Father is Creator, Source and Sustainer of all, and His love is fully shown in Jesus." },
    { n: 4, cat: "God", title: "God the Son", ref: "John 1:1-3, 14", text: "Jesus is fully God and fully human. He lived, died and rose again so we can be reconciled to God." },
    { n: 5, cat: "God", title: "God the Holy Spirit", ref: "John 16:7-13", text: "The Spirit draws people to Christ, renews hearts and equips the church with gifts." },
    { n: 6, cat: "Humanity", title: "Creation", ref: "Genesis 1-2", text: "God created the world in six days and rested on the seventh, giving us the Sabbath as a memorial." },
    { n: 7, cat: "Humanity", title: "The Nature of Humanity", ref: "Genesis 1:26-28", text: "We are made in God's image, a whole person of body, mind and spirit, depending on God for life." },
    { n: 8, cat: "Salvation", title: "The Great Controversy", ref: "Revelation 12:4-9", text: "The world is caught up in a conflict between Christ and Satan over God's character, law and love." },
    { n: 9, cat: "Salvation", title: "The Life, Death and Resurrection of Christ", ref: "2 Corinthians 5:14-21", text: "Through Christ's perfect life, sacrificial death and resurrection, God provides the only way of forgiveness." },
    { n: 10, cat: "Salvation", title: "The Experience of Salvation", ref: "Ephesians 2:8-10", text: "By grace through faith we are forgiven, accepted as God's children and given new life." },
    { n: 11, cat: "Salvation", title: "Growing in Christ", ref: "Colossians 2:6-7", text: "Jesus' victory frees us to grow through prayer, Scripture, worship and serving others." },
    { n: 12, cat: "Church", title: "The Church", ref: "Matthew 16:13-20", text: "The church is a community of believers who confess Jesus as Lord and gather to worship and serve." },
    { n: 13, cat: "Church", title: "The Remnant and Its Mission", ref: "Revelation 14:6-12", text: "In the last days God calls a people to keep His commandments and share the three angels' messages." },
    { n: 14, cat: "Church", title: "Unity in the Body of Christ", ref: "Galatians 3:27-29", text: "The church is one body drawn from every nation, culture and language, equal in Christ." },
    { n: 15, cat: "Church", title: "Baptism", ref: "Romans 6:1-6", text: "Baptism by immersion is a public declaration of faith in Jesus and entry into His church." },
    { n: 16, cat: "Church", title: "The Lord's Supper", ref: "1 Corinthians 11:23-30", text: "Foot washing, bread and cup remember Christ's death and look forward to His return." },
    { n: 17, cat: "Church", title: "Spiritual Gifts and Ministries", ref: "Romans 12:4-8", text: "God gives every member gifts to build up the church and serve the world." },
    { n: 18, cat: "Church", title: "The Gift of Prophecy", ref: "Joel 2:28-29", text: "Prophecy is a gift of the Spirit; Adventists believe it was shown in the ministry of Ellen G. White." },
    { n: 19, cat: "Christian life", title: "The Law of God", ref: "Exodus 20:1-17", text: "The Ten Commandments express God's love and will. Obedience is the fruit of salvation, not the cause." },
    { n: 20, cat: "Christian life", title: "The Sabbath", ref: "Exodus 20:8-11", text: "The seventh day is God's gift of rest and worship, kept from Friday sunset to Saturday sunset." },
    { n: 21, cat: "Christian life", title: "Stewardship", ref: "Malachi 3:8-12", text: "We care for God's gifts of time, abilities, money and the earth, returning tithe and giving offerings." },
    { n: 22, cat: "Christian life", title: "Christian Behaviour", ref: "1 Corinthians 6:19-20", text: "We aim to live in ways that honour God, including caring for our bodies and minds." },
    { n: 23, cat: "Christian life", title: "Marriage and the Family", ref: "Genesis 2:18-25", text: "Marriage is a lifelong covenant instituted by God, and families are places to grow in love." },
    { n: 24, cat: "Last things", title: "Christ's Ministry in the Heavenly Sanctuary", ref: "Hebrews 8:1-5", text: "Jesus ministers for us in the heavenly sanctuary, applying the benefits of His sacrifice." },
    { n: 25, cat: "Last things", title: "The Second Coming of Christ", ref: "Titus 2:13", text: "Jesus will return literally, personally and visibly. This is the church's blessed hope." },
    { n: 26, cat: "Last things", title: "Death and Resurrection", ref: "1 Thessalonians 4:13-17", text: "Death is like a sleep until Jesus returns and raises His people to eternal life." },
    { n: 27, cat: "Last things", title: "The Millennium and the End of Sin", ref: "Revelation 20", text: "After a thousand years, sin and its effects are ended forever and God's justice is made clear." },
    { n: 28, cat: "Last things", title: "The New Earth", ref: "Revelation 21:1-5", text: "God will make all things new: a home without pain or death, where His people live with Him forever." }
  ],

  // King James Version (public domain)
  verses: [
    { text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest.", ref: "Matthew 11:28" },
    { text: "The sabbath was made for man, and not man for the sabbath.", ref: "Mark 2:27" },
    { text: "God is our refuge and strength, a very present help in trouble.", ref: "Psalm 46:1" },
    { text: "Thy word is a lamp unto my feet, and a light unto my path.", ref: "Psalm 119:105" },
    { text: "They that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.", ref: "Isaiah 40:31" },
    { text: "This is the day which the LORD hath made; we will rejoice and be glad in it.", ref: "Psalm 118:24" },
    { text: "His compassions fail not. They are new every morning: great is thy faithfulness.", ref: "Lamentations 3:22-23" },
    { text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", ref: "Philippians 4:6" },
    { text: "Beloved, I wish above all things that thou mayest prosper and be in health, even as thy soul prospereth.", ref: "3 John 1:2" },
    { text: "I will come again, and receive you unto myself; that where I am, there ye may be also.", ref: "John 14:3" },
    { text: "Looking for that blessed hope, and the glorious appearing of the great God and our Saviour Jesus Christ.", ref: "Titus 2:13" },
    { text: "Remember the sabbath day, to keep it holy.", ref: "Exodus 20:8" },
    { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil.", ref: "Jeremiah 29:11" },
    { text: "Worship him that made heaven, and earth, and the sea, and the fountains of waters.", ref: "Revelation 14:7" }
  ],

  sabbathVerse: { text: "And God blessed the seventh day, and sanctified it: because that in it he had rested from all his work.", ref: "Genesis 2:3" }
} satisfies {
  church: Record<string, unknown> & { address: string[] };
  weekly: WeeklyItem[];
  events: ChurchEvent[];
  categories: Record<Category, { label: string; chip: string }>;
  sermons: Sermon[];
  seriesColours: Record<string, string>;
  ministries: Ministry[];
  beliefs: Belief[];
  verses: Verse[];
  sabbathVerse: Verse;
};

export const CHURCH = SITE.church;
