# AGENTS

## Project Scope

Implement Tic-Tac-Toe in Node.js with:

- A shared OOP game engine (no UI logic)
- A console UI
- A web UI

The engine is the single source of truth for rules and game state.

## Architecture Rules

1. Keep gameplay logic in `src/core` only.
2. Keep console and web layers as thin adapters.
3. Do not duplicate win/draw/validation logic in UI modules.
4. Prefer explicit state transitions through `GameEngine` methods.

## Target Structure

- `src/app` bootstrap entry points
- `src/core` game engine classes (`Board`, `Rules`, `GameEngine`)
- `src/ui/console` terminal input/output/controller
- `src/ui/web` web server, routes, and static UI
- `tests` unit and integration tests

## Engine Contract (MVP)

- `startGame(startingMark?)`
- `makeMove(index)`
- `getState()`
- `reset(startingMark?)`

Returned state should include board snapshot, current player, status, winner, and winning line.

## Phased Implementation Plan

1. **Setup**
   - Node project scaffold
   - Scripts and folder layout
   - Basic documentation
2. **Core Engine**
   - `Board`, `Rules`, `GameEngine`
   - Unit tests for game logic
3. **Console UI**
   - Interactive play loop
   - Input validation and replay
4. **Web UI**
   - API endpoints + static client
   - Multiple game sessions by id
5. **Hardening**
   - Edge-case tests
   - Consistency checks between UIs
6. **Optional Enhancements**
   - AI opponent
   - Configurable board/rules

## Contribution Guardrails

- Use short-lived branches: `feature/...`, `fix/...`
- Keep PRs focused to one area/phase
- Any rule/state change requires engine tests
- Bug fixes require regression tests
- Update docs (`README.md`, this file) when behavior changes

## Current Decisions

- MVP board size: 3x3
- Default starting player: `X`
- Input for moves: single index (0-8)
- Session persistence: in-memory only
