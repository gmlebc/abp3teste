'use client';

import { useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { WavesIcon, type WavesIconHandle } from './Waveicon';

interface WavecardProps {
  currentHeight: number;
  maxHeight: number;
  period?: number;
  unit?: string;
}

const Wavecard = ({
  currentHeight,
  maxHeight,
  period = 8,
  unit = 'm',
}: WavecardProps) => {
  const percentage = Math.min((currentHeight / maxHeight) * 100, 100);
  const waveRef = useRef<WavesIconHandle>(null);

  useEffect(() => {
    waveRef.current?.startAnimation();
  }, []);

  const getWaveCategory = (height: number): string => {
    if (height < 0.5) return 'Calmo';
    if (height < 1) return 'Pequena';
    if (height < 2) return 'Moderada';
    if (height < 3) return 'Grande';
    return 'Extrema';
  };

  const getColorClass = (height: number): string => {
    if (height < 0.5) return 'text-green-500';
    if (height < 1) return 'text-blue-500';
    if (height < 2) return 'text-yellow-500';
    if (height < 3) return 'text-orange-500';
    return 'text-red-500';
  };

  const getProgressColor = (height: number): string => {
    if (height < 0.5) return 'bg-green-500';
    if (height < 1) return 'bg-blue-500';
    if (height < 2) return 'bg-yellow-500';
    if (height < 3) return 'bg-orange-500';
    return 'bg-red-500';
  };

  return (
    <Card className="shadow-md shadow-cyan-500/40 border-2 border-black dark:border-gray-700 overflow-hidden">
      <CardHeader className="bg-gradient-to-br from-cyan-100 to-cyan-200 dark:from-cyan-900 dark:to-cyan-950">
        <CardTitle className="flex items-center justify-between text-xl font-semibold ">
          <span>Tamanho de Onda</span>
          <WavesIcon ref={waveRef} size={48} />
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-2 pb-3 px-3">

        <div className="flex justify-between items-center mb-3">
          <div className="text-3xl font-bold tracking-tight flex items-baseline">
            <span className={getColorClass(currentHeight)}>
              {currentHeight.toFixed(1)}
            </span>
            <span className="text-sm ml-1 text-muted-foreground">{unit}</span>
          </div>
          <div className="bg-muted px-2 rounded text-xs">
            Período: {period}s
          </div>
        </div>

        <Progress
          value={percentage}
          className={`h-2 mt-1 [&>div]:${getProgressColor(currentHeight)}`}
        />

        <div className="flex justify-between items-center mt-4 text-sm">
          <div className="text-muted-foreground">
            Máx: {maxHeight} {unit}
          </div>
          <div className={`font-medium ${getColorClass(currentHeight)}`}>
            {getWaveCategory(currentHeight)}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Wavecard;
