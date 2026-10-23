/*
 * Stock photography from Unsplash (see public/images/CREDITS.md).
 * Swap these files for real photos of the Bradley congregation; keep the
 * same filenames and nothing else needs to change. Static imports give
 * Next.js the dimensions and a blur placeholder for each photo.
 */
import heroCongregation from "../../public/images/hero-congregation.jpg";
import welcomeGreeting from "../../public/images/welcome-greeting.jpg";
import fellowshipAfterService from "../../public/images/fellowship-after-service.jpg";
import childrenInChurch from "../../public/images/children-in-church.jpg";
import childBible from "../../public/images/child-bible.jpg";
import bibleStudy from "../../public/images/bible-study.jpg";
import fellowshipLunch from "../../public/images/fellowship-lunch.jpg";
import communityServing from "../../public/images/community-serving.jpg";
import prayerHandsBible from "../../public/images/prayer-hands-bible.jpg";
import prayerQuiet from "../../public/images/prayer-quiet.jpg";
import sabbathSunsetBible from "../../public/images/sabbath-sunset-bible.jpg";
import openHands from "../../public/images/open-hands.jpg";
import worship from "../../public/images/worship.jpg";
import congregation from "../../public/images/congregation.jpg";
import embrace from "../../public/images/embrace.jpg";

export const IMG = {
  heroCongregation, welcomeGreeting, fellowshipAfterService, childrenInChurch, childBible, bibleStudy,
  fellowshipLunch, communityServing, prayerHandsBible, prayerQuiet, sabbathSunsetBible, openHands,
  worship, congregation, embrace
};

export type ImgKey = keyof typeof IMG;
