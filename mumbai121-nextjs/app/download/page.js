'use client'
import { useEffect, useRef, useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Link from 'next/link'

export default function DownloadPage() {
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const [installMessage, setInstallMessage] = useState('')
  const [showInstallButton, setShowInstallButton] = useState(false)
  const [showManualInstructions, setShowManualInstructions] = useState(false)
  const [installed, setInstalled] = useState(false)

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase()
    const isAndroid = /android/.test(userAgent)
    const isIOS = /iphone|ipad|ipod/.test(userAgent)
    const isChrome = /chrome/.test(userAgent) && !/edg/.test(userAgent)
    const isEdge = /edg/.test(userAgent)
    const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true

    if (isStandalone) {
      setInstalled(true)
      setInstallMessage('App is already installed!')
      return
    }

    if (isAndroid) {
      if (isChrome || isEdge) {
        setInstallMessage('Preparing install button...')
        const handler = (e) => {
          e.preventDefault()
          setDeferredPrompt(e)
          setShowInstallButton(true)
          setInstallMessage('Ready to install! Click the button below.')
        }
        window.addEventListener('beforeinstallprompt', handler)
        setTimeout(() => {
          setDeferredPrompt((prev) => {
            if (!prev) {
              setShowManualInstructions(true)
              setInstallMessage('Automatic install not available. Use manual method below.')
            }
            return prev
          })
        }, 5000)
        return () => window.removeEventListener('beforeinstallprompt', handler)
      } else {
        setShowManualInstructions(true)
        setInstallMessage('Open this page in Chrome browser for best experience.')
      }
    } else if (isIOS) {
      if (!isSafari) {
        setInstallMessage('For iPhone, you must use Safari browser. See steps below.')
      } else {
        setInstallMessage('See installation steps in the iPhone section below.')
      }
    } else {
      if (isChrome || isEdge) {
        setInstallMessage('Preparing install button...')
        const handler = (e) => {
          e.preventDefault()
          setDeferredPrompt(e)
          setShowInstallButton(true)
          setInstallMessage('Click the button to install!')
        }
        window.addEventListener('beforeinstallprompt', handler)
        setTimeout(() => {
          setDeferredPrompt((prev) => {
            if (!prev) {
              setInstallMessage('Look for the install icon in the address bar or use browser menu → Install Mumbai121.')
            }
            return prev
          })
        }, 5000)
        return () => window.removeEventListener('beforeinstallprompt', handler)
      } else {
        setInstallMessage('Please use Chrome or Edge browser to install.')
      }
    }

    window.addEventListener('appinstalled', () => {
      setInstalled(true)
      setInstallMessage('App installed successfully! Check your home screen.')
      setShowInstallButton(false)
      setShowManualInstructions(false)
      setDeferredPrompt(null)
    })
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      setInstallMessage('Install prompt not available. Please use manual method below.')
      setShowManualInstructions(true)
      return
    }
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') {
      setInstalled(true)
      setInstallMessage('App installed successfully! Check your home screen.')
    } else {
      setInstallMessage('Installation cancelled. Try the manual method below.')
      setShowManualInstructions(true)
    }
    setDeferredPrompt(null)
    setShowInstallButton(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F3]">
      <Navbar />

      {/* ── HERO — split diagonal design ── */}
      <section className="relative bg-[#2D3E50] overflow-hidden">
        {/* Diagonal amber slash */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#FFAC33] clip-diagonal hidden md:block"
          style={{ clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-20 flex flex-col md:flex-row items-center gap-10">

          {/* Left text */}
          <div className="flex-1 z-10">
            <div className="inline-block border border-[#FFAC33]/40 text-[#FFAC33] text-xs font-bold px-4 py-2 rounded-full mb-5 uppercase tracking-widest">
              Progressive Web App · Free · No App Store
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white font-poppins leading-tight mb-4">
              Download the<br />
              <span className="text-[#FFAC33]">Mumbai121</span> App
            </h1>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Get faster access to jobs, stay updated, and register on the go!
            </p>
          </div>

          {/* Right — floating phone mockup */}
          <div className="shrink-0 z-10">
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-[2.5rem] bg-[#FFAC33]/20 blur-2xl scale-110"></div>

              <div className="relative w-52 bg-[#1a2836] rounded-[2.5rem] p-3 shadow-2xl border border-[#FFAC33]/20">
                <div className="bg-[#FFF9F3] rounded-[2rem] overflow-hidden">
                  {/* Status bar */}
                  <div className="bg-[#2D3E50] px-4 py-2 flex justify-between items-center">
                    <span className="text-white text-xs font-bold">9:41</span>
                    <div className="flex gap-1">
                      <i className="fas fa-signal text-white text-xs"></i>
                      <i className="fas fa-wifi text-white text-xs"></i>
                      <i className="fas fa-battery-full text-white text-xs"></i>
                    </div>
                  </div>
                  {/* App screen */}
                  <div className="px-4 py-5 min-h-[220px]">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-8 h-8 bg-[#2D3E50] rounded-lg flex items-center justify-center">
                        <i className="fas fa-briefcase text-[#FFAC33] text-xs"></i>
                      </div>
                      <span className="font-bold text-[#2D3E50] text-sm font-poppins">Mumbai121</span>
                    </div>
                    <div className="space-y-2 mb-3">
                      {['New Jobs Today', 'Your Applications', 'Messages'].map((item, i) => (
                        <div key={i} className="bg-white rounded-xl p-2.5 shadow-sm flex items-center gap-2 border border-[#FFAC33]/10">
                          <div className="w-5 h-5 bg-[#FFAC33] rounded-full shrink-0"></div>
                          <p className="text-xs text-[#2D3E50] font-medium">{item}</p>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#2D3E50] rounded-xl p-2.5 text-center">
                      <p className="text-[#FFAC33] text-xs font-bold">3 New Job Matches!</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* FREE badge */}
              <div className="absolute -top-2 -right-2 bg-[#FFAC33] text-[#2D3E50] text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                FREE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── INSTALL CARDS — Android + iPhone ── */}
      <section className="py-16 px-6 md:px-20 bg-[#FFF9F3]">
        <div className="max-w-5xl mx-auto">

          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] font-poppins mb-2">Install in Seconds</h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm">No app store needed — install directly from your browser</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* ── Android Card ── */}
            <div className="relative bg-[#2D3E50] rounded-3xl overflow-hidden shadow-xl">
              {/* Top accent strip */}
              <div className="h-2 bg-[#FFAC33] w-full"></div>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#FFAC33] rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fab fa-android text-[#2D3E50] text-3xl"></i>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl font-poppins">For Android Users</h3>
                    <p className="text-gray-400 text-xs">Chrome · Edge · Any Chromium Browser</p>
                  </div>
                </div>

                <p className="text-gray-300 text-sm leading-relaxed mb-6">
                  Installing Mumbai121.com on Android is quick and safe.
                </p>

                {/* Install button inside Android card */}
                <button
                  onClick={handleInstallClick}
                  className="w-full flex items-center justify-center gap-3 bg-[#FFAC33] hover:bg-white text-[#2D3E50] font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-base mb-4"
                >
                  <i className="fas fa-download text-lg"></i>
                  INSTALL APP — Android Only
                </button>

                {installMessage && (
                  <p className="text-[#FFAC33] text-xs text-center mb-4 leading-relaxed">{installMessage}</p>
                )}

                {/* Manual Instructions */}
                {showManualInstructions && (
                  <div className="mt-4 border-t border-white/10 pt-5">
                    <h4 className="text-white font-bold text-sm mb-3 font-poppins">Alternative: Install Manually</h4>
                    <ol className="space-y-2.5">
                      {[
                        <>Open <strong className="text-[#FFAC33]">Chrome</strong> on your Android phone</>,
                        <>Visit <strong className="text-[#FFAC33]">https://www.mumbai121.com/</strong></>,
                        <>Tap the <strong className="text-[#FFAC33]">three dots menu (⋮)</strong> in the top right</>,
                        <>Select <strong className="text-[#FFAC33]">"Add to Home screen"</strong> or <strong className="text-[#FFAC33]">"Install app"</strong></>,
                        <>Tap <strong className="text-[#FFAC33]">Add</strong> — the app icon appears on your Home Screen</>,
                      ].map((step, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="w-6 h-6 bg-[#FFAC33] text-[#2D3E50] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                          <span className="text-gray-300 text-xs leading-relaxed">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </div>
            </div>

            {/* ── iPhone Card ── */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#FFAC33]/20">
              {/* Top accent strip */}
              <div className="h-2 bg-[#2D3E50] w-full"></div>

              <div className="p-8">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#2D3E50] rounded-2xl flex items-center justify-center shadow-lg">
                    <i className="fab fa-apple text-white text-3xl"></i>
                  </div>
                  <div>
                    <h3 className="text-[#2D3E50] font-bold text-xl font-poppins">For iPhone Users</h3>
                    <p className="text-gray-400 text-xs">Safari Browser Only</p>
                  </div>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  iPhone users can install Mumbai121.com using Safari.
                </p>

                {/* Steps */}
                <h4 className="font-bold text-[#2D3E50] text-sm mb-3 font-poppins">Steps to Install:</h4>
                <ol className="space-y-2.5 mb-5">
                  {[
                    <>Open <strong className="text-[#2D3E50]">Safari</strong> browser on your iPhone</>,
                    <>Visit <strong className="text-[#2D3E50]">https://www.mumbai121.com/</strong></>,
                    <>Tap the <strong className="text-[#2D3E50]">Share icon</strong> <i className="fas fa-share text-[#FFAC33] mx-1"></i> at the bottom</>,
                    <>Scroll down and choose <strong className="text-[#2D3E50]">"Add to Home Screen"</strong></>,
                    <>Tap <strong className="text-[#2D3E50]">Add</strong> — the app appears on your Home Screen</>,
                  ].map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="w-6 h-6 bg-[#2D3E50] text-[#FFAC33] rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                      <span className="text-gray-600 text-xs leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>

                
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SAFE & SECURE — zigzag layout ── */}
      <section className="py-16 px-6 md:px-20 bg-[#f9ebdc]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3E50] font-poppins mb-2">
              Safe & Secure Installation
            </h2>
            <div className="flex justify-center mb-2">
              <div className="h-1 w-16 bg-[#FFAC33] rounded-full"></div>
            </div>
            <p className="text-gray-600 text-sm">Your privacy and data security are our top priority.</p>
          </div>

          <div className="space-y-4">
            {[
              { icon: 'fa-shield-alt',           text: 'The app is designed to offer a fast, secure, and lightweight experience',                                                                         side: 'left'  },
              { icon: 'fa-lock',                 text: 'We do not ask for any app permissions, making this app extremely safe to use',                                                                   side: 'right' },
              { icon: 'fa-exclamation-triangle', text: 'If at any time the app unexpectedly requests permissions, do not grant them and report it to us immediately',                                    side: 'left'  },
              { icon: 'fa-check-circle',         text: 'All major browsers have built-in security features — any threat will be automatically detected and blocked by your browser',                    side: 'right' },
            ].map((item, i) => (
              <div
                key={i}
                className={`flex items-start gap-5 bg-white rounded-2xl px-6 py-5 shadow-sm border border-[#FFAC33]/20 hover:border-[#FFAC33] hover:shadow-md transition-all duration-300 ${
                  item.side === 'right' ? 'md:ml-16' : 'md:mr-16'
                }`}
              >
                <div className="w-12 h-12 bg-[#2D3E50] rounded-2xl flex items-center justify-center shrink-0">
                  <i className={`fas ${item.icon} text-[#FFAC33] text-lg`}></i>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── CTA ── */}
      <section className="py-16 px-6 bg-[#2D3E50] text-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-[#FFAC33]/10 rounded-full -translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-[#FFAC33]/10 rounded-full translate-x-20 translate-y-20"></div>

        <div className="relative max-w-2xl mx-auto">
          <i className="fas fa-mobile-alt text-[#FFAC33] text-5xl mb-6"></i>
          <h2 className="text-3xl font-bold text-white mb-3 font-poppins">
            Your Dream Job is One Tap Away!
          </h2>
          <p className="text-gray-300 mb-8 text-base">
            Install the Mumbai121 app today and never miss a job opportunity again.
          </p>

          <button
            onClick={handleInstallClick}
            className="inline-block bg-[#FFAC33] hover:bg-white text-[#2D3E50] font-bold py-4 px-10 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl text-lg mb-4"
          >
            Install App Now <i className="fas fa-download ml-2"></i>
          </button>

          {/* Android only notice */}
          <div className="flex items-center justify-center gap-3 bg-white/10 border border-[#FFAC33]/30 rounded-2xl px-6 py-3 max-w-sm mx-auto mb-5">
            <i className="fab fa-android text-[#FFAC33] text-2xl shrink-0"></i>
            <p className="text-gray-300 text-xs text-left leading-relaxed">
              <strong className="text-[#FFAC33]">Android users only</strong> — this button triggers the install prompt.
              iPhone users should follow the <strong className="text-white">Safari → Add to Home Screen</strong> steps above.
            </p>
          </div>

          <p className="text-gray-400 text-sm">
            Need help?{' '}
            <Link href="/contact" className="text-[#FFAC33] hover:underline">
              Contact our support team
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}