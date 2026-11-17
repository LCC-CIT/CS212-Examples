# AGENTS

## Project Scope

Implement and evolve a Python Dots and Boxes game with:

- A shared game engine (`GameBoard`) as the single source of truth
- A console UI for two human players
- A future AI opponent integration path (OpenAI/Gemini)

## Architecture Rules

1. Keep gameplay state and rules in `game_board.py` only.
2. Keep console rendering and input handling in `game_ui.py`.
3. Keep orchestration/game loop logic in `dots_and_boxes.py`.
4. Do not duplicate move validation, scoring, or winner logic outside `GameBoard`.
5. Any future AI player must use `GameBoard` public methods for legal move generation and move application.

## Current Structure

- `dots_and_boxes.py`: app entry point and main loop
- `game_board.py`: `GameBoard` class, rules, move validation, score/winner/game-over logic
- `game_ui.py`: ASCII board rendering, prompts, and user-facing messages
- `tutorial/`: step-by-step docs (overview, logic, UI, AI integration plan)

## Engine Contract (`GameBoard`)

Key methods used by UI/app layers:

- `make_move(move_type, row, col) -> bool`
- `is_valid_move(move_type, row, col) -> bool`
- `is_game_over() -> bool`
- `get_score(player) -> int`
- `get_winner() -> Optional[int]`
- `get_available_moves() -> List[Tuple[str, int, int]]`

State currently exposed/consumed by UI:

- `horizontal_lines`, `vertical_lines`, `boxes`
- `current_player`
- `rows`, `cols`

## Current Gameplay Decisions

- Default board size: `rows=3`, `cols=3` (2x2 boxes)
- Players: two local human players (`1` and `2`)
- Move format: `h row col` or `v row col`
- Coordinate system: zero-based indexing
- Extra turn rule: completing a box grants another turn

## Contribution Guardrails

- Keep changes small and scoped to one concern.
- If game rules change, update both docs and engine behavior together.
- Preserve separation of concerns (no UI logic in engine, no rule logic in UI).
- Maintain compatibility with tutorial documentation unless intentionally revising the tutorial.

## Validation Checklist

Before finalizing changes:

1. Run the game: `python dots_and_boxes.py`
2. Verify invalid move rejection (out of bounds and duplicate line)
3. Verify box completion awards points and extra turn
4. Verify game-over detection and winner/tie message
5. Update `README.md` and relevant `tutorial/*.md` when behavior changes

## Planned Evolution (AI Integration)

Future additions should follow `tutorial/04-ai-integration.md` direction:

- Add `ai_player.py` for AI move selection
- Keep AI as a strategy layer, not a rules engine
- Validate AI output through existing `GameBoard` APIs
- Handle API/network errors with safe fallbacks

## Non-Goals (Current)

- No graphical UI
- No network multiplayer
- No persistence/session storage
- No external Python dependency required for current console mode
