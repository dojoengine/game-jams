# Session Notes

## Task
Restructure screening process to:
1. Auto-classify submissions as "Whole Game" vs "Feature" based on jam-window commit analysis
2. Separate screening criteria (SCREENING.md) from workflow definition (submission-screen.yml)
3. SCREENING.md serves dual purpose: human docs + agent instructions

## Decisions Made
- No changes to submission template - screening agent infers type from data
- Whole Game = 90%+ of repo changed during jam window; Feature = <90%
- Workflow prompt becomes a short bootstrap pointing to SCREENING.md
- SCREENING.md restructured to be both human-readable and agent-executable
