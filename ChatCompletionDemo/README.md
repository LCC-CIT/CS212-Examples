# ChatCompletionDemo

Minimal Python 3.12 demo using the OpenAI SDK and Chat Completions.

## Requirements

- Python 3.12
- An API key, API endpoint, and model name saved in a `.env` file

## Quick start

1. Create a `.env` file in the project directory with your API key, endpoint, and model:
   ```dotenv
   OPENAI_API_KEY=your_key_here
   OPENAI_BASE_URL=https://openrouter.ai/api/v1
   OPENAI_MODEL=baidu/ernie-5.5-flash-preview:free
   ```
2. Install dependencies and run the program using either `uv` or `pip`:

   **uv**
   ```sh
   uv sync
   uv run main.py
   ```

   **pip**
   ```sh
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   pip install -r requirements.txt
   python main.py
   ```
