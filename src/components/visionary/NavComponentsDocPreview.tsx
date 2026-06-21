import { ChevronDown, ChevronRight, Home, Settings, User } from "lucide-react";
import { ComponentDocGroup } from "@/components/visionary/ComponentDocGroup";

export function TabsVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Tabs variants"
      items={[
        {
          label: "Default",
          children: (
            <div className="v-cmp-tabs" aria-hidden>
              <span className="v-cmp-tabs__tab v-cmp-tabs__tab--active">Overview</span>
              <span className="v-cmp-tabs__tab">Activity</span>
              <span className="v-cmp-tabs__tab">Settings</span>
            </div>
          ),
        },
      ]}
    />
  );
}

export function AccordionVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Accordion states"
      items={[
        {
          label: "Collapsed",
          children: (
            <div className="v-cmp-accordion" aria-hidden>
              <div className="v-cmp-accordion__item">
                <span className="v-cmp-accordion__trigger">
                  What is included?
                  <ChevronDown className="v-cmp-accordion__chevron v-cmp-specimen-icon" strokeWidth={2} />
                </span>
              </div>
            </div>
          ),
        },
        {
          label: "Expanded",
          children: (
            <div className="v-cmp-accordion" aria-hidden>
              <div className="v-cmp-accordion__item v-cmp-accordion__item--open">
                <span className="v-cmp-accordion__trigger">
                  What is included?
                  <ChevronDown className="v-cmp-accordion__chevron v-cmp-specimen-icon" strokeWidth={2} />
                </span>
                <div className="v-cmp-accordion__panel">
                  Access to all foundation tokens and component guidelines.
                </div>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

export function DropdownVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Dropdown states"
      items={[
        {
          label: "Closed",
          children: (
            <span className="v-cmp-btn v-cmp-btn--secondary-green v-cmp-btn--compact" aria-hidden>
              Actions
              <ChevronDown className="v-cmp-specimen-icon" strokeWidth={2} />
            </span>
          ),
        },
        {
          label: "Open",
          children: (
            <div className="v-cmp-dropdown" aria-hidden>
              <span className="v-cmp-btn v-cmp-btn--secondary-green v-cmp-btn--compact">
                Actions
                <ChevronDown className="v-cmp-specimen-icon" strokeWidth={2} />
              </span>
              <div className="v-cmp-dropdown__menu">
                <span className="v-cmp-dropdown__item">Edit</span>
                <span className="v-cmp-dropdown__item">Duplicate</span>
                <span className="v-cmp-dropdown__item v-cmp-dropdown__item--destructive">Delete</span>
              </div>
            </div>
          ),
        },
      ]}
    />
  );
}

export function MenuVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Menu variants"
      items={[
        {
          label: "Default",
          children: (
            <div className="v-cmp-menu" aria-hidden>
              <span className="v-cmp-menu__item">
                <User className="v-cmp-specimen-icon" strokeWidth={2} />
                Profile
              </span>
              <span className="v-cmp-menu__item">
                <Settings className="v-cmp-specimen-icon" strokeWidth={2} />
                Settings
              </span>
              <span className="v-cmp-menu__item v-cmp-menu__item--destructive">Sign out</span>
            </div>
          ),
        },
      ]}
    />
  );
}

export function BreadcrumbVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Breadcrumb variants"
      items={[
        {
          label: "Default",
          children: (
            <nav className="v-cmp-breadcrumb" aria-hidden>
              <span className="v-cmp-breadcrumb__item">Home</span>
              <ChevronRight className="v-cmp-breadcrumb__sep" strokeWidth={2} />
              <span className="v-cmp-breadcrumb__item">Components</span>
              <ChevronRight className="v-cmp-breadcrumb__sep" strokeWidth={2} />
              <span className="v-cmp-breadcrumb__item v-cmp-breadcrumb__item--current">Button</span>
            </nav>
          ),
        },
      ]}
    />
  );
}

export function NavigationVariantsPreview() {
  return (
    <ComponentDocGroup
      label="Navigation variants"
      items={[
        {
          label: "Default",
          children: (
            <nav className="v-cmp-nav" aria-hidden>
              <span className="v-cmp-nav__item v-cmp-nav__item--active">
                <Home className="v-cmp-specimen-icon" strokeWidth={2} />
                Dashboard
              </span>
              <span className="v-cmp-nav__item">
                <User className="v-cmp-specimen-icon" strokeWidth={2} />
                Accounts
              </span>
              <span className="v-cmp-nav__item">
                <Settings className="v-cmp-specimen-icon" strokeWidth={2} />
                Settings
              </span>
            </nav>
          ),
        },
      ]}
    />
  );
}
