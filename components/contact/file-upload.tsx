"use client";

import { Paperclip, Upload, X } from "lucide-react";
import { FormField } from "@/components/contact/form-field";

type FileUploadProps = {
  label: string;
  id: string;
  accept: string;
  hint: string;
  file: File | null;
  onChange: (file: File | null) => void;
  required?: boolean;
  error?: string;
};

function formatSize(bytes: number) {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ label, id, accept, hint, file, onChange, required, error }: FileUploadProps) {
  return (
    <FormField label={label} htmlFor={id} required={required} hint={hint} error={error}>
      <input
        id={id}
        name={id}
        type="file"
        accept={accept}
        className="sr-only"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {file ? (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-brand/30 bg-brand/5 px-4 py-3 text-sm">
          <span className="flex min-w-0 items-center gap-2 text-slate-700">
            <Paperclip size={16} className="shrink-0 text-brand" aria-hidden="true" />
            <span className="truncate font-medium">{file.name}</span>
            <span className="shrink-0 text-xs text-slate-400">{formatSize(file.size)}</span>
          </span>
          <button type="button" onClick={() => onChange(null)} className="shrink-0 rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700" aria-label={`Remove ${file.name}`}>
            <X size={16} />
          </button>
        </div>
      ) : (
        <label htmlFor={id} className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 px-4 py-4 text-sm font-medium text-slate-500 transition-colors duration-300 hover:border-brand hover:text-brand">
          <Upload size={16} aria-hidden="true" />
          Choose a file
        </label>
      )}
    </FormField>
  );
}
