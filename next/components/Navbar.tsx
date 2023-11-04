'use client'

import Image from "next/image";
import React, { useEffect, useState } from "react";
import icons from "../icons";
import Link from "next/link";
import { Database } from "../types/supabase";
import { Session, createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

const Navbar = ({ session }: { session: Session | null }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const supabase = createClientComponentClient<Database>()
  const [avatar, setAvatar] = useState("")
  const user = session?.user;

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
    console.log("dropped");
  }

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const { data, error } = await supabase
        .from('profiles')
        .select('avatar_url')
        .eq('id', user?.id as string)
        .single();

      if (error) {
        console.error('Error fetching data:', error);
      } else {
        setAvatar(data?.avatar_url ? data.avatar_url : "/tempProfile.png")

      }
    };

    fetchData()
  }, [avatar]);

  return (
    <>
    <DesktopNavbar avatar={avatar} toggleDropdown={toggleDropdown} isDropdownOpen={isDropdownOpen}/>
    <MobileNavbar avatar={avatar}/>
    </>
  );
};

export default Navbar;
