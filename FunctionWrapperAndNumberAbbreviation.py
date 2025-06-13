class FunctionWrapper:
    def __init__(self, Function, *Args):
        self.CurrentFunction = Function
        self.Arguments = Args

    def Execute(self):
        return self.CurrentFunction(*self.Arguments)

class Selection:
    def __init__(self, Options):
        self.Options = Options
   
    def GetDict(self):
        Table = self.Options
        Dict = []

        for Option, _ in self.Options.items():
            Dict.append(Option)

        return Dict

    def Find(self, Option):
        return self.Options[Option] == None

    def AddItem(self, Option, Func):
        self.Options[Option] = Func

    def RemoveItem(self, Option):
        try:
            self.Options.pop(Option)
        except:
            print("Option doesn't exist")

    def Wrap(self, Dict, Func, Clear):
        if Clear == True:
            self.Options = {}
           
        for Index in range(len(Dict)):
            self.Options[Dict[Index]] = Func
           

    def Prompt(self, AllowExit):
        Dict = self.GetDict()
        for Index in range(len(Dict)):
            print(f"({Index+1}): {Dict[Index]}")

        if AllowExit:
            print("(0): Exit")

        while True:
            try:
                Selection = int(input())-1
                if Selection == -1 and AllowExit:
                    break
                elif Selection == -1:
                    raise Exception
               
                return FunctionWrapper(self.Options[Dict[Selection]], Dict[Selection])
            except:
                print("Provide a valid option")

    def List(self):
        print("Listing")
        for Key, Value in self.Options.items():
            print(Key, Value)


def Multiplication(k):
    Num = int(input("Enter a number to multiply\n-> "))
    Num2 = int(input("Enter a second number to multiply\n-> "))
    print(f"{Num} * {Num2} = {Num*Num2}")

def Division(k):
    Num = int(input("Enter a number to divide\n-> "))
    Num2 = int(input("Enter a second number to divide\n-> "))
    print(f"{Num} / {Num2} = {Num/Num2}")

def printsum(a):
    print(a)
    
Select = Selection({})
Select.AddItem("Multiplication", Multiplication)
Select.AddItem("Division", Division)
Select.Wrap(["Option1", "Option2"], printsum, True)

while True:   
    Prompt = Select.Prompt(True)

    if Prompt != None:
        Prompt.Execute()
    else:
        print("Bai Bai!")
        break
