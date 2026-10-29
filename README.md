# The AI Brief - LB Edition

Source for the newsletter website. GitHub Pages builds it with Jekyll; there are no plugins or themes to maintain.

Pilot address: https://ibrahimhaddad.github.io/ai-brief-beirut/ (not indexed while `pilot: true`).

## What changes each week

Each issue adds files to `_issues/` and `assets/figures/`, and updates two data files:

| File | What it is |
| --- | --- |
| `_issues/YYYY-MM-DD-issue-NN.md` | The full issue |
| `_issues/YYYY-MM-DD-issue-NN-staff.md` (and `-faculty`, `-students`, `-entrepreneurs`) | The four two-minute audience pages |
| `assets/figures/YYYY-MM-DD-fig-N-slug.png` and `.svg` | Up to five figures |
| `_data/tracker.yml` | AI funding tracker rows (the home page shows the last row's `funding`, `deals` and `since`) |
| `_data/opportunities.yml` | Open deadlines (past ones drop off the home page automatically) |

The home page, archive and menus update themselves.

## Front matter for a full issue

```yaml
type: issue
issue: 1
pilot: true
title: "Headline for the issue"
week_number: 44            # ISO 8601 week (Monday to Sunday) of the period covered
week: "Oct 26 to Nov 1, 2026"
date: 2026-11-02
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
- Story heading `## N. Headline`, then the audience tags:
  `{% include story-meta.html for="Staff | Faculty" evidence="official and research" type="New" %}`
- Figures, served as SVG with a caption:
  `{% include figure.html file="YYYY-MM-DD-fig-N-slug" alt="Under 125 characters" caption="What it shows. Source: ..." %}`
- The four subheads (What happened, Why it matters, How it could affect you, What you could do) are `####`.
- Tables are GitHub-flavored Markdown with a blank line before and after.

Audience pages use `type: audience`, `layout: audience`, `issue`, `audience` (staff, faculty, students or entrepreneurs), `audience_label`, `teaser`, `title`, `week_number`, `week`, `date`, `permalink` and `description`.

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

Every issue is labelled by the ISO 8601 week it covers (Monday to Sunday), not the week it is published. The site shows `Week {week_number}, {week}`. Write `week` as:

- Same month: `Oct 19 to 25, 2026`
- Two months: `Oct 26 to Nov 1, 2026`
- Two years: `Dec 28, 2026 to Jan 3, 2027` (ISO week 53 of 2026)

## Feedback form

`/feedback/` posts to FormSubmit, which emails each submission to `feedback_email` in `_config.yml`. The first submission triggers a confirmation email to that address; click the link once to activate the form. After activation, FormSubmit can issue a random alias for the form's action URL so the address does not appear in the page source.
