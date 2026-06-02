import CarCard from "@/components/home/CarCard";
import Filters from "@/components/cars/Filters";
import CarsToolbar from "@/components/cars/CarsToolbar";
import CarsPagination from "@/components/cars/CarsPagination";
import { fetchCars } from "@/services/car.service";

export const dynamic = "force-dynamic";

const FORWARDED_KEYS = [
  "carType",
  "location",
  "minPrice",
  "maxPrice",
  "transmission",
  "fuelType",
  "seats",
  "search",
  "sort",
  "page",
  "limit",
] as const;

type RawSearchParams = { [key: string]: string | string[] | undefined };

function pickFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function buildQuery(sp: RawSearchParams): string {
  const params = new URLSearchParams();
  for (const key of FORWARDED_KEYS) {
    const value = pickFirst(sp[key]);
    if (value !== undefined && value !== "") params.set(key, value);
  }
  if (!params.has("limit")) params.set("limit", "12");
  if (!params.has("sort")) params.set("sort", "-createdAt");
  return params.toString();
}

export default async function CarsPage({
  searchParams,
}: {
  searchParams: Promise<RawSearchParams>;
}) {
  const sp = await searchParams;
  const result = await fetchCars(buildQuery(sp));
  const { data, pagination } = result;

  return (
    <div className="max-w-360 mx-auto px-6 lg:px-16 py-8">
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 lg:shrink-0">
          <Filters />
        </aside>

        <div className="flex-1 flex flex-col gap-6 min-w-0">
          <CarsToolbar total={pagination.total} />

          {data.length === 0 ? (
            <div className="bg-card rounded-card p-16 text-center text-secondary-300 text-sm font-semibold">
              Aramanıza uygun araç bulunamadı.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {data.map((car) => (
                <CarCard key={car._id} car={car} />
              ))}
            </div>
          )}

          <CarsPagination
            page={pagination.page}
            totalPages={pagination.totalPages}
            total={pagination.total}
            limit={pagination.limit}
          />
        </div>
      </div>
    </div>
  );
}