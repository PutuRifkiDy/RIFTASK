import { Badge } from '@/components/ui/badge';
import { PRIORITY } from '@/lib/utils';

export default function GetPriorityBadge({ priority }) {
    const { URGENT, HIGHT, MEDIUM, LOW, UKNOWN } = PRIORITY;

    let badge, text;

    switch (priority) {
        case URGENT:
            badge = 'bg-red-500 hover:bg-red-600';
            text = URGENT;
            break;
        case HIGHT:
            badge = 'bg-yellow-500 hover:bg-yellow-600';
            text = HIGHT;
            break;
        case MEDIUM:
            badge = 'bg-blue-500 hover:bg-blue-600';
            text = MEDIUM;
            break;
        case LOW:
            badge = 'bg-green-500 hover:bg-green-600';
            text = LOW;
            break;
        default:
            badge = '';
            text = UKNOWN;
    }

    return <Badge className={badge}>{text}</Badge>;
}
