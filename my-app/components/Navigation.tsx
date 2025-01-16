import Link from 'next/link'
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs'

const Navigation = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800">FluffyPet</Link>
        <div className="flex items-center">
          <Link href="/search" className="mx-4 text-gray-600 hover:text-gray-800">Search</Link>
          <Link href="/services" className="mx-4 text-gray-600 hover:text-gray-800">Services</Link>
          <Link href="/vets" className="mx-4 text-gray-600 hover:text-gray-800">Vets</Link>
          <Link href="/places" className="mx-4 text-gray-600 hover:text-gray-800">Places</Link>
          <Link href="/articles" className="mx-4 text-gray-600 hover:text-gray-800">Articles</Link>
          <SignedIn>
            <Link href="/profile" className="mx-4 text-gray-600 hover:text-gray-800">Profile</Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </div>
    </nav>
  )
}

export default Navigation

