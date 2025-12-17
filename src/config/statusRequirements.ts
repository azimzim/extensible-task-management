// statusRequirements.ts
export const STATUS_REQUIREMENTS: Record<
  string,
  Record<number, { label: string }>
> = {
  Development: {
    2: { label: "Specification text" },
    3: { label: "Branch name" },
    4: { label: "Version number" },
  },
  Procurement: {
    2: { label: "Price quotes (comma separated)" },
    3: { label: "Receipt reference" },
  },
};
