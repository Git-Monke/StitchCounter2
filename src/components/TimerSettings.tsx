import {
  useProjects,
  useSelectedProjectOption,
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
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useRef, useState } from "react";

const TimerSwitch = ({
  title,
  prop,
}: {
  title: string;
  prop: keyof Project["options"]["timerOptions"];
}) => {
  const { updateSelectedProject } = useProjects();
  const propState = useSelectedProjectOption("timerOptions", prop);

  return (
    <div className="flex gap-2">
      <Switch
        id={title}
        checked={!!propState}
        onCheckedChange={(newState) => {
          updateSelectedProject("options", (data) => {
            return {
              ...data,
              timerOptions: {
                ...data.timerOptions,
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

const TimerInput = ({
  title,
  prop,
}: {
  title: string;
  prop: keyof Project["options"]["timerOptions"];
}) => {
  const value = useSelectedProjectOption("timerOptions", prop);
  const { updateSelectedProject } = useProjects();

  const [focused, setFocused] = useState(false);
  const [tempValue, setTempValue] = useState(value + "");

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-2">
      {/* If the input is focused, use the temp value *while* updating the state. When unfocused, use the global value*/}
      {/* This prevents the number from becoming 0 when the user deletes the entire value. UX stuff. */}

      <Label htmlFor={prop}>{title}</Label>
      <Input
        ref={inputRef}
        id={prop}
        value={focused ? tempValue : value.toString()}
        onChange={(e) => {
          setTempValue(e.target.value);

          updateSelectedProject("options", (data) => {
            return {
              ...data,
              timerOptions: {
                ...data.timerOptions,
                [prop]: parseInt(e.target.value) || 1,
              },
            };
          });
        }}
        onFocus={() => {
          setTempValue(value + "");
          setFocused(true);
        }}
        onBlur={() => {
          setTempValue(value + "");
          setFocused(false);
        }}
        onKeyDown={(e) => {
          if (e.nativeEvent.key == "Enter") {
            inputRef.current?.blur();
          }
        }}
      />
      <Label htmlFor={prop}>Minutes</Label>
    </div>
  );
};

export const TimerSettings = () => {
  const timerEnabled = useSelectedProjectOption("counterOptions", "time");

  return (
    <Card
      className={`transition-all duration-200 ${!timerEnabled && "opacity-50 pointer-events-none"}`}
    >
      <CardHeader>
        <CardTitle>Timer Settings</CardTitle>
        <CardDescription>Adjust timer notification settings</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-8">
          <TimerSwitch prop="remindTurnOn" title="Remind Turn-On" />
          <TimerSwitch prop="autoTurnOff" title="Auto Turn-Off" />
          <TimerInput title="Wait" prop={"remindTurnOnDelay"} />
          <TimerInput title="Wait" prop={"autoTurnOffDelay"} />
        </div>
      </CardContent>
    </Card>
  );
};
