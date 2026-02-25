# Jam README Frontmatter Spec

Each jam directory (e.g. `gj8/`) must include a `README.md` with YAML frontmatter.
The [Daimyo client](https://github.com/cartridge-gg/daimyo) reads this frontmatter to render the game jam card on the landing page.

## Fields

```yaml
---
start_date: "YYYY-MM-DD"       # First day of the jam (AOE)
end_date: "YYYY-MM-DD"         # Last day of the jam (AOE)
prize_pool: "$15,000"           # Prize pool, displayed as-is
registration_url: "https://..."  # Optional. Registration link (hidden after end_date)
---
```

`start_date`, `end_date`, and `prize_pool` are required.
`registration_url` is optional — if omitted, no registration link is shown.

## Conventions

- **Jam number** is derived from the directory name (`gj8` → 8) and displayed as a roman numeral ("Game Jam VIII").
- **Registration** is shown only while `now <= end_date`.
- The README body (below the frontmatter) is freeform markdown for rules, judging criteria, and other details. It is not parsed by the client.

## Example

```markdown
---
start_date: "2026-03-06"
end_date: "2026-03-08"
prize_pool: "$15,000"
registration_url: "https://luma.com/w1wxpfv3"
---

# Dojo Game Jam VIII

Teams will come together for 3 days to build games...
```
