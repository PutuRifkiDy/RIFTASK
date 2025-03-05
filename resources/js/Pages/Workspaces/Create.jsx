import HeaderForm from '@/Components/HeaderForm';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/Components/ui/select';
import AppLayout from '@/Layouts/AppLayout';
import { flashMessage } from '@/lib/utils';
import { useForm } from '@inertiajs/react';
import { SelectValue } from '@radix-ui/react-select';
import { toast } from 'sonner';

export default function Create({ page_settings, visibilities }) {
    const { data, setData, processing, post, reset, errors } = useForm({
        name: '',
        cover: '',
        logo: '',
        visibility: 'Private',
        _method: page_settings.method,
    });

    const onHandleSubmit = (e) => {
        e.preventDefault();
        post(page_settings.action, {
            onSuccess: (success) => {
                const flash = flashMessage(success);
                if (flash) toast[flash.type](flash.message);
            },
            preserveScroll: true,
            preserveState: true,
        });
    };
    return (
        <>
            <div className="space-y-10 divide-y divide-dashed divide-gray-900/10">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8">
                    <HeaderForm className="" title={page_settings.title} subtitle={page_settings.subtitle} />
                    <Card className="md:col-span-2">
                        <CardContent>
                            <form onSubmit={onHandleSubmit}>
                                <div className="py-6">
                                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="name" value="Name" />
                                            <TextInput
                                                type="text"
                                                name="name"
                                                id="name"
                                                value={data.name}
                                                onChange={(e) => setData(e.target.name, e.target.value)}
                                                className="mt-1 block w-full"
                                                onErrors={errors.name && <InputError message={errors.name} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="cover" value="Cover" />
                                            <TextInput
                                                type="file"
                                                name="cover"
                                                id="cover"
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                className="mt-1 block w-full"
                                                onErrors={errors.cover && <InputError message={errors.cover} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="logo" value="Logo" />
                                            <TextInput
                                                type="file"
                                                name="logo"
                                                id="logo"
                                                className="mt-1 block w-full"
                                                onChange={(e) => setData(e.target.name, e.target.files[0])}
                                                onErrors={errors.logo && <InputError message={errors.logo} />}
                                            />
                                        </div>
                                        <div className="col-span-full">
                                            <InputLabel htmlFor="visibility" value="Visibility" />
                                            <Select
                                                defaultValue="Select a visibility"
                                                onValueChange={(value) => setData('visibility', value)}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue>
                                                        {visibilities.find(
                                                            (visibility) => visibility.value == data.visibility,
                                                        )?.label ?? 'Select a visibility'}
                                                    </SelectValue>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {visibilities.map((visibility, index) => (
                                                        <SelectItem key={index} value={visibility.value}>
                                                            {visibility.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {errors.visibility && <InputError message={errors.visibility} />}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-x-2 py-6">
                                    <Button type="button" variant="ghost" onClick={() => reset()}>
                                        Reset
                                    </Button>
                                    <Button type="submit" variant="red" disabled={processing}>
                                        Save
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}

Create.layout = (page) => <AppLayout children={page} title="Create Workspace" />;
