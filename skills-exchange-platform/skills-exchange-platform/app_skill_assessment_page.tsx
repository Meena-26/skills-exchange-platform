"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

interface Question {
  id: string
  skill: string
  question: string
  options: string[]
  correctAnswer: string
}

const questionDatabase: Record<string, Question[]> = {
  JavaScript: [
    {
      id: "js1",
      skill: "JavaScript",
      question: "What is the output of console.log(typeof [])?",
      options: ["array", "object", "undefined", "null"],
      correctAnswer: "object",
    },
    {
      id: "js2",
      skill: "JavaScript",
      question: "Which method is used to add an element to the end of an array?",
      options: ["push()", "pop()", "unshift()", "shift()"],
      correctAnswer: "push()",
    },
    {
      id: "js3",
      skill: "JavaScript",
      question: "What does the '===' operator do?",
      options: ["Compares values", "Compares values and types", "Assigns value", "Checks if truthy"],
      correctAnswer: "Compares values and types",
    },
    {
      id: "js4",
      skill: "JavaScript",
      question: "Which function is used to parse a JSON string?",
      options: ["JSON.parse()", "JSON.stringify()", "JSON.decode()", "JSON.evaluate()"],
      correctAnswer: "JSON.parse()",
    },
    {
      id: "js5",
      skill: "JavaScript",
      question: "What is the purpose of the 'let' keyword?",
      options: [
        "Declare a constant",
        "Declare a block-scoped variable",
        "Declare a function",
        "Declare a global variable",
      ],
      correctAnswer: "Declare a block-scoped variable",
    },
    {
      id: "js6",
      skill: "JavaScript",
      question: "Which method is used to remove the last element from an array?",
      options: ["pop()", "shift()", "splice()", "slice()"],
      correctAnswer: "pop()",
    },
    {
      id: "js7",
      skill: "JavaScript",
      question: "What does the 'this' keyword refer to in a regular function?",
      options: ["The global object", "The function itself", "The object that called the function", "Undefined"],
      correctAnswer: "The object that called the function",
    },
    {
      id: "js8",
      skill: "JavaScript",
      question: "Which operator is used for strict equality comparison?",
      options: ["==", "===", "=", "!="],
      correctAnswer: "===",
    },
    {
      id: "js9",
      skill: "JavaScript",
      question: "What is the purpose of the 'async' keyword in a function declaration?",
      options: [
        "Make the function run faster",
        "Allow the function to use await",
        "Make the function return a promise",
        "All of the above",
      ],
      correctAnswer: "Allow the function to use await",
    },
    {
      id: "js10",
      skill: "JavaScript",
      question: "Which method is used to add one or more elements to the beginning of an array?",
      options: ["unshift()", "push()", "concat()", "splice()"],
      correctAnswer: "unshift()",
    },
    {
      id: "js11",
      skill: "JavaScript",
      question: "What is the purpose of the 'map' method on arrays?",
      options: ["Filter elements", "Transform elements", "Sort elements", "Find an element"],
      correctAnswer: "Transform elements",
    },
    {
      id: "js12",
      skill: "JavaScript",
      question: "Which statement is used to exit a loop prematurely?",
      options: ["break", "continue", "return", "exit"],
      correctAnswer: "break",
    },
    {
      id: "js13",
      skill: "JavaScript",
      question: "What is the purpose of the 'reduce' method on arrays?",
      options: ["Remove elements", "Combine elements into a single value", "Sort elements", "Find an element"],
      correctAnswer: "Combine elements into a single value",
    },
    {
      id: "js14",
      skill: "JavaScript",
      question: "Which operator is used for logical AND?",
      options: ["&", "&&", "AND", "||"],
      correctAnswer: "&&",
    },
    {
      id: "js15",
      skill: "JavaScript",
      question: "What is the purpose of the 'const' keyword?",
      options: ["Declare a variable", "Declare a constant", "Declare a function", "Declare an object"],
      correctAnswer: "Declare a constant",
    },
    {
      id: "js16",
      skill: "JavaScript",
      question: "Which method is used to join all elements of an array into a string?",
      options: ["concat()", "join()", "toString()", "splice()"],
      correctAnswer: "join()",
    },
    {
      id: "js17",
      skill: "JavaScript",
      question: "What does the 'typeof' operator return for an array?",
      options: ["'array'", "'object'", "'list'", "'undefined'"],
      correctAnswer: "'object'",
    },
    {
      id: "js18",
      skill: "JavaScript",
      question: "Which method is used to remove the first element from an array?",
      options: ["shift()", "pop()", "unshift()", "splice()"],
      correctAnswer: "shift()",
    },
    {
      id: "js19",
      skill: "JavaScript",
      question: "What is the purpose of the 'forEach' method on arrays?",
      options: ["Transform elements", "Filter elements", "Execute a function on each element", "Sort elements"],
      correctAnswer: "Execute a function on each element",
    },
    {
      id: "js20",
      skill: "JavaScript",
      question: "Which operator is used for logical OR?",
      options: ["|", "||", "OR", "&&"],
      correctAnswer: "||",
    },
  ],
  Python: [
    {
      id: "py1",
      skill: "Python",
      question: "What is the output of type([])?",
      options: ["<class 'list'>", "<class 'array'>", "<class 'tuple'>", "<class 'set'>"],
      correctAnswer: "<class 'list'>",
    },
    {
      id: "py2",
      skill: "Python",
      question: "Which keyword is used to define a function in Python?",
      options: ["function", "def", "fun", "define"],
      correctAnswer: "def",
    },
    {
      id: "py3",
      skill: "Python",
      question: "What does len() do?",
      options: ["Returns length", "Returns last element", "Sorts list", "Reverses list"],
      correctAnswer: "Returns length",
    },
    {
      id: "py4",
      skill: "Python",
      question: "Which of the following is used to comment a single line in Python?",
      options: ["//", "#", "/*", "--"],
      correctAnswer: "#",
    },
    {
      id: "py5",
      skill: "Python",
      question: "What is the correct way to create a tuple in Python?",
      options: ["(1, 2, 3)", "[1, 2, 3]", "{1, 2, 3}", "<1, 2, 3>"],
      correctAnswer: "(1, 2, 3)",
    },
    {
      id: "py6",
      skill: "Python",
      question: "Which method is used to add an element to a list?",
      options: ["append()", "add()", "insert()", "extend()"],
      correctAnswer: "append()",
    },
    {
      id: "py7",
      skill: "Python",
      question: "What is the output of 3 * '7'?",
      options: ["21", "777", "3*7", "Error"],
      correctAnswer: "777",
    },
    {
      id: "py8",
      skill: "Python",
      question: "Which of the following is not a valid variable name in Python?",
      options: ["my_var", "_myvar", "7myvar", "myVar"],
      correctAnswer: "7myvar",
    },
    {
      id: "py9",
      skill: "Python",
      question: "What does the 'is' operator do in Python?",
      options: ["Compares values", "Compares identities", "Assigns value", "Checks if truthy"],
      correctAnswer: "Compares identities",
    },
    {
      id: "py10",
      skill: "Python",
      question: "Which of the following is used to handle exceptions in Python?",
      options: ["if-else", "try-except", "for-in", "while-do"],
      correctAnswer: "try-except",
    },
    {
      id: "py11",
      skill: "Python",
      question: "What is the purpose of the 'self' parameter in class methods?",
      options: [
        "To refer to the class",
        "To refer to the instance",
        "To create a new instance",
        "To delete an instance",
      ],
      correctAnswer: "To refer to the instance",
    },
    {
      id: "py12",
      skill: "Python",
      question: "Which of the following is used to define a class in Python?",
      options: ["def", "class", "func", "define"],
      correctAnswer: "class",
    },
    {
      id: "py13",
      skill: "Python",
      question: "What does the 'range()' function return?",
      options: ["List", "Tuple", "Set", "Iterator"],
      correctAnswer: "Iterator",
    },
    {
      id: "py14",
      skill: "Python",
      question: "Which method is used to remove an item from a list by its index?",
      options: ["remove()", "pop()", "delete()", "discard()"],
      correctAnswer: "pop()",
    },
    {
      id: "py15",
      skill: "Python",
      question: "What is the purpose of the 'with' statement in Python?",
      options: ["Loop control", "Exception handling", "Resource management", "Function definition"],
      correctAnswer: "Resource management",
    },
    {
      id: "py16",
      skill: "Python",
      question: "Which of the following is used to import a module in Python?",
      options: ["include", "import", "require", "use"],
      correctAnswer: "import",
    },
    {
      id: "py17",
      skill: "Python",
      question: "What is the output of bool(0)?",
      options: ["True", "False", "None", "Error"],
      correctAnswer: "False",
    },
    {
      id: "py18",
      skill: "Python",
      question: "Which method is used to sort a list in place?",
      options: ["sort()", "sorted()", "order()", "arrange()"],
      correctAnswer: "sort()",
    },
    {
      id: "py19",
      skill: "Python",
      question: "What is the purpose of the 'yield' keyword in Python?",
      options: ["Define a generator", "Return a value", "Raise an exception", "Import a module"],
      correctAnswer: "Define a generator",
    },
    {
      id: "py20",
      skill: "Python",
      question: "Which of the following is used to get user input in Python?",
      options: ["input()", "get()", "scanf()", "readline()"],
      correctAnswer: "input()",
    },
  ],
  C: [
    {
      id: "c1",
      skill: "C",
      question: "Which of the following is not a valid data type in C?",
      options: ["int", "float", "string", "char"],
      correctAnswer: "string",
    },
    {
      id: "c2",
      skill: "C",
      question: "What is the correct way to declare a pointer in C?",
      options: ["int ptr;", "int *ptr;", "int &ptr;", "int ^ptr;"],
      correctAnswer: "int *ptr;",
    },
    {
      id: "c3",
      skill: "C",
      question: "Which header file is used for input/output operations in C?",
      options: ["iostream.h", "stdio.h", "conio.h", "stdlib.h"],
      correctAnswer: "stdio.h",
    },
    {
      id: "c4",
      skill: "C",
      question: "What is the size of int data type in C?",
      options: ["2 bytes", "4 bytes", "8 bytes", "Depends on the compiler"],
      correctAnswer: "Depends on the compiler",
    },
    {
      id: "c5",
      skill: "C",
      question: "Which operator is used to access the address of a variable?",
      options: ["*", "&", "#", "@"],
      correctAnswer: "&",
    },
    {
      id: "c6",
      skill: "C",
      question: "What is the purpose of the 'sizeof' operator in C?",
      options: [
        "To allocate memory",
        "To find the size of a data type",
        "To typecast variables",
        "To define constants",
      ],
      correctAnswer: "To find the size of a data type",
    },
    {
      id: "c7",
      skill: "C",
      question: "Which of the following is not a looping structure in C?",
      options: ["for", "while", "do-while", "repeat-until"],
      correctAnswer: "repeat-until",
    },
    {
      id: "c8",
      skill: "C",
      question: "What is the correct way to declare a function in C?",
      options: [
        "function_name()",
        "return_type function_name()",
        "function_name(parameters)",
        "return_type function_name(parameters)",
      ],
      correctAnswer: "return_type function_name(parameters)",
    },
    {
      id: "c9",
      skill: "C",
      question: "Which keyword is used to define a structure in C?",
      options: ["struct", "structure", "typedef", "union"],
      correctAnswer: "struct",
    },
    {
      id: "c10",
      skill: "C",
      question: "What is the purpose of the 'static' keyword when used with a local variable?",
      options: [
        "To make it global",
        "To preserve its value between function calls",
        "To allocate memory on heap",
        "To make it constant",
      ],
      correctAnswer: "To preserve its value between function calls",
    },
    {
      id: "c11",
      skill: "C",
      question: "Which function is used to allocate memory dynamically in C?",
      options: ["alloc()", "malloc()", "realloc()", "calloc()"],
      correctAnswer: "malloc()",
    },
    {
      id: "c12",
      skill: "C",
      question: "What is the purpose of the 'const' keyword in C?",
      options: ["To define a constant", "To allocate memory", "To declare a pointer", "To create a loop"],
      correctAnswer: "To define a constant",
    },
    {
      id: "c13",
      skill: "C",
      question: "What is the purpose of the 'break' statement in C?",
      options: [
        "To exit a loop or switch statement",
        "To continue to the next iteration",
        "To define a function",
        "To include a header file",
      ],
      correctAnswer: "To exit a loop or switch statement",
    },
    {
      id: "c14",
      skill: "C",
      question: "Which operator is used for pointer dereferencing in C?",
      options: ["&", "*", "->", "."],
      correctAnswer: "*",
    },
    {
      id: "c15",
      skill: "C",
      question: "What is the correct way to declare an array in C?",
      options: ["int array[10];", "array int[10];", "int[10] array;", "array[10] int;"],
      correctAnswer: "int array[10];",
    },
    {
      id: "c16",
      skill: "C",
      question: "Which function is used to read a character from the standard input in C?",
      options: ["scanf()", "gets()", "getchar()", "read()"],
      correctAnswer: "getchar()",
    },
    {
      id: "c17",
      skill: "C",
      question: "What is the purpose of the 'typedef' keyword in C?",
      options: ["To define a new data type", "To allocate memory", "To include a header file", "To create a loop"],
      correctAnswer: "To define a new data type",
    },
    {
      id: "c18",
      skill: "C",
      question: "Which of the following is not a valid storage class specifier in C?",
      options: ["auto", "register", "static", "dynamic"],
      correctAnswer: "dynamic",
    },
    {
      id: "c19",
      skill: "C",
      question: "What is the purpose of the 'void' keyword in C?",
      options: [
        "To declare a function with no return value",
        "To create an empty variable",
        "To define a constant",
        "To allocate memory",
      ],
      correctAnswer: "To declare a function with no return value",
    },
    {
      id: "c20",
      skill: "C",
      question: "Which operator is used for bitwise AND in C?",
      options: ["&&", "&", "||", "|"],
      correctAnswer: "&",
    },
  ],
  SQL: [
    {
      id: "sql1",
      skill: "SQL",
      question: "What is the purpose of the SELECT statement?",
      options: ["To insert data", "To retrieve data", "To update data", "To delete data"],
      correctAnswer: "To retrieve data",
    },
    {
      id: "sql2",
      skill: "SQL",
      question: "Which SQL keyword is used to filter records?",
      options: ["WHERE", "FILTER", "HAVING", "MATCH"],
      correctAnswer: "WHERE",
    },
    {
      id: "sql3",
      skill: "SQL",
      question: "What does JOIN do in SQL?",
      options: [
        "Combines rows from different tables",
        "Splits a table into two",
        "Adds a new column",
        "Removes duplicate rows",
      ],
      correctAnswer: "Combines rows from different tables",
    },
  ],
  HTML: [
    {
      id: "html1",
      skill: "HTML",
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Tech Modern Language",
        "Hyper Transfer Markup Language",
        "Hyper Text Modern Links",
      ],
      correctAnswer: "Hyper Text Markup Language",
    },
    {
      id: "html2",
      skill: "HTML",
      question: "Which tag is used to create a hyperlink?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correctAnswer: "<a>",
    },
    {
      id: "html3",
      skill: "HTML",
      question: "What is the correct way to create a paragraph?",
      options: ["<paragraph>", "<p>", "<para>", "<text>"],
      correctAnswer: "<p>",
    },
  ],
  CSS: [
    {
      id: "css1",
      skill: "CSS",
      question: "What does CSS stand for?",
      options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets", "Colorful Style Sheets"],
      correctAnswer: "Cascading Style Sheets",
    },
    {
      id: "css2",
      skill: "CSS",
      question: "Which property is used to change the background color?",
      options: ["color", "bgcolor", "background-color", "background"],
      correctAnswer: "background-color",
    },
    {
      id: "css3",
      skill: "CSS",
      question: "How do you select an element with id 'demo'?",
      options: [".demo", "#demo", "*demo", "demo"],
      correctAnswer: "#demo",
    },
  ],
}

export default function SkillAssessment() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [scores, setScores] = useState<Record<string, number>>({})
  const [timeLeft, setTimeLeft] = useState(60) // 60 seconds per question

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser") || "{}")
    setUser(currentUser)
    if (currentUser?.skills?.length > 0) {
      setQuestions(generateQuestionsForAllSkills(currentUser.skills))
    }
  }, [])

  useEffect(() => {
    if (timeLeft > 0 && questions.length > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && questions.length > 0) {
      handleNext()
    }
  }, [timeLeft, questions])

  const generateQuestionsForAllSkills = (skills: string[]): Question[] => {
    let allQuestions: Question[] = []
    const questionsPerSkill = Math.floor(20 / skills.length) // Distribute questions evenly
    let remainingQuestions = 20 % skills.length // Handle any remainder

    skills.forEach((skill) => {
      if (questionDatabase[skill]) {
        // Get questions for this skill
        const skillQuestions = questionDatabase[skill]
          .sort(() => 0.5 - Math.random()) // Shuffle questions
          .slice(0, questionsPerSkill + (remainingQuestions > 0 ? 1 : 0))

        allQuestions = allQuestions.concat(skillQuestions)
        if (remainingQuestions > 0) remainingQuestions--
      }
    })

    return allQuestions.sort(() => 0.5 - Math.random()) // Final shuffle
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
  }

  const handleNext = () => {
    if (selectedAnswer !== null) {
      setScores((prev) => ({
        ...prev,
        [questions[currentQuestionIndex].skill]:
          (prev[questions[currentQuestionIndex].skill] || 0) +
          (selectedAnswer === questions[currentQuestionIndex].correctAnswer ? 1 : 0),
      }))
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1)
      setSelectedAnswer(null)
      setTimeLeft(60)
    } else {
      finishAssessment()
    }
  }

  const finishAssessment = () => {
    const updatedSkills = user.skills.map((skill: string) => {
      const skillQuestions = questions.filter((q) => q.skill === skill)
      const score = scores[skill] || 0
      const totalQuestions = skillQuestions.length
      const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0
      let level = "Beginner"
      if (percentage >= 80) level = "Advanced"
      else if (percentage >= 60) level = "Intermediate"
      return { name: skill, level, score: percentage }
    })

    const updatedUser = {
      ...user,
      skills: updatedSkills,
    }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const updatedUsers = users.map((u: any) => (u.id === user.id ? updatedUser : u))
    localStorage.setItem("users", JSON.stringify(updatedUsers))

    router.push("/profile")
  }

  if (!user || questions.length === 0) {
    return <div className="p-6">Loading assessment...</div>
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Skill Assessment</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex justify-between items-center">
            <span>
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span>Time left: {timeLeft} seconds</span>
          </div>
          <Progress value={(timeLeft / 60) * 100} />
          <div className="space-y-4">
            <h3 className="text-lg font-medium">{questions[currentQuestionIndex].question}</h3>
            <p className="text-sm text-gray-500">Skill: {questions[currentQuestionIndex].skill}</p>
            <div className="space-y-2">
              {questions[currentQuestionIndex].options.map((option) => (
                <Button
                  key={option}
                  variant={selectedAnswer === option ? "default" : "outline"}
                  className="w-full justify-start"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
          <Button className="w-full" onClick={handleNext}>
            {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Assessment"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
