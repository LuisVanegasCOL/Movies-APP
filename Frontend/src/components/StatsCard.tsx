
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard = ({ title, value, description, icon: Icon, trend }: StatsCardProps) => {
  return (
    <Card className="relative overflow-hidden transition-all duration-300 hover:shadow-gold hover:scale-[1.02] bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-10 h-10 gradient-gold rounded-lg flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary-foreground" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-foreground font-serif">
          {value}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2">
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs último mes
            </span>
          </div>
        )}
      </CardContent>
      
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-primary/10 to-transparent rounded-bl-full" />
    </Card>
  );
};

export default StatsCard;
