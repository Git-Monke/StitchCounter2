import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useSelectedProject } from "../hooks/useProjects";
import { formatDistanceToNow } from "date-fns";

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
    { stitches: 0, rows: 0, repeats: 0, time: 0 }
  );

  // Collect all notes from all sections
  const allNotes = Object.values(project.data.sections).flatMap(
    (section) => section.notes
  );

  // Format time in hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
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
              <div className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs text-muted-foreground">Stitches</span>
                <span className="text-lg font-medium">
                  {totals.stitches.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs text-muted-foreground">Rows</span>
                <span className="text-lg font-medium">
                  {totals.rows.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs text-muted-foreground">Repeats</span>
                <span className="text-lg font-medium">
                  {totals.repeats.toLocaleString()}
                </span>
              </div>
              <div className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10">
                <span className="text-xs text-muted-foreground">Time</span>
                <span className="text-lg font-medium">
                  {formatTime(totals.time)}
                </span>
              </div>
            </div>
          </div>

          {allNotes.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-muted-foreground mb-3">
                Notes
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(project.data.sections).map(
                  ([_, section]) =>
                    section.notes.length > 0 && (
                      <div
                        key={section.name}
                        className="flex flex-col p-3 rounded-lg bg-primary/5 border border-primary/10"
                      >
                        <span className="text-xs text-muted-foreground mb-2">
                          {section.name}
                        </span>
                        <ul className="space-y-1 list-disc list-inside text-sm pl-2">
                          {section.notes.map((note, index) => (
                            <li key={index}>{note}</li>
                          ))}
                        </ul>
                      </div>
                    )
                )}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
