import { Button } from "@/Components/ui/button";
import { PiSquare } from "lucide-react";
import { PiCheckSquare, PiCheckSquareFill, PiSquareBold } from "react-icons/pi";

export default function TaskListChildren({ children }) {
    return (
        <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
            {children.length > 0 && children.map((item, index) => (
                <li className="flex items-center justify-between py-6 text-sm leading-relaxed" key={index}>
                    <div className="flex w-0 flex-1 items-center">
                        <Button
                            type="button"
                            size="icon"
                            variant="ghost"
                            onClick={() => console.log('completed')}
                        >
                            {item.is_completed == true ? (
                               <PiCheckSquareFill className='w-5 h-5 flex-shrink-0 text-foreground' />
                            ) : (
                                <PiSquareBold className="w-5 h-5 flex-shrink-0 text-muted-foreground" />
                            )}
                        </Button>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            {item.is_completed == true ? (
                                <span className="truncate font-medium line-through">{item.title}</span>
                            ) : (
                                <span className="truncate font-medium">{item.title}</span>
                            )}
                        </div>
                    </div>

                    <div className="ml-4 flex-shrink-0">
                        <Button
                            variant='link'
                            className='font-medium text-red-500 hover:text-red-600 hover:no-underline'
                            onClick={() => console.log('delete')}
                        >
                            Delete
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
