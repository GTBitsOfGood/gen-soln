import { ThemeOptions, Theme } from "@material-ui/core/styles";

export type Spacing = "VERTICAL" | "HORIZONTAL" | "LARGE_VERTICAL";

// Fields from the back-end Nonprofit schema that should be exposed to the front-end.
// DON'T add confidential fields since those shouldn't be queried by server actions.
export interface Nonprofit {
  _id: string;
  name: string;
  headline: string;
  about: string;
  background: string;
  logo: string;
  stripeAccount: string;
  events: string[];
  cause: string;
  // TODO: consider adding the donations field?
}

// Keep in sync with the backend schema
export interface Donation {
  name: string;
  email: string;
  amount: number;
  nonprofitId: string;
  timestamp: Date;
}

// Keep in sync with the backend schema
interface EventBase {
  name: string;
  startDate: string;
  endDate: string;
  duration: number;
  image: string;
  address: { text: string; location: { type: "Point"; coordinates: number[] } };
  about: string;
}

export type Event = EventBase & {
  maxVolunteers: number;
  volunteers: Array<string>;
  nonprofitId: string;
};

export type EventCardData = EventBase & {
  nonprofitId: Pick<Nonprofit, "_id" | "name">;
};

interface Coordinates {
  lat: number;
  long: number;
}

interface PageInformation {
  page: number;
  totalCount: number;
  isLastPage: boolean;
}

export type PaginatedEventCards = PageInformation & {
  eventCards: EventCardData[];
};

interface PaginateWithLocation {
  location: Coordinates;
}

interface PaginateWithDate {
  date: string;
}

export type LocationPaginatedEventCards = PaginatedEventCards &
  PaginateWithLocation;

export type LocationPageInformation = PageInformation & PaginateWithLocation;

export type DatePaginatedEventCards = PaginatedEventCards & PaginateWithDate;

export type DatePageInformation = PageInformation & PaginateWithDate;

export interface Dropdown {
  text: string;
  value: string;
}

export interface DropdownProps {
  items: Dropdown[];
  selectedValue: Dropdown["value"];
}

declare module "@material-ui/core/styles" {
  interface Theme {
    margins: Record<Spacing, string>;
    nonprofitBackgroundImage: Nonprofit["background"];
    nonprofitLogoImage: Nonprofit["logo"];
  }

  interface ThemeOptions {
    margins: Record<Spacing, string>;
    nonprofitBackgroundImage?: Nonprofit["background"];
    nonprofitLogoImage?: Nonprofit["logo"];
  }
}
