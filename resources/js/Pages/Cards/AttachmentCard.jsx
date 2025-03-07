import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';

export default function AttachmentCard({ action }) {
    const { data, setData, post, processing, errors, recentlySuccessful } = useForm({
        file: '',
        name: '',
        link: '',
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
                                    <InputLabel htmlFor="file" value="File" />
                                    <TextInput
                                        type="file"
                                        id="file"
                                        name="file"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        onChange={(e) => setData(e.target.name, e.target.files[0])}
                                        onErrors={errors.file && <InputError message={errors.file} />}
                                    />
                                </div>
                                <div className="col-span-full">
                                    <InputLabel htmlFor="link" value="Link" />
                                    <TextInput
                                        type="text"
                                        id="link"
                                        name="link"
                                        className="mt-1 block w-full"
                                        isFocused={true}
                                        value={data.link}
                                        onChange={onHandleChange}
                                        onErrors={
                                            errors.link && <InputError message={errors.link} />
                                        }
                                    />
                                </div>
                                <div className="col-span-full">
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={onHandleChange}
                                        onErrors={errors.name && <InputError message={errors.name} />}
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
                                enterForm="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-muted-foreground">Saved.</p>
                            </Transition>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </>
    );
}

AttachmentCard.layout = (page) => <AppLayout children={page} title={page.props.page_settings.title} />;
