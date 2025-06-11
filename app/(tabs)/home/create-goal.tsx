import React from 'react';
import { ManualGoalForm } from '@/src/components/ManualGoalForm';

export default function CreateGoalScreen() {
  const handleGoalCreated = (goal: {
    title: string;
    description: string;
    completionDate: Date;
  }) => {
    // In a real app, this would save the goal to your data store
    console.log('Goal created:', goal);
  };

  return <ManualGoalForm onGoalCreated={handleGoalCreated} />;
}