from llm_client import LLMClient

def main():
    print("Eliza Lille - Assistant virtuel")
    print("Tape 'quit' pour quitter\n")
    
    client = LLMClient()
    
    while True:
        try:
            user_input = input("Toi: ").strip()
            if not user_input:
                continue
            if user_input.lower() in ['quit', 'exit', 'q']:
                print("À bientôt !")
                break
            
            response = client.query(user_input)
            print(f"\nEliza: {response}\n")
            
        except KeyboardInterrupt:
            print("\nÀ bientôt !")
            break
        except Exception as e:
            print(f"Erreur: {e}")

if __name__ == "__main__":
    main()
