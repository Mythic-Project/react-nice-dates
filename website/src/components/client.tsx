'use client-entry'

import type { ReactNode } from 'react'
import { hydrate, fetchRSC } from '@parcel/rsc/client'

const updateRoot = hydrate({
  // Intercept HMR window reloads, and do it with RSC instead.
  onHmrReload() {
    void navigate(location.pathname)
  }
})

// A very simple router. When we navigate, we'll fetch a new RSC payload,
// and in a React transition, stream in the new page. Once complete, we'll
// pushState to update the URL in the browser.
async function navigate(pathname: string, push = false) {
  let root = await fetchRSC<ReactNode>(pathname.replace(/\.html$/, '.rsc'))
  updateRoot(root, () => {
    if (push) {
      history.pushState(null, '', pathname)
    }
  })
}

let lastPathname = location.pathname

// Intercept link clicks to perform RSC navigation.
document.addEventListener('click', e => {
  lastPathname = location.pathname

  const link = (e.target as Element).closest('a')
  if (
    link &&
    link instanceof HTMLAnchorElement &&
    link.href &&
    (!link.target || link.target === '_self') &&
    !(link.pathname === location.pathname && link.hash !== '') && // not an anchor link on same page
    link.origin === location.origin &&
    !link.hasAttribute('download') &&
    e.button === 0 && // left clicks only
    !e.metaKey && // open in new tab (mac)
    !e.ctrlKey && // open in new tab (windows)
    !e.altKey && // download
    !e.shiftKey &&
    !e.defaultPrevented
  ) {
    e.preventDefault()
    void navigate(link.pathname, true)
  }
})

// When the user clicks the back button, navigate with RSC.
window.addEventListener('popstate', () => {
  // popstate is triggered by both back/forward navigation and hash changes.
  if (lastPathname !== location.pathname) {
    void navigate(location.pathname)
  }
  lastPathname = location.pathname
})
