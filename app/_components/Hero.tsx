"use client";
import React from 'react'
import { motion } from "motion/react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';

function Hero() {
  const topFeatures = [
    {
      title: "AI-Powered Coach",
      description: "Get instant feedback and personalized recommendations to ace your interviews",
      icon: "🤖",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "Real-time Analytics",
      description: "Track your performance with detailed insights and progress metrics",
      icon: "📊",
      gradient: "from-blue-500 to-cyan-500"
    }
  ];

  const bottomFeatures = [
    {
      title: 'Mock Interview Sessions',
      description: 'Practice with realistic behavioral and technical scenarios',
      icon: '🎯',
      gradient: 'from-emerald-500 to-teal-500'
    },
    {
      title: 'Instant AI Feedback',
      description: 'Get actionable suggestions and detailed scoring',
      icon: '⚡',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Progress Tracking',
      description: 'Measure improvement over time with comprehensive analytics',
      icon: '📈',
      gradient: 'from-violet-500 to-purple-500'
    }
  ];

  return (
    <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl animate-pulse" />
        <div className="absolute -top-20 right-1/3 h-80 w-80 rounded-full bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-3xl animate-pulse delay-1000" />
        <div className="absolute -bottom-20 -right-32 h-96 w-96 rounded-full bg-gradient-to-r from-emerald-400/20 to-teal-400/20 blur-3xl animate-pulse delay-2000" />
        <div className="absolute top-1/2 left-1/4 h-72 w-72 rounded-full bg-gradient-to-r from-orange-400/15 to-red-400/15 blur-3xl animate-pulse delay-3000" />
      </div>

      {/* Animated Border Lines */}
      <div className="absolute inset-y-0 left-0 h-full w-px">
        <div className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse" />
        <motion.div 
          className="absolute top-0 h-32 w-px bg-gradient-to-b from-purple-500 via-blue-500 to-transparent"
          animate={{ y: [0, 400, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
      <div className="absolute inset-y-0 right-0 h-full w-px">
        <div className="absolute top-0 h-full w-px bg-gradient-to-b from-transparent via-blue-500/50 to-transparent animate-pulse delay-1000" />
        <motion.div 
          className="absolute top-0 h-32 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent"
          animate={{ y: [400, 0, 400] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
      
      <div className="px-4 py-10 md:py-20">
        {/* Enhanced Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium text-purple-700 bg-purple-100 rounded-full dark:bg-purple-900/30 dark:text-purple-300">
            ✨ AI-Powered Interview Preparation
          </div>
        </motion.div>

        <h1 className="relative z-10 mx-auto max-w-5xl text-center text-4xl font-black tracking-tight text-slate-900 md:text-6xl lg:text-8xl dark:text-slate-50">
          {"Ace Your Next Interview with AI-Powered Practice"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(8px)", y: 20, rotateX: 90 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className={`mr-3 inline-block transform-gpu ${
                  [0, 6, 8].includes(index) 
                    ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 bg-clip-text text-transparent' 
                    : ''
                }`}
              >
                {word}
              </motion.span>
            ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="relative z-10 mx-auto max-w-3xl py-6 text-center text-xl font-medium text-neutral-600 dark:text-neutral-300 leading-relaxed"
        >
          PerpMind is your intelligent interview coach — simulating real-world technical and behavioral interviews so you can prepare with confidence. From coding challenges to HR questions, we've got you covered.
        </motion.p>

        {/* Enhanced CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-300"></div>
              <Button size="lg" className="relative bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 shadow-2xl px-8 py-4 text-lg font-semibold">
                <span className="flex items-center gap-2">
                  Explore Now
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </Button>
            </motion.div>
          </Link>
          
          <Link href="/dashboard">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button variant="outline" className="border-2 border-purple-400 text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 px-8 py-4 text-lg font-semibold backdrop-blur-sm">
                Contact Support
              </Button>
            </motion.div>
          </Link>
        </motion.div>

        {/* Unified Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative z-10 mt-20 w-full"
        >
          <div className="relative rounded-3xl border border-neutral-200/50 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-900/60">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-3xl"></div>
            
        {/* Unified Features Grid - 2+3 Layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="relative z-10 mt-20 w-full"
        >
          <div className="relative rounded-3xl border border-neutral-200/50 bg-white/60 p-8 shadow-2xl backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-900/60">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-blue-500/5 to-pink-500/5 rounded-3xl"></div>
            
            {/* Top Row - 2 Large Cards */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {topFeatures.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8, rotateY: 45 }}
                  animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: 1.4 + index * 0.3,
                    ease: [0.25, 0.4, 0.25, 1]
                  }}
                  whileHover={{ 
                    scale: 1.03, 
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-white/90 dark:bg-neutral-800/90 p-10 shadow-xl backdrop-blur-sm border border-white/30 dark:border-neutral-700/30 cursor-pointer min-h-[240px]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`}></div>
                  <div className={`absolute -inset-px bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-30 blur-sm rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-center text-center">
                    <div className="text-5xl mb-6 transform group-hover:scale-125 transition-transform duration-500">
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-2xl text-slate-800 dark:text-slate-100 group-hover:text-purple-700 dark:group-hover:text-purple-400 transition-colors duration-300 mb-4">
                      {item.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                  
                  {/* Floating particles effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-purple-400 rounded-full"
                        style={{
                          left: `${30 + i * 20}%`,
                          top: `${25 + (i % 2) * 40}%`,
                        }}
                        animate={{
                          y: [-15, -35, -15],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2.5,
                          delay: i * 0.4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row - 3 Compact Cards */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {bottomFeatures.map((feature, index) => (
                <motion.div
                  key={index + 2}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.0 + index * 0.15 }}
                  whileHover={{ 
                    y: -6, 
                    scale: 1.02,
                    transition: { duration: 0.2 } 
                  }}
                  className="group relative overflow-hidden rounded-2xl bg-white/80 dark:bg-neutral-800/80 p-6 shadow-lg backdrop-blur-sm border border-white/30 dark:border-neutral-700/30 cursor-pointer min-h-[180px]"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-400`}></div>
                  <div className={`absolute -inset-px bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-25 blur-sm rounded-2xl transition-opacity duration-400`}></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-center text-center">
                    <div className="text-3xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="font-bold text-lg text-slate-800 transition-colors group-hover:text-purple-700 dark:text-slate-100 dark:group-hover:text-purple-400 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-neutral-600 transition-colors group-hover:text-neutral-700 dark:text-neutral-400 dark:group-hover:text-neutral-300 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero

