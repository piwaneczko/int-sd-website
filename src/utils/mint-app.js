// Where the MINT app lives, and how the QR code on a sensor's sticker reaches it.
//
// The sticker opens https://www.int-sd.net/mint?mac=C28FA5991E67 (the sensor's
// BLE address, 12 hex digits). The app registers that very link, so on a phone
// that has it, it opens straight into the connection; otherwise this page
// sends the user to the store.

export const MINT_APP_PACKAGE = 'net.intsd.mint'

// The one place to change when the store listing moves or a second store appears.
export const MINT_PLAY_URL = `https://play.google.com/store/apps/details?id=${MINT_APP_PACKAGE}`

// A walk-through of the app, shown on the MINT page.
export const MINT_DEMO_VIDEO_URL = 'https://youtu.be/kjlsYCT7qT0'

const HEX12 = /^[0-9A-Fa-f]{12}$/

// 'C28FA5991E67', 'c2:8f:a5:99:1e:67' or 'c2-8f-...' -> 'C28FA5991E67'; null if it
// is not a BLE address. The page shows nothing for a link without one.
export function parseMac(raw) {
  if (!raw) return null
  const digits = raw.replace(/[:-]/g, '')
  return HEX12.test(digits) ? digits.toUpperCase() : null
}

// 'C28FA5991E67' -> 'C2:8F:A5:99:1E:67', for showing it to the user.
export function formatMac(mac12) {
  return mac12.match(/.{2}/g).join(':')
}

// An Android intent link: opens the installed app on this very address, and
// falls back to the store page when the app is not installed. One button for
// both cases. Naming the package makes it work without App Link verification.
export function androidIntentUrl(mac12) {
  const fallback = encodeURIComponent(MINT_PLAY_URL)
  return (
    `intent://www.int-sd.net/mint?mac=${mac12}` +
    `#Intent;scheme=https;package=${MINT_APP_PACKAGE};S.browser_fallback_url=${fallback};end`
  )
}

// 'android' | 'ios' | 'other', from the browser's user agent.
export function detectPlatform(userAgent) {
  if (/android/i.test(userAgent)) return 'android'
  if (/iphone|ipad|ipod/i.test(userAgent)) return 'ios'
  return 'other'
}
