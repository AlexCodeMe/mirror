'use client'

import Hint from '@/components/hint'
import { cn } from '@/lib/utils'
import { useOrganizationList } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Item from './item'

export default function List() {
    const { userMemberships } = useOrganizationList({
        userMemberships: {
            infinite: true
        }
    })

    return userMemberships.data?.length ? (
        <ul className='space-y-4'>
            {userMemberships.data?.map((member) => (
                <Item key={member.organization.id}
                    id={member.organization.id}
                    name={member.organization.name}
                    imageUrl={member.organization.imageUrl} />
            ))}
        </ul>
    ) : null
}
