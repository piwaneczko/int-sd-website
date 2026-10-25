import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Bluetooth, Smartphone } from 'lucide-react'
import { Card } from '../ui/card'
import { useLanguage } from '../../contexts/LanguageContext'
import {
  MINT_PLAY_URL,
  androidIntentUrl,
  detectPlatform,
  formatMac,
  parseMac,
} from '../../utils/mint-app'

const buttonBase =
  'inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-lg font-medium transition-all duration-200'

// Shown only when the page was opened from the QR code on a sensor's sticker
// (?mac=<BLE address>): the app and its store links mean nothing without a
// sensor, so a plain visit to /mint does not advertise them.
export function MintConnectCard() {
  const { t } = useLanguage()
  const c = t.mint.connect
  const [params] = useSearchParams()
  const mac = parseMac(params.get('mac'))

  // The prerendered page has no query and no browser, so the platform is only
  // known after hydration; rendering it earlier would not match the markup.
  const [platform, setPlatform] = useState(null)
  useEffect(() => {
    setPlatform(detectPlatform(navigator.userAgent))
  }, [])

  if (!mac || !platform) return null

  return (
    <Card hoverEffect={false} className="max-w-2xl mx-auto mb-12 !border-primary/40">
      <div className="flex items-center gap-3 text-primary mb-2">
        <Bluetooth size={24} />
        <h2 className="text-xl font-semibold text-white">{c.title}</h2>
      </div>
      <p className="text-deep-400 text-sm mb-1">{c.intro}</p>
      <p className="text-deep-400 text-sm mb-5">
        {c.sensor} <span className="font-mono text-white">{formatMac(mac)}</span>
      </p>

      {platform === 'android' && (
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={androidIntentUrl(mac)}
            className={`${buttonBase} bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20`}
          >
            <Smartphone size={20} />
            {c.openApp}
          </a>
          <a
            href={MINT_PLAY_URL}
            className={`${buttonBase} border-2 border-primary text-primary hover:bg-primary hover:text-white`}
          >
            {c.googlePlay}
          </a>
        </div>
      )}

      {platform === 'ios' && <p className="text-deep-400 text-sm">{c.iosSoon}</p>}

      {platform === 'other' && (
        <div>
          <p className="text-deep-400 text-sm mb-4">{c.openOnPhone}</p>
          <a
            href={MINT_PLAY_URL}
            className={`${buttonBase} border-2 border-primary text-primary hover:bg-primary hover:text-white`}
          >
            {c.googlePlay}
          </a>
        </div>
      )}

      <p className="text-deep-500 text-xs mt-5">{c.pinHint}</p>
    </Card>
  )
}
