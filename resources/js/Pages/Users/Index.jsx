import { ActionDialog } from '@/Components/ActionDialog';
import Header from '@/Components/Header';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import { Input } from '@/Components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { useFilter } from '@/Hooks/UseFilter';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { useState } from 'react';
import {
    PiArrowLeft,
    PiArrowRight,
    PiArrowsClockwise,
    PiArrowsDownUp,
    PiDotsThreeOutlineVerticalFill,
    PiPaperPlane,
    PiTrashBold,
} from 'react-icons/pi';

export default function Index({ page_settings, ...props }) {
    const { data: users, meta, links } = props.users;
    const [params, setParams] = useState(props.state);
    console.log('Cek isi user', users);

    useFilter({
        route: route('users.index'),
        values: params,
        only: ['users'],
    });

    const onSortable = (field) => {
        setParams({
            ...params,
            field: field,
            direction: params.direction === 'asc' ? 'desc' : 'asc',
        });
    };

    return (
        <>
            <Header title={page_settings.title} subtitle={page_settings.subtitle} />
            <div className="my-4 flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-4 sm:space-y-8">
                <div className="flex w-full flex-col gap-4 sm:flex-row">
                    <Input
                        className="w-full sm:w-1/4"
                        placeholder="Search"
                        value={params?.search}
                        onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}
                    />
                    <Select value={params?.load} onValueChange={(e) => setParams({ ...params, load: e })}>
                        <SelectTrigger className="w-full sm:w-24">
                            <SelectValue placeholder="Load" />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 25, 50, 75, 100].map((number, index) => (
                                <SelectItem key={index} value={number}>
                                    {number}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => setParams(props.state)}>
                        <PiArrowsClockwise className="mr-2 h-5 w-5" />
                        Clear
                    </Button>
                </div>
            </div>
            <Card>
                <CardContent>
                    <div className="my-8 flow-root">
                        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-5 lg:-mx-8">
                            <div className="inline-block w-full py-2 align-middle sm:px-2">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="bg-gray-50">
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                    onClick={() => onSortable('name')}
                                                >
                                                    Name
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                    onClick={() => onSortable('username')}
                                                >
                                                    Username
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                    onClick={() => onSortable('email')}
                                                >
                                                    Email
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                Avatar
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button
                                                    variant="ghost"
                                                    className="group inline-flex"
                                                    onClick={() => onSortable('created_at')}
                                                >
                                                    Created At
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <span className="not-sr-only">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.name}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.username ?? '-'}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.email}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    <Avatar>
                                                        {user.avatar ? (
                                                            <AvatarImage src={user.avatar} alt={user.name} />
                                                        ) : (
                                                            <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback>
                                                        )}

                                                        {/* <AvatarFallback>{user.name.substring(0, 1)}</AvatarFallback> */}
                                                    </Avatar>
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {user.created_at ?? '-'}
                                                </td>
                                                <td className="relative space-x-4 whitespace-nowrap px-6 py-8 text-right text-sm">
                                                    <div className="flex justify-end">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <PiDotsThreeOutlineVerticalFill className="size-4" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={route('users.edit', [user])}>
                                                                        <PiPaperPlane className="W-4 h-4 text-indigo-600" />
                                                                        Detail
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuGroup>
                                                                    <ActionDialog
                                                                        trigger={
                                                                            <DropdownMenuItem
                                                                                onSelect={(e) => e.preventDefault()}
                                                                            >
                                                                                <PiTrashBold className="W-4 h-4 text-red-600" />{' '}
                                                                                Delete
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        title="Delete People"
                                                                        description="Are you sure you want to delete this user?"
                                                                        action={() => console.log('delete pople')}
                                                                    />
                                                                </DropdownMenuGroup>
                                                            </DropdownMenuContent>
                                                        </DropdownMenu>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </CardContent>

                <CardFooter className="justify-between border-t pt-6 text-sm text-muted-foreground">
                    <p className="text-sm text-muted-foreground">
                        Showing <span className="font-medium text-red-500">{meta.from}</span> of {meta.total}
                    </p>
                    {meta.has_page && (
                        <div className="flex items-center gap-x-1">
                            <Button size="sm" variant="red" asChild>
                                {links.prev ? (
                                    <Link href={links.prev}>
                                        <PiArrowLeft className="-ml-1 mr-1 size-4" />
                                    </Link>
                                ) : (
                                    <span>Prev</span>
                                )}
                            </Button>
                            {meta.links.slice(1, -1).map((link, index) => (
                                <Button key={index} size="sm" variant="outline" asChild>
                                    <Link href={link.url}>{link.label}</Link>
                                </Button>
                            ))}
                            <Button size="sm" variant="red" asChild>
                                {links.next ? (
                                    <Link href={links.next}>
                                        Next <PiArrowRight className="-mr-1 ml-1 size-4" />
                                    </Link>
                                ) : (
                                    <span>Next</span>
                                )}
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}

Index.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
