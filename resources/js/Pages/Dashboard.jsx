import Header from '@/Components/Header';
import { AvatarFallback } from '@/Components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import Widget from '@/Components/Widget';
import AppLayout from '@/Layouts/AppLayout';
import { Link, usePage } from '@inertiajs/react';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PiBriefcase, PiCheckLight, PiNewspaperClipping, PiSquaresFour, PiUserCheck } from 'react-icons/pi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({count, page_settings, productivity_chart, tasks}) {
    const auth = usePage().props.auth.user;

    console.log("cek isi tasks", tasks);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Productivity Chart',
            },
        }
    };

    const data = {
        labels: productivity_chart.label,
        datasets: productivity_chart.datasets.map((dataset) => (
            {
                label: dataset.label,
                data: dataset.data,
                backgroundColor: dataset.backgroundColor
            }
        )),
    };
    return (
        <>
            <div>
                <div className="xl:pr-96">
                    <div>
                        <Header title={page_settings.title} subtitle={page_settings.subtitle} />
                        <div>
                            <dl className='grid grid-cols-1 gap-5 mt-5 sm:grid-cols-2 lg:grid-cols-3'>
                                {/* <Widget icon={<PiUserCheck className='w-6 h-6 text-white' />} title="Users" count={count.users} bgColor='bg-yellow-400'/> */}
                                <Widget icon={<PiBriefcase className='w-6 h-6 text-white' />} title="Workspace" count={count.workspaces} bgColor='bg-yellow-400'/>
                                <Widget icon={<PiSquaresFour className='w-6 h-6 text-white' />} title="My Tasks" count={count.tasks} bgColor='bg-indigo-400'/>
                                <Widget icon={<PiCheckLight className='w-6 h-6 text-white' />} title="Dones" count={count.tasks} bgColor='bg-green-400'/>
                            </dl>
                        </div>
                        <div className='px-4 pt-5 pb-6 mt-8 bg-white border rounded-lg sm:px-6 sm:pt-6'>
                            <Bar options={options} data={data} />
                        </div>
                    </div>
                </div>
            </div>
            <aside className='fixed inset-y-0 right-0 hidden w-96 px-4 py-6 overflow-y-auto border-l border-gray-200 lg:px-8 xl:block'>
                {/* card */}
                <Card className='mb-4'>
                    <CardContent className='mt-4'>
                        <div className="flex flex-col items-center">
                            <Avatar className='mb-2 h-14 w-14'>
                                <AvatarImage src={auth.avatar} alt={auth.name} />
                                <AvatarFallback>{auth.name.substring(0, 1)}</AvatarFallback>
                            </Avatar>
                            <span className='text-lg font-semibold leading-relaxed tracking-[0.0625rem] line-clamp-1 text-foreground'>
                                {auth.name}
                            </span>
                            <span className='-mt-1 text-sm font-light text-muted-foreground'>
                                {auth.email}
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className='text-lg leading-relaxed'>
                            Your To Do List
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {tasks.map((task, index) => (
                            <Link key={index} href={task.memberable.detail} className='hover:text-red-500'>
                                <div className="flex items-center mb-4 gap-x-2">
                                    <div className='p-3 bg-indigo-500 rounded-full'>
                                        <PiNewspaperClipping className='w-6 h-6 text-white' />
                                    </div>
                                    <div className='flex flex-col items-start'>
                                        <span className='text-base font-medium leading-relaxed line-clamp-1'>
                                            {task.memberable.title}
                                        </span>
                                        <span className='text-xs font-light text-muted-foreground'>
                                            {task.memberable.created_at}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </CardContent>
                </Card>
            </aside>
        </>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
