import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export default function SideBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Menu size={30} strokeWidth={2} className="stroke-background" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Link href={isLoggedIn ? '/logout' : '/login'}>
                            <Button className='border-2 rounded-xl text-lg max-sm:text-base p-4 text-card max-sm:p-4 hover:bg-card hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>{isLoggedIn ? "Logout" : "Login"}</Button>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="grid gap-2 py-4">
                    <Link href={'/contribution-form'} aria-label="go to contribution form">
                        <span className=''>Contribution Form</span>
                    </Link>
                    <hr className="bg-foreground" />
                    <Link href={'/star'} aria-label="go to star">
                        <span>Star</span>
                    </Link>
                    <hr className="bg-foreground" />
                    <Link href={'/sallery'} aria-label="go to sallery">
                        <span>Sallery</span>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
