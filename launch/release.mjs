import fs from 'node:fs';
import path from 'node:path';

export const REVIEWED = '2026-09-17';
export const VERSION = 'dar-2026.09.17.1';
const game = 'https://www.roblox.com/games/92606991708989/Defeat-Anime-RNG';
const sources = {
  game,
  beebom: 'https://beebom.com/defeat-anime-rng-codes/',
  pocket: 'https://www.pockettactics.com/defeat-anime-rng-codes',
  pgg: 'https://progameguides.com/roblox/defeat-anime-rng-codes/',
  install: 'https://en.help.roblox.com/hc/en-us/articles/204473560-How-to-Install-and-Play-Roblox',
  connection: 'https://en.help.roblox.com/hc/en-us/articles/203312880-General-Connection-Problems',
  language: 'https://en.help.roblox.com/hc/en-us/articles/360001216486-Changing-Your-Account-Language',
};
const report = 'Reported active by the compared guides; not redeemed by DAR Guide.';
const conflict = 'Status disputed: Beebom/Pocket Tactics list it, while Pro Game Guides marks it inactive.';
export const codes = [
  ['bugfixessorry', '50 Trait Shards', 'Reported', report],
  ['consolebugfix', 'Reward not consistently specified', 'Reported', 'PGG reports 50 shards; the other compared guides leave the reward unspecified.'],
  ['5KCCU', '50 Trait Shards', 'Reported', 'PGG spells this 5kCCU. Capitalization differs between sources.'],
  ['4KCCU', '50 Trait Shards', 'Reported', 'PGG spells this 4kCCU. Capitalization differs between sources.'],
  ['3KCCU', '50 Trait Shards', 'Reported', 'PGG spells this 3kCCU. Capitalization differs between sources.'],
  ['2KCCU', '50 Trait Shards', 'Reported', 'PGG spells this 2kCCU. Capitalization differs between sources.'],
  ['1kCCU', '50 Trait Shards', 'Reported', report],
  ['1KLikes', '50 Trait Shards', 'Reported', report],
  ['bugfix', '50 Trait Shards', 'Disputed', conflict],
  ['Bugfixes1', '50 Trait Shards', 'Disputed', conflict],
  ['Update3', '75 Trait Shards', 'Disputed', conflict],
  ['Chainsaw', 'A Genius-mutated unit; name differs between sources', 'Disputed', conflict],
  ['Evangelion', 'Angelic Power', 'Disputed', conflict],
  ['Blossom', 'Blossom Power', 'Disputed', conflict],
  ['micropatch1', '30 Trait Shards', 'Disputed', conflict],
  ['UpdateTwo', '50 Trait Shards and 5 Luck Potions', 'Disputed', conflict],
  ['Release', '25 Trait Shards; 3 each of Luck, XP and Gold Potions', 'Disputed', conflict],
].map(([code, reward, status, note]) => ({ code, reward, status, note }));

const pages = [];
function page(category, slug, title, description, summary, body) {
  pages.push({ category, slug, title, description, summary, body });
}
page('codes', 'latest', 'Defeat Anime RNG Codes: Reported Rewards and Status',
  'Compare reported Defeat Anime RNG codes, copy rewards, see disputed expiry claims and follow the in-game redemption steps.',
  'This is a dated comparison of published code lists, not a claim that we redeemed every reward. Eight entries are reported active by the compared guides; nine have conflicting status reports. Start with the reported group and check each result in the game before counting a reward.',
`import CodeLedger from '~/components/dar/CodeLedger.astro';

## Which codes should you try first?

Start with the **Reported** rows below. We compared Beebom, Pocket Tactics and Pro Game Guides on September 17, 2026. Their snapshots disagree about several older codes, so those entries are separated as **Disputed**, rather than quietly advertised as working. No row is labelled personally tested.

<CodeLedger />

## How should you use this list?

Copy one code at a time, keep its spelling intact, and read the response in the game. A successful clipboard action only copies text: it does not redeem a reward. Do not total every row as guaranteed free currency, because expiry, account history and unlock conditions can change the result.

The CCU milestone codes have a capitalization discrepancy in one source. Their row notes preserve that disagreement. An error after trying one spelling is not enough to prove the entire list has expired. Record the exact spelling and the in-game response before drawing a conclusion.

## Where do you redeem them?

The compared guides point to the **Shop**, with a Codes field near its bottom and Enter to submit. Beebom and Pro Game Guides also report a Death Castle progression requirement; Pocket Tactics does not mention that prerequisite. Follow the current game's prompts rather than assuming every new account can immediately see the field. Our [redemption guide](/guides/code-redemption/) separates those steps from common errors.

## Why are there no automatic daily verification claims?

A date on this page records a source review, not a successful in-game redemption. The table is an editorial snapshot. A later deployment does not silently advance that date, and the site displays an age warning once the snapshot is over seven days old. Use the linked publisher pages and the game's own announcements when checking for more recent changes.

If a code works or fails for you, [report a correction](/contact/) with the code, game version, date and exact result. Do not include account credentials or private account screenshots.

## Sources

[Beebom](${sources.beebom}) · [Pocket Tactics](${sources.pocket}) · [Pro Game Guides](${sources.pgg}). Their displayed update dates were September 15–16, 2026 at review. This comparison does not establish independent in-game testing by this site.
`);
page('guides', 'gameplay-overview', 'Defeat Anime RNG Beginner Guide: Your First Session',
  'Learn the advertised rolling, merging and wave-defense loop, then use a practical first-session checklist without guessing rare-unit stats.',
  'Defeat Anime RNG combines collecting units with battles and progression. The developer listing confirms rolling, merging to raise levels, bosses, waves and new areas. Start by identifying those systems in your current version, then make one measurable improvement at a time. This is source-reviewed guidance, not a tested speedrun route.',
`## What game is this guide for?

Use the [Roblox listing](${game}) by **Defeat Anime Bosses**, experience ID **92606991708989**. Similar names in search results do not establish that another guide covers this experience. The developer listing describes rolling for units, using them against bosses, merging to increase levels, surviving waves and opening new areas. It also mentions rare units and mutations.

## What should you check during your first session?

Use this checklist as an observation plan, not a promised fastest route. The goal is to learn what your account can currently do before committing resources.

| Check | Record | Why it helps |
| --- | --- | --- |
| Your first available roll | Cost and displayed odds, if shown | Separates an affordable roll from a paid shortcut |
| Your first usable unit | Name, level and displayed combat stats | Gives you a baseline for later comparisons |
| A repeatable battle | Stage, clear time and rewards | Makes one change at a time measurable |
| An upgrade screen | Required resources and confirmation text | Reveals the actual cost before you accept |
| The next locked area | Its displayed requirement | Keeps your next goal specific |

Begin with the tutorial or prompts you actually see. Equip or use the unit according to the current UI. Once you can repeat a battle, compare an upgrade against that baseline instead of relying only on rarity labels. A single unusually fast clear is not conclusive: target selection, critical hits and other randomness can affect a run.

## Should you spend every resource immediately?

Our recommendation is to keep a small reserve until you understand the next unlock. This is a planning preference, not a game rule. The expensive option on screen is not automatically your most useful option. Read whether an action changes one unit, a whole team or a temporary effect, and compare that scope with the problem you are trying to solve.

For reported free rewards, use the [code ledger](/codes/latest/) and check actual redemption results. For trait currency, read [Trait Shards](/guides/traits-and-shards/). Do not treat an advertised code reward as part of your balance until it appears on your account.

## How do you choose what to improve?

When a battle is too slow, compare consistent damage output. When an upgrade looks irreversible, inspect the confirmation carefully. When you cannot reach the next area, use its stated requirement rather than a guessed level threshold. Our [unit comparison tool](/tools/unit-comparison/) helps with one narrow question: estimated single-target damage from values you enter. It does not rank every unit in the game.

## Source and scope

[Developer listing](${game}), including the supplied game-page capture reviewed September 17, 2026. Exact odds, merge recipes, unlock prices and a complete roster were not established by that listing and are not invented here. This page preserves the original gameplay-overview URL so existing links continue to work.
`);
page('guides', 'code-redemption', 'How to Redeem Defeat Anime RNG Codes and Diagnose Errors',
  'Find the reported Shop redemption path, understand the Death Castle prerequisite reports and distinguish missing menus from rejected codes.',
  'Published guides locate the Codes field inside the Shop and use Enter to submit. Two sources report that Death Castle must be unlocked first. When a code fails, separate a missing menu, a spelling issue and an account-specific rejection; they are different problems and need different checks.',
`## Where is the code box?

Beebom and Pro Game Guides describe opening **Shop**, scrolling toward the bottom, entering a code in the Codes field and pressing Enter. Both report a **Death Castle** unlock requirement. Pocket Tactics describes Shop or the top three-dot menu without naming that prerequisite. These are publisher reports, not a UI sequence personally tested by DAR Guide.

Use the current game's tutorial and labels first. If a guide's screenshot is from an earlier update, follow the visible label rather than a remembered position on the screen.

## What is the quickest sensible sequence?

1. Confirm the experience and creator using our [official links](/guides/official-links/).
2. Finish the prompts the game presents and inspect your available Shop options.
3. Copy one **Reported** entry from the [code ledger](/codes/latest/).
4. Paste it without leading or trailing spaces and submit using the current UI.
5. Read the result and inspect the relevant resource balance or inventory.

Do not claim a reward from a guide's copy button: redemption occurs in the game. Our website does not connect to your Roblox account or issue items.

## What does each kind of problem tell you?

| What you see | What to check next | What not to assume |
| --- | --- | --- |
| No Codes field | Tutorial progress, unlock requirement, current Shop layout | That every code is invalid |
| Text was rejected | Exact spelling, spaces and the row's source note | That a capitalization variant is confirmed working |
| Already used message | Your own redemption history | That the code has expired for everyone |
| Expired message | Record the exact code and date | That another code with a similar name is also expired |
| Game will not load | The [connection checklist](/guides/connection-errors/) | That this is a code-list problem |

The message examples are diagnostic categories, not a promise that the game uses those exact English strings. Copy the actual error when reporting a problem.

## How do you keep useful records?

A brief note is enough: code, exact response, approximate time and visible game update. You do not need to post an email address, password, login code or payment details. A screenshot of just the redemption message is more useful than a full account-settings page.

## Sources

[Beebom](${sources.beebom}), [Pro Game Guides](${sources.pgg}), [Pocket Tactics](${sources.pocket}); compared September 17, 2026. For disputed code status, the ledger shows the disagreement rather than choosing a convenient answer.
`);
page('guides', 'traits-and-shards', 'Trait Shards in Defeat Anime RNG: Uses and Spending Plan',
  'Understand the reported use of Trait Shards, separate them from unit rolls and plan a reroll budget without invented trait odds.',
  'Pro Game Guides reports using Trait Shards at the Traits stand to roll a selected character’s trait. Shards and unit acquisition are not interchangeable concepts. Before spending, check the cost, the unit you selected and what happens to its current trait. Set a budget before chasing a rare result.',
`## What are Trait Shards used for?

Pro Game Guides describes going to the **Traits** stand, selecting a character and rolling its trait with Trait Shards. It reports challenges and codes as sources of the currency. This is community-publisher documentation; the exact current cost and trait pool still need to be read in the game.

Several entries in the [code ledger](/codes/latest/) report shards. A publisher's reward description is not evidence that the code is still redeemable, so separate your actual balance from possible rewards.

## What should you check before rerolling?

Read the selected character's name and current trait. Then inspect the roll cost, any confirmation text and the available outcomes shown by the current UI. Do not assume that a result can be undone, that a trait carries over to another unit, or that every roll has the same probabilities unless the game states that.

| Question | Your note |
| --- | --- |
| Which unit am I changing? | Exact name and level |
| What is my current result? | Trait name and visible effect |
| What will one attempt cost? | Read the current screen |
| What resource amount can I afford to lose? | Set a maximum before starting |
| What would count as good enough? | A specific effect or measurable improvement |

These notes are a spending plan, not an optimal-build claim. A resource budget keeps a string of unsuccessful rolls from changing your goal halfway through.

## How do you estimate a budget?

If your balance is B and each attempt costs C, the number of attempts you can afford is the whole-number part of B divided by C. For example, **120 shards at a hypothetical cost of 3 per attempt allow 40 attempts**. Those figures demonstrate the calculation; they are not the game's confirmed price.

When a probability is displayed, the [roll-odds calculator](/tools/roll-odds/) can estimate a chance over a chosen number of independent attempts. Do not enter a guessed rarity or apply an unverified luck multiplier. A 95% estimate is still not a guarantee.

## When should you stop?

Our suggested stopping points are reaching your budget, obtaining your predefined acceptable result, or discovering that an upcoming unlock needs the same resources. Reassess after a meaningful change in your team rather than treating every newly rolled character as an automatic reason to spend again.

## Source and limits

[Pro Game Guides, Trait Shards section](${sources.pgg}), reviewed September 17, 2026. This page intentionally does not invent a full trait table, prices, pity system or probabilities.
`);
page('guides', 'units-and-merging', 'Defeat Anime RNG Units and Merging: Upgrade Checklist',
  'Separate unit level, traits and mutation claims, and use a before-and-after checklist when considering a merge or team upgrade.',
  'The developer describes merging units to raise their levels, but its listing does not provide an exact recipe or transfer rules. Treat the live confirmation screen as the authority for costs and consumed units. Compare upgrades against a repeatable battle rather than assuming a rarer name always performs better.',
`## What does the developer confirm about merging?

The [developer listing](${game}) explicitly describes merging anime units to increase their levels. It also lists rare units and mutations among the collection features. It does **not** establish how many copies a merge consumes, a maximum level, or how traits and mutations transfer. A useful guide must keep those missing details separate from the advertised feature.

## What information belongs in a unit record?

Record the exact in-game name, current level, displayed damage, attack timing if available, current trait and any visible mutation. Keep these as separate fields. Two screenshots of the same named unit may describe different upgrades, so a name-only comparison can hide the reason their performance differs.

Do not translate a name back from another language and assume it is official English. Use the current game's label whenever possible.

## What should you inspect before confirming a merge?

| Check | Why it matters |
| --- | --- |
| Which unit is the output? | Prevents comparing the wrong target |
| Which copies will be consumed? | Shows what you are giving up |
| What currencies are required? | Separates the material cost from the cash cost |
| Which attributes are explicitly retained? | Avoids assuming a trait or mutation transfers |
| Does the game offer a preview or warning? | Lets you base the decision on current information |

This is a safety checklist, not a description of buttons we have not tested. If the current interface does not explain an irreversible outcome, pause that upgrade and look for an official explanation. A small delay is better than confidently following an invented recipe.

## How can you compare the result?

Choose a repeatable stage and keep other conditions as similar as practical. Note the team, target, time and relevant temporary boosts. Change one thing, then repeat several times. A stronger-looking stat card alone does not show the effect of targeting, range, downtime or team support.

Use the [unit comparison calculator](/tools/unit-comparison/) for arithmetic from your own values. It models expected single-target damage only. It is not a replacement for observing a real battle and does not claim to be a definitive tier list.

## What does this site avoid ranking?

We do not publish a complete strongest-unit order without a verified roster and a consistent test setup. A tier table with precise-looking numbers is not useful when nobody can explain the version, conditions or source of those numbers. Our [editorial policy](/editorial-policy/) explains the evidence labels used across the site.

## Source

[Developer's Roblox listing](${game}), supplied listing capture reviewed September 17, 2026. The upgrade checklist and comparison method are DAR Guide's recommendations, not additional claims about undisclosed mechanics.
`);
page('guides', 'official-links', 'Defeat Anime RNG Official Game Link and Useful Resources',
  'Open the correct Roblox experience, distinguish official sources from community guides and find relevant support and gameplay videos.',
  'The game listing linked here identifies Defeat Anime Bosses as the creator and uses experience ID 92606991708989. Use that identity to avoid confusing similarly named anime games. Official platform support, publisher guides and creator videos serve different purposes and are labelled separately below.',
`## Where is the official game?

[Open Defeat Anime RNG on Roblox](${game}). The reference listing identifies **Defeat Anime Bosses** as the creator. Update labels may change the visible title; the experience ID is a more useful cross-check than a matching word in a search result.

Our own site is an independent guide, not the official Wiki and not an account-support service. Visiting this site does not require Roblox credentials.

## Which source should answer which question?

| Question | Starting point |
| --- | --- |
| Is this the correct experience? | The developer's Roblox listing |
| Why will Roblox not install or launch? | Roblox Support |
| What codes have publishers recently reported? | Our dated, linked code comparison |
| What does an action look like in a recorded session? | A relevant gameplay video, checking its version |
| What will a particular random chance mean over repeated attempts? | A calculator with explicit assumptions |

No one source answers every question. A code roundup is not proof of a complete unit roster, and an official installation article does not prove a game's current redeem-code requirements.

## Where can you see gameplay?

These are **community videos**, not official announcements and not recordings made by DAR Guide:

- [ItzVexo: Defeat Anime RNG guide](https://www.youtube.com/watch?v=fnUg5Z6FlLw).
- [Berlian kecil: codes and how-to-play guide](https://www.youtube.com/watch?v=AH2-AZWhKqk).

Open videos on YouTube when needed. We do not embed a third-party video player or autoplay one on this page. Compare the visible update and UI with your current game before relying on a recorded step.

## How do you find the developer's community?

Start from the game listing and follow social links that the developer actually exposes to your account. We do not invent an official Discord invite, promise a working Trello board or treat an unrelated Fandom page as authoritative. Invitations and platform visibility can change.

## Support and corrections

For platform issues, use [Roblox Support](https://www.roblox.com/support). For a mistake on this website, use [our correction channel](/contact/). These are different destinations: we cannot restore accounts, reverse purchases or distribute game rewards.

Resources reviewed September 17, 2026. External pages may change; a link is not an endorsement of every claim made on that page.
`);
page('guides', 'pc-setup', 'How to Play Defeat Anime RNG on PC and Use English Menus',
  'Follow the Roblox Player launch route, choose English in account settings and avoid confusing the game website with the installed client.',
  'On desktop, the Roblox website launches the Roblox Player application. Sign in on Roblox, open the correct experience and use Play; install the official player when prompted. English account language can be selected in Settings. These are platform steps, not a requirement to create an account on this guide website.',
`## Do you need a Roblox account and an app?

Roblox's official desktop instructions describe signing in, selecting an experience and launching Roblox Player. The website is the starting point; it is not the running game. Roblox Studio is the creation tool and is not the application you need merely to play.

This guide website has no login or payment form. Enter your Roblox credentials only through Roblox's own sign-in flow, not into a guide page that promises rewards.

## How do you start on Windows?

1. Open the [correct game listing](${game}) and sign in on Roblox.
2. Select the Play button. Its color may differ from older help screenshots.
3. When offered, download and run the installer from Roblox's website.
4. Return to the game listing and select Play again.
5. Accept the browser's prompt to open Roblox Player when you recognize it.

If the file has already downloaded, use your browser's downloads list rather than repeatedly downloading new copies. Read an error before retrying: a download problem, installer failure and sign-in failure happen at different stages.

## How do you switch the account interface to English?

Roblox documents this route: **Settings → Account Info → Personal → Language**. Choose English and let the page reload; use Save if the language change does not refresh the page. The account-language setting does not prove that every experience translates every item name, so confirm the actual in-game labels too.

You do not need to share your birthday, account-security page or verification codes with us to follow these steps.

## What should you do after the game opens?

Start with the game's current tutorial and the [first-session checklist](/guides/gameplay-overview/). Read labels before using resources. A visible Shop link does not necessarily mean every Shop feature is unlocked; our [redemption guide](/guides/code-redemption/) notes the published unlock reports.

If the player will not start, stop at the stage where it fails and use [connection and launch troubleshooting](/guides/connection-errors/). Do not download an unofficial replacement installer or pay someone merely to bypass an unexplained error.

## Official sources

[Install and play Roblox](${sources.install}); [change account language](${sources.language}). Reviewed September 17, 2026. We summarize the workflow rather than promising that a particular button position remains unchanged.
`);
page('guides', 'connection-errors', 'Defeat Anime RNG Not Loading: A Safe Troubleshooting Checklist',
  'Separate website, installer and game-session failures, collect useful error details and follow official Roblox troubleshooting safely.',
  'First identify where launch fails: website, installer, browser-to-player handoff or game session. An error number alone does not establish a cause. Try a current browser and a stable connection, then consult Roblox Support. Do not disable all security protections or assume that reinstalling fixes every problem.',
`## At what stage does the problem happen?

Use the stage, not just an error number, to choose your next check. A page returning an HTTP error is not the same thing as a running experience disconnecting.

| Stage | Useful detail to record | Next check |
| --- | --- | --- |
| Website or login | Page address and exact message | Can Roblox's main site load normally? |
| Download or installation | Installer message and operating system | Did the installer come from Roblox? |
| Opening Player | Browser prompt or missing response | Is Roblox selected as the app to open? |
| Joining the experience | In-game message and time | Do other experiences launch? |
| Mid-session disconnect | Full error and repeatability | Does the connection remain stable? |

The table is a diagnostic plan, not a guarantee that the next check identifies the cause.

## What safe checks come first?

Roblox recommends using an updated, supported browser and trying another browser when needed. It also discusses wireless stability, browser extensions and security software as possible contributors. Test one change at a time so you can tell what affected the result.

A wired connection can help distinguish a wireless problem when that option is available. Review a relevant browser extension's permissions or site-specific settings instead of permanently disabling every protection. For managed devices and networks, ask the administrator rather than bypassing access rules.

## Does a 404 or verification failure mean the game is broken?

No diagnosis follows from those words alone. Record whether the message came from a browser page, an installer or a Roblox window. An HTTP 404 normally concerns a requested resource not being found; it does not by itself prove an account ban, region restriction or a failure in this particular game.

Do not post private verification links or one-time codes in public. A cropped error message is enough for discussing the symptom; account recovery should stay in the official support flow.

## When should you reinstall or contact support?

Reinstallation appears in Roblox's general troubleshooting, but it is not the only step. Before repeatedly reinstalling, keep a short record: device model, operating system, full error, what you clicked, when it happened and recent network or software changes. Roblox asks for this kind of information when escalating a connection problem.

Use [Roblox Support](https://www.roblox.com/support) for account or platform assistance. Our [contact page](/contact/) is only for corrections to this website, not for receiving your credentials or remotely controlling your device.

## Source and scope

[Roblox: General Connection Problems](${sources.connection}), reviewed September 17, 2026. No specific incident or service-wide outage is asserted here. This checklist intentionally avoids unverified fixes, wide-open router changes and disabling the firewall altogether.
`);
page('tools', 'roll-odds', 'RNG Roll Odds Calculator: Chance Across Repeated Rolls',
  'Calculate the chance of at least one result from stated one-in-N odds, with 50% and 95% thresholds and transparent assumptions.',
  'Enter the effective one-in-N probability shown for the result you want and the number of rolls you plan. The calculator assumes independent attempts at a constant probability. It does not know Defeat Anime RNG’s hidden odds, luck multipliers or pity rules and never guarantees a drop.',
`import DecisionTool from '~/components/dar/DecisionTool.astro';

## What are your chances over repeated rolls?

<DecisionTool kind="odds" />

## What do the inputs mean?

**One in N** means a probability of 1 divided by N on each attempt. Use the effective probability for the specific result, not a guessed number from an unrelated game. **Rolls** is the number of attempts in the session you want to model. A previous unsuccessful session is not added as a guarantee that the next attempt must succeed.

This is a general probability tool for players of Defeat Anime RNG and other RNG games. It contains no extracted game data. The default numbers are examples, not a particular unit's confirmed odds.

## How is the result calculated?

For constant success probability p and n independent attempts, the chance of at least one success is **1 − (1 − p)^n**. The expected number of successes is **n × p**. Expected count is an average over repeated hypothetical sessions, not an inventory promise for your next session.

For example, hypothetical odds of one in 100 over 100 independent rolls give about **63.4%**, not 100%, for at least one success. At the same odds, 69 rolls reach at least 50% and 299 reach at least 95%. There is still a chance of getting no successes at either threshold.

## When should you not use this model?

| Situation | Why the simple calculation may not apply |
| --- | --- |
| A guaranteed reward after a set count | Attempts are no longer described only by constant independent odds |
| Odds change during a session | A single p does not describe every attempt |
| A limited pool is depleted | Outcomes may depend on earlier draws |
| A luck effect is undocumented | Guessing its multiplier invents an input |

When a game explicitly publishes different probabilities for each attempt, the no-success probabilities must be multiplied individually instead. This calculator does not infer that sequence.

## Is the result a spending recommendation?

No. Choose a time or resource limit independently of the estimate. A long unlucky streak does not make the next independent attempt more likely. Use [our shard planning guide](/guides/traits-and-shards/) to separate a budget from a hoped-for outcome.

## Method and privacy

The formula is shown above and implemented locally in your browser. No account connection is used, and the tool does not send your inputs to a server. Numerical edge cases, invalid input and the worked example are checked in the project's automated tests.
`);
page('tools', 'unit-comparison', 'Unit DPS Comparison Calculator: Compare Your Own Stats',
  'Compare two units using damage, attack interval, critical chance and uptime without relying on an invented Defeat Anime RNG tier list.',
  'Enter comparable stats for two units to estimate expected single-target damage per second. Use attack interval in seconds, not attacks per second. The tool is a mathematical comparison of your inputs, not a definitive tier list; it does not model area damage, support skills, targeting or enemy defenses.',
`import DecisionTool from '~/components/dar/DecisionTool.astro';

## Which of your two units has the higher estimated damage rate?

<DecisionTool kind="dps" />

## How do you enter comparable values?

Use both units' stats from the same game version and comparable upgrade states. **Damage per hit** is not the same quantity as a displayed DPS value. If the game gives only DPS, do not put that number into the damage-per-hit field and divide it again.

**Attack interval** is the number of seconds between attacks: an interval of 2 means one attack every two seconds. For critical chance, enter a percentage. The critical multiplier is the total critical-hit damage divided by ordinary-hit damage. A multiplier of 2 means double damage, not an extra 200%.

Set critical chance to zero when it is absent or unknown rather than assuming an undocumented bonus. The default values are demonstration inputs, not real character statistics.

## What formula is used?

Estimated damage rate is **damage ÷ interval × [1 + critical chance × (critical multiplier − 1)] × uptime**, with percentages converted to fractions. Uptime is a user-entered estimate of how much of the session the unit can actually attack.

A hypothetical 100 damage every two seconds, 20% critical chance, double-damage critical hits and full uptime produces an expected 60 DPS. The calculator computes an average damage rate, not the exact damage in every short fight.

## Why is this not a complete tier list?

A unit with lower single-target DPS might still offer useful crowd control, support, range or area attacks. Cost and accessibility can also affect a team decision. Those are separate comparisons, not hidden bonuses added to this calculator.

The labels A and B are deliberately generic: we have not established a complete current roster or assigned unverified character values. Treat the output as one input to your decision, then observe actual battles under repeatable conditions. See [the unit upgrade checklist](/guides/units-and-merging/) for a practical record of those conditions.

## What are the model's limits?

The formula assumes the entered rate and critical behavior describe the attack being compared. It does not handle every possible multi-hit skill, animation cancel, cap, immunity or damage-over-time interaction. If an ability behaves differently, use a model that represents it instead of forcing a misleading number into this form.

## Method and privacy

Calculations run on your device. Inputs are not submitted to Roblox or to a DAR Guide server. The mathematical examples and input validation are covered by automated tests, while any game stats you enter remain your own observations.
`);

const policies = {
  about: ['About DAR Guide', 'Learn what DAR Guide covers, who maintains the site and how its source-reviewed guides differ from official game documentation.', `<p>DAR Guide is an independent English-language guide to Defeat Anime RNG, maintained through the <a href="https://github.com/always1ov/AnvilWiki">always1ov/AnvilWiki repository</a>. The editorial label “DAR Guide Editorial” describes this site's publishing role, not a claim of a large reporting team.</p><h2>What you will find</h2><p>Source-linked code comparisons, introductory guides and browser-based probability and damage calculators. We separate developer descriptions, publisher reports and mathematical examples. We do not claim to have personally tested every mechanic.</p><h2>What this site is not</h2><p>We are not affiliated with Roblox or Defeat Anime Bosses. We cannot issue rewards, recover accounts or change a player's data. This is a guide, not the game itself.</p><h2>How it is built</h2><p>The site uses the MIT-licensed AnvilWiki template and static hosting. Read the <a href="/editorial-policy/">editorial policy</a> or <a href="/contact/">send a correction</a>.</p>`],
  'editorial-policy': ['Editorial Policy and Sources', 'Our policy for source attribution, conflicting reports, AI-assisted drafting, review dates, corrections and calculator assumptions.', `<h2>Evidence comes before a confident claim</h2><p>Developer statements are labelled as developer information. Community-publisher reports are attributed. A source review does not mean we independently played through the step. First-hand testing will be labelled only when it actually happens.</p><h2>Conflicting reports</h2><p>When code lists disagree, the ledger shows a disputed status. We do not turn conflicting evidence into a guaranteed reward, silently choose the newest-looking date or invent a missing roster.</p><h2>AI-assisted work</h2><p>AI assists with research organization, drafting, code and checks. Source links, explicit limits and corrections remain necessary. No fictional author biography, screenshot or in-game test is presented as real.</p><h2>Review dates</h2><p>A review date records a source or editorial check. It is not automatically refreshed by deployment. Code results can change between reviews. Calculators show their formulas and state when their assumptions do not apply.</p><h2>Corrections</h2><p>Use the <a href="/contact/">correction channel</a> with the affected URL, claim and supporting evidence. A public correction request should not contain personal account information.</p>`],
  contact: ['Contact and Corrections', 'Send a public editorial correction through the site repository, with the page, claim, version and source needed to investigate it.', `<p>For a site correction, leave a comment on the <a href="https://github.com/always1ov/AnvilWiki/pull/1">DAR Guide repository discussion on GitHub</a>. A GitHub account is required to post, and comments are public. This is an actual contact channel, not a non-working form.</p><h2>What to include</h2><p>Include the page URL, the sentence or code concerned, what should change, and a source or cropped screenshot. For game behavior, add the visible version and observation date. Response times are not guaranteed.</p><h2>What not to send</h2><p>Do not post passwords, session cookies, verification codes, payment details or identity documents. Do not use this public channel for account recovery. For Roblox account or platform help, go directly to <a href="https://www.roblox.com/support">Roblox Support</a>.</p><h2>Content ownership requests</h2><p>Identify the material, its URL and the basis for your request using the same channel. Keep sensitive personal details out of a public comment.</p>`],
  'privacy-policy': ['Privacy Policy', 'Read how this static guide handles local preferences, calculator inputs, hosting requests and links to third-party services.', `<p>Effective September 17, 2026. This notice describes the current DAR Guide release.</p><h2>No site accounts or payments</h2><p>This site does not request a Roblox password, provide user accounts, take payments or operate a newsletter signup. It currently includes no advertising, Google Analytics or Giscus comments.</p><h2>On-device features</h2><p>Search uses a downloaded site index. Calculator values are processed in your browser, not sent to a server by our tool code. Theme or language preferences may be stored locally by the template. You can clear them in your browser's site-data controls.</p><h2>Hosting</h2><p>Requests pass through Cloudflare to deliver and secure the website. Network information, such as an IP address and request metadata, is necessarily processed by the hosting provider. See <a href="https://www.cloudflare.com/privacypolicy/">Cloudflare's privacy policy</a>.</p><h2>External links</h2><p>Roblox, YouTube, publishers and GitHub have their own policies. This release links to community videos instead of embedding a player. Public correction comments are stored on GitHub, not in a database run by this site.</p><h2>Changes and contact</h2><p>Enabling analytics, advertising or forms would require revisiting this notice and any applicable consent requirements. For questions about this website, use <a href="/contact/">Contact</a>.</p>`],
  'terms-of-service': ['Terms of Use', 'Understand the informational scope of the guide, the limits of code and calculator results, and the role of external services.', `<p>Effective September 17, 2026. DAR Guide provides independent informational content and mathematical tools. It is not the game operator.</p><h2>No reward or performance guarantee</h2><p>Game updates and account conditions can change results. A reported code may no longer redeem. Calculator outputs depend on supplied inputs and published assumptions and are not a promise of an outcome or a recommendation to spend money.</p><h2>External services</h2><p>Playing requires following Roblox's own account and platform rules. We cannot recover an account, reverse purchases, bypass verification or modify game data.</p><h2>Responsible use</h2><p>Do not submit credentials or sensitive account data through public correction channels. Do not present this site as an official Roblox or developer service.</p><h2>Errors and updates</h2><p>We welcome substantiated corrections through <a href="/contact/">Contact</a>. Content and tools may change as errors are corrected or better evidence becomes available. Nothing here removes rights that applicable law does not allow to be waived.</p>`],
  copyright: ['Copyright and Attribution', 'Read the attribution for the AnvilWiki template and the distinction between original guide content and game-owner materials.', `<h2>Template</h2><p>This site is built from <a href="https://github.com/PNGTRID/AnvilWiki">AnvilWiki</a>, an MIT-licensed project. Its license and attribution remain in the repository.</p><h2>Game names and third-party material</h2><p>Roblox, Defeat Anime RNG and related game materials belong to their respective owners. Referencing them identifies the subject of the guide and does not imply endorsement.</p><h2>Our content</h2><p>The guide prose, comparison presentation and tool interface are prepared for this site. Third-party articles are linked and summarized rather than copied wholesale. The code ledger records factual reported codes and explicitly separates disputed claims.</p><h2>Requests</h2><p>For an attribution correction or a content-ownership concern, use <a href="/contact/">the contact channel</a> and identify the affected material.</p>`],
};
const htmlEscape = (s) => s.replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

export function applyRelease({ siteUrl, commit, publishReady }) {
  const write = (file, text) => { fs.mkdirSync(path.dirname(file), { recursive: true }); fs.writeFileSync(file, text); };
  for (const entry of pages) {
    const meta = { title: entry.title, description: entry.description, category: entry.category, date: REVIEWED, lastModified: REVIEWED, tags: [], author: 'DAR Guide Editorial', summary: entry.summary, draft: false };
    const frontmatter = Object.entries(meta).map(([key,value]) => `${key}: ${JSON.stringify(value)}`).join('\n');
    write(`src/content/wiki/en/${entry.category}/${entry.slug}.mdx`, `---\n${frontmatter}\n---\n\n${entry.body}\n`);
  }
  const catalog = pages.map(({ body, ...entry }) => ({ ...entry, href: `/${entry.category}/${entry.slug}/` }));
  write('src/config/dar-data.json', JSON.stringify({ reviewed: REVIEWED, codes, catalog, sources }, null, 2));
  write('public/dar-tools.js', fs.readFileSync('launch/tools.mjs', 'utf8'));
  write('public/dar-build.json', JSON.stringify({ version: VERSION, commit, siteUrl, reviewed: REVIEWED, contentPages: pages.length, publishReady }, null, 2));
  fs.appendFileSync('src/config/site.ts', `\n// Release identity: do not identify this independent publisher as the game developer.\nsite.name = 'Defeat Anime RNG Guide';\nsite.shortName = 'DAR Guide';\nsite.defaultAuthor = 'DAR Guide Editorial';\nsite.sameAs = [];\nsite.social = { official: ${JSON.stringify(game)} };\n`);
  write('src/components/dar/CodeLedger.astro', `---
import data from '~/config/dar-data.json';
---
<section class="dar-ledger" aria-label="Reported code comparison">
  <p class="dar-note" data-code-reviewed={data.reviewed}>Sources checked {data.reviewed}. Reported means publisher-reported, not personally redeemed.</p>
  <label class="dar-filter">Find a code or status<input data-code-filter type="search" placeholder="Search code, reward or disputed" /></label>
  <p data-code-count aria-live="polite">{data.codes.length} listed codes</p>
  <div class="dar-table-wrap"><table><thead><tr><th scope="col">Code</th><th scope="col">Reported reward</th><th scope="col">Evidence</th><th scope="col">Copy</th></tr></thead><tbody>{data.codes.map((row) => <tr data-code-row><td><code>{row.code}</code></td><td>{row.reward}</td><td><span class:list={['dar-badge', { 'dar-disputed': row.status === 'Disputed' }]}>{row.status}</span><small>{row.note}</small></td><td><button type="button" data-copy-code={row.code} aria-label={'Copy ' + row.code}>Copy</button></td></tr>)}</tbody></table></div>
  <p data-copy-status role="status" aria-live="polite"></p>
  <p class="dar-note">Sources: <a href={data.sources.beebom}>Beebom</a>, <a href={data.sources.pocket}>Pocket Tactics</a>, <a href={data.sources.pgg}>Pro Game Guides</a>. Read the status notes before trying older entries.</p>
</section>
<script is:inline type="module" src="/dar-tools.js"></script>
`);
  write('src/components/dar/DecisionTool.astro', `---
interface Props { kind: 'odds' | 'dps'; }
const { kind } = Astro.props;
const fields = [
  { key: 'damage', label: 'Damage per hit', value: 100, min: 0, max: 1e15, step: 'any' },
  { key: 'interval', label: 'Seconds between attacks', value: 2, min: 0.001, max: 1e6, step: 'any' },
  { key: 'crit', label: 'Critical chance (%)', value: 0, min: 0, max: 100, step: 'any' },
  { key: 'mult', label: 'Critical damage multiplier', value: 2, min: 1, max: 1000, step: 'any' },
  { key: 'uptime', label: 'Attacking uptime (%)', value: 100, min: 0, max: 100, step: 'any' },
];
---
<form class="dar-tool" data-dar-form={kind}>
  {kind === 'odds' ? <div class="dar-form-grid"><label>One in N chance<input required name="denominator" type="number" min="1" max="1000000000000" step="any" value="100" /></label><label>Number of rolls<input required name="rolls" type="number" min="0" max="1000000000000" step="1" value="100" /></label></div> : <div class="dar-form-grid">{['A','B'].map((unit) => <fieldset><legend>Unit {unit}</legend>{fields.map((field) => <label>{field.label}<input required type="number" name={field.key + unit} min={field.min} max={field.max} step={field.step} value={field.key === 'damage' && unit === 'B' ? 120 : field.value} /></label>)}</fieldset>)}</div>}
  <p class="dar-note">Example inputs only — not verified game stats. Calculations stay in your browser.</p>
  <button class="btn-primary" type="submit">Calculate</button>
  <output data-result aria-live="polite">Enter your values, then choose Calculate.</output>
  <noscript>JavaScript is needed for the interactive calculator. The formula and examples are written below.</noscript>
</form>
<script is:inline type="module" src="/dar-tools.js"></script>
`);
  write('src/components/home/HomePage.astro', `---
import LocaleLayout from '~/components/layout/LocaleLayout.astro';
import data from '~/config/dar-data.json';
const { locale = 'en', jsonLd = [], alternates = [] } = Astro.props;
const featured = [data.catalog.find((p) => p.slug === 'latest'), data.catalog.find((p) => p.slug === 'gameplay-overview'), data.catalog.find((p) => p.slug === 'roll-odds')].filter(Boolean);
const guides = data.catalog.filter((p) => p.category === 'guides');
---
<LocaleLayout locale={locale} title="Defeat Anime RNG Guide: Codes, Beginners and Tools" description="Source-linked Defeat Anime RNG codes, beginner guides and free roll-odds and unit-comparison calculators. Independent and English-first." jsonLd={jsonLd} alternates={alternates}>
  <section class="dar-hero" data-pagefind-body>
    <div><p class="dar-eyebrow">Independent Roblox guide · English</p><h1>Make your<br /><span>next roll count.</span></h1><p class="dar-lead">Defeat Anime RNG codes, clear starter guides and tools that show their working. Less guesswork. More useful answers.</p><div class="dar-actions"><a class="btn-primary" href="/codes/latest/">Browse reported codes →</a><a class="btn-outline" href="/guides/gameplay-overview/">Start with the basics</a></div><p class="dar-note">Sources reviewed {data.reviewed} · No account needed to read</p></div>
    <aside class="dar-hero-card"><p class="dar-eyebrow">Your field guide</p><h2>From first roll<br />to informed upgrade.</h2><a href="/codes/latest/"><span>01</span><strong>Codes & rewards</strong><small>Reported and disputed, clearly separated</small></a><a href="/tools/unit-comparison/"><span>02</span><strong>Compare your units</strong><small>Calculate from your own stats</small></a><a href="/guides/official-links/"><span>03</span><strong>Find the right game</strong><small>Developer listing and support resources</small></a></aside>
  </section>
  <section class="dar-section"><div class="dar-section-heading"><div><p class="dar-eyebrow">Start here</p><h2>Answers you can use.</h2></div><a href="/guides/">All guides →</a></div><div class="dar-card-grid">{featured.map((entry, index) => <a class="dar-card" href={entry.href}><span class="dar-card-number">0{index + 1}</span><p class="dar-eyebrow">{entry.category}</p><h3>{entry.title}</h3><p>{entry.description}</p><strong>Open guide →</strong></a>)}</div></section>
  <section class="dar-section dar-split"><div><p class="dar-eyebrow">A practical library</p><h2>Learn one system<br />at a time.</h2><p>Follow the live game's labels. Use sources for context, and calculators for the assumptions you can actually explain.</p><a href={data.sources.game} class="btn-outline" target="_blank" rel="noopener noreferrer">Open the official Roblox game ↗</a></div><div class="dar-guide-list">{guides.map((entry) => <a href={entry.href}><strong>{entry.title}</strong><span>Read →</span></a>)}</div></section>
  <section class="dar-section dar-trust"><div><p class="dar-eyebrow">Built on clear evidence</p><h2>No invented rankings.<br />No hidden assumptions.</h2></div><p>Publisher reports are attributed. Conflicting code claims stay visible. Our calculators use your inputs, not a made-up roster. <a href="/editorial-policy/">Read the editorial policy →</a></p></section>
</LocaleLayout>
`);
  for (const [slug, [title, description, content]] of Object.entries(policies)) {
    write(`src/pages/${slug}.astro`, `---\nimport LocaleLayout from '~/components/layout/LocaleLayout.astro';\nconst content = ${JSON.stringify(content)};\n---\n<LocaleLayout locale="en" title=${JSON.stringify(title)} description=${JSON.stringify(description)}><article class="prose mx-auto max-w-3xl dark:prose-invert" data-pagefind-body><h1>${htmlEscape(title)}</h1><p class="text-sm">Last editorial review: ${REVIEWED}</p><div set:html={content} /></article></LocaleLayout>\n`);
  }
  write('src/pages/faq.astro', `---
import LocaleLayout from '~/components/layout/LocaleLayout.astro';
const items = [
  ['Is this the official Wiki?', 'No. DAR Guide is an independent fan guide, not affiliated with Roblox or Defeat Anime Bosses.'],
  ['Are all listed codes personally tested?', 'No. The code ledger compares dated publisher reports and visibly separates disputed status claims.'],
  ['Does this website require my Roblox login?', 'No. Reading guides and using the calculators do not require an account here. Playing the game uses Roblox’s own sign-in flow.'],
  ['Are calculator defaults actual character stats?', 'No. They are mathematical examples. Replace them with values you can verify in the current game.'],
  ['Do you have a definitive unit tier list?', 'No verified complete ranking is published. The unit-comparison tool instead explains exactly what can be calculated from supplied inputs.'],
];
---
<LocaleLayout locale="en" title="Frequently Asked Questions" description="Answers about this independent guide, reported codes, source reviews, account privacy and the limits of our game calculators."><article class="prose mx-auto max-w-3xl dark:prose-invert" data-pagefind-body><h1>Frequently asked questions</h1>{items.map(([q,a]) => <section><h2>{q}</h2><p>{a}</p></section>)}<p><a href="/contact/">Report a correction</a> · <a href="/codes/latest/">View codes</a> · <a href="/tools/">Open tools</a></p></article></LocaleLayout>
`);
  write('src/components/footer/SiteFooter.astro', `---
---
<footer class="dar-footer"><div><a href="/"><strong>DAR Guide</strong></a><p>Independent English guide to Defeat Anime RNG.<br />Not affiliated with Roblox or Defeat Anime Bosses.</p></div><nav aria-label="Footer"><a href="/about/">About</a><a href="/editorial-policy/">Editorial policy</a><a href="/contact/">Contact</a><a href="/faq/">FAQ</a><a href="/privacy-policy/">Privacy</a><a href="/terms-of-service/">Terms</a><a href="/copyright/">Attribution</a><a href="/rss.xml">RSS</a></nav><p class="dar-note">Built with <a href="https://github.com/PNGTRID/AnvilWiki">AnvilWiki</a>. Game names and materials belong to their respective owners.</p></footer>
`);
  fs.appendFileSync('src/styles/globals.css', `
/* DAR Guide release: responsive components without external fonts or art. */
.dar-hero{display:grid;grid-template-columns:1.15fr 1fr;gap:3.5rem;align-items:center;padding:3.5rem 0 4rem}.dar-eyebrow{font-size:.72rem;font-weight:750;letter-spacing:.13em;text-transform:uppercase;color:hsl(var(--muted-foreground));margin:0 0 .8rem}.dar-hero h1{font-size:clamp(2.8rem,5.6vw,5rem);line-height:1.05;letter-spacing:-.055em;font-weight:850;margin:1rem 0}.dar-hero h1 span{color:hsl(var(--brand))}.dar-lead{max-width:33rem;font-size:1.07rem;line-height:1.8;color:hsl(var(--muted-foreground));margin:1.3rem 0}.dar-actions{display:flex;flex-wrap:wrap;gap:.75rem;margin:1.5rem 0}.dar-note{font-size:.8rem;line-height:1.7;color:hsl(var(--muted-foreground))}.dar-hero-card{background:linear-gradient(140deg,#211439,#392061);color:#fff;border-radius:1.5rem;padding:2rem;box-shadow:0 22px 60px #27154414}.dar-hero-card .dar-eyebrow{color:#d0bcec}.dar-hero-card h2{font-size:2rem;line-height:1.18;font-weight:750;letter-spacing:-.035em;margin:1rem 0 1.5rem}.dar-hero-card a{display:grid;grid-template-columns:2rem 1fr;gap:0 .65rem;padding:1rem 0;border-top:1px solid #ffffff22}.dar-hero-card a span{grid-row:span 2;color:#c4b5fd;font-size:.8rem}.dar-hero-card a small{color:#d5c9e9;font-size:.78rem;margin-top:.3rem}.dar-section{padding:2.8rem 0;border-top:1px solid hsl(var(--border))}.dar-section h2{font-size:clamp(1.8rem,3vw,2.5rem);font-weight:750;letter-spacing:-.04em;line-height:1.15}.dar-section-heading{display:flex;align-items:end;justify-content:space-between;gap:1rem;margin-bottom:1.5rem}.dar-section-heading>a,.dar-trust a{font-size:.87rem;color:hsl(var(--brand));font-weight:650}.dar-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1.1rem}.dar-card{display:flex;flex-direction:column;align-items:start;padding:1.5rem;border:1px solid hsl(var(--border));border-radius:1rem;transition:transform .15s,border-color .15s}.dar-card:hover{transform:translateY(-3px);border-color:hsl(var(--brand))}.dar-card-number{font-size:1.7rem;color:hsl(var(--brand));font-weight:750;margin-bottom:1rem}.dar-card h3{font-size:1.15rem;line-height:1.4;font-weight:700;margin-bottom:.7rem}.dar-card>p:not(.dar-eyebrow){font-size:.87rem;line-height:1.7;color:hsl(var(--muted-foreground));margin-bottom:1.3rem}.dar-card>strong{font-size:.85rem;margin-top:auto;color:hsl(var(--brand))}.dar-split{display:grid;grid-template-columns:1fr 1.4fr;gap:3rem}.dar-split>div>p:not(.dar-eyebrow){line-height:1.8;margin:1rem 0 1.5rem;color:hsl(var(--muted-foreground))}.dar-guide-list a{display:flex;justify-content:space-between;gap:1rem;padding:1rem 0;border-bottom:1px solid hsl(var(--border));font-size:.88rem}.dar-guide-list a span{white-space:nowrap;color:hsl(var(--brand))}.dar-trust{display:grid;grid-template-columns:1fr 1fr;gap:2rem;align-items:center}.dar-trust>p{font-size:.95rem;line-height:1.8;color:hsl(var(--muted-foreground))}.dar-trust a{display:block;margin-top:.8rem}.dar-footer{max-width:80rem;margin:1rem auto 0;padding:2rem 1rem;border-top:1px solid hsl(var(--border));font-size:.85rem}.dar-footer p{margin:.65rem 0;color:hsl(var(--muted-foreground));line-height:1.7}.dar-footer nav{display:flex;flex-wrap:wrap;gap:1rem;margin:1.5rem 0}.dar-tool,.dar-ledger{margin:1.5rem 0}.dar-tool{padding:1.4rem;border:1px solid hsl(var(--border));border-radius:1rem;background:hsl(var(--muted)/.35)}.dar-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1.4rem}.dar-tool label,.dar-filter{display:block;font-size:.85rem;font-weight:600;margin-bottom:.8rem}.dar-tool input,.dar-filter input{display:block;width:100%;margin-top:.35rem;border:1px solid hsl(var(--border));border-radius:.45rem;background:hsl(var(--background));color:hsl(var(--foreground));padding:.65rem;font:inherit}.dar-tool fieldset{min-width:0}.dar-tool legend{font-weight:750;margin-bottom:1rem}.dar-tool output{display:block;padding:1rem;margin-top:1rem;border-radius:.5rem;background:hsl(var(--background));line-height:1.8;font-size:.9rem;overflow-wrap:anywhere}.dar-tool output[data-error=true]{color:#b91c1c}.dar-table-wrap{max-width:100%;overflow-x:auto}.dar-ledger table{width:100%;min-width:570px;font-size:.85rem}.dar-ledger th,.dar-ledger td{text-align:left;vertical-align:top;padding:.8rem .6rem;border-bottom:1px solid hsl(var(--border))}.dar-ledger td:first-child{white-space:nowrap}.dar-ledger small{display:block;font-size:.73rem;line-height:1.6;margin-top:.4rem;color:hsl(var(--muted-foreground))}.dar-badge{display:inline-block;border-radius:999px;padding:.1rem .55rem;background:#ede9fe;color:#5b21b6;font-size:.73rem;font-weight:700}.dar-disputed{background:#fff0cd;color:#854d0e}.dar-ledger button{border:1px solid hsl(var(--border));border-radius:.4rem;padding:.4rem .65rem;font:inherit;background:hsl(var(--background))}.dar-ledger [hidden]{display:none}button:focus-visible,a:focus-visible,input:focus-visible{outline:3px solid #a78bfa;outline-offset:3px}.prose{overflow-wrap:anywhere}.dark .dar-tool output[data-error=true]{color:#fca5a5}@media(max-width:760px){.dar-hero,.dar-split,.dar-trust{grid-template-columns:1fr;gap:1.7rem}.dar-hero{padding:1.5rem 0 2.5rem}.dar-hero-card{padding:1.5rem}.dar-card-grid{grid-template-columns:1fr}.dar-section{padding:2rem 0}.dar-section-heading{align-items:start}.dar-form-grid{grid-template-columns:1fr}.dar-tool{padding:1rem}.dar-split h2 br{display:none}}@media(prefers-reduced-motion:reduce){.dar-card{transition:none}.dar-card:hover{transform:none}}
`);
  write('src/pages/robots.txt.ts', `export function GET(){return new Response(${JSON.stringify(`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap-index.xml\n`)},{headers:{'Content-Type':'text/plain; charset=utf-8'}});}\n`);
  write('public/_redirects', '/sitemap.xml /sitemap-index.xml 301\n');
  write('public/_headers', `/*\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: strict-origin-when-cross-origin\n  Permissions-Policy: camera=(), microphone=(), geolocation=()\n  X-Frame-Options: SAMEORIGIN\n${publishReady ? '' : '  X-Robots-Tag: noindex, nofollow\n'}\n/dar-build.json\n  Cache-Control: no-store\n/dar-tools.js\n  Cache-Control: no-cache\n`);
  return { pages: catalog, version: VERSION };
}
