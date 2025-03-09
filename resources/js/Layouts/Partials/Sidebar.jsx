import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { PiHouse, PiLockKeyOpen, PiPlus, PiSquaresFour, PiUser } from 'react-icons/pi';

export default function Sidebar({ auth, url, workspaces }) {
    console.log(workspaces);
    return (
        <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                    <ul role="list" className="-mx-2 space-y-2">
                        {/* menu */}
                        <li>
                            <Link
                                href={route('dashboard')}
                                className={cn(
                                    url.startsWith('/dashboard')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter',
                                )}
                            >
                                <PiHouse
                                    className={cn(
                                        url.startsWith('/dashboard') ? 'text-white' : 'text-foreground',
                                        'shrink-6 h-6 w-6',
                                    )}
                                />
                                Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                href=""
                                className={cn(
                                    url.startsWith('/users')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter',
                                )}
                            >
                                <PiUser
                                    className={cn(
                                        url.startsWith('/users') ? 'text-white' : 'text-foreground',
                                        'shrink-6 h-6 w-6',
                                    )}
                                />
                                People
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('mytasks.index')}
                                className={cn(
                                    url.startsWith('/my-tasks')
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-foreground hover:bg-gray-100',
                                    'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter',
                                )}
                            >
                                <PiSquaresFour
                                    className={cn(
                                        url.startsWith('/my-tasks') ? 'text-white' : 'text-foreground',
                                        'shrink-6 h-6 w-6',
                                    )}
                                />
                                My Tasks
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route('logout')}
                                as="button"
                                method="post"
                                className="group flex w-full gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter text-red-600 hover:bg-gray-100"
                            >
                                <PiLockKeyOpen className="shrink-6 h-6 w-6 text-red-600" />
                                Logout
                            </Link>
                        </li>
                    </ul>
                </li>
                <li>
                    {/* workspaces */}
                    <div className="flex items-center justify-between">
                        <div className="text-xs font-semibold uppercase leading-relaxed text-foreground">
                            Workspaces
                        </div>
                        <Link href={route('workspaces.create')}>
                            <PiPlus className="h-6 w-6 text-foreground hover:text-red-600" />
                        </Link>
                    </div>
                    <ul role="list" className="-mx-2 mt-2 space-y-2">
                        {workspaces.map((workspace, index) => (
                            <li key={index}>
                                <Link
                                    href={route('workspaces.show', [workspace.memberable.slug])}
                                    className={cn(
                                        route().current('workspaces.show', [workspace.memberable.slug])
                                            ? 'bg-indigo-600 text-white'
                                            : 'text-foreground hover:bg-gray-100',
                                        'group flex gap-x-3 rounded-md p-3 text-sm font-semibold leading-relaxed tracking-tighter',
                                    )}
                                >
                                    <span
                                        className={cn(
                                            route().current('workspaces.show', [workspace.memberable.slug])
                                                ? 'border-indigo-600 text-indigo-600'
                                                : 'border-foreground text-foreground',
                                            'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-white text-[0.675rem] font-medium',
                                        )}
                                    >
                                        {workspace.memberable.name.charAt(0).toUpperCase()}
                                    </span>
                                    <span className="truncate tracking-[0.025rem]">{workspace.memberable.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </li>
                <li className="-mx-6 mt-auto">
                    {/* profile */}
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-relaxed text-foreground hover:bg-gray-100"
                    >
                        <Avatar>
                            <AvatarImage src={auth.avatar} alt={auth.name} />
                            <AvatarFallback>{auth.name.substring(0,1)}</AvatarFallback>
                        </Avatar>
                        <span>{auth.name}</span>
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
