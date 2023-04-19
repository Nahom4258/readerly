import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs';
import AppBar from '@/components/appBar';

import '@/styles/globals.css'
import Login from './login';

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <SignedIn>
        <AppBar />
        <Component {...pageProps} />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </ClerkProvider>
  )
}
