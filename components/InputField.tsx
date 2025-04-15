import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string; // Add className prop
}

export const InputField = ({ label, name, type = "text", required = false, className }: InputFieldProps) => (
  <div className="space-y-1">
    <Label htmlFor={name}>{label} <span className="text-red-500">*</span></Label>
    <Input id={name} name={name} type={type} required={required} className={className} />
  </div>
);
