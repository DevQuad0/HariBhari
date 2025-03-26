"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Create a cart context to be used across the application
export const useCart = () => {
  const [cart, setCart] = useState([])
  const { toast } = useToast()

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("haribhari-cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage")
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("haribhari-cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id)
      if (existingItem) {
        return prev.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        return [...prev, { ...product, quantity: 1 }]
      }
    })

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))

    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    })
  }

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)))
  }

  const clearCart = () => {
    setCart([])
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    })
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount,
  }
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount } = useCart()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {getCartCount() > 0 && (
            <Badge className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-lime-500">
              {getCartCount()}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="border-l-emerald-200">
        <SheetHeader>
          <SheetTitle className="text-emerald-800">Your Cart</SheetTitle>
          <SheetDescription>
            {cart.length > 0 ? `You have ${getCartCount()} items in your cart` : "Your cart is empty"}
          </SheetDescription>
        </SheetHeader>
        <div className="py-6">
          {cart.length > 0 ? (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="relative h-16 w-16 overflow-hidden rounded-md border border-emerald-100">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-emerald-800">{item.name}</h4>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-emerald-600">
                        ₹{item.price.toLocaleString()} × {item.quantity}
                      </p>
                      <p className="font-medium text-emerald-800">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                    <div className="flex items-center mt-1">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full p-0 border-emerald-200"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                        <span className="sr-only">Decrease</span>
                      </Button>
                      <span className="w-8 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full p-0 border-emerald-200"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                        <span className="sr-only">Increase</span>
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </div>
              ))}
              <Separator className="my-4 bg-emerald-100" />
              <div className="flex items-center justify-between font-medium">
                <p className="text-emerald-800">Total</p>
                <p className="text-emerald-800">₹{getCartTotal().toLocaleString()}</p>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Button className="w-full bg-gradient-to-r from-emerald-500 to-lime-500 hover:from-emerald-600 hover:to-lime-600 text-white">
                  Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 mx-auto text-emerald-300 mb-4" />
              <h3 className="font-medium mb-2 text-emerald-800">Your cart is empty</h3>
              <p className="text-sm text-emerald-600 mb-4">Add some products to your cart to see them here.</p>
              <SheetClose asChild>
                <Button variant="outline" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  Continue Shopping
                </Button>
              </SheetClose>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

