import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import TaskListCard from './TaskListCard';

export default function TasksCard({ action, tasks, has_tasks }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        title: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e) => {
        e.preventDefault();

        post(action, {
            preserveScroll: true,
            preserveState: true,
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
        });
    };
    return (
        <>
            <Card className="md:col-span-2">
                <CardContent>
                    <form onSubmit={onHandleSubmit}>
                        <div className="py-6">
                            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="col-span-full">
                                    <InputLabel htmlFor="title" value="Title" />
                                    <TextInput
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={onHandleChange}
                                        onErrors={errors.title && <InputError message={errors.title} />}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-end gap-x-2 py-6">
                            <Button type="button" variant="ghost" onClick={() => ResetPassword()}>
                                Reset
                            </Button>
                            <Button type="submit" variant="red" disabled={processing}>
                                Save
                            </Button>
                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                    <TaskListCard tasks={tasks} />
                </CardContent>
            </Card>
        </>
    );
}

TasksCard.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
