import type { CarFilter, PaginationParts } from "@/types/api.types";

const SORT_WHITELIST = new Set([
  "pricePerDay",
  "-pricePerDay",
  "year",
  "-year",
  "averageRating",
  "-averageRating",
  "createdAt",
  "-createdAt",
]);

const DEFAULT_SORT = "-createdAt";

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function readNumber(sp: URLSearchParams, key: string): number | undefined {
  const raw = sp.get(key);
  if (raw === null || raw === "") return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
}

export function buildCarFilter(sp: URLSearchParams): CarFilter {
  const filter: CarFilter = {};

  const exactStringKeys = [
    "make",
    "carType",
    "fuelType",
    "transmission",
    "location",
  ] as const;

  for (const key of exactStringKeys) {
    const value = sp.get(key);
    if (value) {
      filter[key] = value;
    }
  }

  const isAvailable = sp.get("isAvailable");
  if (isAvailable !== null && isAvailable !== "") {
    filter.isAvailable = isAvailable === "true";
  }

  const seats = readNumber(sp, "seats");
  if (seats !== undefined) filter.seats = seats;

  const year = readNumber(sp, "year");
  if (year !== undefined) filter.year = year;

  const minPrice = readNumber(sp, "minPrice");
  const maxPrice = readNumber(sp, "maxPrice");
  if (minPrice !== undefined || maxPrice !== undefined) {
    const range: { $gte?: number; $lte?: number } = {};
    if (minPrice !== undefined) range.$gte = minPrice;
    if (maxPrice !== undefined) range.$lte = maxPrice;
    filter.pricePerDay = range;
  }

  const search = sp.get("search");
  if (search && search.trim() !== "") {
    const re = new RegExp(escapeRegex(search.trim()), "i");
    filter.$or = [{ make: re }, { modelName: re }];
  }

  return filter;
}

export function buildPagination(sp: URLSearchParams): PaginationParts {
  const rawPage = readNumber(sp, "page");
  const rawLimit = readNumber(sp, "limit");

  const page = rawPage !== undefined && rawPage >= 1 ? Math.floor(rawPage) : 1;

  let limit = rawLimit !== undefined ? Math.floor(rawLimit) : 10;
  if (limit < 1) limit = 1;
  if (limit > 50) limit = 50;

  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildSort(sp: URLSearchParams): string {
  const sort = sp.get("sort");
  if (sort && SORT_WHITELIST.has(sort)) return sort;
  return DEFAULT_SORT;
}