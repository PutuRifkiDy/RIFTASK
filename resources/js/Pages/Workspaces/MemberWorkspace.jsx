import AppLayout from "@/Layouts/AppLayout";
import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { toast } from 'sonner';
import { Transition } from "@headlessui/react";
import { Avatar, AvatarFallback } from "@/Components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default function MemberWorkspace({ action, members }) {
    const { data, setData, processing, errors, reset, post, recentlySuccessful } = useForm({
        email: '',
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
        <Card className="md:col-span-2">
            <CardContent>
                <form onSubmit={onHandleSubmit}>
                    <div className="py-6">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="col-span-full">
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    type="email"
                                    name="email"
                                    id="email"
                                    value={data.email}
                                    onChange={onHandleChange}
                                    onErrors={errors.email && <InputError message={errors.email} />}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end gap-x-2 py-6">
                        <Button type="button" variant="ghost" onClick={() => reset()}>
                            Reset
                        </Button>
                        <Button variant="red" type="submit" disabled={processing}>
                            Invite
                        </Button>
                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out duration-300"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out duration-300"
                            leaveForm="opacity-0"
                        >
                            <p className='text-sm text-muted-foreground'>
                                Invited.
                            </p>
                        </Transition>
                    </div>
                </form>
                <div className="pt-6 space-y-4">
                    <ul role="list" className='border border-gray-200 divide-y divide-gray-100 rounded-md'>
                        {members.map((member, index) => (
                            <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-relaxed" key={index}>
                                <div className="flex items-center flex-1 w-0">
                                    <Avatar>
                                        <AvatarImage src={member.user.avatar} />
                                        <AvatarFallback>
                                            {member.user.name.substring(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col min-w-0 ml-4">
                                        <span className='font-medium truncate'>
                                            {member.user.name}
                                        </span>
                                        <span className='hidden text-muted-foreground sm:block'>
                                            {member.user.email}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex-shrink-0 ml-4">
                                    <Button
                                        variant='link'
                                        className='font-medium text-red-500 hover:text-red-600 hover:no-underline'
                                    >
                                        Remove
                                    </Button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
        </Card>
    );
}

MemberWorkspace.layout = (page) => <AppLayout children={page} title="Edit Workspace" />;
