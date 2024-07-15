import { Button, Link, Image } from 'design-web';

const MobileNav = () => {
  return (
    <div className="flex flex-row items-center justify-start p-4 space-x-4 w-full border-b">
      <Button type="button" className="text-xl">
        ☰
      </Button>
      <div className="flex items-left justify-left">
        <Link href="/" className="main-logo">
          <Image className="w-1/2" src="" alt="logo" />
        </Link>
      </div>
    </div>
  );
};

export default MobileNav;
