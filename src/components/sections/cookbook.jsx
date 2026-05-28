import React, { useState } from 'react'
import { Terminal, X, MenuSquare, FileText, Cpu, Layers, Zap, BookOpen } from 'lucide-react'

const cookbookTopics = [
  {
    id: 'stm32',
    title: 'STM32 Embedded Guide',
    icon: <Cpu size={20} />,
    content: `# STM32 Embedded Development Guide

## Overview
Kompleksowy przewodnik po programowaniu mikrokontrolerów STM32.

## Topics:
- Clock configuration
- GPIO programming
- Timers and PWM
- UART/USART communication
- I2C and SPI
- DMA
- FreeRTOS integration
- Power management`

  },
  {
    id: 'linux',
    title: 'Linux Kernel Modules',
    icon: <FileText size={20} />,
    content: `# Linux Kernel Module Development

## Getting Started
Writing custom kernel modules for embedded Linux systems.

## Topics:
- Module structure
- Device drivers
- Memory management
- Interrupt handling
- Synchronization
- Sysfs interface`

  },
  {
    id: 'yocto',
    title: 'Yocto Build System',
    icon: <Layers size={20} />,
    content: `# Yocto Project Cookbook

## Build System Overview
Customizing embedded Linux distributions.

## Topics:
- Layer creation
- Recipe writing
- Cross-compilation
- Rootfs customization
- Image types
- SDK generation`

  },
  {
    id: 'cmake',
    title: 'CMake Cookbook',
    icon: <Zap size={20} />,
    content: `# CMake Practical Guide

## Build Configuration
Modern CMake for embedded and desktop applications.

## Topics:
- Project structure
- Cross-compilation
- Dependencies
- Install rules
- Testing
- IDE integration`

  },
  {
    id: 'qtqml',
    title: 'Qt/QML Tutorials',
    icon: <FileText size={20} />,
    content: `# Qt/QML Development

## UI Framework
Building beautiful embedded UIs with Qt.

## Topics:
- QML basics
- Components
- Animations
- State machines
- C++/QML integration`

  },
  {
    id: 'llm',
    title: 'Local LLM Deployment',
    icon: <BookOpen size={20} />,
    content: `# Local LLM Deployment Guide

## AI on Edge
Running language models on embedded devices.

## Topics:
- Model quantization
- ONNX runtime
- Model selection
- Memory optimization
- Inference optimization`

  }
]

export function CookbookSection() {
  const [selectedTopic, setSelectedTopic] = useState(null)

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-3">
            <Terminal className="text-primary" />
            Developer Cookbook
          </h2>
          <p className="text-deep-400">Techniczne notatki i poradniki</p>
        </div>
        <button 
          onClick={() => setSelectedTopic(null)}
          className="md:hidden p-2 bg-deep-800 rounded-lg"
        >
          <X size={20} />
        </button>
      </div>

      {selectedTopic ? (
        <div className="glass-panel animate-fade-in">
          <button 
            onClick={() => setSelectedTopic(null)}
            className="mb-4 text-sm text-deep-400 hover:text-white flex items-center gap-2"
          >
            ← Wróć do listy
          </button>
          <div className="prose prose-invert max-w-none">
            <h3 className="text-xl font-bold text-white mb-4">{selectedTopic.title}</h3>
            <pre className="bg-deep-900 p-4 rounded-lg overflow-x-auto text-sm font-mono text-green-400">
              {selectedTopic.content}
            </pre>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cookbookTopics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic)}
              className="text-left p-6 bg-deep-800/50 rounded-xl border border-deep-700/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-primary group-hover:text-cyan-400 transition-colors">
                  {topic.icon}
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                  {topic.title}
                </h3>
              </div>
              <p className="text-deep-400 text-sm">
                Kliknij aby przeczytać więcej...
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
