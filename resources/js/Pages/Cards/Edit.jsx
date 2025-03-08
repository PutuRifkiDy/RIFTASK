import HeaderForm from '@/Components/HeaderForm';
import AppLayout from '@/Layouts/AppLayout';
import AttachmentCard from './AttachmentCard';
import MemberCard from './MemberCard';
import TasksCard from './TasksCard';
import UpdateCard from './UpdateCard';

export default function Edit({ card, page_settings, statuses, priorities, workspace }) {
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 md:grid-cols-3">
                    <HeaderForm title={page_settings.title} subtitle={page_settings.subtitle} />
                    <UpdateCard card={card} page_settings={page_settings} statuses={statuses} priorities={priorities} />
                </div>
                <div className="grid grid-cols-1 gap-x-4 pt-10 md:grid-cols-3">
                    <HeaderForm title="Members" subtitle="Please add members to the card" />
                    <MemberCard action={route('cards.member_store', { card: card })} members={card.members} />
                </div>
                <div className="grid grid-cols-1 gap-x-4 pt-10 md:grid-cols-3">
                    <HeaderForm title="Attachments" subtitle="Please add attachments to the card" />
                    <AttachmentCard
                        action={route('attachments.store', [card])}
                        attachments={card.attachments}
                        has_attachments={card.has_attachments}
                    />
                </div>
                <div className="grid grid-cols-1 gap-x-4 pt-10 md:grid-cols-3">
                    <HeaderForm title="Tasks" subtitle="Please add tasks to the card" />
                    <TasksCard action={route('tasks.store', [card])} tasks={card.tasks} has_tasks={card.has_tasks} />
                </div>
            </div>
        </>
    );
}

Edit.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
