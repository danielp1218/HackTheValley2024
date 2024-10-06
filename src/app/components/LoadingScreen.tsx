"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "@/components/ui/progress"

export default function LoadingScreen() {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        let interval: NodeJS.Timeout
        let timeout: NodeJS.Timeout

        if (!isComplete) {
            interval = setInterval(() => {
                setProgress(prevProgress => {
                    if (prevProgress >= 99) {
                        clearInterval(interval)
                        return 99
                    }
                    return prevProgress + (99 - prevProgress) / 100
                })
            }, 300)

            timeout = setTimeout(() => {
                clearInterval(interval)
                setProgress(100)
                setIsComplete(true)
            }, 30000)
        } else {
            timeout = setTimeout(() => {
                setIsVisible(false)
            }, 1000) // Wait 1 second before starting fade-out
        }

        return () => {
            clearInterval(interval)
            clearTimeout(timeout)
        }
    }, [isComplete])

    if (!isVisible) {
        return null
    }

    return (
        <AnimatePresence>
            <motion.div
                key="loading-screen"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50"
            >
                <div className="w-full max-w-md space-y-4 p-4">
                    <h1 className="text-2xl font-bold text-center text-foreground">
                        {isComplete ? "Loading Complete!" : "Loading..."}
                    </h1>
                    <Progress value={progress} className="w-full"/>
                    <p className="text-center text-muted-foreground">
                        {isComplete ? "Ready to go!" : `${Math.round(progress)}% complete`}
                    </p>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}