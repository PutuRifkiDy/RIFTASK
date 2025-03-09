import GetStatusBadge from '@/Components/GetStatusBadge';
import Header from '@/Components/Header';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardFooter } from '@/Components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import AppLayout from '@/Layouts/AppLayout';
import { Link } from '@inertiajs/react';
import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { PiArrowLeft, PiArrowRight, PiArrowsDownUp, PiDotsThreeOutlineVerticalFill } from 'react-icons/pi';

export default function Index({ page_settings, ...props }) {
    const { data: tasks, meta, links } = props.tasks;

    return (
        <>
            <Header title={page_settings.title} subtitle={page_settings.subtitle} />
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
                                                <Button variant="ghost" className="group inline-flex">
                                                    Title
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button variant="ghost" className="group inline-flex">
                                                    Status
                                                    <span className="ml-2 flex-none rounded text-foreground">
                                                        <PiArrowsDownUp className="h-5 w-5" />
                                                    </span>
                                                </Button>
                                            </th>
                                            <th
                                                className="5 foont-semibold px-2 py-3 text-left text-sm text-foreground"
                                                scope="col"
                                            >
                                                <Button variant="ghost" className="group inline-flex">
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
                                                <span className="sr-only">Action</span>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task, index) => (
                                            <tr key={index}>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {task.memberable.title}
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    <GetStatusBadge status={task.memberable.status} />
                                                </td>
                                                <td className="whitespace-nowrap px-6 py-8 text-sm font-medium text-foreground">
                                                    {task.memberable.created_at}
                                                </td>
                                                <td className="relative space-x-4 whitespace-nowrap px-6 py-8 text-right text-sm">
                                                    <div className="flex justify-end">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger>
                                                                <PiDotsThreeOutlineVerticalFill className="size-4" />
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuItem asChild>
                                                                    <Link href={task.memberable.detail}>Detail</Link>
                                                                </DropdownMenuItem>
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
