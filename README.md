# The AI Brief - LB Edition

Source for the newsletter website. GitHub Pages builds it with Jekyll; there are no plugins or themes to maintain.

Pilot address: https://ibrahimhaddad.github.io/ai-brief-beirut/ (not indexed while `pilot: true`).

## What changes each week

Each issue adds files to `_issues/` and `assets/figures/`, and updates two data files:

| File | What it is |
| --- | --- |
| `_issues/YYYY-MM-DD-issue-NN.md` | The full issue |
| `_issues/YYYY-MM-DD-issue-NN-staff.md` (and `-faculty`, `-students`, `-entrepreneurs`, `-enterprises`) | The five two-minute audience pages |
| `assets/figures/YYYY-MM-DD-fig-N-slug.png` and `.svg` | Up to five figures |
| `_data/tracker.yml` | AI funding tracker rows (the home page shows the last row's `funding`, `deals` and `since` once four issues are published) |
| `_data/opportunities.yml` | Open deadlines (past ones drop off the home page automatically) |

The home page, archive, RSS feed (`/feed.xml`) and menus update themselves.

The home page (`index.html`) is a landing page, not a copy of the issue: a fixed statement and the author's credibility line (`credibility` in `_data/author.yml`), then This week (the latest issue's title, week label, `summary` and `reading_time`), the five two-minute versions, a Follow by RSS block (swap in the email sign-up when the list launches), open deadlines and past issues. The funding tracker joins the bottom row once four issues are published. Edit the statement and lead line in `index.html`.

## Front matter for a full issue

```yaml
type: issue
issue: 1
pilot: true
title: "Headline for the issue"
week_number: 45            # ISO 8601 week of the publishing Friday
week: "Oct 30 to Nov 5, 2026"   # Friday to Thursday window
date: 2026-11-06
permalink: /issues/issue-01/
description: "140 to 160 characters"
image: /assets/figures/2026-11-02-fig-1-slug.png
reading_time: 12
audience_minutes: 2
summary:                   # fact with a number, then the implication in a so-what span
  - "Fact with a number. <span class=\"so-what\">What it means for readers here.</span>"
  - "..."
  - "..."
contents:                  # one entry per numbered story, in order
  - id: story-1
    title: "Story headline"
    audiences: "Staff who run websites | Computing faculty | Entrepreneurs"
contents_more:             # the other sections, in page order
  - id: for-researchers
    title: "For researchers"
  - id: also-in-lebanon
    title: "Also in Lebanon and the region"
  - id: investment
    title: "Regional AI investment"
  - id: opportunities
    title: "Opportunities"
  - id: term
    title: "Term of the week"
  - id: watch-list
    title: "Watch list"
```

## Inside the full issue

Start the body with `## Editor's note`. The layout adds the 60-second box, contents list, audience switcher, author byline and feedback prompt, so leave those out.

- Before each section, an anchor line: `<a id="story-1"></a>` and so on, plus `for-researchers`, `also-in-lebanon`, `investment`, `opportunities`, `term` and `watch-list`.
- Story heading `## N. Headline`, then who it is for, evidence and type:
  `{% include story-meta.html for="University staff | University faculty" evidence="official and research" type="New" %}`
- Figures, served as SVG; tapping one opens the PNG at full size. The caption is the takeaway in one sentence, not a repeat of the title or source, which are in the image:
  `{% include figure.html file="YYYY-MM-DD-fig-N-slug" alt="Under 125 characters" caption="The takeaway in one sentence." %}`
- Under How it could affect you and What you could do, one paragraph per audience, starting with its label in bold: `**University faculty:** ...`, `**Suggestion for businesses:** ...`. The Read-as switcher on the full issue uses these labels to highlight a reader's paragraphs.
- The four subheads (What happened, Why it matters, How it could affect you, What you could do) are `####`.
- Tables are GitHub-flavored Markdown with a blank line before and after. Columns headed Date, Deadline, Amount or Target stay on one line; tables with more than three columns turn into one card per row on phones.
- Dates follow the house style: `Oct 21`, or `Oct 21, 2026` when the year is needed. A month without a day is spelled out (`in August`).
- On audience pages, link text names the destination (`Story 1: PHP flaws`, `Regional AI investment`), never "Read more".

Audience pages use `type: audience`, `layout: audience`, `issue`, `audience` (staff, faculty, students, entrepreneurs or enterprises; labels "For university staff", "For university faculty", "For university students", "For entrepreneurs" and "For businesses"), `audience_label`, `teaser`, `title`, `week_number`, `week`, `date`, `permalink` and `description`.

## Going live

1. Point the new domain at GitHub Pages and add a `CNAME` file with the domain.
2. In `_config.yml`: set `url` to the domain, `baseurl` to `""`, and `pilot` to `false`.
3. Replace `robots.txt` with the launch version noted inside it.
4. Activate the feedback form (see below) if it is not already active.

## Fonts

Raleway, self-hosted from the Google Fonts repository under the SIL Open Font License (`assets/fonts/OFL.txt`).

## Author page

The author page lives at `/author/` and reads everything from `_data/author.yml`: name, headshot, the one-line byline shown at the end of every issue, the bio paragraphs and the profile links. To update the bio (planned for 1 January 2027), edit that one file. To change the headshot, add the new image under `assets/img/` and point `headshot` at it.

## Week labels

Issues are published on Fridays. Each covers the seven days before the run, Friday 00:00 to Thursday 23:59, Beirut time, and carries the ISO 8601 week number of the publishing Friday. The site shows `Week {week_number}, {week}`, where `week` is the window's first and last day:

- Same month: `Nov 6 to 12, 2026` (Week 46)
- Two months: `Oct 30 to Nov 5, 2026` (Week 45)
- Two years: `Dec 31, 2027 to Jan 6, 2028` (Week 1)

One exception: the issue published on 6 November 2026 covers Oct 26 to Nov 5 (Week 45), bridging from the pilot's Monday-to-Sunday window. Issue 00 covered Oct 19 to 25 (Week 43).

## Figures

1200 x 675 px, PNG and SVG with text as outlines. Readers mostly see them on a phone at about 350 px wide, so no text is smaller than 28 px in the 1200 px canvas; titles are about 44 px. Raleway's default digits are old-style; figures use its lining digits (the `.lf` glyphs), matching the site. The house colours and mark are in the agent prompt.

## Feedback form

`/feedback/` posts to Web3Forms, which emails each submission to the address the access key in `_config.yml` (`web3forms_key`) was created for. The key is public by design. The free plan allows 250 submissions a month. To change the receiving address, create a new key at web3forms.com and replace the value.

## Logo and icon

Brand files live in `assets/brand/`, all with text converted to outlines so they render the same everywhere:

- `…-the-ai-brief-logo.svg` and `-logo-reversed.svg`: the full lockup (mark, name, edition), plus 1216 px PNGs.
- `…-the-ai-brief-mark.svg` and `-mark-reversed.svg`: the folded-page mark alone, plus a 512 px PNG.
- `…-the-ai-brief-favicon.svg`, `-favicon-32.png`, `-favicon-16.svg/.png`: browser icons, with geometry tuned for small sizes.
- `…-the-ai-brief-apple-touch-icon-180.png` and `-app-icon-512.png`: phone home screen and social avatar, on white.

The header draws the mark inline; the edition line under the name comes from `edition` in `_config.yml`. Figures carry the mark at 20 px to the left of "The AI Brief - LB Edition" in the bottom right corner.
