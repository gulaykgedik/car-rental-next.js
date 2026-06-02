import Image from "next/image";
import Link from "next/link";
import { Fuel, Settings, Users } from "lucide-react";
import type { CarListItem } from "@/types/car.types";
import { buildCarImageUrl } from "@/utils/imagin.utils";

type CarCardProps = {
  car: CarListItem;
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className="bg-card rounded-card p-6 flex flex-col gap-6 hover:shadow-[0_30px_60px_rgba(13,42,89,0.08)] transition-shadow">
      <header className="flex items-start justify-between gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-secondary-500 text-xl font-bold leading-tight line-clamp-1">
            {car.make} {car.modelName}
          </h3>
          <p className="text-secondary-300 text-sm font-bold">{car.carType}</p>
        </div>
      </header>

      <div className="relative h-22 flex items-end justify-center">
        <Image
          src={buildCarImageUrl({
            make: car.make,
            modelName: car.modelName,
            year: car.year,
          })}
          alt={`${car.make} ${car.modelName}`}
          width={232}
          height={88}
          className="object-contain"
          style={{ width: "auto", height: "auto", maxHeight: "88px" }}
          unoptimized
        />
      </div>

      <div className="flex items-center justify-between text-secondary-300">
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <Fuel size={16} strokeWidth={2} />
          <span>{car.fuelType}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <Settings size={16} strokeWidth={2} />
          <span>{car.transmission}</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-medium">
          <Users size={16} strokeWidth={2} />
          <span>{car.seats} Kişi</span>
        </div>
      </div>

      <footer className="flex items-center justify-between gap-2">
        <p className="text-secondary-500 text-base lg:text-xl font-bold">
          ₺{car.pricePerDay.toFixed(0)}
          <span className="text-secondary-300 text-xs lg:text-sm font-bold">/ gün</span>
        </p>
        <Link
          href={`/cars/${car._id}`}
          className="bg-primary hover:opacity-90 text-white text-sm font-semibold px-5 h-10 lg:h-11 rounded inline-flex items-center justify-center"
        >
          Kirala
        </Link>
      </footer>
    </article>
  );
}