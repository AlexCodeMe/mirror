'use client'

import { api } from '@/convex/_generated/api'
import useApiMutation from '@/hooks/use-api-mutation'
import { useRenameModal } from '@/store/use-rename-modal'
import { DropdownMenuContentProps } from '@radix-ui/react-dropdown-menu'
import React from 'react'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Link2, Pencil } from 'lucide-react'

type Props = {
    children: React.ReactNode
    side?: DropdownMenuContentProps['side']
    sideOffset?: DropdownMenuContentProps['sideOffset']
    id: string
    title: string
}

export default function Actions({
    children,
    side,
    sideOffset,
    id,
    title
}: Props) {
  const { onOpen } = useRenameModal()
  const { mutate, pending } = useApiMutation(api.board.remove)

  function onCopyLink() {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success('Link copied!'))
      .catch(() => toast.error('Failed to copy link.'))
  }

  function onDelete() {
    mutate({ id })
      .then(() => toast.success('Board deleted'))
      .catch(() => toast.error('Failed to delete board.'))
  }
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent onClick={e => e.stopPropagation()}
        side={side} sideOffset={sideOffset} className='w-60'>
          <DropdownMenuItem onClick={() => onOpen(id, title)}
          className='p-3 cursor-pointer'>
          <Link2 className='size-4 mr-2' />
          Copy Link
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onOpen(id, title)}
          className='p-3 cursor-pointer'>
          <Pencil className='size-4 mr-2' />
          Rename
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}