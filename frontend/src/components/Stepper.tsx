'use client';

import { Icon } from '@iconify/react';

interface Step {
  label: string;
  shortLabel?: string;
}

interface StepperProps {
  steps: Step[];
  currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="flex items-center gap-2 text-xs font-medium">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isCurrent = stepNumber === currentStep;
        const isUpcoming = stepNumber > currentStep;

        return (
          <div key={index} className="flex items-center gap-2">
            {index > 0 && (
              <div
                className={`w-6 h-px ${
                  isCompleted || isCurrent ? 'bg-[#FF5E00]' : 'bg-neutral-200'
                }`}
              />
            )}
            <div
              className={`flex items-center gap-2 ${
                isCompleted || isCurrent ? 'text-[#FF5E00]' : 'text-neutral-400'
              }`}
            >
              <div
                className={`flex items-center justify-center w-5 h-5 rounded-full ${
                  isCompleted
                    ? 'bg-[#FF5E00] text-white'
                    : isCurrent
                    ? 'border border-[#FF5E00] text-[#FF5E00] bg-[#FF5E00]/5'
                    : 'border border-neutral-200 bg-white'
                }`}
              >
                {isCompleted ? (
                  <Icon icon="solar:check-linear" width={12} />
                ) : (
                  stepNumber
                )}
              </div>
              <span className={index >= 3 ? 'hidden sm:inline' : ''}>
                {step.shortLabel || step.label}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
