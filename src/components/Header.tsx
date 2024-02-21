import Link from './Link'
import ThemeSwitch from './ThemeSwitcher'
import Image from "./Image";
import AddPostButton from './AddPostButton';
import useNetworkStatus from '@/hooks/useNetworkStatus';

const Header = () => {
  const { isOnline } = useNetworkStatus();

  return (
    <header className="flex items-center justify-between p-4 bg-gray-300 dark:bg-black">
      <div>
        <Link href="/">
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Image className='' width={48} height={48} src="/logo.svg" alt="logo"/>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
       <AddPostButton disabled={isOnline == false}  />
       {/* Search icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 text-gray-900 dark:text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header