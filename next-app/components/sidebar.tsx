import {
LayoutDashboard,
Bot,
FileClock,
ClipboardList,
Brain,
Settings
} from "lucide-react";

export default function Sidebar() {

const items = [
{ icon: LayoutDashboard, name: "Dashboard" },
{ icon: ClipboardList, name: "Decisions" },
{ icon: Bot, name: "Agents" },
{ icon: FileClock, name: "Approvals" },
{ icon: Brain, name: "Memory" },
{ icon: Settings, name: "Settings" },
];

return (
<div className="w-72 bg-slate-900 border-r border-slate-800">

<div className="text-3xl font-bold p-8">
ConcordOS
</div>

<div className="space-y-2 px-4">

{items.map((item)=>{

const Icon=item.icon;

return(

<div
key={item.name}
className="flex items-center gap-3 rounded-xl p-4 hover:bg-slate-800 cursor-pointer"
>

<Icon size={20}/>

{item.name}

</div>

)

})}

</div>

</div>
)

}