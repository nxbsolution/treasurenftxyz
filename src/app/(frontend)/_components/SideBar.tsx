import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTrigger,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { dashboardLinks } from "./DashboardLinks"

export default function SideBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Menu size={30} strokeWidth={2} className="stroke-background" />
            </SheetTrigger>
            <SheetContent className="overflow-y-scroll">
                <SheetHeader>
                    <SheetTitle>
                        <Link href={isLoggedIn ? '/logout' : '/login'}>
                            <div className='text-lg font-semibold p-4 rounded-lg hover:bg-primary/70 mt-4 bg-primary text-card'>{isLoggedIn ? "Logout" : "Login"}</div>
                        </Link>
                    </SheetTitle>
                </SheetHeader>
                <div className="grid gap-2 py-4">
                    {
                        dashboardLinks.map((link, index) => (
                            <Link key={index} href={link.href} aria-label={link.label}>
                                <SheetClose asChild>
                                    <div className='text-lg font-semibold bg-card p-4 rounded-lg hover:bg-primary/30'>
                                        {link.label}
                                    </div>
                                </SheetClose>
                            </Link>
                        ))
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}
