import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
  title: string;
  summary: string;
  recommendation: string;
  icon: React.ReactNode;
}

export default function AnalysisCard({
  title,
  summary,
  recommendation,
  icon,
}: Props) {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>

      <CardContent>

        <p className="text-zinc-300">
          {summary}
        </p>

        <div className="mt-5 rounded-lg bg-zinc-800 p-4">
          <p className="text-sm text-blue-400">
            Recommendation
          </p>

          <p className="mt-2 text-zinc-300">
            {recommendation}
          </p>
        </div>

      </CardContent>
    </Card>
  );
}