/**
 * Knowledge base appended to the system prompt, gives the model factual
 * grounding about the 13 brands we cover and general Canadian-outside-
 * Ontario casino context. Compact by design (token budget).
 */

export const KNOWLEDGE_BASE = `
### THE 13 BRANDS WE COVER

**Jackpot City**, Bayton family. Operator: Baytree Interactive Ltd. Licence: Kahnawake #00892 (issued 16 Feb 2022). Online since 1998. Software: Games Global (Microgaming) + On Air, Pragmatic Play, Hacksaw, Blueprint. Welcome: C$1,600 over 4 deposits + 10 daily Free Shots at a C$1M jackpot. Wagering: 35× bonus. Min deposit: C$10. eCOGRA seal. Casino.Guru 8.0 / Trustpilot 4.0.

**Spin Casino**, Bayton family. Same operator (Baytree Interactive Ltd) + same Kahnawake #00892. Online since 2001 (originally Spin Palace). Welcome: C$1,000 over 3 deposits + 10 daily spins. Wagering: 35×. Loyalty Club is the brand's identity, points usable across all 4 Bayton sites. Casino.Guru 8.2 / Trustpilot 4.0.

**Ruby Fortune**, Bayton family. Same operator (Baytree Interactive Ltd) + Kahnawake #00892. Online since 2003. Welcome: C$750 over 3 deposits + 10 daily spins. Wagering: 35×. Over 450 games stated on-site (smallest of family, most jackpot-forward). Casino.Guru 7.7 / Trustpilot 1.9 (small base).

**Royal Vegas**, Bayton family. Same operator + Kahnawake #00892. Online since 2000. Welcome: C$1,200 over 4 deposits + 10 daily spins. Wagering: 35×. Software: Games Global + Evolution Live. Table-game / live-dealer specialist of the family. Casino.Guru 7.7 / Trustpilot 2.3.

**Yukon Gold**, Casino Rewards group. Operator: Fresh Horizons Ltd. Licence: Kahnawake #00972 (+ AGCO for Ontario site). Online since 2004. Welcome: 150 chances for C$10 + 100% match up to C$150 on deposit 2. Free-spin wagering ~200×. Mega Moolah jackpot pool ~C$11M. eCOGRA monthly payout audits (~96.38% RTP). C$4,000 weekly withdrawal cap (group-standard). Casino.Guru 9.5 / Trustpilot 4.2.

**Betway Casino**, Super Group (NYSE: SGHC). Licence: MGA/B2C/130/2006 (verified active) + UKGC #39372. Online since 2006. Software: Games Global, Evolution, NetEnt, Pragmatic, Play'n GO, Red Tiger, IGT, Playtech. ~500+ titles, 75–120+ live tables. Welcome: 100% first-deposit match. Wagering: 50×. Max bet during WR: ~C$7.50. Min deposit: C$10. Withdrawal: ~72h pending + 3–8 banking days. Native iOS/Android apps. 24/7 chat + phone 1-877-811-2604. Casino.Guru 9.1.

**Betway Sports**, Same operator (Super Group) + same licences (MGA Type 2 + UKGC). 30+ sports, 30,000+ markets, dedicated esports portal (CS:GO, Dota 2, LoL, Valorant). Welcome: C$200 first-bet refund + 20 spins, OR 100% match up to C$300 + 50 spins. Match bonus 10× wagering. Free bets: no wagering. Bet Builder, same-game multis, cash-out. Interac payouts 1–3 business days (faster than casino side). Apps: iOS 4.6★ / Android 4.5★.

**Casino Classic**, Casino Rewards group. Fresh Horizons Ltd / Kahnawake #00972. Online since 1999 (longest in this comparison). UNIQUE: FREE no-deposit chance at a Mega Money Wheel jackpot (the only no-deposit entry in our 13). Then $1 buys 40 more chances, 2nd-deposit 100% match up to C$200. 37 verified providers per Casino.Guru Gamecheck. Casino.Guru 9.5 / Trustpilot 4.5 (highest in Casino Rewards group).

**Golden Tiger**, Casino Rewards group. Same operator + Kahnawake #00972. Online since 2000. Welcome: up to C$1,500 over 5 deposits (100%/50%/20%/30%/100%, caps C$500/300/300/300/100). BIGGEST headline in the Casino Rewards group. RTP / "Highest Win Rate" guarantee promoted. Multi-tier VIP with status matching, priority support. Casino.Guru 9.5 / Trustpilot 4.3.

**Grand Mondial**, Casino Rewards group. Same operator + Kahnawake #00972. Online since ~2005–2006. Welcome: 150 chances for C$10 + 100% match up to C$250 on deposit 2 (most generous single match top-up among "chances" brands). Site states OVER 1,000 GAMES (only Casino Rewards brand to commit to a number). Casino.Guru 9.5 / Trustpilot 4.4, cleanest signal in the group.

**Luxury Casino**, Casino Rewards group. Same operator + Kahnawake #00972. Founding year: 2000 (Casino.Guru) or 2011 (AskGamblers), sources differ. Welcome: graduated 5-deposit match, 100%/50%/25%/50%/100% with caps C$150/200/300/200/150 (middle deposits weighted heaviest). No fake games per Casino.Guru. Casino.Guru 9.5 / Trustpilot 4.3 (97% operator reply rate on critical reviews).

**Zodiac Casino**, Casino Rewards group. Same operator + Kahnawake #00972. Online since 2001. CHEAPEST PAID ENTRY: $1 buys 80 chances on the Mega Money Wheel. Longest ladder: $1 → 100% C$100 → 50% C$80 → 50% C$150 → 50% C$150 across 5 deposits. ~200× wagering on entrance offer. Astrology / zodiac theme. Casino.Guru 9.5 / Trustpilot ~4.0.

**Captain Cooks**, Casino Rewards group. Same operator + Kahnawake #00972. Online since 2003. Welcome: C$5 for 100 chances on Mega Money Wheel (highest spin count of cheap-entry brands), then 5-deposit ladder marketed as "$500 signup" (100%/50%/25%/100% on deposits 2-5, caps C$100/150/125/100). Nautical / explorer theme. ~48h withdrawal target (excludes weekends), C$4,000 weekly cap. Casino.Guru 9.5 / Trustpilot 4.3.

### GENERAL CANADIAN (OUTSIDE ONTARIO) CASINO CONTEXT

**Minimum gambling age**: 19+ in BC, AB-rural, SK, MB, ON, QC, NB, NS, PE, NL. 18+ in AB-major-cities, Manitoba, Quebec. Universal verification at signup.

**Common deposit methods**: Interac e-Transfer (most-used Canadian method), Visa, Mastercard, iDebit, Instadebit, Apple Pay (Betway), eCheck (Betway), Paysafecard, Skrill, Neteller. Cryptocurrency limited (Jackpot City advertises it; Betway does not).

**KYC / verification**: Standard at first withdrawal. Government-issued ID, proof of address, sometimes proof of deposit method. First-time payout typically pauses 1–2 business days; subsequent withdrawals run faster.

**Withdrawal speeds (typical)**: Interac e-Transfer = same-day to 3 business days. Bank transfer = 3–8 banking days. e-Wallet = within 24 hours. Withdrawal caps vary by operator (Casino Rewards group runs a standard C$4,000 weekly cap).

**Licensing landscape**:
- **Kahnawake Gaming Commission**: regulates 11 of our 13 brands. Recognised North American regulator since 1996. Approves eCOGRA as its formal Alternative Dispute Resolution body.
- **Malta Gaming Authority (MGA)**: regulates only Betway in our batch (Type 1 casino + Type 2 sports under one licence). Strong public register with verifiable status.
- **UK Gambling Commission (UKGC)**: regulates only Betway in our batch (#39372). Strictest mainstream regulator.

**eCOGRA**: the independent body that audits RNG fairness and acts as the formal Alternative Dispute Resolution body for Kahnawake-licensed operators. All 13 brands carry the eCOGRA seal. If you have a dispute the operator can't resolve, eCOGRA is the recognised escalation path.

**AskGamblers methodology caveat**: AskGamblers complaint resolution rate only counts operators that opt into their dispute process. AskGamblers has refused to register as a formal Alternative Dispute Resolution body, unlike eCOGRA. Most regulated operators (all 13 we cover) route disputes through eCOGRA or MGA-recognised bodies instead. A low AskGamblers CRM doesn't mean unresolved complaints; it reflects which ADR the operator engages with.

**Responsible gambling resources**: GamCare (https://www.gamcare.org.uk/), Gambling Therapy (https://www.gamblingtherapy.org/), Gamblers Anonymous (https://www.gamblersanonymous.org/). Provincial helplines exist for each Canadian province via the relevant provincial gambling authority.

**Andre Weston** is the named expert who reviews and signs every brand page on casinoexpert.ai. 20+ years operator-side experience across casino operations, payments, player protection, fraud prevention, VIP management, and platform integrity. See /authors/andre-weston for the full bio.
`;
