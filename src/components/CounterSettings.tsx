import {
  useProjects,
  useSelectedProjectOption,
  useSelectedProjectName,
  type Project,
} from "@/hooks/useProjects";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const CounterSwitch = ({
  title,
  prop,
}: {
  title: string;
  prop: keyof Project["options"]["counterOptions"];
}) => {
  const { updateSelectedProject } = useProjects();
  const propState = useSelectedProjectOption("counterOptions", prop);

  return (
    <div className="flex gap-2">
      <Switch
        id={title}
        checked={propState}
        onCheckedChange={(newState) => {
          updateSelectedProject("options", (data) => {
            return {
              ...data,
              counterOptions: {
                ...data.counterOptions,
                [prop]: newState,
              },
            };
          });
        }}
      />
      <Label htmlFor={title}>{title}</Label>
    </div>
  );
};

export const CounterSettings = () => {
  const projectName = useSelectedProjectName();

  if (!projectName) {
    return "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Counter Settings</CardTitle>
        <CardDescription>
          Select which counters you need for this project
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <CounterSwitch prop="stitches" title="Stitches" />
          <CounterSwitch prop="rows" title="Rows" />
          <CounterSwitch prop="repeats" title="Repeats" />
          <CounterSwitch prop="time" title="Timer" />
        </div>
      </CardContent>
    </Card>
  );
};
