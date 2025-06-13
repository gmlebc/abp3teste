"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Windicon, type WindiconHandle } from "./Windicon";

interface WindspeedcardProps {
  currentSpeed: number;
  maxSpeed: number;
  unit?: string;
  direction?: string;
}

const Windspeedcard = ({
  currentSpeed,
  maxSpeed,
  unit = "km/h",
  direction = "NO",
}: WindspeedcardProps) => {
  const percentage = Math.min((currentSpeed / maxSpeed) * 100, 100);
  const windRef = useRef<WindiconHandle>(null);

  useEffect(() => {
    windRef.current?.startAnimation();
  }, []);

  const getWindCategory = (speed: number): string => {
    if (speed < 20) return "Fraco";
    if (speed < 40) return "Moderado";
    if (speed < 60) return "Forte";
    return "Tempestade";
  };

  const getColorClass = (speed: number): string => {
    if (speed < 20) return "text-green-500";
    if (speed < 40) return "text-blue-500";
    if (speed < 60) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (speed: number): string => {
    if (speed < 20) return "bg-green-500";
    if (speed < 40) return "bg-blue-500";
    if (speed < 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="shadow-md shadow-blue-500/40 border-2 border-black dark:border-gray-700 overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-950">
        <CardTitle className="flex items-center justify-between text-xl font-semibold">
          <span>Velocidade do Vento</span>
          <Windicon ref={windRef} size={48} />
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-2 pb-3 px-3">
        <div className="flex justify-between items-center mb-3">
          <div className="text-3xl font-bold tracking-tight flex items-baseline">
            <span className={getColorClass(currentSpeed)}>{currentSpeed}</span>
            <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
          </div>
          <div className="bg-muted px-2 rounded text-xs">
            Direção: {direction}
          </div>
        </div>

        <Progress
          value={percentage}
          className={`h-2 mt-1 [&>div]:${getProgressColor(currentSpeed)}`}
        />

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-muted-foreground">
            Máx: {maxSpeed} {unit}
          </div>
          <div className={`font-medium ${getColorClass(currentSpeed)}`}>
            {getWindCategory(currentSpeed)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Windspeedcard;
