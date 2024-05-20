'use client'

import { useOrganization } from '@clerk/nextjs'
import React from 'react'
import BoardList from './_components/board-list'
import EmptyOrg from './_components/empty-states/empty-org'

type Props = {
  searchParams: {
    search?: string
    favorites?: string
  }
}

export default function SitePage({ searchParams }: Props) {
  const { organization } = useOrganization()

  return (
    <div className='flex-1 h-[calc(100%-80px)] p-6'>
      {organization ? (
        <BoardList orgId={organization.id}
          query={searchParams} />
      ) : (
      <EmptyOrg />
      )}
    </div>
  )
}