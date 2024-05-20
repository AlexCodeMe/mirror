'use client'

import Actions from '@/components/actions';
import { api } from '@/convex/_generated/api';
import useApiMutation from '@/hooks/use-api-mutation';
import { useAuth } from '@clerk/nextjs'
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';
import Footer from './footer';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

type Props = {
    id: string
    title: string
    authorName: string
    authorId: string
    createdAt: number
    imageUrl: string
    orgId: string
    isFavorite: boolean
}

export default function BoardCard({
    id,
    title,
    authorName,
    authorId,
    createdAt,
    imageUrl,
    orgId,
    isFavorite
}: Props) {
    const { userId } = useAuth()

    const authorLabel = userId === authorId ? 'You' : authorName
    const createdAtLabel = formatDistanceToNow(createdAt, {
        addSuffix: true,
    })

    const {
        mutate: onFavorite,
        pending: pendingFavorite
    } = useApiMutation(api.board.favorite)
    const {
        mutate: onUnFavorite,
        pending: pendingUnfavorite
    } = useApiMutation(api.board.unfavorite)

    const disabled = pendingFavorite || pendingUnfavorite

    function toggleFavorite() {
        if (isFavorite) {
            onUnFavorite({ id })
            .catch(() => toast.error('Failed to unfavorite'))
        } else {
            onFavorite({ id, orgId })
            .catch(() => toast.error('Failed to favorite'))
        }
    }

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.stopPropagation()
        e.preventDefault()

        toggleFavorite()
    }

    return (
        <Link href={`/board/${id}`}>
            <div className='group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden'>
                <div className='relative flex-1 bg-amber-50'>
                    <Image src={imageUrl} alt={title}
                        fill className='object-fit' />
                    <div className='opacity-0 group-hover:opacity-50 transition-opacity h-full w-full bg-black' />
                    <Actions id={id} title={title} side='right'>
                        <button className='absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none'>
                            <MoreHorizontal className='text-white opacity-75 hover:opacity-100 transition-opacity' />
                        </button>
                    </Actions>
                </div>

                {/* Footer */}
                <div className='relative bg-white p-3'>
                    <p className='text-[13px] truncate max-w-[calc(100%-20px)]'>
                        {title}
                    </p>
                    <p className='opacity-0 group-hover:opacity-100 transition-opacity text-[11px] text-muted-foreground truncate'>
                        {authorLabel}, {createdAtLabel}
                    </p>
                    <button onClick={handleClick}
                        disabled={disabled}
                        className={cn(
                            'opacity-0 group-hover:opacity-100 transition absolute top-3 right-3 text-muted-foreground hover:text-blue-600',
                            disabled && 'cursor-not-allowed opacity-75'
                        )}>
                        <Star className={cn('size-4', isFavorite && 'fill-blue-600 text-blue-600')} />
                    </button>
                </div>
            </div>
        </Link>
    )
}

BoardCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className='aspect-[100/127] rounded-lg overflow-hidden'>
            <Skeleton className='size-full' />
        </div>
    )
}