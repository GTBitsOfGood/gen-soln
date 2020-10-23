import { ThemeOptions, Theme } from "@material-ui/core/styles";
import {
  Palette,
  PaletteOptions
} from "@material-ui/core/styles/createPalette";

import { FilterValue } from "./filters";

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
  address: {
    text: { main: string; secondary: string };
    location: { type: "Point"; coordinates: number[] };
  };
  _id: string;
  nonprofitId: string;
}

export type Event = EventBase & {
  maxVolunteers: number;
  volunteers: Array<string>;
  about: string;
};

export type EventCardData = EventBase;

export type CauseCardData = {
  cause: string;
  imagePath: string;
  filterValue: string;
};

export interface PageInformation {
  page: number;
  isLastPage: boolean;
}

export type PaginatedCards<T> = PageInformation & { cards: T[] };
export type PaginatedEventCards = PaginatedCards<EventCardData>;
export type PaginatedCauseCards = PaginatedCards<CauseCardData>;

interface PaginateWithLocation {
  lat: number;
  long: number;
}
interface PaginateWithDate {
  date: string;
}
interface PaginateWithFilter {
  causes: FilterValue<"cause">[];
  cities: string[];
  times: FilterValue<"time">[];
  totalCount: number; // Filtered events page needs to explicitly display total number of results
}

export type LocationPaginatedEventCards = PaginatedEventCards &
  PaginateWithLocation;
export type LocationPageRequest = Pick<PageInformation, "page"> &
  PaginateWithLocation;

export type DatePaginatedEventCards = PaginatedEventCards & PaginateWithDate;
export type DatePageRequest = Pick<PageInformation, "page"> & PaginateWithDate;

export type FilterPaginatedEventCards = PaginatedEventCards &
  PaginateWithFilter;
export type FilterPageRequest = Pick<PageInformation, "page"> &
  PaginateWithFilter &
  PaginateWithLocation &
  PaginateWithDate;

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
  }

  interface ThemeOptions {
    margins: Record<Spacing, string>;
  }
}

interface OutlineColors {
  lightOutline: string;
  darkOutline: string;
}

declare module "@material-ui/core/styles/createPalette" {
  interface Palette {
    object: OutlineColors;
  }

  interface PaletteOptions {
    object: OutlineColors;
  }
}
