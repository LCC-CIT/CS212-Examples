from os import getenv

from dotenv import load_dotenv
from openai import OpenAI


def main() -> None:
    """Interactive console chat using the Chat Completions API."""
    load_dotenv()
    api_key = getenv("OPENAI_API_KEY")

    if not api_key:
        print("Missing OPENAI_API_KEY in .env")
        return

    client = OpenAI(
        base_url="https://openrouter.ai/api/v1",
        api_key=api_key,
        )

    messages = [
        {"role": "system", "content": "You are a helpful assistant."},
    ]

    print("ChatCompletionDemo")
    print("Type a prompt and press Enter. Type 'exit' or 'quit' to stop.\n")

    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue

        if user_input.lower() in {"exit", "quit"}:
            print("Goodbye!")
            break

        messages.append({"role": "user", "content": user_input})

        try:
            response = client.chat.completions.create(
                model="baidu/ernie-5.5-flash-preview:free",
                messages=messages,
            )
        except Exception as error:
            print(f"Assistant: Request failed: {error}")
            messages.pop()
            continue

        assistant_text = response.choices[0].message.content or ""
        print(f"Assistant: {assistant_text}\n")
        messages.append({"role": "assistant", "content": assistant_text})


if __name__ == "__main__":
    main()
