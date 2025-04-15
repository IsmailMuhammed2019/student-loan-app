import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useState } from "react";

interface SelectFieldProps {
  label: string;
  name: string;
  options: string[];
  onChange?: (value: string) => void;
  required?: boolean;
  className?: string; // Add className prop
}

export const SelectField = ({ label, name, options, onChange, required, className }: SelectFieldProps) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="space-y-1">
      <Label>{label}</Label>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {/* Hidden input to pass value to Google Form */}
      <input type="hidden" name={name} value={selectedValue} required={required} />
    </div>
  );
};