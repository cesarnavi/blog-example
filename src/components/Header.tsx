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
              <Image className='' width={48} height={48} src="/next.svg" alt="logo"/>
            </div>
          </div>
        </Link>
      </div>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-6">
        <AddPostButton disabled={isOnline == false}  />
        <ThemeSwitch />
      </div>
    </header>
  )
}

export default Header