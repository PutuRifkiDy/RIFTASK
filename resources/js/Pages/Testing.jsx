import AppLayout from '@/Layouts/AppLayout';

export default function Testing() {
    return <div>this is testing</div>;
}

Testing.layout = (page) => <AppLayout children={page} title="Testing" />;
