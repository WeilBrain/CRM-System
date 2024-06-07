import {EnumStatus} from "~/types/deals.types";
import type {IColumn} from "~/components/kanban/kanban.types";
export const KANBAN_DATA:IColumn[] = [
    {
        id: EnumStatus.todo,
        name: 'Входящее',
        items: [],
    },
    {
        id: EnumStatus['to-be-agreed'],
        name: 'на соглосовании',
        items: [],
    },
    {
        id: EnumStatus["in-progress"],
        name: 'В производстве',
        items: [],
    },
    {
        id: EnumStatus.produced,
        name: 'Произведенно',
        items: [],
    },
    {
        id: EnumStatus.done,
        name: 'Готов к отгрузке',
        items: [],
    },

]