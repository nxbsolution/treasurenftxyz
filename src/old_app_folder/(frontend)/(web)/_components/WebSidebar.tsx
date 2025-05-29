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

export default function WebSideBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                <Menu size={30} strokeWidth={2} className="stroke-foreground" />
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
                    <Link href={"/dashboard"} aria-label={"Dashboard"}>
                        <SheetClose asChild>
                            <div className='text-lg font-semibold bg-card p-4 rounded-lg hover:bg-primary/30'>
                                Dashboard
                            </div>
                        </SheetClose>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    )
}
