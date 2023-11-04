import Image from "next/image"
import Link from "next/link"
import React from "react"
import { BsGraphDownArrow } from "react-icons/bs"
import { IoSearchCircleOutline } from "react-icons/io5"

interface DesktopNavbarProps {
	avatar: string
	isDropdownOpen: boolean
	toggleDropdown: () => void
}

const DesktopNavbar: React.FC<DesktopNavbarProps> = ({
	avatar,
	toggleDropdown,
	isDropdownOpen,
}) => {
	return (
		<div>
			<nav className="hidden md:flex w-full justify-center items-center py-8">
				<div className="flex justify-between w-[90%] gap-12 items-center">
					<Link href="/">
						<Image
							src="/convAI_logo.png"
							alt="logo"
							width={75}
							height={75}
						/>
					</Link>
					<div className="flex items-center gap-4 cursor-pointer">
						<span className="text-[26px] font-normal">
							Categories{" "}
						</span>
						<BsGraphDownArrow className="text-[26px] text-gray-600" />
					</div>
					<span className="text-[26px] font-normal flex items-center cursor-pointer">
						What's New
					</span>
					<div className="relative h-[44px] flex items-center bg-gray-200 w-[450px] px-6 rounded-full">
						<input
							className="font-normal text-xl bg-inherit outline-none text-gray-600 focus:text-gray-600"
							placeholder="Search for anything you need"
						/>
						<IoSearchCircleOutline className="text-lg text-gray-600 absolute right-6" />
					</div>

					{avatar ? (
						<div className="relative" onClick={toggleDropdown}>
							<Image
								src={avatar}
								alt="tempProfile"
								height={50}
								width={50}
								className="rounded-full cursor-pointer"
							/>
						</div>
					) : (
						<Link href="/auth/login">
							<span className="font-bold text-xl cursor-pointer">
								Login
							</span>
						</Link>
					)}
					<Image
						src="/cart.png"
						alt="cart"
						width={32}
						height={32}
						className="cursor-pointer"
					/>
					{isDropdownOpen && (
						<div className="absolute top-24 right-10 w-48 bg-white rounded-lg shadow-lg">
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
				</div>
			</nav>
		</div>
	)
}

export default DesktopNavbar
