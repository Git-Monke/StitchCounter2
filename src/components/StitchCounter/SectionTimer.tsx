import React, { useRef, useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";
import {
  useSelectedSectionID,
  useProjects,
  useSelectedProject,
} from "../../hooks/useProjects";
import { toast } from "sonner";

// Timer state (running timer section and start time) - module scoped, not persisted
let runningTimerSection: string | null = null;
let runningTimerStart: number | null = null;
let runningTimerElapsed: number = 0;
let runningTimerSetState: (() => void) | null = null;

const formatTime = (seconds: number) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) {
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  } else {
    return `${m}:${s.toString().padStart(2, "0")}`;
  }
};

export const SectionTimer: React.FC = () => {
  const selectedSectionID = useSelectedSectionID();
  const project = useSelectedProject();
  const updateSelectedProject = useProjects(
    (state) => state.updateSelectedProject,
  );

  // Timer options from project
  const timerOptions = project?.options?.timerOptions || {};
  const autoTurnOff = !!timerOptions.autoTurnOff;
  const autoTurnOffDelay = Number(timerOptions.autoTurnOffDelay) || 0;
  const remindTurnOn = !!timerOptions.remindTurnOn;
  const remindTurnOnDelay = Number(timerOptions.remindTurnOnDelay) || 0;

  // Get the current timer value from Zustand (in seconds)
  const timerValue =
    selectedSectionID && project
      ? (project.data.sections[selectedSectionID]?.data.time ?? 0)
      : 0;

  // Local state for live updating
  const [, setTick] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Track last interaction timestamp for auto-off
  const lastInteractionRef = useRef<number>(Date.now());
  // Track reminder interval
  const reminderIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Is this section's timer running?
  const isRunning = runningTimerSection === selectedSectionID;

  // Play notification sound
  const playNotificationSound = useCallback(() => {
    const audio = new Audio("/notification.mp3");
    audio.play();
  }, []);

  // Show toast and play sound
  const showToast = useCallback(
    (message: string) => {
      toast(message);
      playNotificationSound();
    },
    [playNotificationSound],
  );

  // Mark an interaction (for auto-off)
  const markInteraction = useCallback(() => {
    lastInteractionRef.current = Date.now();
  }, []);

  // Start timer
  const handleStart = () => {
    // Pause any other running timer
    if (runningTimerSection && runningTimerSection !== selectedSectionID) {
      // Save elapsed time for the other section
      if (runningTimerSetState) runningTimerSetState();
      runningTimerSection = null;
      runningTimerStart = null;
      runningTimerElapsed = 0;
      runningTimerSetState = null;
    }
    if (!isRunning && selectedSectionID) {
      runningTimerSection = selectedSectionID;
      runningTimerStart = Date.now();
      runningTimerElapsed = timerValue;
      runningTimerSetState = () => {
        // Save elapsed time to Zustand
        if (selectedSectionID && project) {
          const elapsed =
            runningTimerElapsed +
            Math.floor((Date.now() - (runningTimerStart || 0)) / 1000);
          updateSelectedProject("data", (data) => {
            const section = data.sections[selectedSectionID];
            if (!section) return data;
            return {
              ...data,
              sections: {
                ...data.sections,
                [selectedSectionID]: {
                  ...section,
                  data: {
                    ...section.data,
                    time: elapsed,
                  },
                },
              },
            };
          });
        }
      };
      setTick((t) => t + 1);
      markInteraction();
    }
  };

  // Stop timer
  const handleStop = useCallback(() => {
    if (isRunning && selectedSectionID) {
      // Save elapsed time to Zustand
      const elapsed =
        runningTimerElapsed +
        Math.floor((Date.now() - (runningTimerStart || 0)) / 1000);
      updateSelectedProject("data", (data) => {
        const section = data.sections[selectedSectionID];
        if (!section) return data;
        return {
          ...data,
          sections: {
            ...data.sections,
            [selectedSectionID]: {
              ...section,
              data: {
                ...section.data,
                time: elapsed,
              },
            },
          },
        };
      });
      runningTimerSection = null;
      runningTimerStart = null;
      runningTimerElapsed = 0;
      runningTimerSetState = null;
      setTick((t) => t + 1);
      markInteraction();
    }
  }, [isRunning, selectedSectionID, updateSelectedProject, markInteraction]);

  // Reset timer
  const handleReset = () => {
    if (selectedSectionID) {
      updateSelectedProject("data", (data) => {
        const section = data.sections[selectedSectionID];
        if (!section) return data;
        return {
          ...data,
          sections: {
            ...data.sections,
            [selectedSectionID]: {
              ...section,
              data: {
                ...section.data,
                time: 0,
              },
            },
          },
        };
      });
      if (isRunning) {
        runningTimerSection = null;
        runningTimerStart = null;
        runningTimerElapsed = 0;
        runningTimerSetState = null;
      }
      setTick((t) => t + 1);
      markInteraction();
    }
  };

  // Update timer every second if running, and save to Zustand/localStorage
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTick((t) => t + 1);

        // Save elapsed time to Zustand/localStorage every second
        if (selectedSectionID && project) {
          const elapsed =
            runningTimerElapsed +
            Math.floor((Date.now() - (runningTimerStart || 0)) / 1000);
          updateSelectedProject("data", (data) => {
            const section = data.sections[selectedSectionID];
            if (!section) return data;
            return {
              ...data,
              sections: {
                ...data.sections,
                [selectedSectionID]: {
                  ...section,
                  data: {
                    ...section.data,
                    time: elapsed,
                  },
                },
              },
            };
          });
        }
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, selectedSectionID, project, updateSelectedProject]);

  // If section changes, stop timer if it was running
  useEffect(() => {
    if (runningTimerSection && runningTimerSection !== selectedSectionID) {
      if (runningTimerSetState) runningTimerSetState();
      runningTimerSection = null;
      runningTimerStart = null;
      runningTimerElapsed = 0;
      runningTimerSetState = null;
      setTick((t) => t + 1);
    }
  }, [selectedSectionID]);

  // --- AUTO-OFF FUNCTIONALITY ---
  useEffect(() => {
    if (!isRunning || !autoTurnOff || !autoTurnOffDelay) return;

    const checkAutoOff = () => {
      const now = Date.now();
      const elapsed = (now - lastInteractionRef.current) / 1000 / 60; // minutes
      if (elapsed >= autoTurnOffDelay) {
        handleStop();
        showToast("Timer paused due to inactivity");
      }
    };

    const interval = setInterval(checkAutoOff, 1000);
    return () => clearInterval(interval);
  }, [isRunning, autoTurnOff, autoTurnOffDelay, handleStop, showToast]);

  // --- REMINDER FUNCTIONALITY ---
  useEffect(() => {
    if (reminderIntervalRef.current) {
      clearInterval(reminderIntervalRef.current);
      reminderIntervalRef.current = null;
    }
    if (!remindTurnOn || !remindTurnOnDelay || isRunning) return;

    const remind = () => {
      showToast("Timer is off. Don't forget to turn it back on!");
    };

    reminderIntervalRef.current = setInterval(
      remind,
      remindTurnOnDelay * 60 * 1000,
    );
    // Show first reminder after the delay, not immediately

    return () => {
      if (reminderIntervalRef.current) {
        clearInterval(reminderIntervalRef.current);
        reminderIntervalRef.current = null;
      }
    };
  }, [remindTurnOn, remindTurnOnDelay, isRunning, showToast]);

  // Calculate display value
  let displayValue = timerValue;
  if (isRunning && runningTimerStart) {
    displayValue =
      runningTimerElapsed + Math.floor((Date.now() - runningTimerStart) / 1000);
  }

  // Expose markInteraction for external counter components (if needed)
  (window as any).__stitchCounterMarkInteraction = markInteraction;

  return (
    <div className="flex flex-col py-2 px-3 rounded-lg bg-primary/5 border border-primary/10">
      <span className="text-xs text-muted-foreground leading-none">Timer</span>
      <div className="flex items-center gap-2">
        <span className="text-base font-medium tabular-nums">
          {formatTime(displayValue)}
        </span>
        <div className="flex items-center gap-1 ml-auto">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label={isRunning ? "Pause Timer" : "Start Timer"}
            onClick={isRunning ? handleStop : handleStart}
          >
            {isRunning ? (
              <Pause className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            aria-label="Reset Timer"
            onClick={handleReset}
            disabled={displayValue === 0}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
