'use client'

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { OrganizationProfile, OrganizationSwitcher, UserButton, useOrganization } from "@clerk/nextjs"
import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import queryString from "query-string"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounceValue } from 'usehooks-ts'

export default function Navbar() {
    const { organization } = useOrganization()
    const router = useRouter()

    const [value, setValue] = useState('')
    const [debouncedValue, _setValue] = useDebounceValue(value, 500)

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value)
    }

    useEffect(() => {
        const url = queryString.stringifyUrl({
            url: '/',
            query: {
                search: debouncedValue,
            },
        }, { skipEmptyString: true, skipNull: true })

        router.push(url)
    }, [debouncedValue, router])

    return (
        <div className='bg-zinc-200 text-zinc-600 flex items-center gap-x-4 p-5'>
            <div className='bg-zinc-200 hidden lg:flex lg:flex-1'>

                {/* SearchInput */}
                <div className='w-full relative'>
                    <Search className='absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground size-4' />
                    <Input className='w-full max-w-[516px] pl-9'
                        placeholder='Search boards'
                        onChange={handleChange}
                        value={value} />
                </div>
            </div>
            <div className='block lg:hidden flex-1'>
                <OrganizationSwitcher hidePersonal
                    appearance={{
                        elements: {
                            rootBox: {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "100%",
                                maxWidth: '376px',
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
            </div>

            {/* InviteButton */}
            {organization && (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">
                            <Plus className="h-4 w-4 mr-2" />
                            Invite members
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[880px]">
                        <OrganizationProfile />
                    </DialogContent>
                </Dialog>
            )}
            <UserButton afterSignOutUrl="/" />
        </div>
    )
}
