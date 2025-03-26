"use client"

import { useState, useEffect, useRef } from "react"
import { Bot, Leaf, Send, Sparkles, User, X } from "lucide-react"
import { useChat } from "ai/react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export default function AiFarmAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const scrollAreaRef = useRef(null)
  const messagesEndRef = useRef(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    initialMessages: [
      {
        id: "welcome",
        role: "assistant",
        content:
          "Hello! I'm your farming assistant powered by AI. Ask me anything about agriculture, crops, farming techniques, or related topics!",
      },
    ],
  })

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [messages])

  // Sample farming questions for suggestions
  const sampleQuestions = [
    "What crops are best for sandy soil?",
    "How to control aphids organically?",
    "When is the best time to plant wheat?",
    "What are sustainable irrigation methods?",
    "How to improve soil fertility naturally?",
  ]

  const handleSampleQuestion = (question) => {
    const formEvent = {
      preventDefault: () => {},
      currentTarget: {
        elements: {
          message: { value: question },
        },
      },
    }

    // Set the input value
    handleInputChange({ target: { value: question } })

    // Submit after a short delay to ensure the input is updated
    setTimeout(() => {
      handleSubmit(formEvent)
    }, 100)
  }

  return (
    <>
      {/* Floating button */}
      <Button
        className={cn(
          "fixed bottom-4 right-4 z-50 rounded-full p-4 shadow-lg transition-transform hover:scale-105",
          !isOpen && "bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600",
          isOpen && "bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span className="hidden sm:inline">Farm Assistant</span>
          </div>
        )}
      </Button>

      {/* Chat window */}
      <div
        className={cn(
          "fixed bottom-20 right-4 z-50 w-full max-w-[400px] transition-all duration-300 ease-in-out",
          isOpen ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none",
        )}
      >
        <Card className="border-2 border-lime-300 shadow-xl">
          <CardHeader className="bg-gradient-to-r from-emerald-100 to-lime-100 border-b border-lime-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-emerald-500 to-lime-500 p-1.5 rounded-full">
                  <Leaf className="h-4 w-4 text-white" />
                </div>
                <CardTitle className="flex items-center gap-2 text-emerald-800">Farming Assistant</CardTitle>
              </div>
              <Badge variant="outline" className="bg-emerald-100 text-emerald-800 border-emerald-300">
                AI Powered
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea ref={scrollAreaRef} className="h-[400px] p-4 bg-gradient-to-b from-white to-emerald-50">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex w-max max-w-[85%] items-start gap-2 rounded-lg px-4 py-2",
                      message.role === "user" && "ml-auto bg-gradient-to-r from-emerald-500 to-lime-500 text-white",
                      message.role === "assistant" && "bg-gradient-to-r from-white to-emerald-100",
                    )}
                  >
                    {message.role === "user" ? (
                      <User className="h-5 w-5 mt-1 flex-shrink-0" />
                    ) : (
                      <Bot className="h-5 w-5 mt-1 flex-shrink-0 text-emerald-600" />
                    )}
                    <div>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      {message.role === "assistant" && (
                        <div className="mt-1 text-xs text-right text-emerald-600">Team DEVQUAD</div>
                      )}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex w-max max-w-[85%] items-center gap-2 rounded-lg bg-gradient-to-r from-white to-emerald-100 px-4 py-2">
                    <Bot className="h-5 w-5 text-emerald-600" />
                    <div className="space-x-1 text-sm">
                      <span className="animate-pulse">●</span>
                      <span className="animate-pulse animation-delay-200">●</span>
                      <span className="animate-pulse animation-delay-400">●</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Sample questions */}
            {messages.length <= 2 && (
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-lime-50 border-t border-lime-200">
                <p className="text-xs text-emerald-800 mb-2 font-medium">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {sampleQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer bg-white hover:bg-lime-100 text-emerald-800 border-lime-300"
                      onClick={() => handleSampleQuestion(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="border-t border-lime-200 p-4 bg-gradient-to-r from-emerald-100 to-lime-100">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Textarea
                  placeholder="Ask about farming..."
                  value={input}
                  onChange={handleInputChange}
                  rows={1}
                  className="min-h-0 resize-none border-lime-200 focus-visible:ring-emerald-500"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={isLoading || !input.trim()}
                  className="bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600"
                >
                  <Send className="h-4 w-4" />
                  <span className="sr-only">Send message</span>
                </Button>
              </form>
              <div className="mt-2 text-center">
                <p className="text-xs text-emerald-700">Developed with ❤️ by Team DEVQUAD</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

