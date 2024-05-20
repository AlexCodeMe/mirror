'use client'

import { Button } from "@/components/ui/button"
import { OrganizationSwitcher, useOrganization } from "@clerk/nextjs"
import { Banknote, LayoutDashboard, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useState } from "react"

export default function OrgSidebar() {
  const searchParams = useSearchParams()
  const favorites = searchParams.get('favorites')

  const isSubscribed = false

  const { organization } = useOrganization()

  const [pending, setPending] = useState(false)

  async function onClick() {
    if (!organization?.id) return

    setPending(true)

    try {

    } catch (error) {

    } finally {
      setPending(false)
    }
  }

  return (
    <div className='bg-rose-600 hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5'>
      <Link href='/'>
        <div className='flex items-center gap-x-2'>
          <Image src='/logo.svg' alt='logo'
            height={60} width={60} />\
          <span className='font-semibold text-2xl'>
            Mirror
          </span>
        </div>
      </Link>
      <OrganizationSwitcher hidePersonal
        appearance={{
          elements: {
            rootBox: {
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            },
            organizationSwitcherTrigger: {
              padding: "6px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #E5E7EB",
              justifyContent: "space-between",
              backgroundColor: "white",
            }
          }
        }} />

        <div className='space-y-1 w-full'>
          <Button variant={favorites ? 'ghost' : 'secondary'}
            size='lg' className='font-normal justify-start px-2 w-full'
            asChild>
            <Link href='/'>
              <LayoutDashboard className='size-4 mr-2' />
              Team Boards
            </Link>
          </Button>
          <Button variant={favorites ? 'secondary' : 'ghost'}
            size='lg' className='font-normal justify-start px-2 w-full'
            asChild>
            <Link href='/'>
              <Star className='size-4 mr-2' />
              Favorite Boards
            </Link>
          </Button>
          <Button variant='ghost' size='lg'
            onClick={onClick} disabled={pending}
            className='font-normal justify-start px-2 w-full'>
            <Banknote className='size-4 mr-2' />
            {isSubscribed ? 'Payment Settings' : 'Upgrade'}
          </Button>
        </div>
    </div>
  )
}
