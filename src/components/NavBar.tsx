"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, Dropdown, Navbar, Button, TextInput } from "flowbite-react";
import { useAuth } from "@/lib/auth";
import { useState } from "react";
import { HiSearch } from "react-icons/hi";

export function NavBarFlowbite() {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <Navbar fluid className="bg-white border-b border-gray-200 px-4 py-3 shadow-sm">
            <Link href="/">
                <span className="text-2xl font-bold text-gray-900 cursor-pointer">
                    My Website
                </span>
            </Link>

            {/* Search Input (Desktop) */}
            <div className="hidden md:flex items-center w-64">
                <TextInput
                    icon={HiSearch}
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="flex md:order-2 items-center gap-4">
                {user ? (
                    <Dropdown
                        arrowIcon={false}
                        inline
                        label={
                            <Avatar
                                alt="User settings"
                                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                rounded
                                className="cursor-pointer border rounded-full border-gray-300 hover:border-gray-500 transition-all"
                            />
                        }
                    >
                        <Dropdown.Header>
                            <span className="block text-sm font-semibold">{user.name}</span>
                            <span className="block truncate text-sm text-gray-500">{user.email}</span>
                        </Dropdown.Header>
                        {user.is_admin && (
                            <Dropdown.Item>
                                <Link href={"/admin"}>
                                    Admin Dashboard
                                </Link>
                            </Dropdown.Item>
                        )}
                        <Dropdown.Item>
                            <Link href={"/user/profile"}>
                                Profile
                            </Link>
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item as="button" onClick={logout} className="text-red-500 hover:bg-red-100">
                            Sign out
                        </Dropdown.Item>
                    </Dropdown>
                ) : (
                    <Link href="/auth/login">
                        <Button color="blue" size="sm" className="rounded-lg">
                            Login
                        </Button>
                    </Link>
                )}
                <Navbar.Toggle onClick={() => setIsMenuOpen(!isMenuOpen)} />
            </div>

            {/* Mobile Menu (Search + NavItem) */}
            <div className={`w-full md:hidden transition-all duration-200 ${isMenuOpen ? "block" : "hidden"} `}>
                <div className="w-full mt-2">
                    <TextInput
                        icon={HiSearch}
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full"
                    />
                </div>

                {/* Nav Links */}
                <div className="mt-2 list-none border border-gray-100 rounded-lg">
                    <NavItem href="/" pathname={pathname}>Home</NavItem>
                    <NavItem href="/contact" pathname={pathname}>Contact</NavItem>
                    <NavItem href="/about" pathname={pathname}>About</NavItem>
                </div>
            </div>

            {/* Nav Links (Desktop) */}
            <Navbar.Collapse className="hidden md:flex">
                <NavItem href="/" pathname={pathname}>Home</NavItem>
                <NavItem href="/contact" pathname={pathname}>Contact</NavItem>
                <NavItem href="/about" pathname={pathname}>About</NavItem>
            </Navbar.Collapse>
        </Navbar>
    );
}

function NavItem({ href, pathname, children }: { href: string; pathname: string; children: React.ReactNode }) {
    const isActive = pathname === href;

    return (
        <Link href={href} passHref legacyBehavior>
            <Navbar.Link
                active={isActive}
                className={`md:text-xl block py-2 px-4 rounded-sm mb-2 md:mb-0 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 text-gray-900 ${isActive
                    ? "bg-blue-700 text-white rounded-sm hover:text-gray-900"
                    : " md:bg-transparent"
                    }`}
            >
                {children}
            </Navbar.Link>
        </Link>
    );
}
