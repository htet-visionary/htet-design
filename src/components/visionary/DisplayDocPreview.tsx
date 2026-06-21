import { Inbox, X } from "lucide-react";
import { ComponentDocGroup } from "@/components/visionary/ComponentDocGroup";

export function AvatarVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Avatar sizes"
      items={[
        { label: "Small", children: <span className="v-cmp-avatar v-cmp-avatar--sm" aria-hidden>AM</span> },
        { label: "Medium", children: <span className="v-cmp-avatar v-cmp-avatar--md" aria-hidden>AM</span> },
        { label: "Large", children: <span className="v-cmp-avatar v-cmp-avatar--lg" aria-hidden>AM</span> },
      ]}
    />
  );
}

export function BadgeVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Badge variants"
      items={[
        { label: "Default", children: <span className="v-cmp-badge" aria-hidden>Label</span> },
        { label: "Success", children: <span className="v-cmp-badge v-cmp-badge--success" aria-hidden>Active</span> },
        { label: "Warning", children: <span className="v-cmp-badge v-cmp-badge--warning" aria-hidden>Pending</span> },
        { label: "Error", children: <span className="v-cmp-badge v-cmp-badge--error" aria-hidden>Failed</span> },
      ]}
    />
  );
}

export function TagVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Tag variants"
      items={[
        { label: "Default", children: <span className="v-cmp-tag" aria-hidden>Design system</span> },
        {
          label: "Removable",
          children: (
            <span className="v-cmp-tag v-cmp-tag--removable" aria-hidden>
              Tokens
              <X className="v-cmp-specimen-icon--xs" strokeWidth={2} />
            </span>
          ),
        },
      ]}
    />
  );
}

export function ChipVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Chip variants"
      items={[
        { label: "Default", children: <span className="v-cmp-chip" aria-hidden>Filter</span> },
        { label: "Selected", children: <span className="v-cmp-chip v-cmp-chip--selected" aria-hidden>Filter</span> },
      ]}
    />
  );
}

export function TableVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Table variants"
      items={[
        {
          label: "Default",
          children: (
            <table className="v-cmp-table" aria-hidden>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Alex Morgan</td>
                  <td>Active</td>
                  <td>Admin</td>
                </tr>
                <tr>
                  <td>Jordan Lee</td>
                  <td>Pending</td>
                  <td>Editor</td>
                </tr>
              </tbody>
            </table>
          ),
        },
      ]}
    />
  );
}

export function ListVariantsPreview() {
  return (
    <ComponentDocGroup
      label="List layouts"
      items={[
        {
          label: "Default",
          children: (
            <ul className="v-cmp-list" aria-hidden>
              <li className="v-cmp-list__item">Foundation tokens</li>
              <li className="v-cmp-list__item">Component guidelines</li>
              <li className="v-cmp-list__item">Theme overrides</li>
            </ul>
          ),
        },
        {
          label: "With meta",
          children: (
            <ul className="v-cmp-list" aria-hidden>
              <li className="v-cmp-list__item">
                <span className="v-cmp-list__title">Button</span>
                <span className="v-cmp-list__meta">Updated today</span>
              </li>
              <li className="v-cmp-list__item">
                <span className="v-cmp-list__title">Input</span>
                <span className="v-cmp-list__meta">Updated yesterday</span>
              </li>
            </ul>
          ),
        },
      ]}
    />
  );
}

export function EmptyStateVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Empty state variants"
      items={[
        {
          label: "Default",
          children: (
            <div className="v-cmp-empty" aria-hidden>
              <Inbox className="v-cmp-empty__icon" strokeWidth={1.75} />
              <h3 className="v-cmp-empty__title">No results yet</h3>
              <p className="v-cmp-empty__body">Create your first item to get started.</p>
            </div>
          ),
        },
      ]}
    />
  );
}

export function PaginationVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Pagination variants"
      items={[
        {
          label: "Default",
          children: (
            <nav className="v-cmp-pagination" aria-hidden>
              <span className="v-cmp-pagination__btn">Prev</span>
              <span className="v-cmp-pagination__page">1</span>
              <span className="v-cmp-pagination__page v-cmp-pagination__page--active">2</span>
              <span className="v-cmp-pagination__page">3</span>
              <span className="v-cmp-pagination__btn">Next</span>
            </nav>
          ),
        },
      ]}
    />
  );
}
