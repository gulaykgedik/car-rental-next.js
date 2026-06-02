import Link from "next/link";
import type { CarListItem } from "@/types/car.types";
import CarCard from "./CarCard";

type CarsSectionProps = {
  title: string;
  cars: CarListItem[];
  viewAllHref?: string;
};

export default function CarsSection({ title, cars, viewAllHref }: CarsSectionProps) {
  return (
    <section className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-secondary-300 text-base font-semibold">{title}</h2>
        {viewAllHref ? (
          <Link href={viewAllHref} className="text-primary text-base font-semibold hover:underline">
            Tümünü Gör
          </Link>
        ) : null}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
        {cars.map((car, idx) => (
          <CarCard key={car._id ?? `${car.make}-${car.modelName}-${idx}`} car={car} />
        ))}
      </div>
    </section>
  );
}