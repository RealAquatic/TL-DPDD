import time

class Main():
    def __init__(self):
        print("Welcome to The Ultimate Game of All Time!\n")
        Character.CreateCharacter()

class Character():
    CurrentCharacters = {}
    DefaultStats = {"Strength": 0, "Dexterity": 0, "Constitution": 0, "Intelligence": 0, "Wisdom": 0, "Charisma": 0}
    Races = {"Dwarf", "Half-orc", "Elf", "Halfling", "Human", "Dragonborn", "Gnome", "Half-elf"}
    
    def __init__(self, Name, Race, Stats):
        self.Name = Name
        self.Race = Race
        self.Stats = Stats.copy()  # Use a copy to prevent modifying the original DefaultStats

    @staticmethod
    def HandleInput(Type, Input):
        if Type == "String" and Input.isalpha():
            return Input
        elif Type == "String":
            return Character.HandleInput("String", input("Invalid input! Please retry > "))

        elif Type == "Race" and Input.title() in Character.Races: 
            return Input.title()
        elif Type == "Race":
            return Character.HandleInput("Race", input("Invalid input! Please retry > "))        

        elif Type == "Stat" and Input.title() in Character.DefaultStats: 
            return Input.title()
        elif Type == "Stat":
            return Character.HandleInput("Stat", input("Invalid input! Please retry > "))  

    def AllocatePoints(self):
        Points = 20
        
        while Points > 0:
            print(f"\nAvailable points: {Points}")
            print(f"Current Stats for {self.Name}:")
            for Stat, Value in self.Stats.items():
                print(f"{Stat}: {Value}")

            StatChoice = Character.HandleInput("Stat", input("Which stat do you want to increase? > "))
            try:
                Increase = int(input(f"How many points to add to {StatChoice}? > "))
                if Increase > Points or Increase < 0:
                    print("Invalid amount. Try again.")
                    continue
                self.Stats[StatChoice] += Increase
                Points -= Increase
            except ValueError:
                print("Please enter a valid number.")

        print(f"\nFinal Stats for {self.Name}:")
        for Stat, Value in self.Stats.items():
            print(f"{Stat}: {Value}")

    @classmethod
    def CreateCharacter(Cls):
        if len(Cls.CurrentCharacters) == 0:
            print("Please create a character for this campaign.")
            Name = Cls.HandleInput("String", input("Enter Name > "))

            print("\nAvailable Races")
            for Race in Cls.Races:
                print(f" - {Race}")
            
            Race = Cls.HandleInput("Race", input("Please select a valid race > "))

            NewCharacter = Cls(Name, Race, Cls.DefaultStats)
            Cls.CurrentCharacters[Name] = NewCharacter

            NewCharacter.AllocatePoints()
        else:
            print(Character.CurrentCharacters['joe'])
            time.sleep(5)
            print("Character already exists.")

    def DisplayCharacter(self):
        print(f"     {self.Name}")
        print("-" * (10 + len(self.Name)))
        for Stat in self.Stats:
            print(f"{Stat}: {self.Stats[Stat]}")

while True:
    Main()
