import InputError from "@/Components/InputError";
import TextInput from "@/Components/TextInput";
import { Button } from "@/Components/ui/button";
import { flashMessage } from "@/lib/utils";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import { PiPlus, PiSquaresFour } from "react-icons/pi";
import { toast } from "sonner";
import TaskListChildren from "./TaskListChildren";

export default function TaskListCard({ tasks }) {
    const { data, setData, post, processing, reset, errors, recentlySuccessful } = useForm({
        item: '',
    });

    const onHandleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const onHandleSubmit = (e, task) => {
        e.preventDefault();

        router.post(
            route('tasks.item', {
                card: task.card_id,
                task: task.id
            }),
            {
                item: data.item,
                _method: 'post'
            },
            {
                preserveScroll: true,
                preserveState: true,
                onSuccess: (success) => {
                    reset();
                    const flash = flashMessage(success);
                    if (flash) toast[flash.type](flash.message);
                }
            }
        )
    }

    const [showFormItem, setFormItem] = useState({});

    return (
        <div className="space-y-4 pt-6">
            <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                {tasks.filter((task) => task.parent_id == null).map((task, index) => (
                    <li key={index}>
                        <div className="flex flex-col py-4 pl-4 pr-5 space-y-4">
                            <div className="flex items-center justify-between text-sm leading-relaxed">
                                <div className='flex items-center flex-1 w-0'>
                                    <PiSquaresFour className='flex-shrink-0 w-5 h-5 text-muted-foreground' />
                                    <div className='flex flex-1 min-w-0 gap-2 ml-4'>
                                        <span className='font-medium truncate'>
                                            {task.title}
                                        </span>
                                    </div>
                                </div>
                                <div className='flex-shrink-0 ml-4'>
                                    <Button
                                        variant="link"
                                        className="font-medium text-red-500 hover:text-red-600 hover:no-underline"
                                        onClick={() =>
                                            router.delete(
                                                route('tasks.destroy', {
                                                    card: task.card_id,
                                                    task: task.id,
                                                }),
                                                {
                                                    preserveScroll: true,
                                                    preserveState: true,
                                                    onSuccess: (success) => {
                                                        const flash = flashMessage(success);
                                                        if (flash) toast[flash.type](flash.message);
                                                    },
                                                },
                                            )
                                        }
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>

                            <TaskListChildren children={task.children} />

                            {showFormItem[task.id] || task.children.length > 0 ? (
                                <form onSubmit={(e) => onHandleSubmit(e, task)}>
                                    <TextInput
                                        className='mb-4'
                                        type='text'
                                        name='item'
                                        id='item'
                                        value={data.item}
                                        onChange={onHandleChange}
                                        placeholder="Add an item to task"
                                    />
                                    {errors.item && <InputError message={errors.item} />}

                                    <div className="flex items-center gap-x-2 mt-4">
                                        <Button type='submit' disabled={processing} size="sm"
                                        >
                                            <PiPlus className="w-4 h-4 mr-2" />
                                            Add
                                        </Button>
                                        <Button type='button' variant='outline' size='sm' onClick={() => setFormItem({})}>
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            ) : (
                                <Button
                                    variant="secondary"
                                    className="flex w-32"
                                    onClick={() =>
                                        setFormItem((prevState) =>
                                        ({
                                            ...prevState,
                                            [task.id]: true,
                                        }))
                                    }
                                >
                                    Add an item
                                </Button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

