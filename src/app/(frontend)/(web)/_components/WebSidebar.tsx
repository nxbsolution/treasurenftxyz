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

export default function WebSideBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Menu size={30} strokeWidth={2} className="stroke-foreground" />
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>
                        <Link href={isLoggedIn ? '/logout' : '/login'}>
                            <Button className='border-2 rounded-xl text-lg max-sm:text-base p-4 text-card max-sm:p-4 hover:bg-card hover:text-foreground focus-visible:ring-card focus-visible:ring-0'>{isLoggedIn ? "Logout" : "Login"}</Button>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    )
}
