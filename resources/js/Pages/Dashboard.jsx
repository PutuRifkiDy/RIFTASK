import Header from '@/Components/Header';
import Widget from '@/Components/Widget';
import AppLayout from '@/Layouts/AppLayout';
import { usePage } from '@inertiajs/react';
import { PiBriefcase, PiCheckLight, PiSquaresFour, PiUserCheck } from 'react-icons/pi';

export default function Dashboard({count, page_settings}) {
    const auth = usePage().props.auth.user;
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
                    </div>
                </div>
            </div>
            <aside className='fixed inset-y-0 right-0 hidden px-4 py-6 overflow-y-auto border-l border-gray-200 w-96 lg:px-8 xl:block'>
                {/* card */}
            </aside>
        </>
    );
}

Dashboard.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
