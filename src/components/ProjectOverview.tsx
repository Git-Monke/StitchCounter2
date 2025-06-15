import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSelectedProject } from "../hooks/useProjects";
import { formatDistanceToNow } from "date-fns";

interface StatCardProps {
  label: string;
  value: string | number;
}

function StatCard({ label, value }: StatCardProps) {
  return (
    <div className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-lg font-medium">{value}</span>
    </div>
  );
}

export function ProjectOverview() {
  const project = useSelectedProject();

  if (!project) return null;

  // Calculate totals across all sections
  const totals = Object.values(project.data.sections).reduce(
    (acc, section) => ({
      stitches: acc.stitches + section.data.stitches,
      rows: acc.rows + section.data.rows,
      repeats: acc.repeats + section.data.repeats,
      time: acc.time + section.data.time,
    }),
    { stitches: 0, rows: 0, repeats: 0, time: 0 },
  );

  // No need to collect all notes; each section now has a single markdown string

  // Format time in spoken form (e.g., 2 hours, 43 minutes, 16 seconds)
  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    const parts = [];
    if (h > 0) parts.push(`${h} hour${h !== 1 ? "s" : ""}`);
    if (m > 0) parts.push(`${m} minute${m !== 1 ? "s" : ""}`);
    if (s > 0 || parts.length === 0)
      parts.push(`${s} second${s !== 1 ? "s" : ""}`);
    return parts.join(", ");
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Project Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Last Modified
              </h3>
              <p className="text-sm">
                {formatDistanceToNow(project.lastModified, { addSuffix: true })}
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                Sections
              </h3>
              <p className="text-sm">
                {Object.keys(project.data.sections).length}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Project Totals
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Stitches"
                value={totals.stitches.toLocaleString()}
              />
              <StatCard label="Rows" value={totals.rows.toLocaleString()} />
              <StatCard
                label="Repeats"
                value={totals.repeats.toLocaleString()}
              />
              <StatCard label="Time" value={formatTime(totals.time)} />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Notes
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(project.data.sections).map(
                ([, section]) =>
                  section.notes &&
                  section.notes.trim() !== "" && (
                    <div
                      key={section.name}
                      className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10"
                    >
                      <span className="text-xs text-muted-foreground mb-2">
                        {section.name}
                      </span>
                      <div className="text-sm whitespace-pre-wrap">
                        {section.notes}
                      </div>
                    </div>
                  ),
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
