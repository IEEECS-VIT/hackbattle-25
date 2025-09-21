"use client"
import { useEffect, useState } from "react"

export default function Toast() {
  const [text, setText] = useState("")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let timer
  
    const handler = (e) => {
      setText(e.detail.text)
      setVisible(true)
  
      clearTimeout(timer)
      timer = setTimeout(() => {
        setVisible(false)
        setTimeout(() => setText(""), 300)
      }, 8000)
    }
  
    window.addEventListener("showToast", handler)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("showToast", handler)
    }
  }, [])
  

  if (!visible || !text) return null

  return (
    <div className="fixed bottom-6 right-6 z-[9999] transition-opacity duration-300">
      <div className="bg-[#d9c29c] text-black px-6 py-4 rounded-none border-4 border-[#5a4632] shadow-lg font-[Karma] text-lg relative font-pixeboy">
        {text}

        {/* Pixel-style corners */}
        <div className="absolute top-0 left-0 w-2 h-2 bg-[#5a4632]" />
        <div className="absolute top-0 right-0 w-2 h-2 bg-[#5a4632]" />
        <div className="absolute bottom-0 left-0 w-2 h-2 bg-[#5a4632]" />
        <div className="absolute bottom-0 right-0 w-2 h-2 bg-[#5a4632]" />
      </div>
    </div>
  )
}
