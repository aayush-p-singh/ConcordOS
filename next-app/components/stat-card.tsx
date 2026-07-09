import { ComponentType } from "react";

interface Props {
	title: string;
	value: string;
	subtitle?: string;
	icon?: ComponentType<any>;
}

export default function StatCard({ title, value, subtitle, icon: Icon }: Props) {
	return (
		<div className="bg-slate-900 rounded-xl p-5">
			<div className="flex items-start justify-between">
				<div>
					<p className="text-gray-400">{title}</p>
					{subtitle && <p className="text-sm text-zinc-400 mt-1">{subtitle}</p>}
				</div>

				{Icon && (
					<div className="text-zinc-400">
						<Icon />
					</div>
				)}
			</div>

			<h2 className="text-3xl font-bold mt-4">{value}</h2>
		</div>
	);
}
