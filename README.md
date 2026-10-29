# The AI Brief - Beirut Edition

Source for the newsletter website. GitHub Pages builds it with Jekyll; there are no plugins or themes to maintain.

Pilot address: https://ibrahimhaddad.github.io/ai-brief-beirut/ (not indexed while `pilot: true`).

## What changes each week

Each issue adds files to `_issues/` and `assets/figures/`, and updates two data files:

| File | What it is |
| --- | --- |
| `_issues/YYYY-MM-DD-issue-NN.md` | The full issue |
| `_issues/YYYY-MM-DD-issue-NN-staff.md` (and `-faculty`, `-students`, `-entrepreneurs`) | The four two-minute audience pages |
| `assets/figures/YYYY-MM-DD-fig-N-slug.png` and `.svg` | Up to five figures |
| `_data/tracker.yml` | AI funding tracker rows |
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
summary:
  - "Takeaway one, with a number"
  - "Takeaway two"
  - "Takeaway three"
```

Audience pages use `type: audience`, `layout: audience`, `issue`, `audience` (staff, faculty, students or entrepreneurs), `audience_label`, `teaser`, `title`, `week_number`, `week`, `date`, `permalink` and `description`.

## Going live

1. Point the new domain at GitHub Pages and add a `CNAME` file with the domain.
2. In `_config.yml`: set `url` to the domain, `baseurl` to `""`, and `pilot` to `false`.
3. Replace `robots.txt` with the launch version noted inside it.
4. Add the reader poll link to `poll_url`.

## Fonts

Raleway, self-hosted from the Google Fonts repository under the SIL Open Font License (`assets/fonts/OFL.txt`).

## Author page

The author page lives at `/author/` and reads everything from `_data/author.yml`: name, headshot, the one-line byline shown at the end of every issue, the bio paragraphs and the profile links. To update the bio (planned for 1 January 2027), edit that one file. To change the headshot, add the new image under `assets/img/` and point `headshot` at it.

## Week labels

Every issue is labelled by the ISO 8601 week it covers (Monday to Sunday), not the week it is published. The site shows `Week {week_number}, {week}`. Write `week` as:

- Same month: `Oct 19 to 25, 2026`
- Two months: `Oct 26 to Nov 1, 2026`
- Two years: `Dec 28, 2026 to Jan 3, 2027` (ISO week 53 of 2026)
