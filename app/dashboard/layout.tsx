import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "../globals.css"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body>
          <SignedOut>
            <div className="h-screen">
                <h1 className="font-black text-2xl md:text-9xl">Uh-oh, you need an account to access this page.</h1>
                <h2 className="font-bold text-lg md:text-4xl">Signup now!</h2>
                <SignInButton mode="modal" />
            </div>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
          {children}
        </body>
      </html>
  );
}
