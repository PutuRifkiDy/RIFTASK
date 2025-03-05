import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import EditWorkspace from './EditWorkspace';
import MemberWorkspace from './MemberWorkspace';

export default function Setting({ ...props }) {
    const page_settings = props.page_settings;
    const workspace = props.workspace;
    const visibilities = props.visibilities;



    return (
        <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3">
                <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                <EditWorkspace workspace={workspace} page_settings={page_settings} visibilities={visibilities}/>
            </div>
            <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-3 pt-10">
                <HeaderForm title="Members" subtitle="Please add members to the card" />
                <MemberWorkspace
                    action={route('workspaces.member_store', [workspace])}
                />
            </div>
        </div>
    );
}

Setting.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
