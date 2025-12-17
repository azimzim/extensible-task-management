// config/statusRequirements.ts

export type StatusRequirement = {
  key: string;   // sent to backend
  label: string; // shown in UI
};

export const STATUS_REQUIREMENTS: Record<
  string,
  Record<number, StatusRequirement[]>
> = {
  development: {
    2: [
      { key: "specification", label: "Specification Text" },
    ],
    3: [
      { key: "branchName", label: "Branch name" },
    ],
    4: [
      { key: "version", label: "Version number" },
    ],
  },
  procurement: {
    2: [
      { key: "priceQuotes", label: "Price quotes (comma separated)" },
    ],
    3: [
      { key: "receipt", label: "Receipt reference" },
    ],
  },
};
