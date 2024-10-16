import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const { AlignJustify } = require("lucide-react");
const { Button } = require("../ui/button");
const { Sheet, SheetTrigger, SheetContent } = require("../ui/sheet");

function Header({user}) {

    const menuItems = [
        {
        label: "Home",
        href: "/",
        show: true,
        },
        {
        label: "Login",
        href: "/sign-in",
        show: !user,
        },
        {
        label: "Register",
        href: "/sign-up",
        show: !user,
        },
        {
            label: "Dashboard",
            href: "/dashboard",
            show: user,
        },
        {
            label: "About",
            href: "/about",
            show: user,
        },
        {
            label: "Profile",
            href: "/profile",
            show: user,
        },   


          
    ]

  return (
    <header className="flex h-16 w-full shrink-0 items-center pt-5">
        <Sheet>
            <SheetTrigger asChild>
                <Button className="lg:hidden">
                    <AlignJustify className="w-6 h-6"/>
                    <span className="sr-only">
                        Toggle Navigation Menu

                    </span>

                </Button>
            </SheetTrigger>  
            <SheetContent side="left">
                    <Link href={'#'} className="mr-6 hidden lg:flex">
                        <h3>DOCSFLITE</h3>
                    </Link>
                    <div className="grid gap-2 py-6">
                        {
                            menuItems.map((item, index) => {
                                if(item.show){
                                    return(
                                        <Link href={item.href} key={index} className="flex w-full items-center py-2 font-semibold text-lg">
                                            
                                                {item.label}
                                            
                                        </Link>
                                    )
                                }
                            })
                        }
                    <UserButton afterSignOutUrl="/"/>
                    </div>


                </SheetContent>  
        </Sheet>
        <Link href={'/'} className="mr-6 hidden font-bold text-3xl lg:flex">
        <img src="/logo2.png" className="w-10 h-10 mr-2"/>DOCSFLITE</Link>
<nav className="ml-auto hidden lg:flex gap-6 list-none">
  {menuItems.map((item, index) => {
    if (item.show) {
      return (
        <Link
          href={item.href}
          key={index}
          className="uppercase no-underline tracking-widest py-0 px-5 relative inline-block group"
        >
          {item.label}
          <span className="block h-0.5 bg-green-500 transition-all duration-300 transform scale-x-0 group-hover:scale-x-100 absolute bottom-0  origin-left w-full" style={{ width: '72%' }}></span>
        </Link>
      );
    }
    return null;
  })}
  <UserButton afterSignOutUrl="/"/>
</nav>

          
    </header>
  );
}

export default Header;