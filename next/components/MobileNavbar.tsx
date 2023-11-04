import React, { useState } from "react"
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, ShoppingCart } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { BsGraphDownArrow } from "react-icons/bs"
import { BiCart } from "react-icons/bi"
import { IoSearchCircleOutline } from "react-icons/io5"

interface MobileNavbarProps {
	avatar: string
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
	avatar
}) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
	return (
		<div className="flex md:hidden w-full px-3">
			<Sheet>
				<SheetTrigger className="flex justify-end w-full">
					{<Menu />}
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-2 md:hidden">
					<SheetHeader className="w-full">
						<Link href="/" className="flex justify-center">
							<Image
								src="/convAI_logo.png"
								alt="logo"
								width={75}
								height={75}
							/>
						</Link>
					</SheetHeader>
					<ul className="flex flex-col items-start gap-8 mt-4">
						<li className="flex gap-2 items-center">
							<span className="text-xl font-normal">
								Categories{" "}
							</span>
							<BsGraphDownArrow className="text-xl text-gray-600" />
						</li>
						<li>
							<span className="text-xl font-normal flex items-center cursor-pointer">
								What's New
							</span>
						</li>
						<li>
							<div className="relative h-[44px] flex items-center bg-gray-200 w-[250px] px-6 rounded-full">
								<input
									className="font-normal text-sm bg-inherit outline-none text-gray-600 focus:text-gray-600"
									placeholder="Search for anything you need"
								/>
								<IoSearchCircleOutline className="text-xl text-gray-600 absolute right-2" />
							</div>
						</li>
						<li className="flex w-full gap-4 relative">
							{avatar ? (
								<div
									className="relative"
									onClick={toggleDropdown}
								>
									<Image
										src={avatar}
										alt="tempProfile"
										height={50}
										width={50}
										className="rounded-full cursor-pointer"
									/>
								</div>
							) : (
								<Link href="/auth/login" className="flex items-center">
									<span className="font-bold text-xl cursor-pointer">
										Login
									</span>
								</Link>
							)}
							<BiCart className="text-[48px] text-gray-600"/>
                            {isDropdownOpen && (
						<div className="absolute top-14 right-5 w-48 bg-white rounded-lg shadow-lg">
							<div
								className="py-1"
								role="menu"
								aria-orientation="vertical"
								aria-labelledby="options-menu"
							>
								<Link
									href="/account"
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									Edit Profile
								</Link>
								<Link
									href="/auth/logout"
									className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
									role="menuitem"
								>
									Logout
								</Link>
							</div>
						</div>
					)}
						</li>
					</ul>
				</SheetContent>
			</Sheet>
		</div>
	)
}

export default MobileNavbar
