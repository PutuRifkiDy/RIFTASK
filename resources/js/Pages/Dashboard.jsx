import Header from '@/Components/Header';
import Widget from '@/Components/Widget';
import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { PiBriefcase, PiCheckLight, PiSquaresFour, PiUserCheck } from 'react-icons/pi';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard({count, page_settings, productivity_chart}) {
    const auth = usePage().props.auth.user;

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
            </aside>
        </>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
